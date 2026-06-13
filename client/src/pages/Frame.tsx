import { useLocation } from "wouter";
import { motion } from "framer-motion";
import img1 from "@assets/Screenshot_2026-06-10_at_14.45.53_1781365625132.png";
import img2 from "@assets/Screenshot_2026-06-10_at_14.47.22_1781365625134.png";
import img3 from "@assets/Screenshot_2026-06-10_at_14.49.26_1781365625136.png";
import img4 from "@assets/Screenshot_2026-06-10_at_14.45.25_1781365625138.png";

const glass = {
  background: "rgba(255,255,255,0.45)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.65)",
  boxShadow: "0 12px 40px rgba(0,0,0,0.07)",
};

const stats = [
  { value: "120+", label: "modela" },
  { value: "3", label: "premium brenda" },
  { value: "100%", label: "nezavisno" },
];

const photos = [
  { src: img1, alt: "Rider in forest" },
  { src: img2, alt: "Rider on scooter" },
  { src: img3, alt: "Rider drifting" },
  { src: img4, alt: "Rider on terrain" },
];

export const Frame = (): JSX.Element => {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #E0D5CC 0%, #EDE4DA 40%, #F2ECE6 100%)",
        fontFamily: "Inter, Helvetica, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }} aria-hidden="true">
        <div style={{
          position: "absolute", top: "-15%", right: "5%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(181,58,50,0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-10%",
          width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(181,58,50,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
      </div>

      {/* Header */}
      <header
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <img
          src="/figmaAssets/logo-nobg.png"
          alt="e-trotineti.rs"
          className="h-12 w-auto object-contain"
        />
        <motion.button
          data-testid="button-nav-start"
          onClick={() => setLocation("/quiz")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-xl px-5 py-2.5 text-[13px] font-semibold"
          style={{
            background: "rgba(181,58,50,0.10)",
            color: "#B53A32",
            border: "1.5px solid rgba(181,58,50,0.2)",
            cursor: "pointer",
          }}
        >
          Pokreni vodič →
        </motion.button>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-0 px-6 sm:px-10 pt-12 pb-16 max-w-[1400px] mx-auto">
        {/* Left — text */}
        <div className="flex-1 max-w-[580px]">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{
              background: "rgba(181,58,50,0.09)",
              border: "1px solid rgba(181,58,50,0.18)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#B53A32" }}
            />
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "#B53A32" }}
            >
              e-trotineti.rs — tvoj vodič
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-bold leading-[1.06] mb-5"
            style={{
              fontSize: "clamp(34px, 5.5vw, 64px)",
              color: "#0A0A0A",
              letterSpacing: "-0.02em",
            }}
          >
            Najbolji električni<br />trotinet za tvoj<br />
            <span style={{ color: "#B53A32" }}>stil vožnje</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-[17px] leading-relaxed mb-8 max-w-[480px]"
            style={{ color: "rgba(10,10,10,0.55)" }}
          >
            Uporedi modele, domet, snagu i cenu. Pronađi idealan Dualtron,
            Teverun ili Kaabo za grad, brzinu i avanturu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <motion.button
              data-testid="button-start-guide"
              onClick={() => setLocation("/quiz")}
              whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(181,58,50,0.30)" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl px-9 py-4 text-[17px] font-semibold text-white flex items-center justify-center gap-2"
              style={{
                background: "#B53A32",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(181,58,50,0.22)",
              }}
            >
              Pokreni vodič
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.button
              data-testid="button-learn-more"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl px-7 py-4 text-[17px] font-semibold"
              style={{
                ...glass,
                color: "#0A0A0A",
                border: "1.5px solid rgba(10,10,10,0.10)",
                cursor: "pointer",
              }}
            >
              Saznaj više
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6"
          >
            {stats.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center gap-4">
                  {i > 0 && (
                    <div style={{ width: 1, height: 32, background: "rgba(10,10,10,0.12)" }} />
                  )}
                  <div>
                    <div
                      className="font-bold text-[22px] leading-none"
                      style={{ color: "#0A0A0A" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-[12px] mt-0.5"
                      style={{ color: "rgba(10,10,10,0.45)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — photo grid */}
        <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
            style={{ width: "min(520px, 92vw)" }}
          >
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: i === 0 ? "20px 20px 8px 8px" : i === 1 ? "20px 20px 8px 8px" : i === 2 ? "8px 8px 20px 20px" : "8px 8px 20px 20px",
                    aspectRatio: "1 / 1",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  {/* subtle overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18) 100%)",
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating glass badge */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="absolute rounded-2xl px-5 py-3.5 flex items-center gap-3"
              style={{
                ...glass,
                bottom: -14,
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(181,58,50,0.10)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" fill="#B53A32" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: "#0A0A0A" }}>
                  Dualtron · Teverun · Kaabo
                </div>
                <div className="text-[11px]" style={{ color: "rgba(10,10,10,0.45)" }}>
                  3 premium brenda · nezavisni vodič
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Bottom strip */}
      <div
        className="relative z-10 border-t px-6 sm:px-10 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ borderColor: "rgba(0,0,0,0.07)" }}
      >
        <p className="text-[12px]" style={{ color: "rgba(10,10,10,0.35)" }}>
          © 2026 e-trotineti.rs — Nezavisni vodič za električne trotinete
        </p>
        <div className="flex items-center gap-1.5">
          {["Dualtron", "Teverun", "Kaabo"].map((brand) => (
            <span
              key={brand}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(181,58,50,0.08)",
                color: "#B53A32",
                border: "1px solid rgba(181,58,50,0.14)",
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
