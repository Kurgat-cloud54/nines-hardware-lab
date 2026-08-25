"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Trace = { points: Point[]; length: number; offset: number; speed: number };

function traceLength(points: Point[]) {
  return points.slice(1).reduce((total, point, index) => total + Math.hypot(point.x - points[index].x, point.y - points[index].y), 0);
}

function pointOnTrace(points: Point[], distance: number): Point {
  let remaining = distance;
  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const segment = Math.hypot(end.x - start.x, end.y - start.y);
    if (remaining <= segment) {
      const ratio = remaining / segment;
      return { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio };
    }
    remaining -= segment;
  }
  return points[points.length - 1];
}

function buildTraces(width: number, height: number): Trace[] {
  return Array.from({ length: Math.max(15, Math.floor(width / 115)) }, (_, index) => {
    const startX = ((index * 137) % width) + 20;
    const startY = ((index * 83) % height) + 20;
    const horizontal = index % 2 === 0;
    const first = horizontal ? { x: Math.min(width - 20, startX + 100 + (index % 4) * 40), y: startY } : { x: startX, y: Math.min(height - 20, startY + 100 + (index % 4) * 40) };
    const end = horizontal ? { x: first.x, y: Math.min(height - 20, first.y + 65 + (index % 3) * 35) } : { x: Math.min(width - 20, first.x + 65 + (index % 3) * 35), y: first.y };
    const points = [{ x: startX, y: startY }, first, end];
    return { points, length: traceLength(points), offset: (index * 97) % 300, speed: 22 + (index % 5) * 7 };
  });
}

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let traces: Trace[] = [];
    let frame = 0;
    let animationFrame = 0;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      traces = buildTraces(window.innerWidth, window.innerHeight);
    };

    const draw = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      traces.forEach((trace) => {
        context.beginPath();
        context.moveTo(trace.points[0].x, trace.points[0].y);
        trace.points.slice(1).forEach(point => context.lineTo(point.x, point.y));
        context.strokeStyle = "rgba(28, 117, 235, 0.13)";
        context.lineWidth = 1;
        context.stroke();
        trace.points.forEach((point, index) => {
          if (index === 0 || index === trace.points.length - 1) {
            context.beginPath();
            context.arc(point.x, point.y, 2.4, 0, Math.PI * 2);
            context.fillStyle = "rgba(38, 139, 255, 0.22)";
            context.fill();
          }
        });
        if (!reducedMotion) {
          const position = (time / 1000 * trace.speed + trace.offset) % trace.length;
          const pulse = pointOnTrace(trace.points, position);
          const glow = context.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 12);
          glow.addColorStop(0, "rgba(90, 183, 255, 0.78)");
          glow.addColorStop(1, "rgba(8, 124, 255, 0)");
          context.fillStyle = glow;
          context.fillRect(pulse.x - 12, pulse.y - 12, 24, 24);
          context.beginPath();
          context.arc(pulse.x, pulse.y, 1.8, 0, Math.PI * 2);
          context.fillStyle = "rgba(173, 223, 255, 0.96)";
          context.fill();
        }
      });
      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reducedMotion) draw(0); else animationFrame = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animationFrame); cancelAnimationFrame(frame); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
}
