import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { API_BASE } from '../config';
import './Analysis.css';

// Строгие Line-Art иконки (Без эмодзи)
const IconClip = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>);
const IconSend = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
const IconClose = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

function Analysis({ userId, attempts, updateAttempts, onBack }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef();

  // Инициализация чата
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Система инициализирована. Загрузите скриншот матча или введите названия команд для начала AI анализа.',
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
      if (file) formData.append('photo', file);
      
      const response = await axios.post(`${API_BASE}/webapp/predict`, formData);
      const data = response.data;
      
      if (data.error) {
        setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: `Ошибка: ${data.error}`, timestamp: new Date() }]);
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
      setMessages((prev) => [...prev, { id: Date.now(), type: 'bot', text: 'Ошибка соединения с сервером.', timestamp: new Date() }]);
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
      <Header title="AI АНАЛИЗ" userId={userId} attempts={attempts} onBack={onBack} />
      
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

                {/* Карточка прогноза (рисуется под текстом, если пришла от ИИ) */}
                {msg.prediction && (
                  <div className="bento-prediction" style={{ marginTop: msg.text ? '12px' : '0' }}>
                    <div className="pred-tag">ВЕРДИКТ НЕЙРОСЕТИ</div>
                    <div className="pred-winner">{msg.prediction.winner}</div>
                    
                    <div className="pred-confidence">
                      <div className="conf-labels">
                        <span>Уверенность</span>
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
                  </div>
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
          
          <div className="input-wrapper">
            <label className="action-btn attach-btn">
              <IconClip />
              <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={loading} hidden ref={fileInputRef} />
            </label>
            
            <input
              type="text"
              placeholder="Команды или скриншот..."
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
    </div>
  );
}

export default Analysis;