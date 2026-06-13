import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 200);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(() => onDone(), 2950);
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
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
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
          {/* Ambient red glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            style={{
              position: "absolute",
              width: "50vw",
              height: "50vw",
              borderRadius: "50%",
              background: "radial-gradient(circle, #B53A32 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Outer ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.12, scale: 1.8 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "1px solid rgba(181,58,50,0.6)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.08, scale: 2.8 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.35 }}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "1px solid rgba(181,58,50,0.5)",
              pointerEvents: "none",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "rgba(235,222,212,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(235,222,212,0.18)",
              borderRadius: 20,
              padding: "14px 22px",
            }}
          >
            <img
              src="/figmaAssets/image-2.png"
              alt="e-trotineti.rs"
              style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }}
            />
          </motion.div>

          {/* Red accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.7 }}
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 20,
              height: 2,
              width: 120,
              background: "linear-gradient(90deg, transparent, #B53A32, transparent)",
              transformOrigin: "center",
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 16,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "Inter, Helvetica, sans-serif",
            }}
          >
            tvoj vodič za e-mobilnost
          </motion.p>

          {/* Loading bar */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              background: "#B53A32",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.0, delay: 0.1, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
