import React, { useState, useEffect, useRef } from 'react';
import IdInput from './components/IdInput';
import MainMenu from './components/MainMenu';
import Analysis from './components/Analysis';
import News from './components/News';
import History from './components/History';
import LoadingScreen from './components/LoadingScreen';
import { API_BASE } from './config';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('main');
  const statusInterval = useRef(null);

  useEffect(() => {
    const savedId = localStorage.getItem('venbet_user_id');
    if (savedId) {
      checkUserStatus(savedId);
    } else {
      setIsLoading(false);
    }
    // Очистка интервала при размонтировании
    return () => {
      if (statusInterval.current) clearInterval(statusInterval.current);
    };
  }, []);

  const checkUserStatus = async (id, isPolling = false) => {
    try {
      const res = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
      const data = await res.json();
      if (data.status === 'active') {
        setUserId(id);
        setUserStatus('active');
        setAttempts(data.attempts);
        setIsLoading(false);
        return true;
      } else if (data.status === 'pending') {
        setUserId(id);
        setUserStatus('pending');
        setIsLoading(false);
        return false;
      } else {
        localStorage.removeItem('venbet_user_id');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  const handleLogin = async (id) => {
    // Очищаем предыдущий интервал
    if (statusInterval.current) {
      clearInterval(statusInterval.current);
      statusInterval.current = null;
    }
    localStorage.setItem('venbet_user_id', id);
    await fetch(`${API_BASE}/register_request?bet_id=${id}`);
    const isActive = await checkUserStatus(id);
    if (!isActive) {
      statusInterval.current = setInterval(async () => {
        const res = await fetch(`${API_BASE}/user_status?bet_id=${id}`);
        const data = await res.json();
        if (data.status === 'active') {
          clearInterval(statusInterval.current);
          statusInterval.current = null;
          setUserStatus('active');
          setAttempts(data.attempts);
        } else if (data.status === 'banned') {
          clearInterval(statusInterval.current);
          statusInterval.current = null;
          setUserStatus('banned');
        }
      }, 5000);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      if (statusInterval.current) {
        clearInterval(statusInterval.current);
        statusInterval.current = null;
      }
      localStorage.removeItem('venbet_user_id');
      setUserId(null);
      setUserStatus(null);
      setAttempts(0);
      setCurrentScreen('main');
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