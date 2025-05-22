# Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages using GitHub Actions.

## Prerequisites

1. **GitHub Repository**: Create a new repository on GitHub
2. **GitHub Token**: Generate a personal access token for GitHub API access
3. **Node.js 18+**: Ensure you have a modern Node.js version locally

## Step-by-Step Deployment

### 1. Repository Setup

```bash
# initialize git repository
git init
git add .
git commit -m "Initial commit: Complete portfolio setup"

# add your GitHub repository as origin
git remote add origin https://github.com/yourusername/vihdutta.com.git
git branch -M main
git push -u origin main
```

### 2. GitHub Secrets Configuration

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `VITE_GITHUB_TOKEN`
   - **Value**: Your GitHub personal access token

### 3. GitHub Pages Setup

1. Go to your repository **Settings**
2. Scroll down to **Pages** section
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on pushes to main branch

### 4. Personal Access Token Setup

1. Go to GitHub **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Set the following:
   - **Note**: "Portfolio website GitHub API access"
   - **Expiration**: Choose your preferred expiration (90 days, 1 year, or no expiration)
   - **Scopes**: Check only `public_repo` (access to public repositories)
4. Click **Generate token**
5. **Important**: Copy the token immediately and save it securely

### 5. Customize Your Portfolio

Before deploying, update these files with your personal information:

#### `package.json`
```json
{
  "homepage": "https://yourusername.github.io/vihdutta.com"
}
```

#### `vite.config.ts`
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/',
})
```

#### `src/components/Header.tsx`
- Update "Your Name" with your actual name

#### `src/pages/Home.tsx`
- Update the hero section with your information
- Update GitHub and email links in the contact section

#### `src/pages/Resume.tsx`
- Update email and GitHub links

#### `public/projects_metadata.json`
- Add metadata for your specific repositories

#### `public/resume.pdf`
- Add your actual resume PDF file

### 6. Local Development

```bash
# install dependencies
npm install

# create your .env file
cp env.example .env
# Edit .env and add your GitHub token

# start development server
npm run dev
```

### 7. Deploy

```bash
# commit your changes
git add .
git commit -m "Customize portfolio with personal information"
git push origin main
```

The GitHub Action will automatically:
1. Install dependencies
2. Build the project
3. Deploy to GitHub Pages

### 8. Access Your Site

Your portfolio will be available at:
```
https://yourusername.github.io/repository-name
```

## Troubleshooting

### Build Fails
- Check that your GitHub token is correctly set in repository secrets
- Ensure the token has `public_repo` scope
- Verify all file paths are correct

### 404 Errors
- Ensure the `base` path in `vite.config.ts` matches your repository name
- Check that GitHub Pages is configured to use GitHub Actions as source

### API Errors
- Verify your GitHub token is valid and not expired
- Check that the token has the correct scopes
- Ensure your repositories are public

### Dark Mode Issues
- Clear your browser localStorage if switching between builds
- Check that the dark mode class is being applied to the document element

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory containing your domain
2. Configure your domain's DNS to point to GitHub Pages
3. Update the analytics script in `index.html` with your domain

## Automatic Updates

The portfolio will automatically update whenever you:
- Push new code to the main branch
- Add new public repositories (they'll appear on the next build)
- Update the projects metadata file

Your portfolio is now live and will showcase your latest work automatically! 