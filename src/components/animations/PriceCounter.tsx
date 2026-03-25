"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PriceCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function PriceCounter({
  value,
  duration = 800,
  suffix = "",
  className = "",
}: PriceCounterProps) {
  const prefersReduced = useReducedMotion();
  const spanRef = useRef<HTMLSpanElement>(null);
  const rafId = useRef<number>(0);

  const animate = useCallback(() => {
    if (!spanRef.current) return;

    if (prefersReduced) {
      spanRef.current.textContent = `${value}${suffix}`;
      return;
    }

    const startTime = performance.now();

    function tick(timestamp: number) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      if (spanRef.current) {
        spanRef.current.textContent = `${current}${suffix}`;
      }

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      }
    }

    spanRef.current.textContent = `0${suffix}`;
    rafId.current = requestAnimationFrame(tick);
  }, [value, duration, suffix, prefersReduced]);

  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  return (
    <span ref={spanRef} className={className}>
      {value}
      {suffix}
    </span>
  );
}
