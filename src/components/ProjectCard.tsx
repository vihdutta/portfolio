import { motion } from 'framer-motion';
import type { EnhancedProject } from '../types/github';
import { ProjectPreview } from './ProjectPreview';
import { useProjectPreviews } from '../hooks/useProjectPreviews';

interface ProjectCardProps {
  project: EnhancedProject;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const {
    name,
    description,
    url,
    primaryLanguage,
    stargazerCount,
    repositoryTopics,
    metadata,
  } = project;

  const topics = repositoryTopics?.nodes?.map(node => node.topic.name) || [];
  const { getPreviewUrl } = useProjectPreviews();
  const previewUrl = getPreviewUrl(name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="card p-6 h-full flex flex-col"
    >
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-gray-900 transition-colors duration-200"
            style={{
              '--hover-color': '#29353c'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#29353c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
            }}
          >
            {name}
          </a>
          {stargazerCount > 0 && (
            <span className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                  clipRule="evenodd"
                />
              </svg>
              {stargazerCount}
            </span>
          )}
        </div>

        {primaryLanguage && (
          <div className="flex items-center mb-3">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: primaryLanguage.color }}
            />
            <span className="text-sm text-gray-600">
              {primaryLanguage.name}
            </span>
          </div>
        )}

        {description && (
          <p className="text-gray-700 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {metadata?.details && (
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            {metadata.details.map((detail, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2" style={{ color: '#29353c' }}>•</span>
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Project Preview - positioned just above tags */}
      {previewUrl && (
        <ProjectPreview previewUrl={previewUrl} repositoryName={name} />
      )}

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {topics.slice(0, 6).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              {topic}
            </span>
          ))}
          {topics.length > 6 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{topics.length - 6} more
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}; 