import { useState } from 'react';
import { ArrowLeft, Check, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Gift {
  id: number;
  name: string;
  image: string;
}

const gifts: Gift[] = [
  { id: 1, name: 'Jogo de Panelas', image: '/img/JOGO_DE_PANELA.jpg' },
  { id: 2, name: 'Edredom Casal', image: '/img/EDREDOM_CASAL.jpg' },
  { id: 3, name: 'Liquidificador', image: '/img/LIQUIDIFICADOR.webp' },
  { id: 4, name: 'Jogo de Toalhas', image: '/img/JOGO_DE_TOALHA.jpg' },
  { id: 5, name: 'Sanduicheira', image: '/img/SANDUICHEIRA.webp' },
  { id: 6, name: 'Jogo de Prato', image: '/img/JOGO_DE_PRATOS.jpg' },
  { id: 7, name: 'Jogo de Talheres', image: '/img/JOGO_DE_TALHERES.webp' },
  { id: 8, name: 'Ferro de Passar', image: '/img/FERRO_DE_PASSAR.webp' },
  { id: 9, name: 'Pix para Primeira Compra', image: '/img/pix.jpg' },
  { id: 10, name: 'Jogo de Cama', image: '/img/JOGO_DE_CAMA.webp' },
  { id: 11, name: 'Jogo de Copos', image: '/img/JOGO_DE_COPOS.webp' },
  { id: 12, name: 'Jogo de Taças', image: '/img/JOGO_DE_TACAS.jpg' },
  { id: 13, name: 'Jogo de Xícaras', image: '/img/JOGO_DE_XICARAS.webp' },
  { id: 14, name: 'Kit de Sobremesa', image: '/img/JOGO_DE_SOBREMESA.jpg' },
  { id: 15, name: 'Jogo de Pano de Prato', image: '/img/JOGO_DE_PANO_DE_PRATO.webp' },
  { id: 16, name: 'Potes Herméticos', image: '/img/POTES_HERMETICOS.webp' },
  { id: 17, name: 'Filtro', image: '/img/FILTRO.webp' },
  { id: 18, name: 'Forno Elétrico', image: '/img/FORNO_ELETRICO.webp' },
  { id: 19, name: 'Kit Faqueiro', image: '/img/KIT_FAQUEIRO.webp' },
  { id: 20, name: 'Jarra de Vidro', image: '/img/JARRA_DE_VIDRO.webp' },
  { id: 21, name: 'Panela de Pressão', image: '/img/PANELA_DE_PRESSAO.webp' },
  { id: 22, name: 'Pix pra Lua de Mel', image: '/img/pix2.jpg' },
  { id: 23, name: 'Batedeira', image: '/img/BATEDEIRA.webp' },
  { id: 24, name: 'Garrafa de café', image: '/img/GARRAFA_DE_CAFE.webp' },
  { id: 25, name: 'Cortinas', image: '/img/CORTINAS.jpg' },
  { id: 26, name: 'Televisão', image: '/img/TELEVISAO.jpg' },
  { id: 27, name: 'Aspirador de Pó', image: '/img/ASPIRADOR_DE_PO.webp' },
  { id: 28, name: 'Fogão', image: '/img/FOGAO.webp' },
  { id: 29, name: 'Máquina de Lavar Roupas', image: '/img/MAQUINA_DE_LAVAR_ROUPAS.jpg' },
  { id: 30, name: 'Jogo de Talheres', image: '/img/JOGO_TALHERES2.webp' },
  { id: 31, name: 'Jogo de Copos', image: '/img/JOGO_DE_COPOS.webp' },
  { id: 32, name: 'Jogo de Prato', image: '/img/JOGO_DE_PRATOS2.webp' },
  { id: 33, name: 'Pix para Primeira Compra', image: '/img/pix3.jpg' },
  { id: 34, name: 'Jogo de Cama', image: '/img/JOGO_DE_CAMA.webp' },
  { id: 35, name: 'Edredom Casal', image: '/img/EDREDOM_CASAL.jpg' },
  { id: 36, name: 'Travessa de Vidro', image: '/img/TRAVESSA_DE _VIDRO.webp' },
  { id: 37, name: 'Cuscuizeira', image: '/img/CUSCUIZEIRA.jpg' },
  { id: 38, name: 'Kit Conchas de Silicone', image: '/img/KIT_DE_CONCHAS_DE_SILICONE.webp' },
  { id: 39, name: 'Travesseiros', image: '/img/TRAVESSEIROS.jpg' },
  { id: 40, name: 'Pix pra Lua de Mel', image: '/img/pix4.jpg' },
];

export default function GiftList({
  onBack,
  selectedGifts,
  setSelectedGifts,
  reservedGifts,
  onReserveGifts
}) {

  const [step, setStep] = useState('selecting');

  const availableGifts = gifts.filter((gift) => !reservedGifts.includes(gift.id));

  const toggleGift = (giftId) => {
    if (selectedGifts.includes(giftId)) {
      setSelectedGifts(selectedGifts.filter((id) => id !== giftId));
    } else {
      setSelectedGifts([...selectedGifts, giftId]);
    }
  };

  const handleConfirmGifts = () => {
    if (selectedGifts.length > 0) {
      setStep('choosing-delivery');
    }
  };

  // 🔥 PASSO 3 CORRIGIDO
  const handleDeliveryChoice = (choice: string) => {
    onReserveGifts(selectedGifts, choice);
    setStep(choice);
  };

  const handleWhatsApp = () => {
    window.open('https://api.whatsapp.com/send/?phone=5563992939653&text=Ol%C3%A1%2C+Gostaria+de+falar+sobre+o+presente+de+casamento%21&type=phone_number&app_absent=0', '_blank');
  };

  const resetAndGoBack = () => {
    setStep('selecting');
    setSelectedGifts([]);
    onBack();
  };

  // 🔥 A PARTIR DAQUI: SUA INTERFACE EXATAMENTE IGUAL — NADA TROQUEI

  if (step === 'wedding-day') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-rose-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-rose-500 fill-current animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-800 mb-6">
              Obrigado pelo carinho!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Nos vemos no grande dia!
            </p>
            <Button
              onClick={resetAndGoBack}
              className="px-8 py-6 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-lg"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'contact-couple') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <MessageCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-800 mb-6">
              Vamos conversar!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Clique no botão abaixo para falar conosco pelo WhatsApp
            </p>
            <div className="space-y-4">
              <Button
                onClick={handleWhatsApp}
                className="w-full px-8 py-6 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                Falar com os noivos no WhatsApp
              </Button>
              <Button
                onClick={resetAndGoBack}
                variant="outline"
                className="w-full px-8 py-6 rounded-lg"
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'choosing-delivery') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setStep('selecting')}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl text-center text-gray-800 mb-8">
              Como você deseja entregar o(s) presente(s)?
            </h2>

            <div className="space-y-4">
              <button
                onClick={() => handleDeliveryChoice('wedding-day')}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-rose-400 hover:bg-rose-50 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-1">No dia do Casamento</h3>
                    <p className="text-gray-600">Levarei o presente pessoalmente</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleDeliveryChoice('contact-couple')}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-rose-400 hover:bg-rose-50 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-800 mb-1">Preciso falar com os noivos</h3>
                    <p className="text-gray-600">Combinar outra forma de entrega</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-rose-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao início
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-rose-900 mb-4">Lista de Presentes</h2>
          <p className="text-lg text-gray-600">
            Escolha um ou mais presentes para nos presentear
          </p>
        </div>

        {availableGifts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Heart className="w-16 h-16 text-rose-400 fill-current mx-auto mb-4" />
            <h3 className="text-2xl text-gray-800 mb-4">
              Todos os presentes foram escolhidos!
            </h3>
            <p className="text-gray-600">
              Muito obrigado pelo carinho de todos!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {availableGifts.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => toggleGift(gift.id)}
                  className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    selectedGifts.includes(gift.id)
                      ? 'border-rose-400 bg-rose-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-rose-300 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedGifts.includes(gift.id)
                          ? 'border-rose-400 bg-rose-400 scale-110'
                          : 'border-white bg-white/80'
                      }`}
                    >
                      {selectedGifts.includes(gift.id) && (
                        <Check className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-gray-800 text-center">{gift.name}</h3>
                  </div>
                </button>
              ))}
            </div>

            {selectedGifts.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                  <p className="text-gray-700">
                    {selectedGifts.length} presente(s) selecionado(s)
                  </p>
                  <Button
                    onClick={handleConfirmGifts}
                    className="px-8 py-6 bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white rounded-lg"
                  >
                    Confirmar Presentes
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
