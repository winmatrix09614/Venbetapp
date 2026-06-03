import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './MainMenu.css';

const IconPulse = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>);
const IconNews = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M4 8h16M8 16h8M8 12h8"></path></svg>);
const IconHistory = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const IconSupport = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const IconStar = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);

function MainMenu({ userId, attempts, onNavigate, onLogout, theme }) {
  const ui = theme.ui;
  const lang = theme.id === 'arabic' ? 'ar' : theme.id === 'latam' ? 'es' : 'ru';
  const openManager = () => window.open('https://t.me/Gggrymka', '_blank');

  const [stats, setStats] = useState(null);
  const [dailyOpen, setDailyOpen] = useState(false);
  const [daily, setDaily] = useState(null);
  const [dailyLoading, setDailyLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/webapp/stats`).then(r => setStats(r.data)).catch(() => {});
  }, []);

  const openDaily = async () => {
    setDailyOpen(true);
    if (daily) return;
    setDailyLoading(true);
    try {
      const r = await axios.get(`${API_BASE}/webapp/daily?lang=${lang}`);
      setDaily(r.data);
    } catch (e) {
      setDaily({ error: 'net' });
    } finally {
      setDailyLoading(false);
    }
  };

  return (
    <div className="main-menu">
      <Header title={theme.brandName} userId={userId} attempts={attempts} onBack={onLogout} theme={theme} />

      {stats && (
        <div className="capper-stats">
          <span className="cs-label">{ui.statsCapper}</span>
          <span className="cs-val">{stats.count} {ui.predictionsWord}</span>
          <span className="cs-dot">·</span>
          <span className="cs-acc">~{stats.winrate}% {ui.accuracyWord}</span>
          <span className="cs-period">{ui.per7d}</span>
        </div>
      )}

      <div className="bento-grid">
        <div className="bento-card primary-card" onClick={() => onNavigate('analysis')} style={{ borderColor: 'var(--primary-theme-color)' }}>
          <div className="card-icon-wrapper active-icon" style={{ color: 'var(--primary-theme-color)' }}><IconPulse /></div>
          <div className="card-text">
            <div className="card-title">{theme.menu.analysisTitle}</div>
            <div className="card-desc">{theme.menu.analysisDesc}</div>
          </div>
        </div>

        <div className="bento-card small-card daily-card" onClick={openDaily} style={{ borderColor: 'var(--primary-theme-color)' }}>
          <div className="card-icon-wrapper" style={{ color: 'var(--primary-theme-color)' }}><IconStar /></div>
          <div className="card-text">
            <div className="card-title">{ui.dailyTitle}</div>
            <div className="card-desc">{ui.dailyDesc}</div>
          </div>
        </div>

        <div className="bento-card small-card" onClick={() => onNavigate('history')}>
          <div className="card-icon-wrapper"><IconHistory /></div>
          <div className="card-text">
            <div className="card-title">{theme.menu.historyTitle}</div>
            <div className="card-desc">{theme.menu.historyDesc}</div>
          </div>
        </div>

        <div className="bento-card small-card" onClick={() => onNavigate('news')}>
          <div className="card-icon-wrapper"><IconNews /></div>
          <div className="card-text">
            <div className="card-title">{theme.menu.newsTitle}</div>
            <div className="card-desc">{theme.menu.newsDesc}</div>
          </div>
        </div>

        <div className="bento-card wide-banner" onClick={openManager}>
          <div className="card-icon-wrapper"><IconSupport /></div>
          <div className="banner-text">
            <div className="card-title">{theme.menu.supportTitle}</div>
            <div className="card-desc">{theme.menu.supportDesc}</div>
          </div>
        </div>
      </div>

      {dailyOpen && (
        <div className="daily-overlay" onClick={() => setDailyOpen(false)}>
          <div className="daily-box" onClick={(e) => e.stopPropagation()}>
            <button className="daily-close" onClick={() => setDailyOpen(false)}>✕</button>
            <div className="daily-head"><IconStar /> {ui.dailyTitle}</div>
            {dailyLoading && (
              <div className="skeleton-card" style={{ marginTop: '12px' }}>
                <div className="skel-tag shimmer"></div>
                <div className="skel-title shimmer"></div>
                <div className="skel-bar shimmer"></div>
                <div className="skel-text shimmer"></div>
              </div>
            )}
            {!dailyLoading && daily && (daily.error ? (
              <div className="daily-empty">{ui.dailyEmpty}</div>
            ) : (
              <div>
                <div className="daily-match">{daily.match}</div>
                <div className="bento-prediction" style={{ marginTop: '12px' }}>
                  <div className="pred-tag">{ui.verdictTag}</div>
                  <div className="pred-winner">{daily.prediction.winner}</div>
                  <div className="pred-confidence">
                    <div className="conf-labels"><span>{ui.confidence}</span><span>{daily.prediction.confidence}%</span></div>
                    <div className="conf-bar-bg"><div className="conf-bar-fill" style={{ width: `${daily.prediction.confidence}%` }}></div></div>
                  </div>
                  {daily.additional && <div className="pred-additional">{daily.additional}</div>}
                </div>
                {daily.prediction_text && <div className="daily-text">{daily.prediction_text}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
