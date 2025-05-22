import { useState, useEffect } from 'react';
import type { GitHubAPIResponse, GitHubRepo, EnhancedProject, ProjectMetadata } from '../types/github';

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const REPOS_QUERY = `
  query {
    viewer {
      repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
        nodes {
          name
          description
          url
          primaryLanguage {
            name
            color
          }
          stargazerCount
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

export const useGitHubRepos = () => {
  const [repos, setRepos] = useState<EnhancedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        
        if (!token) {
          throw new Error('GitHub token not found. Please add VITE_GITHUB_TOKEN to your .env file.');
        }

        // fetch from GitHub GraphQL API
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: REPOS_QUERY }),
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const result: GitHubAPIResponse = await response.json();
        const githubRepos = result.data.viewer.repositories.nodes;

        // fetch local metadata
        const metadataResponse = await fetch('/projects_metadata.json');
        const metadata: Record<string, ProjectMetadata> = metadataResponse.ok 
          ? await metadataResponse.json() 
          : {};

        // fetch ignored repositories list
        const ignoredReposResponse = await fetch('/ignored_repos.json');
        const ignoredRepos: string[] = ignoredReposResponse.ok 
          ? await ignoredReposResponse.json() 
          : [];

        // filter out ignored repositories and merge with metadata
        const filteredRepos = githubRepos.filter((repo: GitHubRepo) => 
          !ignoredRepos.includes(repo.name)
        );

        const enhancedRepos: EnhancedProject[] = filteredRepos.map((repo: GitHubRepo) => ({
          ...repo,
          metadata: metadata[repo.name],
        }));

        setRepos(enhancedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
        console.error('Error fetching GitHub repos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, loading, error };
}; 