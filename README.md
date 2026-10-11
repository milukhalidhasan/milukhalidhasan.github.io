# Md. Khalid Hasan Milu — Portfolio

Personal research portfolio focused on GIS and remote sensing: UAV and satellite imagery, photogrammetry,
vegetation-index time series and machine learning for precision agriculture. Plain HTML, CSS and JavaScript,
no build step.

## Sections
1. **About**: profile and next research goal
2. **Research**: current projects, the featured MS thesis study and earlier field studies
3. **Publications**: journal articles, book chapter, manuscripts under review and conference talks
4. **Experience**: roles, education, awards and languages
5. **Skills**: field and lab methods, statistics, UAV and remote sensing, programming
6. **Projects**: GitHub projects, filterable and searchable
7. **Training**: courses and certificates
8. **Gallery**: field photos, UAV maps and analysis figures, with filters and a full-screen viewer
9. **Contact**: email, academic profiles and a contact form
10. **References**: referees

Also: animated drone survey in the hero, light/dark mode, structured data for search engines,
a skip link and print styles.

## Icons and illustrations
Icons and scene artwork are hand-drawn SVG kept inside the site, with no icon fonts to load.
- **Icons**: one line-icon set, defined in the sprite at the top of `<body>` in `index.html`. Use one with
  `<svg class="ic" aria-hidden="true"><use href="#i-drone" /></svg>`; it takes the size and colour of the
  text around it. Add a new icon by copying a `<symbol>` and drawing on the same 24 × 24 grid.
- **Hero landscape**: a drone scanning a wheat field drawn in perspective, plus a weather station, GNSS
  tripod, wheat, trees and a satellite. These are hidden while the hero painting is shown. The pieces (`art-wheat`, `art-station`, …) are in the same sprite;
  `script.js` draws the field and places them along its far edge.
- **About tiles**: the four scenes (Soil, Leaf, Canopy, Sky) under the About text, in `index.html`.
- **Hero painting**: a Van Gogh-style harvest scene fills the first screen (`images/paintings/harvest.jpg`).
  As the drone passes, the crops turn into a false-colour vegetation-index map (`harvest-scan.webp`).
  If you replace the painting, rerun `node tools/make-scan-overlay.mjs` so the scanned copy matches it.
  If the painting is missing, the drawn field and props show instead.
- **Plot to prediction**: the five-step strip in the Research section.
- **Backdrops**: contour lines on the tinted sections and the wheat row on the footer are set in the
  `BACKDROPS` block of `styles.css`.

The drawings are illustrative only and do not show research data.

## Run it
Open `index.html` in your browser.

## Editing content
- **Text, publications, experience, certifications and awards**: edit `index.html`. Each section is
  marked with a `═══════ SECTION NAME ═══════` comment.
- **Gallery**: put images in `images/gallery/`, with a smaller copy of the same name in
  `images/gallery/thumbs/`, and list them in `GALLERY` in `script.js` with `photo(file, cat, caption, options)`.
  `cat` is `uav`, `field` or `fig`; the options are `shape` (`tall`, `wide`, `big` or `full`) and `pos`, the
  focus point of the crop. Images that fail to load are skipped. The shapes are chosen so that each category
  fills whole rows of the four-column grid, so check the grid for gaps after adding one.
- **Photo strip**: the row of photos that drifts right to left under About. It is built from the same
  `GALLERY` list (UAV and field photos, no charts), so new gallery photos join it automatically.
- **Projects**: edit the `PROJECTS` list at the top of `script.js`. Copy an entry to add one. `icon` is the
  icon shown when a project has no screenshot.
- **Stats bar numbers**: the `data-target` values in the stats bar in `index.html`.
- **Portrait**: `images/portrait.jpg`.
- **Fonts**: Georgia for all text (set in `--font-display` and `--font-body` in `theme.css`). Devices without
  Georgia (most Android phones and Linux) get Gelasio, a free font with the same letter widths, from `fonts/`.
  The base text size is set on `html` at the top of `styles.css`.
- **Colours**: tokens at the top of `styles.css`: `--lime` (accent), `--ink` (dark buttons), `--sky-*` and `--hill-*` (hero and banner), with a dark-mode set below them.

## Live site
Published at **https://milukhalidhasan.github.io/** from the `main` branch of
[milukhalidhasan/milukhalidhasan.github.io](https://github.com/milukhalidhasan/milukhalidhasan.github.io).
To update it, copy the site files there (`index.html`, `styles.css`, `theme.css`, `script.js`, `images/`,
`fonts/`) and push to `main`; GitHub Pages republishes within a minute or two.
