"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const src = (file: string) => `/images/gallery/${file}`;
const alt = (index: number) => `Repair work on the NiNes bench, photo ${index + 1}`;

export function HeroSlideshow({ photos, interval = 4000 }: { photos: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion || photos.length < 2) return;
    const timer = setInterval(() => setIndex(i => (i + 1) % photos.length), interval);
    return () => clearInterval(timer);
  }, [photos.length, interval, reduceMotion]);
  const next = (index + 1) % photos.length;
  return <>
    <AnimatePresence initial={false}>
      <motion.div key={photos[index]} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: "easeOut" }} className="absolute inset-0">
        <Image src={src(photos[index])} alt={alt(index)} fill priority={index === 0} sizes="(max-width: 1024px) 90vw, 450px" className="object-cover" />
      </motion.div>
    </AnimatePresence>
    {photos.length > 1 && <Image src={src(photos[next])} alt="" aria-hidden fill sizes="(max-width: 1024px) 90vw, 450px" className="invisible object-cover" />}
    <span className="absolute right-4 top-4 rounded-full bg-[#030b15]/75 px-3 py-1 text-xs font-semibold tabular-nums text-slate-300">{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
  </>;
}

export function BenchMarquee({ photos }: { photos: string[] }) {
  return <div className="marquee overflow-hidden">
    <div className="marquee-track flex w-max gap-4" style={{ animationDuration: `${photos.length * 4}s` }}>
      {[...photos, ...photos].map((file, i) => <Link key={i} href="/gallery" aria-hidden={i >= photos.length} tabIndex={i >= photos.length ? -1 : undefined} className="relative h-56 w-48 shrink-0 overflow-hidden rounded-lg border border-blue-900/80 bg-panel sm:h-72 sm:w-60"><Image src={src(file)} alt={i >= photos.length ? "" : alt(i)} fill sizes="240px" className="object-cover transition duration-300 hover:scale-105" /></Link>)}
    </div>
  </div>;
}
