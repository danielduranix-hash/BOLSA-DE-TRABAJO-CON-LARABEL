import React from "react";

export default function AgendaMunicipal() {
  return (
    <section id="seccionCalendario" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-black text-brand-navy tracking-tight uppercase">
          Agenda Municipal de Empleo
        </h2>
        <p className="section-subtitle text-slate-500 text-sm sm:text-base mt-2">
          Haz clic sobre una categoría para desplegar su calendario de eventos
        </p>
      </div>

      <div className="sectores-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="sector-card bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-xl cursor-pointer hover:-translate-y-1 transition-all" data-sector="dia_empleo">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">☀️</span>
              <h3 className="font-bold text-brand-navy text-sm">Día del empleo</h3>
            </div>
            <span className="badge-count bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-full">0 Fechas</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            Jornadas semanales de vinculación directa entre postulantes y empresas en la cabecera municipal.
          </p>
          <div className="text-blue-700 font-semibold text-xs flex items-center justify-between">
            <span className="prox-fecha">Próxima: Sin fechas</span>
            <span>→</span>
          </div>
        </div>

        <div className="sector-card bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-xl cursor-pointer hover:-translate-y-1 transition-all" data-sector="modulo_movil">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🚐</span>
              <h3 className="font-bold text-amber-900 text-sm">Módulo móvil</h3>
            </div>
            <span className="badge-count bg-amber-50 text-amber-700 font-bold text-xs px-2.5 py-1 rounded-full">0 Fechas</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            Unidades itinerantes que acercan la bolsa de trabajo e información directa a tu colonia.
          </p>
          <div className="text-amber-700 font-semibold text-xs flex items-center justify-between">
            <span className="prox-fecha">Próxima: Sin fechas</span>
            <span>→</span>
          </div>
        </div>

        <div className="sector-card bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-xl cursor-pointer hover:-translate-y-1 transition-all" data-sector="feria_empleo">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎪</span>
              <h3 className="font-bold text-purple-900 text-sm">Feria del empleo</h3>
            </div>
            <span className="badge-count bg-purple-50 text-purple-700 font-bold text-xs px-2.5 py-1 rounded-full">0 Fechas</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            Eventos masivos de reclutamiento presencial con participación de decenas de empresas.
          </p>
          <div className="text-purple-700 font-semibold text-xs flex items-center justify-between">
            <span className="prox-fecha">Próxima: Sin fechas</span>
            <span>→</span>
          </div>
        </div>

        <div className="sector-card bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-xl cursor-pointer hover:-translate-y-1 transition-all" data-sector="capacitacion">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎓</span>
              <h3 className="font-bold text-emerald-900 text-sm">Capacitación</h3>
            </div>
            <span className="badge-count bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full">0 Fechas</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            Talleres y cursos prácticos para mejorar tu currículum y optimizar tus habilidades.
          </p>
          <div className="text-emerald-700 font-semibold text-xs flex items-center justify-between">
            <span className="prox-fecha">Próxima: Sin fechas</span>
            <span>→</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <button id="btnMesAnterior" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 id="tituloMes" className="text-xl font-bold text-brand-navy min-w-[180px] text-center sm:text-left">
              Agosto 2026
            </h2>
            <button id="btnMesSiguiente" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">Calendario interactivo de vinculación ciudadana</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <button className="filtro-btn bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full" data-filtro="dia_empleo">● Día Empleo</button>
          <button className="filtro-btn bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full" data-filtro="modulo_movil">● Módulo</button>
          <button className="filtro-btn bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full" data-filtro="feria_empleo">● Feria</button>
          <button className="filtro-btn bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full" data-filtro="capacitacion">● Taller</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 text-center font-bold text-xs text-slate-400 mb-2">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
        <span>Dom</span>
      </div>
      <div id="calendarioGrid" className="grid grid-cols-7 gap-3" />
    </section>
  );
}