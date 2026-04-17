# NovaBrew Coffee Taste Profile Quiz — Requirements

## Overview
A web-based personality quiz that helps NovaBrew subscribers discover their coffee identity and receive a primary and secondary taste profile. The quiz should feel premium, personal, and credible while also giving NovaBrew useful matching signals for future coffee recommendations.

## Product Goal
Shift NovaBrew from a transactional subscription experience to a more personal, identity-based experience that helps subscribers feel known from day one.

## Personality Types

### Bold Explorer
Drawn to strong, intense, high-character coffee. Likes drinks that feel energizing, decisive, and memorable. Wants coffee with presence.

### Smooth Operator
Prefers balanced, polished, easy-to-love coffees that feel refined without being extreme. Reliable quality matters more than drama.

### Cozy Classic
Wants comfort, routine, and familiarity. Coffee should feel warm, calming, and easy to settle into as part of a daily ritual.

### Wild Card
Enjoys novelty, unusual flavor notes, and surprising experiences. More open to experimentation than the average subscriber and excited by the unexpected.

### Undefined Palate
Still figuring out what they like and wants guidance rather than a rigid identity. Open to discovery, but wants the quiz to help them learn their taste instead of pretending they already know it.

## Coffee Pairings
Multiple personalities can map to the same coffee if it fits in different ways.

- Bold Explorer
  - Midnight Summit
  - Double Down

- Smooth Operator
  - Sunrise Blend
  - Velvet Fog

- Cozy Classic
  - Midnight Summit
  - Sunday Paper

- Wild Card
  - Off the Map
  - Wildflower

- Undefined Palate
  - Golden Hour
  - The Purist

## Quiz Question Style
Use a mix of:
- mood and emotional context
- flavors people gravitate toward
- favorite and least favorite drink tendencies
- absolute must-haves
- absolute hard no's
- willingness to explore

The tone should feel personal and useful, not like a generic internet quiz and not like an overly technical coffee survey.

## Results Format
Use a primary + secondary result.

The results page should tell the user:
- their primary coffee personality
- their secondary tendency
- what that combination says about them
- which NovaBrew coffees fit them best

## Quiz Questions

### Question 1
You walk into a cafe and order based on...
- A) whatever feels strongest, richest, and most energizing right now
- B) something smooth, balanced, and reliably good
- C) whatever feels warm, familiar, and easy to settle into
- D) the most unusual thing on the menu because why not
- E) something simple and easy to enjoy because you are still figuring out what you like

### Question 2
Which flavor profile sounds most satisfying to you today?
- A) dark chocolate, smoke, spice
- B) caramel, cocoa, toasted nuts
- C) vanilla, hazelnut, soft sweetness
- D) floral, funky fruit, bright acidity
- E) something clean and simple that helps me understand my taste better

### Question 3
What kind of coffee experience are you usually looking for?
- A) intensity that wakes me up immediately
- B) something polished and versatile that fits any time of day
- C) comfort, calm, and a little ritual
- D) surprise me with something different from what I had last time
- E) help me discover what kind of coffee person I even am

### Question 4
Which of these would disappoint you the most?
- A) a coffee that feels weak or forgettable
- B) a coffee that feels messy or unbalanced
- C) a coffee that feels too harsh or aggressive
- D) a coffee that feels boringly predictable
- E) a result that assumes too much about me before I know my own taste

### Question 5
How adventurous are you with coffee?
- A) I know I like bold coffees and want more of that energy
- B) I like some variety, but I still want it to feel refined and dependable
- C) I would rather stay in my comfort zone with something cozy
- D) very, I actively want to try things I have never had before
- E) somewhat, but I want guidance instead of being thrown into the deep end

### Question 6
If NovaBrew could promise you one thing, what would matter most?
- A) every bag feels powerful and full of character
- B) every bag feels carefully matched and easy to enjoy
- C) every bag feels comforting and fits into my routine
- D) every bag introduces me to something unexpected and exciting
- E) every bag helps me learn more about what I actually like

## Question Mapping
Each answer choice maps consistently across all questions:
- A = Bold Explorer
- B = Smooth Operator
- C = Cozy Classic
- D = Wild Card
- E = Undefined Palate

## Quiz Logic
- Track a running score across all five personalities
- The highest score becomes the primary result
- The second-highest score becomes the secondary result
- If there is a tie, break it using the latest answer among the tied personalities
- The results page should display both the primary and secondary identity in a satisfying, easy-to-understand way

## Results Experience
The results page should include:
- a bold headline with the user's primary personality
- a secondary-trait callout
- a short interpretation of what that combination means
- recommended coffee pairings
- a short explanation of why those coffees fit
- result imagery for each personality type
- a shareable, visually satisfying layout

## Visual Style
Use the minimal color palette and overall clean premium aesthetic from the minimal preview.

Add bolder typography inspired by the bold preview:
- stronger headline presence
- more dramatic display text
- enough contrast and personality that the quiz does not feel generic or flat

Overall feeling:
- premium
- clean
- modern
- warm but not playful
- personality-forward without looking childish

## Images and Icons
- Images for results: yes
- Icons or emoji in answer options: no

## Extra Features
- Smooth transitions between questions
- A progress indicator
- Mobile-responsive layout
- Clean, shareable results page

## Technical Notes
- Build with Next.js + Tailwind CSS
- Single-page app feel with smooth transitions between questions
- Mobile-responsive and desktop-friendly
- Keep the implementation simple and polished for a first version

## Build Priorities
1. Clear, attractive quiz flow
2. Strong results payoff with primary + secondary personality
3. Premium visual design that matches NovaBrew's positioning
4. Coffee recommendations tied to each result
5. A result experience that feels personal enough to share

## Open Notes
- Coffee pairings are allowed to overlap across personalities
- Undefined Palate should feel intentional and helpful, not like a leftover "other" bucket
- The quiz should feel grounded in taste and emotion, not in pop culture references
