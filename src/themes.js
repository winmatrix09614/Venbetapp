// SVG-иконки (внутренняя разметка <svg>)
// Логотип PREDICT AI (картинка = иконка + название). Используется в базовых
// темах es/tr вместо текстового brandName. Положи файл по этому пути.
import LOGO_PREDICT_AI from './assets/logo-predict-ai.png';
// Логотип турецкого варианта 2 «Maç Tahmin AI» (картинка = иконка + название).
import LOGO_MAC_TAHMIN from './assets/logo-mac-tahmin.png';
// Логотип узбекского вар.1 «AI Tahlilchi» (зелёная звезда + название).
import LOGO_AI_TAHLILCHI from './assets/logo-ai-tahlilchi.png';
// Логотип узбекского вар.2 «VIP» (золотой VIP $).
import LOGO_VIP from './assets/logo-vip.png';
const ICON_BOLT = '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>';
const ICON_STAR = '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>';
const ICON_GLOBE = '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>';

export const THEMES = {
  // ===== Русский (демо/тест) =====
  default: {
    id: 'default', lang: 'ru', locale: 'ru-RU', dir: 'ltr',
    brandName: 'VenBet AI',
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
      bannedTitle: 'Доступ заблокирован', bannedBtn: 'Выйти', checkStatusBtn: 'Проверить статус',
      logoutConfirm: 'Вы уверены, что хотите выйти?',
      analysisTitle: 'AI АНАЛИЗ',
      analysisInit: 'Система инициализирована. Загрузите скриншот матча или введите названия команд для начала AI анализа.',
      verdictTag: 'ВЕРДИКТ НЕЙРОСЕТИ', confidence: 'Уверенность', baseConf: 'Базовая оценка', promoTitle: 'Сделай свой AI-прогноз', promoSub: 'Узнай, кто победит — за секунды', promoBtn: 'Начать', hiwTitle: 'Как это работает', hiwStep1: 'Введи 1xBet ID', hiwStep2: 'AI анализирует', hiwStep3: 'Ставишь увереннее', tickerTitle: 'Последние прогнозы AI', statBlockTitle: 'Статистика команд', statForm: 'Форма', statGoalsFor: 'Голы в среднем', statGoalsAg: 'Пропускает', statPoss: 'Владение %', statShots: 'Удары', statShotsOn: 'В створ', statCorners: 'Угловые', statH2H: 'Очные встречи', noH2H: 'Нет свежих очных встреч',
      inputPlaceholder: 'Команды или скриншот...', errorPrefix: 'Ошибка',
      connError: 'Ошибка соединения с сервером.',
      offlineTitle: 'Нет соединения', offlineDesc: 'Проверь интернет — мы автоматически переподключимся.', offlineRetry: 'Повторить',
      historyTitle: 'ИСТОРИЯ', historyLoading: 'Загрузка архива...',
      historyEmpty: 'История пуста', historyEmptySub: 'Вы еще не делали прогнозов',
      archiveTag: 'АРХИВ', undefinedResult: 'Неопределено', draw: 'Ничья',
      newsMainTag: 'ГЛАВНОЕ', newsLatestTag: 'Последние новости', newsActualTag: 'АКТУАЛЬНОЕ',
      newsRead: 'Читать →', newsUnavailable: 'Новости временно недоступны', newsTryLater: 'Попробуйте позже',
      loading: 'Загрузка приложения...', statOnline: 'Online', idError: 'Неверный ID',
      single: 'Одиночный', express: 'Экспресс', expressTitle: 'ЭКСПРЕСС', combined: 'Суммарная уверенность', expressTotal: 'Итоговый кф',
      howToBet: 'Как поставить ставку', videoSoon: 'Обучающее видео скоро появится',
      statsCapper: 'Статистика прогнозов', predictionsWord: 'прогнозов', accuracyWord: 'точность', per7d: 'за 7 дней',
      dailyTitle: 'Прогноз дня', dailyDesc: 'Бесплатный сигнал', dailyEmpty: 'Прогноз дня пока не задан',
      sportFootball: 'Футбол', sportBasketball: 'Баскетбол',
      idLowNote: 'ID ниже 168 — старый аккаунт, точность прогнозов может быть ниже.', howToFindId: 'Где взять ID?', singleNote: 'Это одиночная ставка — рекомендуем ставить отдельно.', expressNote: 'Готовый экспресс — ставьте его целиком, как составлен.', liveBadge: '🔴 LIVE {score}, {minute}′ · прогноз предматчевый', disclaimer: 'Это AI-аналитика, а не гарантия. Решение о ставке принимаете вы.'
    }
  },

  // ===== Español =====
  es: {
    id: 'es', lang: 'es', locale: 'es-ES', dir: 'ltr',
    loginMode: 'button',  // Испания/Betmen: вход без ID по кнопке Entrar
    logo: LOGO_PREDICT_AI,  // картинка вместо текстового brandName
    statAcc: '89%', statPro: '69.1K', onlineMin: 10000, onlineMax: 10580,  // плитки главной
    brandName: 'VenBet AI',
    subtitle: 'Inteligencia Artificial Deportiva',
    inputLabel: 'Tu ID de 1xBet',
    inputPlaceholder: 'Ejemplo: 10000000',
    inputDesc: 'Puedes encontrar tu ID en la app de 1xBet → Perfil',
    btnText: 'Continuar',
    waitingTitle: 'Esperando confirmación',
    waitingDesc: 'Tu ID ha sido enviado al gestor. Espera la activación.',
    primaryColor: '#19e3c0', icon: ICON_STAR,
    menu: {
      analysisTitle: 'Análisis IA', analysisDesc: 'Análisis profundo del partido',
      historyTitle: 'Historial', historyDesc: 'Registro de sesiones',
      newsTitle: 'Noticias', newsDesc: 'Novedades deportivas',
      supportTitle: 'Soporte', supportDesc: 'Contactar especialista'
    },
    ui: {
      back: 'Atrás', idLabel: 'ID', attemptsLeft: 'Pronósticos restantes',
      bannedTitle: 'Acceso bloqueado', bannedBtn: 'Salir', checkStatusBtn: 'Comprobar estado',
      logoutConfirm: '¿Seguro que quieres salir?',
      analysisTitle: 'ANÁLISIS IA',
      analysisInit: 'Sistema inicializado. Sube una captura del partido o escribe los nombres de los equipos para iniciar el análisis IA.',
      verdictTag: 'VEREDICTO DE LA IA', confidence: 'Confianza', baseConf: 'Evaluación base', promoTitle: 'Haz tu pronóstico con IA', promoSub: 'Descubre quién gana en segundos', promoBtn: 'Empezar', hiwTitle: 'Cómo funciona', hiwStep1: 'Ingresa tu 1xBet ID', hiwStep2: 'La IA analiza', hiwStep3: 'Apuestas con confianza', tickerTitle: 'Últimos pronósticos IA', statBlockTitle: 'Estadísticas', statForm: 'Forma', statGoalsFor: 'Goles (prom.)', statGoalsAg: 'Recibe', statPoss: 'Posesión %', statShots: 'Tiros', statShotsOn: 'A puerta', statCorners: 'Córners', statH2H: 'Enfrentamientos', noH2H: 'No hay enfrentamientos recientes',
      inputPlaceholder: 'Equipos o captura...', errorPrefix: 'Error',
      connError: 'Error de conexión con el servidor.',
      offlineTitle: 'Sin conexión', offlineDesc: 'Revisa tu internet — nos reconectaremos automáticamente.', offlineRetry: 'Reintentar',
      historyTitle: 'HISTORIAL', historyLoading: 'Cargando archivo...',
      historyEmpty: 'Historial vacío', historyEmptySub: 'Aún no has hecho pronósticos',
      archiveTag: 'ARCHIVO', undefinedResult: 'Indefinido', draw: 'Empate',
      newsMainTag: 'DESTACADO', newsLatestTag: 'Últimas noticias', newsActualTag: 'ACTUAL',
      newsRead: 'Leer →', newsUnavailable: 'Noticias no disponibles temporalmente', newsTryLater: 'Inténtalo más tarde',
      loading: 'Cargando aplicación...', statOnline: 'En línea', idError: 'ID inválido',
      single: 'Individual', express: 'Expreso', expressTitle: 'EXPRESO', combined: 'Confianza combinada', expressTotal: 'Cuota total',
      howToBet: 'Cómo hacer una apuesta', entrarBtn: 'Entrar', videoSoon: 'El video tutorial estará disponible pronto',
      statsCapper: 'Estadísticas de pronósticos', predictionsWord: 'pronósticos', accuracyWord: 'precisión', per7d: 'en 7 días',
      dailyTitle: 'Pronóstico del día', dailyDesc: 'Señal gratuita', dailyEmpty: 'Aún no disponible',
      sportFootball: 'Fútbol', sportBasketball: 'Baloncesto',
      idLowNote: 'ID inferior a 168 — cuenta antigua, la precisión puede ser menor.', howToFindId: '¿Dónde está mi ID?', singleNote: 'Es una apuesta simple — recomendamos apostarla por separado.', expressNote: 'Combinada lista — apuéstala completa, tal como está.', liveBadge: '🔴 LIVE {score}, {minute}′ · pronóstico previo al partido', disclaimer: 'Esto es análisis de IA, no una garantía. La decisión de apostar es tuya.'
    }
  },

  // ===== Português =====
  pt: {
    id: 'pt', lang: 'pt', locale: 'pt-BR', dir: 'ltr',
    brandName: 'PortuBet AI',
    subtitle: 'Inteligência Artificial Esportiva',
    inputLabel: 'Seu ID da 1xBet',
    inputPlaceholder: 'Exemplo: 10000000',
    inputDesc: 'Você encontra seu ID no app da 1xBet → Perfil',
    btnText: 'Continuar',
    waitingTitle: 'Aguardando confirmação',
    waitingDesc: 'Seu ID foi enviado ao gestor. Aguarde a ativação.',
    primaryColor: '#22c55e', icon: ICON_STAR,
    menu: {
      analysisTitle: 'Análise IA', analysisDesc: 'Análise profunda da partida',
      historyTitle: 'Histórico', historyDesc: 'Registro de sessões',
      newsTitle: 'Notícias', newsDesc: 'Novidades esportivas',
      supportTitle: 'Suporte', supportDesc: 'Falar com especialista'
    },
    ui: {
      back: 'Voltar', idLabel: 'ID', attemptsLeft: 'Palpites restantes',
      bannedTitle: 'Acesso bloqueado', bannedBtn: 'Sair', checkStatusBtn: 'Verificar status',
      logoutConfirm: 'Tem certeza de que deseja sair?',
      analysisTitle: 'ANÁLISE IA',
      analysisInit: 'Sistema inicializado. Envie uma captura da partida ou digite os nomes dos times para iniciar a análise IA.',
      verdictTag: 'VEREDITO DA IA', confidence: 'Confiança', baseConf: 'Avaliação base', promoTitle: 'Faça seu palpite com IA', promoSub: 'Descubra quem vence em segundos', promoBtn: 'Começar', hiwTitle: 'Como funciona', hiwStep1: 'Insira seu 1xBet ID', hiwStep2: 'A IA analisa', hiwStep3: 'Aposta com confiança', tickerTitle: 'Últimos palpites IA', statBlockTitle: 'Estatísticas', statForm: 'Forma', statGoalsFor: 'Gols (méd.)', statGoalsAg: 'Sofre', statPoss: 'Posse %', statShots: 'Chutes', statShotsOn: 'No gol', statCorners: 'Escanteios', statH2H: 'Confrontos', noH2H: 'Sem confrontos recentes',
      inputPlaceholder: 'Times ou captura...', errorPrefix: 'Erro',
      connError: 'Erro de conexão com o servidor.',
      offlineTitle: 'Sem conexão', offlineDesc: 'Verifique sua internet — vamos reconectar automaticamente.', offlineRetry: 'Tentar novamente',
      historyTitle: 'HISTÓRICO', historyLoading: 'Carregando arquivo...',
      historyEmpty: 'Histórico vazio', historyEmptySub: 'Você ainda não fez palpites',
      archiveTag: 'ARQUIVO', undefinedResult: 'Indefinido', draw: 'Empate',
      newsMainTag: 'DESTAQUE', newsLatestTag: 'Últimas notícias', newsActualTag: 'ATUAL',
      newsRead: 'Ler →', newsUnavailable: 'Notícias temporariamente indisponíveis', newsTryLater: 'Tente mais tarde',
      loading: 'Carregando aplicativo...', statOnline: 'Online', idError: 'ID inválido',
      single: 'Simples', express: 'Múltipla', expressTitle: 'MÚLTIPLA', combined: 'Confiança combinada', expressTotal: 'Odd total',
      howToBet: 'Como fazer uma aposta', videoSoon: 'O vídeo tutorial estará disponível em breve',
      statsCapper: 'Estatísticas de palpites', predictionsWord: 'palpites', accuracyWord: 'precisão', per7d: 'em 7 dias',
      dailyTitle: 'Palpite do dia', dailyDesc: 'Sinal gratuito', dailyEmpty: 'Ainda não disponível',
      sportFootball: 'Futebol', sportBasketball: 'Basquete',
      idLowNote: 'ID inferior a 168 — conta antiga, a precisão pode ser menor.', howToFindId: 'Onde está meu ID?', singleNote: 'É uma aposta simples — recomendamos apostá-la separadamente.', expressNote: 'Múltipla pronta — aposte-a inteira, como está montada.', liveBadge: '🔴 LIVE {score}, {minute}′ · palpite pré-jogo', disclaimer: 'Isto é análise de IA, não uma garantia. A decisão de apostar é sua.'
    }
  },

  // ===== Français =====
  fr: {
    id: 'fr', lang: 'fr', locale: 'fr-FR', dir: 'ltr',
    brandName: 'FranBet AI',
    subtitle: 'Intelligence Artificielle Sportive',
    inputLabel: 'Votre ID 1xBet',
    inputPlaceholder: 'Exemple : 10000000',
    inputDesc: 'Vous trouverez votre ID dans l’app 1xBet → Profil',
    btnText: 'Continuer',
    waitingTitle: 'En attente de confirmation',
    waitingDesc: 'Votre ID a été envoyé au gestionnaire. Attendez l’activation.',
    primaryColor: '#6366f1', icon: ICON_STAR,
    menu: {
      analysisTitle: 'Analyse IA', analysisDesc: 'Analyse approfondie du match',
      historyTitle: 'Historique', historyDesc: 'Journal des sessions',
      newsTitle: 'Actualités', newsDesc: 'Actualités sportives',
      supportTitle: 'Support', supportDesc: 'Contacter un spécialiste'
    },
    ui: {
      back: 'Retour', idLabel: 'ID', attemptsLeft: 'Pronostics restants',
      bannedTitle: 'Accès bloqué', bannedBtn: 'Quitter', checkStatusBtn: 'Vérifier le statut',
      logoutConfirm: 'Êtes-vous sûr de vouloir quitter ?',
      analysisTitle: 'ANALYSE IA',
      analysisInit: 'Système initialisé. Téléchargez une capture du match ou saisissez les noms des équipes pour lancer l’analyse IA.',
      verdictTag: 'VERDICT DE L’IA', confidence: 'Confiance', baseConf: 'Évaluation de base', promoTitle: 'Fais ton pronostic IA', promoSub: 'Découvre qui gagne en quelques secondes', promoBtn: 'Commencer', hiwTitle: 'Comment ça marche', hiwStep1: 'Entre ton 1xBet ID', hiwStep2: "L'IA analyse", hiwStep3: 'Parie en confiance', tickerTitle: 'Derniers pronostics IA', statBlockTitle: 'Statistiques', statForm: 'Forme', statGoalsFor: 'Buts (moy.)', statGoalsAg: 'Encaisse', statPoss: 'Possession %', statShots: 'Tirs', statShotsOn: 'Cadrés', statCorners: 'Corners', statH2H: 'Confrontations', noH2H: 'Pas de confrontations récentes',
      inputPlaceholder: 'Équipes ou capture...', errorPrefix: 'Erreur',
      connError: 'Erreur de connexion au serveur.',
      offlineTitle: 'Pas de connexion', offlineDesc: 'Vérifie ta connexion — on se reconnecte automatiquement.', offlineRetry: 'Réessayer',
      historyTitle: 'HISTORIQUE', historyLoading: 'Chargement de l’archive...',
      historyEmpty: 'Historique vide', historyEmptySub: 'Vous n’avez pas encore fait de pronostics',
      archiveTag: 'ARCHIVE', undefinedResult: 'Indéfini', draw: 'Match nul',
      newsMainTag: 'À LA UNE', newsLatestTag: 'Dernières actualités', newsActualTag: 'ACTUEL',
      newsRead: 'Lire →', newsUnavailable: 'Actualités temporairement indisponibles', newsTryLater: 'Réessayez plus tard',
      loading: 'Chargement de l’application...', statOnline: 'En ligne', idError: 'ID invalide',
      single: 'Simple', express: 'Combiné', expressTitle: 'COMBINÉ', combined: 'Confiance combinée', expressTotal: 'Cote totale',
      howToBet: 'Comment placer un pari', videoSoon: 'La vidéo tutoriel sera bientôt disponible',
      statsCapper: 'Statistiques des pronostics', predictionsWord: 'pronostics', accuracyWord: 'précision', per7d: 'sur 7 jours',
      dailyTitle: 'Pronostic du jour', dailyDesc: 'Signal gratuit', dailyEmpty: 'Pas encore disponible',
      sportFootball: 'Football', sportBasketball: 'Basket',
      idLowNote: 'ID inférieur à 168 — ancien compte, la précision peut être moindre.', howToFindId: 'Où trouver mon ID ?', singleNote: 'C’est un pari simple — nous recommandons de le jouer séparément.', expressNote: 'Combiné prêt — jouez-le en entier, tel quel.', liveBadge: '🔴 LIVE {score}, {minute}′ · pronostic d’avant-match', disclaimer: 'Ceci est une analyse IA, pas une garantie. La décision de parier vous appartient.'
    }
  },

  // ===== Türkçe =====
  tr: {
    id: 'tr', lang: 'tr', locale: 'tr-TR', dir: 'ltr',
    logo: LOGO_PREDICT_AI,  // картинка вместо текстового brandName
    statAcc: '89%', statPro: '69.1K', onlineMin: 10000, onlineMax: 10580,  // плитки главной
    brandName: 'TurBet AI',
    subtitle: 'Spor Analizi için Yapay Zekâ',
    inputLabel: '1xBet ID’niz',
    inputPlaceholder: 'Örnek: 10000000',
    inputDesc: 'ID’nizi 1xBet uygulamasında → Profil bölümünde bulabilirsiniz',
    btnText: 'Devam',
    waitingTitle: 'Onay bekleniyor',
    waitingDesc: 'ID’niz yöneticiye gönderildi. Aktivasyonu bekleyin.',
    primaryColor: '#19e3c0', icon: ICON_STAR,
    menu: {
      analysisTitle: 'Yapay Zekâ Analizi', analysisDesc: 'Derinlemesine maç analizi',
      historyTitle: 'Geçmiş', historyDesc: 'Oturum kaydı',
      newsTitle: 'Haberler', newsDesc: 'Spor haberleri',
      supportTitle: 'Destek', supportDesc: 'Uzmanla iletişim'
    },
    ui: {
      back: 'Geri', idLabel: 'ID', attemptsLeft: 'Kalan tahmin',
      bannedTitle: 'Erişim engellendi', bannedBtn: 'Çıkış', checkStatusBtn: 'Durumu kontrol et',
      logoutConfirm: 'Çıkmak istediğinizden emin misiniz?',
      analysisTitle: 'YAPAY ZEKÂ ANALİZİ',
      analysisInit: 'Sistem başlatıldı. Maç ekran görüntüsünü yükleyin veya yapay zekâ analizini başlatmak için takım adlarını girin.',
      verdictTag: 'YAPAY ZEKÂ KARARI', confidence: 'Güven', baseConf: 'Temel değerlendirme', promoTitle: 'Yapay zekâ tahminini yap', promoSub: 'Kim kazanır saniyeler içinde öğren', promoBtn: 'Başla', hiwTitle: 'Nasıl çalışır', hiwStep1: '1xBet ID gir', hiwStep2: 'Yapay zekâ analiz eder', hiwStep3: 'Güvenle bahis yap', tickerTitle: 'Son yapay zekâ tahminleri', statBlockTitle: 'İstatistikler', statForm: 'Form', statGoalsFor: 'Gol (ort.)', statGoalsAg: 'Yediği gol', statPoss: 'Topla oynama %', statShots: 'Şutlar', statShotsOn: 'İsabetli', statCorners: 'Kornerler', statH2H: 'Karşılaşmalar', noH2H: 'Yakın zamanda karşılaşma yok',
      inputPlaceholder: 'Takımlar veya ekran görüntüsü...', errorPrefix: 'Hata',
      connError: 'Sunucu bağlantı hatası.',
      offlineTitle: 'Bağlantı yok', offlineDesc: 'İnternetini kontrol et — otomatik olarak yeniden bağlanacağız.', offlineRetry: 'Tekrar dene',
      historyTitle: 'GEÇMİŞ', historyLoading: 'Arşiv yükleniyor...',
      historyEmpty: 'Geçmiş boş', historyEmptySub: 'Henüz tahmin yapmadınız',
      archiveTag: 'ARŞİV', undefinedResult: 'Belirsiz', draw: 'Beraberlik',
      newsMainTag: 'ÖNE ÇIKAN', newsLatestTag: 'Son haberler', newsActualTag: 'GÜNCEL',
      newsRead: 'Oku →', newsUnavailable: 'Haberler şu anda kullanılamıyor', newsTryLater: 'Daha sonra deneyin',
      loading: 'Uygulama yükleniyor...', statOnline: 'Çevrimiçi', idError: 'Geçersiz ID',
      single: 'Tekli', express: 'Kombine', expressTitle: 'KOMBİNE', combined: 'Toplam güven', expressTotal: 'Toplam oran',
      howToBet: 'Nasıl bahis yapılır', videoSoon: 'Eğitim videosu yakında eklenecek',
      statsCapper: 'Tahmin istatistikleri', predictionsWord: 'tahmin', accuracyWord: 'isabet', per7d: '7 günde',
      dailyTitle: 'Günün tahmini', dailyDesc: 'Ücretsiz sinyal', dailyEmpty: 'Henüz mevcut değil',
      sportFootball: 'Futbol', sportBasketball: 'Basketbol',
      idLowNote: 'ID 168’in altında — eski hesap, isabet oranı düşük olabilir.', howToFindId: 'ID nerede?', singleNote: 'Bu tekli bahis — ayrı oynamanızı öneririz.', expressNote: 'Hazır kombine — olduğu gibi bütün halinde oynayın.', liveBadge: '🔴 CANLI {score}, {minute}′ · maç öncesi tahmin', disclaimer: 'Bu bir yapay zekâ analizidir, garanti değildir. Bahis kararı size aittir.'
    }
  },

  // ===== Azərbaycan =====
  az: {
    id: 'az', lang: 'az', locale: 'az-AZ', dir: 'ltr',
    brandName: 'AzBet AI',
    subtitle: 'İdman təhlili üçün Süni İntellekt',
    inputLabel: '1xBet ID-niz',
    inputPlaceholder: 'Məsələn: 10000000',
    inputDesc: 'ID-nizi 1xBet tətbiqində → Profil bölməsində tapa bilərsiniz',
    btnText: 'Davam et',
    waitingTitle: 'Təsdiq gözlənilir',
    waitingDesc: 'ID-niz menecerə göndərildi. Aktivləşməni gözləyin.',
    primaryColor: '#14b8a6', icon: ICON_GLOBE,
    menu: {
      analysisTitle: 'Süni İntellekt Təhlili', analysisDesc: 'Matçın dərin təhlili',
      historyTitle: 'Tarixçə', historyDesc: 'Sessiya jurnalı',
      newsTitle: 'Xəbərlər', newsDesc: 'İdman xəbərləri',
      supportTitle: 'Dəstək', supportDesc: 'Mütəxəssislə əlaqə'
    },
    ui: {
      back: 'Geri', idLabel: 'ID', attemptsLeft: 'Qalan proqnoz',
      bannedTitle: 'Giriş bloklandı', bannedBtn: 'Çıxış', checkStatusBtn: 'Statusu yoxla',
      logoutConfirm: 'Çıxmaq istədiyinizə əminsiniz?',
      analysisTitle: 'SÜNİ İNTELLEKT TƏHLİLİ',
      analysisInit: 'Sistem işə salındı. Matçın ekran görüntüsünü yükləyin və ya süni intellekt təhlilini başlatmaq üçün komanda adlarını daxil edin.',
      verdictTag: 'SÜNİ İNTELLEKT QƏRARI', confidence: 'Əminlik', baseConf: 'Baza qiymət', promoTitle: 'Süni intellekt proqnozunu et', promoSub: 'Kimin qazanacağını saniyələrdə öyrən', promoBtn: 'Başla', hiwTitle: 'Necə işləyir', hiwStep1: '1xBet ID daxil et', hiwStep2: 'Süni intellekt təhlil edir', hiwStep3: 'Əminliklə mərc et', tickerTitle: 'Son süni intellekt proqnozları', statBlockTitle: 'Komanda statistikası', statForm: 'Forma', statGoalsFor: 'Qol (orta)', statGoalsAg: 'Buraxır', statPoss: 'Topa sahiblik %', statShots: 'Zərbələr', statShotsOn: 'Dəqiq', statCorners: 'Künc', statH2H: 'Qarşılaşmalar', noH2H: 'Son qarşılaşma yoxdur',
      inputPlaceholder: 'Komandalar və ya ekran görüntüsü...', errorPrefix: 'Xəta',
      connError: 'Server bağlantı xətası.',
      offlineTitle: 'Bağlantı yoxdur', offlineDesc: 'İnternetini yoxla — avtomatik yenidən qoşulacağıq.', offlineRetry: 'Yenidən cəhd et',
      historyTitle: 'TARİXÇƏ', historyLoading: 'Arxiv yüklənir...',
      historyEmpty: 'Tarixçə boşdur', historyEmptySub: 'Hələ proqnoz verməmisiniz',
      archiveTag: 'ARXİV', undefinedResult: 'Müəyyən edilməyib', draw: 'Heç-heçə',
      newsMainTag: 'ƏSAS', newsLatestTag: 'Son xəbərlər', newsActualTag: 'AKTUAL',
      newsRead: 'Oxu →', newsUnavailable: 'Xəbərlər müvəqqəti əlçatmazdır', newsTryLater: 'Sonra cəhd edin',
      loading: 'Tətbiq yüklənir...', statOnline: 'Onlayn', idError: 'Yanlış ID',
      single: 'Tək', express: 'Ekspress', expressTitle: 'EKSPRESS', combined: 'Ümumi əminlik', expressTotal: 'Ümumi əmsal',
      howToBet: 'Mərc necə edilir', videoSoon: 'Təlim videosu tezliklə əlavə olunacaq',
      statsCapper: 'Proqnoz statistikası', predictionsWord: 'proqnoz', accuracyWord: 'dəqiqlik', per7d: '7 gündə',
      dailyTitle: 'Günün proqnozu', dailyDesc: 'Pulsuz siqnal', dailyEmpty: 'Hələ mövcud deyil',
      sportFootball: 'Futbol', sportBasketball: 'Basketbol',
      idLowNote: 'ID 168-dən aşağıdır — köhnə hesab, dəqiqlik aşağı ola bilər.', howToFindId: 'ID haradadır?', singleNote: 'Bu tək mərcdir — ayrıca oynamağı tövsiyə edirik.', expressNote: 'Hazır ekspress — olduğu kimi bütöv oynayın.', liveBadge: '🔴 CANLI {score}, {minute}′ · oyun öncəsi proqnoz', disclaimer: 'Bu süni intellekt təhlilidir, zəmanət deyil. Mərc qərarı sizindir.'
    }
  },

  // ===== Ўзбекча (узбекский, кириллица) =====
  uz: {
    id: 'uz', lang: 'uz', locale: 'uz-UZ', dir: 'ltr',
    logo: LOGO_AI_TAHLILCHI,
    brandName: 'AI Tahlilchi',
    botHandle: 'getaisport_bot',
    subtitle: 'Sport oyinlarini analiz qiluvchi AI',
    inputLabel: 'Mostbet ID raqamingiz',
    inputPlaceholder: 'Masalan: 278000000',
    inputDesc: 'ID raqamingizni Mostbet saytida → Profil bo\'limida topasiz',
    btnText: 'Davom ettirish',
    waitingTitle: 'Tasdiq kutilmoqda',
    waitingDesc: 'ID raqamingiz administratorga yuborildi. Faollashtirishni kuting.',
    primaryColor: '#3ddc5c', icon: ICON_STAR,
    menu: {
      analysisTitle: 'AI Tahlil', analysisDesc: 'Batafsil o\'yin tahlili',
      historyTitle: 'Tarix', historyDesc: 'Sessiyalar jurnali',
      newsTitle: 'Yangiliklar', newsDesc: 'Sport yangiliklari',
      supportTitle: 'Qollab quvvatlash', supportDesc: 'Mutaxassis bilan bog\'lanish'
    },
    ui: {
      back: 'Orqaga', idLabel: 'ID', attemptsLeft: 'Qolgan prognozlar',
      bannedTitle: 'Kirish taqiqlangan', bannedBtn: 'Chiqish', checkStatusBtn: 'Holatni tekshirish',
      logoutConfirm: 'Rostdan ham chiqmoqchimisiz?',
      analysisTitle: 'AI TAHLIL',
      analysisInit: 'Tizim muvaffaqiyatli ishga tushirildi. AI tahlilini boshlash uchun o\'yin skrinshotini yuboring yoki jamoalar nomini kiriting.',
      verdictTag: 'AI QARORI', confidence: 'Ishonch', baseConf: 'Asosiy baholash', promoTitle: 'Ozingizning AI-prognozizni boshlang', promoSub: 'Kim yutishini 1 daqiqada bilib oling', promoBtn: 'Boshlash', hiwTitle: 'Bu qanday ishlaydi', hiwStep1: 'Mostbet ID sini yozing', hiwStep2: 'AI analiz qiladi', hiwStep3: 'Ishonchli stavka qilasiz', tickerTitle: 'Songi prognozlar', statBlockTitle: 'Statistika', statForm: 'Shakl', statGoalsFor: 'Gollar (o\'rt.)', statGoalsAg: 'O\'tkazadi', statPoss: 'Topga egalik %', statShots: 'Zarbalar', statShotsOn: 'Aniq', statCorners: 'Burchaklar', statH2H: 'Uchrashuvlar', noH2H: 'Songi uchrashuvlar yo\'q',
      inputPlaceholder: 'Jamoalar nomi yoki skrinshot...', errorPrefix: 'Xato',
      connError: 'Server bilan aloqa xatosi.',
      offlineTitle: 'Aloqa yo\'q', offlineDesc: 'Internetingizni tekshiring — biz avtomatik qayta ulanamiz.', offlineRetry: 'Qayta urinish',
      historyTitle: 'TARIX', historyLoading: 'Arxiv yuklanmoqda...',
      historyEmpty: 'Tarix bo\'sh', historyEmptySub: 'Hali prognoz qilmagansiz',
      archiveTag: 'ARXIV', undefinedResult: 'Aniqlanmagan', draw: 'Durang',
      newsMainTag: 'TANLANGAN', newsLatestTag: 'Songi yangiliklar', newsActualTag: 'DOLZARB',
      newsRead: 'O\'qish →', newsUnavailable: 'Yangiliklar hozircha mavjud emas', newsTryLater: 'Keyinroq urinib ko\'ring',
      loading: 'Ilova yuklanmoqda...', statOnline: 'Onlayn', idError: 'Noto\'g\'ri ID',
      single: 'Yakka', express: 'Ekspress', expressTitle: 'EKSPRESS', combined: 'Umumiy ishonch', expressTotal: 'Umumiy koef',
      howToBet: 'Qanday stavka qilish', videoSoon: 'O\'quv videosi tez orada qo\'shiladi',
      statsCapper: 'Prognoz statistikasi', predictionsWord: 'prognoz', accuracyWord: 'aniqlik', per7d: 'Oxirgi 7 kun natijasi',
      dailyTitle: 'Bugungi prognoz', dailyDesc: 'Bepul prognoz', dailyEmpty: 'Hali mavjud emas',
      sportFootball: 'Futbol', sportBasketball: 'Basketbol',
      idLowNote: '278 dan kam ID - eski akkaunt. Bu yutish ehtimolligini kamaytiradi.', howToFindId: 'ID ni qaerdan olaman?', singleNote: 'Bu yakka stavka — alohida o\'ynashni tavsiya qilamiz.', expressNote: 'Tayyor ekspress — qanday bo\'lsa shunday to\'liq o\'ynang.', liveBadge: '🔴 JONLI {score}, {minute}′ · o\'yin oldi prognozi', disclaimer: 'Bu AI tahlili, kafolat emas. Stavka qarori sizga bog\'liq.'
    }
  },

  // ===== English (фоллбэк для неопознанных языков) =====
  ar: {
    id: 'ar', lang: 'ar', locale: 'ar-JO', dir: 'rtl',
    brandName: 'VenBet AI',
    subtitle: 'تحليلات رياضية بالذكاء الاصطناعي',
    inputLabel: 'معرّف 1xBet الخاص بك',
    inputPlaceholder: 'مثال: 10000000',
    inputDesc: 'ابحث عن معرّفك في تطبيق 1xBet ← الملف الشخصي',
    btnText: 'متابعة',
    waitingTitle: 'بانتظار التأكيد',
    waitingDesc: 'تم إرسال معرّفك إلى المدير. يرجى انتظار التفعيل.',
    primaryColor: '#ff8c00', icon: ICON_BOLT,
    menu: {
      analysisTitle: 'تحليل الذكاء الاصطناعي', analysisDesc: 'تحليل معمّق للمباراة',
      historyTitle: 'السجل', historyDesc: 'سجل الجلسات',
      newsTitle: 'الأخبار', newsDesc: 'أخبار رياضية',
      supportTitle: 'الدعم', supportDesc: 'تواصل مع مختص'
    },
    ui: {
      back: 'رجوع', idLabel: 'المعرّف', attemptsLeft: 'التوقعات المتبقية',
      bannedTitle: 'تم حظر الوصول', bannedBtn: 'تسجيل الخروج', checkStatusBtn: 'تحقق من الحالة',
      logoutConfirm: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
      analysisTitle: 'تحليل الذكاء الاصطناعي',
      analysisInit: 'تمت تهيئة النظام. ارفع لقطة شاشة للمباراة أو أدخل أسماء الفرق لبدء التحليل بالذكاء الاصطناعي.',
      verdictTag: 'قرار الذكاء الاصطناعي', confidence: 'نسبة الثقة', baseConf: 'التقدير الأساسي', promoTitle: 'احصل على توقعك بالذكاء الاصطناعي', promoSub: 'اعرف الفائز خلال ثوانٍ', promoBtn: 'ابدأ', hiwTitle: 'كيف يعمل', hiwStep1: 'أدخل معرّف 1xBet', hiwStep2: 'الذكاء الاصطناعي يحلّل', hiwStep3: 'راهن بثقة', tickerTitle: 'أحدث توقعات الذكاء الاصطناعي', statBlockTitle: 'إحصائيات الفريق', statForm: 'الأداء', statGoalsFor: 'الأهداف (المعدل)', statGoalsAg: 'يستقبل', statPoss: 'الاستحواذ %', statShots: 'التسديدات', statShotsOn: 'على المرمى', statCorners: 'الركنيات', statH2H: 'المواجهات المباشرة', noH2H: 'لا توجد مواجهات حديثة',
      inputPlaceholder: 'الفرق أو لقطة شاشة...', errorPrefix: 'خطأ',
      connError: 'خطأ في الاتصال بالخادم.',
      offlineTitle: 'لا يوجد اتصال', offlineDesc: 'تحقق من اتصالك بالإنترنت — سنعيد الاتصال تلقائياً.', offlineRetry: 'إعادة المحاولة',
      historyTitle: 'السجل', historyLoading: 'جارٍ تحميل الأرشيف...',
      historyEmpty: 'السجل فارغ', historyEmptySub: 'لم تقم بأي توقعات بعد',
      archiveTag: 'الأرشيف', undefinedResult: 'غير محسوم', draw: 'تعادل',
      newsMainTag: 'الأبرز', newsLatestTag: 'آخر الأخبار', newsActualTag: 'الرائج',
      newsRead: 'اقرأ ←', newsUnavailable: 'الأخبار غير متوفرة مؤقتاً', newsTryLater: 'حاول مرة أخرى لاحقاً',
      loading: 'جارٍ تحميل التطبيق...', statOnline: 'متصل', idError: 'معرّف غير صالح',
      single: 'فردي', express: 'مجمّع', expressTitle: 'مجمّع', combined: 'الثقة الإجمالية', expressTotal: 'إجمالي الأودز',
      howToBet: 'كيفية وضع الرهان', videoSoon: 'فيديو تعليمي قريباً',
      statsCapper: 'إحصائيات التوقعات', predictionsWord: 'توقعات', accuracyWord: 'الدقة', per7d: 'آخر 7 أيام',
      dailyTitle: 'توقع اليوم', dailyDesc: 'إشارة مجانية', dailyEmpty: 'لا يوجد توقع لليوم بعد',
      sportFootball: 'كرة القدم', sportBasketball: 'كرة السلة',
      idLowNote: 'المعرّف أقل من 168 — حساب قديم، قد تكون دقة التوقعات أقل.', howToFindId: 'أين أجد المعرّف؟', singleNote: 'هذا رهان فردي — ننصح بوضعه بشكل منفصل.', expressNote: 'مجمّع جاهز — ضعه كاملاً كما هو.', liveBadge: '🔴 مباشر {score}، {minute}′ · توقع قبل المباراة', disclaimer: 'هذا تحليل بالذكاء الاصطناعي وليس ضماناً. قرار الرهان يعود إليك.'
    }
  },

  en: {
    id: 'en', lang: 'en', locale: 'en-US', dir: 'ltr',
    brandName: 'VenBet AI',
    subtitle: 'AI Sports Analytics',
    inputLabel: 'Your 1xBet ID',
    inputPlaceholder: 'e.g. 10000000',
    inputDesc: 'Find your ID in the 1xBet app → Profile',
    btnText: 'Continue',
    waitingTitle: 'Awaiting confirmation',
    waitingDesc: 'Your ID was sent to a manager. Please wait for activation.',
    primaryColor: '#ff8c00', icon: ICON_BOLT,
    menu: {
      analysisTitle: 'AI Analysis', analysisDesc: 'Deep match breakdown',
      historyTitle: 'History', historyDesc: 'Session log',
      newsTitle: 'News', newsDesc: 'Sports news',
      supportTitle: 'Support', supportDesc: 'Contact a specialist'
    },
    ui: {
      back: 'Back', idLabel: 'ID', attemptsLeft: 'Predictions left',
      bannedTitle: 'Access blocked', bannedBtn: 'Log out', checkStatusBtn: 'Check status',
      logoutConfirm: 'Are you sure you want to log out?',
      analysisTitle: 'AI ANALYSIS',
      analysisInit: 'System initialized. Upload a match screenshot or enter team names to start the AI analysis.',
      verdictTag: 'AI VERDICT', confidence: 'Confidence', baseConf: 'Base estimate', promoTitle: 'Make your AI prediction', promoSub: 'Find out who wins in seconds', promoBtn: 'Start', hiwTitle: 'How it works', hiwStep1: 'Enter 1xBet ID', hiwStep2: 'AI analyzes', hiwStep3: 'Bet with confidence', tickerTitle: 'Latest AI predictions', statBlockTitle: 'Team stats', statForm: 'Form', statGoalsFor: 'Goals (avg)', statGoalsAg: 'Concedes', statPoss: 'Possession %', statShots: 'Shots', statShotsOn: 'On target', statCorners: 'Corners', statH2H: 'Head-to-head', noH2H: 'No recent head-to-head',
      inputPlaceholder: 'Teams or screenshot...', errorPrefix: 'Error',
      connError: 'Server connection error.',
      offlineTitle: 'No connection', offlineDesc: 'Check your internet — we\u2019ll reconnect automatically.', offlineRetry: 'Retry',
      historyTitle: 'HISTORY', historyLoading: 'Loading archive...',
      historyEmpty: 'History is empty', historyEmptySub: 'You haven\'t made any predictions yet',
      archiveTag: 'ARCHIVE', undefinedResult: 'Undecided', draw: 'Draw',
      newsMainTag: 'TOP', newsLatestTag: 'Latest news', newsActualTag: 'TRENDING',
      newsRead: 'Read →', newsUnavailable: 'News temporarily unavailable', newsTryLater: 'Try again later',
      loading: 'Loading app...', statOnline: 'Online', idError: 'Invalid ID',
      single: 'Single', express: 'Express', expressTitle: 'EXPRESS', combined: 'Combined confidence', expressTotal: 'Total odds',
      howToBet: 'How to place a bet', videoSoon: 'Tutorial video coming soon',
      statsCapper: 'Prediction stats', predictionsWord: 'predictions', accuracyWord: 'accuracy', per7d: 'last 7 days',
      dailyTitle: 'Pick of the day', dailyDesc: 'Free signal', dailyEmpty: 'No pick of the day yet',
      sportFootball: 'Football', sportBasketball: 'Basketball',
      idLowNote: 'ID below 168 — old account, prediction accuracy may be lower.', howToFindId: 'Where to find ID?', singleNote: 'This is a single bet — we recommend placing it separately.', expressNote: 'Ready-made express — place it as a whole.', liveBadge: '🔴 LIVE {score}, {minute}′ · prematch prediction', disclaimer: 'This is AI analytics, not a guarantee. The betting decision is yours.'
    }
  }
};

