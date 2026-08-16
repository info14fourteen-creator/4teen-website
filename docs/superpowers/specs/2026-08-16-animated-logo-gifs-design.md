# Animated logo GIFs

## Goal

Export the site's existing animated 4TEEN mark as two square GIF avatars for a Telegram group and channel.

## Design

- Use the existing three-bar SVG geometry and orange/white palette from `AnimatedBrandMark`.
- Render on a near-black solid background with no text.
- Export at 512×512 px, looping continuously at approximately 24 fps.
- Group variant: faster motion and a fuller motion trail, about 2.4 seconds.
- Channel variant: slower motion and a subtler trail, about 3 seconds.

## Acceptance criteria

- Both files are valid animated GIFs with 512×512 dimensions.
- The mark remains fully inside the frame throughout the animation.
- The two files are visibly distinct while retaining the same brand motion language.
- Existing user changes in the repository remain untouched.
