// SVG-иконки под каждое ГЕО (внутренняя разметка <svg>)
const ICON_BOLT = '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>';
const ICON_STAR = '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>';
const ICON_MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

export const THEMES = {
  default: {
    id: 'default',
    dir: 'ltr',
    brandName: 'VENBET AI',
    subtitle: 'Нейросеть для анализа спорта',
    inputLabel: 'Ваш ID 1xBet',
    inputPlaceholder: 'Например: 10000000',
    inputDesc: 'ID можно найти в приложении 1xBet → Профиль',
    btnText: 'Продолжить',
    waitingTitle: 'Ожидание подтверждения',
    waitingDesc: 'Ваш ID отправлен менеджеру. Дождитесь активации.',
    primaryColor: '#ff8c00',
    icon: ICON_BOLT,
    menu: {
      analysisTitle: 'AI Анализ', analysisDesc: 'Глубокий разбор матча',
      historyTitle: 'История', historyDesc: 'Журнал сессий',
      newsTitle: 'Сводка', newsDesc: 'Спортивные новости',
      supportTitle: 'Поддержка', supportDesc: 'Связь со специалистом'
    },
    ui: {
      back: 'Назад', idLabel: 'ID', attemptsLeft: 'Осталось прогнозов',
      bannedTitle: 'Доступ заблокирован', bannedBtn: 'Выйти',
      logoutConfirm: 'Вы уверены, что хотите выйти?',
      analysisTitle: 'AI АНАЛИЗ',
      analysisInit: 'Система инициализирована. Загрузите скриншот матча или введите названия команд для начала AI анализа.',
      verdictTag: 'ВЕРДИКТ НЕЙРОСЕТИ', confidence: 'Уверенность',
      inputPlaceholder: 'Команды или скриншот...', errorPrefix: 'Ошибка',
      connError: 'Ошибка соединения с сервером.',
      historyTitle: 'ИСТОРИЯ', historyLoading: 'Загрузка архива...',
      historyEmpty: 'История пуста', historyEmptySub: 'Вы еще не делали прогнозов',
      archiveTag: 'АРХИВ', undefinedResult: 'Неопределено', draw: 'Ничья',
      newsMainTag: 'ГЛАВНОЕ', newsLatestTag: 'Последние новости', newsActualTag: 'АКТУАЛЬНОЕ',
      newsRead: 'Читать →', newsUnavailable: 'Новости временно недоступны', newsTryLater: 'Попробуйте позже',
      loading: 'Загрузка приложения...',
      statOnline: 'Online', idError: 'Неверный ID',
      single: 'Одиночный', express: 'Экспресс', expressTitle: 'ЭКСПРЕСС', combined: 'Суммарная уверенность', howToBet: 'Как поставить ставку', videoSoon: 'Обучающее видео скоро появится', statsCapper: 'Статистика капера', predictionsWord: 'прогнозов', accuracyWord: 'точность', per7d: 'за 7 дней', dailyTitle: 'Прогноз дня', dailyDesc: 'Бесплатный сигнал', dailyEmpty: 'Прогноз дня пока не задан'
    }
  },
  latam: {
    id: 'latam',
    dir: 'ltr',
    brandName: 'PREDICTOR PRO',
    subtitle: 'Inteligencia Artificial Deportiva',
    inputLabel: 'Tu ID de 1xBet',
    inputPlaceholder: 'Ejemplo: 10000000',
    inputDesc: 'Puedes encontrar tu ID en la app de 1xBet → Perfil',
    btnText: 'Continuar',
    waitingTitle: 'Esperando confirmación',
    waitingDesc: 'Tu ID ha sido enviado al gestor. Espera la activación.',
    primaryColor: '#00f2fe',
    icon: ICON_STAR,
    menu: {
      analysisTitle: 'Análisis AI', analysisDesc: 'Análisis profundo del partido',
      historyTitle: 'Historial', historyDesc: 'Registro de sesiones',
      newsTitle: 'Noticias', newsDesc: 'Novedades deportivas',
      supportTitle: 'Soporte', supportDesc: 'Contactar especialista'
    },
    ui: {
      back: 'Atrás', idLabel: 'ID', attemptsLeft: 'Pronósticos restantes',
      bannedTitle: 'Acceso bloqueado', bannedBtn: 'Salir',
      logoutConfirm: '¿Seguro que quieres salir?',
      analysisTitle: 'ANÁLISIS AI',
      analysisInit: 'Sistema inicializado. Sube una captura del partido o escribe los nombres de los equipos para iniciar el análisis AI.',
      verdictTag: 'VEREDICTO DE LA IA', confidence: 'Confianza',
      inputPlaceholder: 'Equipos o captura...', errorPrefix: 'Error',
      connError: 'Error de conexión con el servidor.',
      historyTitle: 'HISTORIAL', historyLoading: 'Cargando archivo...',
      historyEmpty: 'Historial vacío', historyEmptySub: 'Aún no has hecho pronósticos',
      archiveTag: 'ARCHIVO', undefinedResult: 'Indefinido', draw: 'Empate',
      newsMainTag: 'DESTACADO', newsLatestTag: 'Últimas noticias', newsActualTag: 'ACTUAL',
      newsRead: 'Leer →', newsUnavailable: 'Noticias no disponibles temporalmente', newsTryLater: 'Inténtalo más tarde',
      loading: 'Cargando aplicación...',
      statOnline: 'En línea', idError: 'ID inválido',
      single: 'Individual', express: 'Expreso', expressTitle: 'EXPRESO', combined: 'Confianza combinada', howToBet: 'Cómo hacer una apuesta', videoSoon: 'El video tutorial estará disponible pronto', statsCapper: 'Estadísticas del capper', predictionsWord: 'pronósticos', accuracyWord: 'precisión', per7d: 'en 7 días', dailyTitle: 'Pronóstico del día', dailyDesc: 'Señal gratuita', dailyEmpty: 'Aún no disponible'
    }
  },
  arabic: {
    id: 'arabic',
    dir: 'rtl',
    brandName: 'المهندس AI',
    subtitle: 'الذكاء الاصطناعي للتحليل الرياضي',
    inputLabel: 'معرف 1xBet الخاص بك',
    inputPlaceholder: 'مثال: 10000000',
    inputDesc: 'يمكنك العثور على المعرف الخاص بك في تطبيق 1xBet ← الملف الشخصي',
    btnText: 'متابعة',
    waitingTitle: 'في انتظار التأكيد',
    waitingDesc: 'تم إرسال المعرف الخاص بك إلى المدير. يرجى الانتظار.',
    primaryColor: '#d4af37',
    icon: ICON_MOON,
    menu: {
      analysisTitle: 'تحليل الذكاء الاصطناعي', analysisDesc: 'تحليل عميق للمباراة',
      historyTitle: 'السجل', historyDesc: 'سجل الجلسات',
      newsTitle: 'أخبار', newsDesc: 'أخبار رياضية',
      supportTitle: 'الدعم الفني', supportDesc: 'تواصل مع أخصائي'
    },
    ui: {
      back: 'رجوع', idLabel: 'المعرف', attemptsLeft: 'التوقعات المتبقية',
      bannedTitle: 'تم حظر الوصول', bannedBtn: 'خروج',
      logoutConfirm: 'هل أنت متأكد أنك تريد الخروج؟',
      analysisTitle: 'تحليل الذكاء الاصطناعي',
      analysisInit: 'تم تهيئة النظام. ارفع لقطة شاشة للمباراة أو أدخل أسماء الفرق لبدء التحليل.',
      verdictTag: 'حكم الذكاء الاصطناعي', confidence: 'الثقة',
      inputPlaceholder: 'الفرق أو لقطة شاشة...', errorPrefix: 'خطأ',
      connError: 'خطأ في الاتصال بالخادم.',
      historyTitle: 'السجل', historyLoading: 'جارٍ تحميل الأرشيف...',
      historyEmpty: 'السجل فارغ', historyEmptySub: 'لم تقم بأي توقعات بعد',
      archiveTag: 'أرشيف', undefinedResult: 'غير محدد', draw: 'تعادل',
      newsMainTag: 'الأبرز', newsLatestTag: 'آخر الأخبار', newsActualTag: 'عاجل',
      newsRead: 'اقرأ ←', newsUnavailable: 'الأخبار غير متوفرة مؤقتًا', newsTryLater: 'حاول لاحقًا',
      loading: 'جارٍ تحميل التطبيق...',
      statOnline: 'متصل', idError: 'معرف غير صالح',
      single: 'فردي', express: 'إكسبريس', expressTitle: 'إكسبريس', combined: 'الثقة المجمعة', howToBet: 'كيف تضع الرهان', videoSoon: 'الفيديو التعليمي قريبًا', statsCapper: 'إحصائيات الخبير', predictionsWord: 'توقعات', accuracyWord: 'دقة', per7d: 'خلال 7 أيام', dailyTitle: 'توقع اليوم', dailyDesc: 'إشارة مجانية', dailyEmpty: 'غير متاح بعد'
    }
  }
};

export const getThemeBySource = (source) => {
  if (!source) return null;
  const s = source.toLowerCase();
  if (s.includes('latam') || s.includes('peru') || s.includes('es') || s.includes('mx') || s.includes('co')) return THEMES.latam;
  if (s.includes('arab') || s.includes('egypt') || s.includes('ae') || s.includes('sa') || s.includes('eg')) return THEMES.arabic;
  return null;
};

export const getThemeByLanguage = (lang) => {
  if (!lang) return null;
  const l = lang.toLowerCase();
  if (l.startsWith('ar')) return THEMES.arabic;
  if (l.startsWith('es')) return THEMES.latam;
  return null;
};

export const getTheme = (source, lang) => {
  return getThemeBySource(source) || getThemeByLanguage(lang) || THEMES.default;
};
