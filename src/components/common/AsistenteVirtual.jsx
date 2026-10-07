import React from "react";

export default function AsistenteVirtual() {
  return (
    <div>
      {/* Fondo / Overlay del tutorial */}
      <div 
        id="tutorialOverlay" 
        className="fixed inset-0 bg-black/50 z-40 hidden" 
      />

      {/* Caja del asistente */}
      <div 
        id="assistantBox" 
        className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 flex flex-col gap-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <strong className="text-slate-800 text-sm font-bold">Guía Virtual</strong>
          </div>
          <button 
            id="btnVoiceRead" 
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            title="Sonido del asistente"
          >
            <i id="iconoAsistenteVoz" className="fa-solid fa-volume-xmark text-xs" />
          </button>
        </div>

        {/* Texto del asistente */}
        <p id="assistantText" className="flex-1 my-2 text-xs text-slate-600 leading-relaxed min-h-[40px]" />

        {/* Botones de acción */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button 
            id="btnSkipTutorial" 
            className="text-xs text-slate-500 font-semibold hover:text-slate-800 transition-colors px-2 py-1"
          >
            Omitir
          </button>
          <div className="flex items-center gap-2">
            <button 
              id="btnPrevStep" 
              className="px-3 py-1.5 rounded-xl bg-slate-500 hover:bg-slate-600 text-white text-xs font-bold transition-all hidden"
            >
              Atrás
            </button>
            <button 
              id="btnNextStep" 
              className="px-4 py-1.5 rounded-xl bg-brand-navy hover:bg-brand-deep text-white text-xs font-bold transition-all shadow-xs"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}