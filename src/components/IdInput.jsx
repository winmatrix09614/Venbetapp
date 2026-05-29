import React, { useState, useEffect } from 'react';
import './IdInput.css';

function IdInput({ onLogin }) {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [onlineCount, setOnlineCount] = useState(4123);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => {
        let delta = Math.floor(Math.random() * 5) + 1;
        let newVal = prev + (Math.random() > 0.5 ? delta : -delta);
        return Math.min(7000, Math.max(3000, newVal));
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = id.trim();
    if (!/^\d+$/.test(trimmed)) {
      setError('ID должен содержать только цифры');
      return;
    }
    setError('');
    
    let initData = null;
    if (window.Telegram && window.Telegram.WebApp) {
      initData = window.Telegram.WebApp.initData;
    }
    
    onLogin(trimmed, initData);
  };

  return (
    <div className="id-screen">
      {/* Верхняя секция: Брендинг и Статистика (Bento) */}
      <div className="top-section">
        <div className="brand-wrapper">
          <div className="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <div className="brand-meta">
            <h1>VENBET AI</h1>
            <p>Нейросеть для анализа спорта</p>
          </div>
        </div>

        {/* Bento-статистика вверху */}
        <div className="bento-stats-row">
          <div className="stat-tile">
            <span className="stat-num">92%</span>
            <span className="stat-txt">Точность</span>
          </div>
          <div className="stat-tile">
            <span className="stat-num">21.5K</span>
            <span className="stat-txt">Анализов</span>
          </div>
          <div className="stat-tile">
            <span className="stat-num online-pulse">{onlineCount}</span>
            <span className="stat-txt">Активные</span>
          </div>
        </div>
      </div>

      {/* Нижняя секция: Форма ввода под большой палец (Thumb-Zone) */}
      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-container">
            <label>Ваш ID 1xBet</label>
            <input
              type="text"
              placeholder="Например: 10000000"
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoFocus
            />
            <span className="input-description">
              ID можно найти в приложении 1xBet → Профиль
            </span>
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="prime-btn">
            <span>Продолжить</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </form>

        <div className="app-version">
          VenBet AI v3.1.5 · @usefulappbot
        </div>
      </div>
    </div>
  );
}

export default IdInput;