"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FlipRowProps {
  children: React.ReactNode;
  delay?: number;
}

export function FlipRow({ children, delay = 0 }: FlipRowProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ rotateX: -90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformOrigin: "top center", perspective: 600 }}
    >
      {children}
    </motion.div>
  );
}
