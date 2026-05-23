import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { STATUS_META } from '../data/projects';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const status = STATUS_META[project.status];

  return (
    <div className="group bg-white rounded-2xl shadow-sm ring-1 ring-zinc-200/60 overflow-hidden card-hover flex flex-col">
      {/* Colored top band */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: project.accentColor }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{project.emoji}</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${project.accentBg} ${project.accentText}`}
            >
              {project.wp}
            </span>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.classes}`}>
            {status.emoji} {status.label}
          </span>
        </div>

        {/* Title + tagline */}
        <h2 className="text-lg font-bold text-zinc-900 leading-snug mb-1">
          {project.title}
        </h2>
        <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <span className="text-xs text-zinc-400 font-medium">Priority #{project.priority}</span>
          {project.route ? (
            <Link
              to={project.route}
              className="flex items-center gap-1 text-xs font-semibold transition-colors"
              style={{ color: project.accentColor }}
            >
              Open <ArrowRight size={12} />
            </Link>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold transition-colors"
              style={{ color: project.accentColor }}
            >
              Open <ArrowRight size={12} />
            </a>
          ) : (
            <span className="text-xs text-zinc-300 italic">coming soon</span>
          )}
        </div>
      </div>
    </div>
  );
}
