# Vihaan's portfolio

React, TypeScript, Vite, and Tailwind CSS. All editable text lives in `src/content/`; project and contribution write-ups use Markdown. No GitHub token or CMS is needed to edit or build the site.

## Edit locally

Use Node 22 (the version in `.nvmrc`, also used by CI):

```bash
nvm use
npm install
npm run dev
```

If Node 22 is not installed, run `nvm install` first. If you don't use nvm, install Node 22 using your usual method.

Vite opens the site in your browser. Keep it next to VS Code, edit a content file, and save. Changes appear automatically; saving, building, and committing locally do **not** publish anything. Stop the preview with Ctrl+C.

| What you want to change | File |
| --- | --- |
| Name, tagline, degrees, coursework, section labels, footer links, page title | `src/content/site.ts` |
| Paper titles, author lists, venues, second-author badge, arXiv links | `src/content/publications.ts` |
| Project card text, order, GitHub link, preview, write-up | `src/content/projects/*.md` |
| Contribution stats, links, order, write-up | `src/content/contributions/*.md` |
| Colors, typography, card styles | `src/index.css` |

## Edit a write-up

Each Markdown file starts with a small YAML metadata block between `---` lines. Edit the text below it like a normal document:

```markdown
## Overview

Explain your work in paragraphs. Use **bold**, *italics*, and `inline code`.

## Key Highlights

- First result
- Second result

[External reference](https://example.com)
```

Use `##` for sections. On contribution pages, `###` starts a contribution card; everything until the next heading of the same or higher level belongs to that card. Keep PR and issue links in the card's text. Quotes (`> text`) render as callouts. Tables, fenced code blocks, and images are supported. Raw HTML/JSX is not supported.

The metadata fields are:

- `id`: permanent URL identifier. Keep existing IDs unchanged, including capitalization, to preserve links.
- `title`: display name; freely editable without changing the URL.
- `order`: lower numbers appear first. The first three projects appear on the homepage initially; the rest are behind “Show more projects.” Stars no longer reorder projects.
- `github`: repository URL.
- Project `details`: short homepage bullet points; `preview`: optional image URL.
- Contribution `stats`: quote values such as `"2"` and `"40K+"`. `highlight: true` emphasizes a stat; optional `homeLabel` changes just its homepage label.
- Contribution `cta`: the final button's label and URL.

Project and contribution order initially matches the previous site. There is no automatic repository discovery or GitHub metadata refresh; edit the Markdown files to add or update entries.

## Add a project or contribution

Copy `src/content/templates/project.md` into `src/content/projects/`, or copy the contribution template into `src/content/contributions/`. Give it a unique `id`, set its `order`, and replace the example content. Vite discovers new `.md` files automatically. Templates do not appear on the site.

An existing page stays available at `/projects/<id>` or `/contributions/<id>` even if you rename its Markdown file or display title. Removing the file removes the page.

## Images and links

Put local images in `public/images/`. Refer to them using paths from `public/`, not your computer's filesystem:

```markdown
![A useful image description](/images/demo.png)

[Another project](/projects/autosort)
```

Use the same `/images/demo.png` form for `preview` metadata. The renderer adds the deployment prefix automatically, so these work locally, on the custom domain, and under `/portfolio/`. Full `https://` image URLs also work, but need internet access. The site font is loaded from Google Fonts, with a system fallback.

## Check before publishing

```bash
npm run check
npm run dev:preview
```

`check` runs lint, content tests, content validation, TypeScript, and the production build. `dev:preview` builds and opens the production site locally. Neither command contacts the GitHub API or publishes. The default production preview uses `/portfolio/`; open the URL Vite prints.

Errors identify the file and invalid field. Validation checks metadata, duplicate IDs, local image paths, and local links. It does not verify that external websites are reachable or that your claims are accurate. Resolve errors in the terminal/browser overlay, save, and retry.

For a quick content-only check, run `npm run content:check`.

## Publish

Work on a branch for drafts. Pushing or merging to `main` triggers the existing GitHub Actions deployment; pushing another branch does not publish the site. See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting settings and custom-domain previews.
