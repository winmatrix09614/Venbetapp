import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Загрузка приложения...</p>
    </div>
  );
}

export default LoadingScreen;