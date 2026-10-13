# sukreenhana

Personal academic website for **Assoc. Prof. Dr Sukreen Hana binti Herman**, Microwave Research Institute (MRI), Universiti Teknologi MARA.

Plain HTML, CSS and vanilla JS, with no build step. To preview it, open `index.html` in a browser.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and fixed copy (hero, education, profiles, contact) |
| `styles.css` | Design tokens (light and dark), layout, components |
| `script.js` | Research-area grouping, chart, publication search, grant and supervision filters, theme, animations |
| `data.js` | All grants, publications, consultations and supervisions, taken from the UiTM Expert CV |
| `assets/portrait.*` | Portrait from the CV (WebP with a JPG fallback) |

## Updating content

Edit `data.js`. Counts, the chart, the research-area numbers and the filters are all calculated from it automatically.

Research areas are keyword groups over publication titles. They are defined in `AREAS` at the top of `script.js`.

## Content rule

Everything on the site comes from the UiTM Expert CV. The hero bio and the research-area descriptions are written summaries of that CV, so ask Dr Sukreen Hana to confirm them before going live. Do not add awards, photos, social accounts or claims she has not confirmed.

## Deploy: Laravel Forge VPS + domain from Exabytes

The site is static, so Forge only needs to serve the `sukreenhana/` folder. It needs no PHP, Composer or build step.

### 1. Create the site in Forge
1. Open the server in Forge, go to **Sites → New site**.
2. **Domain:** `sukreenhana.my`. Add the alias `www.sukreenhana.my`.
3. **Project type:** Static HTML (or "General PHP" if Static is not listed).
4. **Web directory:** `/sukreenhana`. This folder holds `index.html`.
5. Create the site.

### 2. Connect the repository
1. On the site, open **Git repository** (Install repository).
2. Provider: GitHub. Repository: `adilamaxxan/hassanhamid.my`. Branch: `main` once merged, or `claude/epic-mendel-9xqtiu` for now.
3. Untick **Install Composer dependencies**.
4. Replace the deploy script with:
   ```bash
   cd $FORGE_SITE_PATH
   git pull origin $FORGE_SITE_BRANCH
   ```
5. Turn on **Quick Deploy** so every push redeploys the site automatically.

### 3. DNS at Exabytes
Go to Exabytes client area → **Domains → My Domains → sukreenhana.my → Manage → DNS Management**. The domain must use Exabytes nameservers for this.

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | VPS IP (shown on the Forge server page) | 3600 |
| A | `www` | same VPS IP | 3600 |

Delete any existing parking or default `A`/`CNAME` records for `@` and `www`. Wait for the records to resolve, which usually takes 15 minutes to a few hours. Check with `dig +short sukreenhana.my`.

### 4. HTTPS
After DNS points to the VPS, go to Forge → site → **SSL → Let's Encrypt**. Enter `sukreenhana.my,www.sukreenhana.my` and obtain the certificate. Forge renews it automatically.
