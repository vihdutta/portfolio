#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Add fetch polyfill for Node.js environments without native fetch
if (!globalThis.fetch) {
  console.log('Installing fetch polyfill...');
  require('isomorphic-fetch');
}

// Try to load .env file for local development
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  console.log('📄 Loading .env file for local development...');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
        if (!process.env[key]) { // Don't override existing env vars
          process.env[key] = value;
        }
      }
    }
  }
}

// Check for token from either GITHUB_TOKEN (CI) or VITE_GITHUB_TOKEN (local .env)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = 'vihdutta'; // Your GitHub username

if (!GITHUB_TOKEN) {
  console.error('❌ GitHub token not found');
  console.log('💡 For local development:');
  console.log('   1. Create a .env file in the project root');
  console.log('   2. Add: VITE_GITHUB_TOKEN=your_github_token_here');
  console.log('   3. Get token from: https://github.com/settings/tokens');
  console.log('   4. Token only needs "public_repo" read access');
  console.log('');
  console.log('🔧 Creating fallback data file...');
  
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

console.log(`🔑 Using GitHub token from ${process.env.GITHUB_TOKEN ? 'GITHUB_TOKEN (CI)' : 'VITE_GITHUB_TOKEN (local)'}`);

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const REPOS_QUERY = `
  query GetRepositories($username: String!) {
    user(login: $username) {
      repositories(
        first: 100
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

    let repositories = data.data.user.repositories.nodes;
    console.log(`✅ Successfully fetched ${repositories.length} repositories`);

    // Load and apply included repos filter (opt-in: only listed repos are shown)
    const publicDir = path.join(process.cwd(), 'public');
    const includedReposPath = path.join(publicDir, 'included_repos.json');

    if (fs.existsSync(includedReposPath)) {
      try {
        const includedReposContent = fs.readFileSync(includedReposPath, 'utf8');
        const includedRepos = JSON.parse(includedReposContent);

        if (Array.isArray(includedRepos) && includedRepos.length > 0) {
          const byName = new Map(repositories.map(repo => [repo.name.toLowerCase(), repo]));
          repositories = includedRepos
            .map(name => byName.get(name.toLowerCase()))
            .filter(Boolean);

          const missing = includedRepos.filter(name => !byName.has(name.toLowerCase()));
          if (missing.length > 0) {
            console.warn(`⚠️  Included repos not found on GitHub: ${missing.join(', ')}`);
          }
          console.log(`✅ Keeping ${repositories.length} opted-in repositories (in list order)`);
        } else {
          console.warn('⚠️  included_repos.json is empty — no repositories will be shown');
          repositories = [];
        }
      } catch (err) {
        console.warn('⚠️  Failed to parse included_repos.json:', err.message);
      }
    } else {
      console.log('📝 No included_repos.json found, including all repositories');
    }

    // Ensure public directory exists
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