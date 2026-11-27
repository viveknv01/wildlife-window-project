# Animal Content, Herds, and Events

## Wildlife catalogue

The prototype includes these species and variants. Index `i` matches the array order in `js/game.js` and the URL gallery (`?test=1A&i=N`).

| i | Animal | Rarity | Spawn behaviour |
|---|---|---|---|
| 0 | Spotted deer | Common | Small group (2–4) |
| 1 | Wild boar | Common | Solo or pair (1–2) |
| 2 | Indian Gaur | Common | Small herd (2–4) |
| 3 | Sambar deer | Uncommon | Small group (2–3) |
| 4 | Indian peacock | Uncommon | Solo |
| 5 | Asian Elephant | Rare | Solo (herds appear via events) |
| 6 | Gaur bull | Rare | Solitary large bull (1) |
| 7 | Great Indian hornbill | Rare | Flying across canopy |
| 8 | Indian grey hornbill | Rare | Flying across canopy |
| 9 | Ibis | Rare | Flying across canopy |
| 10 | Tiger | Very rare | Solo |
| 11 | Leopard | Very rare | Solo |
| 12 | Asian Elephant Tusk | Very rare | Solitary tusker |
| 13 | Sloth Bear | Very rare | Solo |
| 14 | Black Leopard | Ultra Rare | Solo melanistic leopard |
| 15 | Wild Dog | Rare | Small pack (2–4) |
| 16 | Indian hare | Common | Binoculars only · solo or pair (1–2) |
| 17 | Jungle babbler | Common | Binoculars only · small party (2–4) hopping on the ground |
| 18 | Indian grey mongoose | Uncommon | Binoculars only · solo, quick |
| 19 | Indian pitta | Rare | Binoculars only · solo |

Tiger, Leopard, Black Leopard, and Wild Dog are predators (`predator: true`).

### Small wildlife (binoculars only)

Entries marked `binocularOnly: true` are too small to make out with the naked eye. They are in the clearing and keep moving, but are only drawn inside the binocular lens.

- They do not use the regular spawn table. Every 12–24 seconds one small group may wander in, up to 4 small animals at a time, and none arrive while a predator is in the clearing.
- They always linger, and they arrive without any on-screen announcement. Aiming the lens at one shows its name and rarity.
- They do not count toward gatherings, quiet periods, or the conditions for special events.
- Hares and mongooses run from predators like other prey; the small birds stay.
- Capture only identifies them when the binoculars are up and the animal is inside the lens.
- In the test gallery they are drawn without the binoculars so they can be previewed.

The small-wildlife settings (`BINOC_ZOOM`, `SMALL_CAP`, lens size in `lensRadius`) are near the top of `js/game.js`.

## Special wildlife events

Occasionally, when the clearing is quiet, a weighted rare event can occur instead of a standard spawn. Index `i` matches the array order in `js/game.js` and the URL gallery (`?test=1E&i=N`).

| i | Event | Rarity | Description |
|---|---|---|---|
| 0 | Indian peacock dancing | Rare | A peacock fans its iridescent ocelli train in a courtship display |
| 1 | Asian Elephant 10+ count | Rare | A family herd of 10–12 elephants crosses the glade together |
| 2 | Asian Elephant with Tusker 10+ count | Ultra Rare | A large elephant herd accompanied by bull tuskers |
| 3 | Bear with baby | Ultra Rare | A mother sloth bear followed closely by her cub |
| 4 | Flying lot of Ibis | Ultra Rare | A flock of 10–14 ibis gliding across the sky in formation |
| 5 | Tuskers fighting | Legendary | Two bull tuskers facing off and sparring with their ivory tusks |
| 6 | Leopard + Black Leopard | Legendary | A golden Indian leopard and a melanistic black leopard walking together |
| 7 | Wild Dog Pack Hunting | Very rare | A pack of 5–8 wild dogs chases 3–5 spotted deer across the clearing; other prey in view bolt too |

The pack hunt can also start while prey animals are already in the clearing. The other events only start when the clearing is empty.

These are gameplay encounter labels and illustrative behaviours, not a scientifically validated wildlife distribution model.

## Behaviour

Animals walk in from the left, the right, or up out of the foreground vegetation, and leave by walking off-screen. Nothing fades in or out.

- **Linger (about 65% of ground animals):** walk to a spot in the clearing and spend time there grazing, drinking at the pool, sitting, resting, standing, or strolling, then leave by either side or down into the vegetation. Herds leave together. Newcomers often settle near animals that are already there.
- **Pass through (about 35%):** walk straight across the clearing, drifting a little nearer or deeper, and leave on the other side.
- **Birds:** hornbills and ibis fly across the canopy.
- **Predators:** when a tiger, leopard, black leopard, or wild dog steps into view, prey animals run for the nearest way out. Birds, peafowl, and tuskers stay where they are. Prey do not walk in while a predator is on screen.

### Gatherings

There is no gameplay limit on how many species share the clearing (a cap of 16 animals exists only to protect performance). The busier the clearing, the less likely another group joins, so large gatherings are uncommon:

| Animals in view | Rarity shown |
|---|---|
| 5 or more | Rare |
| 8 or more | Very rare |

The gathering rarity is used in the capture message when it is higher than the rarity of the nearest animal.

### Quiet periods

When the last animal leaves, the forest stays empty for a while:

| Empty for | How often | Label |
|---|---|---|
| 4–12 seconds | Most of the time | — |
| 22–40 seconds | Rare | Rare stillness |
| 60–120 seconds | Very rare | Very rare stillness |

All of these settings (linger chance, activity lists, crowd acceptance, quiet delays) are near the top of the behaviour section in `js/game.js`.

## Dev test gallery (not for regular play)

Use these URLs to preview every animal or event one by one (works on desktop and mobile):

- Animals: `index.html?test=1A` or `index.html?test=1A&i=N`
- Events: `index.html?test=1E` or `index.html?test=1E&i=N`

Tap the scene (or Capture) to advance to the next index. While the binoculars are up, tapping the scene aims the lens instead, so use Capture to advance. Normal play is unchanged when `?test=` is omitted.

In the gallery each animal walks in from the side (visible after a few seconds), lingers for about 40 seconds, leaves, and then walks in again.

## Rarity intent

- **Common**: Frequent enough to make the forest feel alive (often in small natural herds).
- **Uncommon**: Occasional discoveries.
- **Rare**: Noticeably infrequent sightings or special behaviours.
- **Very rare**: Memorable, exceptional solitary encounters.
- **Ultra Rare**: Once-in-a-while sightings and extraordinary group moments.
- **Legendary**: Signature dramatic wildlife spectacles.

## Current implementation

Rarity is represented by numeric weights on both the `animals` and `events` tables in `js/game.js`. Higher weights mean more frequent selection.

## Future content standards

When adding a species:
- Use a locally appropriate common name.
- Add scientific name only when verified.
- Document habitat/time/season preferences only when supported by reliable wildlife references.
- Keep rarity as a gameplay setting, not a claim about real-world conservation status.
- Do not imply that "rare in the game" means endangered in nature.
- Use licensed or original artwork/audio.
