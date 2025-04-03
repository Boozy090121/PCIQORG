import React from 'react';
import { createRoot } from 'react-dom/client';

// Simple App component
function App() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Simple React App</h1>
      <p>This is a minimal React application to test rendering.</p>
      <button 
        onClick={() => alert('React is working!')}
        style={{
          background: '#4285f4',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test React Interaction
      </button>
    </div>
  );
}

// Render the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Root element not found!');
} 