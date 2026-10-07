import React from "react";
import { Sparkles, Check, FileBadge } from "lucide-react";

export default function BannerCv({ onIrAOpcionesCv }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="bannerCV">
      <div className="cv-banner-card rounded-4xl bg-white border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Imagen del Banner */}
        <div className="cv-banner-image lg:col-span-6 order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
              alt="Crear Curriculum Vitae"
              className="w-full h-80 sm:h-96 object-cover object-left-bottom transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-800">IA Activa v2.4</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-[#0d3c75]/90 text-white px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-sm">
              ✨ Plantillas Municipales Validadas
            </div>
          </div>
        </div>

        {/* Contenido Textual */}
        <div className="cv-banner-content lg:col-span-6 order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0d3c75] text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Asistente Inteligente</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0d3c75] tracking-tight leading-tight">
            ¿Necesitas ayuda con tu currículum?
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Genera un CV profesional adaptado a las vacantes del municipio utilizando nuestro asistente inteligente.
          </p>

          <ul className="space-y-3 font-medium text-slate-700 text-sm sm:text-base">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#70be3b] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Optimizado con Inteligencia Artificial según el puesto</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#70be3b] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Formato 100% compatible con filtros de reclutamiento (ATS)</span>
            </li>
          </ul>

          {/* Botón de Acción a la Vista React */}
          <div className="pt-2">
            <button
              onClick={onIrAOpcionesCv}
              className="btn-crear-cv pill-pulse inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0d3c75] hover:bg-[#0a2a52] text-white font-bold text-base transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer border-0"
            >
              <FileBadge className="w-5 h-5 text-[#70be3b]" />
              <span>Crear mi CV con IA</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}