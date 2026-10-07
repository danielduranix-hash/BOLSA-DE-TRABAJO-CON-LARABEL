import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

const EMPLEOS_DATA = [
  { id: 1, titulo: "Desarrollador Web Frontend", empresa: "Tech Solutions", zona: "Norte", categoria: "Tecnología", lat: 21.015, lng: -89.625 },
  { id: 2, titulo: "Auxiliar Administrativo", empresa: "Grupo Peninsular", zona: "Centro", categoria: "Administración", lat: 20.967, lng: -89.6237 },
  { id: 3, titulo: "Ejecutivo de Ventas", empresa: "Comercializadora del Sur", zona: "Sur", categoria: "Ventas", lat: 20.93, lng: -89.61 },
  { id: 4, titulo: "Técnico de Mantenimiento", empresa: "Servicios Múltiples", zona: "Oriente", categoria: "Servicios", lat: 20.975, lng: -89.58 },
  { id: 5, titulo: "Soporte Técnico", empresa: "Sistemas Mérida", zona: "Poniente", categoria: "Tecnología", lat: 20.97, lng: -89.66 },
];

export const GeoPortal = () => {
  const mapRef = useRef(null);
  const mapaInstance = useRef(null);
  const marcadoresGroup = useRef(null);
  const marcadoresPorId = useRef({});

  const [palabra, setPalabra] = useState('');
  const [zona, setZona] = useState('');
  const [categoria, setCategoria] = useState('');
  const [resultados, setResultados] = useState(EMPLEOS_DATA);

  useEffect(() => {
    if (!mapaInstance.current && mapRef.current) {
      const mapa = L.map(mapRef.current).setView([20.967, -89.6237], 12);
      if (mapa.zoomControl) mapa.zoomControl.setPosition('topright');

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }).addTo(mapa);

      marcadoresGroup.current = L.layerGroup().addTo(mapa);
      mapaInstance.current = mapa;
    }
  }, []);

  const aplicarFiltros = () => {
    const filtrados = EMPLEOS_DATA.filter((item) => {
      const p = palabra.toLowerCase().trim();
      const coincidePalabra = !p || item.titulo.toLowerCase().includes(p) || item.empresa.toLowerCase().includes(p);
      const coincideZona = !zona || item.zona.toLowerCase() === zona.toLowerCase();
      const coincideCat = !categoria || item.categoria.toLowerCase() === categoria.toLowerCase();
      return coincidePalabra && coincideZona && coincideCat;
    });

    setResultados(filtrados);
    actualizarMarcadores(filtrados);
  };

  const actualizarMarcadores = (lista) => {
    if (!marcadoresGroup.current) return;
    marcadoresGroup.current.clearLayers();
    marcadoresPorId.current = {};
    const puntos = [];

    lista.forEach((item) => {
      if (item.lat && item.lng) {
        const marker = L.marker([item.lat, item.lng]);
        marker.bindPopup(`
          <div style="font-family: sans-serif; line-height: 1.3;">
            <strong style="color: #0b3b60; font-size: 0.95rem;">${item.titulo}</strong><br>
            <span style="font-size: 0.85rem; color: #444;">${item.empresa}</span><br>
            <small style="color: #666; font-size: 0.75rem;">📍 ${item.zona} | 🏢 ${item.categoria}</small>
          </div>
        `);
        marcadoresGroup.current.addLayer(marker);
        marcadoresPorId.current[item.id] = marker;
        puntos.push([item.lat, item.lng]);
      }
    });

    if (puntos.length > 0 && mapaInstance.current) {
      mapaInstance.current.fitBounds(puntos, { padding: [40, 40] });
    }
  };

  const enfocarEnMapa = (id) => {
    const marker = marcadoresPorId.current[id];
    if (marker && mapaInstance.current) {
      mapaInstance.current.flyTo(marker.getLatLng(), 15, { duration: 1 });
      marker.openPopup();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Panel de Filtros y Lista */}
      <div className="w-full md:w-1/3 p-4 bg-white shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">GeoPortal de Empleos</h2>
        <input
          type="text"
          placeholder="Buscar empleo o empresa..."
          value={palabra}
          onChange={(e) => setPalabra(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button onClick={aplicarFiltros} className="bg-blue-600 text-white p-2 w-full rounded mb-4">
          Filtrar Vacantes
        </button>

        <p className="text-sm font-semibold mb-2">Se encontraron {resultados.length} empleos</p>
        <div className="space-y-2">
          {resultados.map((item) => (
            <div
              key={item.id}
              onClick={() => enfocarEnMapa(item.id)}
              className="p-3 border rounded cursor-pointer hover:bg-slate-50"
            >
              <div className="font-bold text-blue-900">{item.titulo}</div>
              <div className="text-xs text-slate-500">COL. {item.zona.toUpperCase()}, MERIDA</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor del Mapa */}
      <div className="w-full md:w-2/3 h-full" ref={mapRef} />
    </div>
  );
};