# Quiz Engine Documentation — e-trotineti.rs

> **File:** `client/src/lib/scoring.ts`  
> **Used by:** `client/src/pages/Quiz.tsx`

---

## Overview

The quiz engine collects answers to **5 questions**, scores them across **3 brands**, and outputs a ranked recommendation with a confidence percentage and two layers of personalized explanation text.

---

## Brands

The engine evaluates every answer against three brands:

| Brand | Identity | Core values |
|---|---|---|
| **Dualtron** | Premium Performance | Raw power, top speed, iconic status, enthusiast culture |
| **Teverun** | Smart Performance | Technology, innovation, futuristic design, smart features |
| **Kaabo** | Adventure & Durability | Off-road capability, rugged stability, exploration, versatility |

Each brand has a display color, tagline, short description, and emoji used in the results UI.

---

## The 5 Questions (Steps)

### Step 1 — Usage (`id: "usage"`)
**"How do you plan to ride?"**

| Option | Label | Scores awarded |
|---|---|---|
| `city` | Daily city commuting | Teverun +3, Kaabo +1 |
| `mixed` | Mixed city and longer rides | Teverun +2, Dualtron +2 |
| `weekend` | Weekend adventure | Kaabo +3, Dualtron +1 |
| `highperf` | High-performance riding | Dualtron +3, Teverun +1 |
| `offroad` | Off-road exploration | Kaabo +4 |

**What it reveals:** Primary riding context — whether the user needs smart urban efficiency, long-range touring, or rugged adventure capability.

---

### Step 2 — Range (`id: "range"`)
**"How far do you usually travel?"**

| Option | Label | Scores awarded |
|---|---|---|
| `under20` | Under 20 km | Teverun +1, Kaabo +1, Dualtron +1 |
| `20to40` | 20–40 km | Teverun +3, Kaabo +1 |
| `40to70` | 40–70 km | Dualtron +3, Teverun +1 |
| `over70` | 70+ km | Dualtron +4 |

**What it reveals:** Battery and range requirements. Very long distances (70+ km) strongly indicate Dualtron's larger battery packs. Short urban hops align with Teverun's efficient city-optimised models.

---

### Step 3 — Performance (`id: "performance"`)
**"How important is power?"**

| Option | Label | Sublabel | Scores awarded |
|---|---|---|---|
| `notimportant` | Not important | Comfort over speed | Teverun +1, Kaabo +1 |
| `balanced` | Balanced | Best of both worlds | Teverun +2, Kaabo +2 |
| `veryimportant` | Very important | Strong performance matters | Dualtron +3, Teverun +1 |
| `maximum` | Maximum performance | Push every limit | Dualtron +4 |

**What it reveals:** Appetite for raw power and top-end specs. `maximum` is a hard Dualtron signal — no other brand receives points. `balanced` splits evenly between Teverun and Kaabo, representing riders who don't want either extreme.

---

### Step 4 — Personality (`id: "personality"`)
**"Which statement sounds most like you?"**

| Option | Label | Sublabel | Scores awarded |
|---|---|---|---|
| `practical` | "I want something practical." | Efficiency and reliability first | Teverun +3, Kaabo +1 |
| `tech` | "I love technology." | Innovation and smart features | Teverun +4 |
| `iconic` | "I want something powerful and iconic." | Status and performance identity | Dualtron +4 |
| `anywhere` | "I want to go anywhere." | Freedom and exploration | Kaabo +4 |

**What it reveals:** Rider identity and brand-value alignment. Each of the three non-`practical` options is a hard 4-point signal to a single brand. This is the strongest identity question in the quiz.

---

### Step 5 — Priority (`id: "priority"`)
**"What matters most?"**

| Option | Label | Scores awarded |
|---|---|---|
| `comfort` | Comfort | Teverun +3, Kaabo +1 |
| `technology` | Technology | Teverun +4 |
| `performance` | Performance | Dualtron +4 |
| `adventure` | Adventure | Kaabo +4 |
| `stability` | Stability | Kaabo +3, Dualtron +1 |
| `design` | Design | Dualtron +3, Teverun +2 |

**What it reveals:** A final values confirmation that reinforces (or sometimes contrasts with) earlier signals. `design` is the only option that rewards two brands meaningfully, reflecting that Dualtron and Teverun both have strong aesthetic identities.

---

## Scoring Algorithm

### `calculateResults(answers)`

**Input:** A `Record<string, string>` — one answer ID per step ID.

**Process:**

