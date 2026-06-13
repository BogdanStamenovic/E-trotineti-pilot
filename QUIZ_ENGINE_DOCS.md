# Dokumentacija kviz engine-a — e-trotineti.rs

> **Fajl:** `client/src/lib/scoring.ts`  
> **Koristi se u:** `client/src/pages/Quiz.tsx`

---

## Pregled

Kviz engine prikuplja odgovore na **5 pitanja**, boduje ih po **3 brenda** i generiše rangiranu preporuku sa procentom sigurnosti i dva nivoa personalizovanog objašnjenja.

---

## Brendovi

Engine evaluira svaki odgovor u odnosu na tri brenda:

| Brend | Identitet | Osnovne vrednosti |
|---|---|---|
| **Dualtron** | Premium performanse | Sirova snaga, top brzina, ikonični status, entuzijastička kultura |
| **Teverun** | Pametne performanse | Tehnologija, inovacije, futuristički dizajn, pametne funkcije |
| **Kaabo** | Avantura i izdržljivost | Sposobnost van asfalta, čvrsta stabilnost, istraživanje, svestranost |

Svaki brend ima boju, tagline, kratak opis i emoji koji se koriste na ekranu rezultata.

---

## 5 pitanja (koraci)

### Korak 1 — Upotreba (`id: "usage"`)
**"Kako planirate da vozite?"**

| Opcija | Oznaka | Dati bodovi |
|---|---|---|
| `city` | Svakodnevna gradska vožnja | Teverun +3, Kaabo +1 |
| `mixed` | Mešovito — grad i duže rute | Teverun +2, Dualtron +2 |
| `weekend` | Vikend avanture | Kaabo +3, Dualtron +1 |
| `highperf` | Visokoperformansna vožnja | Dualtron +3, Teverun +1 |
| `offroad` | Vožnja van asfalta | Kaabo +4 |

**Šta otkriva:** Primarni kontekst vožnje — da li korisnik treba pametnu gradsku efikasnost, dugometražne ture ili terenske sposobnosti.

---

### Korak 2 — Domet (`id: "range"`)
**"Koliko obično prelazite po vožnji?"**

| Opcija | Oznaka | Dati bodovi |
|---|---|---|
| `under20` | Ispod 20 km | Teverun +1, Kaabo +1, Dualtron +1 |
| `20to40` | 20–40 km | Teverun +3, Kaabo +1 |
| `40to70` | 40–70 km | Dualtron +3, Teverun +1 |
| `over70` | 70+ km | Dualtron +4 |

**Šta otkriva:** Potrebe za baterijom i dometom. Veoma duge distance (70+ km) snažno ukazuju na Dualtronove veće baterije. Kratke gradske ture odgovaraju Teverunovim efikasnim gradskim modelima.

---

### Korak 3 — Performanse (`id: "performance"`)
**"Koliko vam je važna snaga motora?"**

| Opcija | Oznaka | Podnaslov | Dati bodovi |
|---|---|---|---|
| `notimportant` | Nije važno | Udobnost pre brzine | Teverun +1, Kaabo +1 |
| `balanced` | Uravnoteženo | Sve i svašta | Teverun +2, Kaabo +2 |
| `veryimportant` | Veoma važno | Dobre performanse su bitne | Dualtron +3, Teverun +1 |
| `maximum` | Maksimalne performanse | Bez kompromisa | Dualtron +4 |

**Šta otkriva:** Apetit za sirovom snagom i vrhunskim specifikacijama. `maximum` je čisti Dualtron signal — nijedan drugi brend ne dobija bodove. `balanced` ravnomerno deli bodove između Teveruna i Kaaba, što predstavlja vozače koji ne žele ni jedan ekstrem.

---

### Korak 4 — Ličnost (`id: "personality"`)
**"Koja rečenica vas najbolje opisuje?"**

| Opcija | Oznaka | Podnaslov | Dati bodovi |
|---|---|---|---|
| `practical` | "Hoću nešto praktično." | Efikasnost i pouzdanost na prvom mestu | Teverun +3, Kaabo +1 |
| `tech` | "Volim tehnologiju." | Inovacije i pametne funkcije | Teverun +4 |
| `iconic` | "Hoću nešto moćno i ikonično." | Status i performansni identitet | Dualtron +4 |
| `anywhere` | "Hoću da idem svuda." | Sloboda i istraživanje | Kaabo +4 |

**Šta otkriva:** Identitet vozača i usklađenost sa vrednostima brenda. Svaka od tri ne-`practical` opcije je čisti 4-poeni signal ka jednom brendu. Ovo je najjače identitetsko pitanje u kviziću.

---

### Korak 5 — Prioritet (`id: "priority"`)
**"Šta vam je najvažnije?"**

| Opcija | Oznaka | Dati bodovi |
|---|---|---|
| `comfort` | Udobnost | Teverun +3, Kaabo +1 |
| `technology` | Tehnologija | Teverun +4 |
| `performance` | Performanse | Dualtron +4 |
| `adventure` | Avantura | Kaabo +4 |
| `stability` | Stabilnost | Kaabo +3, Dualtron +1 |
| `design` | Dizajn | Dualtron +3, Teverun +2 |

**Šta otkriva:** Finalna potvrda vrednosti koja pojačava (ili ponekad kontrastira) ranije signale. `design` je jedina opcija koja značajno nagrađuje dva brenda, što odražava da i Dualtron i Teverun imaju snažan estetski identitet.

---

## Algoritam bodovanja

### `calculateResults(answers)`

**Ulaz:** `Record<string, string>` — jedan ID odgovora po ID-u koraka.

