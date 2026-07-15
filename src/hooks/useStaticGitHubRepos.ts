import { useState, useEffect } from 'react';
import type { GitHubRepo, EnhancedProject, ProjectMetadata } from '../types/github';

// Prefix a public asset path with Vite's configured base path so fetches work
// on both the custom domain ('/') and the GitHub Pages project page ('/portfolio/').
const withBasePath = (asset: string): string =>
  `${import.meta.env.BASE_URL || '/'}${asset}`.replace('//', '/');

interface GitHubData {
  repositories: GitHubRepo[];
  lastUpdated: string;
  source: 'github-api' | 'fallback';
  error?: string;
}

interface UseStaticGitHubReposResult {
  repos: EnhancedProject[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const useStaticGitHubRepos = (): UseStaticGitHubReposResult => {
  const [repos, setRepos] = useState<EnhancedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the static JSON file (respect the deployment base path)
        const response = await fetch(withBasePath('github-data.json'));
        
        if (!response.ok) {
          throw new Error(`Failed to load GitHub data: ${response.status} ${response.statusText}`);
        }

        const data: GitHubData = await response.json();

        if (data.error) {
          console.warn('GitHub data was fetched with errors:', data.error);
        }

        // Load project metadata
        const metadata = await loadProjectMetadata();

        // Process repositories to match expected format
        const processedRepos: EnhancedProject[] = data.repositories.map(repo => ({
          ...repo,
          metadata: metadata[repo.name]
        }));

        setRepos(processedRepos);
        setLastUpdated(data.lastUpdated);
      } catch (err) {
        console.error('Error loading GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load project data');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  return { repos, loading, error, lastUpdated };
};

// Helper function to load project metadata
const loadProjectMetadata = async (): Promise<Record<string, ProjectMetadata>> => {
  try {
    const response = await fetch(withBasePath('projects_metadata.json'));
    if (!response.ok) {
      console.warn('Project metadata not found, using empty metadata');
      return {};
    }
    const metadata = await response.json();
    return metadata || {};
  } catch (err) {
    console.warn('Failed to load project metadata:', err);
    return {};
  }
}; 