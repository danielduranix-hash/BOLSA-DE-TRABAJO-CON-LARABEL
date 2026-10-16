import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import psycopg2
from psycopg2.extras import RealDictCursor
from passlib.context import CryptContext

# 1. Cargar las variables de entorno desde el archivo .env
load_dotenv()

# 2. Configurar la API Key desde el archivo .env
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("Error: La variable GROQ_API_KEY no está configurada en el archivo .env")

# 3. Configuración de la base de datos PostgreSQL
DB_CONFIG = {
    "dbname": os.getenv("DB_NAME", "cv_builder_db"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "Moises#510"),
    "host": os.getenv("DB_HOST", "localhost"),
    "port": os.getenv("DB_PORT", "5432")
}

app = FastAPI(title="Backend Completo - Sistema Empleo y CV con IA")

# Permite peticiones desde el navegador (HTML/JS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELOS PYDANTIC ---
class PeticionLogin(BaseModel):
    correo: str
    password: str

class PeticionRegistro(BaseModel):
    curp: str | None = ""
    nombre: str
    primer_apellido: str | None = ""
    segundo_apellido: str | None = ""
    correo: str
    password: str
    fecha_nacimiento: str | None = None
    sexo: str | None = "O"

class PeticionActualizarPerfil(BaseModel):
    curp: str
    nombre: str | None = None
    primer_apellido: str | None = None
    segundo_apellido: str | None = None
    correo: str | None = None
    fecha_nacimiento: str | None = None
    edad: int | None = None
    sexo: str | None = None
    estado_civil: str | None = None
    calle: str | None = None
    letra_calle: str | None = None
    numero: str | None = None
    letra_numero: str | None = None
    poblacion: str | None = None
    colonia: str | None = None
    codigo_postal: str | None = None
    telefono_fijo: str | None = None
    celular: str | None = None
    discapacidad: str | None = None
    es_nuevo_comienzo: bool | None = False
    tipo_apoyo: str | None = None
    contacto_nombre: str | None = None
    contacto_parentesco: str | None = None
    credencial_folio: str | None = None
    credencial_vencimiento: str | None = None

class PeticionMejorar(BaseModel):
    texto: str
    seccion: str
    idioma: str = "es"

@app.get("/")
def inicio():
    return {"mensaje": "¡El servidor FastAPI con PostgreSQL y Groq IA está funcionando correctamente!"}

@app.get("/api/probar-conexion")
def probar_conexion():
    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                # Consultamos los correos existentes en la tabla
                cursor.execute("SELECT correo FROM usuarios;")
                usuarios = cursor.fetchall()
                return {
                    "conexion": "¡Exitosa!",
                    "total_usuarios": len(usuarios),
                    "correos_registrados": [u["correo"] for u in usuarios]
                }
    except Exception as err:
        return {
            "conexion": "Fallida",
            "error": str(err)
        }
# --- ENDPOINT DE LOGIN ---
@app.post("/api/login")
def login_usuario(datos: PeticionLogin):
    correo_clean = datos.correo.strip().lower()
    
    if not correo_clean or not datos.password.strip():
        raise HTTPException(status_code=400, detail="Por favor ingresa correo y contraseña.")

    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                # Buscamos al usuario únicamente por correo
                cursor.execute(
                    """
                    SELECT * 
                    FROM usuarios 
                    WHERE LOWER(correo) = %s
                    """,
                    (correo_clean,)
                )
                usuario = cursor.fetchone()

                # Truncamos a 72 bytes por la limitación de bcrypt
                password_plano = datos.password.strip()[:72]

                # Si no existe el usuario o la contraseña encriptada NO coincide
                if not usuario or not pwd_context.verify(password_plano, usuario["password_hash"]):
                    raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos.")

                # Limpiamos el hash de la respuesta por seguridad antes de enviarlo al frontend
                if "password_hash" in usuario:
                    del usuario["password_hash"]

                return {
                    "exito": True,
                    "mensaje": "Inicio de sesión exitoso",
                    "usuario": usuario
                }
    except HTTPException:
        raise
    except Exception as err:
        print(f"🔴 Error al autenticar: {str(err)}")
        raise HTTPException(status_code=500, detail=f"Error al autenticar: {str(err)}")

# --- ENDPOINT DE REGISTRO ---
@app.post("/api/registro")
def registrar_usuario(datos: PeticionRegistro):
    correo_clean = datos.correo.strip().lower()
    
    if not correo_clean or not datos.password.strip() or not datos.nombre.strip():
        raise HTTPException(status_code=400, detail="Faltan campos obligatorios (nombre, correo o contraseña).")

    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute("SELECT curp FROM usuarios WHERE LOWER(correo) = %s", (correo_clean,))
                if cursor.fetchone():
                    raise HTTPException(status_code=400, detail="El correo electrónico ya está registrado.")

                # Truncamos a 72 bytes y encriptamos la contraseña de forma segura
                password_plano = datos.password.strip()[:72]
                password_encriptado = pwd_context.hash(password_plano)

                cursor.execute(
                    """
                    INSERT INTO usuarios (curp, nombre, primer_apellido, segundo_apellido, correo, password_hash, fecha_nacimiento, sexo)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING curp, nombre, primer_apellido, segundo_apellido, correo
                    """,
                    (
                        datos.curp.strip().upper() if datos.curp else None,
                        datos.nombre.strip(),
                        datos.primer_apellido.strip() if datos.primer_apellido else "",
                        datos.segundo_apellido.strip() if datos.segundo_apellido else "",
                        correo_clean,
                        password_encriptado, # <--- Aquí guardamos el hash seguro
                        datos.fecha_nacimiento if datos.fecha_nacimiento else None,
                        datos.sexo if datos.sexo else "O"
                    )
                )
                nuevo_usuario = cursor.fetchone()
                conn.commit()

                return {
                    "exito": True,
                    "mensaje": "Usuario registrado exitosamente",
                    "usuario": nuevo_usuario
                }
    except HTTPException:
        raise
    except Exception as err:
        print(f"🔴 Error al registrar: {str(err)}")
        raise HTTPException(status_code=500, detail=f"Error interno al registrar usuario: {str(err)}")

