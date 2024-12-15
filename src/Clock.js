import React, { useState, useEffect } from 'react';
import './App.css'; // Importar el archivo de estilos

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontarse el componente
  }, []);

  return (
    <div className="clock">
      {time}
    </div>
  );
};

export default Clock;
