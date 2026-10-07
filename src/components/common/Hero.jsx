import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-12 md:py-20 border-b border-slate-100">
      
      {/* Imagen de fondo con overlay suave */}
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-center opacity-15 pointer-events-none mix-blend-multiply"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')` 
        }}
        aria-hidden="true"
      />

      {/* Degradado para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge Superior: Plataforma Laboral */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#70be3b] text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[#70be3b] animate-pulse" />
            <span>PLATAFORMA LABORAL</span>
          </div>

          {/* Título Principal con Degradado Azul a Verde */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight text-[#0d3c75]">
            Tu próximo paso profesional{' '}
            <span className="bg-gradient-to-r from-[#0d3c75] via-[#2e7d32] to-[#70be3b] bg-clip-text text-transparent block sm:inline">
              comienza aquí y ahora
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
            Empresas y dependencias locales de Mérida buscan talento joven como el tuyo.
            Explora vacantes de primer empleo, prácticas profesionales, medio tiempo
            e inclusión laboral con un proceso ágil y accesible.
          </p>

          {/* Badges Inferiores */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <CheckCircle2 size={16} className="text-[#70be3b]" />
              <span>Empresas Verificadas en Mérida</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <ShieldCheck size={16} className="text-[#0d3c75]" />
              <span>100% Gratuito y Municipal</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;