import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Main from './main/Main';
import QrExpirado from './user_profile/QrExpirado';
import Error from "../Error"

const MainComponent = () => {
  const { currentUrl } = useParams();
  const [isValid, setIsValid] = useState(true); 
  const [setError, setSetError] = useState(false); 

  useEffect(() => {
    try {
      const decodedTime = atob(currentUrl);
      const decodedTimeMin = parseInt(decodedTime, 10); 
      
      if (isNaN(decodedTimeMin)) {
        setSetError(true); 
        return;}
      
      const currentTime = Date.now();
      const timeDiff = (currentTime - decodedTimeMin) / 1000;
      if (timeDiff >= 30) {setIsValid(false);}

    } catch (error) {  setSetError(true);}}, [currentUrl]);

    if (setError) {
        return <Error />; 
    }

  return (
    <div>
      {isValid ? ( <Main />) : (<QrExpirado/>)}
    </div>
  );
};

export default MainComponent;
