#!/usr/bin/env bash
# Download the main GIF of a Giphy page and convert it to an MP4.
#
# Usage: download_gif.sh <giphy-url-or-id> [--output-dir DIR] [--name NAME] [--keep-gif]
#
# Prints the absolute path of the mp4 on success.
set -euo pipefail

INPUT=""
OUTPUT_DIR="$HOME/Desktop"
NAME=""
KEEP_GIF=0

while [ $# -gt 0 ]; do
  case "$1" in
    --output-dir) OUTPUT_DIR="$2"; shift 2 ;;
    --name)       NAME="$2"; shift 2 ;;
    --keep-gif)   KEEP_GIF=1; shift ;;
    -*) echo "Unknown arg: $1" >&2; exit 2 ;;
    *)
      if [ -n "$INPUT" ]; then echo "Unexpected extra argument: $1" >&2; exit 2; fi
      INPUT="$1"; shift ;;
  esac
done

if [ -z "$INPUT" ]; then
  echo "Usage: download_gif.sh <giphy-url-or-id> [--output-dir DIR] [--name NAME] [--keep-gif]" >&2
  exit 2
fi

command -v ffmpeg >/dev/null || { echo "Error: ffmpeg is not installed (brew install ffmpeg)" >&2; exit 1; }

# Strip query string and fragment, then take the last path segment without its extension.
CLEAN="${INPUT%%\?*}"
CLEAN="${CLEAN%%#*}"
CLEAN="${CLEAN%/}"
SEGMENT="${CLEAN##*/}"
SEGMENT="${SEGMENT%.*}"

# media.giphy.com/media/<id>/giphy.gif — the id is the segment before the filename.
if [ "$SEGMENT" = "giphy" ] || [ "$SEGMENT" = "giphy_s" ]; then
  PARENT="${CLEAN%/*}"
  SEGMENT="${PARENT##*/}"
fi

# The slug is "<words>-<id>"; the id is the last dash-separated token.
ID="${SEGMENT##*-}"
SLUG="${SEGMENT%-*}"

if ! printf '%s' "$ID" | grep -qE '^[A-Za-z0-9]{6,}$'; then
  echo "Error: could not extract a Giphy id from: $INPUT" >&2
  exit 2
fi

if [ -z "$NAME" ]; then
  if [ "$SLUG" = "$SEGMENT" ] || [ -z "$SLUG" ]; then
    NAME="$ID"
  else
    NAME="$SLUG"
  fi
fi
# Keep the filename shell- and Finder-friendly.
NAME="$(printf '%s' "$NAME" | tr ' /' '--' | tr -cd '[:alnum:]._-')"
[ -n "$NAME" ] || NAME="$ID"

mkdir -p "$OUTPUT_DIR"
OUTPUT_DIR="$(cd "$OUTPUT_DIR" && pwd)"
MP4="$OUTPUT_DIR/$NAME.mp4"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
GIF="$TMP/$NAME.gif"

downloaded=0
for url in "https://media.giphy.com/media/$ID/giphy.gif" "https://i.giphy.com/$ID.gif"; do
  if curl -fsSL --retry 2 -o "$GIF" "$url" && [ -s "$GIF" ]; then
    echo "Downloaded $url" >&2
    downloaded=1
    break
  fi
done

if [ "$downloaded" -eq 0 ]; then
  echo "Error: could not download the GIF for id $ID" >&2
  exit 1
fi

if ! file "$GIF" | grep -qi 'gif image'; then
  echo "Error: $ID did not return a GIF (the page may be a Giphy clip, which is already video)" >&2
  exit 1
fi

# yuv420p + even dimensions keeps the mp4 playable in QuickTime, Slack and browsers.
ffmpeg -y -loglevel error -i "$GIF" \
  -movflags +faststart \
  -pix_fmt yuv420p \
  -vf 'scale=trunc(iw/2)*2:trunc(ih/2)*2' \
  "$MP4"

if [ "$KEEP_GIF" -eq 1 ]; then
  cp "$GIF" "$OUTPUT_DIR/$NAME.gif"
  echo "$OUTPUT_DIR/$NAME.gif"
fi

echo "$MP4"
