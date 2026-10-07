import React from 'react';
import { Building2, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Columna 1: Dirección y Ubicación */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0d3c75] text-white flex items-center justify-center flex-shrink-0">
                <Building2 size={18} />
              </div>
              <h3 className="font-extrabold text-[#0d3c75] text-base leading-tight uppercase tracking-tight">
                DIRECCIÓN DE PROSPERIDAD Y BIENESTAR ECONÓMICO
              </h3>
            </div>
            
            <div className="text-slate-500 space-y-0.5 text-xs sm:text-sm pl-0">
              <p>Calle 59 No.432 entre 50 y 52</p>
              <p>Colonia Centro, C.P. 97000</p>
              <p>Mérida, Yucatán, México</p>
            </div>

            <div className="pt-1">
              <a 
                href="https://maps.app.goo.gl/VnJauTPyh8D7rSrP6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#00a884] hover:underline text-xs sm:text-sm transition-colors"
              >
                <span>Ver ubicación</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Columna 2: Horarios de Atención */}
          <div className="space-y-2 md:pl-8">
            <h3 className="font-extrabold text-[#0d3c75] text-sm uppercase tracking-tight">
              HORARIOS DE ATENCIÓN
            </h3>
            
            <div className="text-slate-500 text-xs sm:text-sm space-y-1">
              <p>Lunes a viernes de:</p>
              <p className="font-semibold text-slate-700">8:00 a.m. a 3:00 p.m.</p>
              <p className="pt-2">Teléfono: (999) 928 69 77</p>
              <p>Ext. 81533, 81534</p>
            </div>
          </div>

          {/* Columna 3: Avisos de Privacidad */}
          <div className="space-y-2 md:pl-8">
            <h3 className="font-extrabold text-[#0d3c75] text-sm uppercase tracking-tight">
              AVISOS DE PRIVACIDAD
            </h3>
            
            <ul className="space-y-2 text-xs sm:text-sm list-unstyled p-0 m-0">
              <li>
                <a 
                  href="https://www.merida.gob.mx/avisoprivacidad/" 
                  className="text-[#00a884] hover:underline transition-colors block leading-snug"
                >
                  Aviso de Privacidad Simplificado
                </a>
              </li>
              <li>
                <a 
                  href="https://www.merida.gob.mx/municipio/portal/privacidad/privacidad-direcciones.php" 
                  className="text-[#00a884] hover:underline transition-colors block leading-snug"
                >
                  Aviso de Privacidad por Direcciones
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;