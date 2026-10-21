import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  User, ArrowLeft, Save, MapPin, Shield, CheckCircle2, AlertCircle, 
  Briefcase, GraduationCap, Award, Globe, HeartHandshake 
} from "lucide-react";

export default function PerfilModal({ isOpen, onClose }) {
  const { usuario, actualizarPerfil } = useAuth();
  const [pestanaActiva, setPestanaActiva] = useState("tab-personal");
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  // Estado sincronizado con la base de datos y con los campos que requiere el CV
  const [formData, setFormData] = useState({
    // --- 1. DATOS PERSONALES ---
    correo: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    curp: "",
    fecha_nacimiento: "",
    edad: "",
    sexo: "",
    estado_civil: "",
    profesion: "", // Para el título corto del CV
    perfil_profesional: "", // Resumen profesional

    // --- 2. DOMICILIO Y CONTACTO ---
    calle: "",
    letra_calle: "",
    numero: "",
    letra_numero: "",
    poblacion: "MÉRIDA",
    colonia: "",
    codigo_postal: "",
    telefono: "",
    celular: "",
    linkedin: "",
    github: "",

    // --- 3. EXPERIENCIA LABORAL ---
    ultimo_empresa: "",
    ultimo_puesto: "",
    ultimo_funciones_tiempo: "",
    experiencia_detalle: "",

    // --- 4. FORMACIÓN ACADÉMICA ---
    estudios_grado: "",
    estudios_profesion: "",
    formacion_detalle: "",

    // --- 5. HABILIDADES Y COMPETENCIAS ---
    conocimientos_generales: "",
    habilidades_detalle: "",

    // --- 6. IDIOMAS Y ACTIVIDADES ---
    idiomas_texto: "",
    actividades_texto: "",

    // --- 7. PROGRAMAS Y APOYOS MUNICIPALES ---
    discapacidad: "NINGUNA",
    tiene_discapacidad: false,
    pertenece_grupo_vulnerable: false,
    es_nuevo_comienzo: false,
    tipo_apoyo: ""
  });

  // Precargar datos del usuario cuando abre el expediente
  useEffect(() => {
    if (usuario) {
      setFormData((prev) => ({
        ...prev,
        ...usuario,
        correo: usuario.correo || "",
        nombre: usuario.nombre || "",
        primer_apellido: usuario.primer_apellido || "",
        segundo_apellido: usuario.segundo_apellido || "",
        curp: usuario.curp || "",
        telefono: usuario.telefono || "",
        celular: usuario.celular || "",
        calle: usuario.calle || "",
        numero: usuario.numero || "",
        colonia: usuario.colonia || "",
        codigo_postal: usuario.codigo_postal || usuario.cp || "",
        poblacion: usuario.poblacion || "MÉRIDA",
        profesion: usuario.profesion || usuario.ultimo_puesto || "",
        perfil_profesional: usuario.perfil_profesional || usuario.experiencia_detalle || "",
        experiencia_detalle: usuario.experiencia_detalle || "",
        formacion_detalle: usuario.formacion_detalle || usuario.estudios_profesion || "",
        habilidades_detalle: usuario.habilidades_detalle || usuario.conocimientos_generales || "",
      }));
    }
  }, [usuario, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calcularEdadPerfil = (fecha) => {
    if (!fecha) return;
    const hoy = new Date();
    const cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    setFormData((prev) => ({ ...prev, fecha_nacimiento: fecha, edad: edad }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: "", tipo: "" });

    // Guardar/Actualizar expediente
    const resultado = await actualizarPerfil(usuario.curp, formData);

    setCargando(false);
    if (resultado.ok) {
      setMensaje({ texto: "¡Expediente y Perfil de CV guardados con éxito!", tipo: "exito" });
    } else {
      setMensaje({ texto: resultado.mensaje || "Error al actualizar el expediente.", tipo: "error" });
    }
  };

  const pestañas = [
    { id: "tab-personal", label: "Información Personal", icon: User },
    { id: "tab-domicilio", label: "Domicilio y Redes", icon: MapPin },
    { id: "tab-experiencia", label: "Experiencia Laboral", icon: Briefcase },
    { id: "tab-estudios", label: "Formación Académica", icon: GraduationCap },
    { id: "tab-habilidades", label: "Habilidades e Idiomas", icon: Award },
    { id: "tab-programas", label: "Programas Sociales", icon: Shield },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Botón Volver e Identificador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d3c75] hover:text-[#70be3b] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Volver al Inicio</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0d3c75] tracking-tight">
            Expediente Completo del Ciudadano
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Mantiene actualizada tu información personal, laboral y académica para vincularla directamente con tu CV.
          </p>
        </div>
      </div>

      {/* Alerta de notificación */}
      {mensaje.texto && (
        <div className={`mb-6 p-4 rounded-2xl border text-sm flex items-center gap-3 ${
          mensaje.tipo === "exito" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          {mensaje.tipo === "exito" ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span className="font-semibold">{mensaje.texto}</span>
        </div>
      )}

      {/* Panel Principal */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* SIDEBAR DE PESTAÑAS */}
        <aside className="lg:col-span-3 bg-[#0d3c75] text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-center pb-6 border-b border-white/10 mb-6">
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
                👤
              </div>
              <h2 className="font-extrabold text-base sm:text-lg text-white leading-tight truncate">
                {formData.nombre} {formData.primer_apellido}
              </h2>
              <p className="text-xs text-sky-200 mt-1 truncate">{formData.correo}</p>
              
              <div className="mt-4 text-left bg-white/10 p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] font-bold tracking-wider uppercase text-sky-200 block">CURP</span>
                <span className="text-xs font-mono font-semibold tracking-wider text-white select-all block mt-0.5">
                  {formData.curp || "NO REGISTRADA"}
                </span>
              </div>
            </div>

            {/* Navegación del Perfil */}
            <nav className="space-y-1.5">
              {pestañas.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = pestanaActiva === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPestanaActiva(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-[#38bdf8] text-slate-900 shadow-md"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <IconComponent size={18} className={isActive ? "text-slate-900" : "text-sky-300"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 text-[11px] text-sky-200">
            <p>Plataforma Digital</p>
            <p className="font-semibold text-white">Ayuntamiento de Mérida 2024-2027</p>
          </div>
        </aside>

        {/* ÁREA DE FORMULARIO */}
        <main className="lg:col-span-9 p-6 sm:p-10 bg-slate-50/50 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. INFORMACIÓN PERSONAL */}
            {pestanaActiva === "tab-personal" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-[#0d3c75]">Información Personal</h3>
                  <p className="text-xs text-slate-500">Datos básicos de identificación de tu cuenta.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre(s) *</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primer Apellido *</label>
                    <input type="text" name="primer_apellido" value={formData.primer_apellido} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Segundo Apellido</label>
                    <input type="text" name="segundo_apellido" value={formData.segundo_apellido} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico *</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} required className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">CURP *</label>
                    <input type="text" name="curp" value={formData.curp} readOnly className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 font-mono text-sm cursor-not-allowed" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Profesión / Título Corto</label>
                    <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} placeholder="Ej. Lic. en Administración / Técnico" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Fecha de Nacimiento</label>
                    <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento || ""} onChange={(e) => calcularEdadPerfil(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Edad</label>
                    <input type="number" name="edad" value={formData.edad || ""} readOnly className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-center font-bold text-sm cursor-not-allowed" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Perfil Profesional / Resumen de CV</label>
                  <textarea name="perfil_profesional" rows="3" value={formData.perfil_profesional} onChange={handleChange} placeholder="Resumen corto que aparecerá en el encabezado de tu CV..." className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm resize-none"></textarea>
                </div>
              </div>
            )}

            {/* 2. DOMICILIO Y REDES */}
            {pestanaActiva === "tab-domicilio" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-[#0d3c75]">Domicilio, Teléfonos y Redes</h3>
                  <p className="text-xs text-slate-500">Dirección de residencia y enlaces de contacto profesional.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Calle</label>
                    <input type="text" name="calle" value={formData.calle || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Número</label>
                    <input type="text" name="numero" value={formData.numero || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Colonia</label>
                    <input type="text" name="colonia" value={formData.colonia || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Municipio / Población</label>
                    <input type="text" name="poblacion" value={formData.poblacion || "MÉRIDA"} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono Fijo / Móvil</label>
                    <input type="tel" name="celular" value={formData.celular || formData.telefono || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Código Postal</label>
                    <input type="text" name="codigo_postal" value={formData.codigo_postal || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Perfil LinkedIn (Opcional)</label>
                    <input type="text" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} placeholder="linkedin.com/in/usuario" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">GitHub / Portafolio (Opcional)</label>
                    <input type="text" name="github" value={formData.github || ""} onChange={handleChange} placeholder="github.com/usuario" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* 3. EXPERIENCIA LABORAL */}
            {pestanaActiva === "tab-experiencia" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-[#0d3c75]">Experiencia Laboral</h3>
                  <p className="text-xs text-slate-500">Historial de empleos y responsabilidades anteriores.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Última Empresa o Empleador</label>
                    <input type="text" name="ultimo_empresa" value={formData.ultimo_empresa || ""} onChange={handleChange} placeholder="Ej. Empresa ABC S.A." className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Último Puesto Ocupado</label>
                    <input type="text" name="ultimo_puesto" value={formData.ultimo_puesto || ""} onChange={handleChange} placeholder="Ej. Auxiliar Administrativo" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Periodo / Tiempo Laborado</label>
                  <input type="text" name="ultimo_funciones_tiempo" value={formData.ultimo_funciones_tiempo || ""} onChange={handleChange} placeholder="Ej. Ene 2021 - Mar 2024 (3 años)" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descripción de Funciones y Logros</label>
                  <textarea name="experiencia_detalle" rows="4" value={formData.experiencia_detalle || ""} onChange={handleChange} placeholder="Describe tus principales responsabilidades y tareas..." className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm resize-none"></textarea>
                </div>
              </div>
            )}

            {/* 4. FORMACIÓN ACADÉMICA */}
            {pestanaActiva === "tab-estudios" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-[#0d3c75]">Formación Académica</h3>
                  <p className="text-xs text-slate-500">Grado máximo de estudios y carrera cursada.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Máximo Grado de Estudios</label>
                    <select name="estudios_grado" value={formData.estudios_grado || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm">
                      <option value="">-- Seleccione --</option>
                      <option value="PRIMARIA">Primaria</option>
                      <option value="SECUNDARIA">Secundaria</option>
                      <option value="BACHILLERATO">Bachillerato / Preparatoria</option>
                      <option value="CARRERA TECNICA">Carrera Técnica</option>
                      <option value="LICENCIATURA">Licenciatura / Ingeniería</option>
                      <option value="MAESTRIA">Maestría / Postgrado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Carrera / Profesión Especializada</label>
                    <input type="text" name="estudios_profesion" value={formData.estudios_profesion || ""} onChange={handleChange} placeholder="Ej. Licenciatura en Contaduría" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detalle Académico / Instituciones</label>
                  <textarea name="formacion_detalle" rows="4" value={formData.formacion_detalle || ""} onChange={handleChange} placeholder="Ej. Universidad Autónoma de Yucatán (2018 - 2022) - Titulado" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm resize-none"></textarea>
                </div>
              </div>
            )}

            {/* 5. HABILIDADES, IDIOMAS Y ACTIVIDADES */}
            {pestanaActiva === "tab-habilidades" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-[#0d3c75]">Habilidades, Idiomas y Actividades</h3>
                  <p className="text-xs text-slate-500">Conocimientos generales, competencias e idiomas.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Habilidades y Competencias Destacadas</label>
                  <textarea name="habilidades_detalle" rows="3" value={formData.habilidades_detalle || ""} onChange={handleChange} placeholder="Ej. Manejo de Microsoft Office, trabajo en equipo, atención al cliente..." className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Idiomas</label>
                  <input type="text" name="idiomas_texto" value={formData.idiomas_texto || ""} onChange={handleChange} placeholder="Ej. Español (Nativo), Inglés (Intermedio)" className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Actividades Extracurriculares / Certificaciones</label>
                  <textarea name="actividades_texto" rows="3" value={formData.actividades_texto || ""} onChange={handleChange} placeholder="Ej. Cursos tomados, voluntariados o talleres..." className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm resize-none"></textarea>
                </div>
              </div>
            )}

            {/* 6. PROGRAMAS SOCIALES */}
            {pestanaActiva === "tab-programas" && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-[#0d3c75]">Programas Sociales y Apoyos</h3>
                  <p className="text-xs text-slate-500">Estatus de atención preferencial e inclusión municipal.</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="es_nuevo_comienzo" checked={formData.es_nuevo_comienzo || false} onChange={handleChange} className="w-5 h-5 rounded text-[#0d3c75]" />
                    <span className="text-sm font-bold text-slate-800">Inscrito en el Programa Nuevo Comienzo</span>
                  </label>
                  {formData.es_nuevo_comienzo && (
                    <input type="text" name="tipo_apoyo" value={formData.tipo_apoyo || ""} onChange={handleChange} placeholder="Especificar tipo de apoyo solicitado" className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm" />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="tiene_discapacidad" checked={formData.tiene_discapacidad || false} onChange={handleChange} className="w-5 h-5 rounded text-[#0d3c75]" />
                      <span className="text-sm font-bold text-slate-800">Tiene alguna Discapacidad</span>
                    </label>
                    {formData.tiene_discapacidad && (
                      <input type="text" name="discapacidad" value={formData.discapacidad || ""} onChange={handleChange} placeholder="Especificar discapacidad" className="mt-2 w-full px-4 py-2 rounded-xl border border-slate-200 text-sm" />
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="pertenece_grupo_vulnerable" checked={formData.pertenece_grupo_vulnerable || false} onChange={handleChange} className="w-5 h-5 rounded text-[#0d3c75]" />
                      <span className="text-sm font-bold text-slate-800">Pertenece a Grupo Vulnerable</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* BOTÓN DE GUARDAR */}
            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={cargando}
                className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-[#0d3c75] hover:bg-[#0a2a52] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <Save size={18} className="text-[#70be3b]" />
                <span>{cargando ? "Guardando..." : "Guardar Expediente Completo"}</span>
              </button>
            </div>

          </form>
        </main>

      </div>
    </div>
  );
}