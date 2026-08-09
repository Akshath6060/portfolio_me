const GITHUB_URL = "https://api.github.com/users/Akshath6060/repos?sort=updated&per_page=100";
const INSTANCE_CACHE_TTL = 10 * 60 * 1000;

// Only the fields the portfolio renders. Keeps the response small and avoids
// forwarding unrelated GitHub metadata to the browser.
function shape(repository) {
  return {
    id: repository.id,
    name: repository.name,
    description: repository.description,
    language: repository.language,
    topics: repository.topics || [],
    archived: Boolean(repository.archived),
    fork: Boolean(repository.fork),
    size: repository.size,
    pushed_at: repository.pushed_at,
    updated_at: repository.updated_at,
    html_url: repository.html_url,
    homepage: repository.homepage,
    stargazers_count: repository.stargazers_count,
    forks_count: repository.forks_count,
  };
}

// Survives between invocations on a warm instance, so a client that bypasses
// the CDN cache (for example with a random query string) cannot be used to
// burn through the upstream GitHub rate limit.
let instanceCache = null;

export default async function handler(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (instanceCache && Date.now() - instanceCache.savedAt < INSTANCE_CACHE_TTL) {
    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=21600, stale-if-error=86400");
    return response.status(200).json(instanceCache.projects);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Akshath6060-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const githubResponse = await fetch(GITHUB_URL, { headers, signal: controller.signal });
    if (!githubResponse.ok) throw new Error(`GitHub returned ${githubResponse.status}`);
    const repositories = await githubResponse.json();
    if (!Array.isArray(repositories)) throw new Error("Unexpected GitHub response");
    const projects = repositories.map(shape);
    instanceCache = { savedAt: Date.now(), projects };
    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=21600, stale-if-error=86400");
    return response.status(200).json(projects);
  } catch {
    // Nothing about the upstream failure is echoed back to the client.
    if (instanceCache) {
      response.setHeader("Cache-Control", "public, s-maxage=300, stale-if-error=86400");
      return response.status(200).json(instanceCache.projects);
    }
    response.setHeader("Cache-Control", "public, s-maxage=60, stale-if-error=86400");
    return response.status(503).json({ error: "Projects are temporarily unavailable." });
  } finally {
    clearTimeout(timeout);
  }
}
