import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectCard, Footer } from '../components';
import { contributions, projects } from '../content';
import { publications as papers } from '../content/publications';
import { site } from '../content/site';
import { contentUrl } from '../lib/content-url';

export const Home = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="min-h-screen bg-[#dfebf6]">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(68,87,109,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(68,87,109,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="container mx-auto px-6 py-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16 }}
            className="text-center"
          >
            <motion.h1 
              className="font-sans text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-[#29353c] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, delay: 0.06 }}
            >
              {site.name}
            </motion.h1>
            <motion.p 
              className="text-2xl font-medium text-[#44576d]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, delay: 0.08 }}
            >
              <span className="block mb-2 text-xl sm:text-2xl">Prev @ Arenova Capital</span>
              <span className="block text-xl sm:text-2xl">{site.tagline}</span>
              <span className="block mt-2 text-sm font-normal tracking-wide">{site.subtitle}</span>
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6" aria-hidden="true">
        <div className="section-divider max-w-5xl mx-auto" />
      </div>

      {/* Projects Section */}
      <div id="projects" className="scroll-mt-48 md:scroll-mt-28">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.16, delay: 0.04 }}
          >
            <div className="max-w-5xl mx-auto mb-6">
              <div className="border-l-4 border-[#aac7d8] pl-5">
                <span className="text-sm font-semibold tracking-widest uppercase text-[#44576d]">
                  {site.sections.projects.label}
                </span>
                <h2 className="mt-1 text-4xl font-bold text-[#29353c]">
                  {site.sections.projects.title}
                </h2>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: '#44576d' }}>
                  No projects found. Make sure your GitHub projectsitories are public.
                </p>
              </div>
            ) : (
              <div id="featured-projects" className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(showAllProjects ? projects : projects.slice(0, 3)).map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}
            {projects.length > 3 && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  aria-expanded={showAllProjects}
                  aria-controls="featured-projects"
                  onClick={() => setShowAllProjects((expanded) => !expanded)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#aac7d8]/25 px-4 py-2 text-sm font-medium text-[#44576d] hover:bg-[#eaf1f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44576d]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  {showAllProjects ? 'Show fewer projects' : `Show more projects (${projects.length - 3})`}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6" aria-hidden="true">
        <div className="section-divider max-w-5xl mx-auto" />
      </div>

      {/* Open Source Contributions */}
      <div id="contributions" className="relative overflow-hidden scroll-mt-48 md:scroll-mt-28">
        <div className="container mx-auto px-6 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.14 }}
          >
            <div className="max-w-5xl mx-auto mb-6">
              <div className="border-l-4 border-[#aac7d8] pl-5">
                <span className="text-sm font-semibold tracking-widest uppercase text-[#44576d]">
                  {site.sections.contributions.label}
                </span>
                <h2 className="mt-1 text-4xl font-bold text-[#29353c]">
                  {site.sections.contributions.title}
                </h2>
              </div>
            </div>

            {/* Contribution capsules — compact cards, built to scale to many */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {contributions.map((c, cIndex) => {
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.1, delay: cIndex * 0.02 }}
                    className="card flex h-full flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-2xl font-bold">
                        <Link to={`/contributions/${c.id}`}>{c.title}</Link>
                      </h3>
                      {c.stats.filter((stat) => stat.label === 'GitHub stars').map((stat) => (
                        <span
                          key={stat.label}
                          aria-label={`${stat.value} ${stat.label}`}
                          className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#44576d]"
                        >
                          <span aria-hidden="true">★</span>
                          {stat.value}
                        </span>
                      ))}
                    </div>
                    <span className="mt-1 mb-4 break-words text-sm text-[#44576d]">{c.repo}</span>

                    {c.description && (
                      <p className="mb-4 text-sm leading-relaxed text-[#29353c]">{c.description}</p>
                    )}

                    {c.stats.some((stat) => stat.highlight) && (
                      <div className="-mx-4 -mb-4 mt-auto rounded-b-xl border-t border-[#aac7d8]/25 bg-[#eaf1f6] px-4 py-3 md:-mx-5 md:-mb-5 md:px-5">
                        {c.stats.filter((stat) => stat.highlight).map((stat) => (
                          <div key={stat.label} className="flex items-center gap-2 text-sm font-semibold text-[#29353c]">
                            <svg className="h-4 w-4 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {stat.value} {stat.homeLabel ?? stat.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6" aria-hidden="true">
        <div className="section-divider max-w-5xl mx-auto" />
      </div>

      {/* Research & Publications */}
      <div id="publications" className="relative overflow-hidden scroll-mt-48 md:scroll-mt-28">
        <div className="container mx-auto px-6 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.14 }}
          >
            {/* Section Header — left-aligned with accent bar */}
            <div className="max-w-5xl mx-auto mb-6">
              <div className="border-l-4 border-[#aac7d8] pl-5">
                <span className="text-sm font-semibold tracking-widest uppercase text-[#44576d]">
                  {site.sections.publications.label}
                </span>
                <h2 className="mt-1 text-4xl font-bold text-[#29353c]">
                  {site.sections.publications.title}
                </h2>
              </div>
            </div>

            <ul className="max-w-5xl mx-auto divide-y divide-[#aac7d8]/25">
              {papers.map((paper, index) => (
                <motion.li
                  key={paper.arxivId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.1, delay: index * 0.03 }}
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <p className="text-base leading-relaxed text-[#44576d]">
                    {paper.authors.map((author, authorIndex) => (
                      <span key={author}>
                        {authorIndex > 0 && ', '}
                        <span className={author === site.authorName ? 'font-bold text-[#29353c]' : undefined}>
                          {author}
                        </span>
                      </span>
                    ))}
                    {'. '}
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      {paper.title}
                    </a>
                    {'. '}
                    <span className="italic text-[#44576d]">{paper.venue}</span>.
                  </p>
                  {paper.author && (
                    <div className="mt-3">
                      <span className="rounded-md bg-[#eaf1f6] px-3 py-1 text-xs font-bold text-[#29353c]">
                        {paper.author}
                      </span>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6" aria-hidden="true">
        <div className="section-divider max-w-5xl mx-auto" />
      </div>

      {/* Education Section */}
      <div id="education" className="scroll-mt-48 md:scroll-mt-28">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, delay: 0.06 }}
          >
            <div className="max-w-5xl mx-auto mb-6">
              <div className="border-l-4 border-[#aac7d8] pl-5">
                <span className="text-sm font-semibold tracking-widest uppercase text-[#44576d]">
                  {site.sections.education.label}
                </span>
                <h2 className="mt-1 text-4xl font-bold text-[#29353c]">
                  {site.sections.education.title}
                </h2>
              </div>
            </div>

            {/* Education Card */}
            <div className="max-w-5xl mx-auto">
              <div className="card text-base font-normal leading-relaxed text-[#29353c]">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                  {/* University Logo — Michigan Block M */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: '#00274C' }}
                    >
                      <img
                        src={contentUrl(site.education.logo)}
                        alt={site.education.school}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>

                  {/* University Info */}
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-2">
                      {site.education.school}
                    </h3>
                    {site.education.degrees.map((degree) => (
                      <p key={degree} className="mb-1">
                        {degree}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Coursework */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    {site.education.courseworkLabel}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {site.education.courses.map((course, index) => (
                      <motion.div
                        key={course}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1, delay: 0.08 + index * 0.02 }}
                        className="card-inset flex items-center"
                      >
                        <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-current"></div>
                        <span>{course}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}; 