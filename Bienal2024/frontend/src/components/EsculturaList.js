import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EsculturasList = () => {
  const [esculturas, setEsculturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEsculturas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/escultores/obt_escult/');
        setEsculturas(response.data);  
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar las esculturas:', error);
        setLoading(false);
      }
    };

    fetchEsculturas(); 
  }, []);

  if (loading) {
    return <div>Cargando esculturas...</div>;
  }

  return (
    <div>
      <h2>Lista de Esculturas</h2>
      <ul>
        {esculturas.map((escultura) => (
          <li key={escultura.id}>
            <h3>{escultura.Titulo}</h3>
            <p><strong>nombre:</strong> {escultura.Titulo}</p>
            <p><strong>Fecha de Creación:</strong> {escultura.Fecha_creacion}</p>
            <p><strong>Intención:</strong> {escultura.Intencion}</p>
            <p><strong>Votos:</strong> {escultura.Cant_votos}</p>
            <p><strong>Temática:</strong> {escultura.Tematica}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EsculturasList;
