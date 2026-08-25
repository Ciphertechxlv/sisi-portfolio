# Sisi Portfolio Website

A portfolio website for Sisi (Omoyeni) — Writer & Storyteller. Fully matched
to Sisi's Wanted Board: same colors, same masthead layout, same filter-chip
and card patterns, same light/dark toggle, and now the same type system too
— Anton for headlines, Space Grotesk for body copy, JetBrains Mono for
labels. Every place that used to carry the old italic Cormorant Garamond
treatment (masthead name, section headings, card titles, the book cover,
service panel name, contact heading, lightbox title) now uses uppercase
Anton instead; quote-style copy (the book note, the about pull-quote, the
lightbox verse) uses italic Space Grotesk rather than a faked italic on a
display face that was never designed to be slanted.

---

## Folder Structure

```
sisi-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
└── README.md
```

---

## What this redesign actually changed

The previous version only swapped colors. This one rebuilds the structure
to match the job board directly:

1. **Masthead header** — status tag, badge, giant italic name, bio, CTA
   buttons, then a scrolling marquee below it — the same composition as
   the job board's hero, not a centered hero with decorative illustrations
   around it. All ten floating stickers are gone.
2. **Filter-chip buttons everywhere** — nav links, the service picker, and
   contact links are all the same rounded-pill/mono/bold-uppercase chip
   used for the job board's role filters — not a different button style
   per section.
3. **Cards** — every content block (work pieces, the service panel, the
   contact block) uses the same bordered-card-with-colored-tab pattern as
   the job board's job cards.
4. **A real write-and-ponder animation** — the footer animation actually
   moves now: a pen visibly writes three lines (ink fades in as it
   "writes"), then lifts to a thinking pose by the figure's head between
   each line, on a continuous loop. Verified frame-by-frame during
   development, not just eyeballed once.
5. **Minimal footer** — a small centered signature line, matching the job
   board's restraint, instead of a large block.

## Fixed while building this

Two real rendering issues were caught and fixed during testing, not just
assumed to work:

- **Mobile nav pills overflowing the viewport** — the nav's `Work / Services
  / About / Let's work` pills didn't have a mobile breakpoint to switch to
  the hamburger menu, causing horizontal scroll on phones. Fixed and
  verified with zero horizontal overflow at 1440px down to 320px.
- **Mobile menu overlay collapsing to ~4px tall** — a `position: fixed`
  element with both `top` and `bottom` set was computing almost no height
  in testing, letting page content show through instead of being covered.
  Switched to an explicit `height: calc(100dvh - navheight)` instead of
  relying on that computation.

## How to Edit

### Preview changes
Double-click `index.html` to open it in a browser. After editing, save and
refresh (F5).

### Personal info — in `index.html`
| Placeholder | Replace with |
|---|---|
| `omoyeni@email.com` | Real email |
| Twitter/LinkedIn `href="#"` | Real profile URLs |
| Substack href | Real newsletter URL |

### Adding photos
Put images in `assets/images/`, then in the About section replace:
```html
<p class="photo-card__placeholder">Add photo here</p>
```
with:
```html
<img src="assets/images/photo-1.jpg" alt="Sisi">
```

### Editing services
Each pill in `#serviceTabs` has a `data-desc` attribute — that's the text
shown in the panel when it's selected. Add a new `<button class="chip">`
following the same pattern for a 7th service.

### Colors
All tokens live at the top of `css/style.css`, under `:root` (constant
accents: yellow/coral/green/violet) and `[data-theme="dark"]` /
`[data-theme="light"]` (backgrounds, text, borders per theme).

### The write-and-ponder animation
Lives in `#writeStrip` in `index.html`, styled/animated in the "WRITE &
PONDER" section of `style.css`. It's driven by a single CSS keyframe
(`penCycle`) moving the pen through coordinates, with three ink-mark
elements and a thought-dots group timed to match. To adjust pacing, the
percentages in `@keyframes penCycle`, `markLine1/2/3`, and `ponderDots`
all share the same 16s timeline — keep them aligned if you change one.

---

## How to Host (Free Options)

### Netlify Drop (easiest)
Go to https://netlify.com/drop and drag the whole `sisi-portfolio` folder
onto the page. Live instantly.

### Vercel
Import the repo at https://vercel.com/new, or run `vercel --prod` from
inside the folder with the Vercel CLI — more reliable than GitHub's
drag-and-drop uploader, which only adds/overwrites files and can leave
stray old files behind across multiple uploads.

### GitHub Pages
Push to a repo, then Settings → Pages → Source: main branch.

---

## Tech Stack
HTML5, CSS3, vanilla JavaScript. No build tools, no npm, no dependencies.
Google Fonts: Anton, Space Grotesk, JetBrains Mono (loaded via a standard
`<link>` tag, same as the job board — no `next/font/google` involved since
this isn't a Next.js project).
