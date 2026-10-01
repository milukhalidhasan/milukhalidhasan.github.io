# Md. Khalid Hasan Milu — Portfolio

Personal research portfolio: agroforestry and environmental research, GIS, remote sensing and UAV-based
precision agriculture. Plain HTML, CSS and JavaScript, no build step.

## Sections
1. **About**: research summary and focus areas
2. **Research**: field work and research projects
3. **Skills**: programming, geospatial, analysis and tools
4. **Projects**: GitHub projects, filterable by category and searchable
5. **Publications**: book chapters, research papers and conference presentations
6. **Experience**: roles, education and awards
7. **Certifications**: trainings and certificates
8. **Contact**: email, academic profiles and a contact form

Also: light/dark mode, scroll progress bar, back-to-top button, animated stats, mobile menu,
and animations that respect reduced-motion settings.

## Run it
Open `index.html` in your browser.

## Editing content
- **Text, publications, experience, certifications and awards**: edit `index.html`. Each section is
  marked with a `═══════ SECTION NAME ═══════` comment.
- **Gallery**: put photos in `images/gallery/` and list them in `GALLERY` in `script.js`. The section stays hidden until a photo loads.
- **Projects**: edit the `PROJECTS` list at the top of `script.js`. Copy an entry to add one.
- **Stats bar numbers**: the `data-target` values in the stats bar in `index.html`.
- **Portrait**: `images/portrait.jpg`.
- **Colours**: tokens at the top of `styles.css`: `--lime` (accent), `--ink` (dark buttons), `--sky-*` and `--hill-*` (hero and banner), with a dark-mode set below them.

## Publish free with GitHub Pages
Repo **Settings → Pages → Deploy from a branch**, pick your branch and `/ (root)`.
