import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './News.css';

// theme прокидывается из App для Multi-GEO (язык новостей + подписи)
function News({ onBack, theme }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Тема → язык запроса новостей и локаль дат
  const lang = (theme && theme.lang) || 'ru';
  const locale = (theme && theme.locale) || 'ru-RU';
  const ui = (theme && theme.ui) || {};
  const title = (theme && theme.menu && theme.menu.newsTitle) || 'СВОДКА';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/webapp/news?lang=${lang}`);
        if (response.data.news && response.data.news.length > 0) {
          setNews(response.data.news);
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error('News fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [lang]);

  const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    let cleanText = text.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '');
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.slice(0, maxLength - 3) + '...';
  };

  const fmtDate = (d) => {
    if (!d) return '';
    const parsed = new Date(d);
    return isNaN(parsed) ? '' : parsed.toLocaleDateString(locale);
  };

  if (loading) {
    return (
      <div className="news-screen">
        <Header title={title} onBack={onBack} />
        <div className="news-loading">…</div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return (
      <div className="news-screen">
        <Header title={title} onBack={onBack} />
        <div className="news-placeholder">
          📭 {ui.newsUnavailable || 'Новости временно недоступны'}<br />
          <span className="news-placeholder-sub">{ui.newsTryLater || 'Попробуйте позже'}</span>
        </div>
      </div>
    );
  }

  const mainNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="news-screen">
      <Header title={title} onBack={onBack} />

      <div className="news-container">

        {/* Главная новость с большой картинкой */}
        {mainNews && (
          <a href={mainNews.link} target="_blank" rel="noopener noreferrer" className="news-hero-card">
            {mainNews.image && (
              <div className="news-hero-image">
                <img src={mainNews.image} alt="" loading="lazy"
                     onError={(e) => { e.currentTarget.parentNode.style.display = 'none'; }} />
              </div>
            )}
            <div className="news-tag highlight-tag">{ui.newsMainTag || 'ГЛАВНОЕ'}</div>
            <h2 className="hero-title">{mainNews.title}</h2>
            {mainNews.description && (
              <p className="hero-desc">{truncate(mainNews.description, 120)}</p>
            )}
            <div className="news-meta">
              <span className="news-date">{fmtDate(mainNews.pubDate)}</span>
              <span className="read-more">{ui.newsRead || 'Читать →'}</span>
            </div>
          </a>
        )}

        {otherNews.length > 0 && (
          <div className="news-divider">{ui.newsLatestTag || 'Последние новости'}</div>
        )}

        {/* Список с миниатюрами */}
        <div className="news-list">
          {otherNews.map((item, idx) => (
            <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="news-list-item">
              {item.image ? (
                <div className="news-thumb">
                  <img src={item.image} alt="" loading="lazy"
                       onError={(e) => { e.currentTarget.parentNode.style.display = 'none'; }} />
                </div>
              ) : (
                <div className="unread-indicator"></div>
              )}
              <div className="news-content">
                <div className="news-tag">{ui.newsActualTag || 'АКТУАЛЬНОЕ'}</div>
                <h3 className="item-title">{item.title}</h3>
                {item.description && (
                  <p className="item-desc">{truncate(item.description, 90)}</p>
                )}
                <div className="news-date">{fmtDate(item.pubDate)}</div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}

export default News;
