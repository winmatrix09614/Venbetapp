import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './News.css';

const API_BASE = 'https://prognosist-production.up.railway.app';

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
          setNews([]);
        }
      } catch (error) {
        console.error('News fetch error:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <Header title="⚡ Новости спорта" onBack={onBack} />
      <div className="news-list">
        {loading && <div className="news-placeholder">Загрузка новостей...</div>}
        {!loading && news.length === 0 && <div className="news-placeholder">Новости временно недоступны</div>}
        {news.map((item, idx) => (
          <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card">
            <div className="news-card-title">{item.title}</div>
            <div className="news-card-date">{new Date(item.pubDate).toLocaleDateString()}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default News;