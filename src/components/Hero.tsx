import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const carouselImages = [
  "/img/carrossel/foto1.jpeg",
  "/img/carrossel/foto2.jpeg",
  "/img/carrossel/foto3.jpeg",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mt-16 w-full">
      {/* parent tem min-height — garante que os slides tenham área */}
      <div className="relative w-full overflow-hidden min-h-[260px] md:min-h-screen">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* A imagem ocupa o espaço do pai; classes controlam comportamento mobile/desktop */}
            <ImageWithFallback
              src={image}
              alt={`Foto do casal ${index + 1}`}
              className="
                w-full
                h-auto           /* mobile: natural height */
                md:h-full        /* desktop: full height of parent */
                object-contain   /* mobile: no crop */
                md:object-cover  /* desktop: cover */
                bg-black
              "
            />

            {/* Gradiente sobre a imagem */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          </div>
        ))}

        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl mb-4">Stella & Daniel</h1>
            <p className="text-xl md:text-3xl mb-8 opacity-90">20 de Junho de 2026</p>
            <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              Celebre conosco o nosso amor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
