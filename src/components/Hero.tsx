import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const carouselImages = [
  '/img/carrossel/foto1.jpeg',
  '/img/carrossel/foto2.jpg',
  '/img/carrossel/foto3.jpg',
  '/img/carrossel/foto4.jpg',
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
    <div className="relative w-full mt-16">

      {/* MOBILE: altura fixa | DESKTOP: altura tela inteira */}
      <div className="relative w-full h-[300px] md:h-screen overflow-hidden">

        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={image}
              alt={`Foto ${index + 1}`}
              className="
                w-full
                h-full
                object-cover
                md:object-contain
                bg-black
              "
            />

            {/* GRADIENTE */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          </div>
        ))}

        {/* DOTS */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-6 md:w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* TEXTO SOBREPOSTO */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center text-white px-4">

            {/* TÍTULO MENOR NO MOBILE */}
            <h1 className="text-3xl md:text-7xl mb-2 md:mb-4">
              Stella & Daniel
            </h1>

            {/* DATA MENOR */}
            <p className="text-base md:text-3xl mb-4 md:mb-8 opacity-90">
              20 de Junho de 2026
            </p>

            {/* FRASE MENOR E COM MAIS ESPAÇAMENTO */}
            <div className="
              inline-block
              px-4 py-2 md:px-8 md:py-3
              text-xs md:text-base
              bg-white/20 backdrop-blur-sm rounded-full
            ">
              Celebre conosco o nosso amor
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
