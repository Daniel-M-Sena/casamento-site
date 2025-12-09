import { useState, useEffect, useRef, useCallback } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const carouselImages = [
  '/img/carrossel/foto1.jpeg',
  '/img/carrossel/foto2.jpg',
  '/img/carrossel/foto3.jpg',
  '/img/carrossel/foto4.jpg',
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // altura em px calculada para mobile (quando aplicável)
  const [calculatedHeightPx, setCalculatedHeightPx] = useState<number | null>(null);

  // ref do wrapper onde o height será aplicado
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // flag para detectar breakpoint (desktop vs mobile)
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  // atualiza breakpoint
  useEffect(() => {
    function onResize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // atualiza slide automaticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /**
   * onImageLoad: recebe o evento do <img> carregado,
   * calcula proporção natural e define altura em px baseado na largura
   * do wrapper (ou window width).
   */
  const onImageLoad = useCallback((ev: React.SyntheticEvent<HTMLImageElement>) => {
    const img = ev.currentTarget;
    if (!img?.naturalWidth || !img?.naturalHeight) return;

    // largura do espaço disponível para a imagem (prefere wrapper width)
    const containerWidth =
      wrapperRef.current?.clientWidth ?? Math.min(window.innerWidth, document.body.clientWidth);

    // calcula altura necessária para manter a proporção da imagem
    const naturalRatio = img.naturalHeight / img.naturalWidth;
    const targetHeightPx = Math.round(containerWidth * naturalRatio);

    setCalculatedHeightPx(targetHeightPx);
  }, []);

  // quando trocar de slide, zera calculatedHeight para recalcular quando imagem carregar
  useEffect(() => {
    setCalculatedHeightPx(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  // estilo inline para o wrapper: se desktop -> 100vh, senão usa calculatedHeightPx (ou fallback)
  const wrapperStyle: React.CSSProperties = isDesktop
    ? { height: '100vh' }
    : { height: '400px' }

  return (
    <div className="relative mt-16 w-full">
      {/* wrapperRef recebe a altura calculada via style */}
      <div
        ref={wrapperRef}
        className="relative w-full overflow-hidden"
        style={wrapperStyle}
      >
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* A passagem de onLoad para ImageWithFallback funciona pois este encaminha ...rest */}
            <ImageWithFallback
              src={image}
              alt={`Foto do casal ${index + 1}`}
              onLoad={onImageLoad}
              className="
                block
                w-full
                h-auto
                object-contain
                md:h-full
                md:object-cover
                bg-black
              "
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3 hover:bg-white/75'
              }`}
              aria-label={`Ir para foto ${index + 1}`}
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
