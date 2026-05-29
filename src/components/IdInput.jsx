import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
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
    
    // Получаем initData из Telegram WebApp (если доступно)
    let initData = null;
    if (window.Telegram && window.Telegram.WebApp) {
      initData = window.Telegram.WebApp.initData;
    }
    
    // Вызываем onLogin, передавая ID и initData
    onLogin(trimmed, initData);
  };

  return (
    <div className="id-screen">
      <div className="glow-orb"></div>
      <div className="id-card">
        <div className="logo-wrapper">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">VenBet AI</div>
        </div>
        <div className="tagline">Нейросеть для анализа спорта</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Ваш ID 1xBet</label>
            <input
              type="text"
              placeholder=""
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoFocus
            />
            <span className="input-hint">ID можно найти в приложении 1xBet → Профиль</span>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="gradient-btn">
            <span>🔓 Продолжить</span>
          </button>
        </form>
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-value">92%</span>
            <span className="stat-label">Точность</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">21.5K</span>
            <span className="stat-label">Анализов</span>
          </div>
          <div className="stat-item">
            <span className="stat-value online">{onlineCount}</span>
            <span className="stat-label">Активные</span>
          </div>
        </div>
        <div className="footer-note">
          VenBet AI v3.1.5 · @usefulappbot <br/>
          <div style={{ fontSize: '10px', color: '#a1a1aa', marginTop: '10px', wordBreak: 'break-all', textAlign: 'left', background: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '5px' }}>
            [DEBUG SYSTEM] <br/>
            Telegram Object: {window.Telegram ? '✅ На месте' : '❌ Отсутствует'} <br/>
            WebApp Object: {window.Telegram?.WebApp ? '✅ На месте' : '❌ Отсутствует'} <br/>
            initData: {window.Telegram?.WebApp?.initData ? '✅ ЕСТЬ' : '❌ ПУСТО'} <br/>
            URL Hash: {window.location.hash ? '✅ ' + window.location.hash.substring(0, 15) + '...' : '❌ HASH СТЕРТ РЕДИРЕКТОМ'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdInput;