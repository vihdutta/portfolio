import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useStaticGitHubRepos } from '../hooks/useStaticGitHubRepos';
import { useProjectPreviews } from '../hooks/useProjectPreviews';
import { LoadingSpinner, Footer } from '../components';

export const Project = () => {
  const { projectName } = useParams();
  const { repos, loading } = useStaticGitHubRepos();
  const { getPreviewUrl } = useProjectPreviews();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  const project = repos.find(
    (repo) => repo.name === decodeURIComponent(projectName ?? '')
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#29353c' }}>
            Project not found
          </h1>
          <p className="mb-8" style={{ color: '#44576d' }}>
            We couldn't find a project called "{decodeURIComponent(projectName ?? '')}".
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg px-5 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#29353c' }}
          >
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const { name, description, url, primaryLanguage, stargazerCount, metadata } = project;
  const topics = project.repositoryTopics?.nodes?.map((node) => node.topic.name) || [];
  const previewUrl = getPreviewUrl(name);

  return (
    <div className="min-h-screen">
      {/* Hero band */}
      <div className="bg-gradient-to-br from-[#26303a] to-[#465b72] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-[#aac7d8] transition-colors duration-200 hover:text-white"
            >
              <span className="mr-1">←</span> Back to projects
            </Link>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">{name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[#dfebf6]">
              {primaryLanguage && (
                <span className="inline-flex items-center">
                  <span
                    className="mr-2 h-3 w-3 rounded-full"
                    style={{ backgroundColor: primaryLanguage.color }}
                  />
                  {primaryLanguage.name}
                </span>
              )}
              {stargazerCount > 0 && (
                <span className="inline-flex items-center text-[#aac7d8]">
                  <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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

            {description && (
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#dfebf6]/90">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Main column */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {previewUrl ? (
                <div
                  className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm"
                  style={{ aspectRatio: '800 / 450' }}
                >
                  <img
                    src={previewUrl}
                    alt={`${name} preview`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-full rounded-2xl"
                  style={{
                    aspectRatio: '800 / 300',
                    background: 'linear-gradient(135deg, #26303a 0%, #465b72 100%)',
                  }}
                />
              )}

              {metadata?.overview && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold" style={{ color: '#29353c' }}>
                    Overview
                  </h2>
                  <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-gray-700">
                    {metadata.overview.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {metadata?.highlights && metadata.highlights.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold" style={{ color: '#29353c' }}>
                    Key Highlights
                  </h2>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {metadata.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1 flex-shrink-0" style={{ color: '#44576d' }}>
                          ▹
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Aside */}
            <motion.aside
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="rounded-2xl border-2 bg-white p-6 shadow-sm lg:sticky lg:top-24"
                style={{ borderColor: '#e6e6e6' }}
              >
                {metadata?.techStack && metadata.techStack.length > 0 && (
                  <div className="mb-6">
                    <h3
                      className="mb-3 text-sm font-semibold uppercase tracking-wider"
                      style={{ color: '#44576d' }}
                    >
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {metadata.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6 space-y-2 text-sm" style={{ color: '#29353c' }}>
                  <h3
                    className="mb-3 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: '#44576d' }}
                  >
                    Details
                  </h3>
                  {primaryLanguage && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Language</span>
                      <span className="font-medium">{primaryLanguage.name}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Stars</span>
                    <span className="font-medium">{stargazerCount}</span>
                  </div>
                  {topics.length > 0 && (
                    <div className="pt-2">
                      <span className="text-gray-500">Topics</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {topics.slice(0, 6).map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: '#29353c' }}
                  >
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View on GitHub
                  </a>

                  {metadata?.liveUrl && (
                    <a
                      href={metadata.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border-2 px-5 py-2.5 font-medium transition-all duration-200 hover:-translate-y-0.5"
                      style={{ borderColor: '#768a96', color: '#29353c' }}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
