import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 200);
    const t2 = setTimeout(() => setPhase("out"), 2500);
    const t3 = setTimeout(() => onDone(), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Wide ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
            style={{
              position: "absolute",
              width: "55vw",
              height: "55vw",
              borderRadius: "50%",
              background: "radial-gradient(circle, #B53A32 0%, transparent 65%)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />

          {/* Expanding ring 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.12, scale: 2.4 }}
            transition={{ duration: 2.0, ease: "easeOut", delay: 0.1 }}
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "1px solid rgba(181,58,50,0.8)",
              pointerEvents: "none",
            }}
          />

          {/* Expanding ring 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.06, scale: 4 }}
            transition={{ duration: 2.4, ease: "easeOut", delay: 0.25 }}
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "1px solid rgba(181,58,50,0.6)",
              pointerEvents: "none",
            }}
          />

          {/* Logo — proper no-bg, inverted white on dark */}
          <motion.img
            src="/figmaAssets/logo-nobg.png"
            alt="e-trotineti.rs"
            initial={{ opacity: 0, scale: 0.65, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.35, 0.64, 1], delay: 0.15 }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "min(260px, 60vw)",
              height: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1) drop-shadow(0 2px 20px rgba(255,255,255,0.12))",
            }}
          />

          {/* Red accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.1 }}
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 16,
              height: 2,
              width: 90,
              background: "linear-gradient(90deg, transparent, #B53A32, transparent)",
              transformOrigin: "center",
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 12,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "Inter, Helvetica, sans-serif",
            }}
          >
            tvoj vodič za e-mobilnost
          </motion.p>

          {/* Bottom progress line */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              background: "linear-gradient(90deg, #8D2A24, #B53A32)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.3, delay: 0.1, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
