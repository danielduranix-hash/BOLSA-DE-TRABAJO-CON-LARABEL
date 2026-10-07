import React, { useEffect, useState } from 'react';

const CONFIG_MESES = [
  { nombre: "Agosto 2026", mesIndex: 7, totalDias: 31, offsetDias: 5 },
  { nombre: "Septiembre 2026", mesIndex: 8, totalDias: 30, offsetDias: 1 },
];

export const CalendarioEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [mesIdx, setMesIdx] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/eventos")
      .then((res) => res.json())
      .then((data) => {
        if (data.exito) setEventos(data.eventos || []);
      })
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);

  const mesActual = CONFIG_MESES[mesIdx];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          disabled={mesIdx === 0}
          onClick={() => setMesIdx(mesIdx - 1)}
          className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <h2 className="text-xl font-bold">{mesActual.nombre}</h2>
        <button
          disabled={mesIdx === CONFIG_MESES.length - 1}
          onClick={() => setMesIdx(mesIdx + 1)}
          className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Renderizado del Offset */}
        {Array.from({ length: mesActual.offsetDias }).map((_, i) => (
          <div key={`offset-${i}`} className="min-h-[75px]" />
        ))}

        {/* Renderizado de los Días */}
        {Array.from({ length: mesActual.totalDias }).map((_, idx) => {
          const dia = idx + 1;
          const ev = eventos.find((e) => {
            const fecha = new Date(e.fecha_evento);
            return fecha.getUTCDate() === dia && fecha.getUTCMonth() === mesActual.mesIndex;
          });

          return (
            <div
              key={dia}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[75px] border ${
                ev ? 'bg-blue-900 text-white font-bold' : 'bg-slate-50 text-slate-400'
              }`}
            >
              <span className="text-base">{dia}</span>
              {ev && (
                <span className="text-[10px] truncate max-w-[90px] mt-1 text-center">
                  {ev.lugar || ev.titulo}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};