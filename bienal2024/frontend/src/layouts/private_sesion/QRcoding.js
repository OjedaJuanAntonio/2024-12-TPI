import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { SignJWT } from "jose";

const DynamicQRCode = ({ url, Countdown = 10000, data }) => {
  const [qrValue, setQrValue] = useState("");

  // Genera un JWT con el id de la escultura
  const generateJWT = async (payload) => {
    const secretKey = new TextEncoder().encode("your_secret_key"); // Define una clave segura
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" }) // Algoritmo de firma
      .setExpirationTime("1m") // Token válido por 1 minuto
      .sign(secretKey); // Firma el token con la clave secreta
    return token;
  };

  useEffect(() => {
    const updateQRCode = async () => {
      const token = await generateJWT({ id: data }); // Genera un token con el ID de la escultura
      const finalUrl = `${url}/${token}`; // Construye la URL final con el token
      setQrValue(finalUrl); // Establece el valor del QR
    };

    updateQRCode(); // Genera el QR inicial
    const interval = setInterval(updateQRCode, Countdown); // Actualiza el QR periódicamente

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [Countdown, url, data]);

  return (
    <div style={{ textAlign: "center" }}>
      <QRCode value={qrValue} bgColor="transparent" />
      <h2>Escanea el QR</h2>
    </div>
  );
};

export default DynamicQRCode;
