# AGENTS.md — Coding for Kids

## Goal
AI-based interactive coding website for elementary students (Grade 1-6),
for the M-ONE Coding Competition. Theme: Innovating Education Through
Technology. Flow: LEARN > TRY > PLAY > SOLVE > WIN > CREATE.

## Read first (source of truth)
- docs/PRD.md: functional requirements and curriculum (do not remove topics)
- docs/DESIGN_BRIEF.md: visual rules and homepage composition
- docs/reference/: primary visual reference screenshot
If they conflict: PRD wins for functionality, DESIGN_BRIEF wins for visuals.

## Stack
- React (Vite) + JavaScript, React Router
- Plain CSS with CSS variables (no Tailwind, no TypeScript)
- GSAP + React Bits TextLoop
- Hosting: Vercel. AI Tutor runs in a serverless function in /api
- Progress (XP, stars, badges, language, grade) in localStorage, no login

## Features
1. Homepage: navbar, hero, TextLoop ribbon, 3 lesson cards,
   testimonials, CTA, footer
2. Lesson detail page: grade selection, language selection (ID default, EN)
3. Learning mode: material > example > activity > quiz > feedback > reward
4. Game mode: game hub, level map, playable games, win/lose, rewards
5. AI Tutor "Ask AI": 4 levels (hint, concept, example, full solution)
6. Gamification: XP, stars, badges, high score

## Structure
src/components, src/pages, src/lessons (data), src/games,
src/data (lessons + i18n), src/styles, src/assets, api/

## Design tokens
Coral #FF524D, Orange #FF8637, Yellow #FFDE5A, Green #31B54C,
Turquoise #11C9B7, Blue #43B4FB, Purple #A192F7, Pink #FF80CF,
outline #111111, warm cream background.
Cards/buttons: 3px solid border, 7px hard offset shadow, no blur.
Hover: translate(-2px,-2px). Active: translate(2px,2px), shadow 3px.

## Working rules
- Work in phases. Do ONE phase per task, never build everything at once.
- Lessons and games are data-driven (no hardcoded page per lesson).
- All UI strings live in src/data/i18n (id + en), none inline.
- Short text, big visuals, child-friendly language.
- Respect prefers-reduced-motion. Keyboard-friendly, good contrast.
- Responsive: recompose for mobile, don't just shrink desktop.
- Performance: lazy load images, compressed assets, route-level code
  splitting, basic SEO meta tags.
- Security: never put API keys in client code. Use Vercel env variables
  via /api. Keep .env in .gitignore.
- AI Tutor: system prompt limits it to coding topics for kids, never gives
  the full answer first, and falls back to static hints if the API fails.
- Git: small commits (feat:, fix:, docs:, style:, refactor:). Never force
  push or rewrite history.
- After each phase: `npm run build` must pass, then summarize changes.

## Do not
- Copy code or templates from other projects
- Remove curriculum topics from the PRD
- Add unsafe or off-topic content