// =====================================================
// ENDPOINTS DE GENERADOR DE CV E IA (NODE.JS + GROQ)
// =====================================================
import 'dotenv/config'; 
import Groq from 'groq-sdk';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar cliente de Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Endpoint para optimizar texto del CV mediante IA
app.post('/api/cv/optimizar-ia', async (req, res) => {
  const { seccion, texto } = req.body;

  if (!texto || !texto.trim()) {
    return res.status(400).json({ exito: false, mensaje: 'El texto a optimizar no puede estar vacío.' });
  }

  try {
    const prompt = `Actúa como un reclutador experto y profesional. Optimiza el siguiente texto de un currículum vitae para la sección "${seccion}".
Mejora la redacción, ortografía y estructura para que suene profesional y enfocado en logros. Devuelve UNICAMENTE el texto optimizado sin introducciones, saludos ni notas explicativas:

"${texto}"`;

const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192', // <-- Asegúrate de que diga exactamente esto en server.mjs
      temperature: 0.5,
    });

    const resultado = chatCompletion.choices[0]?.message?.content?.trim() || texto;

    res.json({ exito: true, resultado });
  } catch (error) {
    console.error('🔴 Error al llamar a Groq API:', error);
    res.status(500).json({ exito: false, mensaje: 'Error al procesar la optimización con IA.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});