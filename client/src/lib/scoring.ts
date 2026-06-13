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
    question: "Kako planirate da vozite?",
    insightTitle: "Kontekst vožnje",
    insight:
      "Vaša primarna namena određuje koje karakteristike su najvažnije. Gradski vozači imaju koristi od pametne povezivosti i efikasnog upravljanja energijom. Entuzijasti performansi zahtevaju sirovu snagu i domet. Avanturisti iznad svega cene izdržljivost i sposobnost vožnje van asfalta.",
    options: [
      { id: "city", label: "Svakodnevna gradska vožnja", scores: { teverun: 3, kaabo: 1 } },
      { id: "mixed", label: "Mešovito — grad i duže rute", scores: { teverun: 2, dualtron: 2 } },
      { id: "weekend", label: "Vikend avanture", scores: { kaabo: 3, dualtron: 1 } },
      { id: "highperf", label: "Visokoperformansna vožnja", scores: { dualtron: 3, teverun: 1 } },
      { id: "offroad", label: "Vožnja van asfalta", scores: { kaabo: 4 } },
    ],
  },
  {
    id: "range",
    question: "Koliko obično prelazite po vožnji?",
    insightTitle: "Domet i baterija",
    insight:
      "Domet zavisi od kapaciteta baterije, efikasnosti motora i težine vozača. Visokoperformansni skuteri postižu veći domet zahvaljujući većim baterijama, dok sistemi pametnog upravljanja energijom značajno produžuju praktičan domet u gradskim uslovima.",
    options: [
      { id: "under20", label: "Ispod 20 km", scores: { teverun: 1, kaabo: 1, dualtron: 1 } },
      { id: "20to40", label: "20–40 km", scores: { teverun: 3, kaabo: 1 } },
      { id: "40to70", label: "40–70 km", scores: { dualtron: 3, teverun: 1 } },
      { id: "over70", label: "70+ km", scores: { dualtron: 4 } },
    ],
  },
  {
    id: "performance",
    question: "Koliko vam je važna snaga motora?",
    insightTitle: "Snaga i performanse",
    insight:
      "Visokoperformansni skuteri obično imaju dva motora, što pruža odlično ubrzanje i veće brzine. Idealni su za iskusne vozače koji prioritizuju dinamičke performanse. Uravnotežene opcije nude odličan svakodnevni učinak bez ekstrema trkačke platforme.",
    options: [
      { id: "notimportant", label: "Nije važno", sublabel: "Udobnost pre brzine", scores: { teverun: 1, kaabo: 1 } },
      { id: "balanced", label: "Uravnoteženo", sublabel: "Sve i svašta", scores: { teverun: 2, kaabo: 2 } },
      { id: "veryimportant", label: "Veoma važno", sublabel: "Dobre performanse su bitne", scores: { dualtron: 3, teverun: 1 } },
      { id: "maximum", label: "Maksimalne performanse", sublabel: "Bez kompromisa", scores: { dualtron: 4 } },
    ],
  },
  {
    id: "personality",
    question: "Koja rečenica vas najbolje opisuje?",
    insightTitle: "Profil vozača",
    insight:
      "Najbolji skuter je produžetak vašeg karaktera. Identitet brenda je jednako važan kao tehnički podaci — kada vaša ličnost odgovara filozofiji brenda, iskustvo vožnje postaje zaista lično.",
    options: [
      {
        id: "practical",
        label: '"Hoću nešto praktično."',
        sublabel: "Efikasnost i pouzdanost na prvom mestu",
        scores: { teverun: 3, kaabo: 1 },
      },
      {
        id: "tech",
        label: '"Volim tehnologiju."',
        sublabel: "Inovacije i pametne funkcije",
        scores: { teverun: 4 },
      },
      {
        id: "iconic",
        label: '"Hoću nešto moćno i ikonično."',
        sublabel: "Status i performansni identitet",
        scores: { dualtron: 4 },
      },
      {
        id: "anywhere",
        label: '"Hoću da idem svuda."',
        sublabel: "Sloboda i istraživanje",
        scores: { kaabo: 4 },
      },
    ],
  },
  {
    id: "priority",
    question: "Šta vam je najvažnije?",
    insightTitle: "Osnovne vrednosti",
    insight:
      "Vaš primarni prioritet otkriva iskustvo koje tražite. Svaki premium brend je projektovan sa specifičnim vrednostima — usklađivanje vaših prioriteta sa filozofijom brenda stvara savršen spoj.",
    options: [
      { id: "comfort", label: "Udobnost", scores: { teverun: 3, kaabo: 1 } },
      { id: "technology", label: "Tehnologija", scores: { teverun: 4 } },
      { id: "performance", label: "Performanse", scores: { dualtron: 4 } },
      { id: "adventure", label: "Avantura", scores: { kaabo: 4 } },
      { id: "stability", label: "Stabilnost", scores: { kaabo: 3, dualtron: 1 } },
      { id: "design", label: "Dizajn", scores: { dualtron: 3, teverun: 2 } },
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
    tagline: "Premium performanse",
    message: "Ovo nije samo skuter. Ovo je način života.",
    description:
      "Ikonični status, entuzijastička kultura, sirova snaga i odana globalna zajednica. Dualtron predstavlja vrhunac performansi električnih skutera za vozače koji ne prihvataju ništa osim najboljeg.",
    color: "#B53A32",
    bgLight: "#fdf0ef",
    emoji: "⚡",
  },
  teverun: {
    name: "Teverun",
    tagline: "Pametne performanse",
    message: "Sledeća generacija performansnih skutera.",
    description:
      "Futuristička dizajnerska filozofija, inovativna pametna tehnologija i čistija estetika. Teverun je napravljen za naprednog vozača koji ceni inteligenciju jednako kao i snagu.",
    color: "#2563EB",
    bgLight: "#eff6ff",
    emoji: "🔮",
  },
  kaabo: {
    name: "Kaabo",
    tagline: "Avantura i izdržljivost",
    message: "Kada se asfalt završi, vožnja počinje.",
    description:
      "Čvrst, stabilan i napravljen za svaki teren. Kaabo uliva sigurnost bilo da se krećete gradskim ulicama ili daleko izvan utabanih staza.",
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
    city: "svakodnevnu gradsku vožnju",
    mixed: "mešovitu gradsku i daljinsku vožnju",
    weekend: "vikend avanture",
    highperf: "visokoperformansnu vožnju",
    offroad: "vožnju van asfalta",
  };
  const rangeMap: Record<string, string> = {
    under20: "kratke gradske ture",
    "20to40": "vožnje srednje dužine",
    "40to70": "duže ture",
    over70: "duge performansne rute",
  };

  const usage = usageMap[answers.usage] || "raznovrsnu vožnju";
  const range = rangeMap[answers.range] || "različite distance";
  const p = brandInfo[primary];
  const s = brandInfo[secondary];

  return `Na osnovu vaše preferencije za ${usage} i ${range}, ${p.name} se izdvaja kao najjači izbor za vaš profil. Vaši odgovori ukazuju na dosleden sklad sa ${p.tagline.toLowerCase()} — što definiše iskustvo koje ${p.name} pruža. ${s.name} bi vam takođe odlično odgovarao kao ubedljiv drugi izbor koji deli nekoliko vaših prioriteta.`;
}

