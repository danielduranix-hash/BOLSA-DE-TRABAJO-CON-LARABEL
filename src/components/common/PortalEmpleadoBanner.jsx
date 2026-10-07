import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowUpRight } from 'lucide-react';

export const PortalEmpleadoBanner = () => {
  return (
    <section className="w-full my-6">
      <div className="bg-[#0b2d5c] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Contenido Izquierda: Icono + Textos */}
        <div className="flex items-start sm:items-center gap-5 z-10">
          
          {/* Icono de Maletín en contenedor semitransparente */}
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#70be3b]">
            <Briefcase size={28} />
          </div>

          <div className="space-y-1.5">
            {/* Pill "EMPRESAS & NEGOCIOS" */}
            <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-950/60 border border-[#70be3b]/40 text-[#70be3b] text-[10px] sm:text-xs font-bold tracking-wider uppercase">
              EMPRESAS &amp; NEGOCIOS
            </div>

            {/* Título Principal */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Portal del Empleador
            </h2>

            {/* Descripción */}
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
              Publica vacantes y gestiona solicitudes de forma ágil e intuitiva. Encuentra al talento municipal más calificado.
            </p>
          </div>
        </div>

        {/* Botón Acción Derecha */}
        <div className="flex-shrink-0 z-10 self-start md:self-center">
          <Link
            to="/empresas"
            className="inline-flex items-center gap-2 bg-[#70be3b] hover:bg-[#5ea82f] text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 text-decoration-none"
          >
            <span>Acceder como Empresa</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PortalEmpleadoBanner;