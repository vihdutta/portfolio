import { motion } from 'framer-motion';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Home = () => {
  const { repos, loading, error } = useGitHubRepos();

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Vihaan Dutta"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-2xl font-medium text-red-600 mb-4">
            Full Stack Developer
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating innovative solutions and building 
            exceptional web experiences. Explore my projects below to see what I've been working on.
          </p>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Projects
          </h2>
          
          {repos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
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

        {/* Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Connect with Me
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Interested in working together? I'd love to hear from you.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            
            <a
              href="https://linkedin.com/in/vihaan-dutta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              LinkedIn
            </a>
            
            <a
              href="https://twitter.com/vihaan_dutta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Twitter
            </a>
            
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 