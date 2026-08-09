export const projectConfig = {
  // "include" keeps the portfolio intentionally curated while GitHub remains
  // the source of truth for each selected repository's details.
  mode: "include",
  exclude: [],
  include: [
    "mca_enterance_portal",
    "smart-inventory-hub",
    "stock",
    "college-class-planner",
    "curl-count-ai",
  ],
  showForks: false,
  showEmpty: false,
  featured: ["mca_enterance_portal", "smart-inventory-hub", "stock"],
  // Private repositories are invisible to GitHub's public API. Keep only the
  // minimum presentation metadata here; public projects remain API-driven.
  privateProjects: [
    {
      name: "mca_enterance_portal",
      title: "MCA Entrance Portal",
      description: "Entrance examination platform built for the college's MCA admissions workflow, secure online exams, and result processing.",
      status: "completed",
      technologies: [],
      githubUrl: "https://github.com/Akshath6060/mca_enterance_portal",
      featured: true,
    },
  ],
  overrides: {
    mca_enterance_portal: { featured: true, status: "completed" },
    stock: { status: "completed" },
    "smart-inventory-hub": { status: "in-progress" },
    "curl-count-ai": { status: "experimental" },
  },
};
