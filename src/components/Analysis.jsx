import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './Analysis.css';

function Analysis({ userId, attempts, updateAttempts, onBack }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef();

  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: '⚡ Привет! Загрузи скриншот матча из 1xBet или напиши название команд.',
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendPrediction = async (text, file = null) => {
    setLoading(true);
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date(),
      file: file,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      if (text) formData.append('text', text);
      if (file) formData.append('photo', file);

      // Важно: НЕ добавляем headers! Браузер сам установит multipart/form-data с границей
      const response = await axios.post(`${API_BASE}/webapp/predict`, formData);
      const data = response.data;
      if (data.error) {
        setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: `❌ ${data.error}`, timestamp: new Date() }]);
        setLoading(false);
        return;
      }
      const botMsg = {
        id: Date.now(),
        type: 'bot',
        text: data.prediction_text,
        prediction: data.prediction,
        additional: data.additional,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      updateAttempts(attempts - 1);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: '❌ Ошибка сервера. Попробуйте позже.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setInputText('');
    }
  };

  const handleSend = () => {
    if (!inputText.trim() && !photo) return;
    sendPrediction(inputText, photo);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) setPhoto(e.target.files[0]);
  };

  return (
    <div className="analysis-page">
      <Header title="AI Анализ" userId={userId} attempts={attempts} onBack={onBack} />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              <div className="message-bubble">
                {msg.prediction && (
                  <div className="prediction-card-mini">
                    <div className="prediction-header">🏆 ПРОГНОЗ AI</div>
                    <div>Победитель: <strong>{msg.prediction.winner}</strong></div>
                    <div>Уверенность: <strong className="confidence-highlight">{msg.prediction.confidence}%</strong></div>
                    {msg.additional && <div className="additional-mini">{msg.additional}</div>}
                  </div>
                )}
                <div className="message-text">{msg.text}</div>
                {msg.file && <img src={URL.createObjectURL(msg.file)} alt="preview" className="preview-img" />}
              </div>
              <div className="message-time">{msg.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
            </div>
          ))}
          {loading && (
            <div className="typing-indicator">
              <span>AI анализирует</span>
              <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-area">
          <div className="input-wrapper">
            <label className="attach-btn">
              📸
              <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={loading} hidden />
            </label>
            <input
              type="text"
              placeholder="Опишите матч..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>➤</button>
          </div>
          {photo && <div className="photo-preview">📷 {photo.name}</div>}
        </div>
      </div>
    </div>
  );
}

export default Analysis;