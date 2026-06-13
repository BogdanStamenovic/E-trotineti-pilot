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

export interface QuizCondition {
  stepId: string;
  options: string[];
}

export interface HybridModel {
  id: string;
  brandPair: [Brand, Brand];
  model: string;
  manufacturer: string;
  specs: {
    motorPeakW: number;
    battery: string;
    rangeKm?: number;
    weightKg: number;
    topSpeedKmh: number;
    suspension: string;
    tires: string;
    priceRange: string;
  };
  traits: string[];
  rationale: string;
  conditions: QuizCondition[];
  confidence: "high" | "medium" | "low";
  url?: string;
}

// ─── Edge-case thresholds ────────────────────────────────────────────────────
export const POINT_DIFF_THRESHOLD = 3;
export const PERCENT_DIFF_THRESHOLD = 10;

// ─── Quiz steps ──────────────────────────────────────────────────────────────

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

// ─── Brand info ──────────────────────────────────────────────────────────────

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

// ─── Hybrid models ───────────────────────────────────────────────────────────

export const hybridModels: HybridModel[] = [
  // ── Dualtron ↔ Teverun ──────────────────────────────────────────────────
  {
    id: "dt-tv-fighter11plus",
    brandPair: ["dualtron", "teverun"],
    model: "Fighter 11+",
    manufacturer: "Teverun",
    specs: {
      motorPeakW: 4900,
      battery: "60V 35Ah (Samsung)",
      rangeKm: 120,
      weightKg: 44,
      topSpeedKmh: 85,
      suspension: "Hidrauličko (KKE)",
      tires: "11\" tubeless",
      priceRange: "~$4.000",
    },
    traits: ["Tehnologija i inovacije", "Sirova snaga", "Vrhunske performanse", "Pametni BMS"],
    rationale:
      "Kombinuje Dualtronovu ekstremalnu snagu (4.900W peak, 85 km/h) sa Teverunovim naprednim tehničkim karakterom: pametni BMS, TFT ekran, Bluetooth, precizno hidrauličko ovešenje i app kontrola. Veoma jak urbani model koji, uz visok nivo udobnosti i sigurnosti (kočnice sa 4 klipa, TCS), predstavlja idealan spoj performansi i tehnologije.",
    conditions: [
      { stepId: "usage", options: ["mixed", "highperf"] },
      { stepId: "range", options: ["40to70"] },
      { stepId: "performance", options: ["veryimportant"] },
      { stepId: "personality", options: ["tech"] },
      { stepId: "priority", options: ["technology", "design"] },
    ],
    confidence: "high",
    url: "https://teverun.com/product/fighter-eleven-plus/",
  },
  {
    id: "dt-tv-victorlimited",
    brandPair: ["dualtron", "teverun"],
    model: "Victor Limited",
    manufacturer: "Dualtron",
    specs: {
      motorPeakW: 5000,
      battery: "60V 37Ah (Pro verzija)",
      rangeKm: 115,
      weightKg: 39,
      topSpeedKmh: 80,
      suspension: "Gumeno ovešenje (udobnost)",
      tires: "10\" tubeless",
      priceRange: "$3.500–4.000",
    },
    traits: ["Premium urbani skuter", "Snažni motori", "Pametne opcije", "LED signalizacija"],
    rationale:
      "Victor je projektovan kao premium urbani skuter: snažni motori (do 80 km/h) i udobna konstrukcija (dugačka platforma, stabilno ovešenje) tipični su za Dualtron. Istovremeno donosi moderne tehnološke opcije — pametni EY4 ekran, kontrola putem mobilne aplikacije i LED signalizacija — koje podsećaju na Teverunov tehnološki karakter.",
    conditions: [
      { stepId: "usage", options: ["city", "mixed"] },
      { stepId: "range", options: ["40to70"] },
      { stepId: "performance", options: ["balanced", "veryimportant"] },
      { stepId: "personality", options: ["practical", "iconic"] },
      { stepId: "priority", options: ["design", "comfort"] },
    ],
    confidence: "medium",
    url: "https://dualtron-shop.com/product/dualtron-victor-limited/",
  },
  {
    id: "dt-tv-achilleus",
    brandPair: ["dualtron", "teverun"],
    model: "Achilleus",
    manufacturer: "Dualtron",
    specs: {
      motorPeakW: 4648,
      battery: "60V 35Ah (LG), 2100Wh",
      rangeKm: 120,
      weightKg: 41.5,
      topSpeedKmh: 80,
      suspension: "Hidrauličke disk kočnice",
      tires: "11\" pneumatik",
      priceRange: "~$3.500",
    },
    traits: ["Visoke performanse", "Napredne komponente", "Bluetooth ekran", "EABS sigurnost"],
    rationale:
      "Achilleus pruža visoke performanse tipične za Dualtron (snažno ubrzanje, velik domet) uz napredne komponente i udobnost: veliki 11\" pneumatici, hidrauličke kočnice, EABS bezbednosni mod i pametni Bluetooth ekran. Odgovara vozačima koji žele i snagu i stabilnost — moderni dodaci i app interfejs odražavaju Teverunov pristup korisničkoj tehnologiji.",
    conditions: [
      { stepId: "usage", options: ["mixed", "weekend"] },
      { stepId: "range", options: ["40to70"] },
      { stepId: "performance", options: ["maximum"] },
      { stepId: "personality", options: ["iconic"] },
      { stepId: "priority", options: ["performance", "stability"] },
    ],
    confidence: "high",
    url: "https://vepace.com/products/dualtron-achilleus-electric-scooter",
  },
  {
    id: "dt-tv-supreme7260r",
    brandPair: ["dualtron", "teverun"],
    model: "Fighter Supreme 7260R",
    manufacturer: "Teverun",
    specs: {
      motorPeakW: 15000,
      battery: "72V 60Ah (SK)",
      rangeKm: 200,
      weightKg: 64,
      topSpeedKmh: 120,
      suspension: "KKE hidrauličko",
      tires: "13\"",
      priceRange: "5.000$+",
    },
    traits: ["Ekstremna snaga i brzina", "Vrhunska tehnologija", "TFT ekran", "Keyless sistem"],
    rationale:
      "Najjača kombinacija oba brenda: 15 kW motorske snage i 200 km dometa svrstavaju ga u Dualtronov ekstremni teritorijum performansi. Uz to uključuje sve Teverun inovacije: sofisticirani TFT ekran, pametnu aplikaciju, keyless sistem i premium komponente (hidrauličko ovešenje, kočnice sa 4 klipa). Za entuzijaste koji žele i brutalnu snagu i najnoviju tehnologiju.",
    conditions: [
      { stepId: "usage", options: ["mixed", "weekend", "highperf"] },
      { stepId: "range", options: ["over70"] },
      { stepId: "performance", options: ["maximum"] },
      { stepId: "personality", options: ["iconic", "tech"] },
      { stepId: "priority", options: ["performance", "technology"] },
    ],
    confidence: "high",
    url: "https://teverun.com/product/fighter-supreme-7260r/",
  },

  // ── Dualtron ↔ Kaabo ────────────────────────────────────────────────────
  {
    id: "dt-kb-thunder3",
    brandPair: ["dualtron", "kaabo"],
    model: "Thunder 3",
    manufacturer: "Dualtron",
    specs: {
      motorPeakW: 11000,
      battery: "72V 40Ah (Samsung)",
      rangeKm: 130,
      weightKg: 51,
      topSpeedKmh: 100,
      suspension: "Čelično ovešenje + hidraulika",
      tires: "11×4\" tubeless",
      priceRange: "~$4.500",
    },
    traits: ["Izuzetna snaga i brzina", "Robusna konstrukcija", "Terenske gume", "Dualtron intenzitet + Kaabo izdržljivost"],
    rationale:
      "Najsnažniji Thunder do sada. Ogroman motorski kapacitet (11 kW peak) i velika baterija za domet — tipično Dualtron. Istovremeno je teži i robusniji: koristi velike 11×4\" gume i ojačano telo, plus veoma stabilno čelično ovešenje koje zadovoljava Kaabova terenska očekivanja. Pravi tenk za krstarenje — deli Dualtronov intenzitet i Kaabovu izdržljivost.",
    conditions: [
      { stepId: "usage", options: ["offroad", "mixed"] },
      { stepId: "range", options: ["40to70", "over70"] },
      { stepId: "performance", options: ["maximum"] },
      { stepId: "personality", options: ["iconic"] },
      { stepId: "priority", options: ["stability", "performance"] },
    ],
    confidence: "high",
    url: "https://dualtronusa.com/products/dualtron-thunder-3-electric-scooter",
  },
  {
    id: "dt-kb-wolfkinggtpro",
    brandPair: ["dualtron", "kaabo"],
    model: "Wolf King GT Pro",
    manufacturer: "Kaabo",
    specs: {
      motorPeakW: 4000,
      battery: "72V 35Ah (LG), 2520Wh",
      rangeKm: 120,
      weightKg: 52,
      topSpeedKmh: 101,
      suspension: "Hidrauličke disk kočnice",
      tires: "11×3.5\" tubeless",
      priceRange: "~$3.800",
    },
    traits: ["Maksimalna brzina i ubrzanje", "Hidrauličko ovešenje", "Terenska stabilnost", "Luksuzna oprema"],
    rationale:
      "Monster terinski model: 101 km/h maksimalna brzina sa velikom baterijom. Jak sistem kočenja (hidraulike) i čvrst ram za vožnju van asfalta — spoj Kaabove specijalnosti (velik domet, široke gume, jake kočnice) sa Dualtron-style performansama (izuzetna brzina i snaga). TFT ekran, svetla i signalizacija pokazuju da nije samo sirova snaga — vozi kao trkački terenac.",
    conditions: [
      { stepId: "usage", options: ["offroad", "mixed"] },
      { stepId: "range", options: ["40to70"] },
      { stepId: "performance", options: ["maximum"] },
      { stepId: "personality", options: ["iconic", "anywhere"] },
      { stepId: "priority", options: ["adventure", "performance"] },
    ],
    confidence: "high",
    url: "https://electrek.co/2022/04/06/wolf-king-gt-pro-review/",
  },
  {
    id: "dt-kb-kinggtr",
    brandPair: ["dualtron", "kaabo"],
    model: "King GTR",
    manufacturer: "Kaabo",
    specs: {
      motorPeakW: 13440,
      battery: "72V 35Ah",
      rangeKm: 120,
      weightKg: 55,
      topSpeedKmh: 105,
      suspension: "13\" hidrauličko ovešenje",
      tires: "13\"",
      priceRange: "$3.400–3.600",
    },
    traits: ["Motociklistički performansi", "Čvrst ram (320 kg nosivost)", "Premim TFT ekran", "Ekstremni teren"],
    rationale:
      "Čista terinska mašina, ali sa gotovo motociklističkim performansama: 105 km/h sa 13\" gumama i snažnim motorima. Kao i Dualtron, ima ogromnu snagu i premium komponente (high-end TFT ekran, Bluetooth, snažno ubrzanje), ali je napravljen da izdrži najteže terene — ram nosivosti 320 kg i pojačana hidraulika. Prirodni kandidat za vozače koji žele Dualtron-nivo brzine na otvorenom terenu.",
    conditions: [
      { stepId: "usage", options: ["offroad", "weekend"] },
      { stepId: "range", options: ["over70"] },
      { stepId: "performance", options: ["maximum"] },
      { stepId: "personality", options: ["anywhere"] },
      { stepId: "priority", options: ["adventure", "performance"] },
    ],
    confidence: "high",
    url: "https://www.kaabousa.com/products/kaabo-king-gtr",
  },
  {
    id: "dt-kb-stormlimited",
    brandPair: ["dualtron", "kaabo"],
    model: "Storm Limited",
    manufacturer: "Dualtron",
    specs: {
      motorPeakW: 10000,
      battery: "72V 38Ah",
      rangeKm: 120,
      weightKg: 68,
      topSpeedKmh: 80,
      suspension: "Hidrauličko ovešenje",
      tires: "11\" tubeless",
      priceRange: "~$4.000",
    },
    traits: ["Izuzetna stabilnost i snaga", "Velika nosivost (do 150 kg)", "Čeličan ram", "Off-road prilagodljivost"],
    rationale:
      "Stariji ali još uvek relevantan model koji kombinuje snagu i izdržljivost. Izuzetna stabilnost i snaga, uz daleko veći kapacitet opterećenja (do 150 kg). Čelični ram i hidrauličko ovešenje tipični su i za Kaabo modele, što ga čini prikladnim za vožnju van asfalta. Storm jasno naginje ka Dualtronu po performansama, ali je napravljen da traje na grubom terenu kao pravi Kaabo.",
    conditions: [
      { stepId: "usage", options: ["offroad", "mixed"] },
      { stepId: "range", options: ["40to70", "over70"] },
      { stepId: "performance", options: ["veryimportant"] },
      { stepId: "personality", options: ["iconic", "anywhere"] },
      { stepId: "priority", options: ["stability", "performance"] },
    ],
    confidence: "medium",
  },

  // ── Teverun ↔ Kaabo ─────────────────────────────────────────────────────
  {
    id: "tv-kb-tetra4motors",
    brandPair: ["teverun", "kaabo"],
    model: "Tetra 4MOTORS",
    manufacturer: "Teverun",
    specs: {
      motorPeakW: 9900,
      battery: "60V 60Ah",
      rangeKm: 200,
      weightKg: 64,
      topSpeedKmh: 55,
      suspension: "Mehaničko ovešenje",
      tires: "13\" off-road",
      priceRange: "4.000$+",
    },
    traits: ["4WD pogon", "Ekstremni domet (200 km)", "GPS i OTA ažuriranja", "Pametni ekosistem"],
    rationale:
      "Pravi SUV sveta skutera: 4WD pogon i ogromna baterija (200 km dometa) daju mu karakteristike vrhunskih terenskih modela u Kaabo stilu, dok je istovremeno prepun Teverun pametnih funkcija — TFT ekran, GPS, keyless sistem i OTA ažuriranja. Mobilni kamp-vozilo koje može svuda i traje danima, a kontroliše se putem aplikacije. Savršen spoj avanturističkog duha i tehnološkog luksuza.",
    conditions: [
      { stepId: "usage", options: ["offroad", "weekend"] },
      { stepId: "range", options: ["over70"] },
      { stepId: "performance", options: ["balanced"] },
      { stepId: "personality", options: ["anywhere", "tech"] },
      { stepId: "priority", options: ["adventure", "technology"] },
    ],
    confidence: "high",
    url: "https://teverun.com/product/teverun-tetra/",
  },
  {
    id: "tv-kb-mantiskinggt",
    brandPair: ["teverun", "kaabo"],
    model: "Mantis King GT",
    manufacturer: "Kaabo",
    specs: {
      motorPeakW: 2200,
      battery: "60V 24Ah",
      rangeKm: 80,
      weightKg: 34,
      topSpeedKmh: 70,
      suspension: "Podesivo hidrauličko ovešenje",
      tires: "10\" pneumatik",
      priceRange: "$1.900–2.000",
    },
    traits: ["Dobre performanse i upravljivost", "Moderan dizajn i HUD", "Sklopiv", "Hidrauličko ovešenje"],
    rationale:
      "Sportskija Mantis serija: dobar spoj performansi i tehnologije. Veća baterija i brža vožnja od baznih Mantis modela, uz relativno laku i sklopivu konstrukciju pogodnu za gradsku upotrebu (Teverun vrednosti). Hidrauličko ovešenje i snažniji motor od standardnih gradskih skutera pružaju Kaabo avanturizam. Kvalitetno LED osvetljenje i LCD ekran daju mu tehnički karakter sličan Teverunovom.",
    conditions: [
      { stepId: "usage", options: ["mixed"] },
      { stepId: "range", options: ["20to40", "40to70"] },
      { stepId: "performance", options: ["veryimportant"] },
      { stepId: "personality", options: ["practical", "tech"] },
      { stepId: "priority", options: ["stability", "technology"] },
    ],
    confidence: "medium",
    url: "https://www.rydology.com/products/mantis-king-gt-60v-24ah-1100w-dual-motors",
  },
  {
    id: "tv-kb-mantisxplus",
    brandPair: ["teverun", "kaabo"],
    model: "Mantis X Plus",
    manufacturer: "Kaabo",
    specs: {
      motorPeakW: 2200,
      battery: "48V 18.2Ah",
      rangeKm: 60,
      weightKg: 29,
      topSpeedKmh: 50,
      suspension: "Hidrauličko + opruga (15 nivoa podešavanja)",
      tires: "10×3\" pneumatik",
      priceRange: "~$1.300",
    },
    traits: ["Ultralak i sklopiv", "Visok nivo udobnosti", "NFC ekran sa USB", "Pet modova vožnje"],
    rationale:
      "Ultralagan hibrid: manji motori i baterija, ali visok nivo udobnosti (hidrauličko podešavanje na 15 nivoa, dobre gume). Prednost je prenosivost (lako se sklapa) i pametni detalji (NFC ekran sa USB, pet modova vožnje) koji ga čine pogodnim za grad u Teverun stilu. Istovremeno je dobro napravljen i za blago grublje staze, za razliku od čistih commuter skutera.",
    conditions: [
      { stepId: "usage", options: ["city", "mixed"] },
      { stepId: "range", options: ["under20", "20to40"] },
      { stepId: "performance", options: ["balanced"] },
      { stepId: "personality", options: ["practical"] },
      { stepId: "priority", options: ["comfort", "technology"] },
    ],
    confidence: "medium",
    url: "https://alienrides.com/products/kaabo-mantis-x-plus-dual-motor-electric-scooter",
  },
  {
    id: "tv-kb-blademiniultra",
    brandPair: ["teverun", "kaabo"],
    model: "Blade Mini Ultra",
    manufacturer: "Teverun",
    specs: {
      motorPeakW: 1500,
      battery: "48V 20Ah",
      rangeKm: 90,
      weightKg: 35,
      topSpeedKmh: 60,
      suspension: "KKE hidrauličko",
      tires: "10\"",
      priceRange: "~$3.000",
    },
    traits: ["Tipične Teverun pametne funkcije", "TFT, GPS, aplikacija", "Kompaktna sportska mašina", "Prilagodljiv terenu"],
    rationale:
      "Ima tipične Teverun pametne funkcije (TFT ekran, GPS, aplikacija) u Mantis-veličini — prenosiv, ali dobro opremljen. Sa dodatnim hidrauličkim amortizerom i jačom baterijom od konkurentnih gradskih modela (90+ km), deluje kao kompaktna sportska mašina. Tehnološki aspekt (aplikacije, ekosistem) je na prvom mestu, uz lakoću prilagođavanja terenima i lakšim stazama.",
    conditions: [
      { stepId: "usage", options: ["mixed"] },
      { stepId: "range", options: ["20to40"] },
      { stepId: "performance", options: ["balanced"] },
      { stepId: "personality", options: ["tech", "practical"] },
      { stepId: "priority", options: ["technology", "stability"] },
    ],
    confidence: "low",
  },
];

