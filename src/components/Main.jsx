import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getThemeBySource } from './themes'; // Импортируем нашу логику тем
import './index.css';

// 1. Извлекаем параметры ДО запуска React
function getStartParam() {
  // Пытаемся взять из объекта Telegram
  const tgParam = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
  if (tgParam) return tgParam;

  // Fallback: если это прямая ссылка (Direct Link), ищем в URL
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('startapp') || urlParams.get('tgWebAppStartParam') || '';
}

const startParam = getStartParam();

// 2. Определяем тему на основе параметра
const initialTheme = getThemeBySource(startParam);

// 3. Применяем RTL и цвета к корню документа ДО рендера интерфейса
document.documentElement.dir = initialTheme.dir;
document.documentElement.lang = initialTheme.dir === 'rtl' ? 'ar' : 'ru';
document.documentElement.style.setProperty('--primary-theme-color', initialTheme.primaryColor);

// 4. Запускаем React и передаем готовую тему внутрь App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App initialTheme={initialTheme} sourceParam={startParam} />
  </React.StrictMode>
);