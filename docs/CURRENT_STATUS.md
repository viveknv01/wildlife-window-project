# Current Status

Last updated: 2026-11-27

## Implemented

- Static responsive page
- Canvas-based illustrated forest with depth layering (background canopy, midground trunks, foreground shrubs that partially occlude animals)
- One window view
- Morning/daytime status label
- 15 animal/bird definitions across Common, Uncommon, Rare, Very rare, and Ultra Rare tiers
- Natural small-herd spawning for Spotted deer, Sambar deer, and Indian Gaur, plus a rare solitary Gaur bull
- 7 special wildlife events (Rare, Ultra Rare, and Legendary), including dancing peacock, 10+ elephant herds, sloth bear with cub, ibis flocks, sparring tuskers, and dual leopards
- Detailed procedural Canvas illustrations and animations per species (walking legs, stripes/rosettes/spots, gaur white stockings and horns, hornbill casque, curved ibis bill, peacock fanned train)
- Zoom in/out
- Capture downloads the current canvas as PNG and identifies either the active event or the nearest animal/herd
- Dev-only URL gallery for testing (not normal play): `?test=1A` cycles animals, `?test=1E` cycles events; optional `&i=N` starts at index N; tap scene or Capture to advance. Full index lists are in [`CONTENT_AND_RARITY.md`](CONTENT_AND_RARITY.md)

## Known limitations

- Animal art is procedural Canvas vector drawing rather than external sprite sheets.
- No sound effects or ambient audio yet.
- No actual simulated weather or time-of-day lighting transition; the clock label is a lightweight display.
- No persistent collection, player history, or records (by design).
- Rarity weights are configured in `js/game.js`.
- The downloaded capture is the rendered scene canvas, not a separate high-resolution camera output.

## Next recommended tasks

1. Test the game in Chrome desktop and mobile browsers.
2. Tune spawn intervals, herd sizes, and event cooldowns based on playtesting.
3. Add optional ambient forest audio only after sourcing or creating properly licensed sounds.
