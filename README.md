# Klaus Havelund's website — Docusaurus

This is the new, self-contained website. Edit content in Markdown and publications in YAML. The light/dark themes, full-text PDF search, and runtime monitor are implemented separately from the content.

## Everyday editing

| What you want to change | File |
| --- | --- |
| Homepage and biography | `content/index.md` |
| Research | `content/research.md` |
| Blog posts | `blog/YYYY-MM-DD-post-title.md` |
| Awards and recognition | `content/awards.md` |
| Software | `content/software.md` |
| Contact details | `content/contact.md` |
| CV links | `content/cv.md` |
| Talks | `content/talks.md` |
| Professional service (committees, teaching, and institutional roles) | `content/committees.md` |
| Event organization | `content/workshops.md` |
| Events | `content/events.md` |
| Top navigation | `data/navigation.yml` |
| Publications | `data/publications.yml` |
| PDF files, including CVs | `static/Publications/` |

For example, change a paragraph directly in a `.md` file:

```markdown
## Runtime verification

I develop languages and tools for checking running software.

[See my publications](/publications)
```

Keep the `---` title block at the top. Pages use ordinary Markdown, not JSX. Add a new `.md` file in `content/` to create a page; `content/example.md` becomes `/example`. Add a navigation link in `data/navigation.yml` if it belongs in the top menu.

On the Software page, `###` headings start project cards under a single `## Projects · newest first` heading. Keep the Markdown cards in chronological order, newest project first, using the earliest documented project history (papers or commits) rather than a later GitHub upload date. Projects from the same period have an approximate order. Put language/topic labels in backticks, followed by a short description and a repository link. The build adds the card layout automatically. Keep repository listings here; Research contains research topics and contributions.

Research uses `##` sections and `###` entries. The first paragraph of each research area is its visible summary; later paragraphs appear under “Background”. Awards live separately in `content/awards.md`. Under `## Awards and recognition`, use `### Year · Award name` with the details underneath, newest first. The build supplies the frames and expandable rows.

Professional service stays in `content/committees.md` (at `/committees`). Keep conference entries first under `## Program committees`; the build groups these into expandable rows by year. Put courses next under `## Teaching`, then institutional roles at the end under `## Institutional service`, with `###` course/role headings. Introductory paragraphs remain above the cards. A submenu at the top links to all three sections.

### Write a blog post

