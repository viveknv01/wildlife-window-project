# Current Status

Last updated: 2026-11-27

## Implemented

- Static responsive page
- Canvas-based illustrated forest with depth layering (hazy ridges, far canopy, midground trees with bark and rooted trunks, treeline bushes, sunlit floor with leaf litter, grass and stones, a pool with reeds, and foreground shrubs, ferns, and broad leaves that partially occlude animals)
- The still parts of the forest are painted once per resize into an off-screen canvas; moving parts (pool shimmer, light shafts, motes, foliage sway) are drawn every frame
- One window view
- Morning/daytime status label
- 20 animal/bird definitions across Common, Uncommon, Rare, Very rare, and Ultra Rare tiers, including Wild Dog packs
- 4 of these are small wildlife seen only through the binoculars: Indian hare, Jungle babbler, Indian grey mongoose, and Indian pitta
- Natural small-herd spawning for Spotted deer, Sambar deer, and Indian Gaur, plus a rare solitary Gaur bull
- 8 special wildlife events (Rare, Very rare, Ultra Rare, and Legendary), including dancing peacock, 10+ elephant herds, sloth bear with cub, ibis flocks, sparring tuskers, dual leopards, and Wild Dog Pack Hunting
- Natural behaviour: animals walk in and out of the scene (no fades); most linger to graze, drink at a small pool, sit, rest, or stand, and some simply pass through
- Predator reactions: prey run when a tiger, leopard, black leopard, or wild dog appears; birds, peafowl, and tuskers stay
- Several species can share the clearing; gathering labels use species count (5+ Rare, 8+ Very rare) and animal headcount (9+ Rare, 16+ Very rare, 30+ Legendary), taking the higher tier; binoculars-only wildlife is excluded; predator flee and events are unchanged
- Deliberate quiet periods, with rare longer empty spells (up to about 40 s, very rarely up to about 120 s)
- Detailed procedural Canvas illustrations and animations per species (walking legs, stripes/rosettes/spots, gaur white stockings and horns, hornbill casque, curved ibis bill, peacock fanned train), with shaded coats, soft ground shadows, darker far-side legs, hooves, eye highlights, whiskers, fur, and skin folds
- Binoculars: a toggle button raises a round lens that magnifies 2.2× and follows the mouse or a dragging finger; the rest of the window dims. This replaces the old whole-canvas zoom buttons
- Capture downloads the current canvas as PNG and identifies either the active event or the nearest animal/herd. With the binoculars up, the photo keeps the round lens framing and only animals inside the lens are identified
- Dev-only URL gallery for testing (not normal play): `?test=1A` cycles animals, `?test=1E` cycles events; optional `&i=N` starts at index N; tap scene or Capture to advance. Full index lists are in [`CONTENT_AND_RARITY.md`](CONTENT_AND_RARITY.md)
- Opening curtains: on each visit the window starts covered and the fabric raises smoothly. The clearing may already hold wildlife (often empty, sometimes a normal group, and on a lucky roll a Rare or rarer event). Animals are placed in frame, not walking in from off-screen
- Settings (footer): “Always raise curtains on open” is off by default and is the only value stored (`localStorage` key `ww_always_curtain_raised`). Sightings and captures are still not saved. The test gallery skips the curtain

## Known limitations

- Animal art is procedural Canvas vector drawing rather than external sprite sheets.
- No sound effects or ambient audio yet.
- No actual simulated weather or time-of-day lighting transition; the clock label is a lightweight display.
- No persistent collection, player history, or records (by design). One curtain preference may be stored locally.
- Rarity weights and behaviour settings are configured in `js/game.js`.
- Sitting and grazing poses are simple (the body lowers or leans); only deer lower their neck. No species-specific eating animation yet.
- Behaviour was checked with a headless simulation and in a desktop browser at narrow width; not yet tested on real phones. Binocular aiming by touch was checked with simulated touch events only.
- Through the binoculars the whole scene is drawn twice per frame (dimmed window plus magnified lens); frame rate on lower-end phones has not been measured.
- The downloaded capture is the rendered scene canvas, not a separate high-resolution camera output.

## Next recommended tasks

1. Test the game in Chrome desktop and mobile browsers.
2. Tune spawn intervals, herd sizes, linger times, crowd acceptance, and event cooldowns based on playtesting.
3. Add optional ambient forest audio only after sourcing or creating properly licensed sounds.
