import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import RSVP from './components/RSVP';
import GiftList from './components/GiftList';
import { supabase } from './supabaseClient';

// 🔥 Lista de presentes para pegar gift_name
const gifts = [
  { id: 1, name: 'Jogo de Panelas' },
  { id: 2, name: 'Edredom Casal' },
  { id: 3, name: 'Liquidificador' },
  { id: 4, name: 'Jogo de Toalhas' },
  { id: 5, name: 'Sanduicheira' },
  { id: 6, name: 'Jogo de Prato' },
  { id: 7, name: 'Jogo de Talheres' },
  { id: 8, name: 'Ferro de Passar' },
  { id: 9, name: 'Pix para Primeira Compra' },
  { id: 10, name: 'Jogo de Cama' },
  { id: 11, name: 'Jogo de Copos' },
  { id: 12, name: 'Fogão' },
  { id: 13, name: 'Jogo de Xícaras' },
  { id: 14, name: 'Kit de Sobremesa' },
  { id: 15, name: 'Jogo de Pano de Prato' },
  { id: 16, name: 'Potes Herméticos' },
  { id: 17, name: 'Filtro' },
  { id: 18, name: 'Forno Elétrico' },
  { id: 19, name: 'Kit Faqueiro' },
  { id: 20, name: 'Jarra de Vidro' },
  { id: 21, name: 'Panela de Pressão' },
  { id: 22, name: 'Pix pra Lua de Mel' },
  { id: 23, name: 'Batedeira' },
  { id: 24, name: 'Garrafa de café' },
  { id: 25, name: 'Cortinas' },
  { id: 26, name: 'Televisão' },
  { id: 27, name: 'Aspirador de Pó' },
  { id: 28, name: 'Pix para Lua de Mel' },
  { id: 29, name: 'Máquina de Lavar Roupas' },
  { id: 30, name: 'Jogo de Talheres' },
  { id: 31, name: 'Jogo de Copos' },
  { id: 32, name: 'Jogo de Prato' },
  { id: 33, name: 'Pix para Primeira Compra' },
  { id: 34, name: 'Jogo de Cama' },
  { id: 35, name: 'Edredom Casal' },
  { id: 36, name: 'Travessa de Vidro' },
  { id: 37, name: 'Cuscuizeira' },
  { id: 38, name: 'Kit Conchas de Silicone' },
  { id: 39, name: 'Travesseiros' },
  { id: 40, name: 'Pix pra Lua de Mel' },
  { id: 41, name: 'Sofá' },
  { id: 42, name: 'Mesa de Jantar' },
  { id: 43, name: 'Pix para Primeira Compra de Mercado' },
  { id: 44, name: 'Jogo de Taças' },
  { id: 45, name: 'Escorredor de Louças' },
  { id: 46, name: 'Boleira de Vidro' },
  { id: 47, name: 'Espelho' },
  { id: 48, name: 'Jogo de Prato' },
  { id: 49, name: 'Pix para Primeira Compra de Mercado' },
  { id: 50, name: 'Air Fryer' },
  { id: 51, name: 'Kit Formas de Bolo' },
  { id: 52, name: 'Paneleiro de Cozinha' },
  { id: 53, name: 'Varal de Chão' },
  { id: 54, name: 'Tapete de Crochê' },
  { id: 55, name: 'Porta Tempero' },
  { id: 56, name: 'Tábua de Passar com Armário' },
  
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentGuest, setCurrentGuest] = useState(null);

  const [selectedGifts, setSelectedGifts] = useState([]);
  const [reservedGifts, setReservedGifts] = useState([]);

  // 🔄 Carrega presentes já reservados
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('gift_list')
        .select('gift_id');

      if (data) {
        setReservedGifts(data.map(r => r.gift_id));
      }
    };

    load();
  }, []);

  // ✅ RESERVA DE PRESENTES (SEM EXIGIR CONFIRMAÇÃO DE PRESENÇA)
  const handleGiftReservation = async (giftIds, deliveryMethod) => {
    const rows = giftIds.map((giftId) => {
      const gift = gifts.find(g => g.id === giftId);

      return {
        gift_id: giftId,
        gift_name: gift?.name || null,
        id_pessoa: currentGuest?.id || null,
        select_by: currentGuest?.name || 'Convidado',
        delivery_method: deliveryMethod,
        selected_at: new Date().toISOString()
      };
    });

    const { error } = await supabase
      .from('gift_list')
      .insert(rows);

    if (error) {
      console.error(error);
      alert('Erro ao reservar presentes.');
      return;
    }

    setReservedGifts(prev => [...prev, ...giftIds]);
    setSelectedGifts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <Navbar
        onNavigate={() => setCurrentPage('home')}
        onGiftListClick={() => setCurrentPage('gifts')}
        currentPage={currentPage}
      />

      {currentPage === 'home' ? (
        <>
          <section id="inicio">
            <Hero />
          </section>

          <section id="nossa-historia">
            <OurStory />
          </section>

          <section id="confirmacao">
            <RSVP onSubmit={(guest) => setCurrentGuest(guest)} />
          </section>

          <section id="presentes" className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={() => setCurrentPage('gifts')}
                className="px-12 py-6 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full"
              >
                Ver Lista de Presentes
              </button>
            </div>
          </section>
        </>
      ) : (
        <GiftList
          onBack={() => setCurrentPage('home')}
          selectedGifts={selectedGifts}
          setSelectedGifts={setSelectedGifts}
          reservedGifts={reservedGifts}
          onReserveGifts={handleGiftReservation}
        />
      )}
    </div>
  );
}
