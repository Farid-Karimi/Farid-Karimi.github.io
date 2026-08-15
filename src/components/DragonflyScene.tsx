"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

export default function DragonflyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 90;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.35 + 0.05,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawDragonfly = (x: number, y: number, flap: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "rgba(242,242,242,0.85)";
      const wings = Math.sin(flap) * 0.9;
      ctx.save();
      ctx.rotate(-wings * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, -14, 22, 9, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.rotate(wings * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 14, 22, 9, 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.fillStyle = "rgba(242,242,242,0.95)";
      ctx.fillRect(-2.5, -16, 5, 32);
      ctx.beginPath();
      ctx.ellipse(0, -17, 3.4, 2.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 0.6 + p.phase) * 0.08;
        p.y += p.vy + Math.cos(t * 0.5 + p.phase) * 0.08;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        ctx.fillStyle = `rgba(242,242,242,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      const cx = width * 0.5 + Math.sin(t * 0.12) * width * 0.18;
      const cy = height * 0.45 + Math.sin(t * 0.2) * height * 0.06;
      ctx.save();
      ctx.globalAlpha = 0.12;
      for (let i = 1; i <= 3; i++) {
        drawDragonfly(cx - Math.sin(t * 0.12) * i * 26, cy + i * 20, t * 10 - i * 0.7);
      }
      ctx.restore();
      drawDragonfly(cx, cy, t * 10);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      drawDragonfly(width * 0.5, height * 0.45, 0.5);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="dragonfly-scene" ref={canvasRef} aria-hidden="true" />;
}