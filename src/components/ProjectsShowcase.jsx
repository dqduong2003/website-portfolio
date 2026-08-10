import ExpandableProfileCard from './ui/expandable-profile-card.jsx';
import { PROJECTS } from '../data/projects.js';

function TagPills({ tags }) {
  return (
    <>
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-lg bg-white/45 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[11px] font-medium text-primary"
        >
          {t}
        </span>
      ))}
    </>
  );
}

function ProjectDetails({ project }) {
  return (
    <div className="flex flex-col gap-6">
      <p>{project.desc}</p>

      <div className="flex flex-wrap gap-3 pt-5 border-t border-border">
        {project.srcLink && (
          <a
            href={project.srcLink}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--background)' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground font-normal rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            <i className="ti ti-brand-github" /> Source Code
          </a>
        )}
        {project.demo && project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--background)' }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary font-normal rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            <i className="ti ti-external-link" /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {PROJECTS.map((project) => (
        <ExpandableProfileCard
          key={project.id}
          imageSrc={project.img}
          title={project.title}
          subtitle={<TagPills tags={project.previewChips.slice(0, 2)} />}
          tags={project.chips}
          content={<ProjectDetails project={project} />}
        />
      ))}
    </div>
  );
}
