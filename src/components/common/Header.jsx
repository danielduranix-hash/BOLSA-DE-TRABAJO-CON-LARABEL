import React from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Identidad / Logo Institucional Mérida */}
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

          {/* Botón Ingresar */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0d3c75] border border-slate-300 hover:border-[#0d3c75] font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm text-decoration-none"
          >
            <User size={16} aria-hidden="true" className="text-slate-500" />
            <span>Ingresar</span>
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Header;