# Game Design

## Core player loop

1. The player opens the game and sees the forest through a window.
2. The player watches the scene without needing to interact.
3. An animal or bird appears after a variable interval.
4. The animal moves through the scene or remains briefly visible.
5. The player notices it and optionally zooms in.
6. The player captures a screenshot.
7. The PNG is downloaded to the player's device.
8. The forest continues. No player collection or history is saved by the game.

## Pacing

- Calm and unhurried.
- Do not require constant clicking.
- Avoid failure states, countdowns, and penalties.
- Empty/quiet periods are intentional, but should not become so long that the prototype feels broken.
- Keep occasional visual movement in the environment so the scene remains pleasant when no animal is present.

## Animal appearances

Appearances are random, with weighted rarity. A weighted system means common animals should appear more often than rare animals. The prototype currently uses configured weights in JavaScript.

For future improvements, consider:
- Preventing too many simultaneous animals.
- Avoiding repeated immediate appearances of the same species.
- Giving species different appearance durations and movement styles.
- Using different forest depth layers to make spotting more interesting.

## Capture experience

- Capture should feel immediate and satisfying.
- Save/download a PNG only when the player presses Capture.
- If no animal is visible, still allow a landscape snapshot.
- Do not save capture metadata or build a permanent in-game album in this phase.

## Accessibility and usability

- Controls should be large enough for touch.
- Do not rely on colour alone to communicate rarity.
- Keep text readable over the scene.
- Respect reduced-motion preferences in a future polish pass.
- Ensure the game remains usable on narrow mobile screens.
