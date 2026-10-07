import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ShieldCheck, 
  Bot, 
  Check, 
  ArrowRight, 
  Sliders, 
  FileEdit, 
  Edit3, 
  FileUp, 
  CheckCircle2, 
  Building2, 
  FileText 
} from 'lucide-react';

export const OpcionesCv = ({ onIrAFormulario }) => {
  const navigate = useNavigate();

  const handleIrAAsistente = () => {
    navigate('/crear-cv/asistente');
    if (onIrAFormulario) onIrAFormulario('asistente');
  };

  const handleIrAManual = () => {
    navigate('/crear-cv/manual');
    if (onIrAFormulario) onIrAFormulario('manual');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6 w-full animate-fade-in">
      
      {/* Encabezado de Sección */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>PLATAFORMA LABORAL MÉRIDA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0d3c75] tracking-tight leading-tight">
          ¿Cómo deseas crear tu{' '}
          <span className="text-[#70be3b]">currículum hoy?</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Elige la opción que mejor se adapte a tu ritmo, tiempo y objetivos laborales.
        </p>
      </div>

      {/* Opción 1: Crear con Asistente IA (Destacada) */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border-2 border-[#70be3b]/80 relative space-y-5 transition-transform hover:-translate-y-0.5">
        
        {/* Etiquetas Superiores */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Zap size={14} /> Recomendado • 3 min
          </span>
          <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <ShieldCheck size={14} className="text-[#70be3b]" />
            Alta efectividad
          </span>
        </div>

        {/* Título e Icono */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0d3c75] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#0d3c75]/20">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0d3c75] leading-snug">
              Crear con Asistente IA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Rápido, guiado y optimizado por inteligencia artificial
            </p>
          </div>
        </div>

        {/* Beneficios */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#70be3b] flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <span>Carga tu PDF o perfil de LinkedIn con 1 clic</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#70be3b] flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <span>7 columnas de información importante</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#70be3b] flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <span>Optimizado para vacantes locales y filtros ATS</span>
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={handleIrAAsistente}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#0d3c75] hover:bg-[#0a2a52] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0d3c75]/20 transition-all cursor-pointer border-0"
        >
          <span>Empezar con Asistente IA</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Opción 2: Creación Manual */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-5 transition-transform hover:-translate-y-0.5">
        
        {/* Etiquetas Superiores */}
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            <Sliders size={14} /> Control Total • 12 min
          </span>
          <span className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">
            MODO PASO A PASO
          </span>
        </div>

        {/* Título e Icono */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0d3c75] flex items-center justify-center shrink-0">
            <FileEdit size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0d3c75] leading-snug">
              Creación Manual Paso a Paso
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Controla cada sección a tu propio ritmo
            </p>
          </div>
        </div>

        {/* Beneficios */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <span>Llenado modular sección por sección</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <span>Plantillas aprobadas por reclutadores</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
              <Check size={14} />
            </div>
            <span>Edición y descarga a tu propio ritmo</span>
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={handleIrAManual}
          className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0d3c75] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <span>Iniciar modo manual</span>
          <Edit3 size={16} className="text-[#70be3b]" />
        </button>
      </div>

      {/* Opción 3: ¿Ya tienes un CV previo? */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#70be3b] flex items-center justify-center shrink-0">
            <FileUp size={20} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0d3c75]">
              ¿Ya tienes un CV previo?
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Sube tu archivo PDF o DOCX para auto-completar.
            </p>
          </div>
        </div>
        <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0d3c75] font-semibold text-xs transition-colors shrink-0">
          Examinar
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
        </label>
      </div>

      {/* Footer / Sellos de Confianza */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-semibold text-slate-500 text-center">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 size={16} className="text-[#70be3b]" />
          100% Gratuito y Municipal
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Building2 size={16} className="text-[#0d3c75]" />
          Empresas de Mérida
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FileText size={16} className="text-[#70be3b]" /> PDF Inmediato
        </span>
      </div>

    </div>
  );
};

export default OpcionesCv;