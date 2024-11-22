import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const DynamicQRCode = ({ url, Countdown = 10000, data }) => {
  const [qrValue, setQrValue] = useState('');

  const encodeTimestampToBase64 = () => {
    const timestamp = Date.now().toString(); // Genera un timestamp dinámico
    return btoa(timestamp); // Codifica el timestamp en base64
  };

  useEffect(() => {
    const updateQRCode = () => {
      const base64Timestamp = encodeTimestampToBase64(); // Codifica el timestamp
      const formattedData =
        typeof data === 'object' && data.id ? data.id : JSON.stringify(data); // Extrae el id si existe
      const finalUrl = `${url}/${base64Timestamp}&${formattedData}`; // Construye el enlace final
      setQrValue(finalUrl);
    };

    const interval = setInterval(updateQRCode, Countdown);
    updateQRCode(); // Genera el QR inicial

    return () => clearInterval(interval);
  }, [Countdown, url, data]);

  return (
    <div>
      <QRCode value={qrValue} bgColor="transparent" />
      <h2>Escanea el QR</h2>
    </div>
  );
};

export default DynamicQRCode;
