import React from 'react';
import { motion } from 'framer-motion';

export default function Teacher() {
  return (

    <motion.div
    className="p-10 text-center"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    >
    <h2 className="text-2xl font-semibold">Área del Docente</h2>
    <p className="mt-4">Aquí aparecerán los reportes y estadísticas de los estudiantes.</p>
    </motion.div>
  
    
  );
}