# hassanhamid.my

Personal website of **Hassan Hamid**: *Lifelong Learner & Independent Creator*.

> A Digital Legacy of Ideas, Creativity & Purpose.

---

## 1. Project overview

A single-page, bilingual (Bahasa Melayu / English) static website. It presents Hassan Hamid's journey from civil engineering and Islamic development studies to writing, nasyid, educational songs, AI-assisted illustration and physical products.

The design direction is **approved**: editorial, classic, digital gallery, personal legacy. It uses charcoal, warm ivory, muted gold, serif headlines and restrained motion. Future changes should extend this design, not replace it.

## 2. Website purpose

- Tell Hassan's story, from engineering to experience to creativity to legacy ("Misi di Hujung Usia").
- Present his works as **one connected creative journey**: Idea → Text → Music → Video → Illustration → Product.
- Present Quran-related work carefully, as creative and educational *supporting* material. It is **not** a replacement for Quran learning, tafsir or scholarship.
- Be **store-ready** for digital and physical products, without an e-commerce system yet.

**Content rule:** everything on the site must be supported by Hassan's own profile document. Do not add awards, clients, credentials, statistics, testimonials, prices or social accounts unless Hassan confirms them.

## 3. Technology used

- Plain **HTML5**, **CSS3** and **vanilla JavaScript**
- No frameworks, no build step, no dependencies
- System font stack (Georgia serif + system sans-serif), so no web fonts are loaded
- WebP images with PNG/JPG fallback via `<picture>`

## 4. Folder structure

```
/
├── index.html          Page markup (BM default copy lives here)
├── styles.css          All styles, grouped by section
├── script.js           Translations, language toggle, mobile menu, reveal animation
├── README.md
├── .gitignore
├── .nojekyll           Tells GitHub Pages to serve files as-is
└── assets/
    ├── hassan-creative-studio.png / .webp   Hero image
    ├── hassan-classic-study.png / .webp     Gallery (large tile)
    ├── hassan-hamid.jpg / .webp             Gallery (portrait tile)
    ├── og-image.jpg                         Social sharing preview (1200×630)
    └── favicon.svg
```

All paths are **relative** (`assets/...`), so the site works from any folder or domain.

## 5. How to run locally

Opening `index.html` directly in a browser works. A local server is closer to real hosting:

```bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve .
```

Then open <http://localhost:8000>.

## 6. Deploy to GitHub Pages

1. Push this repository to GitHub (see *First commit* below).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then branch **`main`**, folder **`/ (root)`**, and **Save**.
4. After about a minute the site is live at `https://<username>.github.io/hassanhamid.my/`.

**Custom domain (hassanhamid.my):**

1. In **Settings → Pages → Custom domain**, enter `hassanhamid.my` and save. GitHub creates a `CNAME` file in the repo.
2. At the domain registrar, set DNS:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<username>.github.io`
3. Once DNS resolves, tick **Enforce HTTPS**.

## 7. Deploy to normal hosting (cPanel / Apache / Nginx)

No build is needed. Upload the files as they are:

- **cPanel:** File Manager → `public_html/` → upload `index.html`, `styles.css`, `script.js` and the `assets/` folder. You can also upload a ZIP and extract it there.
- **FTP/SFTP:** copy the same files into the web root.
- **Nginx/Apache:** point the document root at this folder. `index.html` is served by default.

Do not upload `README.md`, `.git/` or `.gitignore`. They are harmless, but not needed.

## 8. How to update content

- **Bahasa Melayu text** appears in `index.html` *and* in `translations.ms` in `script.js`. **English text** is only in `translations.en`.
- When you change a translated line, update **both** languages in `script.js`, plus the BM text in `index.html`. The HTML copy is what visitors see before JavaScript runs, and what search engines read.
- Headings with line breaks or italics use simple HTML inside the translation strings, for example `"Line one<br><em>Line two</em>"`.
- **Contact email:** `hello@hassanhamid.my` is a **temporary placeholder**. Replace it in `index.html` in both the `href="mailto:..."` and the visible text.

## 9. How to add images

1. Export at a sensible size: about 1200–1600 px on the long edge for portraits, 800 px for product squares.
2. Save it to `assets/` with a lowercase, hyphenated name, e.g. `assets/melaka-magnet-01.jpg`.
3. Optionally create a `.webp` copy for faster loading, e.g. `cwebp -q 82 in.png -o out.webp`, or use squoosh.app.
4. Use it with meaningful alt text. Add `loading="lazy"` for anything below the first screen:

```html
<picture>
  <source srcset="assets/example.webp" type="image/webp">
  <img src="assets/example.jpg" width="1200" height="1600" loading="lazy" decoding="async"
       alt="Describe what the image shows">
