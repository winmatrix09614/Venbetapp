import React from 'react';
import './LoadingScreen.css';

function LoadingScreen({ theme }) {
  const txt = (theme && theme.ui && theme.ui.loading) || 'Загрузка приложения...';
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{txt}</p>
    </div>
  );
}

export default LoadingScreen;