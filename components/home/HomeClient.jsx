"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Client component for animated stats counters on the home page.
 */
export default function HomeClient({ stats }) {
  return (
    <motion.div
      className="stats-grid"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <StatCounter label="Characters Chronicled" value={stats.characters} icon="⚔️" />
      <StatCounter label="Events Recorded" value={stats.events} icon="⏳" />
      <StatCounter label="Dimensions Mapped" value={stats.dimensions} icon="🌍" />
      <StatCounter label="Terms Defined" value={stats.terms} icon="📜" />
    </motion.div>
  );
}

function StatCounter({ label, value, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          animateCount(value, 1500);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const animateCount = (target, duration) => {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="stats-counter" ref={ref}>
      <span className="stats-counter-icon" aria-hidden="true">{icon}</span>
      <span className="stats-counter-number">{count}</span>
      <span className="stats-counter-label">{label}</span>
    </div>
  );
}
