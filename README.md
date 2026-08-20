# Farid Karimi — Portfolio (dragonfly-style)

A static Next.js portfolio deployed to GitHub Pages. All site content lives in editable
data files — you never need to touch components to update text.

## How to update content

Edit any file below in GitHub's web editor (or locally) and commit to `main`.
A GitHub Action rebuilds the site and publishes it to GitHub Pages automatically.

| What you want to change | File |
|---|---|
| Name, email, socials, form endpoint | `src/content/site.json` → `site` |
| Hero headline / subtitle / status line | `src/content/site.json` → `hero` |
| Marquee (skills ticker) | `src/content/site.json` → `marquee` |
| Services section | `src/content/site.json` → `services` |
| About paragraphs + hook | `src/content/site.json` → `about` |
| Stats (the 3 numbers) | `src/content/site.json` → `stats` |
| Projects + modal details | `src/content/site.json` → `projects` |
| Experience entries | `src/content/site.json` → `experience` |
| Education + certificates | `src/content/site.json` → `education`, `certificates` |
| Contact channels | `src/content/site.json` → `contactChannels` |
| Blog posts | `src/content/blog/*.md` (frontmatter: `title`, `date`, `tags`, `excerpt`) |
| Nav menu + footer links | `src/data/site.ts` |

JSON is forgiving: mind trailing commas (no trailing commas allowed) and valid
quotes. If the deploy fails, GitHub Actions shows the error on the repo's
"Actions" tab.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export (`out/`) and publishes it to Pages. Set Pages source to
"GitHub Actions" in repo Settings → Pages once.