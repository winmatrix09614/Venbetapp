export const THEMES = {
  default: {
    id: 'default', dir: 'ltr', brandName: 'VENBET AI',
    subtitle: 'Нейросеть для анализа спорта',
    inputLabel: 'Ваш ID 1xBet', inputPlaceholder: 'Например: 10000000',
    inputDesc: 'ID можно найти в приложении 1xBet → Профиль',
    btnText: 'Продолжить',
    waitingTitle: 'Ожидание подтверждения',
    waitingDesc: 'Ваш ID отправлен менеджеру. Дождитесь активации.',
    menu: {
      analysisTitle: 'AI Анализ', analysisDesc: 'Глубокий разбор матча',
      historyTitle: 'История', historyDesc: 'Журнал сессий',
      newsTitle: 'Сводка', newsDesc: 'Спортивные новости',
      supportTitle: 'Поддержка', supportDesc: 'Связь со специалистом'
    },
    primaryColor: '#ff8c00'
  },
  latam: {
    id: 'latam', dir: 'ltr', brandName: 'PREDICTOR PRO',
    subtitle: 'Inteligencia Artificial Deportiva',
    inputLabel: 'Tu ID de 1xBet', inputPlaceholder: 'Ejemplo: 10000000',
    inputDesc: 'Puedes encontrar tu ID en la app de 1xBet → Perfil',
    btnText: 'Continuar',
    waitingTitle: 'Esperando confirmación',
    waitingDesc: 'Tu ID ha sido enviado al gestor. Espera la activación.',
    menu: {
      analysisTitle: 'Análisis AI', analysisDesc: 'Análisis profundo del partido',
      historyTitle: 'Historial', historyDesc: 'Registro de sesiones',
      newsTitle: 'Noticias', newsDesc: 'Novedades deportivas',
      supportTitle: 'Soporte', supportDesc: 'Contactar especialista'
    },
    primaryColor: '#00f2fe'
  },
  arabic: {
    id: 'arabic', dir: 'rtl', brandName: 'المهندس AI',
    subtitle: 'الذكاء الاصطناعي للتحليل الرياضي',
    inputLabel: 'معرف 1xBet الخاص بك', inputPlaceholder: 'مثال: 10000000',
    inputDesc: 'يمكنك العثور على المعرف الخاص بك في تطبيق 1xBet ← الملف الشخصي',
    btnText: 'متابعة',
    waitingTitle: 'في انتظار التأكيد',
    waitingDesc: 'تم إرسال المعرف الخاص بك إلى المدير. يرجى الانتظار.',
    menu: {
      analysisTitle: 'تحليل الذكاء الاصطناعي', analysisDesc: 'تحليل عميق للمباراة',
      historyTitle: 'السجل', historyDesc: 'سجل الجلسات',
      newsTitle: 'أخبار', newsDesc: 'أخبار رياضية',
      supportTitle: 'الدعم الفني', supportDesc: 'تواصل مع أخصائي'
    },
    primaryColor: '#d4af37'
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