// ===== Варианты тем по байеру (Способ А: вариант зашит в сегмент метки) =====
// Полные темы-варианты = копия базовой через spread + свой визуал. lang остаётся
// базовым (tr2 -> язык tr), чтобы локализация фронта НЕ свалилась в EN-фолбэк.
THEMES.tr2 = {
  ...THEMES.tr,
  id: 'tr2', lang: 'tr',
  logo: LOGO_MAC_TAHMIN,         // свой логотип (картинка = иконка + название)
  brandName: 'Maç Tahmin AI',
  primaryColor: '#3ddc5c',       // акцент под лого: зелёно-голубой градиент -> зелёный
  statAcc: '92%', statPro: '21.5K', onlineMin: 3000, onlineMax: 7000,  // вариант — свои (дефолтные) цифры
};
THEMES.es2 = {
  ...THEMES.es,
  id: 'es2', lang: 'es',
  logo: null,  // вариант 2 — свой бренд (текст), НЕ логотип базовой темы
  brandName: 'Pronóstico Elite',
  subtitle: 'Análisis Deportivo con Inteligencia Artificial',  // вариант 2: переформулировка (тот же смысл)
  primaryColor: '#22c55e',  // вариант 2: зелёный
  statAcc: '92%', statPro: '21.5K', onlineMin: 3000, onlineMax: 7000,  // вариант — свои (дефолтные) цифры
};
// Узбекский вариант 2 «VIP» (золотой логотип, тексты с эмодзи, латиница).
THEMES.uz2 = {
  ...THEMES.uz,
  id: 'uz2', lang: 'uz',
  logo: LOGO_VIP,
  brandName: 'VIP',
  botHandle: 'vipuzexpert_bot',
  subtitle: 'Sport tahlili uchun neyrotarmoq ⚽️📊',
  primaryColor: '#e8b923',  // золото/янтарь (под VIP-лого, не ядовитый)
  inputLabel: 'Mostbet\'dagi ID raqamingiz 🔑',
  inputPlaceholder: 'Masalan: 278000000',
  inputDesc: 'ID\'ni Mostbet ilovasida topishingiz mumkin → Profil 👤',
  btnText: 'Davom etish →',
  menu: {
    ...THEMES.uz.menu,
    analysisTitle: 'AI Tahlil 🤖📊', analysisDesc: 'Uchrashuvning chuqur tahlili',
    historyTitle: 'Tarix', historyDesc: 'Sessiyalar jurnali 📒',
    newsTitle: 'Hisobot 📋', newsDesc: 'Sport yangiliklari 📰⚽️',
    supportTitle: 'Qo\'llab-quvvatlash 🛠️', supportDesc: 'Mutaxassis bilan bog\'lanish'
  },
  ui: {
    ...THEMES.uz.ui,
    promoTitle: 'O\'zingizning AI prognozingizni yarating 🤖📈',
    promoSub: 'Kim g\'alaba qozonishini soniyalar ichida bilib oling ⚡️🏆',
    promoBtn: 'Boshlash 🚀',
    hiwStep1: 'Mostbet ID sini yozing', hiwStep2: 'AI analiz qiladi', hiwStep3: 'Ishonchli stavka qilasiz',
    statH2H: 'Uchrashuvlar', noH2H: 'Songi uchrashuvlar yo\'q',
    dailyTitle: 'Kun prognozi 🔥📊', dailyDesc: 'Bepul signal 🎯📈',
    single: 'Yakka 🎯', express: 'Ekspress ⚡️📊',
    accuracyWord: 'aniqlik', per7d: 'ANIQLIK • 7 KUN ICHIDA', predictionsWord: 'PROGNOZLAR 📊',
    analysisInit: 'Tizim ishga tushirildi. AI tahlilni boshlash uchun match skrinshotini yuklang yoki jamoalar nomini kiriting 🤖⚽️',
    idLowNote: '278 dan past ID — eski akkaunt hisoblanadi, prognozlar aniqligi pastroq bo\'lishi mumkin.',
    howToFindId: 'ID qayerdan olinadi?'
  },
  subtitle2: undefined,
  statAcc: '92%', statPro: '21.5K', onlineMin: 3000, onlineMax: 7000,
};

