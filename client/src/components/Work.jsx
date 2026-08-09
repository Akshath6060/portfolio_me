import { useEffect, useState } from "react";
import { fetchGitHubProjects, GITHUB_PROFILE_URL } from "../services/github.js";
import Reveal from "./motion/Reveal.jsx";
import { StaggerContainer, ITEM_VARIANTS } from "./motion/Stagger.jsx";
import TiltCard from "./motion/TiltCard.jsx";
import ScrollSection from "./motion/ScrollSection.jsx";
import ProjectStatus from "./ProjectStatus.jsx";

function updatedLabel(date) {
  if (!date) return "Private repository";
  return `Updated ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date))}`;
}

function ProjectCard({ project }) {
  return (
    <TiltCard className="project" as="article" variants={ITEM_VARIANTS.up} cursorLabel="view">
      <div className="project__panel">
        <div className="project__topline">
          <ProjectStatus status={project.status} />
          {project.featured && <span className="project__featured">Featured</span>}
        </div>
        <div className="project__body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project__meta">
          {project.technologies.length > 0 && <div className="project__tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>}
          <small>{updatedLabel(project.updatedAt)}</small>
        </div>
      </div>
      <div className="project__actions">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} code on GitHub`} data-cursor="hover">View Code <span>↗</span></a>
        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`} data-cursor="hover">Live Demo <span>↗</span></a>}
      </div>
    </TiltCard>
  );
}

function ProjectSkeleton() {
  return <div className="project project--skeleton" aria-hidden="true"><div className="project__panel"><span /><span /><span /></div></div>;
}

export default function Work() {
  const [state, setState] = useState({ loading: true, projects: [], error: false });

  useEffect(() => {
    let active = true;
    fetchGitHubProjects()
      .then((projects) => active && setState({ loading: false, projects, error: false }))
      .catch(() => active && setState({ loading: false, projects: [], error: true }));
    return () => { active = false; };
  }, []);

  return (
    <ScrollSection className="work" id="work" pattern="lift" tabIndex={-1}>
      <Reveal className="intro" variant="up">
        <h1>Most of what I build starts with a real problem or a question I wanted to test — from an exam platform used for our college's actual MCA entrance exam to a robot that waves back at people.</h1>
        <div className="intro__aside"><p>I move across web development, machine learning, cloud infrastructure, and IoT — usually whichever combination actually solves the problem in front of me.</p><a href="#about" data-cursor="hover">More about me <span>↗</span></a></div>
      </Reveal>

      <Reveal className="section-title" variant="up"><h2>Projects</h2><p>LIVE FROM GITHUB — RECENT WORK ACROSS WEB, AI/ML, CLOUD, AND HARDWARE.</p></Reveal>

      {state.loading && <div className="projects" aria-label="Loading projects"><ProjectSkeleton /><ProjectSkeleton /><ProjectSkeleton /><ProjectSkeleton /></div>}
      {!state.loading && state.projects.length > 0 && <StaggerContainer className="projects" stagger={0.06} amount="some" once>{state.projects.map((project) => <ProjectCard project={project} key={project.id} />)}</StaggerContainer>}
      {!state.loading && (state.error || state.projects.length === 0) && <div className="projects-error" role="status"><p>Projects couldn't be loaded right now.</p><a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" data-cursor="hover">View GitHub <span>↗</span></a></div>}
    </ScrollSection>
  );
}
