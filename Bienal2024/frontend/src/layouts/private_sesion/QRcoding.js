import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const DynamicQRCode = ({ url = "http://localhost:3000", Countdown = 10000 }) => {
  const [Url, setUrl] = useState(''); 

  const encodeToBase64 = () => {
    const Time = Date.now().toString(); 
    return btoa(Time); // Codifica la marca de tiempo en base64
  };

  useEffect(() => {
    const setDif = () => {
      const base64Time = encodeToBase64();
      setUrl(base64Time);
    };

    // Actualiza el QR a intervalos definidos por `Countdown`
    const interval = setInterval(setDif, Countdown);

    // Inicializa el valor del QR al cargar
    setDif();

    // Limpia el intervalo cuando se desmonta el componente
    return () => clearInterval(interval);
  }, [Countdown]);

  return (
    <div>
      {/* Concatenamos la URL base con Url y la pasamos al QR */}
      <QRCode value={`${url}/${Url}`} bgColor="transparent" />
      <h2>Escanea el QR</h2>
    </div>
  );
};

export default DynamicQRCode;
