/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, HTMLMotionProps } from "motion/react";
import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Instagram, Info } from "lucide-react";

interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
  aspect: string;
}

interface PhotoCardProps {
  key?: string;
  photo: Photo;
  index: number;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
}

const INSIGHTS: Photo[] = [
  { id: "1", url: "https://picsum.photos/seed/arch1/800/1200", title: "Structure & Light", category: "Architecture", aspect: "aspect-[2/3]" },
  { id: "2", url: "https://picsum.photos/seed/fashion2/800/800", title: "Soft Drape", category: "Fashion", aspect: "aspect-square" },
  { id: "3", url: "https://picsum.photos/seed/minimal3/1200/800", title: "Form in Mono", category: "Photography", aspect: "aspect-[3/2]" },
  { id: "4", url: "https://picsum.photos/seed/arch4/800/1000", title: "Curves of Concrete", category: "Architecture", aspect: "aspect-[4/5]" },
  { id: "5", url: "https://picsum.photos/seed/fashion5/800/1200", title: "Essential Lines", category: "Fashion", aspect: "aspect-[2/3]" },
  { id: "6", url: "https://picsum.photos/seed/arch6/900/600", title: "The Void", category: "Photography", aspect: "aspect-[3/2]" },
  { id: "7", url: "https://picsum.photos/seed/minimal7/800/1100", title: "Quietude", category: "Other", aspect: "aspect-[8/11]" },
  { id: "8", url: "https://picsum.photos/seed/arch8/800/800", title: "Symmetry", category: "Architecture", aspect: "aspect-square" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Split photos into matching columns from the editorial grid
  const col1 = INSIGHTS.slice(0, 3);
  const col2 = INSIGHTS.slice(3, 6);
  const col3 = INSIGHTS.slice(6);

  return (
    <div className="min-h-screen selection:bg-ink selection:text-paper overflow-x-hidden bg-paper text-ink font-sans">
      <div className="editorial-container min-h-screen">
        {/* Navigation Rail - Vertical */}
        <nav className="row-span-3 border-r border-border-subtle flex flex-col justify-between pb-8 pt-4">
          <div className="flex flex-col items-center gap-12">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="vertical-rl text-[14px] font-serif tracking-[0.2em] transform rotate-180 uppercase whitespace-nowrap">
              Sillage Study
            </div>
          </div>

          <div className="vertical-rl flex flex-col items-center gap-10 transform rotate-180 mb-12">
            {['Fashion', 'Photography', 'Architecture', 'Other'].map((item) => (
              <a key={item} href="#" className="text-[9px] uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors whitespace-nowrap">
                {item}
              </a>
            ))}
          </div>

          <div className="vertical-rl text-spaced text-ink/40 gap-8 transform rotate-180 flex items-center pr-1">
            <span>Est. 2026</span>
            <span className="text-ink">Series 01</span>
          </div>
        </nav>

        {/* Header Area */}
        <header className="col-span-3 flex justify-between items-end pb-5 border-b border-ink">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-3xl font-light italic"
          >
            Silhouettes et Structures
          </motion.h1>
          <span className="text-[11px] uppercase tracking-[0.15em] opacity-60">
            Sarah Laské
          </span>
        </header>

        {/* Main Content Areas */}
        <div className="flex flex-col gap-10">
          {col1.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} setSelectedPhoto={setSelectedPhoto} />
          ))}
          <div className="mt-auto pt-10 border-t border-border-subtle">
            <p className="font-serif text-[13px] leading-relaxed italic text-accent italic">
              — La pureté des lignes, l'absence d'ornement.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10">
          {col2.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i + 3} setSelectedPhoto={setSelectedPhoto} />
          ))}
          <div className="mt-10">
            <h2 className="text-[10px] uppercase tracking-[0.2em] mb-4 text-ink font-bold">L'Intention</h2>
            <p className="text-[14px] leading-relaxed font-serif max-w-[220px]">
              Chercher l'équilibre entre la forme architecturale et le mouvement organique du drapé.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {col3.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i + 6} setSelectedPhoto={setSelectedPhoto} />
          ))}
          <div className="mt-auto">
             <p className="font-serif text-[13px] leading-relaxed italic text-accent text-right italic">
              Matières brutes, tons de terre et d'encre.
            </p>
          </div>
        </div>

        {/* Footer Area */}
        <footer className="col-span-3 flex justify-between items-center text-[9px] uppercase tracking-[0.1em] text-accent pt-10 mt-10 border-t border-border-subtle">
          <div className="flex gap-10">
            <span>001 / 012</span>
            <span>Inspiration Photographique</span>
          </div>
          <span>&copy; 2026 Studio Minimaliste — Paris / Tokyo / London</span>
        </footer>
      </div>

      {/* Overlay Menu & Lightbox (Existing Logic) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-paper pl-20 pt-40"
          >
            <div className="px-24 space-y-8">
              <span className="text-spaced text-ink/30 block mb-12 font-sans font-bold">Navigation</span>
              <ul className="space-y-12">
                {['Fashion', 'Photography', 'Architecture', 'Other'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <a 
                      href="#" 
                      className="font-serif text-6xl font-light italic hover:pl-8 transition-all duration-700 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-paper flex items-center justify-center p-24"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-12 right-12 text-ink hover:scale-110 transition-transform cursor-pointer"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <div className="w-full max-w-5xl aspect-video flex flex-col md:flex-row gap-12 items-center" onClick={(e) => e.stopPropagation()}>
              <div className="w-full h-full flex-1">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full md:w-80 space-y-8">
                <span className="text-spaced text-ink/40 font-bold">{selectedPhoto.category}</span>
                <h2 className="font-serif text-4xl font-light italic">{selectedPhoto.title}</h2>
                <p className="text-sm text-muted leading-relaxed font-light italic font-serif">
                  A study in how negative space defines the primary subject. Observed in the subtle shift of light across the grain.
                </p>
                <div className="pt-8 border-t border-ink/10">
                  <button className="text-spaced border border-ink/10 px-6 py-3 hover:bg-ink hover:text-paper transition-all duration-500 rounded-full w-full cursor-pointer font-bold">
                    Request Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhotoCard({ photo, index, setSelectedPhoto }: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className="group cursor-pointer"
      onClick={() => setSelectedPhoto(photo)}
    >
      <div className={`${photo.aspect} overflow-hidden bg-[#E5E2DD] transition-all duration-700`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={photo.url}
          alt={photo.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>
      <div className="mt-3 flex justify-between items-baseline opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="font-serif text-[11px] italic">{photo.title}</span>
        <span className="text-[9px] uppercase tracking-widest">{photo.category}</span>
      </div>
    </motion.div>
  );
}
