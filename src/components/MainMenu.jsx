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

function MainMenu({ userId, attempts, onNavigate, onLogout, theme, sourceParam }) {
  const ui = theme.ui;
  const lang = theme.lang || 'ru';
  // Ссылка на менеджера приходит с бэкенда по языку (управляется из админки).
  // Дефолт-резерв на случай, если запрос не успел/не удался — кнопка всегда рабочая.
  const [managerUrl, setManagerUrl] = useState('https://t.me/Gggrymka');
  const openManager = () => window.open(managerUrl, '_blank');

  const [stats, setStats] = useState(null);
  const [dailyOpen, setDailyOpen] = useState(false);
  const [daily, setDaily] = useState(null);
  const [dailyLoading, setDailyLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/webapp/stats`).then(r => setStats(r.data)).catch(() => {});
    // Ссылка менеджера: сначала по метке (персональный менеджер m-<username>),
    // фолбэк на языковую ссылку — резолвит бэк. source опционален.
    const src = encodeURIComponent(sourceParam || '');
    axios.get(`${API_BASE}/webapp/manager?lang=${lang}&source=${src}`)
      .then(r => { if (r.data && r.data.url) setManagerUrl(r.data.url); })
      .catch(() => {});
  }, [lang, sourceParam]);

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
        <div className="metric-row">
          <div className="metric-card">
            <div className="metric-label">{ui.accuracyWord}</div>
            <div className="metric-value metric-acc">~{stats.winrate}%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">{ui.predictionsWord}</div>
            <div className="metric-value">{stats.count}</div>
          </div>
        </div>
      )}

      <div className="promo-banner" onClick={() => onNavigate('analysis')}>
        <div className="promo-icon"><IconPulse /></div>
        <div className="promo-text">
          <div className="promo-title">{ui.promoTitle || 'Сделай свой AI-прогноз'}</div>
          <div className="promo-sub">{ui.promoSub || 'Узнай, кто победит — за секунды'}</div>
        </div>
        <div className="promo-btn">{ui.promoBtn || 'Начать'}</div>
      </div>

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
                <div className="daily-teams">
                  <div className="daily-team">
                    {daily.logo1 ? <img src={daily.logo1} alt="" className="daily-logo" /> : <div className="daily-logo-ph" />}
                    <span className="daily-team-name">{daily.team1 || ''}</span>
                  </div>
                  <span className="daily-vs">VS</span>
                  <div className="daily-team">
                    {daily.logo2 ? <img src={daily.logo2} alt="" className="daily-logo" /> : <div className="daily-logo-ph" />}
                    <span className="daily-team-name">{daily.team2 || ''}</span>
                  </div>
                </div>
                <div className="bento-prediction" style={{ marginTop: '12px' }}>
                  <div className="pred-tag">{ui.verdictTag}</div>
                  <div className="pred-winner">{daily.prediction.winner}</div>
                  <div className="pred-confidence">
                    <div className="conf-labels"><span>{ui.confidence}</span><span>{daily.prediction.confidence}%</span></div>
                    <div className="conf-bar-bg"><div className="conf-bar-fill" style={{ width: `${daily.prediction.confidence}%` }}></div></div>
                  </div>
                  {daily.additional && <div className="pred-additional">{daily.additional}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
