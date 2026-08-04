import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStaticGitHubRepos } from '../hooks/useStaticGitHubRepos';
import { ProjectCard, LoadingSpinner, Footer } from '../components';
import { contributions } from '../data/contributions';

const papers = [
  {
    title:
      'Autonomous Vehicle Collision Avoidance With Racing Parameterized Deep Reinforcement Learning',
    venue: 'IFAC MECC',
    author: null,
    arxivId: '2604.16702',
    url: 'https://arxiv.org/abs/2604.16702',
    summary:
      'A parameterized deep reinforcement learning framework that transfers aggressive racing control into robust, real-time collision avoidance for autonomous vehicles.',
  },
  {
    title:
      'Physics-Informed Reinforcement Learning of Spatial Density Velocity Potentials for Map-Free Racing',
    venue: 'Robotics and Autonomous Systems',
    author: null,
    arxivId: '2604.09499',
    url: 'https://arxiv.org/abs/2604.09499',
    summary:
      'A physics-informed reinforcement learning approach that learns spatial density and velocity potentials to race at the limits of handling without a pre-built track map.',
  },
];

export const Home = () => {
  const { repos, loading, error } = useStaticGitHubRepos();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg p-6 max-w-md mx-auto shadow-lg"
            >
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Projects
              </h2>
              <p className="text-red-600">{error}</p>
              <p className="text-sm text-red-500 mt-2">
                Please try refreshing the page.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark sophisticated background */}
      <div className="bg-gradient-to-br from-[#26303a] to-[#465b72] relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <motion.img
              src={`${import.meta.env.BASE_URL}vihaan_dutta.jpg`}
              alt="Vihaan Dutta"
              className="w-36 h-36 rounded-full mx-auto mb-6 object-cover shadow-2xl ring-4 ring-[#aac7d8]/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <motion.h1 
              className="text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Vihaan Dutta
            </motion.h1>
            <motion.p 
              className="text-2xl font-medium text-[#aac7d8] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Computer Science & Robotics Student
            </motion.p>
            <motion.p 
              className="text-xl text-[#dfebf6] max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I'm a passionate developer and student at the University of Michigan, dedicated to creating 
              innovative solutions and building exceptional software products. Explore my projects and academic journey below.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section Header */}
            <div className="relative mb-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2" style={{ borderColor: '#768a96' }}></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-6 text-3xl font-bold" style={{ color: '#29353c' }}>
                  Featured Projects
                </span>
              </div>
            </div>
            
            {repos.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: '#44576d' }}>
                  No projects found. Make sure your GitHub repositories are public.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((project, index) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Open Source Contribution Section - Striking dark band */}
      <div className="bg-gradient-to-br from-[#465b72] to-[#26303a] relative overflow-hidden">
        {/* Subtle pattern overlay to match the hero */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Section Header */}
            <div className="text-center mb-4">
              <span className="text-sm font-semibold tracking-widest uppercase text-[#aac7d8]">
                Open Source
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white text-center mb-3">
              Open Source Contributions
            </h2>
            <p className="text-[#dfebf6]/80 text-center max-w-2xl mx-auto mb-12">
              Giving back to the tools I use: bug fixes and improvements merged into projects I rely on.
            </p>

            {/* Contribution capsules — compact cards, built to scale to many */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contributions.map((c, cIndex) => {
                const openContribution = () => navigate(`/contributions/${c.id}`);
                return (
                  <motion.div
                    key={c.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${c.name} contribution`}
                    onClick={openContribution}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openContribution();
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: cIndex * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#aac7d8]/40 hover:bg-white/10 hover:shadow-2xl"
                  >
                    <h3 className="text-2xl font-bold text-white transition-colors duration-200 group-hover:text-[#aac7d8]">
                      {c.name}
                    </h3>
                    <span className="mt-1 text-sm text-[#768a96]">{c.repo}</span>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#dfebf6]/80">
                      {c.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.stats.map((stat) =>
                        stat.highlight ? (
                          <span
                            key={stat.label}
                            className="inline-flex items-center gap-1 rounded-full bg-[#aac7d8] px-3 py-1 text-xs font-bold text-[#26303a] shadow-sm ring-2 ring-[#aac7d8]/40"
                          >
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {stat.value} {stat.label}
                          </span>
                        ) : (
                          <span
                            key={stat.label}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#dfebf6]"
                          >
                            <span className="font-semibold text-white">{stat.value}</span>{' '}
                            <span className="text-[#aac7d8]">{stat.label}</span>
                          </span>
                        )
                      )}
                    </div>

                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#aac7d8]">
                      View contribution
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Research & Publications Section - Light academic style, distinct from the dark bands and white sections */}
      <div className="bg-[#dfebf6] relative overflow-hidden">
        {/* Subtle ruled-paper line pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(68,87,109,0.08) 31px, rgba(68,87,109,0.08) 32px)`
          }}></div>
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Section Header — left-aligned with accent bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="border-l-4 border-[#44576d] pl-5">
                <span className="text-sm font-semibold tracking-widest uppercase text-[#44576d]">
                  Research
                </span>
                <h2 className="mt-1 text-4xl font-bold text-[#29353c]">
                  Publications
                </h2>
                <p className="mt-2 max-w-2xl text-[#44576d]">
                  Peer-reviewed research in robotics reinforcement learning.
                </p>
              </div>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {papers.map((paper, index) => (
                <motion.a
                  key={paper.arxivId}
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group block rounded-xl border-l-4 border-[#44576d] bg-white p-6 md:p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-5">
                    {/* Paper icon */}
                    <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#44576d]/10 text-[#44576d]">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        {paper.author && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#44576d] px-3 py-1 text-xs font-bold text-white shadow-sm">
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M3 3a1 1 0 011-1h9.382a1 1 0 01.894.553L15 4h3a1 1 0 011 1v7a1 1 0 01-1 1h-4.382a1 1 0 01-.894-.553L12 12H5v6a1 1 0 11-2 0V3z" />
                            </svg>
                            {paper.author}
                          </span>
                        )}
                        <span className="rounded-full border border-[#44576d]/30 bg-[#44576d]/5 px-3 py-1 text-xs font-medium text-[#44576d]">
                          {paper.venue}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold leading-snug text-[#29353c] transition-colors duration-200 group-hover:text-[#44576d]">
                        {paper.title}
                      </h3>

                      <p className="mt-3 leading-relaxed text-[#44576d]">
                        {paper.summary}
                      </p>

                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#44576d]">
                        Read on arXiv
                        <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Education Section */}
      <div style={{ backgroundColor: 'white' }}>
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Section Header */}
            <div className="relative mb-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2" style={{ borderColor: '#44576d' }}></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 text-3xl font-bold" style={{ backgroundColor: 'white', color: '#29353c' }}>
                  Education
                </span>
              </div>
            </div>

            {/* Education Card */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-xl" style={{ borderColor: '#44576d', borderWidth: '2px' }}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                  {/* University Logo — Michigan Block M */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: '#00274C' }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}umich-logo.svg`}
                        alt="University of Michigan"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>

                  {/* University Info */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#29353c' }}>
                      University of Michigan
                    </h3>
                    <p className="text-lg font-semibold mb-1" style={{ color: '#44576d' }}>
                      Bachelor of Science
                    </p>
                    <p className="text-base" style={{ color: '#29353c' }}>
                      <span className="font-medium">Focus:</span> Computer Science & Robotics
                    </p>
                  </div>
                </div>

                {/* Coursework */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#29353c' }}>
                    <svg className="w-5 h-5 mr-2" style={{ color: '#44576d' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    Relevant Coursework
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Data Structures and Algorithms',
                      'Operating Systems',
                      'Localization, Mapping, and Navigation (SLAM)',
                      'Software Engineering'
                    ].map((course, index) => (
                      <motion.div
                        key={course}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-center rounded-lg p-3 shadow-sm border-2"
                        style={{ borderColor: '#e6e6e6' }}
                      >
                        <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#44576d' }}></div>
                        <span className="font-medium" style={{ color: '#29353c' }}>{course}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

            {/* Connect Section */}
      <div style={{ backgroundColor: '#44576d' }}>
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            {/* Section Header */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2" style={{ borderColor: '#768a96' }}></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 text-3xl font-bold text-white" style={{ backgroundColor: '#44576d' }}>
                  Connect with Me
                </span>
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-4">
              <a
                href="https://github.com/vihdutta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                style={{ borderColor: '#768a96', borderWidth: '2px', color: '#29353c' }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              
              <a
                href="https://linkedin.com/in/vihdutta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                style={{ borderColor: '#768a96', borderWidth: '2px', color: '#29353c' }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}; 