const GITHUB_URL = "https://api.github.com/users/Akshath6060/repos?sort=updated&per_page=100";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
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
    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=21600, stale-if-error=86400");
    return response.status(200).json(repositories);
  } catch {
    response.setHeader("Cache-Control", "public, s-maxage=60, stale-if-error=86400");
    return response.status(503).json({ error: "Projects are temporarily unavailable." });
  } finally {
    clearTimeout(timeout);
  }
}
