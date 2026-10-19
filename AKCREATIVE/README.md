# AK CREATIVE

The hub for every project AK Creative builds: websites, media, systems and apps.

- **GitHub:** `github.com/AKCREATIVE-DESIGN` (organization, Free plan). *Created ✓*
- **Server:** Forge → organization **AK THEORY** → server **AKSPACE** (Singapore, Ubuntu 24.04, PHP 8.4).
- **Domains:** Exabytes (billing.exabytes.my).

---

## 1. Structure

Each project gets its own repo under the `AKCREATIVE-DESIGN` org. Repo names follow this pattern:

| Category | Repo name pattern | Example |
| --- | --- | --- |
| Website | `<domain without .my>` | `AKCREATIVE-DESIGN/sukreenhana` |
| System / web app | `<name>-system` or `<name>-app` | `AKCREATIVE-DESIGN/akwork-system` |
| API / backend | `<name>-api` | `AKCREATIVE-DESIGN/aurafara-api` |
| Media (logos, video, images) | `<client>-media` | `AKCREATIVE-DESIGN/sukreenhana-media` |

Rules:
- Branch `main` = live. Forge deploys automatically from `main`.
- Large media files (video, raw PSD) do not go into a website repo. Keep them in a `-media` repo or on Google Drive.
- Every repo has a `README.md`: what it is, its domain, how to deploy.

## 2. Project register

| Project | Domain | Type | Current repo | Forge site (AKSPACE) | AK Creative status |
| --- | --- | --- | --- | --- | --- |
| Sukreen Hana, academic website | sukreenhana.my | Static website (EN \| BM) | `AKCREATIVE-DESIGN/sukreenhana` (main) | Live, HTTPS (Let's Encrypt), push-to-deploy | **Moved ✓ · Live ✓** · see that repo's README for the changelog |
| Hassan Hamid | hassanhamid.my | Static website | `adilamaxxan/hassanhamid.my` | Live | Can be moved later |
| Haliza Hamid | halizahamid.my | PHP website | (no repo in Forge) | Live | Needs a repo |
| AK Work System | app.akworksystem.my | System | `adilamaxxan/property-agent-os` | Live | Can be moved later |
| AuraFara Spa, admin/API | aurafara-api-…on-forge.com | System + WhatsApp bot | `adilamaxxan/spa-admin` | Live | Can be moved later |

> Move one project at a time. When you transfer a live repo, also update the repo in Forge (site → Settings → Repository) so deploys don't break.

## 3. Setup checklist (do these yourself)

### GitHub
- [ ] github.com → avatar → **Your organizations → New organization** → **Free** → name `AKCREATIVE-DESIGN` (done ✓).
- [x] In the org, create an empty repo: **`sukreenhana`** (Private). Do not tick "Add README".
- [x] Install the Claude GitHub App on the `AKCREATIVE-DESIGN` org: https://github.com/apps/claude/installations/select_target
- [x] Reconnect Claude: https://claude.ai/connect-github
- [ ] In Forge → Account → **Source Control** → GitHub → make sure the `AKCREATIVE-DESIGN` org is granted access.

### Moving the Sukreen Hana website
- [x] Run `AKCREATIVE/pindah-sukreenhana.sh` (or ask Claude to do it). This copies the `sukreenhana/` folder into the root of the `AKCREATIVE-DESIGN/sukreenhana` repo and pushes it to `main`.

### Forge (server AKSPACE, no new server needed)
- [ ] AKSPACE → **New site → Static HTML**
  - Repository: `AKCREATIVE-DESIGN/sukreenhana`, branch `main`
  - Custom domain: `sukreenhana.my`
  - Web directory: `/` (the files are now at the repo root)
- [ ] Domains tab: add `www.sukreenhana.my`, then turn on **Let's Encrypt SSL** for both.
- [ ] Turn on **Push to deploy**.

### Exabytes DNS (sukreenhana.my)
- [ ] `A @` → AKSPACE IP
- [ ] `A www` → AKSPACE IP

## 4. Moving existing projects (optional, one at a time)

On GitHub: repo → **Settings → Danger Zone → Transfer ownership** → `AKCREATIVE-DESIGN`. GitHub redirects the old URL automatically, but update the repo name in Forge anyway.

## 5. Notes

- The `sukreenhana/` folder in `adilamaxxan/hassanhamid.my` is the **old first version (v1)**. It is kept only as history. The live source of truth is `AKCREATIVE-DESIGN/sukreenhana`.
- The improvement plan for sukreenhana.my (on hold, waiting for material) is in `AKCREATIVE/sukreenhana-roadmap.md`.
