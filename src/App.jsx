import React, { useState, useEffect, useRef } from 'react';
import IdInput from './components/IdInput';
import MainMenu from './components/MainMenu';
import Analysis from './components/Analysis';
import News from './components/News';
import History from './components/History';
import LoadingScreen from './components/LoadingScreen';
import { API_BASE } from './config';
// ИМПОРТ ТЕМ ЗДЕСЬ БОЛЬШЕ НЕ НУЖЕН, ОН В MAIN.JSX
import './App.css';

// ПРИНИМАЕМ ПРОПСЫ ИЗ MAIN.JSX
function App({ initialTheme, sourceParam }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('main');
  const [offline, setOffline] = useState(false);
  const pollRef = useRef(null);
  const retryRef = useRef(null);

  // Тема зафиксирована с самого старта приложения
  const theme = initialTheme;

  useEffect(() => {
    // Сообщаем Телеграму, что приложение готово, и разворачиваем его на весь экран
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.ready();
    }

    // Проверка авторизации
    const savedId = localStorage.getItem('venbet_user_id');
    if (savedId) {
      checkUserStatus(savedId);
    } else {
      setIsLoading(false);
    }
    // Очистка таймеров при размонтировании — не переживут уход со страницы.
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (retryRef.current) clearInterval(retryRef.current);
    };
  }, []);

  // checkUserStatus возвращает true/false по статусу. Третий исход — сеть упала:
  // тогда (если у лида есть сохранённый ID) показываем offline-экран с автоповтором,
  // чтобы лид не застрял на белом/входном экране при временном обрыве связи.
  const checkUserStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
      const data = await res.json();
      setOffline(false);
      if (retryRef.current) { clearInterval(retryRef.current); retryRef.current = null; }
      if (data.status === 'active') {
        setUserId(id); setUserStatus('active'); setAttempts(data.attempts); setIsLoading(false); return true;
      } else if (data.status === 'pending') {
        setUserId(id); setUserStatus('pending'); setIsLoading(false);
        startStatusPolling(id);  // экран ожидания сам обновится при активации
        return false;
      } else {
        localStorage.removeItem('venbet_user_id'); setIsLoading(false); return false;
      }
    } catch (err) {
      // Сетевой сбой. Есть сохранённый ID -> это не «новый» лид, а потеря связи.
      if (localStorage.getItem('venbet_user_id')) {
        setOffline(true); setIsLoading(false);
        if (!retryRef.current) {
          retryRef.current = setInterval(() => {
            const sid = localStorage.getItem('venbet_user_id');
            if (sid) checkUserStatus(sid);
          }, 5000);
        }
      } else {
        setIsLoading(false);
      }
      return false;
    }
  };

  // Ручной повтор (кнопка на offline-экране).
  const retryConnection = () => {
    const sid = localStorage.getItem('venbet_user_id');
    if (sid) { setIsLoading(true); checkUserStatus(sid); }
  };

  const handleLogin = async (id, initData = null) => {
    localStorage.setItem('venbet_user_id', id);

    // Регистрация лида с UTM-меткой. Ошибку сети не роняем — статус всё равно опросим.
    let url = `${API_BASE}/register_request?bet_id=${id}&source=${sourceParam}`;
    if (initData) url += `&init_data=${encodeURIComponent(initData)}`;
    try {
      const r = await fetch(url);
      const reg = await r.json().catch(() => ({}));
      // ПРАВИЛО: один Telegram = один ID. Если этот Telegram уже привязан к другому
      // bet_id — бэк вернёт already_registered. Тогда НЕ пускаем по новому ID:
      // возвращаем лида на его СУЩЕСТВУЮЩИЙ ID и его реальный статус.
      if (reg && reg.status === 'already_registered' && reg.existing_bet_id) {
        const realId = String(reg.existing_bet_id);
        localStorage.setItem('venbet_user_id', realId);
        // дальше опрашиваем статус именно существующего ID
        await checkUserStatus(realId);
        return;
      }
    } catch (e) { /* регистрация могла не пройти из-за сети — статус опросим ниже */ }

    // ВАЖНО: внутрь приложения пускает ТОЛЬКО реальный статус active из user_status
    // (лид активирован менеджером). pending -> экран ожидания. Никаких «входов» по
    // факту регистрации — подтверждение обязательно.
    const isActive = await checkUserStatus(id);
    if (!isActive) startStatusPolling(id);
  };

  // Опрос статуса на экране ожидания: как только менеджер активирует лида —
  // аппка сама пускает внутрь (без ручной перезагрузки). Лимит ~10 минут.
  const startStatusPolling = (id) => {
    if (pollRef.current) clearInterval(pollRef.current);  // не плодим таймеры
    let ticks = 0;
    pollRef.current = setInterval(async () => {
      ticks += 1;
      if (ticks > 120) { clearInterval(pollRef.current); pollRef.current = null; return; }
      try {
        const res = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
        const data = await res.json();
        if (data.status === 'active') {
          clearInterval(pollRef.current); pollRef.current = null;
          setUserStatus('active'); setAttempts(data.attempts);
        } else if (data.status === 'banned') {
          clearInterval(pollRef.current); pollRef.current = null;
          setUserStatus('banned');
        }
      } catch (e) { /* временный сбой сети — следующий тик повторит */ }
    }, 5000);
  };

  // Ручная проверка статуса (кнопка на экране ожидания).
  const manualCheck = async () => {
    const sid = userId || localStorage.getItem('venbet_user_id');
    if (!sid || checking) return;
    setChecking(true);
    try { await checkUserStatus(sid); } finally { setChecking(false); }
  };

  const handleLogout = () => {
    if (window.confirm(theme.ui.logoutConfirm)) {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      localStorage.removeItem('venbet_user_id'); setUserId(null); setUserStatus(null); setAttempts(0); setCurrentScreen('main');
    }
  };

  // Offline-экран: связь потеряна. Текст на языке лида (тема зафиксирована по метке).
  // Автоповтор каждые 5с крутится в фоне; кнопка — мгновенный ручной повтор.
  if (offline) {
    return (
      <div className="pending-screen">
        <div className="pending-card">
          <div className="offline-spinner" />
          <h2>{theme.ui.offlineTitle}</h2>
          <p>{theme.ui.offlineDesc}</p>
          <button onClick={retryConnection} className="gradient-btn">{theme.ui.offlineRetry}</button>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingScreen theme={theme} />;
  
  // ПЕРЕДАЕМ ТЕМУ В ID INPUT
  if (!userId) return <IdInput onLogin={handleLogin} theme={theme} />;
  
  if (userStatus === 'pending') {
    return (
      <div className="pending-screen">
        <div className="pending-card">
          <div className="logo-icon">⏳</div>
          <h2>{theme.waitingTitle}</h2>
          <p>{theme.waitingDesc}</p>
          <button onClick={manualCheck} disabled={checking} className="gradient-btn">
            {checking ? '…' : (theme.ui.checkStatusBtn || 'Проверить статус')}
          </button>
          <button onClick={handleLogout} className="ghost-btn">{theme.btnText}</button>
        </div>
      </div>
    );
  }
  if (userStatus === 'banned') {
    return (
      <div className="pending-screen">
        <div className="pending-card">
          <div className="logo-icon">🚫</div>
          <h2>{theme.ui.bannedTitle}</h2>
          <button onClick={handleLogout} className="ghost-btn">{theme.ui.bannedBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {currentScreen === 'main' && (
        <MainMenu userId={userId} attempts={attempts} onNavigate={setCurrentScreen} onLogout={handleLogout} theme={theme} sourceParam={sourceParam} />
      )}
      {currentScreen === 'analysis' && (
        <Analysis userId={userId} attempts={attempts} updateAttempts={setAttempts} onBack={() => setCurrentScreen('main')} theme={theme} />
      )}
      {currentScreen === 'news' && (
        <News onBack={() => setCurrentScreen('main')} theme={theme} />
      )}
      {currentScreen === 'history' && (
        <History userId={userId} onBack={() => setCurrentScreen('main')} theme={theme} />
      )}
    </div>
  );
}

export default App;