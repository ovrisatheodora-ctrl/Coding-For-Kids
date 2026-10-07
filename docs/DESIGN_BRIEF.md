# CODING FOR KIDS — DESIGN BRIEF

## PRIMARY VISUAL REFERENCE
Follow the visual rules in this document (neo-brutalism, palette, borders, shadows) for the Coding for Kids website.
Do NOT interpret the reference loosely.

The website must reproduce its:
- Layout
- Composition
- Proportions
- Spacing
- Visual hierarchy
- Color balance
- Typography scale
- Card proportions
- Border thickness
- Shadow style
- Illustration scale
- Decorative density
- Section rhythm
- Overall atmosphere

The result should immediately feel like it belongs to the same design system as the reference.
Do not replace the visual direction with a generic modern UI.

# DESIGN PERSONALITY
The website should feel like:
PLAYFUL CHILDREN'S CODING MAGAZINE
+
INTERACTIVE LEARNING PLATFORM
+
VIDEO GAME INTERFACE

The emotional feeling should be:
FUN
ENERGETIC
COLORFUL
FRIENDLY
CREATIVE
TACTILE
PLAYFUL
EDUCATIONAL

The visual design should make an elementary school student immediately think:
“THIS LOOKS FUN. I WANT TO TRY IT.”

The website must NOT look like:
- Traditional school website
- Corporate education website
- Generic SaaS dashboard
- Generic LMS
- Flat Bootstrap website
- Dark futuristic interface
- Glassmorphism
- Corporate website
- Text-heavy learning platform

# VISUAL STYLE
Primary style:
NEO-BRUTALISM + PLAYFUL EDUCATIONAL DESIGN

Use:
- Thick black outlines
- Strong offset black shadows
- Chunky rounded cards
- Bold playful typography
- Flat colors
- Minimal gradients
- Hand-drawn illustrations
- Large buttons
- Colorful sections
- Playful animations
- Cartoon characters
- Doodles
- Stars
- Sparkles
- Coding symbols
- Cursor icons
- Arrows
- Plus shapes

Major cards should use approximately:
border: 3px solid #111111;
box-shadow: 7px 7px 0 #111111;

Buttons should also use strong borders and offset shadows.

Hover behavior:
transform: translate(-2px, -2px);

Pressed behavior:
transform: translate(2px, 2px);
box-shadow: 3px 3px 0 #111111;

# COLOR PALETTE

Use these colors consistently throughout the entire website.

BLOSSOM:
#FFD1F3

SUMMER SKY:
#CCF6FF

SOUR APPLE:
#C7EF8E

BANANA:
#FFE45C

PRIMARY OUTLINE:
#111111

BACKGROUND:
Warm cream / soft off-white
#FFFDF5

The pastel colors — **Blossom, Summer Sky, and Sour Apple** — are the primary accent colors. **Banana** is the yellow accent for stars and primary learning buttons.

Use them consistently for:

- Hero sections
- Lesson cards
- Buttons
- Badges
- Illustrations
- Decorative elements
- Section accents
- Interactive states

Maintain strong contrast using the Primary Outline #111111 for borders, shadows, and important text.

Do not introduce unrelated bright colors.


