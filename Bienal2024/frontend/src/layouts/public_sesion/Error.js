import React from 'react';


function Error() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
       <h1 style={{fontSize: '48px',color: 'rgba(0, 170, 255, 0.7)',fontWeight: 'bold' }}>ERROR 404 - PÁGINA NO ENCONTRADA</h1>
       <img src="https://i.ibb.co/VJs4VKv/error.png" alt="Error" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}

export default Error;