import React from "react";

export default function EspacioCiudadano() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" id="gridCiudadano">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-black text-brand-navy tracking-tight uppercase">
          Espacio Ciudadano
        </h2>
        <div className="flex items-center justify-center gap-1.5 mt-3 mb-4">
          <span className="w-3 h-1.5 rounded-full bg-brand-navy" />
          <span className="w-3 h-1.5 rounded-full bg-brand-amber" />
          <span className="w-3 h-1.5 rounded-full bg-brand-emerald" />
        </div>
        <p className="text-slate-500 text-sm sm:text-base">
          Herramientas rápidas y gratuitas para acelerar tu vinculación con el sector productivo local.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="card bg-white rounded-3xl p-8 border border-slate-100 shadow-soft-xl card-hover-effect flex flex-col items-center text-center group cursor-pointer">
          <div className="w-20 h-20 rounded-full border-2 border-brand-sky/40 bg-blue-50/60 flex items-center justify-center text-brand-navy group-hover:scale-110 group-hover:bg-brand-sky/20 transition-all duration-300 mb-6 shadow-inner">
            <i className="w-9 h-9 text-brand-navy" data-lucide="search" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
            Consulta Vacantes
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Explora ofertas laborales locales ajustadas a tu perfil e intereses.
          </p>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand-navy group-hover:text-emerald-600 transition-colors">
            Ver ofertas activas
            <i className="w-4 h-4" data-lucide="chevron-right" />
          </span>
        </div>

        <div className="card bg-white rounded-3xl p-8 border border-slate-100 shadow-soft-xl card-hover-effect flex flex-col items-center text-center group cursor-pointer">
          <div className="w-20 h-20 rounded-full border-2 border-brand-amber/40 bg-amber-50/60 flex items-center justify-center text-brand-amber group-hover:scale-110 group-hover:bg-amber-100/60 transition-all duration-300 mb-6 shadow-inner">
            <i className="w-9 h-9 text-brand-amber" data-lucide="file-text" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-amber transition-colors">
            Sube tu CV
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Permite que las mejores empresas encuentren tu perfil rápidamente.
          </p>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand-navy group-hover:text-brand-amber transition-colors">
            Registrar documento
            <i className="w-4 h-4" data-lucide="chevron-right" />
          </span>
        </div>

        <div className="card bg-white rounded-3xl p-8 border border-slate-100 shadow-soft-xl card-hover-effect flex flex-col items-center text-center group cursor-pointer">
          <div className="w-20 h-20 rounded-full border-2 border-pink-400/40 bg-pink-50/60 flex items-center justify-center text-pink-600 group-hover:scale-110 group-hover:bg-pink-100/60 transition-all duration-300 mb-6 shadow-inner">
            <i className="w-9 h-9 text-pink-600" data-lucide="rocket" />
          </div>
          <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-pink-600 transition-colors">
            Impulsa tu Carrera
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Accede a programas de capacitación y jornadas de contratación directas.
          </p>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-brand-navy group-hover:text-pink-600 transition-colors">
            Descubrir talleres
            <i className="w-4 h-4" data-lucide="chevron-right" />
          </span>
        </div>
      </div>
    </section>
  );
}