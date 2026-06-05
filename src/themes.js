// SVG-иконки (внутренняя разметка <svg>)
const ICON_BOLT = '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>';
const ICON_STAR = '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>';
const ICON_GLOBE = '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>';

export const THEMES = {
  // ===== Русский (демо/тест) =====
  default: {
    id: 'default', lang: 'ru', locale: 'ru-RU', dir: 'ltr',
    brandName: '727 AI · RU',
    subtitle: 'Нейросеть для анализа спорта',
    inputLabel: 'Ваш ID 1xBet',
    inputPlaceholder: 'Например: 10000000',
    inputDesc: 'ID можно найти в приложении 1xBet → Профиль',
    btnText: 'Продолжить',
    waitingTitle: 'Ожидание подтверждения',
    waitingDesc: 'Ваш ID отправлен менеджеру. Дождитесь активации.',
    primaryColor: '#ff8c00', icon: ICON_BOLT,
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
      loading: 'Загрузка приложения...', statOnline: 'Online', idError: 'Неверный ID',
      single: 'Одиночный', express: 'Экспресс', expressTitle: 'ЭКСПРЕСС', combined: 'Суммарная уверенность',
      howToBet: 'Как поставить ставку', videoSoon: 'Обучающее видео скоро появится',
      statsCapper: 'Статистика прогнозов', predictionsWord: 'прогнозов', accuracyWord: 'точность', per7d: 'за 7 дней',
      dailyTitle: 'Прогноз дня', dailyDesc: 'Бесплатный сигнал', dailyEmpty: 'Прогноз дня пока не задан',
      sportFootball: 'Футбол', sportBasketball: 'Баскетбол',
      idLowNote: 'ID ниже 168 — старый аккаунт, точность прогнозов может быть ниже.', howToFindId: 'Где взять ID?'
    }
  },

  // ===== Español =====
  es: {
    id: 'es', lang: 'es', locale: 'es-ES', dir: 'ltr',
    brandName: '727 AI · ES',
    subtitle: 'Inteligencia Artificial Deportiva',
    inputLabel: 'Tu ID de 1xBet',
    inputPlaceholder: 'Ejemplo: 10000000',
    inputDesc: 'Puedes encontrar tu ID en la app de 1xBet → Perfil',
    btnText: 'Continuar',
    waitingTitle: 'Esperando confirmación',
    waitingDesc: 'Tu ID ha sido enviado al gestor. Espera la activación.',
    primaryColor: '#00f2fe', icon: ICON_STAR,
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
      loading: 'Cargando aplicación...', statOnline: 'En línea', idError: 'ID inválido',
      single: 'Individual', express: 'Expreso', expressTitle: 'EXPRESO', combined: 'Confianza combinada',
      howToBet: 'Cómo hacer una apuesta', videoSoon: 'El video tutorial estará disponible pronto',
      statsCapper: 'Estadísticas de pronósticos', predictionsWord: 'pronósticos', accuracyWord: 'precisión', per7d: 'en 7 días',
      dailyTitle: 'Pronóstico del día', dailyDesc: 'Señal gratuita', dailyEmpty: 'Aún no disponible',
      sportFootball: 'Fútbol', sportBasketball: 'Baloncesto',
      idLowNote: 'ID inferior a 168 — cuenta antigua, la precisión puede ser menor.', howToFindId: '¿Dónde está mi ID?'
    }
  },

  // ===== Português =====
  pt: {
    id: 'pt', lang: 'pt', locale: 'pt-BR', dir: 'ltr',
    brandName: '727 AI · PT',
    subtitle: 'Inteligência Artificial Esportiva',
    inputLabel: 'Seu ID da 1xBet',
    inputPlaceholder: 'Exemplo: 10000000',
    inputDesc: 'Você encontra seu ID no app da 1xBet → Perfil',
    btnText: 'Continuar',
    waitingTitle: 'Aguardando confirmação',
    waitingDesc: 'Seu ID foi enviado ao gestor. Aguarde a ativação.',
    primaryColor: '#22c55e', icon: ICON_STAR,
    menu: {
      analysisTitle: 'Análise AI', analysisDesc: 'Análise profunda da partida',
      historyTitle: 'Histórico', historyDesc: 'Registro de sessões',
      newsTitle: 'Notícias', newsDesc: 'Novidades esportivas',
      supportTitle: 'Suporte', supportDesc: 'Falar com especialista'
    },
    ui: {
      back: 'Voltar', idLabel: 'ID', attemptsLeft: 'Palpites restantes',
      bannedTitle: 'Acesso bloqueado', bannedBtn: 'Sair',
      logoutConfirm: 'Tem certeza de que deseja sair?',
      analysisTitle: 'ANÁLISE AI',
      analysisInit: 'Sistema inicializado. Envie uma captura da partida ou digite os nomes dos times para iniciar a análise AI.',
      verdictTag: 'VEREDITO DA IA', confidence: 'Confiança',
      inputPlaceholder: 'Times ou captura...', errorPrefix: 'Erro',
      connError: 'Erro de conexão com o servidor.',
      historyTitle: 'HISTÓRICO', historyLoading: 'Carregando arquivo...',
      historyEmpty: 'Histórico vazio', historyEmptySub: 'Você ainda não fez palpites',
      archiveTag: 'ARQUIVO', undefinedResult: 'Indefinido', draw: 'Empate',
      newsMainTag: 'DESTAQUE', newsLatestTag: 'Últimas notícias', newsActualTag: 'ATUAL',
      newsRead: 'Ler →', newsUnavailable: 'Notícias temporariamente indisponíveis', newsTryLater: 'Tente mais tarde',
      loading: 'Carregando aplicativo...', statOnline: 'Online', idError: 'ID inválido',
      single: 'Simples', express: 'Múltipla', expressTitle: 'MÚLTIPLA', combined: 'Confiança combinada',
      howToBet: 'Como fazer uma aposta', videoSoon: 'O vídeo tutorial estará disponível em breve',
      statsCapper: 'Estatísticas de palpites', predictionsWord: 'palpites', accuracyWord: 'precisão', per7d: 'em 7 dias',
      dailyTitle: 'Palpite do dia', dailyDesc: 'Sinal gratuito', dailyEmpty: 'Ainda não disponível',
      sportFootball: 'Futebol', sportBasketball: 'Basquete',
      idLowNote: 'ID inferior a 168 — conta antiga, a precisão pode ser menor.', howToFindId: 'Onde está meu ID?'
    }
  },

  // ===== Français =====
  fr: {
    id: 'fr', lang: 'fr', locale: 'fr-FR', dir: 'ltr',
    brandName: '727 AI · FR',
    subtitle: 'Intelligence Artificielle Sportive',
    inputLabel: 'Votre ID 1xBet',
    inputPlaceholder: 'Exemple : 10000000',
    inputDesc: 'Vous trouverez votre ID dans l’app 1xBet → Profil',
    btnText: 'Continuer',
    waitingTitle: 'En attente de confirmation',
    waitingDesc: 'Votre ID a été envoyé au gestionnaire. Attendez l’activation.',
    primaryColor: '#6366f1', icon: ICON_STAR,
    menu: {
      analysisTitle: 'Analyse AI', analysisDesc: 'Analyse approfondie du match',
      historyTitle: 'Historique', historyDesc: 'Journal des sessions',
      newsTitle: 'Actualités', newsDesc: 'Actualités sportives',
      supportTitle: 'Support', supportDesc: 'Contacter un spécialiste'
    },
    ui: {
      back: 'Retour', idLabel: 'ID', attemptsLeft: 'Pronostics restants',
      bannedTitle: 'Accès bloqué', bannedBtn: 'Quitter',
      logoutConfirm: 'Êtes-vous sûr de vouloir quitter ?',
      analysisTitle: 'ANALYSE AI',
      analysisInit: 'Système initialisé. Téléchargez une capture du match ou saisissez les noms des équipes pour lancer l’analyse AI.',
      verdictTag: 'VERDICT DE L’IA', confidence: 'Confiance',
      inputPlaceholder: 'Équipes ou capture...', errorPrefix: 'Erreur',
      connError: 'Erreur de connexion au serveur.',
      historyTitle: 'HISTORIQUE', historyLoading: 'Chargement de l’archive...',
      historyEmpty: 'Historique vide', historyEmptySub: 'Vous n’avez pas encore fait de pronostics',
      archiveTag: 'ARCHIVE', undefinedResult: 'Indéfini', draw: 'Match nul',
      newsMainTag: 'À LA UNE', newsLatestTag: 'Dernières actualités', newsActualTag: 'ACTUEL',
      newsRead: 'Lire →', newsUnavailable: 'Actualités temporairement indisponibles', newsTryLater: 'Réessayez plus tard',
      loading: 'Chargement de l’application...', statOnline: 'En ligne', idError: 'ID invalide',
      single: 'Simple', express: 'Combiné', expressTitle: 'COMBINÉ', combined: 'Confiance combinée',
      howToBet: 'Comment placer un pari', videoSoon: 'La vidéo tutoriel sera bientôt disponible',
      statsCapper: 'Statistiques des pronostics', predictionsWord: 'pronostics', accuracyWord: 'précision', per7d: 'sur 7 jours',
      dailyTitle: 'Pronostic du jour', dailyDesc: 'Signal gratuit', dailyEmpty: 'Pas encore disponible',
      sportFootball: 'Football', sportBasketball: 'Basket',
      idLowNote: 'ID inférieur à 168 — ancien compte, la précision peut être moindre.', howToFindId: 'Où trouver mon ID ?'
    }
  },

  // ===== Türkçe =====
  tr: {
    id: 'tr', lang: 'tr', locale: 'tr-TR', dir: 'ltr',
    brandName: '727 AI · TR',
    subtitle: 'Spor Analizi için Yapay Zekâ',
    inputLabel: '1xBet ID’niz',
    inputPlaceholder: 'Örnek: 10000000',
    inputDesc: 'ID’nizi 1xBet uygulamasında → Profil bölümünde bulabilirsiniz',
    btnText: 'Devam',
    waitingTitle: 'Onay bekleniyor',
    waitingDesc: 'ID’niz yöneticiye gönderildi. Aktivasyonu bekleyin.',
    primaryColor: '#ef4444', icon: ICON_STAR,
    menu: {
      analysisTitle: 'AI Analiz', analysisDesc: 'Derinlemesine maç analizi',
      historyTitle: 'Geçmiş', historyDesc: 'Oturum kaydı',
      newsTitle: 'Haberler', newsDesc: 'Spor haberleri',
      supportTitle: 'Destek', supportDesc: 'Uzmanla iletişim'
    },
    ui: {
      back: 'Geri', idLabel: 'ID', attemptsLeft: 'Kalan tahmin',
      bannedTitle: 'Erişim engellendi', bannedBtn: 'Çıkış',
      logoutConfirm: 'Çıkmak istediğinizden emin misiniz?',
      analysisTitle: 'AI ANALİZ',
      analysisInit: 'Sistem başlatıldı. Maç ekran görüntüsünü yükleyin veya AI analizini başlatmak için takım adlarını girin.',
      verdictTag: 'YAPAY ZEKÂ KARARI', confidence: 'Güven',
      inputPlaceholder: 'Takımlar veya ekran görüntüsü...', errorPrefix: 'Hata',
      connError: 'Sunucu bağlantı hatası.',
      historyTitle: 'GEÇMİŞ', historyLoading: 'Arşiv yükleniyor...',
      historyEmpty: 'Geçmiş boş', historyEmptySub: 'Henüz tahmin yapmadınız',
      archiveTag: 'ARŞİV', undefinedResult: 'Belirsiz', draw: 'Beraberlik',
      newsMainTag: 'ÖNE ÇIKAN', newsLatestTag: 'Son haberler', newsActualTag: 'GÜNCEL',
      newsRead: 'Oku →', newsUnavailable: 'Haberler şu anda kullanılamıyor', newsTryLater: 'Daha sonra deneyin',
      loading: 'Uygulama yükleniyor...', statOnline: 'Çevrimiçi', idError: 'Geçersiz ID',
      single: 'Tekli', express: 'Kombine', expressTitle: 'KOMBİNE', combined: 'Toplam güven',
      howToBet: 'Nasıl bahis yapılır', videoSoon: 'Eğitim videosu yakında eklenecek',
      statsCapper: 'Tahmin istatistikleri', predictionsWord: 'tahmin', accuracyWord: 'isabet', per7d: '7 günde',
      dailyTitle: 'Günün tahmini', dailyDesc: 'Ücretsiz sinyal', dailyEmpty: 'Henüz mevcut değil',
      sportFootball: 'Futbol', sportBasketball: 'Basketbol',
      idLowNote: 'ID 168’in altında — eski hesap, isabet oranı düşük olabilir.', howToFindId: 'ID nerede?'
    }
  },

  // ===== Azərbaycan =====
  az: {
    id: 'az', lang: 'az', locale: 'az-AZ', dir: 'ltr',
    brandName: '727 AI · AZ',
    subtitle: 'İdman təhlili üçün Süni İntellekt',
    inputLabel: '1xBet ID-niz',
    inputPlaceholder: 'Məsələn: 10000000',
    inputDesc: 'ID-nizi 1xBet tətbiqində → Profil bölməsində tapa bilərsiniz',
    btnText: 'Davam et',
    waitingTitle: 'Təsdiq gözlənilir',
    waitingDesc: 'ID-niz menecerə göndərildi. Aktivləşməni gözləyin.',
    primaryColor: '#14b8a6', icon: ICON_GLOBE,
    menu: {
      analysisTitle: 'AI Təhlil', analysisDesc: 'Matçın dərin təhlili',
      historyTitle: 'Tarixçə', historyDesc: 'Sessiya jurnalı',
      newsTitle: 'Xəbərlər', newsDesc: 'İdman xəbərləri',
      supportTitle: 'Dəstək', supportDesc: 'Mütəxəssislə əlaqə'
    },
    ui: {
      back: 'Geri', idLabel: 'ID', attemptsLeft: 'Qalan proqnoz',
      bannedTitle: 'Giriş bloklandı', bannedBtn: 'Çıxış',
      logoutConfirm: 'Çıxmaq istədiyinizə əminsiniz?',
      analysisTitle: 'AI TƏHLİL',
      analysisInit: 'Sistem işə salındı. Matçın ekran görüntüsünü yükləyin və ya AI təhlilini başlatmaq üçün komanda adlarını daxil edin.',
      verdictTag: 'SÜNİ İNTELLEKT QƏRARI', confidence: 'Əminlik',
      inputPlaceholder: 'Komandalar və ya ekran görüntüsü...', errorPrefix: 'Xəta',
      connError: 'Server bağlantı xətası.',
      historyTitle: 'TARİXÇƏ', historyLoading: 'Arxiv yüklənir...',
      historyEmpty: 'Tarixçə boşdur', historyEmptySub: 'Hələ proqnoz verməmisiniz',
      archiveTag: 'ARXİV', undefinedResult: 'Müəyyən edilməyib', draw: 'Heç-heçə',
      newsMainTag: 'ƏSAS', newsLatestTag: 'Son xəbərlər', newsActualTag: 'AKTUAL',
      newsRead: 'Oxu →', newsUnavailable: 'Xəbərlər müvəqqəti əlçatmazdır', newsTryLater: 'Sonra cəhd edin',
      loading: 'Tətbiq yüklənir...', statOnline: 'Onlayn', idError: 'Yanlış ID',
      single: 'Tək', express: 'Ekspress', expressTitle: 'EKSPRESS', combined: 'Ümumi əminlik',
      howToBet: 'Mərc necə edilir', videoSoon: 'Təlim videosu tezliklə əlavə olunacaq',
      statsCapper: 'Proqnoz statistikası', predictionsWord: 'proqnoz', accuracyWord: 'dəqiqlik', per7d: '7 gündə',
      dailyTitle: 'Günün proqnozu', dailyDesc: 'Pulsuz siqnal', dailyEmpty: 'Hələ mövcud deyil',
      sportFootball: 'Futbol', sportBasketball: 'Basketbol',
      idLowNote: 'ID 168-dən aşağıdır — köhnə hesab, dəqiqlik aşağı ola bilər.', howToFindId: 'ID haradadır?'
    }
  }
};

