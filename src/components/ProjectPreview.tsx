import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectPreviewProps {
  previewUrl: string;
  repositoryName: string;
}

export const ProjectPreview = ({ previewUrl, repositoryName }: ProjectPreviewProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load preview for ${repositoryName}:`, previewUrl);
    setHasError(true);
    setIsLoaded(false);
  };

  // Don't render anything if there's an error
  if (hasError) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ 
        opacity: 1, 
        scaleY: 1 
      }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ 
        duration: 0.3,
        scaleY: { duration: 0.2 }
      }}
      className="mt-4 mb-4 relative w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
      style={{ aspectRatio: '800 / 450' }}
    >
      <img
        src={previewUrl}
        alt={`${repositoryName} preview`}
        onLoad={handleLoad}
        onError={handleError}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{
          opacity: isLoaded ? 1 : 0
        }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            />
            <span>Loading preview...</span>
          </div>
        </div>
      )}
      
      {/* Subtle preview indicator */}
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-2 right-2"
        >
          <span className="bg-black/60 text-white px-2 py-1 text-xs rounded-full backdrop-blur-sm">
            Preview
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}; 