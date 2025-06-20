import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Student() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');
  const [cargando, setCargando] = useState(false);

  const verificarRespuesta = async () => {
    if (!respuesta.trim()) {
      setFeedback('Por favor, escribe una oración.');
      return;
    }

    setCargando(true);
    setFeedback('');

    try {
      const respuestaAPI = await fetch('https://api.languagetoolplus.com/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: respuesta,
          language: 'es',
        }),
      });

      const data = await respuestaAPI.json();

      if (data.matches.length === 0) {
        setFeedback('✅ ¡Muy bien! No se encontraron errores.');
      } else {
        const sugerencias = data.matches.map((m, i) => (
          `• ${m.message} → sugerencia: ${m.replacements?.[0]?.value || 'ninguna'}`
        )).join('\n\n');

        setFeedback(`🔍 Se encontraron ${data.matches.length} posibles errores:\n\n${sugerencias}`);
      }
    } catch (error) {
      console.error('Error con LanguageTool:', error);
      setFeedback('❌ Error al conectar con LanguageTool.');
    } finally {
      setCargando(false);
    }
  };


  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl space-y-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Ejercicio Ortográfico</h2>
        <p className="text-lg text-gray-700">
          Escribe una oración y la IA verificará si contiene errores ortográficos.
        </p>

        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Escribe aquí tu oración..."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />

        <button
          onClick={verificarRespuesta}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={cargando || !respuesta.trim()}
        >
          {cargando ? 'Verificando...' : 'Verificar'}
        </button>

        {feedback && (
          <motion.div
            className="text-lg font-medium text-gray-800 bg-gray-100 p-4 rounded-lg shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {feedback}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
  

}
