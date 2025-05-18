import React from 'react';

function AppMinimal() {
  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Application Minimale</h1>
      <p>Cette version minimale de l'application devrait se charger même en cas de problème avec le routeur ou les composants plus complexes.</p>
      
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px'
      }}>
        <h2>Test de fonctionnement</h2>
        <p>Si vous voyez ce message, l'application React fonctionne correctement.</p>
        <p>Heure actuelle: {new Date().toLocaleTimeString()}</p>
        
        <button
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Le JavaScript fonctionne!')}
        >
          Cliquez-moi
        </button>
      </div>
    </div>
  );
}

export default AppMinimal; 