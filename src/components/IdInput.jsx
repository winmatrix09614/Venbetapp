import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import './IdInput.css';

// ДОБАВЛЕН ПРОП theme
function IdInput({ onLogin, theme }) {
  const ui = theme.ui;
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [onlineCount, setOnlineCount] = useState(4123);
  const [vid, setVid] = useState(false);
  const [ticker, setTicker] = useState([]);
  const idVideoUrl = (theme && theme.idVideoUrl) || '';

  useEffect(() => {
    axios.get(`${API_BASE}/webapp/ticker`).then(r => setTicker(r.data.items || [])).catch(() => {});
  }, []);

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
        {theme.logo ? (
          /* Логотип PREDICT AI = иконка + название одной картинкой (базовые es/tr) */
          <div className="brand-meta brand-meta--logo">
            <img src={theme.logo} alt={theme.brandName} className="brand-logo-img"
                 style={{ maxWidth: 220, width: '70%', height: 'auto', objectFit: 'contain', margin: '0 auto 6px' }} />
            <p>{theme.subtitle}</p>
          </div>
        ) : (
          <>
            <div className="brand-logo" style={{ color: 'var(--primary-theme-color)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: theme.icon }} />
            </div>
            <div className="brand-meta">
              {/* ИСПОЛЬЗУЕМ СЛОВАРЬ */}
              <h1>{theme.brandName}</h1>
              <p>{theme.subtitle}</p>
            </div>
          </>
        )}
      </div>

      <div className="center-section">
        <div className="bento-stats-row">
          <div className="stat-tile"><span className="stat-num">92%</span><span className="stat-txt">AI</span></div>
          <div className="stat-tile"><span className="stat-num">21.5K</span><span className="stat-txt">PRO</span></div>
          <div className="stat-tile"><span className="stat-num online-pulse">{onlineCount}</span><span className="stat-txt">{ui.statOnline}</span></div>
        </div>

        <div className="hiw-label">{ui.hiwTitle || 'Как это работает'}</div>
        <div className="hiw-row">
          <div className="hiw-step">
            <div className="hiw-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 13h4"/></svg>
            </div>
            <span>{ui.hiwStep1 || 'Введи 1xBet ID'}</span>
          </div>
          <div className="hiw-arrow">›</div>
          <div className="hiw-step">
            <div className="hiw-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <span>{ui.hiwStep2 || 'AI анализирует'}</span>
          </div>
          <div className="hiw-arrow">›</div>
          <div className="hiw-step">
            <div className="hiw-ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
            </div>
            <span>{ui.hiwStep3 || 'Ставишь увереннее'}</span>
          </div>
        </div>

        {ticker.length > 0 && (
          <>
            <div className="hiw-label">{ui.tickerTitle || 'Последние прогнозы AI'}</div>
            <div className="ticker-wrap">
              <div className="ticker-track">
                {[...ticker, ...ticker].map((it, i) => (
                  <span className="ticker-item" key={i}>
                    {it.team} <span className={it.ok ? 'tk-ok' : 'tk-no'}>{it.ok ? '✓' : '✗'}</span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
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
            <span className="input-description" style={{ opacity: 0.7, marginTop: '4px' }}>{theme.ui.idLowNote}</span>
            <button type="button" className="howto-btn" style={{ marginTop: '10px' }} onClick={() => setVid(true)}>📹 {theme.ui.howToFindId}</button>
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

      {vid && (
        <div className="video-overlay" onClick={() => setVid(false)}>
          <div className="video-box" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={() => setVid(false)}>✕</button>
            {idVideoUrl ? (
              <video src={idVideoUrl} controls autoPlay style={{ width: '100%', borderRadius: '12px' }} />
            ) : (
              <div className="video-placeholder">📹 {theme.ui.videoSoon}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IdInput;