// Алиас для совместимости со старым кодом (latam → es)
THEMES.latam = THEMES.es;

export const getThemeBySource = (source) => {
  if (!source) return null;
  const s = source.toLowerCase();
  if (s.includes('latam') || s.includes('peru') || s.includes('mx') || s.includes('co') || s.includes('_es') || s.includes('es_') || s.includes('spain')) return THEMES.es;
  if (s.includes('pt') || s.includes('brazil') || s.includes('brasil') || s.includes('portug')) return THEMES.pt;
  if (s.includes('fr') || s.includes('france') || s.includes('french')) return THEMES.fr;
  if (s.includes('tr') || s.includes('turk') || s.includes('türk')) return THEMES.tr;
  if (s.includes('az') || s.includes('azer') || s.includes('baku')) return THEMES.az;
  return null;
};

export const getThemeByLanguage = (lang) => {
  if (!lang) return null;
  const l = lang.toLowerCase();
  if (l.startsWith('es')) return THEMES.es;
  if (l.startsWith('pt')) return THEMES.pt;
  if (l.startsWith('fr')) return THEMES.fr;
  if (l.startsWith('tr')) return THEMES.tr;
  if (l.startsWith('az')) return THEMES.az;
  return null;
};

export const getTheme = (source, lang) => {
  return getThemeBySource(source) || getThemeByLanguage(lang) || THEMES.default;
};
