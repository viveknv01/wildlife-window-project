# Instructions for AI Coding Agents

Before changing code, read `README.md` and the documents in `docs/`. Treat this file as the project-level instruction contract.

## Product intent

Wildlife Window is a relaxing, casual, browser-based 2D wildlife observation game. The player watches a jungle from a house window. Animals appear naturally and unpredictably. The player may zoom and capture a snapshot.

The feeling should be peaceful, curious, atmospheric, and welcoming.

## Non-negotiable constraints

- Target both desktop and mobile web browsers.
- Keep the project static and GitHub Pages compatible.
- Use plain HTML, CSS, and vanilla JavaScript for the current prototype.
- Use HTML Canvas for the animated scene.
- Do not introduce Angular, React, Vue, a server, database, authentication, or a build system unless the project owner explicitly approves the change.
- Do not persist player records. No accounts, collection history, scores, IndexedDB, cookies, or remote player profiles.
- Two UI preferences may use localStorage, both default off: whether the window curtains start already raised (`ww_always_curtain_raised`), and whether camera captures are redrawn sharper (`ww_camera_hq_capture`). Do not store sightings, captures, or any other player data.
- A capture may download a PNG to the user's device. Do not store a photo in an application database.
- Do not add monetization, ads, competitive leaderboards, timers, penalties, or stressful mechanics without approval.
- Do not replace the relaxing core loop with missions or mandatory progression.

## Development rules

1. Inspect the existing implementation before editing.
2. Keep changes small and focused. Avoid rewriting working systems without a clear reason.
3. Preserve mobile responsiveness and touch usability.
4. Avoid external dependencies unless justified and approved.
5. Do not use copyrighted animal photos, sounds, fonts, or other assets without checking their license. Document asset sources and licenses.
6. Keep animal definitions and rarity settings easy to find and maintain. If they are moved into a separate data file, update the documentation.
7. Handle missing browser features gracefully where practical.
8. Do not claim a feature is implemented unless it is actually present and tested.
9. Update `docs/CURRENT_STATUS.md` and `docs/ROADMAP.md` when implementation status changes.
10. Do not add data collection or analytics.

## Quality checks

For UI/gameplay changes, check:
- Desktop layout and a narrow mobile viewport
- No horizontal page overflow
- Buttons work with mouse and touch
- Canvas resizes correctly
- No uncaught console errors
- Capture downloads a valid PNG
- No unintended persistent storage or network calls

## Before implementing a new feature

Explain briefly:
- What user experience it adds
- Which files need changing
- Whether it changes the static/no-records constraint
- Any asset or browser compatibility requirements

If a request conflicts with this instruction file, ask the project owner rather than silently changing the product direction.
