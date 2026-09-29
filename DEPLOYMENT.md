# Publishing

The supported publishing method is `.github/workflows/deploy.yml`. It checks lint, TypeScript, content, and tests, builds the site, and deploys to GitHub Pages on `main`. Pull requests run checks but do not deploy. The old `gh-pages` npm deployment command has been removed.

## Current custom domain

- Keep GitHub Pages configured to use **GitHub Actions**.
- The workflow sets `CUSTOM_DOMAIN: 'true'`, which builds URLs relative to `/`.
- `public/CNAME` contains `vihdutta.com` and is included in the build.
- No repository-fetch token or `VITE_GITHUB_TOKEN` secret is required anymore.
- Use Node 22, matching `.nvmrc` and CI.

To preview the custom-domain build without publishing:

```bash
npm run build:custom-domain
npm run preview:custom-domain
```

To publish, commit reviewed changes and push/merge to `main`. Local editing, previewing, and building never deploy.

## GitHub Pages project path

The default `npm run build` uses `/portfolio/`. `npm run dev:preview` builds this version and opens the local production preview. To host at `https://vihdutta.github.io/portfolio/` instead of the custom domain, set `CUSTOM_DOMAIN: 'false'` in the workflow, remove `public/CNAME`, and update the Pages custom-domain settings.

`public/404.html` and the small script in `index.html` support direct links to project/contribution pages. The build adjusts the fallback for `/` versus `/portfolio/`; keep both files.

## Recovery

Check the Actions log if publishing fails. Run `npm run check` locally to reproduce content, lint, and build errors. A failed build does not replace the current deployment. If a published content change is wrong, revert that commit and push the correction to `main`.