Posts use [Docusaurus's Markdown blog format](https://docusaurus.io/docs/blog). Copy `blog/2026-09-20-first-post.md` to a new file such as `blog/2026-10-01-monitoring-notes.md`. Change the date in the filename and edit the front matter:

```yaml
---
title: Monitoring notes
slug: monitoring-notes
authors: klaus
draft: true
---
```

Write the introduction below the front matter, then put `<!-- truncate -->` before the rest of the post. The introduction appears on the blog list; the full text appears at `/blog/monitoring-notes/`. Use a unique `slug` for each post, and keep it unchanged after publishing so links stay valid. Posts appear newest first using the filename date.

Keep `draft: true` while writing. Drafts can be previewed with `npm start`, but are excluded from the production build, feeds, and site search. Set `draft: false` when ready, then run `npm run build`. This updates the local build; uploading/deploying it is still a separate step. The blog initially shows “No posts yet”; the included draft is only an editable template.

The archive and RSS/Atom feeds are generated once a post is published. Published posts are automatically included in the website search; unlisted posts are excluded from search. Author information is in `blog/authors.yml`. Images can go in `static/img/` and be referenced as `![Description](/img/filename.png)`.

### Add a publication

1. Copy the PDF into `static/Publications/`.
2. Add an entry near the top of `data/publications.yml`:

```yaml
- title: "A New Paper"
  authors: "K. Havelund and A. Collaborator"
  year: 2026
  details: "Conference name, 2026."
  links:
    - label: pdf
      url: /Publications/new-paper-2026.pdf
```

Indentation matters in YAML: use spaces, not tabs. Existing `id` values should stay unchanged; new entries can omit `id`. Entries appear in file order, so place them where they belong. All PDF/text indexing and publication rendering happen during the build. Do not edit generated `data/navigation.json`, `data/publications.json` or `static/search/search-index*`.

### Update a CV

Replace the PDF in `static/Publications/` using the same filename. The links and search will use the replacement after the next build. LaTeX sources are maintained separately.

## Local preview

Prerequisites: Node.js 20 or newer (Node 22 LTS recommended), Python 3, and Poppler (`pdftotext`). On macOS, install Poppler with `brew install poppler` if necessary.

Run these from this directory:

```sh
npm ci
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
npm start
```

Visit `http://localhost:3000`. Markdown page edits refresh automatically. After editing publications, adding PDFs, or when you want refreshed search results, run `npm run prepare-content`; then refresh the browser. Search is generated at startup and on every production build, not on every Markdown keystroke.

To build and check the production website:

```sh
npm run build
npm run check
npm run serve -- --port 3000
```

## Search

Header search uses whole-word search. Press `/` outside a text field to focus it. `rust` matches Rust, not trust. Quote phrases, e.g. `"temporal logic"`. Results include PDF excerpts and physical PDF page numbers; browser PDF viewers normally honor `#page=N`. The first search lazily loads a compressed index of about 3.5 MB and runs in a browser worker. There is no external search account or server.

Search indexes published Markdown content, publication metadata, and PDF text. PDF text extraction cannot perfectly preserve equations or complex layouts; image-only files would need OCR. `static/search/search-coverage.json` reports coverage and missing downloads. The build uses a content-hash cache in `.cache/` to avoid re-extracting unchanged PDFs.

## GitHub publishing

This directory is the repository root for `havelund/havelund.github.io`. The configured website address is **https://havelund.com/**. In repository Settings → Pages, **GitHub Actions** is the source and `havelund.com` is the custom domain.

The workflow in `.github/workflows/deploy.yml` installs Node, Python, and the PDF text extractor, builds and checks the site, then publishes it on each push to `main`.

After editing Markdown, publication data, or PDFs:

```sh
git add .
git commit -m "Update website"
git push
```

Check the repository's **Actions** tab for the deployment result. The `build/`, `node_modules/`, caches, and the `migration-excluded/` backup are ignored; GitHub builds the site from its source files.

The domain is verified in GitHub Pages, and `url` in `docusaurus.config.js` uses `https://havelund.com`. The DNS cutover from Bluehost is in progress. The target website records are four `A` records for `@` (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` for `www` pointing to `havelund.github.io`. Keep the GitHub verification TXT record. Once DNS resolves to GitHub and its certificate is ready, enable **Enforce HTTPS** in Pages settings.

Email remains at Bluehost: `mail.havelund.com` has an `A` record pointing to `162.241.225.60`, and the domain's MX points to `mail.havelund.com` with priority 0. Allow the previous mail records' four-hour TTL to expire before switching the apex website records. Keep domain registration renewed independently of hosting, and retain Bluehost service while it provides email.

## Preserved content

Only original content reachable from the old homepage is included, together with the later requested additions. `reachability-audit.json` records the original link traversal and exclusions. Unlinked folder imports were moved to `migration-excluded/`, outside published content and search. The original website and terminal prototype are preserved in the ZIP backup described below. Do not copy that backup directory into `static/` or restore the removed “Workshops & projects” menu.

See `MIGRATION.md` for the migration inventory and limits. Edit this directory as the website source of truth.

## Project location and original backup

The Docusaurus project and Git repository are now directly in `~/Desktop/www/havelund-com/`; there is no nested `docusaurus-site/` folder.

The complete folder before this move is saved beside the project as `../havelund-com-backup-2026-09-20.zip`. It includes the original website, terminal prototype, and the Docusaurus project as it existed before the move. The archive was verified against every source file and symlink before moving anything. Keep this ZIP as the original-site backup; it is outside the Git repository.

Publication structure: keep each entry’s `group` in `data/publications.yml`. Original section order and contextual text are in `data/publication-groups.yml`; the build produces `publication-groups.json`.
