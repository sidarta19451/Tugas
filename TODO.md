# TODO: Restructure App Layout - Separate Pages for Registration and Profile Company

## Steps to Complete
- [ ] Update src/app/app.component.html: Remove all static dashboard content (info boxes, charts, tables, direct chat, etc.) from <section class="content">, keep navbar, sidebar, footer, and position <router-outlet> inside <div class="container-fluid"> for dynamic loading.
- [ ] Update sidebar in src/app/app.component.html: Change Dashboard v2 link to routerLink="/registration", v3 to routerLink="/profile-company". Simplify sidebar by removing sections like Widgets, Charts, UI Elements, Forms, Tables, EXAMPLES, MISCELLANEOUS, etc. (keep Dashboard and basic structure).
- [ ] Verify app-routing.module.ts: Ensure default redirect to /profile-company works; no major changes needed.
- [ ] Test the application: Run ng serve and use browser_action to verify separate pages (index2 loads registration, index3 loads profile-company), navigation via sidebar, and no middle clutter.
