import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getTheme } from './themes.js'

// =====================================================================
//  ТОЧКА ВХОДА + Multi-GEO
//  Вся логика тем выполняется ДО рендера React, чтобы:
//   1. не было "мигания" интерфейса (FOUC);
//   2. App всегда получал валидный объект темы (иначе theme.* = краш = чёрный экран).
// =====================================================================

// 1. Достаём источник (UTM/кампанию) из всех возможных мест по приоритету.
//    Telegram при запуске Mini App может прокидывать метку по-разному:
//    - initDataUnsafe.start_param  — канонично для inline-кнопки WebApp
//    - ?tgWebAppStartParam=...      — иногда приходит как query (видно в логах Railway)
//    - ?utm_source=...              — наш ручной параметр из ссылки бота
function resolveSource() {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null
  const params = new URLSearchParams(window.location.search)

  return (
    (tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) ||
    params.get('tgWebAppStartParam') ||
    params.get('utm_source') ||
    ''
  )
}

// 2. Язык интерфейса пользователя Telegram — для фолбэка, если метка не задаёт ГЕО.
function resolveLanguage() {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null
  return (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code) || ''
}

// 3. Готовим Telegram WebApp как можно раньше.
if (window.Telegram && window.Telegram.WebApp) {
  try {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  } catch (e) {
    // на обычном вебе (вне Telegram) этих методов может не быть — не критично
  }
}

const sourceParam = resolveSource()
const languageCode = resolveLanguage()

// 4. Тема: сначала по UTM-метке кампании, затем фолбэк по языку, иначе default.
const theme = getTheme(sourceParam, languageCode)

// 5. Нативно применяем тему к документу ДО React (исключает мигание).
const root = document.documentElement
root.setAttribute('dir', theme.dir)               // rtl для арабского
root.setAttribute('lang', theme.id === 'arabic' ? 'ar' : theme.id === 'latam' ? 'es' : 'ru')
root.style.setProperty('--primary-theme-color', theme.primaryColor)
document.title = theme.brandName

// 6. Рендерим App с гарантированно валидными пропсами.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialTheme={theme} sourceParam={sourceParam} />
  </StrictMode>,
)
