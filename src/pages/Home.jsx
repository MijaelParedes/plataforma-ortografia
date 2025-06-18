import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Plataforma Ortográfica <span className="text-indigo-600">con IA</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Fortalece tu escritura con tecnología inteligente y actividades personalizadas.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link
          to="/estudiante"
          className="px-6 py-3 bg-indigo-600 text-white !text-white text-lg font-semibold rounded-xl shadow-md transform transition duration-300 hover:-translate-y-1 hover:-rotate-6 hover:bg-indigo-700"
        >
          Soy estudiante
        </Link>

        <Link
          to="/docente"
          className="px-6 py-3 bg-emerald-600 text-white !text-white text-lg font-semibold rounded-xl shadow-md transform transition duration-300 hover:-translate-y-1 hover:-rotate-6 hover:bg-emerald-700"
        >
          Soy docente
        </Link>

        </div>
      </div>
    </motion.div>
  );
}