import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './News.css';

function News({ onBack }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/webapp/news`);
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
  }, []);

  // Улучшенная функция для обрезки и очистки от HTML-мусора
  const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    
    // Вычищаем &nbsp; и любые случайно попавшие HTML-теги
    let cleanText = text.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '');
    
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.slice(0, maxLength - 3) + '...';
  };

  // Экран загрузки
  if (loading) {
    return (
      <div className="news-screen">
        <Header title="СВОДКА" onBack={onBack} />
        <div className="news-loading">Загрузка новостей...</div>
      </div>
    );
  }

  // Экран ошибки или пустых данных
  if (error || news.length === 0) {
    return (
      <div className="news-screen">
        <Header title="СВОДКА" onBack={onBack} />
        <div className="news-placeholder">
          📭 Новости временно недоступны<br />
          <span className="news-placeholder-sub">Попробуйте позже</span>
        </div>
      </div>
    );
  }

  // Разделяем новости на главную (Hero) и остальные
  const mainNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="news-screen">
      <Header title="СВОДКА" onBack={onBack} />
      
      <div className="news-container">
        
        {/* Главная новость (Hero-карточка) */}
        {mainNews && (
          <a href={mainNews.link} target="_blank" rel="noopener noreferrer" className="news-hero-card">
            <div className="news-tag highlight-tag">ГЛАВНОЕ</div>
            <h2 className="hero-title">{mainNews.title}</h2>
            {mainNews.description && (
              <p className="hero-desc">{truncate(mainNews.description, 120)}</p>
            )}
            <div className="news-meta">
              <span className="news-date">
                {new Date(mainNews.pubDate).toLocaleDateString('ru-RU')}
              </span>
              <span className="read-more">Читать →</span>
            </div>
          </a>
        )}

        {otherNews.length > 0 && (
          <div className="news-divider">Последние новости</div>
        )}

        {/* Список остальных новостей */}
        <div className="news-list">
          {otherNews.map((item, idx) => (
            <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="news-list-item">
              <div className="unread-indicator"></div>
              <div className="news-content">
                <div className="news-tag">АКТУАЛЬНОЕ</div>
                <h3 className="item-title">{item.title}</h3>
                {item.description && (
                  <p className="item-desc">{truncate(item.description, 90)}</p>
                )}
                <div className="news-date">
                  {new Date(item.pubDate).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default News;