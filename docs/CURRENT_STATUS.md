# Current Status

Last updated: 2026-11-26

## Implemented

- Static responsive page
- Canvas-based illustrated forest
- One window view
- Morning/daytime status label
- 13 animal/bird definitions
- Weighted random animal selection
- Up to two active animals
- Simple species-specific Canvas silhouettes
- Basic horizontal movement and fade-in/fade-out
- Zoom in/out
- Capture downloads the current canvas as PNG
- Basic rarity feedback in the capture message

## Known limitations

- Animal art is procedural and intentionally simple.
- Animal behaviour is mostly horizontal movement with limited variation.
- No sound effects or ambient audio.
- No actual simulated weather or time-of-day lighting transition; the clock label is a lightweight display.
- No persistent collection, player history, or records.
- Rarity weights are hard-coded in `js/game.js`.
- The downloaded capture is the rendered scene canvas, not a separate high-resolution camera output.
- Animal presence detection for the capture message is approximate.

## Next recommended tasks

1. Test the game in Chrome desktop and mobile browsers.
2. Tune spawn intervals and on-screen duration based on playtesting.
3. Improve silhouettes and species-specific movement.
4. Improve the visual layering so animals sometimes appear partly hidden by foliage.
5. Add audio only after sourcing or creating properly licensed sounds.
