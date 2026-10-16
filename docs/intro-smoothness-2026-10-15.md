# NODE48 intro: stable letter geometry

Started October 15; verification continued October 16, 2026 (Europe/Warsaw).

The user reported jerky entry after accepting the shorter 1,320 ms timeline.
The preceding change shortened time but did not address font replacement.
Cold-browser samples showed the running word changing width from 581.58 to
555.86 px while Manrope loaded. Blocking the application entry script retained
this shift, so deferring React was not justified as its correction.

The existing six animated slots now contain inline SVG outlines of the same
Manrope 700 glyphs. Their shapes and advances are available in the first HTML,
without a font request, asynchronous decoding or a font-ready gate. The early
controller, hidden-tab pause, session marker, skip and nominal timings stay the
same. The entry easing changes from (0.22, 1, 0.36, 1) to (0.25, 0.1, 0.25, 1)
to soften initial acceleration. Obsolete glyph text shadows are removed rather
than replaced with SVG blur filters. No permanent compositing hints are added.

An embedded six-glyph font was evaluated and rejected: decoding could still
occur after animation started. Its font asset, CSS face and draft CSP change
were removed. The final implementation retains the original font CSP and does
not change the site's text fonts. Frame-gap samples include forced layout from
the measurement probe and browser startup work; they are not a compositor FPS
measurement or proof of smoothness on the user's particular GPU.

## Glyph source and regeneration

`src/lib/brand-wordmark.ts` is a generated brand asset, consumed only by the
existing presentation. `brandName` remains the source for character order.
Source: `@fontsource-variable/manrope` 5.2.8,
`files/manrope-latin-wght-normal.woff2`, instantiated at weight 700. Copyright
2019 The Manrope Project Authors (https://github.com/sharanda/manrope), licensed
under SIL OFL 1.1; the package's license is copied in
[Manrope-OFL.txt](./third-party/Manrope-OFL.txt).

FontTools 4.67.0 and Brotli 1.2.0 were used offline for extraction, not added to
the site's runtime or build dependencies. To regenerate after a deliberate
brand/font change, install those packages in an isolated Python environment
and run this from the repository root:

```python
import json, re
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

brand = re.search(r'brandName = "([^"]+)"', Path('src/lib/site-identity.ts').read_text())[1]
font = instantiateVariableFont(TTFont('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2'), {'wght': 700})
glyphs = font.getGlyphSet()
# Match the existing 0.52 font-size-adjust against Manrope's 1080/2000 x-height.
scale = 0.52 / (font['OS/2'].sxHeight / font['head'].unitsPerEm)
baseline = 900 + (font['hhea'].ascent + font['hhea'].descent) / 2 * scale
rows = []
for char in dict.fromkeys(brand):
    name = font.getBestCmap()[ord(char)]
    pen = SVGPathPen(glyphs, ntos=lambda n: format(n, '.3f').rstrip('0').rstrip('.'))
    glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, 0, baseline)))
    rows.append(f'  {json.dumps(char)}: {{ advance: {round(font["hmtx"][name][0] * scale, 3)}, path: {json.dumps(pen.getCommands())} }},')
print('\n'.join(rows))
```

Keep the provenance comments and replace the generated map rows with that
output. Coordinates use 2,000 units per em and an 1,800-unit (0.9 em) line box;
tracking and responsive font-size remain in the existing shell stylesheet.

Local diagnostic traces and viewport captures are in the ignored
`.codex/intro-smooth-2026-10-15/` directory.

## Verification

Build/type checks and prerender, lint, text integrity and whitespace checks
passed, along with all 194 tests across six files. Ten PL/EN viewport and
enlarged-text cases passed with complete holding frames, entry from above,
preserved heading/input identity, released root access and no application/CSP
errors. Four screenshots were visually inspected. With both external font
files blocked, their font faces reported `error`, but the word's width remained
578.328125 px throughout entry/holding at 1366×768. It showed 13 complete holding
frames and finished in about 1,370 ms from the first sampled frame. With all
JavaScript disabled, the heading remained visible and there was no overlay or
inert root. The generated sitemap was restored after building.
