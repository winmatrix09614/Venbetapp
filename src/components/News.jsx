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

  // Функция для обрезки подзаголовка на фронте (на всякий случай)
  const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
  };

  if (loading) {
    return (
      <div className="news-page">
        <Header title="Новости спорта" onBack={onBack} />
        <div className="news-loading">Загрузка новостей...</div>
      </div>
    );
  }

  if (error || news.length === 0) {
    return (
      <div className="news-page">
        <Header title="Новости спорта" onBack={onBack} />
        <div className="news-placeholder">
          📭 Новости временно недоступны<br />
          <span className="news-placeholder-sub">Попробуйте позже</span>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <Header title="Новости спорта" onBack={onBack} />
      <div className="news-list">
        {news.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card"
          >
            <div className="news-icon">
              <span>📰</span>
            </div>
            <div className="news-content">
              <h3 className="news-title">{item.title}</h3>
              {item.description && (
                <div className="news-description">{truncate(item.description)}</div>
              )}
              <div className="news-date">
                {new Date(item.pubDate).toLocaleDateString('ru-RU')}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default News;