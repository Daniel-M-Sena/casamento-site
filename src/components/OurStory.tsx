import { Heart, Sparkles } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-rose-400" />
            <h2 className="text-3xl md:text-5xl text-rose-900">Nossa História</h2>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-rose-400" />
          </div>
        </div>

        <div className="space-y-6 md:space-y-8 text-center">
          {/* Primeiro bloco */}
          <div className="relative px-4 md:px-8">
            <div className="absolute -left-2 md:-left-4 top-0 text-4xl md:text-6xl text-rose-200 opacity-50">"</div>

            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              Nosso amor começou de uma forma inesperada, mas mágica. Foi em uma tarde 
              de primavera, quando nossos olhares se cruzaram pela primeira vez. Desde 
              aquele momento, soubemos que algo especial estava apenas começando.
            </p>

            <div className="absolute -right-2 md:-right-4 bottom-0 text-4xl md:text-6xl text-rose-200 opacity-50">"</div>
          </div>

          {/* Coração */}
          <div className="flex justify-center">
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-rose-400 fill-current animate-pulse" />
          </div>

          {/* Segundo parágrafo */}
          <p className="text-base md:text-xl text-gray-700 leading-relaxed px-4 md:px-0">
            Três anos se passaram desde aquele dia inesquecível. Compartilhamos 
            incontáveis momentos de alegria, superamos desafios juntos e construímos 
            uma conexão profunda que cresce a cada dia.
          </p>

          {/* Caixa com gradient */}
          <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 p-4 md:p-8 rounded-2xl mx-2 md:mx-0">
            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              Agora, estamos prontos para dar o próximo passo em nossa jornada. 
              Com alegria e emoção, convidamos você para celebrar conosco o início 
              de nossa vida juntos como marido e mulher.
            </p>
          </div>

          {/* Frase final */}
          <div className="pt-4 md:pt-8">
            <p className="text-xl md:text-2xl text-rose-600 italic">
              Para sempre será o nosso sempre
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

