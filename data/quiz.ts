export type PersonalityKey =
  | "boldExplorer"
  | "smoothOperator"
  | "cozyClassic"
  | "wildCard"
  | "undefinedPalate";

export type Personality = {
  key: PersonalityKey;
  name: string;
  eyebrow: string;
  shortDescription: string;
  longDescription: string;
  resultTitle: string;
  image: string;
  coffees: Array<{
    name: string;
    companyDescription: string;
    fitReason: string;
  }>;
};

export type Answer = {
  id: string;
  label: string;
  text: string;
  trait: PersonalityKey;
};

export type Question = {
  id: string;
  prompt: string;
  support: string;
  answers: Answer[];
};

export const personalityOrder: PersonalityKey[] = [
  "boldExplorer",
  "smoothOperator",
  "cozyClassic",
  "wildCard",
  "undefinedPalate",
];

export const personalities: Record<PersonalityKey, Personality> = {
  boldExplorer: {
    key: "boldExplorer",
    name: "Bold Explorer",
    eyebrow: "Strong taste, zero hesitation",
    shortDescription:
      "You want coffee with presence, energy, and a little swagger.",
    longDescription:
      "You are drawn to coffees that feel powerful and memorable. NovaBrew should never hand you something timid. You want cups with intensity, character, and enough edge to feel like a choice you made on purpose.",
    resultTitle: "You like your coffee to walk into the room before you do.",
    image: "/images/bold-explorer.svg",
    coffees: [
      {
        name: "Midnight Summit",
        companyDescription:
          "A dark Indonesian roast with smoky depth, bittersweet cocoa, and a heavy, satisfying finish.",
        fitReason:
          "This fits your profile because it leads with intensity and leaves a strong impression instead of fading into the background.",
      },
      {
        name: "Double Down",
        companyDescription:
          "An extra-bold Italian-style espresso roast built for thick crema, deep body, and no-nonsense energy.",
        fitReason:
          "It matches your taste for coffees that feel decisive, powerful, and fully committed.",
      },
    ],
  },
  smoothOperator: {
    key: "smoothOperator",
    name: "Smooth Operator",
    eyebrow: "Balanced, polished, reliable",
    shortDescription:
      "You want coffee that feels refined, easy to enjoy, and quietly impressive.",
    longDescription:
      "You are not looking for chaos in a cup. You appreciate range, but what you really love is balance. NovaBrew should give you coffees that feel composed, polished, and consistently satisfying.",
    resultTitle: "You are here for taste with poise, not drama.",
    image: "/images/smooth-operator.svg",
    coffees: [
      {
        name: "Sunrise Blend",
        companyDescription:
          "A balanced Colombian medium roast with caramel sweetness, cocoa depth, and a polished finish.",
        fitReason:
          "It works for you because it feels easy to love without being boring or one-note.",
      },
      {
        name: "Velvet Fog",
        companyDescription:
          "A medium-light Brazilian cup with a creamy body, soft almond, and mellow cocoa notes.",
        fitReason:
          "This recommendation fits your preference for coffees that feel refined, smooth, and quietly impressive.",
      },
    ],
  },
  cozyClassic: {
    key: "cozyClassic",
    name: "Cozy Classic",
    eyebrow: "Comfort-first coffee rituals",
    shortDescription:
      "You want warmth, familiarity, and something that fits into your life like a favorite sweater.",
    longDescription:
      "Coffee is not just a drink for you. It is a ritual. NovaBrew should give you coffees that feel comforting, grounded, and easy to return to. You want reliability without sacrificing quality.",
    resultTitle: "Your best cup feels like a routine worth protecting.",
    image: "/images/cozy-classic.svg",
    coffees: [
      {
        name: "Midnight Summit",
        companyDescription:
          "A dark Indonesian roast with smoky richness and a grounded, familiar depth.",
        fitReason:
          "For your profile, this reads as dependable comfort with a little extra warmth and ritual built in.",
      },
      {
        name: "Sunday Paper",
        companyDescription:
          "A cozy medium roast with hazelnut, vanilla, and soft toasted sweetness made for slow mornings.",
        fitReason:
          "It fits because it feels comforting, routine-friendly, and easy to come back to again and again.",
      },
    ],
  },
  wildCard: {
    key: "wildCard",
    name: "Wild Card",
    eyebrow: "Curious, experimental, open-ended",
    shortDescription:
      "You are not here for predictability. You want surprise, novelty, and a story in every bag.",
    longDescription:
      "You see coffee as discovery. The right NovaBrew experience for you is one that stretches your palate, introduces you to something memorable, and keeps you curious about what comes next.",
    resultTitle: "If there is a strange micro-lot hiding on the menu, you want it.",
    image: "/images/wild-card.svg",
    coffees: [
      {
        name: "Off the Map",
        companyDescription:
          "A rotating experimental micro-lot with unusual processing, vivid fruit, and a little unpredictability in every cup.",
        fitReason:
          "This matches your profile because it keeps discovery alive and gives you something worth talking about.",
      },
      {
        name: "Wildflower",
        companyDescription:
          "A bright Ethiopian light roast with floral aromatics, lively acidity, and a juicy fruit-forward finish.",
        fitReason:
          "It works because it feels expressive, surprising, and more interesting than a safe default.",
      },
    ],
  },
  undefinedPalate: {
    key: "undefinedPalate",
    name: "Undefined Palate",
    eyebrow: "Figuring it out, on purpose",
    shortDescription:
      "You are still discovering what you love, and that is a strength, not a flaw.",
    longDescription:
      "You want guidance, not guesswork. NovaBrew should help you build taste confidence over time instead of pretending you already have a fixed identity. The right coffees for you should teach you something about your own preferences.",
    resultTitle: "You do not need a label yet. You need a better guide.",
    image: "/images/undefined-palate.svg",
    coffees: [
      {
        name: "Golden Hour",
        companyDescription:
          "A honey-processed Costa Rican coffee with soft sweetness, gentle structure, and an easy entry point for new preferences.",
        fitReason:
          "This is a good guide coffee because it is approachable without flattening the experience into something generic.",
      },
      {
        name: "The Purist",
        companyDescription:
          "A clean Kenyan single-origin built to show clarity, structure, and distinct flavor without distractions.",
        fitReason:
          "It helps your profile because it gives you a clear baseline for figuring out what you actually enjoy.",
      },
    ],
  },
};

