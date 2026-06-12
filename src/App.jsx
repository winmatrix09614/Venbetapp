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
  const [attempts, setAttempts] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('main');
  const pollRef = useRef(null);

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
    // Очистка опроса статуса при размонтировании — таймер не переживёт уход со страницы.
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  const checkUserStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
      const data = await res.json();
      if (data.status === 'active') {
        setUserId(id); setUserStatus('active'); setAttempts(data.attempts); setIsLoading(false); return true;
      } else if (data.status === 'pending') {
        setUserId(id); setUserStatus('pending'); setIsLoading(false); return false;
      } else {
        localStorage.removeItem('venbet_user_id'); setIsLoading(false); return false;
      }
    } catch (err) { setIsLoading(false); return false; }
  };

  const handleLogin = async (id, initData = null) => {
    localStorage.setItem('venbet_user_id', id);

    // Регистрация лида с UTM-меткой. Ошибку сети не роняем — статус всё равно опросим.
    let url = `${API_BASE}/register_request?bet_id=${id}&source=${sourceParam}`;
    if (initData) url += `&init_data=${encodeURIComponent(initData)}`;
    try {
      await fetch(url);
    } catch (e) { /* регистрация могла не пройти из-за сети — статус опросим ниже */ }

    const isActive = await checkUserStatus(id);
    if (!isActive) {
      // Очищаем предыдущий опрос (если был) — не плодим таймеры при повторном входе.
      if (pollRef.current) clearInterval(pollRef.current);
      let ticks = 0;
      pollRef.current = setInterval(async () => {
        ticks += 1;
        if (ticks > 120) {  // лимит ~10 минут, потом перестаём опрашивать
          clearInterval(pollRef.current); pollRef.current = null; return;
        }
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
    }
  };

  const handleLogout = () => {
    if (window.confirm(theme.ui.logoutConfirm)) {
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      localStorage.removeItem('venbet_user_id'); setUserId(null); setUserStatus(null); setAttempts(0); setCurrentScreen('main');
    }
  };

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
          <button onClick={handleLogout} className="gradient-btn">{theme.btnText}</button>
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
          <button onClick={handleLogout} className="gradient-btn">{theme.ui.bannedBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {currentScreen === 'main' && (
        <MainMenu userId={userId} attempts={attempts} onNavigate={setCurrentScreen} onLogout={handleLogout} theme={theme} />
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