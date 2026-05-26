import React, { useState, useEffect } from 'react';
import IdInput from './components/IdInput';
import MainMenu from './components/MainMenu';
import Analysis from './components/Analysis';
import News from './components/News';
import History from './components/History';
import LoadingScreen from './components/LoadingScreen';
import { API_BASE } from './config';
import './App.css';

const API_BASE = 'https://venbetappback-production.up.railway.app';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('main');

  useEffect(() => {
    const savedId = localStorage.getItem('venbet_user_id');
    if (savedId) {
      checkUserStatus(savedId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUserStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
      const data = await res.json();
      if (data.status === 'active') {
        setUserId(id);
        setUserStatus('active');
        setAttempts(data.attempts);
        setIsLoading(false);
      } else if (data.status === 'pending') {
        setUserId(id);
        setUserStatus('pending');
        setIsLoading(false);
        // Начинаем опрос каждые 5 секунд
        const interval = setInterval(async () => {
          const res2 = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
          const data2 = await res2.json();
          if (data2.status === 'active') {
            clearInterval(interval);
            setUserStatus('active');
            setAttempts(data2.attempts);
          }
        }, 5000);
        return () => clearInterval(interval);
      } else {
        localStorage.removeItem('venbet_user_id');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleLogin = async (id) => {
    localStorage.setItem('venbet_user_id', id);
    // Отправляем запрос на регистрацию
    await fetch(`${API_BASE}/register_request?bet_id=${id}`);
    checkUserStatus(id);
  };

  // Найти в файле src/App.jsx функцию handleLogout и заменить её содержимое на следующее:
const handleLogout = () => {
  if (window.confirm('Вы уверены, что хотите выйти?')) {
    // 1. Очищаем ID в localStorage
    localStorage.removeItem('venbet_user_id');
    // 2. Сбрасываем состояние в приложении
    setUserId(null);
    setUserStatus(null);
    setAttempts(0);
    // 3. Возвращаемся на экран ввода ID
    setCurrentScreen('main');
    // 4. Полностью перезагружаем страницу, чтобы сбросить всё до базового состояния
    window.location.reload();
  }
};

  const updateAttempts = (newAttempts) => {
    setAttempts(newAttempts);
  };

  if (isLoading) return <LoadingScreen />;
  if (!userId) return <IdInput onLogin={handleLogin} />;
  if (userStatus === 'pending') {
    return (
      <div className="pending-screen">
        <div className="pending-card">
          <div className="logo-icon">⏳</div>
          <h2>Ожидание подтверждения</h2>
          <p>Ваш ID отправлен менеджеру. Дождитесь активации аккаунта.</p>
                <p style={{ fontSize: '14px', color: '#ffb347', marginTop: '15px' }}>
        ⚠️ Не закрывайте это окно и приложение для автоматического входа
      </p>
          <button onClick={handleLogout} className="gradient-btn">Выйти</button>
        </div>
      </div>
    );
  }
  if (userStatus === 'banned') {
    return (
      <div className="pending-screen">
        <div className="pending-card">
          <div className="logo-icon">🚫</div>
          <h2>Доступ заблокирован</h2>
          <p>Обратитесь к менеджеру.</p>
          <button onClick={handleLogout} className="gradient-btn">Выйти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {currentScreen === 'main' && (
        <MainMenu
          userId={userId}
          attempts={attempts}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'analysis' && (
        <Analysis
          userId={userId}
          attempts={attempts}
          updateAttempts={updateAttempts}
          onBack={() => setCurrentScreen('main')}
        />
      )}
      {currentScreen === 'news' && (
        <News onBack={() => setCurrentScreen('main')} />
      )}
      {currentScreen === 'history' && (
        <History userId={userId} onBack={() => setCurrentScreen('main')} />
      )}
    </div>
  );
}

export default App;