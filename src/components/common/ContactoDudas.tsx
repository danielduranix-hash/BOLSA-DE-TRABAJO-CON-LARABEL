import React from "react";
import { 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Send 
} from "lucide-react";

export default function ContactoDudas() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8" id="seccionDudas">
      <div className="bg-white rounded-4xl border border-slate-200/90 shadow-soft-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy via-brand-blue to-brand-deep text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-4 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Atención Ciudadana Directa
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              ¿Tienes preguntas sobre vacantes o tu registro?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
              Nuestro equipo de orientadores laborales municipales te acompaña en cada paso para que encuentres tu mejor opción de empleo o capacitación.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Respuesta en menos de 24 horas hábiles</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Asesoría gratuita, confidencial y sin intermediarios</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span>Teléfono oficial: (999) 928 69 77</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>Mérida, Yucatán</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Portal Seguro
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight flex items-center gap-2">
              ¿Qué dudas tienes?
            </h2>
          </div>
          <div className="hidden mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3" id="alertaErrorDudas">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <span className="font-medium" id="textoErrorDudas">Todos los campos son obligatorios. Por favor revisa la información marcada.</span>
          </div>
          <div className="hidden mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3" id="alertaExitoDudas">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">¡Tu consulta ha sido enviada exitosamente! Nos pondremos en contacto muy pronto.</span>
          </div>
          <form className="space-y-4 sm:space-y-5" id="formDudas" noValidate>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="dudaNombre">
                Nombre completo <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:border-brand-navy transition-all overflow-hidden">
                <input className="w-full px-4 py-3 bg-transparent border-0 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:ring-0" id="dudaNombre" name="nombre" placeholder="Ej. Andrea Morales García" type="text" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="dudaCorreo">
                  Correo electrónico <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:border-brand-navy transition-all overflow-hidden">
                  <input className="w-full px-4 py-3 bg-transparent border-0 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:ring-0" id="dudaCorreo" name="correo" placeholder="nombre@ejemplo.com" type="email" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="dudaConfirmCorreo">
                  Confirmación de correo <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:border-brand-navy transition-all overflow-hidden">
                  <input className="w-full px-4 py-3 bg-transparent border-0 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:ring-0" id="dudaConfirmCorreo" name="confirmCorreo" placeholder="Confirma tu correo" type="email" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="dudaTelefono">
                Teléfono <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:border-brand-navy transition-all overflow-hidden">
                <input className="w-full px-4 py-3 bg-transparent border-0 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:ring-0" id="dudaTelefono" maxLength={10} name="telefono" placeholder="Ej. 9991234567" type="tel" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5" htmlFor="dudaComentarios">
                Comentarios <span className="text-rose-500">*</span>
              </label>
              <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 focus-within:bg-white focus-within:border-brand-navy transition-all overflow-hidden">
                <textarea className="w-full px-4 py-3 bg-transparent border-0 text-slate-800 placeholder:text-slate-400 text-sm outline-none focus:ring-0 resize-none" id="dudaComentarios" name="comentarios" placeholder="Escribe detalladamente tu consulta, dudas sobre vacantes o asesoría..." rows={3} defaultValue={""} />
              </div>
            </div>
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-navy focus:ring-brand-navy/20 cursor-pointer" id="checkTerminos" name="terminos" type="checkbox" />
                <span className="text-xs sm:text-sm text-slate-600 leading-snug">
                  He leído y acepto los{" "}
                  <a className="font-bold text-emerald-600 hover:text-emerald-700 underline transition-colors" href="http://www.merida.gob.mx/avisoprivacidad/" target="_blank" rel="noopener noreferrer">
                    términos y condiciones
                  </a>{" "}
                  y el aviso de privacidad simplificado del municipio.
                </span>
              </label>
            </div>
            <div className="pt-3">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-deep text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-brand-navy/25 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]" id="btnEnviarDudas" type="submit">
                <span>Enviar consulta</span>
                <Send className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}