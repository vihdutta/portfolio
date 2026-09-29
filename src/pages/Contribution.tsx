import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { BackLink } from '../components/BackLink';
import { contributions } from '../content';
import { Markdown } from '../components/Markdown';
import { Footer } from '../components';

export const Contribution = () => {
  const { contributionId } = useParams();
  const contribution = contributions.find((entry) => entry.id === contributionId);

  if (!contribution) {
    return (
      <div className="min-h-screen bg-[#dfebf6]">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#29353c' }}>
            Contribution not found
          </h1>
          <BackLink to="/#contributions">Back to contributions</BackLink>
        </div>
      </div>
    );
  }

  const { title: name, github: repoUrl, stats, body, cta } = contribution;

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
            <BackLink to="/#contributions">Back to contributions</BackLink>

            <h1 className="mt-4 text-center text-4xl md:text-5xl font-bold text-[#29353c]">{name}</h1>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-4 flex w-fit items-center justify-center gap-2 rounded-lg bg-[#29353c] px-5 py-2.5 text-sm font-semibold text-[#f7fafc] no-underline hover:bg-[#44576d] hover:text-[#f7fafc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44576d]"
            >
              <svg className="h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {stats.map((stat) =>
                stat.highlight ? (
                  <div
                    key={stat.label}
                    className="rounded-xl border-2 border-[#aac7d8] bg-[#aac7d8] px-8 py-4 text-center shadow-lg"
                  >
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold text-[#26303a]">
                      <svg className="h-6 w-6 text-[#26303a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm font-bold uppercase tracking-wide text-[#26303a]">
                      {stat.label}
                    </div>
                  </div>
                ) : (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#44576d]/20 bg-[#44576d]/5 px-4 py-3 text-center backdrop-blur-sm"
                  >
                    <div className="text-xl font-bold text-[#29353c]">{stat.value}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wide text-[#44576d]">
                      {stat.label}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#dfebf6]">
        <div className="container mx-auto px-6 pt-8 pb-16">
          <div
            className="mx-auto max-w-5xl"
          >
            <Markdown cards>{body}</Markdown>

            {/* CTA */}
            <div className="mt-12 flex justify-center">
              <a
                href={cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                {cta.label}
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};
