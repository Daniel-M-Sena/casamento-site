import { useState } from 'react';
import { Check, Heart } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { supabase } from '../supabaseClient';

export default function RSVP({ onSubmit }: { onSubmit: (guest: { id: string; name: string }) => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const { data, error } = await supabase
      .from('rsvp')
      .insert([
        {
          name,
          phone,
          confirmed_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error(error);
      alert('Erro ao confirmar presença. Tente novamente.');
      return;
    }

    onSubmit({ id: data.id, name });

    setIsSubmitted(true);
    setName('');
    setPhone('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-rose-900 mb-4">
            Confirmação de Presença
          </h2>
          <p className="text-lg text-gray-600">
            Sua presença é muito importante para nós!
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl text-gray-800 mb-4">
              Presença Confirmada!
            </h3>
            <p className="text-gray-600 mb-6">
              Obrigado por confirmar. Estamos ansiosos para celebrar com você!
            </p>
            <div className="flex justify-center gap-2">
              <Heart className="w-6 h-6 text-rose-400 fill-current animate-bounce" />
              <Heart className="w-6 h-6 text-rose-400 fill-current animate-bounce delay-100" />
              <Heart className="w-6 h-6 text-rose-400 fill-current animate-bounce delay-200" />
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nome Completo
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Telefone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Confirmar Presença
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
