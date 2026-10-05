# DESIGN_BRIEF — Coding for Kids
Visual rules only. Functionality lives in docs/PRD.md.

## Reference
The screenshot in docs/reference/ is the PRIMARY visual reference.
Match its layout, proportions, spacing, hierarchy, card style,
typography scale, and decorative density. Do not interpret loosely.

## Mood
Playful children's coding magazine + learning platform + video game UI.
Fun, energetic, colorful, tactile. NOT: school website, minimal SaaS,
dark mode, glassmorphism, futuristic UI, heavy gradients, generic Bootstrap.

## Tokens
- Colors: coral #FF524D, orange #FF8637, yellow #FFDE5A, green #31B54C,
  turquoise #11C9B7, blue #43B4FB, purple #A192F7, pink #FF80CF
- Outline/text: #111111. Background: warm cream. No other bright colors.
- Cards: `border: 3px solid #111; box-shadow: 7px 7px 0 #111;` chunky radius
- Buttons: pill shape, same border and shadow
- Hover: `translate(-2px,-2px)`. Active: `translate(2px,2px)`, shadow 3px 3px 0
- Fonts: bold rounded cartoon display font (e.g. Lilita One) + Nunito body

## Background
Cream base with irregular pastel stripes (pale blue, pale yellow) behind the
hero, around sections and headings. Uneven lengths, hand-made feel.
Scatter stars, sparkles, arrows, plus shapes, cursor icons, coding symbols.
Never hurt readability.

## Navbar
Floating, centered, rounded rectangle, cream, 3px border, hard shadow.
Left: logo "CODING / FOR KIDS" + star. Center: Home (yellow pill when active),
Lessons, Games, About. Right: "Start Learning →" in purple. Hamburger on mobile.

## Hero
Two columns. Left: irregular neo-brutalist content panel. Right: mascot.
They overlap slightly. Not a clean SaaS hero.
Title (huge, rounded, tight line height, thick outline):
LEARN TO / CODE. (coral) / PLAY. (blue) CREATE. (green) / HAVE FUN! (yellow)
One short description line. Two pill buttons: "Start Learning →" (yellow),
"Explore Lessons" (cream).
Mascot: friendly white robot, dark face screen, blue headphones, laptop with
code, happy face, waving hand. Cartoon style, surrounded by stars, code
windows, cursor, colorful shapes.

## Ribbon
Full-width purple (#A192F7) strip below the hero, black text, React Bits
TextLoop (gsap): LEARN ✦ PLAY ✦ CODE ✦ CREATE ✦ DISCOVER ✦ SOLVE ✦ HAVE FUN.
Wave shape, pause on hover.

## Homepage order
Navbar > Hero > Ribbon > Lessons > What they say > CTA > Footer (long scroll)

## Lesson cards (exactly 3, three columns on desktop)
01 Logic & Algorithms (yellow), 02 Basic Coding (blue),
03 Creative Coding & Projects (pink).
Each: number badge, big title, short description, LARGE illustration,
level indicator, "Explore Lesson →" button, decorative stars.
Hover: lift, stronger shadow, illustration shifts, star rotates.
Click: real page navigation, never a modal.

## Other screens (visual direction)
- Lesson detail: breadcrumb, big title, illustration, 3 grade cards,
  language selector, then two clearly different path cards:
  Learn = notebook/classroom feel, Play = arcade/adventure feel.
- Game hub: illustrated level map, locked levels visibly locked,
  HUD with XP, stars, badges. Distinct win and lose screens.

## Testimonials, CTA, Footer
Three testimonial cards (student, parent, teacher) in pastel colors with
playful avatars. Large yellow CTA banner with stars and doodles.
Simple playful footer with logo, tagline, links, language switch.

## Motion
- Hero title: word-by-word reveal, stagger, small bounce, then gentle float
- Mascot: float, blink, occasional wave. Decorations float with different delays
- Cards and buttons: lift/press effects. Sections: scroll reveal
- Must respect prefers-reduced-motion

## Responsive and accessibility
Desktop 2/3 columns, tablet adaptive, mobile 1 column. Recompose, do not
just shrink. Touch-friendly buttons, good contrast, keyboard focus states.