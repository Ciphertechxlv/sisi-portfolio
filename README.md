# Sisi Portfolio Website

A professional portfolio website for Sisi (Omoyeni) — Writer & Storyteller.
Companion site to Sisi's Wanted Board, sharing the same color system and
light/dark toggle for brand consistency across both.

---

## Folder Structure

```
sisi-portfolio/
├── index.html              ← Main webpage
├── css/
│   └── style.css            ← All styling
├── js/
│   └── main.js               ← All interactions & animations
├── assets/
│   └── images/                ← Put all photos here
└── README.md                   ← This file
```

---

## What changed from the previous draft

1. **Color theme** — swapped the rose-pink/gold palette for the job
   board's ink/paper + coral/yellow/green/violet system, with the same
   light/dark toggle mechanic (button in the nav, saved via
   `localStorage`, no flash on load). Typography stays as Cormorant
   Garamond + Jost, since an elegant serif suits a writer better than the
   job board's condensed display face — JetBrains Mono was added for
   small labels/tags as a smaller nod to the companion site.
2. **Services → tabs** — the six service cards are now a pill-filter row
   (`#services`), matching the job board's role-filter interaction. Tap a
   pill, its description swaps into the panel below.
3. **Footer animations** — a quill pen glides across an ink-trail strip
   every time you scroll to the very bottom (replays every time, not just
   once), plus a small looping illustration of someone writing and
   pondering sits quietly in the corner as a bonus, always animating.
4. **Footer + contact merged** — "That's everything for now — you can
   reach out, let's work together" now opens the footer (fading in as you
   scroll to it), with the actual contact CTA and links sitting directly
   beneath it, instead of two disconnected blocks.

## How to Edit

### 1. Open in VS Code (recommended)
Download VS Code free at https://code.visualstudio.com
Open the folder: File → Open Folder → select `sisi-portfolio`

### 2. Open in Notepad (Windows) / TextEdit (Mac)
Right-click any file → Open With → Notepad / TextEdit

### 3. Preview changes
Double-click `index.html` to open in your browser.
After editing, save the file (Ctrl+S / Cmd+S) then refresh the browser (F5).

---

## Things to Update

### Personal info — in `index.html`
Search for these and replace with Sisi's real details:

| Placeholder              | Replace with                        |
|---------------------------|-------------------------------------|
| `omoyeni@email.com`        | Real email address                  |
| `@omoyeni` (Twitter)         | Real Twitter/X handle               |
| LinkedIn `href="#"`           | Real LinkedIn profile URL           |
| Substack href                    | Real Substack newsletter URL        |
| Lagos, Nigeria                     | Update city/location if needed      |

### Adding photos — polaroid collage (About section)
1. Put Sisi's photos in the `assets/images/` folder
2. Name them: `photo-1.jpg`, `photo-2.jpg`, `photo-3.jpg`, `photo-4.jpg`
3. In `index.html`, find the polaroid sections (search for "polaroid__placeholder")
4. Replace each placeholder div with an img tag, for example:

**Before:**
```html
<div class="polaroid__img">
  <p class="polaroid__placeholder">Add Omoyeni's photo here</p>
</div>
```

**After:**
```html
<div class="polaroid__img">
  <img src="assets/images/photo-1.jpg" alt="Sisi">
</div>
```

Repeat for photos 2, 3, and 4.

### Editing services
Each tab lives in `#serviceTabs` in `index.html` — the pill's visible text
is the service name, and its `data-desc` attribute is the description
shown in the panel when it's active. Add a new `<button class="tab-pill">`
following the same pattern to add a 7th service.

### Changing colours — in `css/style.css`
All colours are under `:root` (constant accents) and `[data-theme="dark"]`
/ `[data-theme="light"]` (backgrounds, text, borders per theme) near the
top of the file.

### Adding new work pieces
Copy any `.work-card` block in `index.html` and paste it inside `.work-grid`.
Update the title, type, excerpt, and `href` link.

---

## How to Host (Free Options)

### Option A — Netlify Drop (easiest, 30 seconds)
1. Go to https://netlify.com/drop
2. Drag the entire `sisi-portfolio` folder onto the page
3. Done — you get a live URL immediately
4. You can set a custom domain from the Netlify dashboard

### Option B — GitHub Pages (free, permanent)
1. Create a free GitHub account at https://github.com
2. Create a new repository named `sisi-portfolio`
3. Upload all files
4. Go to Settings → Pages → Source: main branch
5. Your site is live at `https://yourusername.github.io/sisi-portfolio`

### Option C — Vercel (free, fast)
1. Go to https://vercel.com
2. Import your GitHub repository
3. Deploy — live in under a minute

If uploading via GitHub's web uploader, drag the whole unzipped folder in
one go rather than individual files — the uploader only adds/overwrites
files, it never deletes ones that no longer belong, which can leave stray
old files behind across multiple uploads.

### Custom domain
On any of the above platforms, you can connect a custom domain
like `sisiwrites.com` from the platform's domain settings.

---

## Tech Stack
- **HTML5** — structure and content
- **CSS3** — all styles, animations, responsive layout
- **Vanilla JavaScript** — interactions (no frameworks, no dependencies)
- **Google Fonts** — Cormorant Garamond + Jost + JetBrains Mono (loaded from CDN)

No npm, no build tools, no installs needed. Just open and go.