// Карта СЕГМЕНТ-метки -> КЛЮЧ ТЕМЫ. Только варианты: проверяется ДО _GEO_LANG,
// чтобы сегмент tr2 дал тему-вариант tr2, а не базовую tr. Базовые гео (es, tr,
// en ...) и алиасы (ar=Аргентина=es и пр.) идут прежним путём через _GEO_LANG.
const _SEG_THEME = { tr2: 'tr2', es2: 'es2', uz2: 'uz2' };

// Опции для выпадашки генератора (байер выбирает базу или вариант фронта).
export const THEME_OPTIONS = [
  { key: 'tr',  label: 'Турция — баз. (красный)' },
  { key: 'tr2', label: 'Турция — вар.2 (фиолетовый)' },
  { key: 'es',  label: 'Испания — баз. (циан)' },
  { key: 'es2', label: 'Испания — вар.2 (зелёный)' },
  { key: 'uz',  label: 'Узбекистан — AI Tahlilchi (зелёный)' },
  { key: 'uz2', label: 'Узбекистан — VIP (золото)' },
];

// Алиас для совместимости со старым кодом (latam → es)
THEMES.latam = THEMES.es;

// Точная карта ГЕО/языкового кода -> тема. ТОЛЬКО полное совпадение сегмента,
// без startsWith (раньше "cr2"->Коста-Рика->испанский ломал az/прочие). Ключ -
// это явный код в метке (обычно 2-й сегмент: buyer_GEO_campaign_creative).
const _GEO_LANG = {
  // русский
  ru: 'default', rus: 'default',
  // испанский (Испания + LATAM)
  es: 'es', spain: 'es', latam: 'es', latampromo: 'es',
  pe: 'es', mx: 'es', mex: 'es', co: 'es', col: 'es', cl: 'es', ar: 'es', arg: 'es',
  ec: 'es', bo: 'es', pa: 'es', do: 'es', gt: 'es', sv: 'es', hn: 'es', ni: 'es',
  cr: 'es', py: 'es', uy: 'es', ve: 'es', peru: 'es',
  // португальский (Бразилия, Португалия)
  pt: 'pt', br: 'pt', bra: 'pt', brazil: 'pt', brasil: 'pt', portugal: 'pt',
  // французский (Франция + франкофонная Африка)
  fr: 'fr', france: 'fr', sn: 'fr', ci: 'fr', cm: 'fr', ga: 'fr', cg: 'fr',
  ml: 'fr', bj: 'fr', tg: 'fr', ne: 'fr', bf: 'fr', gn: 'fr', cd: 'fr',
  // турецкий
  tr: 'tr', tur: 'tr', turkey: 'tr',
  // варианты тем (Способ А): ЯЗЫК базовый, ТЕМА — вариант (см. _SEG_THEME / getThemeBySource)
  tr2: 'tr', es2: 'es', uz2: 'uz',
  // азербайджанский
  az: 'az', aze: 'az', baku: 'az',
  // узбекский (кириллица)
  uz: 'uz', uzb: 'uz', tashkent: 'uz', uzbekistan: 'uz',
  // английский (явный)
  en: 'en', eng: 'en', uk: 'en', us: 'en', gb: 'en',
  za: 'en', rsa: 'en', ke: 'en', kenya: 'en',
  // арабский (Иордания)
  jo: 'ar', jordan: 'ar', amman: 'ar', arab: 'ar',
};