# --- ENDPOINT PARA OBTENER PERFIL ---
@app.get("/api/perfil/{id_usuario}")
def obtener_perfil(id_usuario: str):
    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(
                    "SELECT * FROM usuarios WHERE LOWER(curp) = %s OR LOWER(correo) = %s",
                    (id_usuario.lower(), id_usuario.lower())
                )
                usuario = cursor.fetchone()
                if not usuario:
                    raise HTTPException(status_code=404, detail="Usuario no encontrado.")
                
                if "password_hash" in usuario:
                    del usuario["password_hash"]

                return {"exito": True, "usuario": usuario}
    except HTTPException:
        raise
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Error al obtener perfil: {str(err)}")

# --- ENDPOINT PARA ACTUALIZAR PERFIL ---
@app.put("/api/perfil/{id_usuario}")
def actualizar_perfil(id_usuario: str, datos: PeticionActualizarPerfil):
    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(
                    """
                    UPDATE usuarios SET
                        nombre = COALESCE(%s, nombre),
                        primer_apellido = COALESCE(%s, primer_apellido),
                        segundo_apellido = COALESCE(%s, segundo_apellido),
                        correo = COALESCE(%s, correo),
                        fecha_nacimiento = COALESCE(%s, fecha_nacimiento),
                        sexo = COALESCE(%s, sexo),
                        calle = COALESCE(%s, calle),
                        numero = COALESCE(%s, numero),
                        colonia = COALESCE(%s, colonia),
                        codigo_postal = COALESCE(%s, codigo_postal),
                        celular = COALESCE(%s, celular)
                    WHERE LOWER(curp) = %s OR LOWER(correo) = %s
                    RETURNING *
                    """,
                    (
                        datos.nombre,
                        datos.primer_apellido,
                        datos.segundo_apellido,
                        datos.correo,
                        datos.fecha_nacimiento,
                        datos.sexo,
                        datos.calle,
                        datos.numero,
                        datos.colonia,
                        datos.codigo_postal,
                        datos.celular,
                        id_usuario.lower(),
                        id_usuario.lower()
                    )
                )
                usuario_actualizado = cursor.fetchone()
                conn.commit()

                if not usuario_actualizado:
                    raise HTTPException(status_code=404, detail="No se pudo actualizar el usuario.")

                if "password_hash" in usuario_actualizado:
                    del usuario_actualizado["password_hash"]

                return {"exito": True, "actualizado": True, "usuario": usuario_actualizado}
    except HTTPException:
        raise
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Error al actualizar perfil: {str(err)}")

# --- ENDPOINT DE OPTIMIZACIÓN CON IA (GROQ) ---
@app.post("/api/mejorar-cv")
async def mejorar_cv(datos: PeticionMejorar):
    if not datos.texto.strip():
        raise HTTPException(status_code=400, detail="El texto no puede estar vacío.")

    prompts = {
        "experiencia": "Eres un experto en reclutamiento. Transforma la idea recibida en viñetas de experiencia laboral profesionales (•), usando verbos de acción.",
        "formacion": "Organiza y da formato profesional a la sección de educación.",
        "competencias": "Clasifica las habilidades en Técnicas y Blandas para un currículum."
    }

    system_prompt = prompts.get(datos.seccion, "Optimiza y profesionaliza este texto para un Currículum Vitae.")

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gemma2-9b-it",  
                    "messages": [
                        {"role": "system", "content": f"{system_prompt} Responde en idioma: {datos.idioma}."},
                        {"role": "user", "content": datos.texto}
                    ],
                    "temperature": 0.5
                }
            )

            res_json = response.json()

            if response.status_code != 200:
                mensaje_error = res_json.get("error", {}).get("message", "Error en la API de Groq")
                raise HTTPException(status_code=response.status_code, detail=f"Error de Groq: {mensaje_error}")

            texto_generado = res_json["choices"][0]["message"]["content"]

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error de conexión con Groq: {str(e)}")

    try:
        with psycopg2.connect(**DB_CONFIG) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO historial_ia (seccion, texto_original, texto_generado) VALUES (%s, %s, %s)",
                    (datos.seccion, datos.texto, texto_generado)
                )
                conn.commit()
    except Exception:
        pass 

    return {"resultado": texto_generado}