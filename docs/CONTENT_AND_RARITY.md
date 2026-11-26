# Animal Content and Rarity

## Prototype catalogue

The current JavaScript prototype includes these entries:

| Animal | Rarity |
|---|---|
| Spotted deer | Common |
| Indian peafowl | Uncommon |
| Bonnet macaque | Common |
| Malabar giant squirrel | Uncommon |
| Indian grey hornbill | Common |
| Racket-tailed drongo | Uncommon |
| Wild boar | Common |
| Asian elephant | Rare |
| Indian leopard | Very rare |
| Indian junglefowl | Uncommon |
| Malabar trogon | Rare |
| Sambar deer | Uncommon |
| Indian giant flying squirrel | Rare |

These are prototype encounter labels and illustrative behaviours, not a scientifically validated wildlife distribution model.

## Rarity intent

- Common: frequent enough to make the forest feel alive.
- Uncommon: occasional discoveries.
- Rare: noticeably infrequent sightings.
- Very rare: memorable, exceptional encounters.

## Current implementation

Rarity is represented by a numeric weight on each animal definition. The random selection function chooses an animal using those weights. Higher weights mean more frequent selection.

The weights are relative, not guaranteed percentages. Actual appearance frequency also depends on spawn timing, current active animals, and each animal's visibility duration.

## Future content standards

When adding a species:
- Use a locally appropriate common name.
- Add scientific name only when verified.
- Document habitat/time/season preferences only when supported by reliable wildlife references.
- Keep rarity as a gameplay setting, not a claim about real-world conservation status.
- Do not imply that "rare in the game" means endangered in nature.
- Use licensed or original artwork/audio.
