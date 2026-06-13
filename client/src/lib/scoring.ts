export type Brand = "dualtron" | "teverun" | "kaabo";
export type ScoreMap = Record<Brand, number>;

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  scores: Partial<ScoreMap>;
}

export interface QuizStep {
  id: string;
  question: string;
  insightTitle: string;
  insight: string;
  options: QuizOption[];
}

export const quizSteps: QuizStep[] = [
  {
    id: "usage",
    question: "How do you plan to ride?",
    insightTitle: "Riding Context",
    insight:
      "Your primary use case determines which features matter most. City riders benefit from smart connectivity and efficient power management. Performance enthusiasts demand raw output and range. Adventure riders require durability and off-road capability above all else.",
    options: [
      { id: "city", label: "Daily city commuting", scores: { teverun: 3, kaabo: 1 } },
      { id: "mixed", label: "Mixed city and longer rides", scores: { teverun: 2, dualtron: 2 } },
      { id: "weekend", label: "Weekend adventure", scores: { kaabo: 3, dualtron: 1 } },
      { id: "highperf", label: "High-performance riding", scores: { dualtron: 3, teverun: 1 } },
      { id: "offroad", label: "Off-road exploration", scores: { kaabo: 4 } },
    ],
  },
  {
    id: "range",
    question: "How far do you usually travel?",
    insightTitle: "Range & Battery",
    insight:
      "Range is determined by battery capacity, motor efficiency, and rider weight. High-performance scooters achieve longer ranges through larger battery packs, while smart power management systems significantly extend practical range in urban environments.",
    options: [
      { id: "under20", label: "Under 20 km", scores: { teverun: 1, kaabo: 1, dualtron: 1 } },
      { id: "20to40", label: "20–40 km", scores: { teverun: 3, kaabo: 1 } },
      { id: "40to70", label: "40–70 km", scores: { dualtron: 3, teverun: 1 } },
      { id: "over70", label: "70+ km", scores: { dualtron: 4 } },
    ],
  },
  {
    id: "performance",
    question: "How important is power?",
    insightTitle: "Power & Performance",
    insight:
      "Performance scooters typically feature dual motors, delivering superior acceleration and higher top speeds. They are ideal for experienced riders who prioritize dynamic performance. Balanced options offer excellent real-world performance without the extremes of a racing-focused platform.",
    options: [
      { id: "notimportant", label: "Not important", sublabel: "Comfort over speed", scores: { teverun: 1, kaabo: 1 } },
      { id: "balanced", label: "Balanced", sublabel: "Best of both worlds", scores: { teverun: 2, kaabo: 2 } },
      { id: "veryimportant", label: "Very important", sublabel: "Strong performance matters", scores: { dualtron: 3, teverun: 1 } },
      { id: "maximum", label: "Maximum performance", sublabel: "Push every limit", scores: { dualtron: 4 } },
    ],
  },
  {
    id: "personality",
    question: "Which statement sounds most like you?",
    insightTitle: "Rider Profile",
    insight:
      "The best scooter is an extension of who you are. Brand identity matters as much as technical specifications — when your personality aligns with a brand's philosophy, the riding experience becomes truly personal.",
    options: [
      {
        id: "practical",
        label: '"I want something practical."',
        sublabel: "Efficiency and reliability first",
        scores: { teverun: 3, kaabo: 1 },
      },
      {
        id: "tech",
        label: '"I love technology."',
        sublabel: "Innovation and smart features",
        scores: { teverun: 4 },
      },
      {
        id: "iconic",
        label: '"I want something powerful and iconic."',
        sublabel: "Status and performance identity",
        scores: { dualtron: 4 },
      },
      {
        id: "anywhere",
        label: '"I want to go anywhere."',
        sublabel: "Freedom and exploration",
        scores: { kaabo: 4 },
      },
    ],
  },
  {
    id: "priority",
    question: "What matters most?",
    insightTitle: "Core Values",
    insight:
      "Your core priority reveals the experience you are seeking. Each premium brand has been engineered with specific values in mind — matching your priorities to a brand's philosophy creates a truly ideal pairing.",
    options: [
      { id: "comfort", label: "Comfort", scores: { teverun: 3, kaabo: 1 } },
      { id: "technology", label: "Technology", scores: { teverun: 4 } },
      { id: "performance", label: "Performance", scores: { dualtron: 4 } },
      { id: "adventure", label: "Adventure", scores: { kaabo: 4 } },
      { id: "stability", label: "Stability", scores: { kaabo: 3, dualtron: 1 } },
      { id: "design", label: "Design", scores: { dualtron: 3, teverun: 2 } },
    ],
  },
];

export const brandInfo: Record<
  Brand,
  {
    name: string;
    tagline: string;
    message: string;
    description: string;
    color: string;
    bgLight: string;
    emoji: string;
  }
