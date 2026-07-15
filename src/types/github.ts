export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  stargazerCount: number;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  updatedAt: string;
}

export interface ProjectMetadata {
  details: string[];
  overview?: string;
  highlights?: string[];
  techStack?: string[];
  liveUrl?: string;
}

export interface EnhancedProject extends GitHubRepo {
  metadata?: ProjectMetadata;
}

export interface GitHubAPIResponse {
  data: {
    viewer: {
      repositories: {
        nodes: GitHubRepo[];
      };
    };
  };
} 