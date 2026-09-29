import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { BackLink } from '../components/BackLink';
import { projects } from '../content';
import { Markdown } from '../components/Markdown';
import { contentUrl } from '../lib/content-url';
import { Footer } from '../components';
import { TechnologyBadges } from '../components/TechnologyBadges';

export const Project = () => {
  const { projectName } = useParams();
  const project = projects.find((entry) => entry.id === projectName);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#dfebf6]">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#29353c' }}>
            Project not found
          </h1>
          <p className="mb-8" style={{ color: '#44576d' }}>
            We couldn't find a project called "{projectName ?? ''}".
          </p>
          <BackLink to="/#projects">Back to projects</BackLink>
        </div>
      </div>
    );
  }

  const { title: name, github: url, body, preview, technologies } = project;
  const previewUrl = preview ? contentUrl(preview) : null;

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12 }}
    >
      {/* Hero band */}
      <div
        className="bg-[#dfebf6] relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(68,87,109,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(68,87,109,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="container mx-auto px-6 pt-4 pb-6 relative z-10">
          <div className="mx-auto max-w-5xl">
            <BackLink to="/#projects">Back to projects</BackLink>

            <h1 className="mt-4 text-center text-4xl md:text-5xl font-bold text-[#29353c]">{name}</h1>
            <TechnologyBadges technologies={technologies} centered />

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-4 flex w-fit items-center justify-center gap-2 rounded-lg bg-[#29353c] px-5 py-2.5 text-sm font-semibold text-[#f7fafc] no-underline hover:bg-[#44576d] hover:text-[#f7fafc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44576d]"
            >
              <svg className="h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#dfebf6]">
        <div className="container mx-auto px-6 pt-8 pb-16">
          <div className="mx-auto max-w-5xl">
            {/* Main column */}
            <div
              className="w-full"
            >
              {previewUrl ? (
                <div
                  className="w-full overflow-hidden rounded-xl border border-[#aac7d8]/25 bg-[#44576d]/5 shadow-sm"
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
                  className="w-full rounded-xl"
                  style={{
                    aspectRatio: '800 / 300',
                    background: 'linear-gradient(135deg, #26303a 0%, #465b72 100%)',
                  }}
                />
              )}

              <div className="mt-10">
                <Markdown>{body}</Markdown>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
