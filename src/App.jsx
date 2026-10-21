import React, { useState } from "react";
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
import PerfilModal from "./components/common/PerfilModal";

import GeneradorCv from "./components/common/GeneradorCv";
import Login from "./components/common/Login";

export default function App() {
  return (
    <AuthProvider>
      <ContenidoApp />
    </AuthProvider>
  );
}

function ContenidoApp() {
  const [vistaActual, setVistaActual] = useState("inicio");
  const [mostrarAsistente, setMostrarAsistente] = useState(true);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);

  const { usuario, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative">
      
      {/* Header conectado */}
      <Header 
        onNavegar={setVistaActual} 
        usuario={usuario}
        onAbrirLogin={() => setMostrarLoginModal(true)} 
        onAbrirPerfil={() => setVistaActual("perfil")}
        onCerrarSesion={logout}
      />

      {/* CONTENIDO PRINCIPAL DINÁMICO */}
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

        {/* VISTA DE PERFIL EXCLUSIVA */}
        {vistaActual === "perfil" && (
          <div className="py-6 bg-slate-50 min-h-screen">
            <PerfilModal 
              isOpen={true} 
              onClose={() => setVistaActual("inicio")} 
            />
          </div>
        )}
      </main>

      {/* Modal de Login */}
      <Login 
        isOpen={mostrarLoginModal} 
        onClose={() => setMostrarLoginModal(false)} 
      />

      {/* EL FOOTER SOLO SE MUESTRA SI NO ESTAMOS EN LA VISTA DE PERFIL */}
      {vistaActual !== "perfil" && <Footer />}

      {!mostrarAsistente && (
        <button
          onClick={() => setMostrarAsistente(true)}
          className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer"
          title="Activar Asistente / Guía Virtual"
        >
          <span>🤖</span> Asistente Virtual
        </button>
      )}

      {mostrarAsistente && vistaActual === "inicio" && (
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