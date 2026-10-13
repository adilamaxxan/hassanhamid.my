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
