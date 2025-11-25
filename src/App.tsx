import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import RSVP from './components/RSVP';
import GiftList from './components/GiftList';
import { supabase } from './supabaseClient';

// 🔥 Lista de presentes para pegar gift_name
const gifts = [
  { id: 1, name: "Jogo de Panelas" },
  { id: 2, name: "Edredom Casal" },
  { id: 3, name: "Liquidificador" },
  { id: 4, name: "Jogo de Toalhas" },
  { id: 5, name: "Sanduicheira" },
  { id: 6, name: "Jogo de Prato" },
  { id: 7, name: "Jogo de Talheres" },
  { id: 8, name: "Ferro de Passar" },
  { id: 9, name: "Jogo de Cama" },
  { id: 10, name: "Jogo de Copos" },
  { id: 11, name: "Jogo de Taças" },
  { id: 12, name: "Jogo de Xícaras" },
  { id: 13, name: "Kit de Sobremesa" },
  { id: 14, name: "Jogo de Pano de Prato" },
  { id: 15, name: "Potes Herméticos" },
  { id: 16, name: "Filtro" },
  { id: 17, name: "Forno Elétrico" },
  { id: 18, name: "Kit Faqueiro" },
  { id: 19, name: "Jarra de Vidro" },
  { id: 20, name: "Panela de Pressão" },
  { id: 21, name: "Batedeira" },
  { id: 22, name: "Garrafa de café" },
  { id: 23, name: "Cortinas" },
  { id: 24, name: "Televisão" },
  { id: 25, name: "Aspirador de Pó" },
  { id: 26, name: "Fogão" },
  { id: 27, name: "Máquina de Lavar Roupas" },
  { id: 28, name: "Panela de Pressão" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentGuest, setCurrentGuest] = useState(null);

  const [selectedGifts, setSelectedGifts] = useState([]);
  const [reservedGifts, setReservedGifts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('gift_list').select('gift_id');
      if (data) {
        setReservedGifts(data.map(r => r.gift_id));
      }
    };
    load();
  }, []);

  // 🔥 AGORA RECEBE deliveryMethod TAMBÉM
  const handleGiftReservation = async (giftIds, deliveryMethod) => {
    if (!currentGuest) {
      alert("Você precisa confirmar presença antes de reservar presentes.");
      return;
    }

    const rows = giftIds.map((giftId) => {
      const gift = gifts.find(g => g.id === giftId);

      return {
        gift_id: giftId,
        gift_name: gift?.name || null,
        id_pessoa: currentGuest.id,
        select_by: currentGuest.name,
        delivery_method: deliveryMethod,
        selected_at: new Date().toISOString()
      };
    });

    const { error } = await supabase.from('gift_list').insert(rows);

    if (error) {
      console.log(error);
      alert('Erro ao reservar presentes.');
      return;
    }

    setReservedGifts([...reservedGifts, ...giftIds]);
    setSelectedGifts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <Navbar 
        onNavigate={(sectionId) => setCurrentPage('home')}
        onGiftListClick={() => setCurrentPage('gifts')}
        currentPage={currentPage}
      />

      {currentPage === 'home' ? (
        <>
          <section id="inicio"><Hero /></section>
          <section id="nossa-historia"><OurStory /></section>
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
