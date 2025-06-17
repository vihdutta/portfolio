import { useState, useEffect } from 'react';

type PreviewData = Record<string, string>;

let cachedPreviewData: PreviewData | null = null;

export const useProjectPreviews = () => {
  const [previewData, setPreviewData] = useState<PreviewData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPreviewData = async () => {
      // Use cached data if available
      if (cachedPreviewData) {
        setPreviewData(cachedPreviewData);
        setIsLoading(false);
        return;
      }

      try {
        // Handle base path correctly for both dev and production
        const basePath = import.meta.env.BASE_URL || '/';
        const jsonPath = `${basePath}project-previews.json`.replace('//', '/');
        const response = await fetch(jsonPath);
        
        if (response.ok) {
          const data: PreviewData = await response.json();
          cachedPreviewData = data;
          setPreviewData(data);
        } else {
          console.warn('Could not load project previews');
          setPreviewData({});
        }
      } catch (error) {
        console.warn('Error loading project previews:', error);
        setPreviewData({});
      } finally {
        setIsLoading(false);
      }
    };

    loadPreviewData();
  }, []);

  const getPreviewUrl = (repositoryName: string): string | null => {
    const url = previewData[repositoryName];
    return url && url.trim() ? url : null;
  };

  return {
    getPreviewUrl,
    isLoading
  };
}; 