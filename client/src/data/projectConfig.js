export const projectConfig = {
  // "auto" shows eligible repositories and sorts the `portfolio` topic first.
  // Use "all" to show every eligible repository or "portfolio" to require the topic.
  mode: "auto",
  exclude: [],
  include: [],
  showForks: false,
  showEmpty: false,
  featured: ["stock", "smart-inventory-hub", "college-class-planner", "curl-count-ai"],
  overrides: {
    stock: { status: "completed" },
    "smart-inventory-hub": { status: "in-progress" },
    "curl-count-ai": { status: "experimental" },
  },
};
