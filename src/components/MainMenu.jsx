import React from 'react';
import Header from './Header';
import './MainMenu.css';

function MainMenu({ userId, attempts, onNavigate, onLogout }) {
  const openManager = () => {
    window.open('https://t.me/Gggrymka', '_blank');
  };

  return (
    <div className="main-menu">
      <Header title="⚡ VenBet AI" userId={userId} attempts={attempts} onBack={onLogout} />
      <div className="menu-cards">
        <div className="card" onClick={() => onNavigate('analysis')}>
          <div className="card-icon">🧠</div>
          <div className="card-text">
            <div className="card-title">AI Анализ</div>
            <div className="card-desc">Загрузи скрин или опиши матч</div>
          </div>
        </div>
        <div className="card" onClick={() => onNavigate('news')}>
          <div className="card-icon">📰</div>
          <div className="card-text">
            <div className="card-title">Новости</div>
            <div className="card-desc">Спортивные события</div>
          </div>
        </div>
        <div className="card" onClick={openManager}>
          <div className="card-icon">📞</div>
          <div className="card-text">
            <div className="card-title">Связь с менеджером</div>
            <div className="card-desc">Написать в Telegram</div>
          </div>
        </div>
        <div className="card" onClick={() => onNavigate('history')}>
          <div className="card-icon">📜</div>
          <div className="card-text">
            <div className="card-title">История прогнозов</div>
            <div className="card-desc">Твои предыдущие запросы</div>
          </div>
        </div>
        <div className="card disabled-card">
          <div className="card-icon">⚙️</div>
          <div className="card-text">
            <div className="card-title">Настройки</div>
            <div className="card-desc soon">В разработке</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;