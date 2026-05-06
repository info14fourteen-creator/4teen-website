#!/usr/bin/env python3

from __future__ import annotations

from collections import deque
from pathlib import Path
import sys

from PIL import Image, ImageSequence


def build_transparency_mask(image: Image.Image, threshold: int = 42) -> Image.Image:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = rgba.load()
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def is_background(x: int, y: int) -> bool:
        r, g, b, a = pixels[x, y]
        return a > 0 and max(r, g, b) <= threshold

    def enqueue(x: int, y: int) -> None:
        idx = y * width + x
        if visited[idx]:
            return
        visited[idx] = 1
        queue.append((x, y))

    for x in range(width):
        if is_background(x, 0):
            enqueue(x, 0)
        if is_background(x, height - 1):
            enqueue(x, height - 1)

    for y in range(height):
        if is_background(0, y):
            enqueue(0, y)
        if is_background(width - 1, y):
            enqueue(width - 1, y)

    alpha = Image.new("L", (width, height), 255)
    alpha_pixels = alpha.load()

    while queue:
        x, y = queue.popleft()
        alpha_pixels[x, y] = 0

        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height and is_background(nx, ny):
                enqueue(nx, ny)

    return alpha


def apply_mask(image: Image.Image, threshold: int = 42) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = build_transparency_mask(rgba, threshold=threshold)
    rgba.putalpha(alpha)
    return rgba


def rgba_to_transparent_gif_frame(image: Image.Image) -> Image.Image:
    base = image.convert("RGBA")
    alpha = base.getchannel("A")
    palette = base.convert("RGB").quantize(colors=255, method=Image.Quantize.MEDIANCUT)
    transparent_index = 255
    mask = alpha.point(lambda value: 255 if value == 0 else 0)
    palette.paste(transparent_index, mask)
    palette.info["transparency"] = transparent_index
    return palette


def process_poster(source: Path, destination: Path) -> None:
    poster = apply_mask(Image.open(source))
    bbox = poster.getchannel("A").getbbox()
    if bbox:
        poster = poster.crop(bbox)
    poster.save(destination, format="PNG", optimize=True)


def process_gif(source: Path, destination: Path) -> None:
    original = Image.open(source)
    processed_frames: list[Image.Image] = []
    durations: list[int] = []
    bbox = None

    for frame in ImageSequence.Iterator(original):
        processed = apply_mask(frame)
        frame_bbox = processed.getchannel("A").getbbox()
        if frame_bbox:
            if bbox is None:
                bbox = frame_bbox
            else:
                bbox = (
                    min(bbox[0], frame_bbox[0]),
                    min(bbox[1], frame_bbox[1]),
                    max(bbox[2], frame_bbox[2]),
                    max(bbox[3], frame_bbox[3]),
                )
        processed_frames.append(processed)
        durations.append(frame.info.get("duration", original.info.get("duration", 100)))

    if not processed_frames:
        raise RuntimeError("No frames found in GIF")

    if bbox:
        processed_frames = [frame.crop(bbox) for frame in processed_frames]

    gif_frames = [rgba_to_transparent_gif_frame(frame) for frame in processed_frames]
    gif_frames[0].save(
      destination,
      save_all=True,
      append_images=gif_frames[1:],
      loop=original.info.get("loop", 0),
      duration=durations,
      optimize=False,
      disposal=2,
      transparency=255,
    )


def main() -> int:
    if len(sys.argv) != 5:
      print(
        "Usage: process_phone_media.py <poster-jpg> <poster-png-out> <gif-in> <gif-out>",
        file=sys.stderr,
      )
      return 1

    poster_src = Path(sys.argv[1])
    poster_out = Path(sys.argv[2])
    gif_src = Path(sys.argv[3])
    gif_out = Path(sys.argv[4])

    process_poster(poster_src, poster_out)
    process_gif(gif_src, gif_out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
