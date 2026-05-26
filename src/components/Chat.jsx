import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import './Chat.css';

function Chat({ userId, telegramUser, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userName = telegramUser?.first_name || 'пользователь';
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: `Привет, ${userName}! 👋\n\nЯ нейросеть для анализа спортивных событий. Пришлите скриншот матча из 1xBet или напишите название команд (например, "Южная Корея - Чехия").`,
        timestamp: new Date(),
      },
    ]);
  }, [telegramUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendPredictionRequest = async (userInput, file = null) => {
    setLoading(true);
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: userInput,
      timestamp: new Date(),
      file: file,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('text', userInput);
      if (file) {
        formData.append('photo', file);
      }
      const response = await axios.post('http://localhost:8000/webapp/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.prediction_text,
        prediction: data.prediction,
        additional: data.additional,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: '❌ Ошибка получения прогноза. Попробуйте позже.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    sendPredictionRequest(inputText);
    setInputText('');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    sendPredictionRequest('📸 Скриншот матча', file);
    e.target.value = null;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-title">🤖 Predictor AI</div>
        <button className="logout-button" onClick={onLogout} title="Выйти из аккаунта">
          🚪
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {loading && (
          <div className="typing-indicator">
            <span>AI анализирует</span>
            <div className="spinner"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Опишите матч..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
          disabled={loading}
        />
        <label className="photo-label">
          📎
          <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={loading} />
        </label>
        <button onClick={handleSendText} disabled={loading}>➤</button>
      </div>
    </div>
  );
}

export default Chat;