> = {
  dualtron: {
    name: "Dualtron",
    tagline: "Premium Performance",
    message: "This is more than a scooter. It's a lifestyle.",
    description:
      "Iconic status, enthusiast culture, raw power and a devoted global community. Dualtron represents the pinnacle of electric scooter performance for riders who demand nothing but the absolute best.",
    color: "#B53A32",
    bgLight: "#fdf0ef",
    emoji: "⚡",
  },
  teverun: {
    name: "Teverun",
    tagline: "Smart Performance",
    message: "The next generation of performance scooters.",
    description:
      "Futuristic design philosophy, innovative smart technology, and a cleaner aesthetic. Teverun is engineered for the forward-thinking rider who values intelligence as much as power.",
    color: "#2563EB",
    bgLight: "#eff6ff",
    emoji: "🔮",
  },
  kaabo: {
    name: "Kaabo",
    tagline: "Adventure & Durability",
    message: "When the road ends, the ride begins.",
    description:
      "Rugged, stable, and built for any terrain. Kaabo inspires confidence whether navigating city streets or venturing far beyond the beaten path.",
    color: "#16A34A",
    bgLight: "#f0fdf4",
    emoji: "🏔️",
  },
};

export function calculateResults(answers: Record<string, string>): {
  scores: ScoreMap;
  percentages: ScoreMap;
  primary: Brand;
  secondary: Brand;
  confidence: number;
} {
  const scores: ScoreMap = { dualtron: 0, teverun: 0, kaabo: 0 };

  quizSteps.forEach((step) => {
    const answerId = answers[step.id];
    if (!answerId) return;
    const option = step.options.find((o) => o.id === answerId);
    if (!option) return;
    (Object.entries(option.scores) as [Brand, number][]).forEach(([brand, score]) => {
      scores[brand] += score;
    });
  });

  const total = scores.dualtron + scores.teverun + scores.kaabo || 1;
  const raw = {
    dualtron: Math.round((scores.dualtron / total) * 100),
    teverun: Math.round((scores.teverun / total) * 100),
    kaabo: Math.round((scores.kaabo / total) * 100),
  };

  const sorted = (Object.entries(raw) as [Brand, number][]).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];

  const percentages: ScoreMap = raw;
  const confidence = percentages[primary];

  return { scores, percentages, primary, secondary, confidence };
}

export function generatePersonalizedText(
  answers: Record<string, string>,
  primary: Brand,
  secondary: Brand
): string {
  const usageMap: Record<string, string> = {
    city: "daily city commuting",
    mixed: "mixed urban and long-distance riding",
    weekend: "weekend adventure riding",
    highperf: "high-performance riding",
    offroad: "off-road exploration",
  };
  const rangeMap: Record<string, string> = {
    under20: "short urban trips",
    "20to40": "medium-range rides",
    "40to70": "extended touring distances",
    over70: "long-distance performance runs",
  };

  const usage = usageMap[answers.usage] || "versatile riding";
  const range = rangeMap[answers.range] || "varied distances";
  const p = brandInfo[primary];
  const s = brandInfo[secondary];

  return `Based on your preference for ${usage} and ${range}, ${p.name} emerges as the strongest match for your profile. Your answers reflect a consistent alignment with ${p.tagline.toLowerCase()} — the defining characteristic of the ${p.name} experience. ${s.name} would also serve you well as a compelling secondary choice that shares several of your priorities.`;
}

export function generateExpertAssessment(
  answers: Record<string, string>,
  primary: Brand
): string {
  const perf = answers.performance;
  const personality = answers.personality;

  if (primary === "dualtron") {
    return `Considering your riding profile and expectations, we would recommend focusing on premium performance platforms that offer uncompromising output. Your profile indicates a strong preference for ${perf === "maximum" ? "maximum performance output and iconic design status" : "high-end performance paired with a strong riding identity"}. Dualtron's engineering philosophy — built around raw capability and a devoted global community — aligns precisely with the rider archetype you represent.`;
  } else if (primary === "teverun") {
    return `Considering your riding habits and expectations, we would recommend focusing on smart-performance platforms that blend technology with capability. Your profile indicates a clear preference for ${personality === "tech" ? "advanced technological integration and next-generation features" : "intelligent design, practical performance, and a future-oriented riding experience"}. Teverun's commitment to innovation and refined engineering creates an ideal match for your riding style.`;
  } else {
    return `Considering your riding profile and expectations, we would recommend focusing on adventure-oriented platforms engineered for durability and versatile terrain capability. Your profile indicates a clear preference for ${personality === "anywhere" ? "unrestricted exploration and off-road confidence" : "rugged stability and reliable performance across any condition"}. Kaabo's design philosophy — building for the rider who refuses to be limited by terrain — precisely aligns with your aspirations.`;
  }
}