</picture>
```

Use only approved Hassan visuals and his own artwork. Do not use stock photos or AI-generated people.

## 10. How to add a new work/project card

In `index.html`, inside `<div class="work-grid">`, copy an existing card:

```html
<article class="work-card">
  <span>16</span>
  <h3 data-i18n="w16">Tajuk dalam BM</h3>
  <p data-i18n="w16p">Penerangan ringkas dalam BM</p>
  <!-- optional, once a real page/link exists: -->
  <!-- <a class="work-link" href="works/example.html" data-i18n="viewProject">Lihat projek</a> -->
</article>
```

Then add `w16` and `w16p` to **both** `translations.ms` and `translations.en` in `script.js`. Add `featured` to the class (`class="work-card featured"`) to highlight a card. The grid reflows automatically: 3 columns on desktop, 2 on tablet, 1 on mobile.

**Timeline milestones** work the same way. Copy an `<li class="timeline-item">` inside `<ol class="timeline">`.

**Store products:** a commented product-card template sits above `<div class="product-grid" id="store-products">` in the Store section. The grid stays hidden while it is empty. Add products only with confirmed names, images and links. Do not add invented prices.

## 11. How the BM / EN language system works

- **BM is the default.** It is written directly into `index.html`.
- Any element with `data-i18n="key"` gets its content swapped from `translations[lang][key]` in `script.js`. Image alt text uses `data-i18n-alt="key"`.
- The header button shows the *other* language (`EN` while in BM, `BM` while in English).
- The choice is saved in `localStorage` under **`hh-language`** (`"ms"` or `"en"`) and restored on the next visit. If storage is blocked, the site falls back to BM.
- `<html lang>` is updated on each switch for screen readers and search engines.
- Section labels such as *THE STORY* and *THE GALLERY* are intentionally English in both languages. That is part of the editorial design.

## 12. Future development notes

- **Real contact details** and **social links**: add them only once Hassan confirms them.
- **Audio (nasyid, educational songs):** use native `<audio controls preload="none" src="assets/audio/...">` inside a work card or a new project page.
- **Video:** embed YouTube or Facebook with `loading="lazy"` on the iframe, or link out.
- **Downloadable PDFs** (lyrics, teacher guides): place them in `assets/downloads/` and link with `download`.
- **Project pages:** for deeper content (e.g. *Reflections of Iman*, *Periodic Table Song*), create `works/<slug>.html` reusing `styles.css` and `script.js`, and link from the matching card.
- **Store:** when products are ready, fill `#store-products` with product cards that link to an external shop (Shopee, Etsy, WhatsApp order, etc.). A full e-commerce system is intentionally out of scope for now.
- **Gallery:** the three themed tiles (Islamic, Motivation, Melaka) are ready to become links to themed collections as artwork is added.
- Keep motion subtle. Respect `prefers-reduced-motion`, which is already handled in `styles.css`.

---

### First commit

```bash
git init
git add .
git commit -m "Initial commit: hassanhamid.my static site"
git branch -M main
git remote add origin https://github.com/<username>/hassanhamid.my.git
git push -u origin main
```
