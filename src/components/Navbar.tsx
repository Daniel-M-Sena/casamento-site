import { useState } from "react";
import { Heart } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onGiftListClick: () => void;
  currentPage: "home" | "gifts";
}

export default function Navbar({
  onNavigate,
  onGiftListClick,
  currentPage,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (sectionId: string) => {
    setMobileOpen(false); // fecha menu ao clicar
    if (sectionId === "presentes") {
      onGiftListClick();
    } else {
      onNavigate(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 text-rose-500">
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-rose-900 font-semibold">S & D</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleClick("inicio")}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => handleClick("nossa-historia")}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Nossa História
            </button>
            <button
              onClick={() => handleClick("confirmacao")}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Confirmação de Presença
            </button>
            <button
              onClick={() => handleClick("presentes")}
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Lista de Presentes
            </button>
          </div>

          {/* Botão mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700"
            >
              {mobileOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — aparece só quando mobileOpen = true */}
      {mobileOpen && (
        <div className="md:hidden border-t border-rose-100">
          <div className="px-3 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-md">
            <button
              onClick={() => handleClick("inicio")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md"
            >
              Início
            </button>
            <button
              onClick={() => handleClick("nossa-historia")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md"
            >
              Nossa História
            </button>
            <button
              onClick={() => handleClick("confirmacao")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md"
            >
              Confirmação de Presença
            </button>
            <button
              onClick={() => handleClick("presentes")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-md"
            >
              Lista de Presentes
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

