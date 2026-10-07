import React, { useState, useEffect } from "react";
import "../../styles/formulario-cv.css";

// 1. DICCIONARIOS Y CONFIGURACIÓN GLOBAL
const TRADUCCIONES = {
  es: { exp: "Experiencia Laboral", form: "Formación Académica", comp: "Competencias", idio: "Idiomas", act: "Actividades Extracurriculares", fecha: "Fecha de nacimiento: " },
  en: { exp: "Work Experience", form: "Education", comp: "Skills", idio: "Languages", act: "Extracurricular Activities", fecha: "Date of birth: " },
  fr: { exp: "Expérience Professionnelle", form: "Formation", comp: "Compétences", idio: "Langues", act: "Activités Extracurriculaires", fecha: "Date de naissance: " },
  de: { exp: "Berufserfahrung", form: "Ausbildung", comp: "Kenntnisse", idio: "Sprachen", act: "Außerschulische Aktivitäten", fecha: "Geburtsdatum: " }
};

const LISTA_IDIOMAS_BASE = ["Español", "Inglés", "Alemán", "Ruso", "Francés", "Italiano", "Portugués", "Chino Mandarín"];

const TITULOS_PASOS = [
  "1. Datos personales",
  "2. Experiencia",
  "3. Formación",
  "4. Competencias",
  "5. Idiomas",
  "6. Actividades extracurriculares",
  "7. Elige el diseño de tu CV"
];

