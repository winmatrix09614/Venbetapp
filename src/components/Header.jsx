import React from 'react';
import './Header.css';

function Header({ title, onBack, userId, attempts, theme }) {
  const ui = (theme && theme.ui) || { back: 'Назад', idLabel: 'ID', attemptsLeft: 'Осталось прогнозов' };
  return (
    <div className="header">
      <div className="header-left">
        {onBack && (
          <button className="back-button" onClick={onBack} title={ui.back}>
            ←
          </button>
        )}
      </div>
      <div className="header-center">
        <div className="header-title">{title}</div>
        {userId && <div className="user-id">{ui.idLabel}: {userId}</div>}
        {attempts !== undefined && <div className="attempts-count">{ui.attemptsLeft}: {attempts}</div>}
      </div>
      <div className="header-right"></div>
    </div>
  );
}

export default Header;