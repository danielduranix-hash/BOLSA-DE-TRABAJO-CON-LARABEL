import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const API_URL = 'http://localhost:8000/api'; 

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('usuarioActivo');
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = async (correo, password, recordar) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
      });
      const data = await res.json();
      if (res.ok && (data.exito || data.usuario)) {
        const user = data.usuario || data;
        setUsuario(user);
        localStorage.setItem('usuarioActivo', JSON.stringify(user));
        
        if (recordar) localStorage.setItem('correoRecordado', correo);
        else localStorage.removeItem('correoRecordado');
        
        return { ok: true, user };
      }
      return { ok: false, mensaje: data.detail || data.mensaje || 'Error al iniciar sesión' };
    } catch (err) {
      console.error("Error de conexión:", err);
      return { ok: false, mensaje: 'Error de conexión con el servidor en el puerto 8000' };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioActivo');
  };

  const actualizarPerfil = async (curp, datosActualizados) => {
    try {
      const curpValida = curp || usuario?.curp;

      const res = await fetch(`${API_URL}/perfil/${curpValida}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados),
      });

      const data = await res.json();

      if (res.ok && (data.exito || data.actualizado || res.status === 200)) {
        const usuarioNuevo = { ...usuario, ...datosActualizados };
        setUsuario(usuarioNuevo);
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo));

        const claveBorrador = `progresoCV_${curpValida.toString().toLowerCase().trim()}`;
        localStorage.removeItem(claveBorrador);
        localStorage.removeItem('cv_builder_draft');

        return { ok: true };
      }

      return { ok: false, mensaje: data.detail || data.mensaje || 'Error al actualizar en la base de datos' };
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      const usuarioNuevo = { ...usuario, ...datosActualizados };
      setUsuario(usuarioNuevo);
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo));
      return { ok: true, mensaje: 'Guardado localmente en sesión' };
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, actualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}