# BACKGROUND
The page background is warm cream (#FFFDF5).
Pastel background stripes appear only in specific sections, not across the whole page.
Keep the Hero section background plain cream.
Where stripes are used, use pastel colors with irregular lengths and cream space between them.
They should feel hand-designed rather than perfectly uniform.

Add scattered:
⭐ Stars
✦ Sparkles
→ Arrows
+ Plus shapes
Coding symbols
Cursor icons
Small doodles

Decorations should enhance the design without interfering with readability.

# NAVBAR
Use a centered floating navbar.
Shape:
Large rounded rectangle.

Style:
- Warm cream / white background
- 3px black border
- Approximately 8px black bottom/right shadow
- Rounded corners

Layout:

LEFT:
Star-free image logo beside the CODING FOR KIDS text.

CENTER:
Home
Lessons
Games
About

RIGHT:
Start Learning →

Navbar buttons and Start Learning use Banana:
#FFE45C

The logo must not contain a star, including in its image artwork.

The navbar should visually match the reference screenshot.

# HERO
The Hero is the most important section.
Use a layered ticket-style card in a two-column layout.

LEFT:
Large layered ticket-style content card.

RIGHT:
Large Maskot_Coding_For_Kids.png asset.

The Hero section background is plain cream. The ticket-style card is layered,
with the mascot on the right on desktop.

The two areas should visually overlap slightly.

Do NOT make the Hero look like a clean generic SaaS hero.

# HERO TYPOGRAPHY

Headline:
LEARN TO
CODE.
PLAY. CREATE.
HAVE FUN!

Color:
CODE. → Blossom
PLAY. → Summer Sky
CREATE. → Sour Apple
HAVE FUN! → Banana

Typography should be:
- Extremely bold
- Rounded
- Playful
- Slightly irregular
- Large
- Tight line height
- Strong black outline/shadow

The title should occupy a large portion of the Hero.

# HERO DESCRIPTION

Use:
“Belajar coding untuk anak SD melalui permainan, aktivitas interaktif, dan tantangan kreatif.”

English:
“Learn coding for elementary students through games, interactive activities, and creative challenges.”

Keep it short.

Do not use long paragraphs.

# HERO BUTTONS

Primary:
START LEARNING →

Background:
Banana

Secondary:
EXPLORE LESSONS

Background:
Cream / white

Both should have:
- Thick black border
- Offset black shadow
- Rounded pill shape
- Bold typography

# MASCOT
Place the Maskot_Coding_For_Kids.png asset on the right side of the ticket-style Hero card.
Keep the mascot friendly, large, and easy to see.

Surround it with:
- Stars
- Sparkles
- Coding windows
- Cursor
- Colorful shapes

The mascot must be:
- Cartoon
- Hand-drawn
- Child-friendly

Never photorealistic.

# MASCOT ANIMATION

Use subtle animation concepts:
- Floating
- Blinking
- Waving
- Slight head movement

Decorative stars should float independently.

Use different animation delays.

Respect:
prefers-reduced-motion.

# HERO TITLE ANIMATION

The title should use:
- Word-by-word reveal
- Slight upward movement
- Small bounce
- Slight rotation
- Staggered timing

After initial reveal:
Use subtle floating movement.
Do not constantly shake the typography.

# TEXT LOOP / RIBBON
Immediately below the Hero, create a full-width playful animated text ribbon.

Text:
LEARN ✦ PLAY ✦ CODE ✦ CREATE ✦ DISCOVER ✦ SOLVE ✦ HAVE FUN

Ribbon background:

#FFD1F3

Text:

#111111

If React Bits TextLoop is available, use it.

Suggested configuration:

shape="wave"
speed={90}
direction="forward"
separator="✦"
curviness={40}
fontWeight={800}
uppercase
pauseOnHover

The ribbon should visually match the reference.

---

# HOMEPAGE COMPOSITION

NAVBAR
↓
HERO
↓
ANIMATED TEXT RIBBON
↓
LESSONS
↓
TESTIMONIALS
↓
CTA
↓
FOOTER

The homepage should be a long scroll experience.

Do not put everything into one viewport.

---

# LESSON SECTION

Title:

LESSONS IN THIS COLLECTION

Use large bold black typography.

Add decorative arrows and doodles around the heading.

Subtitle:

“Explore coding through fun activities, challenges, and creative projects.”

Pastel background stripes may appear only in specific sections; do not use them
as a page-wide background.

---

# LESSON CARDS

Create EXACTLY THREE cards.

Desktop:

Three-column layout.

CARD 01:

LOGIC & ALGORITHMS

Background:

#C7EF8E

CARD 02:

BASIC CODING

Background:

#CCF6FF

CARD 03:

CREATIVE CODING & PROJECTS

Background:

#FFD1F3

Each card contains:

- Number badge
- Large title
- Short description
- Large illustration
- Level indicator
- Explore Lesson button
- Decorative stars
- Coding elements

Cards should visually resemble colorful physical objects.

---

# LESSON CARD STYLE

Cards should have:

- Large rounded corners
- 2px black border
- Approximately 6px black offset shadow
- Flat color
- Compact content
- Large illustrations

Do NOT use tiny generic icons.

Illustrations should occupy a meaningful part of the card.

---

# LESSON INTERACTION

Hover:

- Card moves slightly upward
- Shadow becomes stronger
- Illustration moves slightly
- Decorative star does not rotate

Click:

Open a dedicated Lesson Detail Page.

Do not use a modal.

---

# LESSON DETAIL DESIGN

Use the same design system.

Top:

Breadcrumb

Home
→ Lessons
→ Selected Lesson

Then:

- Large title
- Short description
- Large themed illustration

---

# GRADE SELECTION

Heading:

CHOOSE YOUR LEARNING LEVEL

Create three large chunky cards:

GRADE 1–2
Little Explorers

GRADE 3–4
Junior Coders

GRADE 5–6
Code Adventurers

Important:

Grade selection does NOT lock the lesson category.

It only changes:

- Difficulty
- Explanation depth
- Language complexity
- Activity complexity
- Game complexity

---

# LANGUAGE SELECTION

Create a visual language selector.

Options:

🇮🇩 Bahasa Indonesia
🇬🇧 English

Default:

Bahasa Indonesia

---

# TWO-PATH EXPERIENCE

After Grade and Language selection, show two major cards.

CARD 1:

📚 PELAJARI MATERI

“Learn the concept, explore examples, and test your understanding.”

BUTTON:

BELAJAR →

Visual feeling:

BOOK / NOTEBOOK / CLASSROOM

CARD 2:

🎮 MAIN GAME

“Put your coding skills into action through fun challenges and game levels.”

BUTTON:

MAIN SEKARANG →

Visual feeling:

ARCADE / ADVENTURE / PLAYGROUND

The two cards must be visually distinct.

---

# LEARNING MODE

Learning Mode should feel like a colorful interactive notebook/classroom.

Flow:

MATERIAL
↓
VISUAL EXAMPLE
↓
INTERACTIVE ACTIVITY
↓
QUIZ
↓
FEEDBACK
↓
REWARD

Keep text short.

Use:

- Large illustrations
- Interactive cards
- Drag and drop
- Matching
- Sorting
- Sequencing
- Puzzle
- Maze
- Coding blocks

The interface should communicate:

WHAT AM I LEARNING?
WHAT SHOULD I DO?
WHAT HAPPENS NEXT?
WHAT DID I ACHIEVE?

---

# QUIZ VISUAL DESIGN

Use multiple interaction types:

- Multiple choice
- Matching
- Drag and drop
- Sorting
- True / False
- Sequence

Correct state:

🎉 GREAT JOB!

+10 XP

Incorrect state:

Almost! Try again.

Show:

💡 HINT

Do not make the quiz look like the main game.

---

# GAME HUB

The Game Hub should feel completely different from Learning Mode.

Title:

CODING ADVENTURE

Subtitle:

“Complete levels, collect stars, and become a Coding Hero!”

Show:

- XP
- Stars
- Badges
- Progress

Create a playful illustrated game map.

Levels:

LEVEL 1
LEVEL 2
LEVEL 3
LEVEL 4
BOSS LEVEL

Locked levels should visibly look locked.

The design should feel like an adventure game map rather than a lesson dashboard.

---

# REAL GAME DESIGN

Games must contain:

PLAYER
+
GOAL
+
ACTION
+
OBSTACLE
+
CHALLENGE
+
SCORE
+
WIN / LOSE
+
REWARD

Games should feel interactive and playable.

Do not represent games as static cards only.

---

# ROBOT DELIVERY UI

Design a visible game board containing:

- Robot
- Start position
- Destination
- Package
- Obstacles
- Paths

Command controls:

MOVE FORWARD
TURN LEFT
TURN RIGHT

RUN

The robot should visibly move on the board.

Success:

🎉 DELIVERY COMPLETE!

Failure:

💥 OOPS!

Buttons:

TRY AGAIN
ASK AI

---

# GAME WIN STATE

Create a playful celebration screen.

Text:

🎉 LEVEL COMPLETE!

Show:

⭐⭐⭐

+100 XP

TIME
01:24

EFFICIENCY
92%

Buttons:

NEXT LEVEL →
PLAY AGAIN

Use stars, confetti-like decorative shapes, and colorful visual feedback while maintaining the neo-brutalist style.

---

# GAME LOSE STATE

Text:

OOPS! TRY AGAIN!

Show a helpful hint.

Buttons:

TRY AGAIN

ASK AI 🤖

The failure screen should feel encouraging rather than punishing.

---

# AI TUTOR DESIGN

Create a floating:

ASK AI 🤖

button.

The AI Tutor should feel like a friendly coding companion.

Design four help levels:

1. SMALL HINT
2. CONCEPT EXPLANATION
3. SIMILAR EXAMPLE
4. FULL SOLUTION

The AI panel should be colorful, rounded, chunky, and child-friendly.

Use simple language.

Encourage thinking.

---

# GAMIFICATION UI

Use:

XP
Stars
Badges
Progress
High Score

Badges:

⭐ Pattern Finder
🤖 Robot Explorer
🧠 Problem Solver
💻 Junior Coder
🐞 Bug Hunter
🎨 Creative Coder
🏆 Game Creator

Badges should look collectible and playful.

Progress indicators should feel like game progression rather than school grades.

---

# TESTIMONIALS

Title:

WHAT THEY SAY

Use two rows of testimonial cards in a continuous marquee.
The marquee loops seamlessly and never pauses.
Use student and parent testimonials.

Use:

- Playful_Pink_Idea_Cube.png, Kawaii_Robot_and_Pastel_Signpost.png, and
  Kawaii_Cat_Designing_a_Star.png avatars
- Pastel backgrounds
- Thick borders
- Black shadows
- Small stars

Place the avatar, name, role, and rating together on the top row of each card.
Place the review text below.

Maintain the same visual language as the lesson cards.

---

# CTA

Use a two-row CTA marquee that loops seamlessly and never pauses.
Use the same warm cream and pastel design system, with Banana as the CTA accent.

Headline:

READY TO START YOUR CODING ADVENTURE?

Description:

“Choose a lesson, play the games, and become a Junior Coder!”

Button:

START LEARNING →

Decorations:

- Stars
- Sparkles
- Doodles

The CTA should visually resemble the colorful banner in the reference.

---

# FOOTER

Logo:

CODING FOR KIDS, with no star in or beside the logo.

Tagline:

Learn. Play. Create. Have Fun!

Links:

Home
Lessons
Games
About

Languages:

Bahasa Indonesia
English

Copyright:

© 2026 Coding for Kids

Keep the footer playful but visually simpler than the Hero.

---

# RESPONSIVE DESIGN

Desktop:

- Wide composition
- Two-column Hero
- Three lesson cards
- Two testimonial rows

Tablet:

- Adaptive grid
- Rebalanced Hero

Mobile:

- Single-column layout
- Mascot appears above the ticket-style Hero card
- One lesson card per row
- Touch-friendly controls
- Mobile navigation
- Responsive games

Do not simply shrink the desktop design.

Recompose the layout while preserving the visual identity.

---

# ANIMATION SYSTEM

Use playful and controlled animations.

Hero:

- Text reveal
- Stagger
- Bounce
- Floating

Mascot:

- Float
- Blink
- Wave

Decorations:

- Float
- Rotate
- Small bounce

Cards:

- Lift on hover
- Shadow movement

Buttons:

- Hover
- Press effect

Sections:

- Scroll reveal

Animations should remain subtle.

Respect:

prefers-reduced-motion.

---

# DESIGN CONSISTENCY

Every page must use the same design system.

Maintain consistency in:

- Colors
- Typography
- Borders
- Shadows
- Card radius
- Buttons
- Illustrations
- Decorative elements
- Spacing
- Animation language

Do not create a different visual style for individual pages.

Learning Mode can feel more notebook/classroom-like.

Game Mode can feel more arcade/adventure-like.

However, both must still clearly belong to the same Coding for Kids design system.

---

# FINAL VISUAL GOAL

The finished UI should feel like:

A REAL CHILDREN'S CODING PLATFORM.

Not:

- A school website
- A normal landing page
- A generic dashboard
- A quiz website
- A generic AI website

The student should feel:

“I am entering a colorful coding adventure.”

Core experience:

LEARN
↓
TRY
↓
PLAY
↓
SOLVE
↓
WIN
↓
CREATE

MOST IMPORTANT:

The reference screenshot is the PRIMARY VISUAL REFERENCE.

Match:

- Layout
- Spacing
- Visual hierarchy
- Color balance
- Card proportions
- Hero proportions
- Typography scale
- Decorative density
- Border thickness
- Shadow style
- Illustration scale
- Section rhythm

Do not interpret the visual design too loosely.