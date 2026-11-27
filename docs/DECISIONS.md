# Product and Technical Decisions

This document records decisions so contributors and AI agents do not accidentally change the project's direction.

| Decision | Current choice | Reason |
|---|---|---|
| Game style | 2D | Fast to prototype and suitable for a calm scene |
| Gameplay pace | Relaxing | Observation and discovery are the core experience |
| Platform | Responsive browser game | Supports desktop and mobile |
| Initial environment | One jungle | Keep the first release focused |
| View | One window | Establish a clear central game metaphor |
| Frontend | HTML, CSS, vanilla JS | Lightweight and easy to host |
| Rendering | Canvas 2D | Suitable for a continuously animated scene |
| Hosting | GitHub Pages | Static hosting with no backend requirement |
| Player records | Do not save | Explicit first-version requirement |
| Capture | Download PNG on user action | Gives the player a keepsake without storing records |
| Curtain preference | `localStorage` key `ww_always_curtain_raised` only | Remember whether curtains start raised. Default is off. No wildlife records. |
| Backend | None | Not needed for the prototype |

## Change process

If a future request conflicts with one of these decisions, explain the trade-off and ask for approval before changing the architecture or product scope.
