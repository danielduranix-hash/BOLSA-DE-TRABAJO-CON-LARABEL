import React, { useState } from "react";

export default function Login({ isOpen, onClose, onLoginExitoso }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [cargando, setCargando] = useState(false);

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setCargando(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
      });

      const data = await response.json();

      if (response.ok && data.exito) {
        localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));
        
        if (onLoginExitoso) {
          onLoginExitoso(data.usuario);
        }

        setCorreo("");
        setPassword("");
        if (onClose) onClose();
        
        window.location.reload(); // Recarga para aplicar la sesión en toda la app
      } else {
        setErrorMsg(data.detail || data.mensaje || "Correo o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error de red o conexión:", err);
      setErrorMsg("No se pudo conectar con el servidor backend en http://localhost:8000.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        position: "relative",
        maxWidth: "400px",
        width: "100%",
        margin: "20px",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
        backgroundColor: "#ffffff"
      }}>
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          type="button"
          style={{
            position: "absolute",
            top: "12px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#6b7280"
          }}
        >
          ✕
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#111827" }}>Iniciar Sesión</h2>
        
        {errorMsg && (
          <div style={{ color: "#dc2626", backgroundColor: "#fef2f2", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "0.9rem" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#374151" }}>Correo Electrónico:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "500", color: "#374151" }}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: cargando ? "not-allowed" : "pointer",
              opacity: cargando ? 0.7 : 1
            }}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}