import { projectConfig } from "../data/projectConfig.js";

export const GITHUB_PROFILE_URL = "https://github.com/Akshath6060";
export const GITHUB_REPOS_URL = "https://api.github.com/users/Akshath6060/repos?sort=updated&per_page=100";

const CACHE_KEY = "akshath-github-projects-v2";
const CACHE_TTL = 60 * 60 * 1000;
const STATUS_TOPICS = {
  completed: new Set(["completed", "complete", "finished", "production"]),
  "in-progress": new Set(["wip", "in-progress", "inprogress", "development", "active-development"]),
  experimental: new Set(["experimental", "prototype", "experiment", "learning"]),
};

export function formatRepositoryName(name = "") {
  return name
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase() === "ai" ? "AI" : word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function resolveProjectStatus(repo, override = {}) {
  if (override.status) return override.status;
  if (repo.archived) return "archived";
  const topics = new Set((repo.topics || []).map((topic) => topic.toLowerCase()));
  for (const [status, matches] of Object.entries(STATUS_TOPICS)) {
    if ([...matches].some((topic) => topics.has(topic))) return status;
  }
  return "in-progress";
}

function validUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function selectTechnologyTags(repo) {
  const statusTopics = new Set(["portfolio", ...Object.values(STATUS_TOPICS).flatMap((topics) => [...topics])]);
  const topics = (repo.topics || []).filter((topic) => !statusTopics.has(topic.toLowerCase()));
  return [...new Set([repo.language, ...topics].filter(Boolean))].slice(0, 5);
}

function prepareProjects(repositories) {
  const excluded = new Set(projectConfig.exclude.map((name) => name.toLowerCase()));
  const included = new Set(projectConfig.include.map((name) => name.toLowerCase()));
  let eligible = repositories.filter((repo) => {
    const name = repo.name.toLowerCase();
    if (excluded.has(name)) return false;
    if (included.has(name)) return true;
    if (!projectConfig.showForks && repo.fork) return false;
    return projectConfig.showEmpty || repo.size > 0;
  });

  if (projectConfig.mode === "include") {
    eligible = eligible.filter((repo) => included.has(repo.name.toLowerCase()));
  }

  if (projectConfig.mode === "portfolio") {
    eligible = eligible.filter((repo) => included.has(repo.name.toLowerCase()) || repo.topics?.includes("portfolio"));
  }

  const publicProjects = eligible
    .map((repo) => {
      const override = projectConfig.overrides[repo.name] || {};
      return {
        id: repo.id,
        name: repo.name,
        title: formatRepositoryName(repo.name),
        description: override.description || repo.description?.trim() || "Project details available on GitHub.",
        status: resolveProjectStatus(repo, override),
        technologies: selectTechnologyTags(repo),
        updatedAt: repo.pushed_at || repo.updated_at,
        githubUrl: repo.html_url,
        demoUrl: validUrl(repo.homepage),
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        featured: override.featured ?? projectConfig.featured.includes(repo.name),
        portfolioTagged: repo.topics?.includes("portfolio") || false,
      };
    });

  const publicNames = new Set(publicProjects.map((project) => project.name.toLowerCase()));
  const privateProjects = (projectConfig.privateProjects || [])
    .filter((project) => !publicNames.has(project.name.toLowerCase()))
    .map((project, index) => ({
      id: `private-${project.name}`,
      name: project.name,
      title: project.title || formatRepositoryName(project.name),
      description: project.description || "Private project details available on request.",
      status: project.status || "in-progress",
      technologies: project.technologies || [],
      updatedAt: null,
      githubUrl: project.githubUrl,
      demoUrl: validUrl(project.demoUrl),
      topics: [],
      featured: project.featured ?? true,
      portfolioTagged: true,
      private: true,
      privateOrder: index,
    }));

  return [...privateProjects, ...publicProjects]
    .sort((a, b) =>
      Number(b.featured) - Number(a.featured) ||
      Number(b.portfolioTagged) - Number(a.portfolioTagged) ||
      Number(a.privateOrder ?? 999) - Number(b.privateOrder ?? 999) ||
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );
}

function readCache(allowStale = false) {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (!cached?.projects || (!allowStale && Date.now() - cached.savedAt > CACHE_TTL)) return null;
    return cached.projects;
  } catch {
    return null;
  }
}

export async function fetchGitHubProjects() {
  const freshCache = readCache();
  if (freshCache) return freshCache;

  try {
    const response = await fetch(GITHUB_REPOS_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);
    const projects = prepareProjects(await response.json());
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), projects }));
    return projects;
  } catch (error) {
    const staleCache = readCache(true);
    if (staleCache) return staleCache;
    throw error;
  }
}