export function generateExpertAssessment(
  answers: Record<string, string>,
  primary: Brand
): string {
  const perf = answers.performance;
  const personality = answers.personality;

  if (primary === "dualtron") {
    return `Uzimajući u obzir vaš profil vožnje i očekivanja, preporučujemo fokus na premium performansne platforme koje ne prave kompromise po pitanju snage. Vaš profil ukazuje na snažnu preferenciju za ${perf === "maximum" ? "maksimalnim performansama i ikoničnim dizajnom" : "vrhunskim performansama uz jak identitet vozača"}. Dualtronova inženjerska filozofija — izgrađena oko sirove sposobnosti i odane globalne zajednice — precizno se poklapa sa tipom vozača kojeg vi predstavljate.`;
  } else if (primary === "teverun") {
    return `Uzimajući u obzir vaše navike vožnje i očekivanja, preporučujemo fokus na pametno-performansne platforme koje spajaju tehnologiju i sposobnost. Vaš profil ukazuje na jasnu preferenciju za ${personality === "tech" ? "naprednom tehnološkom integracijom i funkcijama nove generacije" : "inteligentnim dizajnom, praktičnim performansama i iskustvom orijentisanim prema budućnosti"}. Teverunova posvećenost inovacijama i preciznom inženjeringu stvara idealan spoj za vaš stil vožnje.`;
  } else {
    return `Uzimajući u obzir vaš profil vožnje i očekivanja, preporučujemo fokus na avanturističke platforme projektovane za izdržljivost i svestrane terenske mogućnosti. Vaš profil ukazuje na jasnu preferenciju za ${personality === "anywhere" ? "neograničenim istraživanjem i sigurnošću van asfalta" : "čvrstom stabilnošću i pouzdanim performansama u svakom uslovu"}. Kaabova dizajnerska filozofija — graditi za vozača koji odbija da ga ograniči teren — precizno se poklapa sa vašim aspiracijama.`;
  }
}