export const questions: Question[] = [
  {
    id: "cafe-order",
    prompt: "You walk into a cafe and order based on...",
    support:
      "Pick the answer that feels most natural to you, not the answer you think sounds smartest.",
    answers: [
      {
        id: "q1-a",
        label: "A",
        text: "something smooth, balanced, and reliably good",
        trait: "smoothOperator",
      },
      {
        id: "q1-b",
        label: "B",
        text: "the most unusual thing on the menu because why not",
        trait: "wildCard",
      },
      {
        id: "q1-c",
        label: "C",
        text: "whatever feels warm, familiar, and easy to settle into",
        trait: "cozyClassic",
      },
      {
        id: "q1-d",
        label: "D",
        text: "whatever feels strongest, richest, and most energizing right now",
        trait: "boldExplorer",
      },
      {
        id: "q1-e",
        label: "E",
        text: "something simple and easy to enjoy because you are still figuring out what you like",
        trait: "undefinedPalate",
      },
    ],
  },
  {
    id: "flavor-profile",
    prompt: "Which flavor profile sounds most satisfying to you today?",
    support:
      "Go with your first reaction. The fastest answer is usually the truest one.",
    answers: [
      {
        id: "q2-a",
        label: "A",
        text: "floral, funky fruit, bright acidity",
        trait: "wildCard",
      },
      {
        id: "q2-b",
        label: "B",
        text: "something clean and simple that helps me understand my taste better",
        trait: "undefinedPalate",
      },
      {
        id: "q2-c",
        label: "C",
        text: "dark chocolate, smoke, spice",
        trait: "boldExplorer",
      },
      {
        id: "q2-d",
        label: "D",
        text: "vanilla, hazelnut, soft sweetness",
        trait: "cozyClassic",
      },
      {
        id: "q2-e",
        label: "E",
        text: "caramel, cocoa, toasted nuts",
        trait: "smoothOperator",
      },
    ],
  },
  {
    id: "coffee-experience",
    prompt: "What kind of coffee experience are you usually looking for?",
    support: "Think feeling first, not technical tasting notes.",
    answers: [
      {
        id: "q3-a",
        label: "A",
        text: "help me discover what kind of coffee person I even am",
        trait: "undefinedPalate",
      },
      {
        id: "q3-b",
        label: "B",
        text: "comfort, calm, and a little ritual",
        trait: "cozyClassic",
      },
      {
        id: "q3-c",
        label: "C",
        text: "something polished and versatile that fits any time of day",
        trait: "smoothOperator",
      },
      {
        id: "q3-d",
        label: "D",
        text: "surprise me with something different from what I had last time",
        trait: "wildCard",
      },
      {
        id: "q3-e",
        label: "E",
        text: "intensity that wakes me up immediately",
        trait: "boldExplorer",
      },
    ],
  },
  {
    id: "disappointment",
    prompt: "Which of these would disappoint you the most?",
    support:
      "This one is useful because our strongest preferences often show up as hard no's.",
    answers: [
      {
        id: "q4-a",
        label: "A",
        text: "a coffee that feels too harsh or aggressive",
        trait: "cozyClassic",
      },
      {
        id: "q4-b",
        label: "B",
        text: "a coffee that feels weak or forgettable",
        trait: "boldExplorer",
      },
      {
        id: "q4-c",
        label: "C",
        text: "a result that assumes too much about me before I know my own taste",
        trait: "undefinedPalate",
      },
      {
        id: "q4-d",
        label: "D",
        text: "a coffee that feels messy or unbalanced",
        trait: "smoothOperator",
      },
      {
        id: "q4-e",
        label: "E",
        text: "a coffee that feels boringly predictable",
        trait: "wildCard",
      },
    ],
  },
  {
    id: "adventure",
    prompt: "How adventurous are you with coffee?",
    support:
      "There is no wrong answer here. This just tells NovaBrew how much range to build into your experience.",
    answers: [
      {
        id: "q5-a",
        label: "A",
        text: "very, I actively want to try things I have never had before",
        trait: "wildCard",
      },
      {
        id: "q5-b",
        label: "B",
        text: "I know I like bold coffees and want more of that energy",
        trait: "boldExplorer",
      },
      {
        id: "q5-c",
        label: "C",
        text: "somewhat, but I want guidance instead of being thrown into the deep end",
        trait: "undefinedPalate",
      },
      {
        id: "q5-d",
        label: "D",
        text: "I like some variety, but I still want it to feel refined and dependable",
        trait: "smoothOperator",
      },
      {
        id: "q5-e",
        label: "E",
        text: "I would rather stay in my comfort zone with something cozy",
        trait: "cozyClassic",
      },
    ],
  },
  {
    id: "promise",
    prompt: "If NovaBrew could promise you one thing, what would matter most?",
    support:
      "This helps define what a great subscription relationship would actually feel like for you.",
    answers: [
      {
        id: "q6-a",
        label: "A",
        text: "every bag introduces me to something unexpected and exciting",
        trait: "wildCard",
      },
      {
        id: "q6-b",
        label: "B",
        text: "every bag feels comforting and fits into my routine",
        trait: "cozyClassic",
      },
      {
        id: "q6-c",
        label: "C",
        text: "every bag helps me learn more about what I actually like",
        trait: "undefinedPalate",
      },
      {
        id: "q6-d",
        label: "D",
        text: "every bag feels powerful and full of character",
        trait: "boldExplorer",
      },
      {
        id: "q6-e",
        label: "E",
        text: "every bag feels carefully matched and easy to enjoy",
        trait: "smoothOperator",
      },
    ],
  },
];

export const buildBlendNarrative = (
  primary: Personality,
  secondary: Personality,
) =>
  `You lead with ${primary.name.toLowerCase()} energy, but your ${secondary.name.toLowerCase()} side adds range. That means your best NovaBrew experience should feel recognizably you while still leaving room for discovery.`;
