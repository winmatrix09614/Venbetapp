import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getThemeBySource } from './themes';
import './index.css';

try {
  // 1. Ищем параметр utm_source прямо в ссылке, которую сгенерирует Python-бот
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_source') || '';

  // 2. Определяем тему
  const initialTheme = getThemeBySource(source);

  // 3. Применяем настройки ДО рендера
  document.documentElement.dir = initialTheme.dir;
  document.documentElement.lang = initialTheme.dir === 'rtl' ? 'ar' : 'ru';
  document.documentElement.style.setProperty('--primary-theme-color', initialTheme.primaryColor);

  // 4. Запускаем приложение
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App initialTheme={initialTheme} sourceParam={source} />
    </React.StrictMode>
  );
} catch (e) {
  console.error("Critical Init Error:", e);
  // Защита от черного экрана: запускаем дефолтную версию
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode><App /></React.StrictMode>
  );
}