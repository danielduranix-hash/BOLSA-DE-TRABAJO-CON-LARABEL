import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
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
      return { ok: false, mensaje: data.mensaje };
    } catch (err) {
      return { ok: false, mensaje: 'Error de conexión con el servidor' };
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioActivo');
  };

  const actualizarPerfil = async (curp, datosActualizados) => {
    try {
      const res = await fetch(`${API_URL}/perfil/${curp}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados),
      });
      const data = await res.json();
      if (res.ok && (data.exito || data.actualizado)) {
        const usuarioNuevo = { ...usuario, ...datosActualizados };
        setUsuario(usuarioNuevo);
        localStorage.setItem('usuarioActivo', JSON.stringify(usuarioNuevo));
        return { ok: true };
      }
      return { ok: false, mensaje: data.mensaje };
    } catch (err) {
      return { ok: false, mensaje: 'Error al conectar con el servidor' };
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, actualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);