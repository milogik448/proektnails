import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const IMAGES = [
  { src: '/images/works/IMG_3143.PNG', label: 'Дизайн 1' },
  { src: '/images/works/IMG_3144.PNG', label: 'Дизайн 2' },
  { src: '/images/works/IMG_3146.PNG', label: 'Дизайн 3' },
  { src: '/images/works/IMG_3147.PNG', label: 'Дизайн 4' },
  { src: '/images/works/IMG_3148.PNG', label: 'Дизайн 5' },
  { src: '/images/works/IMG_3149.PNG', label: 'Дизайн 6' },
  { src: '/images/works/IMG_3150.PNG', label: 'Дизайн 7' },
]

// Assign colspan/rowspan for a varied masonry-like grid
const SPANS = [
  '',           // 0 — 1×1
  'row-span-2', // 1 — tall
  '',           // 2 — 1×1
  '',           // 3 — 1×1
  'row-span-2', // 4 — tall
  '',           // 5 — 1×1
  'col-span-2', // 6 — wide
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // index

  const prev = () => setLightbox(i => (i === 0 ? IMAGES.length - 1 : i - 1))
  const next = () => setLightbox(i => (i === IMAGES.length - 1 ? 0 : i + 1))

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-12 border-b border-ghost">
        <span className="section-tag">004</span>
        <h1
          className="font-serif font-light text-ink leading-none"
          style={{ fontSize: 'clamp(42px, 7vw, 88px)' }}
        >
          Роботи
        </h1>
      </div>

      {/* Gallery grid */}
      <div className="px-8 md:px-12 lg:px-16 xl:px-20 py-12">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: '10px', gridAutoRows: '200px' }}
        >
          {IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.055 }}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden group ${SPANS[i]}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-350 flex items-center justify-center">
                <ZoomIn
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/92 z-[200] flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors duration-200 z-10"
            >
              <X size={26} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 text-white/50 hover:text-white transition-colors duration-200 z-10 p-2"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].label}
              className="max-w-[90vw] max-h-[88vh] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 text-white/50 hover:text-white transition-colors duration-200 z-10 p-2"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.25em] uppercase text-white/40">
              {lightbox + 1} / {IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
