const STATUS_LABELS = {
  completed: "Completed",
  "in-progress": "In Progress",
  experimental: "Experimental",
  archived: "Archived",
};

export default function ProjectStatus({ status }) {
  return <span className={`project-status project-status--${status}`}><i aria-hidden="true" />{STATUS_LABELS[status] || "Project"}</span>;
}

