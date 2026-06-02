import React from 'react';
import Header from './Header';
import './MainMenu.css';

// SVG Иконки... (Оставь свои SVG иконки здесь без изменений)
const IconPulse = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>);
const IconNews = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M4 8h16M8 16h8M8 12h8"></path></svg>);
const IconHistory = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const IconSupport = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const IconSettings = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>);

// ДОБАВЛЕН ПРОП theme
function MainMenu({ userId, attempts, onNavigate, onLogout, theme }) {
  const openManager = () => window.open('https://t.me/Gggrymka', '_blank');

  return (
    <div className="main-menu">
      {/* Передаем бренд в шапку */}
      <Header title={theme.brandName} userId={userId} attempts={attempts} onBack={onLogout} theme={theme} />
      
      <div className="bento-grid">
        <div className="bento-card primary-card" onClick={() => onNavigate('analysis')} style={{ borderColor: 'var(--primary-theme-color)' }}>
          <div className="card-icon-wrapper active-icon" style={{ color: 'var(--primary-theme-color)' }}>
            <IconPulse />
          </div>
          <div className="card-text">
            <div className="card-title">{theme.menu.analysisTitle}</div>
            <div className="card-desc">{theme.menu.analysisDesc}</div>
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
    </div>
  );
}

export default MainMenu;