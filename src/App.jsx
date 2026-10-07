import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";

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

// 1. IMPORTAR EL COMPONENTE DEL FORMULARIO/GENERADOR DE CV
import GeneradorCv from "./components/common/GeneradorCv"; // Asegúrate de ajustar la ruta correcta del archivo

export default function App() {
  // Estado de navegación: "inicio", "geoportal", "opciones-cv", "formulario-cv"
  const [vistaActual, setVistaActual] = useState("inicio");

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative">
        
        {/* Header con navegación de vuelta al inicio */}
        <Header onNavegar={setVistaActual} />

        <main className="flex-grow">
          {vistaActual === "inicio" && (
            <>
              <Hero />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10">
                <PortalEmpleadoBanner />
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

          {/* 2. AÑADIR LA VISTA PARA EL FORMULARIO/ASISTENTE DE CV */}
          {vistaActual === "formulario-cv" && (
            <GeneradorCv onVolverOpciones={() => setVistaActual("opciones-cv")} />
          )}
        </main>

        {/* Pie de página institucional */}
        <Footer />

        {/* Herramientas y asistentes flotantes */}
        <MenuFlontal />
        <AsistenteVirtual vistaActual={vistaActual} />
        <AccessibilityBar />
      </div>
    </AuthProvider>
  );
}