**Proces:**

```
1. Početi sa bodovima { dualtron: 0, teverun: 0, kaabo: 0 }

2. Za svaki od 5 koraka:
   a. Pronaći izabranu opciju po ID-u odgovora
   b. Dodati sve parcijalne bodove te opcije na tekuće zbire
      (opcije mogu dodavati bodove jednom ili više brendova istovremeno)

3. Izračunati ukupne bodove svih brendova

4. Konvertovati bodove svakog brenda u procenat:
   procenat = zaokružiti( (bodoviBrenda / ukupno) × 100 )

5. Sortirati brendove po procentu opadajuće:
   - sorted[0] → primarna preporuka
   - sorted[1] → sekundarna preporuka

6. sigurnost = procenat primarnog brenda
```

**Izlaz:**
```ts
{
  scores:      { dualtron: number, teverun: number, kaabo: number },  // sirovi bodovi
  percentages: { dualtron: number, teverun: number, kaabo: number },  // 0–100
  primary:     Brand,       // brend sa najviše bodova
  secondary:   Brand,       // brend na drugom mestu
  confidence:  number       // procenat primarnog brenda (npr. 55)
}
```

### Maksimalni mogući bodovi

Najviše bodova koje jedan brend može skupiti (ako su svi odgovori maksimalni signal za taj brend):

| Brend | Maksimalni zbir | Postiže se izborom |
|---|---|---|
| Dualtron | 4+4+4+4+4 = **20** | `highperf`, `over70`, `maximum`, `iconic`, `performance` |
| Teverun | 3+3+2+4+4 = **16** | `city`, `20to40`, `balanced`, `tech`, `technology` |
| Kaabo | 4+1+2+4+4 = **15** | `offroad`, `under20`, `balanced`, `anywhere`, `adventure` |

> Dualtron ima najveću moguću koncentraciju bodova jer prima 4 poena na 4 od 5 pitanja, što ga čini brendom koji je najlakše "maksimizovati."

---

## Generisanje teksta

### `generatePersonalizedText(answers, primary, secondary)`

Generiše sažetak od 2–3 rečenice prilagođen korisnikovoj navedenoj upotrebi i preferencijama dometa. Koristi dve mape za prevod:

- **usageMap** — konvertuje ID odgovora `usage` u čitljivu frazu (npr. `"city"` → `"svakodnevnu gradsku vožnju"`)
- **rangeMap** — konvertuje ID odgovora `range` u frazu (npr. `"over70"` → `"duge performansne rute"`)

Šablon:
> *"Na osnovu vaše preferencije za [usage] i [range], [Primarni] se izdvaja kao najjači izbor… [Sekundarni] bi vam takođe odlično odgovarao…"*

---

### `generateExpertAssessment(answers, primary)`

Generiše duži paragraf ekspertskog tona koji referencira odgovore na `performance` i `personality` za dodatne nijanse. Ima **jednu granu po brendu**:

| Primarni brend | Ključni signal koji se proverava | Ton |
|---|---|---|
| Dualtron | `performance === "maximum"` | Entuzijastički/ikonični identitet |
| Teverun | `personality === "tech"` | Inovacije i napredni jezik |
| Kaabo | `personality === "anywhere"` | Avantura i sloboda terena |

---

## Efekti koncentracije bodova

Pošto mnoge opcije daju bodove **samo jednom brendu**, nekoliko snažno usklađenih odgovora može dominirati rezultatom bez obzira na ostale odgovore. Ključni scenariji "zaključavanja":

| Kombinacija | Verovatni ishod |
|---|---|
| `offroad` + `anywhere` + `adventure` | Kaabo na ~60–70% sigurnosti |
| `over70` + `maximum` + `iconic` + `performance` | Dualtron na ~70–80% sigurnosti |
| `city` + `20to40` + `tech` + `technology` | Teverun na ~65–75% sigurnosti |

Mešoviti signali (npr. `balanced` performanse + `20to40` domet + `practical` ličnost) daju bliže trostrane podele sa nižim procentima sigurnosti (30–45%).

---

## Dodavanje ili izmena pitanja

Da biste dodali novi korak:

1. Dodajte novi `QuizStep` objekat u niz `quizSteps` u `scoring.ts`
2. Dajte mu jedinstveni `id`, `question`, `insightTitle`, `insight` tekst i niz `options`
3. `scores` svake opcije je `Partial<ScoreMap>` — navodite samo brendove koji dobijaju bodove; brendovi koji nedostaju dobijaju 0
4. Funkcija `calculateResults` automatski obrađuje bilo koji broj koraka

Da biste dodali novi brend:

1. Dodajte ga u union tip `Brand`
2. Dodajte unos u `brandInfo`
3. Ažurirajte `scores` objekat svih relevantnih postojećih opcija
4. Ažurirajte `generatePersonalizedText` i `generateExpertAssessment` za novi brend

---

## Referenca tipova

```ts
type Brand = "dualtron" | "teverun" | "kaabo";

type ScoreMap = Record<Brand, number>;

interface QuizOption {
  id: string;           // npr. "city", "maximum"
  label: string;        // glavni tekst dugmeta
  sublabel?: string;    // opcioni opisni red
  scores: Partial<ScoreMap>;  // bodovi dodeljeni po brendu
}

interface QuizStep {
  id: string;           // koristi se kao ključ u mapi odgovora
  question: string;     // prikazuje se kao naslov koraka
  insightTitle: string; // prikazuje se u edukativnoj kartici
  insight: string;      // objašnjavajući tekst prikazan nakon izbora opcije
  options: QuizOption[];
}
```
