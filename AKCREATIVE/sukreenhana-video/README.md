# sukreenhana.my: 15-second launch video (9:16)

The final file is `sukreenhana-launch-15s-9x16.mp4`: 1080×1920, 30 fps, H.264 + AAC, 15.0 s.

## How it was made
- `video.html`: the whole animation is driven by `render(t)` (t in seconds). It uses the brand colours, Instrument Serif and Inter Tight, the molecular lattice, the arched portrait, the impact tiles and the "Let's collaborate" button.
- `music.py`: an original 128 BPM soundtrack synthesised with numpy (no licensed music). 128 BPM gives 32 beats in exactly 15 s, so every scene starts on a beat:
  - b0 hook · b1–b4 headline words · b5 portrait · b8 **drop** (keywords) · b12 thin films · b16–19 impact numbers · b22 circuit · b24 **lift** · b25–27 partners · b28 site · b29 button · b30 end card · b31 **final hit**
- `render.js`: renders 450 frames with Playwright (Chromium).

## Re-render
```bash
python3 music.py                       # -> music.wav
mkdir -p frames && node render.js      # -> frames/f0000.jpg … f0449.jpg
ffmpeg -framerate 30 -i frames/f%04d.jpg -i music.wav -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 192k -shortest sukreenhana-launch-15s-9x16.mp4
```
