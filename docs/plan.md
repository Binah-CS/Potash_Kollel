## Plan: Implement Shutafut Static Site Prompt

TL;DR - Replace the current single-page media prototype with a 6-page RTL static website using shared `css/styles.css`, minimal vanilla JS, and optional i18n support.

**Steps**
1. Audit current workspace files and note existing content.
   - `index.html` currently single-page media site.
   - `css/styles.css` currently uses a different color scheme and no required variables.
   - `js/script.js` currently only smooth scroll + lazy loading.
2. Create the required root HTML files:
   - `index.html`
   - `about.html`
   - `partnership.html`
   - `donate.html`
   - `kvitel.html`
   - `contact.html`
3. Replace current CSS with `css/styles.css` at workspace root.
   - Add the mandatory `:root` CSS variables exactly as requested.
   - Add the required global reset, RTL settings, `@font-face` loading from `assets/fonts/`, and component styles.
   - Use `YiddishkeitAlefAlefAlef-Bold` for all headings and `drugulinclm-bold-webfont` for all other text.
   - Implement navbar, hero, buttons, modal, image grid, donation cards, contact form, and page layout styles.
4. Create or replace `main.js` in workspace root.
   - Add mobile navbar toggle.
   - Add modal open/close logic.
   - Add lightbox support if needed.
   - Add donation button behavior and kvitel/contact form handlers.
   - Add active navbar link highlight logic.
5. Use the existing asset subfolders under `/assets/` rather than a single folder.
   - `assets/images/`
   - `assets/videos/`
   - `assets/audio/`
   - `assets/fonts/`
   - Load assets from those folders in HTML and CSS.
   - Use comments in HTML for placeholder replacement guidance.
6. Implement the i18n enhancement.
   - Create `/lang/yi.json` and `/lang/he.json`.
   - Add `i18n.js` engine.
   - Update HTML to use `data-i18n` and `data-i18n-ph` attributes.
   - Add a language switcher container in the navbar.
7. Keep all design in one shared CSS file and avoid inline style tags in HTML except per-page hero image overrides.
   - Use per-page `<style>` blocks only for `--hero-bg-image` definitions.
8. Verify the result.
   - Open each HTML page locally and confirm RTL layout, navbar, hero backgrounds, and forms.
   - Confirm `css/styles.css` contains the required `:root` variables and imports.
   - Confirm `main.js` is minimal and works without frameworks.

**Relevant files**
- `index.html`, `about.html`, `partnership.html`, `donate.html`, `kvitel.html`, `contact.html`
- `css/styles.css`
- `main.js`
- `/assets/` and optional `/lang/`

**Verification**
1. Each HTML file loads in browser with shared `css/styles.css`.
2. `css/styles.css` begins with Google Fonts import and required `:root` variables.
3. Navbar is responsive and mobile toggles without external libraries.
4. Buttons, hero overlay, forms, and cards use CSS variables only.
5. Optional i18n switcher loads `yi` and `he` correctly.

**Decision**
- Implement the prompt as a complete site rewrite rather than incremental patching of the current page.
- Maintain current workspace but replace file contents/files where needed.
