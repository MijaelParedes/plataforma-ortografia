import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Student() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');
  const [cargando, setCargando] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('ejercicio'); // 👈 controla qué sección se muestra

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
        const sugerencias = data.matches.map((m) => (
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
      className="relative min-h-screen flex items-start justify-center px-4 py-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Botón de volver al inicio */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 bg-white text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-indigo-100 transition"
      >
        ← Volver al inicio
      </Link>

      {/* Aside de navegación */}
      <aside className="hidden lg:block fixed top-24 left-6 w-64 bg-white rounded-xl shadow-md p-4 space-y-4 z-50">
        <button
          onClick={() => setVistaActiva('ejercicio')}
          className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
            vistaActiva === 'ejercicio'
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
          }`}
        >
          Ejercicio Ortográfico
        </button>
        <button
          onClick={() => setVistaActiva('ruta')}
          className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
            vistaActiva === 'ruta'
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
          }`}
        >
          Ruta de aprendizaje
        </button>
        <button
          onClick={() => setVistaActiva('extras')}
          className={`block w-full text-left px-4 py-2 rounded transition font-medium ${
            vistaActiva === 'extras'
              ? 'bg-yellow-500 text-white'
              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
          }`}
        >
          Más ejercicios prácticos
        </button>
      </aside>

      {/* Contenido central */}
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl space-y-6 text-center ml-0 lg:ml-64">

        {/* Sección: Ejercicio */}
        {vistaActiva === 'ejercicio' && (
          <motion.div
            key="ejercicio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ejercicio Ortográfico</h2>
            <p className="text-lg text-gray-700 mb-4">
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
              className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={cargando || !respuesta.trim()}
            >
              {cargando ? 'Verificando...' : 'Verificar'}
            </button>

            {feedback && (
              <motion.div
                className="mt-6 text-left text-base font-medium text-gray-800 bg-gray-100 p-4 rounded-lg shadow-inner whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {feedback}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Sección: Ruta de aprendizaje */}
        {vistaActiva === 'ruta' && (
          <motion.div
            key="ruta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">Ruta de aprendizaje</h2>
            <p className="text-gray-600 text-lg text-left">
              Aquí irá la guía paso a paso para mejorar la ortografía: errores comunes, reglas clave, actividades progresivas y estrategias de autocorrección. Muy pronto estará disponible.
            </p>
          </motion.div>
        )}

        {/* Sección: Más ejercicios */}
        {vistaActiva === 'extras' && (
          <motion.div
            key="extras"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-yellow-600 mb-4">Más ejercicios prácticos</h2>
            <p className="text-gray-600 text-lg text-left">
              Pronto podrás practicar con oraciones más complejas, párrafos, dictados y juegos interactivos para reforzar tu aprendizaje.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
