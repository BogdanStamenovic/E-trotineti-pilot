import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  quizSteps,
  brandInfo,
  calculateResults,
  detectEdgeCase,
  getHybridRecommendation,
  generatePersonalizedText,
  generateExpertAssessment,
  type Brand,
  type QuizOption,
  type QuizStep,
  type HybridModel,
} from "@/lib/scoring";

const glass = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
};

const glassDeep = {
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  border: "1px solid rgba(255,255,255,0.7)",
  boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
};

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className="rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              width: 28,
              height: 28,
              background:
                i < current
                  ? "#B53A32"
                  : i === current
                  ? "rgba(181,58,50,0.15)"
                  : "rgba(10,10,10,0.08)",
              color: i < current ? "#fff" : i === current ? "#B53A32" : "rgba(10,10,10,0.35)",
              border: i === current ? "2px solid #B53A32" : "2px solid transparent",
              transition: "all 0.4s ease",
            }}
          >
            {i < current ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </motion.div>
          {i < total - 1 && (
            <div
              className="h-px rounded-full"
              style={{
                width: 24,
                background: i < current ? "#B53A32" : "rgba(10,10,10,0.12)",
                transition: "background 0.4s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: QuizOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      data-testid={`option-${option.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-full text-left rounded-2xl p-5 cursor-pointer relative overflow-hidden"
      style={{
        ...glass,
        border: selected
          ? "2px solid #B53A32"
          : "2px solid rgba(255,255,255,0.6)",
        background: selected ? "rgba(181,58,50,0.08)" : glass.background,
        boxShadow: selected
          ? "0 8px 32px rgba(181,58,50,0.15)"
          : glass.boxShadow,
        transition: "all 0.25s ease",
      }}
    >
      {selected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: "#B53A32" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
      <p
        className="font-semibold text-[15px] leading-snug pr-8"
        style={{ color: selected ? "#B53A32" : "#0A0A0A", fontFamily: "Inter, Helvetica, sans-serif" }}
      >
        {option.label}
      </p>
      {option.sublabel && (
        <p
          className="mt-1 text-[13px]"
          style={{ color: "rgba(10,10,10,0.45)", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          {option.sublabel}
        </p>
      )}
    </motion.button>
  );
}

function InsightCard({
  title,
  text,
  onContinue,
  isLast,
}: {
  title: string;
  text: string;
  onContinue: () => void;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.15 }}
      className="rounded-2xl p-6 mt-5"
      style={glassDeep}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(181,58,50,0.10)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#B53A32" strokeWidth="1.5" />
            <path d="M8 5v1M8 8v3" stroke="#B53A32" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1">
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-1"
            style={{ color: "#B53A32", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {title}
          </p>
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: "rgba(10,10,10,0.7)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {text}
          </p>
        </div>
      </div>
      <motion.button
        data-testid="button-continue"
        onClick={onContinue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="mt-5 w-full rounded-xl py-3.5 font-semibold text-[15px] flex items-center justify-center gap-2"
        style={{
          background: "#B53A32",
          color: "#fff",
          fontFamily: "Inter, Helvetica, sans-serif",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isLast ? "Vidi rezultate" : "Nastavi"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

function ScoreBar({ brand, percentage, delay }: { brand: Brand; percentage: number; delay: number }) {
  const info = brandInfo[brand];
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-[14px]"
            style={{ color: "#0A0A0A", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {info.name}
          </span>
          <span
            className="text-[12px]"
            style={{ color: "rgba(10,10,10,0.45)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {info.tagline}
          </span>
        </div>
        <span
          className="font-bold text-[14px]"
          style={{ color: info.color, fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          {percentage}%
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: 8, background: "rgba(10,10,10,0.08)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{ background: info.color }}
        />
      </div>
    </div>
  );
}

function HybridCard({
  model,
  primaryBrand,
  secondaryBrand,
}: {
  model: HybridModel;
  primaryBrand: Brand;
  secondaryBrand: Brand;
}) {
  const p = brandInfo[primaryBrand];
  const s = brandInfo[secondaryBrand];
  const specs = [
    { label: "Snaga (peak)", value: `${(model.specs.motorPeakW / 1000).toFixed(1)} kW` },
    { label: "Brzina", value: `${model.specs.topSpeedKmh} km/h` },
    ...(model.specs.rangeKm ? [{ label: "Domet", value: `~${model.specs.rangeKm} km` }] : []),
    { label: "Težina", value: `${model.specs.weightKg} kg` },
    { label: "Cena", value: model.specs.priceRange },
    { label: "Gume", value: model.specs.tires },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.72, type: "spring", stiffness: 260, damping: 26 }}
      className="rounded-2xl overflow-hidden mb-5"
      style={{ border: "1.5px solid rgba(181,58,50,0.18)" }}
    >
      {/* Header band */}
      <div
        className="px-6 py-4 flex items-center justify-between gap-3"
        style={{
          background: "linear-gradient(105deg, rgba(181,58,50,0.07) 0%, rgba(255,255,255,0.55) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(181,58,50,0.10)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(181,58,50,0.12)", color: "#B53A32" }}
          >
            Granični slučaj
          </div>
          <span
            className="text-[12px] font-medium"
            style={{ color: "rgba(10,10,10,0.45)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {p.name} × {s.name}
          </span>
        </div>
        {model.confidence === "high" && (
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#16A34A", boxShadow: "0 0 6px rgba(22,163,74,0.5)" }}
          />
        )}
      </div>

      {/* Body */}
      <div
        className="px-6 py-5"
        style={{
          background: "rgba(255,255,255,0.48)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1"
          style={{ color: "#B53A32", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          Hibridna preporuka
        </p>
        <div className="flex items-baseline gap-2 mb-1">
          <h3
            className="font-bold text-[22px] leading-tight"
            style={{ color: "#0A0A0A", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {model.model}
          </h3>
          <span
            className="text-[14px] font-medium"
            style={{ color: "rgba(10,10,10,0.4)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            by {model.manufacturer}
          </span>
        </div>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {specs.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px]"
              style={{
                background: "rgba(10,10,10,0.05)",
                color: "#0A0A0A",
                fontFamily: "Inter, Helvetica, sans-serif",
              }}
            >
              <span style={{ color: "rgba(10,10,10,0.4)" }}>{s.label}</span>
              <span className="font-semibold">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Suspension + battery row */}
        <div
          className="text-[12px] mb-4 leading-relaxed"
          style={{ color: "rgba(10,10,10,0.45)", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          <span className="font-medium" style={{ color: "rgba(10,10,10,0.6)" }}>Baterija:</span>{" "}
          {model.specs.battery} · <span className="font-medium" style={{ color: "rgba(10,10,10,0.6)" }}>Ovešenje:</span>{" "}
          {model.specs.suspension}
        </div>

        {/* Rationale */}
        <p
          className="text-[14px] leading-relaxed mb-4"
          style={{ color: "rgba(10,10,10,0.7)", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          {model.rationale}
        </p>

        {/* Traits */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {model.traits.map((trait) => (
            <span
              key={trait}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{
                background: "rgba(181,58,50,0.07)",
                color: "#8D2A24",
                fontFamily: "Inter, Helvetica, sans-serif",
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* CTA */}
        {model.url && (
          <a
            href={model.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold"
            style={{
              background: "#0A0A0A",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "Inter, Helvetica, sans-serif",
            }}
          >
            Saznaj više
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ResultsScreen({ answers }: { answers: Record<string, string> }) {
  const [, setLocation] = useLocation();
  const { scores, percentages, primary, secondary, confidence } = calculateResults(answers);
  const isEdgeCase = detectEdgeCase(scores, percentages, primary, secondary);
  const hybridModel = isEdgeCase ? getHybridRecommendation(answers, primary, secondary) : null;
  const personalizedText = generatePersonalizedText(answers, primary, secondary);
  const expertAssessment = generateExpertAssessment(answers, primary);
  const info = brandInfo[primary];
  const [revealBars, setRevealBars] = useState(false);
  const countedConfidence = useCountUp(confidence, 1600, true);

  useEffect(() => {
    const t = setTimeout(() => setRevealBars(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto pb-16"
    >
      {/* Primary match reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="rounded-3xl overflow-hidden mb-6"
        style={{ background: "#0A0A0A" }}
      >
        <div className="px-8 pt-10 pb-8">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            Vaš idealan izbor
          </motion.p>

          <div className="flex items-start justify-between gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="font-bold leading-none mb-2"
                style={{
                  fontSize: "clamp(40px, 8vw, 64px)",
                  color: "#fff",
                  fontFamily: "Inter, Helvetica, sans-serif",
                }}
              >
                {info.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[15px]"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, Helvetica, sans-serif" }}
              >
                {info.tagline}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
              className="text-right flex-shrink-0"
            >
              <div
                className="font-bold leading-none"
                style={{
                  fontSize: "clamp(36px, 7vw, 56px)",
                  color: "#B53A32",
                  fontFamily: "Inter, Helvetica, sans-serif",
                }}
              >
                {countedConfidence}%
              </div>
              <div
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, Helvetica, sans-serif" }}
              >
                Poklapanje
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left", height: 1, background: "rgba(255,255,255,0.08)", margin: "24px 0" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-[15px] italic leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            "{info.message}"
          </motion.p>
        </div>

        {/* Brand description strip */}
        <div
          className="px-8 py-5"
          style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-[14px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            {info.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Why This Fits You */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-7 mb-5"
        style={glassDeep}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3"
          style={{ color: "#B53A32", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          Zašto ovo odgovara vama
        </p>
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "rgba(10,10,10,0.75)", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          {personalizedText}
        </p>
      </motion.div>

      {/* Brand Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="rounded-2xl p-7 mb-5"
        style={glassDeep}
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5"
          style={{ color: "#B53A32", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          Poređenje brendova
        </p>
        {revealBars && (
          <>
            <ScoreBar brand="dualtron" percentage={percentages.dualtron} delay={0} />
            <ScoreBar brand="teverun" percentage={percentages.teverun} delay={0.15} />
            <ScoreBar brand="kaabo" percentage={percentages.kaabo} delay={0.3} />
          </>
        )}
      </motion.div>

      {/* Hybrid recommendation — only shown on edge cases */}
      {hybridModel && (
        <HybridCard
          model={hybridModel}
          primaryBrand={primary}
          secondaryBrand={secondary}
        />
      )}

      {/* Professional Opinion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: hybridModel ? 1.0 : 0.8 }}
        className="rounded-2xl p-7 mb-8"
        style={glassDeep}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(181,58,50,0.10)" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 10L6.5 2L11 10H2Z" stroke="#B53A32" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </div>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#B53A32", fontFamily: "Inter, Helvetica, sans-serif" }}
          >
            Stručna ocena
          </p>
        </div>
        <p
          className="text-[15px] leading-relaxed"
          style={{ color: "rgba(10,10,10,0.7)", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          {expertAssessment}
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.button
          data-testid="button-restart"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 rounded-xl py-4 font-semibold text-[15px]"
          style={{
            background: "#B53A32",
            color: "#fff",
            fontFamily: "Inter, Helvetica, sans-serif",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        >
          Ponovi kviz
        </motion.button>
        <motion.button
          data-testid="button-home"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 rounded-xl py-4 font-semibold text-[15px]"
          style={{
            ...glass,
            color: "#0A0A0A",
            fontFamily: "Inter, Helvetica, sans-serif",
            border: "1.5px solid rgba(10,10,10,0.12)",
            cursor: "pointer",
          }}
          onClick={() => setLocation("/")}
        >
          Nazad na početak
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function QuizStepView({
  step,
  stepIndex,
  totalSteps,
  onAnswer,
}: {
  step: QuizStep;
  stepIndex: number;
  totalSteps: number;
  onAnswer: (stepId: string, optionId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  function handleSelect(optionId: string) {
    setSelected(optionId);
    if (!selected) {
      setTimeout(() => {
        insightRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 200);
    }
  }

  const colClass =
    step.options.length <= 4
      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3";

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 250, damping: 28 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-3"
          style={{ color: "rgba(10,10,10,0.35)", fontFamily: "Inter, Helvetica, sans-serif" }}
        >
          Korak {stepIndex + 1} od {totalSteps}
        </p>
        <h2
          className="font-bold leading-tight"
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            color: "#0A0A0A",
            fontFamily: "Inter, Helvetica, sans-serif",
          }}
        >
          {step.question}
        </h2>
      </div>

      <div className={colClass}>
        {step.options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selected === option.id}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>

      <div ref={insightRef}>
        <AnimatePresence>
          {selected && (
            <InsightCard
              title={step.insightTitle}
              text={step.insight}
              onContinue={() => onAnswer(step.id, selected)}
              isLast={stepIndex === totalSteps - 1}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleAnswer(stepId: string, optionId: string) {
    const newAnswers = { ...answers, [stepId]: optionId };
    setAnswers(newAnswers);

    setTimeout(() => {
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      if (currentStep < quizSteps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setShowResults(true);
      }
    }, 120);
  }

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #E6DED7 0%, #F2ECE6 55%, #EDE4DA 100%)",
        overflowX: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "45vw",
            height: "45vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(181,58,50,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-8%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(181,58,50,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-6 py-4 sm:px-10"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <img
          src="/figmaAssets/logo-nobg.png"
          alt="e-trotineti.rs"
          className="w-auto object-contain"
          style={{ height: 100, marginTop: -16, marginBottom: -16, cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        />
        {!showResults && (
          <ProgressBar current={currentStep} total={quizSteps.length} />
        )}
        {showResults && (
          <span
            className="text-[13px] font-semibold px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(181,58,50,0.10)",
              color: "#B53A32",
              fontFamily: "Inter, Helvetica, sans-serif",
            }}
          >
            Rezultati su spremni
          </span>
        )}
      </header>

      {/* Main */}
      <main className="relative z-10 px-5 sm:px-10 pt-10 pb-16">
        <AnimatePresence mode="wait">
          {showResults ? (
            <ResultsScreen key="results" answers={answers} />
          ) : (
            <QuizStepView
              key={currentStep}
              step={quizSteps[currentStep]}
              stepIndex={currentStep}
              totalSteps={quizSteps.length}
              onAnswer={handleAnswer}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
