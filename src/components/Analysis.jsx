import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './Analysis.css';

// Строгие Line-Art иконки (Без эмодзи)
const IconClip = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>);
const IconSend = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
const IconClose = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

function Analysis({ userId, attempts, updateAttempts, onBack, theme }) {
  const ui = theme.ui;
  const lang = theme.lang || 'ru';
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef();
  const [mode, setMode] = useState('single');
  const [sport, setSport] = useState('football');
  const [videoOpen, setVideoOpen] = useState(false);
  const videoUrl = (theme && theme.videoUrl) || '';

  // Инициализация чата
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: ui.analysisInit,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Сбрасываем инпут
    }
  };

  const sendPrediction = async (text, file = null) => {
    setLoading(true);
    
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date(),
      fileUrl: photoPreview, // Сохраняем ссылку для истории сообщений
    };
    
    setMessages((prev) => [...prev, userMsg]);

    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      if (text) formData.append('text', text);
      formData.append('lang', lang);
      formData.append('mode', mode);
      formData.append('sport', sport);
      if (file) formData.append('photo', file);
      
      const response = await axios.post(`${API_BASE}/webapp/predict`, formData);
      const data = response.data;
      
      if (data.error) {
        setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: `${ui.errorPrefix}: ${data.error}`, timestamp: new Date() }]);
        setLoading(false);
        return;
      }

      // Матч уже сыгран — показываем результат, попытку НЕ списываем
      if (data.already_played) {
        setMessages((prev) => [...prev, {
          id: Date.now(), type: 'bot', played: data, timestamp: new Date(),
        }]);
        setLoading(false);
        removePhoto();
        setInputText('');
        return;
      }

      const botMsg = {
        id: Date.now(),
        type: 'bot',
        text: data.prediction_text,
        prediction: data.prediction,
        additional: data.additional,
        express: data.express,
        mode: data.mode,
        disclaimer: data.disclaimer,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
      updateAttempts(attempts - 1);
      
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: ui.connError, timestamp: new Date() }]);
    } finally {
      setLoading(false);
      removePhoto();
      setInputText('');
    }
  };

  const handleSend = () => {
    if (!inputText.trim() && !photo) return;
    sendPrediction(inputText, photo);
  };

  return (
    <div className="analysis-page">
      <Header title={ui.analysisTitle} userId={userId} attempts={attempts} onBack={onBack} theme={theme} />
      
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.type}`}>
              <div className="message-content">
                
                {/* Рендерим фото (если юзер прикрепил) */}
                {msg.fileUrl && (
                  <div className="message-bubble" style={{ marginBottom: msg.text ? '8px' : '0' }}>
                    <img src={msg.fileUrl} alt="attachment" className="msg-photo" />
                  </div>
                )}

                {/* Рендерим текст (если он есть, и от юзера, и от бота) */}
                {msg.text && (
                  <div className="message-bubble">
                    <div className="message-text">{msg.text}</div>
                  </div>
                )}

                {/* Карточка «матч уже сыгран» — результат, попытка не списана */}
                {msg.played && (
                  <div className="bento-prediction" style={{ marginTop: msg.text ? '12px' : '0' }}>
                    <div className="pred-tag">{msg.played.played_title}</div>
                    <div className="pred-winner" style={{ fontSize: '15px', opacity: 0.85 }}>{msg.played.match}</div>
                    <div style={{ textAlign: 'center', margin: '14px 0' }}>
                      <div style={{ fontSize: '12px', opacity: 0.6 }}>{msg.played.played_result_label}</div>
                      <div style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '2px' }}>{msg.played.score}</div>
                      {msg.played.winner_name && msg.played.match_note && (
                        <div style={{ fontSize: '13px', color: '#FF8C00', fontWeight: 700, marginTop: '2px' }}>
                          {msg.played.winner_name} — {msg.played.match_note}
                        </div>
                      )}
                      {msg.played.date && <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>{msg.played.date}</div>}
                    </div>
                    <div className="pred-additional" style={{ opacity: 0.75 }}>{msg.played.note}</div>
                  </div>
                )}

                {/* Карточка прогноза (рисуется под текстом, если пришла от ИИ) */}
                {msg.prediction && (
                  <div className="bento-prediction" style={{ marginTop: msg.text ? '12px' : '0' }}>
                    <div className="pred-tag">{ui.verdictTag}</div>
                    <div className="pred-winner">{msg.prediction.winner}</div>

                    {/* Базовая оценка от данных → наш итоговый % (эффект усиления) */}
                    {msg.prediction.base_confidence != null && (
                      <div className="pred-base-conf" style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>
                        {ui.baseConf || 'Базовая оценка'}: {msg.prediction.base_confidence}% → <b style={{ opacity: 1 }}>AI: {msg.prediction.confidence}%</b>
                      </div>
                    )}

                    <div className="pred-confidence">
                      <div className="conf-labels">
                        <span>{ui.confidence}</span>
                        <span>{msg.prediction.confidence}%</span>
                      </div>
                      <div className="conf-bar-bg">
                        <div
                          className="conf-bar-fill"
                          style={{ width: `${msg.prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {msg.additional && (
                      <div className="pred-additional">{msg.additional}</div>
                    )}
                    {(!msg.express) && (
                      <div className="pred-mode-note">{ui.singleNote}</div>
                    )}
                  </div>
                )}

                {msg.express && msg.express.events && (
                  <div className="bento-prediction" style={{ marginTop: '12px', borderColor: 'var(--primary-theme-color)' }}>
                    <div className="pred-tag">{ui.expressTitle}</div>
                    {msg.express.events.map((e, i) => (
                      <div key={i} className="conf-labels" style={{ marginBottom: '6px' }}>
                        <span>{e.name}</span><span>{e.conf}%</span>
                      </div>
                    ))}
                    <div className="conf-labels" style={{ marginTop: '10px', fontWeight: 700, color: 'var(--primary-theme-color)' }}>
                      <span>{ui.combined}</span><span>{msg.express.combined}%</span>
                    </div>
                    <div className="pred-mode-note">{ui.expressNote}</div>
                  </div>
                )}

                {msg.prediction && (
                  <button className="howto-btn" onClick={() => setVideoOpen(true)}>📹 {ui.howToBet}</button>
                )}
                
                {/* Время сообщения */}
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </div>
                
              </div>
            </div>
          ))}

          {/* Скелетная загрузка (Skeleton Shimmer) */}
          {loading && (
            <div className="message-row bot">
              <div className="skeleton-card">
                <div className="skel-tag shimmer"></div>
                <div className="skel-title shimmer"></div>
                <div className="skel-bar shimmer"></div>
                <div className="skel-text shimmer"></div>
              </div>
            </div>
          )}
        </div>

        {/* Панель ввода */}
        <div className="chat-input-area">
          {/* Превью фото перед отправкой */}
          {photoPreview && (
            <div className="attach-preview-container">
              <img src={photoPreview} alt="preview" />
              <button className="remove-attach-btn" onClick={removePhoto}>
                <IconClose />
              </button>
            </div>
          )}
          
          {/* Выбор спорта убран — фокус только на футболе. sport='football' по умолчанию. */}
          <div className="mode-toggle">
            <button className={mode === 'single' ? 'active' : ''} onClick={() => setMode('single')}>{ui.single}</button>
            <button className={mode === 'express' ? 'active' : ''} onClick={() => setMode('express')}>{ui.express}</button>
          </div>

          <div className="input-wrapper">
            <label className="action-btn attach-btn">
              <IconClip />
              <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={loading} hidden ref={fileInputRef} />
            </label>
            
            <input
              type="text"
              placeholder={ui.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            
            <button className={`action-btn send-btn ${inputText || photo ? 'active' : ''}`} onClick={handleSend} disabled={loading || (!inputText && !photo)}>
              <IconSend />
            </button>
          </div>
        </div>
      </div>

      {videoOpen && (
        <div className="video-overlay" onClick={() => setVideoOpen(false)}>
          <div className="video-box" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={() => setVideoOpen(false)}>✕</button>
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay style={{ width: '100%', borderRadius: '12px' }} />
            ) : (
              <div className="video-placeholder">📹 {ui.videoSoon}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis;
