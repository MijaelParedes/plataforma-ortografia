import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Student() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');

  const verificarRespuesta = () => {
    if (respuesta.toLowerCase().includes('h')) {
      setFeedback('✅ ¡Muy bien! Has usado la “h” correctamente.');
    } else {
      setFeedback('❌ Revisa el uso de la “h”. Inténtalo de nuevo.');
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
          Escribe una oración que use correctamente la letra “h”.
        </p>

        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Escribe aquí tu oración..."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />

        <button
          onClick={verificarRespuesta}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition"
        >
          Verificar
        </button>

        {feedback && (
          <motion.div
            className={`text-lg font-medium ${
            feedback.includes('✅') ? 'text-green-700' : 'text-red-600'
            }`}
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