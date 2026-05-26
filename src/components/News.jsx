import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './News.css';

function News({ onBack }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE}/webapp/news`);
        if (response.data.news && response.data.news.length) {
          setNews(response.data.news);
        } else {
          // Заглушка для демонстрации, пока бэкенд не настроит RSS
          setNews([
            { title: "⚽ Чемпионат мира 2026: расписание матчей", link: "#", pubDate: "27 мая 2026" },
            { title: "🏆 Лига чемпионов: финал уже близко", link: "#", pubDate: "26 мая 2026" },
            { title: "📰 Новости спорта будут загружаться автоматически", link: "#", pubDate: "Скоро" }
          ]);
        }
      } catch (error) {
        console.error('News fetch error:', error);
        setNews([
          { title: "Новости временно недоступны", link: "#", pubDate: "Попробуйте позже" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <Header title="Новости спорта" onBack={onBack} />
      <div className="news-list">
        {loading && <div className="news-placeholder">Загрузка новостей...</div>}
        {!loading && news.map((item, idx) => (
          <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card">
            <div className="news-card-title">{item.title}</div>
            <div className="news-card-date">{item.pubDate}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default News;