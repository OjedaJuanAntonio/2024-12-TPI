import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Main from './main/Main';
import QrExpirado from './user_profile/QrExpirado';

const MainComponent = () => {
  const { currentUrl } = useParams();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true); // Inicializamos como válido por defecto

  useEffect(() => {
    try {
      // Decodificar la hora desde el currentUrl (base64)
      const decodedTime = atob(currentUrl);
      const decodedTimeInMs = parseInt(decodedTime, 10); // Convertir a milisegundos

      const currentTime = Date.now();
      const timeDiff = (currentTime - decodedTimeInMs) / 1000; // Diferencia en segundos

      if (timeDiff >= 30) {
        // Si la diferencia es mayor a 30 segundos, marcar como inválido (expirado)
        setIsValid(false);
        navigate('/expired');
      }
    } catch (error) {
      // Si ocurre un error en la decodificación o la comparación, redirigir a error
      setIsValid(false);
      navigate('/error');
    }
  }, [currentUrl, navigate]);

  // Si no es válido, muestra un mensaje de error o redirige a otro componente
  return (
    <div>
      {isValid ? (
        <Main />
      ) : (
        <QrExpirado/>
      )}
    </div>
  );
};

export default MainComponent;
