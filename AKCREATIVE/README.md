# AK CREATIVE

The hub for every project AK Creative builds: websites, media, systems and apps.

- **GitHub:** `github.com/akcreative` (organization, Free plan). *Not created yet. See section 3.*
- **Server:** Forge → organization **AK THEORY** → server **AKSPACE** (Singapore, Ubuntu 24.04, PHP 8.4).
- **Domains:** Exabytes (billing.exabytes.my).

---

## 1. Structure

Each project gets its own repo under the `akcreative` org. Repo names follow this pattern:

| Category | Repo name pattern | Example |
| --- | --- | --- |
| Website | `<domain without .my>` | `akcreative/sukreenhana` |
| System / web app | `<name>-system` or `<name>-app` | `akcreative/akwork-system` |
| API / backend | `<name>-api` | `akcreative/aurafara-api` |
| Media (logos, video, images) | `<client>-media` | `akcreative/sukreenhana-media` |

Rules:
- Branch `main` = live. Forge deploys automatically from `main`.
- Large media files (video, raw PSD) do not go into a website repo. Keep them in a `-media` repo or on Google Drive.
- Every repo has a `README.md`: what it is, its domain, how to deploy.

## 2. Project register

| Project | Domain | Type | Current repo | Forge site (AKSPACE) | AK Creative status |
| --- | --- | --- | --- | --- | --- |
| Sukreen Hana, academic website | sukreenhana.my | Static website | `adilamaxxan/hassanhamid.my` (folder `sukreenhana/`) | Not created yet | **Move first** → `akcreative/sukreenhana` |
| Hassan Hamid | hassanhamid.my | Static website | `adilamaxxan/hassanhamid.my` | Live | Can be moved later |
| Haliza Hamid | halizahamid.my | PHP website | (no repo in Forge) | Live | Needs a repo |
| AK Work System | app.akworksystem.my | System | `adilamaxxan/property-agent-os` | Live | Can be moved later |
| AuraFara Spa, admin/API | aurafara-api-…on-forge.com | System + WhatsApp bot | `adilamaxxan/spa-admin` | Live | Can be moved later |

> Move one project at a time. When you transfer a live repo, also update the repo in Forge (site → Settings → Repository) so deploys don't break.

## 3. Setup checklist (do these yourself)

### GitHub
- [ ] github.com → avatar → **Your organizations → New organization** → **Free** → name `akcreative`.
- [ ] In the org, create an empty repo: **`sukreenhana`** (Private). Do not tick "Add README".
- [ ] Install the Claude GitHub App on the `akcreative` org: https://github.com/apps/claude/installations/select_target
- [ ] Reconnect Claude: https://claude.ai/connect-github
- [ ] In Forge → Account → **Source Control** → GitHub → make sure the `akcreative` org is granted access.

### Moving the Sukreen Hana website
- [ ] Run `AKCREATIVE/pindah-sukreenhana.sh` (or ask Claude to do it). This copies the `sukreenhana/` folder into the root of the `akcreative/sukreenhana` repo and pushes it to `main`.

### Forge (server AKSPACE, no new server needed)
- [ ] AKSPACE → **New site → Static HTML**
  - Repository: `akcreative/sukreenhana`, branch `main`
  - Custom domain: `sukreenhana.my`
  - Web directory: `/` (the files are now at the repo root)
- [ ] Domains tab: add `www.sukreenhana.my`, then turn on **Let's Encrypt SSL** for both.
- [ ] Turn on **Push to deploy**.

### Exabytes DNS (sukreenhana.my)
- [ ] `A @` → AKSPACE IP
- [ ] `A www` → AKSPACE IP

## 4. Moving existing projects (optional, one at a time)

On GitHub: repo → **Settings → Danger Zone → Transfer ownership** → `akcreative`. GitHub redirects the old URL automatically, but update the repo name in Forge anyway.
