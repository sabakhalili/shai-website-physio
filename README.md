# Physiotherapist website

Static site (no build step) with a feedback form backed by a Google Apps
Script + Google Sheet. Built per the PRD spec; see that doc for full
background. Three pages: `index.html` (Home), `feedback.html`, and
`testimonials.html` (migrated from her previous Weebly site).

## What's real vs. placeholder right now

Everything is fully functional (structure, styling, form validation, Apps
Script code), but the following still need real content before this goes
live. All of it lives in one file, [`js/config.js`](js/config.js), except
where noted:

- [x] Her name (Dr. Shaiqua Khalili (PT)) and bio
- [ ] City served
- [x] Degrees (BPT, MPT in Sports, Diploma in Nutrition & Dietetics) and
      years of experience (5+). Registration number chip was removed by
      request — add it back to `js/config.js`'s `credentials` array if she
      wants it shown.
- [x] Final list of services (6 confirmed: Pain Management, Post-Surgery
      Rehab, Sports Injury, Women's Health, Healthy Ageing, Ergonomics &
      Posture)
- [x] Testimonials page (`testimonials.html`) — 5 testimonials migrated from
      her old Weebly site, with photos where the old site had one (`assets/
      testimonials/`). Confirm she's still fine with these being public on
      the new site too.
- [x] WhatsApp number, phone number, email (+91 98214 23419,
      shaiquakhalili@gmail.com), and service hours (Mon–Sat, 9 AM–7 PM)
- [x] A real photo for the About section (`assets/about-photo.jpg`, 480×480,
      ~68 KB)
- [x] A real hero background image (`assets/hero-photo.jpg`, 949×798,
      ~144 KB — migrated from her old Weebly homepage)
- [ ] `assets/og-image.jpg` — a real 1200×630 share-preview image (doesn't
      exist yet; link previews on WhatsApp won't render correctly until it's
      added)
- [ ] Google Review link
- [ ] Apps Script web app URL, once deployed (see below)
- [ ] Final visual design — current CSS (`css/styles.css`) is intentionally
      plain/neutral. Once the approved mocks are shared, restyle colors,
      type, and spacing there; no HTML/JS changes should be needed.

## Local preview

```bash
npx serve .
```

or any other static file server, then open `http://localhost:PORT`.

## Setting up the feedback backend (Google Apps Script)

1. Create a new Google Sheet (this becomes her feedback store).
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete the default `Code.gs` contents and paste in the contents of
   [`apps-script/Code.gs`](apps-script/Code.gs) from this repo.
4. Optionally set `NOTIFY_EMAIL` near the top of the script to get an email
   on each new submission.
5. **Deploy → New deployment → type "Web app"**.
   - Execute as: **Me** (so it writes as the Sheet owner)
   - Who has access: **Anyone**
6. Copy the resulting `/exec` URL and paste it into `js/config.js` as
   `appsScriptUrl`.
7. **Every time you edit `Code.gs`, you must create a new deployment
   version** (Deploy → Manage deployments → edit → new version) — otherwise
   the old code keeps running.
8. Share the Sheet only with her (and you, if needed) — never as
   link-viewable, since it holds contact details.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Import Project** → select the repo.
   - Framework preset: **Other**
   - Build command: none
   - Output directory: repo root
3. Push to `main` for production; other branches get preview URLs.
4. Optional: add a custom domain in Vercel and point DNS at it — HTTPS is
   automatic.
5. Check Vercel's current Hobby plan terms on commercial use before going
   live; Cloudflare Pages or Netlify are drop-in alternatives if needed.

## Security

- **Headers** (`vercel.json`, mirrored locally by `dev-server.py` so they can
  actually be tested): a strict `Content-Security-Policy` (`default-src
  'self'`, only `script-src`/`style-src`/`img-src 'self'`, `connect-src`
  scoped to `script.google.com`/`script.googleusercontent.com` for the
  feedback form's fetch, `frame-ancestors 'none'`, `object-src 'none'`),
  plus `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Strict-Transport-Security`, and a locked-down `Permissions-Policy`.
- **No inline `<script>` blocks** on any page — everything lives in `js/*.js`
  — so the CSP above needs no `'unsafe-inline'` for scripts. The only inline
  `<script>` left is the `application/ld+json` block on `index.html`, which
  is inert data, not executable, and isn't governed by `script-src`.
- All dynamic content is rendered with `textContent`/DOM APIs, never
  `innerHTML` or `eval`, so data from `js/config.js` (or, later, real
  patient-submitted feedback) can't inject markup or script.
- Every `target="_blank"` link has `rel="noopener"` to prevent reverse
  tabnabbing.
- Client + server-side validation, a honeypot field, and a formula-injection
  guard on the feedback form — see §5.5/§5.6 of the PRD and
  [`apps-script/Code.gs`](apps-script/Code.gs).
- If `appsScriptUrl` ever needs a different Google Cloud project/domain
  (it shouldn't), update `connect-src` in both `vercel.json` and
  `dev-server.py` to match.

## Test checklist before sharing with her

- [ ] Submit with only comments (required) → row lands in the Sheet
- [ ] Submit with name filled in too → value lands in the correct column
- [ ] Empty comments → shows an inline error
- [ ] Fill the hidden `website` field (e.g. via devtools) → no row is
      written, form still shows the success state
- [ ] Point `appsScriptUrl` at a bad URL or go offline → error state shows,
      entered data is kept, button re-enables
- [ ] Enter `=1+1` as a comment → stored as plain text in the Sheet, not a
      formula
- [ ] Tap WhatsApp and Call buttons on a real Android phone and an iPhone
- [ ] Paste the deployed link into a WhatsApp chat → preview card renders
      (needs `assets/og-image.jpg` in place first)
- [ ] Check both pages at 375px width

## Editing content day-to-day

Everything that changes per-business — contact details, links, services,
credentials, copy — lives in [`js/config.js`](js/config.js). Editing that
file doesn't touch any page markup.
