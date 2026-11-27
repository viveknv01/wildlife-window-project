# Current Status

Last updated: 2026-11-27

## Implemented

- Static responsive page
- Canvas-based illustrated forest with depth layering (background canopy, midground trunks, foreground shrubs that partially occlude animals)
- One window view
- Morning/daytime status label
- 16 animal/bird definitions across Common, Uncommon, Rare, Very rare, and Ultra Rare tiers, including Wild Dog packs
- Natural small-herd spawning for Spotted deer, Sambar deer, and Indian Gaur, plus a rare solitary Gaur bull
- 8 special wildlife events (Rare, Very rare, Ultra Rare, and Legendary), including dancing peacock, 10+ elephant herds, sloth bear with cub, ibis flocks, sparring tuskers, dual leopards, and Wild Dog Pack Hunting
- Natural behaviour: animals walk in and out of the scene (no fades); most linger to graze, drink at a small pool, sit, rest, or stand, and some simply pass through
- Predator reactions: prey run when a tiger, leopard, black leopard, or wild dog appears; birds, peafowl, and tuskers stay
- Several species can share the clearing; 5+ animals in view is labelled Rare and 8+ Very rare
- Deliberate quiet periods, with rare longer empty spells (up to about 40 s, very rarely up to about 120 s)
- Detailed procedural Canvas illustrations and animations per species (walking legs, stripes/rosettes/spots, gaur white stockings and horns, hornbill casque, curved ibis bill, peacock fanned train)
- Zoom in/out
- Capture downloads the current canvas as PNG and identifies either the active event or the nearest animal/herd
- Dev-only URL gallery for testing (not normal play): `?test=1A` cycles animals, `?test=1E` cycles events; optional `&i=N` starts at index N; tap scene or Capture to advance. Full index lists are in [`CONTENT_AND_RARITY.md`](CONTENT_AND_RARITY.md)

## Known limitations

- Animal art is procedural Canvas vector drawing rather than external sprite sheets.
- No sound effects or ambient audio yet.
- No actual simulated weather or time-of-day lighting transition; the clock label is a lightweight display.
- No persistent collection, player history, or records (by design).
- Rarity weights and behaviour settings are configured in `js/game.js`.
- Sitting and grazing poses are simple (the body lowers or leans); only deer lower their neck. No species-specific eating animation yet.
- Behaviour was checked with a headless simulation and in a desktop browser at narrow width; not yet tested on real phones.
- The downloaded capture is the rendered scene canvas, not a separate high-resolution camera output.

## Next recommended tasks

1. Test the game in Chrome desktop and mobile browsers.
2. Tune spawn intervals, herd sizes, linger times, crowd acceptance, and event cooldowns based on playtesting.
3. Add optional ambient forest audio only after sourcing or creating properly licensed sounds.
