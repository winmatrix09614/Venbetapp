import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './History.css';

const API_BASE = 'https://prognosist-production.up.railway.app';

function History({ userId, onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE}/user_history?bet_id=${userId}`);
        if (response.data.history) {
          setHistory(response.data.history);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="history-page">
      <Header title="История прогнозов" onBack={onBack} />
      <div className="history-list">
        {loading && <div className="history-placeholder">Загрузка...</div>}
        {!loading && history.length === 0 && <div className="history-placeholder">Пока нет прогнозов</div>}
        {history.map((item, idx) => (
          <div key={idx} className="history-card">
            <div className="history-date">{new Date(item.created_at).toLocaleString()}</div>
            <div className="history-match">{item.match_description}</div>
            <div className="history-prediction">Прогноз: {item.winner} ({item.confidence}%)</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;