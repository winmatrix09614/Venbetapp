import React from 'react';
import './Header.css';

function Header({ title, onBack, userId, attempts }) {
  return (
    <div className="header">
      <button className="back-button" onClick={onBack} title="Назад">
        <span className="back-arrow">←</span>
      </button>
      <div className="header-center">
        <div className="header-title">{title}</div>
        {userId && <div className="user-id">ID: {userId}</div>}
        {attempts !== undefined && <div className="attempts-header">Осталось прогнозов: {attempts}</div>}
      </div>
    </div>
  );
}

export default Header;