import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const DynamicQRCode = ({ url = "http://localhost:3000/2", Countdown = 10000 }) => {
  const [Url, setUrl] = useState(''); 

  const encodeToBase64 = () => {
    const Time = Date.now().toString(); 
    return btoa(Time); 
  };

  useEffect(() => {
    const setDif = () => {
      const base64Time = encodeToBase64();
      setUrl(base64Time);
    };

    const interval = setInterval(setDif, Countdown);
    setDif();

    return () => clearInterval(interval);
  }, [Countdown]);

  return (
    <div>
      <QRCode value={`${url}/${Url}`} bgColor="transparent" />
      <h2>Escanea el QR</h2>
    </div>
  );
};

export default DynamicQRCode;