export const getThemeBySource = (source) => {
  if (!source) return null;
  const s = source.toLowerCase();
  // Метка: buyer_GEO_campaign_creative. Разбиваем и ищем ТОЧНОЕ совпадение
  // сегмента с кодом языка/гео. Точное совпадение исключает ложные срабатывания.
  const parts = s.split(/[_\-\s.]+/).filter(Boolean);
  for (const p of parts) {
    if (_SEG_THEME[p]) return THEMES[_SEG_THEME[p]];  // вариант темы (tr2/es2) — приоритет
    if (_GEO_LANG[p]) return THEMES[_GEO_LANG[p]];
  }
  return null;
};

export const getThemeByLanguage = (lang) => {
  if (!lang) return null;
  const l = lang.toLowerCase();
  if (l.startsWith('ru')) return THEMES.default;
  if (l.startsWith('es')) return THEMES.es;
  if (l.startsWith('pt')) return THEMES.pt;
  if (l.startsWith('fr')) return THEMES.fr;
  if (l.startsWith('tr')) return THEMES.tr;
  if (l.startsWith('az')) return THEMES.az;
  if (l.startsWith('uz')) return THEMES.uz;
  if (l.startsWith('en')) return THEMES.en;
  return null;
};

export const getTheme = (source, lang) => {
  // Фоллбэк для неопознанных языков — английский (русский только для команды/демо).
  return getThemeBySource(source) || getThemeByLanguage(lang) || THEMES.en;
};
