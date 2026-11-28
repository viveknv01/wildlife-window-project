# Wildlife Window

**A relaxing, browser-based 2D wildlife spotting game.**

The player stays inside a small house near a jungle and watches the forest through one window. Animals and birds appear unpredictably. The player observes the scene, raises the binoculars for a closer look, and captures a snapshot.

This repository contains the playable first prototype and the product/technical documentation needed by developers and AI coding agents.

## Current prototype

- One illustrated jungle environment and one window view
- Morning/daytime atmosphere
- 25 animal/bird entries (with small herds for deer, gaur, and hares, a rare lone gaur bull, and wild dog packs), including 7 animals that are only visible through the binoculars or the camera (two babblers, two mongooses, two pittas, and a perched Malabar giant squirrel)
- 10 special wildlife encounter events (Common, Rare, Very rare, Ultra Rare, and Legendary)
- Animals walk in and out, linger to graze, drink, or rest, and run from predators
- Random appearances and simple movement
- Binoculars: a round magnified lens aimed with the mouse or a finger
- Camera: a rectangular viewfinder with zoom in and out; a capture while it is raised saves only that frame
- Capture downloads a PNG named for the sighting plus the local date and time (the full window, the binocular view, or the camera viewfinder)
- Responsive desktop and mobile browser layout
- Works offline in the browser after one online visit (service worker). System fonts, so no font download
- No accounts, backend, database, analytics, or saved player records

## Run locally

Open `index.html` in a browser, or use VS Code with the Live Server extension.

The site is static and does not require a build command. Open it once while online (HTTPS or localhost). After that the page, script, and styles are cached and the game can be used offline, including from Add to Home Screen. When you publish a change, bump the `CACHE` name in `sw.js` so returning visitors pick up the new files. Opening the folder as a local file does not install the offline cache.

## Start here if you are an AI coding agent

Read these files in order:

1. [`AGENTS.md`](AGENTS.md) – instructions and non-negotiable project constraints.
2. [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) – product purpose and scope.
3. [`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md) – intended player experience and core loop.
4. [`docs/TECHNICAL_ARCHITECTURE.md`](docs/TECHNICAL_ARCHITECTURE.md) – current implementation and extension guidance.
5. [`docs/ROADMAP.md`](docs/ROADMAP.md) – staged development plan.
6. [`docs/CURRENT_STATUS.md`](docs/CURRENT_STATUS.md) – what exists and what is not implemented.

## Repository structure

```text
wildlife-window/
├── index.html             # Browser entry point
├── manifest.webmanifest   # Installable page
├── sw.js                  # Offline cache (bump CACHE when publishing)
├── css/
│   └── style.css          # Responsive game interface
├── js/
│   └── game.js            # Canvas rendering and prototype game logic
├── assets/
│   ├── README.md          # Guidance for future art/audio assets
│   └── icons/favicon.png  # Forest window tab and install icon
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── GAME_DESIGN.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── CONTENT_AND_RARITY.md
│   ├── ROADMAP.md
│   ├── CURRENT_STATUS.md
│   └── DECISIONS.md
├── AGENTS.md              # Instructions for AI coding agents
├── CONTRIBUTING.md
└── .gitignore
```

## Design principle

**The game is about curiosity, not speed.** The player should enjoy looking, listening, noticing movement, and occasionally discovering an animal. Avoid turning the experience into a stressful task or a complex management game.
