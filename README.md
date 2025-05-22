# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features GitHub integration, dark mode, and smooth animations.

## Features

### 🚀 Core Features
- **GitHub Integration**: Automatically fetches and displays your public repositories using GitHub GraphQL API
- **Dark/Light Mode**: Toggle with localStorage persistence and system preference detection
- **Responsive Design**: Mobile-first approach with clean, modern aesthetics
- **Smooth Animations**: Powered by Framer Motion for page transitions and interactive elements

### 🎨 Design
- **Monochrome Theme**: 
  - Background: `#111111` (off-black)
  - Surface: `#fdfcf9` (slightly beige white)
  - Accent: `#b23b3b` (tame red)
- **Typography**: Playfair Display for headers, Inter for body text
- **Components**: Rounded corners, shadows, and polished spacing

### 📱 Pages
- **Home (/)**: Hero section, featured projects grid, contact section
- **Resume (/resume)**: PDF viewer/download with fallback contact info

## Setup Instructions

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd vihdutta.com
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

**To get a GitHub token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `public_repo` scope (read-only access to public repositories)
3. Copy the token to your `.env` file

### 3. Customize Content
- **Personal Info**: Update `src/components/Header.tsx` and `src/pages/Home.tsx` with your name and contact details
- **Projects Metadata**: Edit `public/projects_metadata.json` to add custom descriptions for your repositories
- **Resume**: Place your `resume.pdf` file in the `public/` directory
- **Analytics**: Update the analytics script in `index.html` with your tracking ID

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Deployment to GitHub Pages

### Automatic Deployment
```bash
npm run deploy
```

This will:
1. Build the project
2. Deploy to GitHub Pages using the `gh-pages` branch

### Manual Setup
1. Enable GitHub Pages in your repository settings
2. Set source to "Deploy from a branch" → `gh-pages` branch
3. Update the `homepage` field in `package.json` with your GitHub Pages URL
4. Update the `base` field in `vite.config.ts` to match your repository name

## Project Structure

```
/
├── public/
│   ├── projects_metadata.json  # Custom project descriptions
│   ├── resume.pdf             # Your resume (place here)
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Navigation with dark mode toggle
│   │   ├── ProjectCard.tsx    # GitHub repo display card
│   │   └── LoadingSpinner.tsx # Loading animation
│   ├── hooks/
│   │   ├── useGitHubRepos.ts  # GitHub API integration
│   │   └── useDarkMode.ts     # Dark mode state management
│   ├── pages/
│   │   ├── Home.tsx           # Main portfolio page
│   │   └── Resume.tsx         # Resume viewer/download
│   ├── types/
│   │   └── github.ts          # TypeScript definitions
│   └── ...
├── .env.example               # Environment variables template
├── tailwind.config.js         # Tailwind configuration
└── vite.config.ts            # Vite configuration
```

## Customization Guide

### Adding Project Metadata
Edit `public/projects_metadata.json`:
```json
{
  "your-repo-name": {
    "details": [
      "Custom bullet point about this project",
      "Another detail explaining the tech stack",
      "What makes this project special"
    ]
  }
}
```

### Ignoring Repositories
Edit `public/ignored_repos.json` to hide specific repositories:
```json
[
  "private-repo",
  "test-repository", 
  "archived-project",
  "vihdutta.com"
]
```

### Styling Customization
- **Colors**: Update `tailwind.config.js` for theme colors
- **Fonts**: Modify the Google Fonts import in `index.html` and font families in `tailwind.config.js`
- **Components**: Edit component styles in `src/index.css`

### Analytics Setup
Replace the placeholder in `index.html`:
```html
<!-- Replace with your analytics -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing
- **Vite** - Build tool
- **GitHub GraphQL API** - Repository data
- **GitHub Pages** - Hosting

## License

MIT License - feel free to use this template for your own portfolio!

## Support

If you encounter any issues or have questions, please open an issue in the repository.
