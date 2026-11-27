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

These are gameplay encounter labels and illustrative behaviours, not a scientifically validated wildlife distribution model.

## Dev test gallery (not for regular play)

Use these URLs to preview every animal or event one by one (works on desktop and mobile):

- Animals: `index.html?test=1A` or `index.html?test=1A&i=N`
- Events: `index.html?test=1E` or `index.html?test=1E&i=N`

Tap the scene (or Capture) to advance to the next index. Normal play is unchanged when `?test=` is omitted.

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
