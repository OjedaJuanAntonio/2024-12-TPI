import React from "react";
import { useLocation } from "react-router-dom";
import { jwtVerify } from "jose";
import CardVote from "./CardVote";
import QrExpirado from "../user_profile/QrExpirado";

const Votacion = () => {
  const location = useLocation();

  // Extraer el token directamente desde el pathname
  const extractTokenFromPath = () => {
    const pathParts = location.pathname.split("/"); // Divide el pathname por "/"
    return pathParts[pathParts.length - 1]; // Toma el último segmento como el token
  };

  // Decodifica el JWT y retorna el ID de la escultura
  const decodeJWT = async (token) => {
    const secretKey = new TextEncoder().encode("your_secret_key"); // Clave secreta
    try {
      const { payload } = await jwtVerify(token, secretKey); // Verifica y decodifica el token
      return payload.id; // Retorna el ID de la escultura
    } catch (error) {
      console.error("Error verificando el token:", error.message);
      return null;
    }
  };

  const [idEscultura, setIdEscultura] = React.useState(null);

  React.useEffect(() => {
    const processToken = async () => {
      const token = extractTokenFromPath(); // Extrae el token desde el pathname
      if (token) {
        const id = await decodeJWT(token); // Decodifica el token
        setIdEscultura(id); // Guarda el ID en el estado
      }
    };

    processToken();          
  }, []);
  console.log(idEscultura)
  return idEscultura ? (
    <CardVote idEscultura={idEscultura} />
  ) : (
    <QrExpirado/>
  );
};

export default Votacion;
