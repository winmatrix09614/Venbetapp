import React, { useState, useEffect } from 'react';
import './IdInput.css';

// ДОБАВЛЕН ПРОП theme
function IdInput({ onLogin, theme }) {
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
      setError(theme.ui.idError);
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
      <div className="top-section">
        <div className="brand-logo" style={{ color: 'var(--primary-theme-color)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: theme.icon }} />
        </div>
        <div className="brand-meta">
          {/* ИСПОЛЬЗУЕМ СЛОВАРЬ */}
          <h1>{theme.brandName}</h1>
          <p>{theme.subtitle}</p>
        </div>
      </div>

      <div className="center-section">
        <div className="bento-stats-row">
          <div className="stat-tile"><span className="stat-num">92%</span><span className="stat-txt">AI</span></div>
          <div className="stat-tile"><span className="stat-num">21.5K</span><span className="stat-txt">PRO</span></div>
          <div className="stat-tile"><span className="stat-num online-pulse">{onlineCount}</span><span className="stat-txt">{theme.ui.statOnline}</span></div>
        </div>
      </div>

      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-container">
            {/* ИСПОЛЬЗУЕМ СЛОВАРЬ */}
            <label>{theme.inputLabel}</label>
            <input
              type="text"
              placeholder={theme.inputPlaceholder}
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoFocus
            />
            <span className="input-description">{theme.inputDesc}</span>
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="prime-btn" style={{ backgroundColor: 'var(--primary-theme-color)' }}>
            {/* ИСПОЛЬЗУЕМ СЛОВАРЬ */}
            <span>{theme.btnText}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </form>

        <div className="app-version">
          {theme.brandName} v3.1.6 · @usefulappbot
        </div>
      </div>
    </div>
  );
}

export default IdInput;