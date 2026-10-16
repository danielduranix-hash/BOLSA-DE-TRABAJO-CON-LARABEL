import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, ChevronDown, Shield, FileText, Key, LogOut } from 'lucide-react';

export const Header = ({ usuario, onAbrirLogin, onAbrirPerfil, onCerrarSesion }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Institucional Mérida */}
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="flex items-center gap-3 group text-decoration-none" 
            aria-label="Ir a inicio - Bolsa de Trabajo Ayuntamiento de Mérida"
          >
            <div className="flex flex-col">
              <span className="text-[#0d3c75] font-extrabold text-2xl tracking-tight leading-none">
                MÉRIDA
              </span>
              <span className="text-[#70be3b] font-bold text-[10px] tracking-widest uppercase leading-tight">
                CONTIGO ES MEJOR
              </span>
              <span className="text-slate-400 text-[9px] font-medium leading-none">
                AYUNTAMIENTO 2024-2027
              </span>
            </div>
          </Link>
        </div>

        {/* Botones Derecha */}
        <div className="flex items-center gap-3">
          
          {/* Botón GeoPortal de Empleos */}
          <Link
            to="/geoportal"
            className="hidden sm:inline-flex items-center gap-2 bg-[#0d3c75] hover:bg-[#0a2a52] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all duration-200 hover:-translate-y-0.5 text-decoration-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#70be3b] animate-pulse"></span>
            <MapPin size={16} className="text-[#70be3b]" />
            <span>GeoPortal de Empleos</span>
          </Link>

          {/* RENDERIZADO CONDICIONAL: Si hay usuario logueado o no */}
          {usuario ? (
            <div className="relative" ref={dropdownRef}>
              {/* Botón desplegable con el nombre del usuario */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                type="button"
                className="inline-flex items-center gap-2 bg-blue-50/80 hover:bg-blue-100/80 text-[#0d3c75] border border-[#0d3c75]/20 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
              >
                <User size={16} className="text-[#0d3c75]" />
                <span>{usuario.nombre || "Mi Cuenta"}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú Desplegable (Dropdown) */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-3 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Hola,</p>
                    <p className="text-sm font-bold text-[#0d3c75] truncate">{usuario.nombre} {usuario.primer_apellido || ""}</p>
                    <p className="text-xs text-slate-500 truncate">{usuario.correo}</p>
                  </div>

                  <div className="pt-2 px-2 space-y-1">
                    <button
                      onClick={() => { setDropdownOpen(false); onAbrirPerfil(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0d3c75] rounded-xl transition-colors text-left"
                    >
                      <User size={16} className="text-slate-500" />
                      <span>Mi perfil</span>
                    </button>

                    <button
                      onClick={() => { setDropdownOpen(false); onCerrarSesion(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut size={16} className="text-rose-500" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Botón Ingresar (Cuando NO hay sesión) */
            <button
              onClick={onAbrirLogin}
              type="button"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0d3c75] border border-slate-300 hover:border-[#0d3c75] font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
            >
              <User size={16} aria-hidden="true" className="text-slate-500" />
              <span>Ingresar</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;