import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './History.css';

function History({ userId, onBack, theme }) {
  const ui = theme.ui;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных с сервера
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
    const loc = theme.locale || 'ru-RU';
    return date.toLocaleDateString(loc, {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Помощник для превращения 'team1' в реальное название команды
  const getWinnerName = (item) => {
    if (!item || !item.winner || !item.match_description) return ui.undefinedResult;
    const rawWinner = item.winner.toLowerCase();
    
    if (rawWinner === 'draw') return ui.draw;
    
    // Разбиваем строку "Команда 1 - Команда 2"
    const teams = item.match_description.split(' - ');
    
    if (teams.length === 2) {
      if (rawWinner === 'team1') return teams[0].trim();
      if (rawWinner === 'team2') return teams[1].trim();
    }
    
    return rawWinner; // Fallback, если не удалось распарсить
  };

  // ОСНОВНАЯ РАЗМЕТКА (Всё, что ниже, рисуется на экране)
  return (
    <div className="history-screen">
      <Header title={ui.historyTitle} onBack={onBack} theme={theme} />
      
      <div className="history-container">
        
        {/* Состояние загрузки */}
        {loading && <div className="history-placeholder">{ui.historyLoading}</div>}
        
        {/* Состояние пустого списка */}
        {!loading && history.length === 0 && (
          <div className="history-placeholder">
            <div className="empty-icon">📭</div>
            <div>{ui.historyEmpty}</div>
            <div className="empty-sub">{ui.historyEmptySub}</div>
          </div>
        )}
        
        {/* Список прогнозов */}
        {!loading && history.length > 0 && (
          <div className="history-list">
            {history.map((item, idx) => (
              <div key={idx} className="bento-history-card">
                
                <div className="card-top-row">
                  <span className="history-tag">{ui.archiveTag}</span>
                  <span className="history-date">{formatDate(item.created_at)}</span>
                </div>
                
                <div className="history-match">{item.match_description}</div>
                
                <div className="history-divider"></div>
                
                {/* Выводим реальное имя победителя */}
                <div className="pred-winner">{getWinnerName(item)}</div> 
                
                {/* Выводим полный текст прогноза (или additional). В API должно быть нужное поле */}
                {item.additional && (
                  <div className="history-text">{item.additional}</div>
                )}
                {item.analysis_text && (
                  <div className="history-text">{item.analysis_text}</div>
                )}
                
                {/* Шкала уверенности */}
                <div className="pred-confidence">
                  <div className="conf-labels">
                    <span>{ui.confidence}</span>
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