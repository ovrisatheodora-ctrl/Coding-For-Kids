## Current phase: Phase 3 — Learning Mode framework

Status: Complete

- [x] Replace the Learning Mode placeholder with a reusable, lazy-loaded, data-driven lesson flow.
- [x] Add complete Logic & Algorithms, Grade 1–2 units for all five subtopics.
- [x] Add five learning stages, combining material and visual example in the first stage, followed by activity, quiz, feedback, and reward.
- [x] Support multiple choice, true/false, sequence ordering, matching, and pattern completion.
- [x] Add bilingual lesson content and UI strings; default language remains Bahasa Indonesia.
- [x] Persist XP, stars, badges, completed units, language, and grade through the shared local progress store.
- [x] Show friendly coming-soon screens for other lesson/grade combinations.
- [x] Verify the development flow, language switching, rewards, persistence, and unsupported routes.
- [x] Run the production build and targeted lint.
- [x] Expand the lesson registry so all 3 lesson cards have working material access across grades 1–2, 3–4, and 5–6.
- [x] Add nine complete learning units across Logic & Algorithms, Basic Coding, and Creative Coding to replace the remaining coming-soon placeholders.
- [x] Add five bilingual Grade 1–2 subtopics each for Basic Coding and Creative Coding & Projects.
- [x] Match the About page to the supplied introduction, learning steps, feature cards, and badge collection reference.
- [x] Verify the production build and targeted lint after the curriculum and About page updates.

Scope note: Pattern Adventure and Robot Delivery are the only playable games; the remaining game content and AI Tutor backend remain outside Phase 3.

Recent UX polish:
- Combined each selected subtopic's localized material and visual example into a responsive two-panel first learning stage, followed by a five-stage stepper.
- Unified the large lesson-banner illustration layout across Logic & Algorithms, Basic Coding, and Creative Coding & Projects.
- Matched the lesson-level Main Game card picker to the Learn subtopic page's starfield paper background, back button, pastel cards, and centered card layout while keeping the global Games hub unchanged.
- Routed the lesson-level Main Game choice to a grade- and category-specific game-card list instead of the Game Mode placeholder.
- Showed all six games for the selected lesson category across Grades 1–6, with only the two implemented Grade 1–2 games playable and the rest marked Coming Soon.
- Replaced game-card emoji logos with their matching supplied card artwork across the lesson game lists and global Games catalog.
- Removed the learning-page title banner and aligned the grade, XP, and stars badges with the Back to topics button.
- Kept the learning page typography on the shared Nunito font and removed the redundant bottom Back button, leaving the Continue action centered beneath the lesson card.
- Disabled forward lesson-step navigation until the current interactive activity or quiz has been completed, and kept each stage's own gated Continue control as the only way forward.
- Connected the two available game cards directly to playable five-level Pattern Adventure and Robot Delivery experiences; level progression stays locked until the player completes the current challenge.
- Matched Coming Soon cards in the Lessons game list to the muted, locked-card treatment in the global Games catalog.
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
- Reused the To Do List and Loop assets on the Grade 3–4 Logic & Algorithms cards for “Algoritma Sehari-hari” and “Perulangan”.
- Applied the matching “Pola & Lanjutan”, “Percabangan”, and “Cari Kesalahan” assets to their Grade 3–4 Logic & Algorithms subtopic cards.
- Switched the Grade 3–4 debugging subtopic to the “Memperbaiki” asset and enlarged the “Pola & Lanjutan” and “Percabangan” card artwork, especially “Percabangan”.
- Further enlarged and shifted the Grade 3–4 “Pola & Lanjutan” and “Percabangan” artwork, and increased the size of the “Memperbaiki” artwork.
- Fine-tuned Grade 3–4 icon alignment: moved Algoritma right/up, Pola slightly left/up, Percabangan slightly left, and enlarged Mencari & Memperbaiki.
- Added subtle content reveal animations to lesson details, Games, About, and the homepage lessons section when Start Learning is clicked.
- Matched page content reveal animations to the Lessons cards' slide-up effect (0.5s ease with staggered sections).
- Removed Twemoji rendering from Ask AI and restored native platform emojis for recommendations and greetings at the user's request.
- Fixed the grade 1–2 Logic & Algorithms learning flow so the stepper is clickable, order-based activity data is handled correctly, multi-choice quiz arrays are normalized, and route-driven progression works cleanly from activity through quiz, feedback, and reward screens.
- Added a subtopic selection screen after choosing Learn, with all five Grade 1–2 Logic & Algorithms units linked to their own lessons and best-star counts.
- Styled the subtopic cards in pastel colors and reused the exact illustrated starfield and lined-paper background from the Home hero.
- Removed the extra header/card corner decorations from the subtopic page and moved its Back button slightly lower.

If a document conflicts with the existing UI code, the current UI code is the latest decision. Do not revert it to an older design. Explain the conflict and ask before changing visual direction.