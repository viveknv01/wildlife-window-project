# Technical Architecture

## Current stack

- HTML: page structure and controls
- CSS: layout, responsive behaviour, visual styling
- Vanilla JavaScript: game loop, random encounters, controls
- Canvas 2D: forest rendering and simple animal drawings
- Browser download API: PNG snapshot export
- Hosting: GitHub Pages (static hosting)

No build step or backend is required.

## Runtime flow

```text
index.html
   ├── css/style.css
   ├── js/settings.js   # curtain preference only
   └── js/game.js
         ├── animal definitions and rarity weights
         ├── opening curtain reveal
         ├── random spawn selection
         ├── animation/game loop
         ├── Canvas scene and animal drawing
         ├── binoculars
         └── PNG capture/download
```

## Main implementation notes

- `index.html` contains the page shell, status labels, scene canvas, and controls.
- `css/style.css` handles desktop/mobile layout and presentation.
- `js/settings.js` reads and writes one preference: whether curtains start raised.
- `js/game.js` currently contains the animal definitions, weighted selection, opening reveal, spawn timing, drawing functions, animation loop, binoculars, and capture behaviour.
- The canvas is resized to its displayed dimensions and uses a capped device pixel ratio.
- Animal appearances are generated in the browser. There is no server-side spawn system.

## Future maintainability

As the prototype grows, consider separating:
- Animal catalogue data
- Spawn/rarity logic
- Canvas scene rendering
- Animal-specific drawing/animation
- UI controls and capture logic

Do not split files just for the sake of abstraction. Keep the current small prototype easy to understand.

## Privacy and storage

The application must not save player records (sightings, captures, history, or profiles). The only stored preference is `ww_always_curtain_raised` in `localStorage` (default off): whether the window curtains start already raised. Do not introduce sessionStorage, IndexedDB, cookies, database writes, or analytics. The only intentional output from Capture is a PNG download initiated by the user.

## Hosting

GitHub Pages serves the static files. Use relative asset paths so the game works from a repository subpath. No environment variables or secrets are required.
