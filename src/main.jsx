import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getTheme } from './themes.js'

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

function resolveLanguage() {
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null
  return (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code) || ''
}

if (window.Telegram && window.Telegram.WebApp) {
  try {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  } catch (e) {}
}

const sourceParam = resolveSource()
const languageCode = resolveLanguage()
const theme = getTheme(sourceParam, languageCode)

const root = document.documentElement
root.setAttribute('dir', theme.dir)
root.setAttribute('lang', theme.id === 'arabic' ? 'ar' : theme.id === 'latam' ? 'es' : 'ru')
root.style.setProperty('--primary-theme-color', theme.primaryColor)
document.title = theme.brandName

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialTheme={theme} sourceParam={sourceParam} />
  </StrictMode>,
)
