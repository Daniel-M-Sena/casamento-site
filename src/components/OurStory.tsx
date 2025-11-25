import { Heart, Sparkles } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <h2 className="text-4xl md:text-5xl text-rose-900">Nossa História</h2>
            <Sparkles className="w-6 h-6 text-rose-400" />
          </div>
        </div>

        <div className="space-y-8 text-center">
          <div className="relative">
            <div className="absolute -left-4 top-0 text-6xl text-rose-200 opacity-50">"</div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed px-8">
              Nosso amor começou de uma forma inesperada, mas mágica. Foi em uma tarde 
              de primavera, quando nossos olhares se cruzaram pela primeira vez. Desde 
              aquele momento, soubemos que algo especial estava apenas começando.
            </p>
            <div className="absolute -right-4 bottom-0 text-6xl text-rose-200 opacity-50">"</div>
          </div>

          <div className="flex justify-center">
            <Heart className="w-12 h-12 text-rose-400 fill-current animate-pulse" />
          </div>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Três anos se passaram desde aquele dia inesquecível. Compartilhamos 
            incontáveis momentos de alegria, superamos desafios juntos e construímos 
            uma conexão profunda que cresce a cada dia.
          </p>

          <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 p-8 rounded-2xl">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Agora, estamos prontos para dar o próximo passo em nossa jornada. 
              Com alegria e emoção, convidamos você para celebrar conosco o início 
              de nossa vida juntos como marido e mulher.
            </p>
          </div>

          <div className="pt-8">
            <p className="text-2xl text-rose-600 italic">
              Para sempre será o nosso sempre
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