// ─── Scoring ─────────────────────────────────────────────────────────────────

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

// ─── Edge-case detection ──────────────────────────────────────────────────────

export function detectEdgeCase(
  scores: ScoreMap,
  percentages: ScoreMap,
  primary: Brand,
  secondary: Brand
): boolean {
  const pointDiff = scores[primary] - scores[secondary];
  const percentDiff = percentages[primary] - percentages[secondary];
  return pointDiff <= POINT_DIFF_THRESHOLD && percentDiff <= PERCENT_DIFF_THRESHOLD;
}

// ─── Hybrid recommendation ────────────────────────────────────────────────────

export function getHybridRecommendation(
  answers: Record<string, string>,
  primary: Brand,
  secondary: Brand
): HybridModel | null {
  const candidates = hybridModels.filter(
    (m) => m.brandPair.includes(primary) && m.brandPair.includes(secondary)
  );
  if (candidates.length === 0) return null;

  const confWeight = { high: 3, medium: 2, low: 1 };
  const scored = candidates.map((model) => {
    const matches = model.conditions.filter((cond) =>
      cond.options.includes(answers[cond.stepId])
    ).length;
    return { model, score: matches * 10 + confWeight[model.confidence] };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].model;
}

// ─── Personalized text ────────────────────────────────────────────────────────

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
