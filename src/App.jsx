import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componentes
import Header from "./components/common/Header";
import Hero from "./components/common/Hero";
import PortalEmpleadoBanner from "./components/common/PortalEmpleadoBanner";
import EspacioCiudadano from "./components/common/EspacioCiudadano";
import BannerCv from "./components/common/BannerCv";
import OpcionesCv from "./components/common/OpcionesCv";
import AgendaMunicipal from "./components/common/AgendaMunicipal";
import ContactoDudas from "./components/common/ContactoDudas";
import Footer from "./components/common/Footer";
import MenuFlontal from "./components/common/MenuFlontal";
import AsistenteVirtual from "./components/common/AsistenteVirtual";
import AccessibilityBar from "./components/accessibility/AccessibilityBar";
import { GeoPortal } from "./components/GeoPortal";

import GeneradorCv from "./components/common/GeneradorCv";
import Login from "./components/common/Login";

export default function App() {
  return (
    <AuthProvider>
      <ContenidoApp />
    </AuthProvider>
  );
}

// Componente interno para consumir el AuthContext
function ContenidoApp() {
  const [vistaActual, setVistaActual] = useState("inicio");
  const [mostrarAsistente, setMostrarAsistente] = useState(true);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);
  const [mostrarPerfilModal, setMostrarPerfilModal] = useState(false);

  // Extraemos las funciones y el estado desde tu AuthContext
  const { usuario, logout, actualizarPerfil } = useAuth();

  // Estados locales para el formulario de perfil del usuario
  const [formDataPerfil, setFormDataPerfil] = useState({
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    correo: "",
    calle: "",
    numero: "",
    colonia: "",
    codigo_postal: "",
    celular: "",
  });

  // Sincronizar datos del usuario cuando carguen o cambien
  useEffect(() => {
    if (usuario) {
      setFormDataPerfil({
        nombre: usuario.nombre || "",
        primer_apellido: usuario.primer_apellido || "",
        segundo_apellido: usuario.segundo_apellido || "",
        correo: usuario.correo || "",
        calle: usuario.calle || "",
        numero: usuario.numero || "",
        colonia: usuario.colonia || "",
        codigo_postal: usuario.codigo_postal || "",
        celular: usuario.celular || "",
      });
    }
  }, [usuario]);

  const handleGuardarPerfil = async (e) => {
    e.preventDefault();
    if (!usuario?.curp) {
      alert("No se encontró el CURP del usuario para actualizar.");
      return;
    }
    const resultado = await actualizarPerfil(usuario.curp, formDataPerfil);
    if (resultado.ok) {
      alert("¡Perfil actualizado con éxito en la base de datos!");
      setMostrarPerfilModal(false);
    } else {
      alert(resultado.mensaje || "Error al actualizar perfil");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative">
      
      {/* Header conectado a las acciones de sesión */}
      <Header 
        onNavegar={setVistaActual} 
        usuario={usuario}
        onAbrirLogin={() => setMostrarLoginModal(true)} 
        onAbrirPerfil={() => setMostrarPerfilModal(true)}
        onCerrarSesion={logout}
      />

      <main className="flex-grow">
        {vistaActual === "inicio" && (
          <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10">
              <PortalEmpleadoBanner onAbrirLogin={() => setMostrarLoginModal(true)} />
              <BannerCv onIrAOpcionesCv={() => setVistaActual("opciones-cv")} />
              <EspacioCiudadano onIrAGeoPortal={() => setVistaActual("geoportal")} />
              <AgendaMunicipal />
              <ContactoDudas />
            </div>
          </>
        )}

        {vistaActual === "geoportal" && (
          <GeoPortal onVolverInicio={() => setVistaActual("inicio")} />
        )}

        {vistaActual === "opciones-cv" && (
          <OpcionesCv onIrAFormulario={() => setVistaActual("formulario-cv")} />
        )}

        {vistaActual === "formulario-cv" && (
          <GeneradorCv onVolverOpciones={() => setVistaActual("opciones-cv")} />
        )}
      </main>

      {/* Modal de Login */}
      <Login 
        isOpen={mostrarLoginModal} 
        onClose={() => setMostrarLoginModal(false)} 
      />

      {/* Modal de Mi Perfil (Para completar/editar datos) */}
      {mostrarPerfilModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex",
          justifyContent: "center", alignItems: "center", zIndex: 99999, padding: "20px"
        }}>
          <div style={{
            position: "relative", maxWidth: "600px", width: "100%",
            maxHeight: "90vh", overflowY: "auto", padding: "30px",
            borderRadius: "16px", backgroundColor: "#ffffff", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
          }}>
            <button 
              type="button" 
              onClick={() => setMostrarPerfilModal(false)} 
              style={{
                position: "absolute", top: "15px", right: "20px", background: "none",
                border: "none", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", color: "#6b7280"
              }}
            >
              &times;
            </button>

            <h2 style={{ color: "#0d3c75", marginBottom: "8px", fontSize: "1.5rem", fontWeight: "800" }}>Completar o Editar Perfil</h2>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "20px" }}>
              Actualiza tus datos para tus postulaciones en el sistema del municipio.
            </p>

            <form onSubmit={handleGuardarPerfil} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "4px", color: "#374151" }}>NOMBRE</label>
                  <input 
                    type="text" 
                    value={formDataPerfil.nombre}
                    onChange={(e) => setFormDataPerfil({...formDataPerfil, nombre: e.target.value})}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "4px", color: "#374151" }}>CORREO</label>
                  <input 
                    type="email" 
                    value={formDataPerfil.correo}
                    onChange={(e) => setFormDataPerfil({...formDataPerfil, correo: e.target.value})}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "4px", color: "#374151" }}>CALLE</label>
                  <input 
                    type="text" 
                    value={formDataPerfil.calle}
                    onChange={(e) => setFormDataPerfil({...formDataPerfil, calle: e.target.value})}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "4px", color: "#374151" }}>NÚMERO</label>
                  <input 
                    type="text" 
                    value={formDataPerfil.numero}
                    onChange={(e) => setFormDataPerfil({...formDataPerfil, numero: e.target.value})}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "bold", marginBottom: "4px", color: "#374151" }}>CELULAR</label>
                  <input 
                    type="tel" 
                    value={formDataPerfil.celular}
                    onChange={(e) => setFormDataPerfil({...formDataPerfil, celular: e.target.value})}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
                    maxLength="10"
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                <button
                  type="button"
                  onClick={() => setMostrarPerfilModal(false)}
                  style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 20px", borderRadius: "6px", border: "none", background: "#0d3c75", color: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />

      {!mostrarAsistente && (
        <button
          onClick={() => setMostrarAsistente(true)}
          className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
          title="Activar Asistente / Guía Virtual"
        >
          <span>🤖</span> Asistente Virtual
        </button>
      )}

      {mostrarAsistente && (
        <>
          <MenuFlontal />
          <AsistenteVirtual 
            vistaActual={vistaActual} 
            onCerrar={() => setMostrarAsistente(false)} 
          />
        </>
      )}

      <AccessibilityBar />
    </div>
  );
}