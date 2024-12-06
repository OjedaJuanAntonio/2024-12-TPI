import React from 'react';


function Error() {
  return (
    <div style={{ textAlign: 'center', padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
       <h1 style={{ fontSize: '48px', color: 'rgba(0, 170, 255, 0.7)', fontWeight: 'bold' }}>ERROR 404 - PÁGINA NO ENCONTRADA</h1>
       <img src="https://i.ibb.co/Dgrp70Q/Captura-de-pantalla-2024-12-04-a-la-s-19-31-22.png" alt="Error" style={{ maxWidth: '80%', height: 'auto' }} />
    </div>
  );
}

export default Error;
