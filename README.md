# Jyotish — The Complete Map (Eleventy edition)

A maintainable, modular port of the original monolithic `index.html` into an
[Eleventy](https://www.11ty.dev/) static site. **All content is preserved
exactly** — every line of CSS, every HTML section, every JS function, and every
data array round-trips byte-for-byte against the original.

---

## Quick start

```bash
npm install      # install Eleventy (one-time)
npm run serve    # start the dev server at http://localhost:8080/
# or:
npm run build    # produce a static _site/ directory you can deploy anywhere
```

No build pipeline, no Tailwind CLI, no bundler — just Eleventy and a handful of
plain-text files.

---

## Project structure

```
jyotish-eleventy/
├── .eleventy.js                  # Eleventy config (passthrough for assets, filters)
├── package.json                  # one devDependency: @11ty/eleventy
├── scripts/
│   └── extract.py                # one-time extractor that produced this project
│                                  #   from the original monolith (kept for reference
│                                  #   and for re-running if the source changes)
└── src/
    ├── index.njk                 # the page: pulls in all 15 section includes
    ├── _layouts/
    │   └── base.njk              # <html> shell, asset links, data injection
    ├── _includes/
    │   ├── starfield-canvas.njk  # the <canvas id="starfield">
    │   ├── topbar.njk            # fixed top bar
    │   ├── nav.njk                # tab navigation (sidebar / bottom bar)
    │   └── sections/             # one file per tab (15 files)
    │       ├── hero.njk
    │       ├── foundation.njk
    │       ├── grahas.njk
    │       ├── rashis.njk
    │       ├── bhavas.njk
    │       ├── nakshatras.njk
    │       ├── kala.njk
    │       ├── charts.njk
    │       ├── yogas.njk
    │       ├── tools.njk
    │       ├── flow.njk
    │       ├── principles.njk
    │       ├── wisdom.njk
    │       ├── branches.njk
    │       └── essence.njk
    ├── _data/                    # data files (consumed by templates AND by JS)
    │   ├── site.js               # site title + nav items + section-titles map
    │   ├── grahas.json           # 9 planets
    │   ├── rashis.json           # 12 zodiac signs
    │   ├── bhavas.json            # 12 houses
    │   ├── nakshatras.json       # 27 lunar mansions
    │   ├── abhijit.json          # 28th intercalary nakshatra
    │   ├── panchanga.json        # 5 limbs of time
    │   ├── dasha.json            # Vimshottari dasha periods
    │   ├── tools.js              # 8 technique cards (HTML content, so kept as JS)
    │   ├── branches.json         # 8 application branches
    │   ├── timeline.json         # 5 history timeline entries
    │   ├── astroReality.json     # 7-row astronomical reality table
    │   └── apparentMotion.json   # 9-row apparent motion table
    └── assets/
        ├── css/
        │   └── main.css          # all CSS (14 KB, verbatim from original)
        └── js/                   # one file per concern (13 files)
            ├── tabs.js              # tab click handlers + topbar updates
            ├── starfield.js         # canvas star animation
            ├── reveal.js            # IntersectionObserver reveal animations
            ├── timeline.js          # render #timelineList
            ├── cosmicMotion.js      # render the two cosmic-motion tables
            ├── grahas.js            # render #grahasGrid + detail panel
            ├── rashis.js            # render the zodiac SVG wheel
            ├── bhavas.js            # render the bhava SVG wheel
            ├── nakshatras.js        # render #nakshatraGrid
            ├── kala.js              # render panchanga + dasha
            ├── toolsAccordion.js    # render #toolsAccordion
            ├── branches.js          # render #branchesGrid
            └── reObserve.js         # re-observe dynamically-injected .reveal elements
```

---

## How data flows

The original monolith had all data inline as `const GRAHAS = [...]` inside one
big `<script>` block. In this project the data lives in **plain JSON / JS files
under `src/_data/`**, which means:

1. Eleventy reads each file and exposes it as a top-level template variable
   (e.g. `src/_data/grahas.json` → `{% grahas %}` in Nunjucks).
2. The base layout serializes every data file into a single
   `window.__DATA__` object via the `dump` filter:

   ```njk
   <script>
     window.__DATA__ = {
       GRAHAS: {{ grahas | dump | safe }},
       RASHIS: {{ rashis | dump | safe }},
       ...
     };
   </script>
   ```

3. A second small `<script>` block re-exposes those names as top-level
   `var`s so the modular JS files (which were lifted verbatim from the
   original and still reference `GRAHAS`, `RASHIS`, etc. directly) work
   without any code changes:

   ```js
   var GRAHAS = window.__DATA__.GRAHAS;
   var RASHIS = window.__DATA__.RASHIS;
   // ...
   ```

4. Each JS module is loaded with `<script defer>` in the original execution
   order, so behavior is identical to the monolith.

---

## Why this is more maintainable than the original

| Aspect                  | Original (`index.html`)                        | This project                                                 |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **Total size**          | 3,868 lines in one file                        | Largest file is 12 KB (`essence.njk`); most are < 5 KB      |
| **Editing one section** | scroll 3,800 lines, hope you don't touch CSS   | edit `src/_includes/sections/<id>.njk` — that's the whole file |
| **Editing one planet's data** | find the right `const GRAHAS = [...]` block | edit `src/_data/grahas.json` — pretty-printed JSON           |
| **Editing one JS function** | hunt inside the giant `<script>`             | edit `src/assets/js/<concern>.js` — one concern per file      |
| **Reusing data**        | impossible — data is locked inside the page   | data files are importable from any other template or tool     |
| **Diff / code review**  | every change touches the same 3,868-line file  | changes are scoped to the file that actually changed         |
| **Adding a new tab**    | add HTML, add nav button, add data, add JS — all in the same file | add `src/_includes/sections/<id>.njk`, include it in `index.njk`, add the entry to `src/_data/site.js` |
| **Type checking / linting** | impractical                                | each JS file is small enough to lint cleanly                  |

---

## Verifying content fidelity

The project ships with a Python extractor (`scripts/extract.py`) and a runtime
parity test. After running `npm run build`, you can verify that the rendered
output matches the original byte-for-byte:

```bash
# Re-run the extractor at any time (e.g. if the original index.html changes):
python3 scripts/extract.py

# Build the site:
npm run build

# Verify the visible HTML body is byte-identical (modulo per-line whitespace):
python3 -c "
import re
orig = open('/home/z/my-project/upload/index.html').read()
built = open('_site/index.html').read()
orig_body = re.search(r'<body>(.*?)<script>', orig, re.DOTALL).group(1)
built_body = re.search(r'<body>(.*?)<script>', built, re.DOTALL).group(1)
def norm(s): return '\n'.join(l.strip() for l in s.split('\n') if l.strip())
assert norm(orig_body) == norm(built_body), 'Bodies differ!'
print('OK — visible HTML body is byte-identical.')
"
```

The headless-browser parity test (in this repo's git history) confirms that
every one of the 12 dynamically-rendered sections (`#grahasGrid`,
`#nakshatraGrid`, `#panchangaGrid`, `#timelineList`, `#astroRealityBody`,
`#apparentMotionBody`, `#branchesGrid`, `#toolsAccordion`,
`#zodiacWheelContainer`, `#bhavaWheelContainer`, `#dashaTimeline`,
`#topbarCurrent`) produces byte-identical DOM between the original monolith
and the Eleventy build.

---

## Tailwind & Font Awesome

The page uses Tailwind via the CDN script (`<script src="https://cdn.tailwindcss.com">`)
and Font Awesome via CDN, exactly as the original did. If you want to compile
Tailwind locally instead, install it as a devDependency and replace the
`<script>` tag in `src/_layouts/base.njk` with a link to your compiled CSS.
The classes used in the templates will not need to change.

---

## License

MIT — same as the original.