```
1. Start with scores { dualtron: 0, teverun: 0, kaabo: 0 }

2. For each of the 5 steps:
   a. Look up the chosen option by answer ID
   b. Add all partial scores from that option to the running totals
      (options can award points to one or more brands simultaneously)

3. Calculate total points across all brands

4. Convert each brand score to a percentage:
   percentage = round( (brandScore / total) × 100 )

5. Sort brands by percentage descending:
   - sorted[0] → primary recommendation
   - sorted[1] → secondary recommendation

6. confidence = primary brand's percentage
```

**Output:**
```ts
{
  scores:      { dualtron: number, teverun: number, kaabo: number },  // raw points
  percentages: { dualtron: number, teverun: number, kaabo: number },  // 0–100
  primary:     Brand,       // top-scoring brand
  secondary:   Brand,       // second-place brand
  confidence:  number       // primary brand's percentage (e.g. 55)
}
```

### Maximum possible scores

The highest points any single brand can accumulate (if every answer is a maximum signal to that brand):

| Brand | Maximum score | Achieved by picking |
|---|---|---|
| Dualtron | 4+4+4+4+4 = **20** | `highperf`, `over70`, `maximum`, `iconic`, `performance` |
| Teverun | 3+3+2+4+4 = **16** | `city`, `20to40`, `balanced`, `tech`, `technology` |
| Kaabo | 4+1+2+4+4 = **15** | `offroad`, `under20`, `balanced`, `anywhere`, `adventure` |

> Dualtron has the highest possible concentration score because it receives 4 points on 4 of the 5 questions, making it the easiest brand to "max out."

---

## Text Generation

### `generatePersonalizedText(answers, primary, secondary)`

Produces a 2–3 sentence summary tailored to the user's stated usage and range preferences. Uses two lookup maps:

- **usageMap** — converts the `usage` answer ID into a human-readable phrase (e.g. `"city"` → `"daily city commuting"`)
- **rangeMap** — converts the `range` answer ID into a phrase (e.g. `"over70"` → `"long-distance performance runs"`)

Template:  
> *"Based on your preference for [usage] and [range], [Primary] emerges as the strongest match… [Secondary] would also serve you well…"*

---

### `generateExpertAssessment(answers, primary)`

Produces a longer expert-voice paragraph that references the user's `performance` and `personality` answers to add nuance. It has **one branch per brand**:

| Primary brand | Key signal checked | Tone |
|---|---|---|
| Dualtron | `performance === "maximum"` | Enthusiast/iconic identity language |
| Teverun | `personality === "tech"` | Innovation and forward-thinking language |
| Kaabo | `personality === "anywhere"` | Adventure and terrain-freedom language |

---

## Score Concentration Effects

Because many options award points to **only one brand**, a few strongly-aligned answers can dominate the result regardless of other answers. Key "lock-in" scenarios:

| Combination | Likely outcome |
|---|---|
| `offroad` + `anywhere` + `adventure` | Kaabo at ~60–70% confidence |
| `over70` + `maximum` + `iconic` + `performance` | Dualtron at ~70–80% confidence |
| `city` + `20to40` + `tech` + `technology` | Teverun at ~65–75% confidence |

Mixed signals (e.g. `balanced` performance + `20to40` range + `practical` personality) produce closer three-way splits with lower confidence scores (30–45%).

---

## Adding or Modifying Questions

To add a new quiz step:

1. Add a new `QuizStep` object to the `quizSteps` array in `scoring.ts`
2. Give it a unique `id`, a `question`, `insightTitle`, `insight` text, and an `options` array
3. Each option's `scores` is `Partial<ScoreMap>` — you only need to list brands that receive points; missing brands get 0
4. The `calculateResults` function automatically handles any number of steps

To add a new brand:

1. Add it to the `Brand` union type
2. Add an entry to `brandInfo`
3. Update every existing option's `scores` object if relevant
4. Update `generatePersonalizedText` and `generateExpertAssessment` to handle the new brand

---

## Type Reference

```ts
type Brand = "dualtron" | "teverun" | "kaabo";

type ScoreMap = Record<Brand, number>;

interface QuizOption {
  id: string;           // e.g. "city", "maximum"
  label: string;        // main button text
  sublabel?: string;    // optional descriptive line
  scores: Partial<ScoreMap>;  // points awarded per brand
}

interface QuizStep {
  id: string;           // used as the key in the answers map
  question: string;     // displayed as the step heading
  insightTitle: string; // shown in the educational card
  insight: string;      // explanatory text shown after selecting an option
  options: QuizOption[];
}
```
