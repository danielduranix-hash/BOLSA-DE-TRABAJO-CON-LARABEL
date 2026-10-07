import React, { useState, useEffect } from 'react';

export default function AccessibilityBar() {
    const [panelAbierto, setPanelAbierto] = useState(false);
    const [tabActiva, setTabActiva] = useState('vista');
    const [tamanoTexto, setTamanoTexto] = useState(100);
    const [velocidadVoz, setVelocidadVoz] = useState(1);

    // Estados de switches / toggles
    const [modos, setModos] = useState({
        altoContraste: false,
        modoOscuro: false,
        subrayarEnlaces: false,
        lecturaFacil: false,
        botonesGrandes: false,
        modoLectura: false,
        resaltarTitulos: false,
    });

    // Alternar visibilidad del panel
    const togglePanel = () => setPanelAbierto((prev) => !prev);

    // Manejador de toggles
    const toggleModo = (clave) => {
        setModos((prev) => {
            const nuevoEstado = !prev[clave];
            document.body.classList.toggle(`acc-${clave}`, nuevoEstado);
            return { ...prev, [clave]: nuevoEstado };
        });
    };

    // Cambiar tamaño de texto global
    const cambiarTamano = (delta) => {
        setTamanoTexto((prev) => {
            const nuevo = Math.min(Math.max(prev + delta, 80), 140);
            document.documentElement.style.fontSize = `${nuevo}%`;
            return nuevo;
        });
    };

    return (
        <>
            {/* Botón flotante para abrir el panel de accesibilidad */}
            <button
                id="btnAccesibilidad"
                onClick={togglePanel}
                className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-brand-navy text-white shadow-xl hover:bg-brand-deep hover:scale-110 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-brand-blue/40"
                aria-label="Abrir panel de accesibilidad"
            >
                <i className="fas fa-universal-access text-xl" />
            </button>

            {/* Panel lateral / modal de accesibilidad */}
            {panelAbierto && (
                <div
                    id="panelAccesibilidad"
                    role="dialog"
                    aria-label="Panel de accesibilidad"
                    className="fixed bottom-20 left-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
                >
                    {/* Header */}
                    <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-universal-access text-emerald-400" />
                            <h3 className="font-bold text-base tracking-wide">
                                Herramientas de Accesibilidad
                            </h3>
                        </div>
                        <button
                            onClick={togglePanel}
                            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors text-lg"
                        >
                            ×
                        </button>
                    </div>

                    {/* Navegación por pestañas */}
                    <div className="flex border-b border-slate-100 bg-slate-50 p-1 text-xs font-bold text-slate-600">
                        {[
                            { key: 'vista', icon: '👁️', label: 'Vista' },
                            { key: 'audio', icon: '🎧', label: 'Audio' },
                            { key: 'motriz', icon: '🖱️', label: 'Motriz' },
                            { key: 'cognitiva', icon: '🧠', label: 'Cognitiva' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setTabActiva(tab.key)}
                                className={`flex-1 py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
                                    tabActiva === tab.key
                                        ? 'bg-white text-brand-navy shadow-xs'
                                        : 'hover:bg-slate-200/60'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Contenido según la pestaña activa */}
                    <div className="p-5 space-y-4 text-sm max-h-80 overflow-y-auto">
                        {/* Tab Vista */}
                        {tabActiva === 'vista' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        Tamaño de texto
                                    </label>
                                    <div className="flex items-center justify-between bg-slate-100 rounded-2xl p-1.5">
                                        <button
                                            onClick={() => cambiarTamano(-10)}
                                            className="w-10 h-10 rounded-xl bg-white shadow-xs font-black text-brand-navy hover:bg-slate-50 active:scale-95 transition-all"
                                        >
                                            A-
                                        </button>
                                        <span className="font-bold text-slate-700">
                                            {tamanoTexto}%
                                        </span>
                                        <button
                                            onClick={() => cambiarTamano(10)}
                                            className="w-10 h-10 rounded-xl bg-white shadow-xs font-black text-brand-navy hover:bg-slate-50 active:scale-95 transition-all"
                                        >
                                            A+
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button
                                        onClick={() => toggleModo('altoContraste')}
                                        className={`p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                            modos.altoContraste
                                                ? 'border-brand-navy bg-brand-navy text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        🔲 Alto contraste
                                    </button>
                                    <button
                                        onClick={() => toggleModo('modoOscuro')}
                                        className={`p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                            modos.modoOscuro
                                                ? 'border-brand-navy bg-brand-navy text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        🌙 Modo oscuro
                                    </button>
                                    <button
                                        onClick={() => toggleModo('subrayarEnlaces')}
                                        className={`p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                            modos.subrayarEnlaces
                                                ? 'border-brand-navy bg-brand-navy text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        🔗 Subrayar enlaces
                                    </button>
                                    <button
                                        onClick={() => toggleModo('lecturaFacil')}
                                        className={`p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                            modos.lecturaFacil
                                                ? 'border-brand-navy bg-brand-navy text-white'
                                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        🔤 Lectura fácil
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Tab Audio */}
                        {tabActiva === 'audio' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl font-semibold text-xs text-slate-700 transition-all text-left">
                                        🔊 Leer todo
                                    </button>
                                    <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl font-semibold text-xs text-slate-700 transition-all text-left">
                                        📖 Leer selección
                                    </button>
                                    <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl font-semibold text-xs text-slate-700 transition-all text-left">
                                        ⏸️ Pausar
                                    </button>
                                    <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl font-semibold text-xs text-slate-700 transition-all text-left">
                                        ⏹️ Detener
                                    </button>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                                        <span>Velocidad de voz:</span>
                                        <span>{velocidadVoz}x</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="1.5"
                                        step="0.1"
                                        value={velocidadVoz}
                                        onChange={(e) =>
                                            setVelocidadVoz(parseFloat(e.target.value))
                                        }
                                        className="w-full accent-brand-navy cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Tab Motriz */}
                        {tabActiva === 'motriz' && (
                            <div>
                                <button
                                    onClick={() => toggleModo('botonesGrandes')}
                                    className={`w-full p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                        modos.botonesGrandes
                                            ? 'border-brand-navy bg-brand-navy text-white'
                                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    🔲 Botones grandes
                                </button>
                            </div>
                        )}

                        {/* Tab Cognitiva */}
                        {tabActiva === 'cognitiva' && (
                            <div className="space-y-2">
                                <button
                                    onClick={() => toggleModo('modoLectura')}
                                    className={`w-full p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                        modos.modoLectura
                                            ? 'border-brand-navy bg-brand-navy text-white'
                                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    📖 Modo lectura
                                </button>
                                <button
                                    onClick={() => toggleModo('resaltarTitulos')}
                                    className={`w-full p-3 rounded-2xl border text-left font-semibold text-xs transition-all ${
                                        modos.resaltarTitulos
                                            ? 'border-brand-navy bg-brand-navy text-white'
                                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                                    }`}
                                >
                                    🔦 Resaltar títulos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}