export default function GeneradorCv() {
  // 2. ESTADO GENERAL
  const [pasoActual, setPasoActual] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeVoiceTarget, setActiveVoiceTarget] = useState(null);

  // Datos del Formulario
  const [formData, setFormData] = useState({
    idiomaCv: "es",
    nombre: "",
    apellidos: "",
    profesion: "",
    correo: "",
    telefono: "",
    localidad: "",
    fechaNacimiento: "",
    linkedin: "",
    github: "",
    perfilProfesional: "",
    expEmpresa: "",
    expPuesto: "",
    expFechas: "",
    experienciaTexto: "",
    formacionTexto: "",
    competenciasTexto: "",
    actividadesTexto: "",
    colorTema: "#2563eb",
    disenoCv: "clasico",
    idiomas: [{ nombre: "Español", nivel: "Nativo" }]
  });

  // Clave dinámica para LocalStorage
  const getStorageKey = () => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo") || sessionStorage.getItem("usuarioActivo");
    if (usuarioGuardado) {
      try {
        const user = JSON.parse(usuarioGuardado);
        const idUnico = user.curp || user.correo || user.id;
        if (idUnico) return `progresoCV_${idUnico.toString().toLowerCase().trim()}`;
      } catch (e) {
        console.error("Error leyendo usuario de sesión:", e);
      }
    }
    return "cv_builder_draft";
  };

  // Cargar datos guardados al montar
  useEffect(() => {
    const key = getStorageKey();
    const draft = localStorage.getItem(key);

    if (draft) {
      try {
        const data = JSON.parse(draft);
        setFormData((prev) => ({ ...prev, ...data }));
        if (data.pasoActual) setPasoActual(data.pasoActual);
      } catch (e) {
        console.error("Error restaurando borrador:", e);
      }
    } else {
      const usuarioGuardado = localStorage.getItem("usuarioActivo") || sessionStorage.getItem("usuarioActivo");
      if (usuarioGuardado) {
        try {
          const user = JSON.parse(usuarioGuardado);
          const nombreCompleto = `${user.nombre || ""} ${user.primer_apellido || ""} ${user.segundo_apellido || ""}`.trim();
          setFormData((prev) => ({
            ...prev,
            nombre: user.nombre || nombreCompleto,
            correo: user.correo || "",
            telefono: user.celular || user.telefono_fijo || ""
          }));
        } catch (e) {
          console.error("Error autocompletando datos:", e);
        }
      }
    }
  }, []);

  // Guardar cambios en LocalStorage
  useEffect(() => {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify({ ...formData, pasoActual }));
  }, [formData, pasoActual]);

  // Manejador de entradas de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      const filtered = value.replace(/[^0-9+ ]/g, "");
      setFormData((prev) => ({ ...prev, [name]: filtered }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Navegación entre pasos
  const cambiarPaso = (nuevoPaso) => {
    if (nuevoPaso >= 1 && nuevoPaso <= TITULOS_PASOS.length) {
      setPasoActual(nuevoPaso);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Gestión de idiomas
  const handleAgregarIdioma = () => {
    setFormData((prev) => ({
      ...prev,
      idiomas: [...prev.idiomas, { nombre: "Inglés", nivel: "Intermedio" }]
    }));
  };

  const handleRemoveIdioma = (index) => {
    if (formData.idiomas.length > 1) {
      setFormData((prev) => ({
        ...prev,
        idiomas: prev.idiomas.filter((_, i) => i !== index)
      }));
    }
  };

  const handleIdiomaChange = (index, field, value) => {
    const nuevosIdiomas = [...formData.idiomas];
    nuevosIdiomas[index][field] = value;
    setFormData((prev) => ({ ...prev, idiomas: nuevosIdiomas }));
  };

  // Optimización IA (FastAPI)
  const optimizarConIA = async (fieldTarget, seccion) => {
    const textoOriginal = formData[fieldTarget]?.trim();
    if (!textoOriginal) {
      alert("Escribe algo en la casilla antes de optimizar con IA.");
      return;
    }

    const confirmar = window.confirm(
      "💡 Nota importante sobre el asistente IA:\n\n" +
        "La optimización generada ajustará el texto para mantener un tamaño ideal para tu CV.\n\n" +
        "¿Deseas continuar?"
    );

    if (!confirmar) return;

    setLoadingAI(true);
    const reglasFormato = {
      experiencia: "Resume en máximo 5 puntos (bullet points) profesionales y concisos.",
      formacion: "Resume en máximo 2 líneas claras (Título, Institución, Año).",
      competencias: "Presenta una lista breve de competencias clave (máximo 6).",
      actividades: "Resume en máximo 2 puntos breves las actividades o logros principales."
    };

    const promptRestringido = `${reglasFormato[seccion] || "Sé conciso y breve."}\n\nTexto original:\n${textoOriginal}`;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/mejorar-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: promptRestringido,
          seccion: seccion,
          idioma: formData.idiomaCv
        })
      });

      const data = await response.json();
      if (response.ok) {
        const textoLimpio = data.resultado.replace(/\*\*/g, "");
        setFormData((prev) => ({ ...prev, [fieldTarget]: textoLimpio }));
      } else {
        alert("Error del Servidor: " + (data.detail || "No se pudo optimizar el texto."));
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar con el servidor de IA (http://127.0.0.1:8000).");
    } finally {
      setLoadingAI(false);
    }
  };

  // Reconocimiento de Voz
  const handleVoiceInput = (targetField) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Tu navegador no soporta el reconocimiento de voz.");
      return;
    }

    if (isListening && activeVoiceTarget === targetField) {
      setIsListening(false);
      setActiveVoiceTarget(null);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    const mapaIdiomas = { es: "es-ES", en: "en-US", fr: "fr-FR", de: "de-DE" };
    recognition.lang = mapaIdiomas[formData.idiomaCv] || "es-ES";

    recognition.onstart = () => {
      setIsListening(true);
      setActiveVoiceTarget(targetField);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({
        ...prev,
        [targetField]: prev[targetField] ? `${prev[targetField]} ${transcript}` : transcript
      }));
    };

    recognition.onerror = () => {
      setIsListening(false);
      setActiveVoiceTarget(null);
    };

    recognition.onend = () => {
      setIsListening(false);
      setActiveVoiceTarget(null);
    };

    recognition.start();
  };

  // Descargar PDF usando el diálogo de impresión nativo del navegador
  const descargarPDF = () => {
    window.print();
  };

  const t = TRADUCCIONES[formData.idiomaCv] || TRADUCCIONES.es;

  const renderFechaNacimiento = () => {
    if (!formData.fechaNacimiento) return `${t.fecha}N/A`;
    const partes = formData.fechaNacimiento.split("-");
    return partes.length === 3
      ? `${t.fecha}${partes[2]}/${partes[1]}/${partes[0]}`
      : `${t.fecha}${formData.fechaNacimiento}`;
  };

  const renderEncabezadoExp = () => {
    const partes = [formData.expPuesto, formData.expEmpresa, formData.expFechas].filter(Boolean);
    return partes.length > 0 ? partes.join(" | ") : "";
  };

  return (
    <div className="generador-cv-wrapper" style={{ "--cv-theme-color": formData.colorTema }}>
      {/* BARRA DE PROGRESO */}
      <div className="top-progress-container">
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar"
            style={{ width: `${(pasoActual / TITULOS_PASOS.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-info">
          <span className="step-counter">Paso {pasoActual} de {TITULOS_PASOS.length}</span>
          <span className="step-title">{TITULOS_PASOS[pasoActual - 1]}</span>
        </div>
      </div>

      {/* LAYOUT PRINCIPAL */}
      <div className="main-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-menu">
            {TITULOS_PASOS.map((titulo, idx) => {
              const numStep = idx + 1;
              return (
                <button
                  key={numStep}
                  type="button"
                  className={`nav-item ${pasoActual === numStep ? "active" : ""}`}
                  onClick={() => cambiarPaso(numStep)}
                >
                  {titulo}
                </button>
              );
            })}
          </div>
        </aside>

        {/* CONTENEDOR FORMULARIO */}
        <main className="form-container">
          <form id="cvForm" onSubmit={(e) => e.preventDefault()}>
            {/* PASO 1 */}
            {pasoActual === 1 && (
              <div className="step-content active">
                <h3>Datos Personales</h3>
                <div className="form-group">
                  <label>Idioma del CV</label>
                  <select name="idiomaCv" className="custom-select" value={formData.idiomaCv} onChange={handleChange}>
                    <option value="es">Español</option>
                    <option value="en">Inglés (English)</option>
                    <option value="fr">Francés (Français)</option>
                    <option value="de">Alemán (Deutsch)</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre(s)</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej. Juan" />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Ej. Pérez" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Profesión / Título corto</label>
                  <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} placeholder="Ej. Desarrollador Web" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="ejemplo@correo.com" />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+52 999 000 0000" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ubicación / Ciudad</label>
                    <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} placeholder="Mérida, Yucatán" />
                  </div>
                  <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>LinkedIn (Opcional)</label>
                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="linkedin.com/in/usuario" />
                  </div>
                  <div className="form-group">
                    <label>GitHub / Portfolio (Opcional)</label>
                    <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="github.com/usuario" />
                  </div>
                </div>
                <div className="form-group voice-input-container">
                  <label>Perfil Profesional / Resumen</label>
                  <textarea name="perfilProfesional" rows="3" value={formData.perfilProfesional} onChange={handleChange} placeholder="Breve resumen de tu perfil profesional..."></textarea>
                  <div className="button-actions">
                    <button type="button" className={`btn-voice ${isListening && activeVoiceTarget === "perfilProfesional" ? "listening" : ""}`} onClick={() => handleVoiceInput("perfilProfesional")}>
                      {isListening && activeVoiceTarget === "perfilProfesional" ? "🛑 Detener" : "🎤 Hablar"}
                    </button>
                    <button type="button" className="btn-ai" disabled={loadingAI} onClick={() => optimizarConIA("perfilProfesional", "experiencia")}>
                      ✨ Optimizar con IA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2 */}
            {pasoActual === 2 && (
              <div className="step-content active">
                <h3>Experiencia Laboral</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Empresa</label>
                    <input type="text" name="expEmpresa" value={formData.expEmpresa} onChange={handleChange} placeholder="Nombre de la empresa" />
                  </div>
                  <div className="form-group">
                    <label>Puesto</label>
                    <input type="text" name="expPuesto" value={formData.expPuesto} onChange={handleChange} placeholder="Ej. Líder Técnico" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Fechas / Periodo</label>
                  <input type="text" name="expFechas" value={formData.expFechas} onChange={handleChange} placeholder="Ej. Ene 2020 - Presente" />
                </div>
                <div className="form-group voice-input-container">
                  <label>Descripción de responsabilidades y logros</label>
                  <textarea name="experienciaTexto" rows="5" value={formData.experienciaTexto} onChange={handleChange} placeholder="Logros principales, tecnologías utilizadas..."></textarea>
                  <div className="button-actions">
                    <button type="button" className={`btn-voice ${isListening && activeVoiceTarget === "experienciaTexto" ? "listening" : ""}`} onClick={() => handleVoiceInput("experienciaTexto")}>
                      {isListening && activeVoiceTarget === "experienciaTexto" ? "🛑 Detener" : "🎤 Hablar"}
                    </button>
                    <button type="button" className="btn-ai" disabled={loadingAI} onClick={() => optimizarConIA("experienciaTexto", "experiencia")}>
                      ✨ Optimizar con IA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3 */}
            {pasoActual === 3 && (
              <div className="step-content active">
                <h3>Formación Académica</h3>
                <div className="form-group voice-input-container">
                  <label>Estudios / Títulos académicos</label>
                  <textarea name="formacionTexto" rows="4" value={formData.formacionTexto} onChange={handleChange} placeholder="Ingeniería en Sistemas - Instituto Tecnológico (2019-2023)"></textarea>
                  <div className="button-actions">
                    <button type="button" className={`btn-voice ${isListening && activeVoiceTarget === "formacionTexto" ? "listening" : ""}`} onClick={() => handleVoiceInput("formacionTexto")}>
                      {isListening && activeVoiceTarget === "formacionTexto" ? "🛑 Detener" : "🎤 Hablar"}
                    </button>
                    <button type="button" className="btn-ai" disabled={loadingAI} onClick={() => optimizarConIA("formacionTexto", "formacion")}>
                      ✨ Optimizar con IA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 4 */}
            {pasoActual === 4 && (
              <div className="step-content active">
                <h3>Competencias y Habilidades</h3>
                <div className="form-group voice-input-container">
                  <label>Habilidades técnicas y blandas</label>
                  <textarea name="competenciasTexto" rows="4" value={formData.competenciasTexto} onChange={handleChange} placeholder="React, JavaScript, C#, Trabajo en equipo, Git..."></textarea>
                  <div className="button-actions">
                    <button type="button" className={`btn-voice ${isListening && activeVoiceTarget === "competenciasTexto" ? "listening" : ""}`} onClick={() => handleVoiceInput("competenciasTexto")}>
                      {isListening && activeVoiceTarget === "competenciasTexto" ? "🛑 Detener" : "🎤 Hablar"}
                    </button>
                    <button type="button" className="btn-ai" disabled={loadingAI} onClick={() => optimizarConIA("competenciasTexto", "competencias")}>
                      ✨ Optimizar con IA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 5 */}
            {pasoActual === 5 && (
              <div className="step-content active">
                <h3>Idiomas</h3>
                <div className="idiomas-wrapper">
                  {formData.idiomas.map((item, index) => (
                    <div key={index} className="idioma-row">
                      <select
                        className="custom-select select-idioma-nombre"
                        value={item.nombre}
                        onChange={(e) => handleIdiomaChange(index, "nombre", e.target.value)}
                      >
                        {LISTA_IDIOMAS_BASE.map((idioma) => (
                          <option key={idioma} value={idioma}>{idioma}</option>
                        ))}
                      </select>
                      <select
                        className="custom-select select-idioma-nivel"
                        value={item.nivel}
                        onChange={(e) => handleIdiomaChange(index, "nivel", e.target.value)}
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                        <option value="Nativo">Nativo</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveIdioma(index)}
                        style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "1.2rem" }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn-secondary" onClick={handleAgregarIdioma}>
                  + Agregar otro idioma
                </button>
              </div>
            )}

            {/* PASO 6 */}
            {pasoActual === 6 && (
              <div className="step-content active">
                <h3>Actividades Extracurriculares</h3>
                <div className="form-group voice-input-container">
                  <label>Voluntariados, certificaciones o proyectos</label>
                  <textarea name="actividadesTexto" rows="4" value={formData.actividadesTexto} onChange={handleChange} placeholder="Voluntario en eventos tecnológicos, proyectos open source..."></textarea>
                  <div className="button-actions">
                    <button type="button" className={`btn-voice ${isListening && activeVoiceTarget === "actividadesTexto" ? "listening" : ""}`} onClick={() => handleVoiceInput("actividadesTexto")}>
                      {isListening && activeVoiceTarget === "actividadesTexto" ? "🛑 Detener" : "🎤 Hablar"}
                    </button>
                    <button type="button" className="btn-ai" disabled={loadingAI} onClick={() => optimizarConIA("actividadesTexto", "actividades")}>
                      ✨ Optimizar con IA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 7 */}
            {pasoActual === 7 && (
              <div className="step-content active">
                <h3>Diseño y Descarga</h3>
                <div className="form-group">
                  <label>Color Principal del Tema</label>
                  <input type="color" name="colorTema" value={formData.colorTema} onChange={handleChange} style={{ width: "60px", height: "40px", cursor: "pointer", border: "none" }} />
                </div>

                <div className="templates-grid">
                  <label className={`template-card ${formData.disenoCv === "clasico" ? "active" : ""}`}>
                    <input type="radio" name="disenoCv" value="clasico" checked={formData.disenoCv === "clasico"} onChange={handleChange} />
                    <h4>Clásico</h4>
                    <p>Estilo tradicional y limpio, ideal para entornos corporativos.</p>
                  </label>
                  <label className={`template-card ${formData.disenoCv === "moderno" ? "active" : ""}`}>
                    <input type="radio" name="disenoCv" value="moderno" checked={formData.disenoCv === "moderno"} onChange={handleChange} />
                    <h4>Moderno</h4>
                    <p>Encabezado contrastado y acentos de color contemporáneos.</p>
                  </label>
                  <label className={`template-card ${formData.disenoCv === "minimalista" ? "active" : ""}`}>
                    <input type="radio" name="disenoCv" value="minimalista" checked={formData.disenoCv === "minimalista"} onChange={handleChange} />
                    <h4>Minimalista</h4>
                    <p>Tipografía clásica, líneas finas y enfoque tipográfico en serif.</p>
                  </label>
                </div>

                <button type="button" className="btn-primary btn-large" onClick={descargarPDF}>
                  📄 Descargar CV en PDF
                </button>
              </div>
            )}

            {/* NAVEGACIÓN */}
            <div className="form-navigation">
              {pasoActual > 1 && (
                <button type="button" className="btn-secondary" onClick={() => cambiarPaso(pasoActual - 1)}>
                  Anterior
                </button>
              )}
              {pasoActual < TITULOS_PASOS.length && (
                <button type="button" className="btn-primary" style={{ marginLeft: "auto" }} onClick={() => cambiarPaso(pasoActual + 1)}>
                  Siguiente
                </button>
              )}
            </div>
          </form>
        </main>

        {/* PREVISUALIZACIÓN VISTA PREVIA (A4) */}
        <section className="preview-container">
          <div className="preview-wrapper">
            <div id="cvPaper" className={`cv-paper t-${formData.disenoCv}`}>
              <div className="cv-header">
                <div className="cv-header-text">
                  <h1>{formData.nombre || formData.apellidos ? `${formData.nombre} ${formData.apellidos}`.trim() : "Tu Nombre Aquí"}</h1>
                  <h2>{formData.profesion || "Tu Profesión"}</h2>
                  <div className="cv-contact-info">
                    {formData.correo || "correo@ejemplo.com"} | {formData.telefono || "+00 0000 0000"} | {formData.localidad || "Ciudad, País"}
                    {formData.linkedin && <span> | {formData.linkedin}</span>}
                    {formData.github && <span> | {formData.github}</span>}
                  </div>
                  <div className="cv-birthdate">{renderFechaNacimiento()}</div>
                </div>
              </div>

              {formData.perfilProfesional && (
                <div className="cv-section">
                  <h3>Perfil Profesional</h3>
                  <p className="preserve-whitespace">{formData.perfilProfesional}</p>
                </div>
              )}

              <div className="cv-section">
                <h3>{t.exp}</h3>
                {renderEncabezadoExp() && <p style={{ fontWeight: "bold" }}>{renderEncabezadoExp()}</p>}
                <p className="preserve-whitespace">{formData.experienciaTexto || "Tu experiencia aparecerá aquí..."}</p>
              </div>

              <div className="cv-section">
                <h3>{t.form}</h3>
                <p className="preserve-whitespace">{formData.formacionTexto || "Tu educación aparecerá aquí..."}</p>
              </div>

              <div className="cv-section">
                <h3>{t.comp}</h3>
                <p className="preserve-whitespace">{formData.competenciasTexto || "Tus habilidades destacadas..."}</p>
              </div>

              <div className="cv-section">
                <h3>{t.idio}</h3>
                <ul className="cv-list">
                  {formData.idiomas.map((item, idx) => (
                    <li key={idx}>{item.nombre} - {item.nivel}</li>
                  ))}
                </ul>
              </div>

              {formData.actividadesTexto && (
                <div className="cv-section">
                  <h3>{t.act}</h3>
                  <p className="preserve-whitespace">{formData.actividadesTexto}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}