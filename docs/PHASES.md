## Current phase: Phase 3 — Learning Mode framework

Status: Complete

- [x] Replace the Learning Mode placeholder with a reusable, lazy-loaded, data-driven lesson flow.
- [x] Add one complete Logic & Algorithms, Grade 1–2 unit: Mengenal Pola.
- [x] Add the six steps: material, visual example, interactive activity, quiz, feedback, and reward.
- [x] Support multiple choice, true/false, sequence ordering, matching, and pattern completion.
- [x] Add bilingual lesson content and UI strings; default language remains Bahasa Indonesia.
- [x] Persist XP, stars, badges, completed units, language, and grade through the shared local progress store.
- [x] Show friendly coming-soon screens for other lesson/grade combinations.
- [x] Verify the development flow, language switching, rewards, persistence, and unsupported routes.
- [x] Run the production build and targeted lint.

Scope note: Game Mode, game content, and the AI Tutor backend remain outside Phase 3.

Recent UX polish:
- Adjusted the floating AI tutor panel to anchor to the left side of the mascot and clamp within the visible viewport so it never appears cropped or off-screen.
- Kept the lesson selection flow smooth with staged reveal transitions and safe viewport-aware positioning.
- Standardized CTA styling, asset-based icon treatments, and locked-card spacing to match the reviewed mockup more closely.
- Routed Start Learning CTAs to the Lessons section on the homepage, while Explore Lessons opens the dedicated Lessons page.
- Made Start Learning reliably scroll to the homepage lessons section on every click, including repeat clicks while already on that section.
- Widened and layered the Ask AI panel above the navbar, with a fixed popup size and an independently scrollable chat history.
- Positioned the Ask AI panel below the navbar and added a speech-bubble tail pointing toward the AI mascot, retaining the fixed panel dimensions where viewport space allows.
- Shifted the panel closer to the mascot, moved hint recommendations above the message field, and replaced the Send label with an inline send icon.
- Kept the send icon button monochrome with a black outline and compacted hint recommendation buttons into one row.
- Slightly widened the Ask AI popup and shifted it right to sit closer to the mascot while staying within viewport bounds.
- Nudged the popup left, compacted its pink header, strengthened the close icon, removed the robot emoji from the assistant title, and matched the send control to the gray outline example.
- Routed mouse-wheel scrolling over the Ask AI popup to its chat history and contained scroll chaining so the underlying page stays still.
- Changed the Ask AI header bubble from pink to blue.
- Changed the active hint button to banana yellow and user chat bubbles to blue.
- Changed the Ask AI header bubble to green.
- Changed the selected Ask AI recommendation button from banana yellow to green.
- Changed the Coding Assistant header bubble to banana yellow.
- Softened the Coding Assistant banana header color with partial transparency.
- Added subtle content reveal animations to lesson details, Games, About, and the homepage lessons section when Start Learning is clicked.
- Matched page content reveal animations to the Lessons cards' slide-up effect (0.5s ease with staggered sections).
- Removed Twemoji rendering from Ask AI and restored native platform emojis for recommendations and greetings at the user's request.

If a document conflicts with the existing UI code, the current UI code is the latest decision. Do not revert it to an older design. Explain the conflict and ask before changing visual direction.