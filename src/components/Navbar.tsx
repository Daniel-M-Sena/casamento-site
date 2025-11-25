import { Heart } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onGiftListClick: () => void;
  currentPage: 'home' | 'gifts';
}

export default function Navbar({ onNavigate, onGiftListClick, currentPage }: NavbarProps) {
  const handleClick = (sectionId: string) => {
    if (sectionId === 'presentes') {
      onGiftListClick();
    } else {
      onNavigate(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-rose-500">
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-rose-900">S & D</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleClick('inicio')}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => handleClick('nossa-historia')}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Nossa História
            </button>
            <button
              onClick={() => handleClick('confirmacao')}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Confirmação de Presença
            </button>
            <button
              onClick={() => handleClick('presentes')}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Lista de Presentes
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md">
          <button
            onClick={() => handleClick('inicio')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
          >
            Início
          </button>
          <button
            onClick={() => handleClick('nossa-historia')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
          >
            Nossa História
          </button>
          <button
            onClick={() => handleClick('confirmacao')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
          >
            Confirmação de Presença
          </button>
          <button
            onClick={() => handleClick('presentes')}
            className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
          >
            Lista de Presentes
          </button>
        </div>
      </div>
    </nav>
  );
}
