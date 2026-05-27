import React from 'react';
import './Header.css';

function Header({ title, onBack, userId, attempts }) {
  return (
    <div className="header">
      <div className="header-left">
        {onBack && (
          <button className="back-button" onClick={onBack} title="Назад">
            ←
          </button>
        )}
      </div>
      <div className="header-center">
        <div className="header-title">{title}</div>
        {userId && <div className="user-id">ID: {userId}</div>}
        {attempts !== undefined && <div className="attempts-count">Осталось прогнозов: {attempts}</div>}
      </div>
      <div className="header-right"></div>
    </div>
  );
}

export default Header;