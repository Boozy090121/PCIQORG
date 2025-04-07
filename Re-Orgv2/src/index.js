import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1976d2' }}>Organization Manager</h1>
        <p style={{ color: '#666' }}>React Application is working! This is the most basic version.</p>
        <button style={{
          background: '#1976d2',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Show Organization Chart
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root')); 