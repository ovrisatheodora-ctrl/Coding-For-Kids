# AGENTS.md — Coding for Kids

## Goal
AI-based interactive coding website for elementary students (Grade 1-6),
for the M-ONE Coding Competition. Theme: Innovating Education Through
Technology. Flow: LEARN > TRY > PLAY > SOLVE > WIN > CREATE.

## Read first (source of truth)
- docs/PRD.md: functional requirements and curriculum (do not remove topics)
- docs/DESIGN_BRIEF.md: visual rules and homepage composition
If they conflict: PRD wins for functionality, DESIGN_BRIEF wins for visuals.
- docs/PHASES.md: current phase and checklist

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
Blossom #FFD1F3, Summer Sky #CCF6FF, Sour Apple #C7EF8E,
outline #111111, warm cream background #FFFDF5.
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
- After each phase: `npm run build` must pass, then summarize changes
  and update docs/PHASES.md.

## Competition rules (M-ONE Coding Competition, Kategori Umum)
- Deadline submit: 15 Oct 2026, 15.30 WIB. Aim to be deployed by 14 Oct.
- Everything is created after 5 Oct 2026, 09.30 WIB.
- Repo stays public. Never force push or fake commit dates.
- Every prompt is logged in docs/PROMPT_LOG.md (raw, with timestamp).
- Deployed site must run without errors. A working feature beats an
  unfinished one.

## Scope rule
Build shared game engines (robot grid, block sorting, pattern, choice)
and make each game a data entry. Polish 4-6 games fully first.
List all 18 games in data; mark unfinished ones as "coming soon".

## Do not
- Copy code or templates from other projects
- Remove curriculum topics from the PRD
- Add unsafe or off-topic content