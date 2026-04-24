/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, HTMLMotionProps } from "motion/react";
import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Instagram, Info } from "lucide-react";

// Import images
import f1 from "./assets/images/fashion/fashion-3.jpg";
import f2 from "./assets/images/fashion/fashion-minimal.jpg";
import f3 from "./assets/images/fashion/fashion-noni.jpg";
import f4 from "./assets/images/fashion/fashion-stories.jpg";
import f5 from "./assets/images/fashion/fashion-4.jpg";
import f6 from "./assets/images/fashion/fashion-5.jpg";
import a1 from "./assets/images/architecture/arch-6.jpg";
import a2 from "./assets/images/architecture/arch-street.jpg";
import a3 from "./assets/images/architecture/arch-geometric.jpg";

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
  // Fashion
  { id: "f1", url: f1, title: "Perspective 01", category: "Fashion", aspect: "aspect-[2/3]" },
  { id: "f2", url: f2, title: "Minimal Form", category: "Fashion", aspect: "aspect-square" },
  { id: "f3", url: f3, title: "Noni Julia", category: "Fashion", aspect: "aspect-[3/2]" },
  { id: "f4", url: f4, title: "Editorial Story", category: "Fashion", aspect: "aspect-[4/5]" },
  { id: "f5", url: f5, title: "Silhouette study", category: "Fashion", aspect: "aspect-[2/3]" },
  { id: "f6", url: f6, title: "Texture Detail", category: "Fashion", aspect: "aspect-square" },
  
  // Architecture
  { id: "a1", url: a1, title: "Monolith 01", category: "Architecture", aspect: "aspect-[3/4]" },
  { id: "a2", url: a2, title: "Street Study", category: "Architecture", aspect: "aspect-square" },
  { id: "a3", url: a3, title: "Geometric Purity", category: "Architecture", aspect: "aspect-[2/3]" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activePage, setActivePage] = useState<'all' | 'Fashion' | 'Architecture'>('all');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Filter photos based on active page
  const filteredPhotos = activePage === 'all' 
    ? INSIGHTS 
    : INSIGHTS.filter(p => p.category === activePage);

  // Split photos into matching columns from the editorial grid
  const col1 = filteredPhotos.slice(0, Math.ceil(filteredPhotos.length / 3));
  const col2 = filteredPhotos.slice(Math.ceil(filteredPhotos.length / 3), Math.ceil((filteredPhotos.length / 3) * 2));
  const col3 = filteredPhotos.slice(Math.ceil((filteredPhotos.length / 3) * 2));

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
            <button 
              onClick={() => setActivePage('all')}
              className="vertical-rl text-[14px] font-serif tracking-[0.2em] transform rotate-180 uppercase whitespace-nowrap hover:text-accent transition-colors cursor-pointer"
            >
              very very personal
            </button>
          </div>

          <div className="vertical-rl flex flex-col items-center gap-10 transform rotate-180 mb-12">
            {['Fashion', 'Architecture'].map((item) => (
              <button 
                key={item} 
                onClick={() => setActivePage(item as any)}
                className={`text-[9px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap cursor-pointer ${activePage === item ? 'text-ink font-bold' : 'text-muted hover:text-ink'}`}
              >
                {item}
              </button>
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
            key={activePage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-3xl font-light italic"
          >
            {activePage === 'all' ? 'recherches visuelles' : activePage.toLowerCase()}
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
        </div>

        <div className="flex flex-col gap-10">
          {col2.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i + col1.length} setSelectedPhoto={setSelectedPhoto} />
          ))}
        </div>

        <div className="flex flex-col gap-10">
          {col3.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i + col1.length + col2.length} setSelectedPhoto={setSelectedPhoto} />
          ))}
        </div>

        {/* Footer Area */}
        <footer className="col-span-3 flex justify-between items-center text-[9px] uppercase tracking-[0.1em] text-accent pt-10 mt-10 border-t border-border-subtle">
          <div className="flex gap-10 items-center">
            <span>001 / 012</span>
            <span className="w-px h-3 bg-border-subtle mx-2"></span>
            <span className="italic font-serif normal-case text-[11px]">minimalism is the key</span>
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
                {['Fashion', 'Architecture'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                  >
                    <button 
                      className="font-serif text-6xl font-light italic hover:pl-8 transition-all duration-700 block cursor-pointer"
                      onClick={() => {
                        setActivePage(item as any);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item}
                    </button>
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
            className="fixed inset-0 z-[60] bg-paper overflow-y-auto"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="fixed top-12 right-12 text-ink hover:scale-110 transition-transform cursor-pointer z-70"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>
            <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-24" onClick={(e) => e.stopPropagation()}>
              <div className="w-full max-w-6xl flex flex-col md:flex-row gap-16 items-start">
                <div className="w-full relative flex items-center justify-center">
                  <motion.img 
                    layoutId={`photo-${selectedPhoto.id}`}
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[90vh] w-auto cursor-zoom-out"
                    onClick={() => setSelectedPhoto(null)}
                  />
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
      <div className="aspect-[4/5] overflow-hidden bg-[#E5E2DD] transition-all duration-700">
        <motion.img
          layoutId={`photo-${photo.id}`}
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
