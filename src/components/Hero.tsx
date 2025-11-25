import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const carouselImages = [
  '/img/carrossel/foto1.jpeg',
  '/img/carrossel/foto2.jpeg',
  '/img/carrossel/foto3.jpeg',
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
    <div className="relative h-[60vh] md:h-screen mt-16">
      {/* Carousel */}
      <div className="relative h-full overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={image}
              alt={`Foto do casal ${index + 1}`}
              className="w-full object-cover h-[45vh] md:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
          </div>
        ))}

        {/* Dots Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir para foto ${index + 1}`}
            />
          ))}
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-7xl mb-2 md:mb-4 animate-fade-in">
              Stella & Daniel
            </h1>
            <p className="text-lg md:text-3xl mb-4 md:mb-8 opacity-90">
              20 de Junho de 2026
            </p>
            <div className="inline-block px-6 py-2 md:px-8 md:py-3 bg-white/20 backdrop-blur-sm rounded-full">
              Celebre conosco o nosso amor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


