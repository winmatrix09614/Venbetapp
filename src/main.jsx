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
  const params = new URLSearchParams(window.location.search)
  return params.get('lng') || (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code) || ''
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

// Светлый оттенок акцента (для градиентов) — выводим из основного цвета темы,
// чтобы не было хардкод-оранжевого на неоранжевых языках.
function lightenHex(hex, amt = 0.32) {
  try {
    let h = hex.replace('#', '')
    if (h.length === 3) h = h.split('').map((c) => c + c).join('')
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    const mix = (c) => Math.round(c + (255 - c) * amt)
    const to2 = (n) => n.toString(16).padStart(2, '0')
    return `#${to2(mix(r))}${to2(mix(g))}${to2(mix(b))}`
  } catch (e) {
    return hex
  }
}

const root = document.documentElement
root.setAttribute('dir', theme.dir)
root.setAttribute('lang', theme.lang || 'ru')
root.style.setProperty('--primary-theme-color', theme.primaryColor)
root.style.setProperty('--primary-theme-light', lightenHex(theme.primaryColor))
// Единый акцент: --accent теперь следует за цветом темы (раньше был хардкод #ff6b35)
root.style.setProperty('--accent', theme.primaryColor)
document.title = theme.brandName

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialTheme={theme} sourceParam={sourceParam} />
  </StrictMode>,
)
