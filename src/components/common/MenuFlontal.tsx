import React from "react";

export default function MenuFlotante() {
  return (
    <aside className="floating-menu fixed right-4 top-1/3 z-30 flex flex-col gap-2.5">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 p-2 flex flex-col gap-1.5">
        <a
          href="#"
          id="btnVolverInicio"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-brand-navy font-semibold text-xs sm:text-sm transition-all"
        >
          <span className="text-base">🏠</span>
          <span className="font-bold">Inicio</span>
        </a>
        <a
          href="#"
          id="btnIrGeoPortal"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-semibold text-xs sm:text-sm transition-all"
        >
          <span className="text-base">🗺️</span>
          <span className="font-bold">GeoPortal</span>
        </a>
      </div>
    </aside>
  );
}