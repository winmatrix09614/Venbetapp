import React from 'react';
import './Message.css';

function Message({ message }) {
  const isBot = message.type === 'bot';
  return (
    <div className={`message ${isBot ? 'bot' : 'user'}`}>
      <div className="message-content">
        {message.prediction && (
          <div className="prediction-card">
            <strong>🏆 Прогноз AI</strong>
            <div>Победитель: <b>{message.prediction.winner}</b></div>
            <div>Уверенность: <b>{message.prediction.confidence}%</b></div>
            {message.additional && <div>{message.additional}</div>}
          </div>
        )}
        <div className="message-text">{message.text}</div>
        {message.file && <img src={URL.createObjectURL(message.file)} alt="screenshot" className="preview-img" />}
      </div>
      <div className="message-time">{message.timestamp.toLocaleTimeString()}</div>
    </div>
  );
}

export default Message;