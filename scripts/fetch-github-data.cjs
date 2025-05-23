#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Add fetch polyfill for Node.js environments without native fetch
if (!globalThis.fetch) {
  console.log('Installing fetch polyfill...');
  require('isomorphic-fetch');
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'vihdutta'; // Your GitHub username

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required');
  console.log('Creating fallback data file...');
  
  // Create fallback data so build doesn't fail
  const fallbackData = {
    repositories: [],
    lastUpdated: new Date().toISOString(),
    source: 'fallback',
    error: 'No GitHub token provided'
  };

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'github-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));
  
  console.log(`⚠️  Created fallback data file at ${outputPath}`);
  process.exit(0); // Exit successfully so build continues
}

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const REPOS_QUERY = `
  query GetRepositories($username: String!) {
    user(login: $username) {
      repositories(
        first: 20
        privacy: PUBLIC
        isFork: false
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          primaryLanguage {
            name
            color
          }
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

async function fetchGitHubData() {
  console.log('🔄 Fetching GitHub repository data...');
  
  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Static-Generator'
      },
      body: JSON.stringify({
        query: REPOS_QUERY,
        variables: {
          username: GITHUB_USERNAME
        }
      })
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    if (!data.data?.user?.repositories?.nodes) {
      throw new Error('Invalid response structure from GitHub API');
    }

    const repositories = data.data.user.repositories.nodes;
    console.log(`✅ Successfully fetched ${repositories.length} repositories`);

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save the data as static JSON
    const outputPath = path.join(publicDir, 'github-data.json');
    const githubData = {
      repositories,
      lastUpdated: new Date().toISOString(),
      source: 'github-api'
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(githubData, null, 2));

    console.log(`✅ GitHub data saved to ${outputPath}`);
    console.log(`📊 Data summary:
  - Repositories: ${repositories.length}
  - Languages: ${[...new Set(repositories.filter(r => r.primaryLanguage).map(r => r.primaryLanguage.name))].join(', ')}
  - Last updated: ${new Date().toISOString()}`);

  } catch (error) {
    console.error('❌ Error fetching GitHub data:', error.message);
    
    // Create fallback data so build doesn't fail
    const fallbackData = {
      repositories: [],
      lastUpdated: new Date().toISOString(),
      source: 'fallback',
      error: `Failed to fetch GitHub data: ${error.message}`
    };

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, 'github-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));
    
    console.log(`⚠️  Created fallback data file at ${outputPath}`);
    process.exit(0); // Exit successfully so build continues
  }
}

fetchGitHubData(); 