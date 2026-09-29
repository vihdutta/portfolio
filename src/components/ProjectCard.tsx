import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TechnologyBadges } from './TechnologyBadges';
import type { ProjectContent } from '../lib/content-schema';

interface ProjectCardProps {
  project: ProjectContent;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { id, title: name, description, details, github, live, technologies } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: index * 0.02 }}
      className="card h-full flex flex-col"
    >
      <h3 className="mb-3 text-xl font-semibold">
        <Link
          to={`/projects/${encodeURIComponent(id)}`}
          className=""
        >
          {name}
        </Link>
      </h3>

      {description && (
        <p className="text-sm leading-relaxed text-[#29353c]">{description}</p>
      )}
      {!description && details.length > 0 && (
        <ul className="space-y-1 text-sm text-[#29353c]">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2" aria-hidden="true">•</span>
              {detail}
            </li>
          ))}
        </ul>
      )}
      <TechnologyBadges technologies={technologies} />
      <div className="mt-auto flex flex-wrap gap-4 pt-4">
        {[{ label: 'GitHub', href: github }, ...(live ? [{ label: 'Live', href: live }] : [])].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} ${label}`}
            className="text-sm"
          >
            {label}
          </a>
        ))}
      </div>
    </motion.article>
  );
};
