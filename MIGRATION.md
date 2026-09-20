> **Folder location updated September 20, 2026:** the Docusaurus project now lives directly in `~/Desktop/www/havelund-com/`. References below to the original website in the parent directory describe the earlier migration layout. The complete pre-move folder is preserved in `../havelund-com-backup-2026-09-20.zip`.

# Migration record

## Current inclusion rule

The user requested that only material reachable from the original homepage be
imported, together with the later explicitly requested additions. The local link
audit reached nine HTML pages and found none of the 59 imported microsite pages.
Their generated index and the “Workshops & projects” navigation entry were removed.
External links remain external, including links to runtime-verification.org;
similarly named local directories are not assumed to be those external sites.

`reachability-audit.json` records the traversal and exclusions. Excluded imports
are saved locally in `migration-excluded/`, which is neither published nor tracked
by Git. All 202 publication entries and all files referenced by maintained content
are retained. The original website in the parent directory is untouched.

The sections below record the earlier migration stages; their statements about
including historical microsites are superseded by this inclusion rule.

## Initial migration

The original website is still in the parent directory; no original files were changed by this migration.

- 202 publication entries imported into editable `data/publications.yml`, including PS and external links, not only PDFs.
- Seven original content pages converted to Markdown: research, contact, invited presentations, committees, workshops, events, and Java PathFinder.
- A token-count comparison found no words omitted from the seven converted page bodies. See `migration-text-audit.json` for the initial result. This checks text preservation, not historical factual accuracy.
- The homepage was rewritten using the prototype introduction and existing affiliation/membership details. The original homepage remains in `static/archive/index.html`.
- All public original root HTML pages are preserved under `static/archive/`. The original publication page preserves section headings, book notes, and other surrounding prose, in addition to the searchable publication entries.
- 1,080 public assets were copied with a SHA-256 manifest in `migration-manifest.json`. This includes Publications, images, historical conference/workshop sites, and source downloads. ADMIN, hidden files, editor backups, and personal exports are excluded.
- Historical directories retain their original paths, including the existing spelling `runtime-verfication`.
- Old root HTML URLs such as `papers.html` and `research.html` redirect to their modern equivalents. Historical in-page anchor names may differ on converted Markdown pages; the original pages remain archived.
- Added the rebuilt short CV from `Desktop/www/CV/cv-short/cv-havelund-short.pdf`, which had not been present in the website's Publications folder.
- Added a correctly named alias for `Publications/:fuzz-testing-ictac-2025.pdf` because the existing publication link used `fuzz-testing-ictac-2025.pdf`. The original file was preserved.

## Restored download

`Publications/tracecontract-ladee.pdf` was recovered from the local literature collection. The title and authors were checked against the cited paper. It is now included in both the original Publications directory and the new site's static/Publications directory, and indexed for full-text search.

## What the checks do not establish

Historical pages and external URLs are preserved, not rewritten or exhaustively checked against the live internet. Historical forms, CGI programs, and other server-side behavior are not supported by static hosting and may no longer function. The archive retains their original content. No GitHub or Bluehost publication or domain changes have been made.

## Completion audit

The publication category notes now have an editable modern page at `/publication-notes`, linked from Publications. It preserves the Java coding standard, books and book chapters, white papers, RAISE project narrative and documents, theses, and technical reports. DBLP, Google Scholar, and ResearchGate are linked from Publications. Homepage affiliation details and links have been restored.

`content-migration-audit.json` records zero omitted words for the seven converted pages and the publication notes, and zero missing public assets in the inventoried directories. Historical conference and project microsites retain their original appearance and URLs; they are linked from Talks & service.

Excluded from deployment: `review_for_paper.cgi.html`, a saved private conference-review page, along with ADMIN, editor backups, and personal exports. The original files remain untouched. Original decorative layout, template credits, and the third-party visitor-tracking widget were not incorporated into the new design.

## Standalone native site

59 workshop, teaching, and project HTML pages have been converted into Markdown using the Observatory layout. See `native-history-migration.json`. The `/history` directory and Talks & service link to these native pages. Search indexes the new pages instead of the legacy HTML. Homepage and footer archive links have been removed. Historical dates and event information are retained; old registration forms are presented as historical text, not working transactions. Original HTML copies remain only for preservation, not as a content dependency.
