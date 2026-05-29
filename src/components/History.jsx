import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './History.css';

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

  // Функция для красивого форматирования даты (ДД.ММ.ГГГГ, ЧЧ:ММ)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="history-screen">
      <Header title="ИСТОРИЯ" onBack={onBack} />
      
      <div className="history-container">
        
        {/* Состояние загрузки */}
        {loading && <div className="history-placeholder">Загрузка архива...</div>}
        
        {/* Состояние пустого списка */}
        {!loading && history.length === 0 && (
          <div className="history-placeholder">
            <div className="empty-icon">📭</div>
            <div>История пуста</div>
            <div className="empty-sub">Вы еще не делали прогнозов</div>
          </div>
        )}
        
        {/* Список прогнозов */}
        {!loading && history.length > 0 && (
          <div className="history-list">
            {history.map((item, idx) => (
              <div key={idx} className="bento-history-card">
                
                <div className="card-top-row">
                  <span className="history-tag">АРХИВ</span>
                  <span className="history-date">{formatDate(item.created_at)}</span>
                </div>
                
                <div className="history-match">{item.match_description}</div>
                
                <div className="history-divider"></div>
                
                <div className="pred-winner">{item.winner}</div>
                
                <div className="pred-confidence">
                  <div className="conf-labels">
                    <span>Уверенность</span>
                    <span>{item.confidence}%</span>
                  </div>
                  <div className="conf-bar-bg">
                    <div 
                      className="conf-bar-fill" 
                      style={{ width: `${item.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;