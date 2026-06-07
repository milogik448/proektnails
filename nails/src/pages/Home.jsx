import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ImageModal from '../components/ImageModal'
import Hero from '../components/home/Hero'
import PortfolioSlider from '../components/home/PortfolioSlider'
import WhyChooseUs from '../components/home/WhyChooseUs'

export default function Home({ onNavigate, t }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
  )

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openImage = (src) => { setSelectedImage(src); setIsModalOpen(true) }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <Hero t={t} onNavigate={onNavigate} isMobileView={isMobileView} />
      <PortfolioSlider t={t} onImageClick={openImage} />
      <WhyChooseUs t={t} />
      <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  )
}