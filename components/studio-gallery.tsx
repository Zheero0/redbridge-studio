"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
}

interface StudioGalleryProps {
  images?: GalleryImage[]
  title?: string
}

// Placeholder images - replace these with actual studio images
const placeholderImages: GalleryImage[] = [
  { src: "/stu1.JPG", alt: "Studio main recording area" },
  { src: "/stu2.JPG", alt: "Camera setup and equipment" },
  { src: "/stu3.JPG", alt: "Audio mixing station" },
  { src: "/stu4.JPG", alt: "Lighting setup" },
  { src: "/stu5.JPG", alt: "Guest seating area" },
]


export function StudioGallery({ images = placeholderImages, title }: StudioGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{title}</h3>}
      
      {/* Main Image */}
      <Card className="relative mb-3 sm:mb-4 border-0 shadow-lg overflow-hidden">
        <div className="relative w-full pt-[66.67%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {images[currentIndex]?.src ? (
                <img
                  src={images[currentIndex].src || "/placeholder.svg"}
                  alt={images[currentIndex].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 flex flex-col items-center justify-center p-4">
                  <ImageIcon className="h-10 w-10 sm:h-14 sm:w-14 text-primary/40 mb-2 sm:mb-3" />
                  <p className="text-muted-foreground text-xs sm:text-sm text-center">Image placeholder {currentIndex + 1}</p>
                  <p className="text-muted-foreground/60 text-[10px] sm:text-xs mt-1 text-center">{images[currentIndex]?.alt}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm h-7 w-7 sm:h-9 sm:w-9"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm h-7 w-7 sm:h-9 sm:w-9"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </Card>

      {/* Thumbnail Strip */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative pt-[75%] rounded overflow-hidden border-2 transition-all ${
              index === currentIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            {image.src ? (
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4 text-primary/40" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
