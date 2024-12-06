import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { SignJWT } from "jose";

const DynamicQRCode = ({ url, Countdown = 10000, data }) => {
  const [qrValue, setQrValue] = useState("");

  const generateJWT = async (payload) => {
    const secretKey = new TextEncoder().encode("your_secret_key"); 
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" }) 
      .setExpirationTime("1m") 
      .sign(secretKey); 
    return token;
  };

  useEffect(() => {
    const updateQRCode = async () => {
      const payload = { 
        id: data, 
      };

      const token = await generateJWT(payload); 
      const finalUrl = `${url}/${token}`;
      setQrValue(finalUrl); 
    };

    updateQRCode(); 
    const interval = setInterval(updateQRCode, Countdown); 

    return () => clearInterval(interval); 
  }, [Countdown, url, data]);

  return (
    <div style={{ textAlign: "center" }}>
      <QRCode value={qrValue} bgColor="transparent" />
      <h2>Escanea el QR</h2>
    </div>
  );
};

export default DynamicQRCode;
