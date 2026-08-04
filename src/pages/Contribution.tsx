import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { getContribution } from '../data/contributions';
import { Footer } from '../components';

// Renders `backtick` segments in a paragraph as inline <code>, everything else as plain text.
const renderWithInlineCode = (text: string) =>
  text.split(/(`[^`]+`)/g).map((segment, i) =>
    segment.startsWith('`') && segment.endsWith('`') ? (
      <code
        key={i}
        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em]"
        style={{ color: '#29353c' }}
      >
        {segment.slice(1, -1)}
      </code>
    ) : (
      segment
    )
  );

export const Contribution = () => {
  const { contributionId } = useParams();
  const contribution = getContribution(contributionId ?? '');

  if (!contribution) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#29353c' }}>
            Contribution not found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg px-5 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: '#29353c' }}
          >
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    repo,
    repoUrl,
    mergedPrUrl,
    stats,
    intro,
    prs,
    sectionLabel = 'What I built',
    prLinkLabel = 'View PR',
    ctaLabel = 'View the merged PR',
  } = contribution;

  return (
    <div className="min-h-screen">
      {/* Hero band */}
      <div className="bg-gradient-to-br from-[#465b72] to-[#26303a] relative overflow-hidden">
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
              <span className="mr-1">←</span> Back home
            </Link>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">{name}</h1>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#aac7d8] transition-colors duration-200 hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              {repo}
            </a>

            <div className="mt-6 flex flex-wrap gap-3">
              {stats.map((stat) =>
                stat.highlight ? (
                  <div
                    key={stat.label}
                    className="rounded-xl border-2 border-[#aac7d8] bg-[#aac7d8]/20 px-5 py-3 text-center shadow-lg"
                  >
                    <div className="flex items-center justify-center gap-1 text-xl font-bold text-white">
                      <svg className="h-5 w-5 text-[#aac7d8]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#aac7d8]">
                      {stat.label}
                    </div>
                  </div>
                ) : (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
                  >
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[#aac7d8]">
                      {stat.label}
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Intro */}
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              {intro.map((paragraph, i) => (
                <p key={i}>{renderWithInlineCode(paragraph)}</p>
              ))}
            </div>

            {/* What I built */}
            <h2 className="mt-12 mb-5 text-2xl font-bold" style={{ color: '#29353c' }}>
              {sectionLabel}
            </h2>
            <div className="space-y-4">
              {prs.map((pr) => (
                <a
                  key={pr.url}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: '#e6e6e6' }}
                >
                  <span
                    className="inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
                    style={{ backgroundColor: '#44576d' }}
                  >
                    {pr.tag}
                  </span>
                  <h3
                    className="mt-3 text-lg font-bold transition-colors duration-200"
                    style={{ color: '#29353c' }}
                  >
                    {pr.title}
                  </h3>
                  <div className="mt-2 space-y-3 leading-relaxed text-gray-700">
                    {pr.body.map((paragraph, i) => (
                      <p key={i}>{renderWithInlineCode(paragraph)}</p>
                    ))}
                  </div>
                  <span
                    className="mt-3 inline-flex items-center text-sm font-semibold"
                    style={{ color: '#44576d' }}
                  >
                    {prLinkLabel}
                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={mergedPrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg px-6 py-3 font-medium text-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: '#29353c' }}
              >
                {ctaLabel}
                <span className="ml-1">→</span>
              </a>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border-2 px-6 py-3 font-medium transition-all duration-200 hover:-translate-y-1"
                style={{ borderColor: '#768a96', color: '#29353c' }}
              >
                Visit the repository
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
