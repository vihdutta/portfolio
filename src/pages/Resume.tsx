import { motion } from 'framer-motion';
import { useState } from 'react';

export const Resume = () => {
  const [pdfError, setPdfError] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Your_Name_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Download or view my latest resume
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
            <a
              href="mailto:your.email@example.com"
              className="btn-secondary flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {!pdfError ? (
            <div className="card p-4">
              <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ height: '85vh' }}>
                <iframe
                  src="/resume.pdf"
                  title="Resume"
                  className="w-full h-full border-0"
                  onError={() => setPdfError(true)}
                />
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <div className="mb-8">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Resume Not Available for Preview
                </h3>
                <p className="text-gray-600 mb-6">
                  The PDF preview is not available, but you can still download the resume directly.
                </p>
                <button
                  onClick={handleDownload}
                  className="btn-primary"
                >
                  Download Resume PDF
                </button>
              </div>
              
              {/* alternative contact info */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-gray-900">Email:</strong>
                    <a href="mailto:your.email@example.com" className="text-red-600 hover:underline ml-2">
                      your.email@example.com
                    </a>
                  </div>
                  <div>
                    <strong className="text-gray-900">GitHub:</strong>
                    <a 
                      href="https://github.com/yourusername" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline ml-2"
                    >
                      github.com/yourusername
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}; 