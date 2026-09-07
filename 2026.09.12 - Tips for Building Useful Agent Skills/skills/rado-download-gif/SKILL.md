---
name: rado-download-gif
description: Download the GIF from a Giphy page, convert it to MP4, and save it to ~/Desktop.
disable-model-invocation: true
---

# Download Giphy GIF as MP4

## Run

```bash
bash scripts/download_gif.sh <giphy-url> [--output-dir DIR] [--name NAME] [--keep-gif]
```

Path is relative to this skill's directory.

- `--output-dir` defaults to `~/Desktop`
- `--name` defaults to the Giphy slug, e.g. `Giflytics-content-is-king`
- `--keep-gif` also keeps the source `.gif`

The script prints the path it wrote. Report it to the user.

## Notes

- The script pulls the id out of the URL, so any Giphy link works: `giphy.com/gifs/<slug>-<id>`, `giphy.com/stickers/...`, `media.giphy.com/media/<id>/giphy.gif`, `i.giphy.com/<id>.gif`, or a bare id. No need to open the page.
- Requires `ffmpeg` (`brew install ffmpeg`).
- `giphy.com/clips/...` links are already video, not GIFs. The script says so — download the mp4 directly instead.
