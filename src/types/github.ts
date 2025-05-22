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