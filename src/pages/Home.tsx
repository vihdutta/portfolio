import { motion } from 'framer-motion';
import { useStaticGitHubRepos } from '../hooks/useStaticGitHubRepos';
import { ProjectCard, LoadingSpinner, Footer } from '../components';

export const Home = () => {
  const { repos, loading, error } = useStaticGitHubRepos();

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
                Please check your GitHub token configuration.
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
              src="/vihaan_dutta.jpg"
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
                  {/* University Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center border-2" style={{ borderColor: '#e6e6e6' }}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/University_of_Michigan_logo.svg/200px-University_of_Michigan_logo.svg.png"
                        alt="University of Michigan"
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* University Info */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold" style={{ color: '#29353c' }}>
                        University of Michigan
                      </h3>
                      <p className="text-sm font-medium text-white rounded-full px-3 py-1" style={{ backgroundColor: '#29353c' }}>
                        Expected Graduation: April 2027
                      </p>
                    </div>
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
                      'Data Structures & Algorithms',
                      'Introduction to Computer Organization',
                      'Calculus for the Modern Engineer',
                      'Discrete Mathematics',
                      'Computational Linear Algebra',
                      'Probability and Statistics'
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
            <div className="relative mb-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2" style={{ borderColor: '#768a96' }}></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 text-3xl font-bold text-white" style={{ backgroundColor: '#44576d' }}>
                  Connect with Me
                </span>
              </div>
            </div>

            <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
              Let's build together.
            </p>
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