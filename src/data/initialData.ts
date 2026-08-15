import { Team, Player, Tournament, Question, NewsArticle, GalleryMedia, TeamRegistration, QuestionPackage, SchoolInfo } from '../types';

export const INITIAL_SCHOOL_INFO: SchoolInfo = {
  schoolName: "44-sonli umumiy o'rta ta'lim maktabi",
  schoolNumber: '44',
  clubName: 'Zakovat Intellektual Klubi',
  motto: 'Bilim — kuchda emas, mantiqda va birdamlikda!',
  address: "Samarqand viloyati, Pastdarg'om tumani, Go'zal MFY, 44-maktab",
  phone: '+998 (95) 145-09-19',
  email: 'malumot@zakovat.tv',
  telegramChannel: '@zakovat44_maktab',
  youtubeChannel: 'https://youtube.com',
  headerAnnouncement: '"Zakovat" teleo\'yiniga savol yuborish',
  headerAnnouncementLink: 'https://t.me/zakovat',
  footerDescription: "44-sonli umumiy o'rta ta'lim maktabi Zakovat intellektual klubi rasmiy portali. Yoshlar intellektual salohiyatini oshirish maydoni.",
  footerCopyright: "© 2026 44-Sonli Umumiy O'rta Ta'lim Maktabi Zakovat Klubi. Barcha huquqlar himoyalangan.",
  coordinatorName: "Bahriddinov O'ktam Hikmatovich",
  coordinatorPhone: '+998 90 456 78 90',
  workingHours: 'Dushanba - Shanba: 08:00 - 17:00',
  historyAndAbout: "44-sonli umumiy o'rta ta'lim maktabi Zakovat Intellektual Klubi 2018-yilda tashkil etilgan bo'lib, o'quvchilarning mantiqiy fikrlashini charxlash, intellektual salohiyatini oshirish hamda tuman va respublika turnirlarida yuqori natijalarga erishishga xizmat qiladi. Klub har yili yuzlab o'quvchilarni o'z bag'riga oladi.",
  clubRules: "1. Jamoada 6 nafar asosiy va 2 nafar zaxira bilimdon bo'ladi.\n2. Har bir savolga muhokama uchun 60 soniya vaqt ajratiladi.\n3. Har bir to'g'ri javob uchun jamoaga 1 ochko beriladi.\n4. Halollik, o'zaro hurmat va do'stlik klubning bosh tamoyilidir.",
  faqList: [
    {
      question: '44-Maktab Zakovat klubiga kimlar a\'zo bo\'la oladi?',
      answer: 'Maktabimizning 5-11 sinf barcha o\'quvchilari Zakovat klubiga a\'zo bo\'lishlari va o\'z sinf jamoasini tuzishlari mumkin.'
    },
    {
      question: 'Jamoada nechta a\'zo bo\'lishi kerak?',
      answer: 'Har bir Zakovat jamoasida 6 nafar asosiy va 2 nafargacha zaxira a\'zosi (jami maksimum 8 kishi) bo\'ladi.'
    },
    {
      question: 'Turnirlar qachon va qayerda o\'tkaziladi?',
      answer: 'O\'yinlar har haftaning Shanba kunlari soat 14:00 da 44-sonli maktabning bosh Akt zalida bo\'lib o\'tadi.'
    },
    {
      question: 'Savollar bazasidan qanday foydalaniladi?',
      answer: "Saytimizning \"Ochiq Savollar Bazasi\" bo'limida barcha o'yin paketlarini ko'rish, savollar matnini va rasmlarini o'rganish va yuklab olishingiz mumkin."
    }
  ]
};

export const INITIAL_QUESTION_PACKAGES: QuestionPackage[] = [
  {
    id: 'pack-1',
    title: 'PROFESSIONAL VA BIRINCHI LIGA YOZGI MAVSUMI 6-TUR KRONOS JAMOASI SAVOLLARI 25.07.2026',
    category: 'Professional',
    description: "Professional toifadagi o'yinlar uchun savollar to'plami. Yuqori darajadagi mantiq va assotsiativ fikrlashni talab qiluvchi maxsus savollar paketi.",
    questionCount: 36,
    language: 'Uzbek',
    date: '2026-07-25',
    season: 'Yozgi Mavsum 2026',
    playedGamesCount: 18,
    downloadUrl: '#',
    wordFileName: 'Kronos_6_Tur_Savollar.docx',
    questions: [
      {
        id: 'pq-1',
        number: 1,
        questionText: 'Mashhur to\'qolning ismi "otasining ziynati" degan ma\'noni bildirsa-da, asarda Otaning boshqa bir qimmatbaho ziynati bor edi. Yuqoridagi savol matnida bir so\'zdan bir o\'rinda uchta harf tushirib qoldirilgan.',
        note: 'Diqqat savol: shu tushib qolgan harflarni to\'g\'ri ketma-ketlikda yozib bering.',
        answer: 'I, L, K (To\'qol so\'zidan "ilk" - To\'liqlik: "To\'qol" emas "To\'ng\'ich" yoki "Tole")',
        explanation: 'Asardagi "Otaning ziynati" va "otasining ziynati" iboralari adabiy tahlilga asoslangan mantiqiy burilishdir.',
        likes: 12
      },
      {
        id: 'pq-2',
        number: 2,
        questionText: 'Savol matnida bir so\'z boshqa bir so\'zga almashtirilgan. Oltoy xalqida bobo-buvilar o\'g\'ildan nevaralarini bola, qizdan nevaralarini fotha deb atashadi.',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        note: 'Diqqat savol: Almashtirilgan so\'zni asl holida yozib bering.',
        answer: 'Fota / Fotha (Pota)',
        explanation: 'Fotha so\'zi o\'rnida aslida "Fotima" yoki "Pota" (nabira) tushunchasi keladi.',
        likes: 19
      },
      {
        id: 'pq-3',
        number: 3,
        questionText: 'Qadimgi Gretsiyada faylasuflar ushbu asbobni ko\'rgach: "U insonning eng katta dushmanini ushlab turadi" deyishgan. Zamonaviy dunyoda bu asbob shifoxonalarda ham, oshpazlikda ham kutilmagan darajada muhim o\'rin tutadi.',
        note: 'Diqqat savol: Ushbu faylasuflar aytgan asbobni aniq toping.',
        answer: 'Qum soati (Soniya o\'lchagich)',
        explanation: 'Faylasuflar "eng katta dushmanni" deb Vaqtni nazarda tutishgan.',
        likes: 24
      }
    ]
  },
  {
    id: 'pack-2',
    title: 'PROFESSIONAL VA BIRINCHI LIGA YOZGI MAVSUMI 5-TUR FARRUH RAFIQOV JAMOASI SAVOLLARI 18.07.2026',
    category: 'Professional',
    description: "Professional toifadagi o'yinlar uchun savollar to'plami. Taniqli bilagʻon Farruh Rafiqov jamoasi tomonidan tuzilgan oʻtkir savollar.",
    questionCount: 36,
    language: 'Uzbek',
    date: '2026-07-18',
    season: 'Yozgi Mavsum 2026',
    playedGamesCount: 14,
    downloadUrl: '#',
    wordFileName: 'Farruh_Rafiqov_5_Tur.docx',
    questions: [
      {
        id: 'pq-4',
        number: 1,
        questionText: '19-asrda London ko\'chalarida paydo bo\'lgan ushbu moslama qorong\'ida odamlarga yo\'l ko\'rsatgan. Keyinchalik u ranglarini o\'zgartirish orqali transport vositalariga xizmat qila boshladi.',
        note: 'Diqqat savol: Ushbu kashfiyot bugungi kunda nima deb ataladi?',
        answer: 'Svetofor',
        explanation: 'Birinchi svetofor Londonda parlament binosi oldida gaz chirog\'i sifatida o\'rnatilgan.',
        likes: 15
      }
    ]
  },
  {
    id: 'pack-3',
    title: '44-MAKTAB LIGASI BAHORGI MAVSUMI 4-TUR SAVOLLARI (11.07.2026)',
    category: 'Maktab',
    description: "Maktabimiz jamoalari uchun tayyorlangan savollar to'plami. Barcha sinflar va o'quvchilar uchun moslashtirilgan mantiqiy savollar paketlari.",
    questionCount: 24,
    language: 'Uzbek',
    date: '2026-07-11',
    season: 'Bahor-2026',
    playedGamesCount: 22,
    downloadUrl: '#',
    wordFileName: '44_Maktab_4_Tur_Bahor.docx',
    questions: [
      {
        id: 'pq-5',
        number: 1,
        questionText: 'Sharq xalqlari maqolida aytilishicha: "Agar sen do\'stingga siringni aytsang, u sening X ingga aylanadi".',
        note: 'Diqqat savol: X ning o\'rnidagi so\'zni toping.',
        answer: 'Hukmdoringizga (Xojangizga)',
        explanation: 'Siringizni borgan kishi ustingizdan egalik qiladi va siringiz orqali sizga hukmron bo\'ladi.',
        likes: 31
      }
    ]
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: 't-1',
    name: 'Lochinlar',
    classGrade: '11-A',
    captain: 'Sardorbek Rahimov',
    captainPhone: '+998 90 123 45 67',
    username: 'lochinlar',
    password: '123456',
    members: ['Sardorbek Rahimov', 'Javohir Toshpulotov', 'Madinabonu Yusupova', 'Azizbek Keldiyorov', 'Shahnoza Axmedova', 'Bekzod Karimov'],
    points: 48,
    gamesPlayed: 10,
    wins: 8,
    draws: 1,
    losses: 1,
    ratingRank: 1,
    logoColor: 'from-amber-500 to-amber-700',
    motto: 'Mantiq va bilim – eng o\'tkir qurolimiz!',
    achievements: ['Bahorgi Mavsum-2026 Chempioni', 'Eng yaxshi jamoa - 2025'],
    gameHistory: [
      { gameDate: '2026-05-15', roundTitle: 'Bahor-2026 Final', round1: 12, round2: 10, round3: 11, total: 33, rank: 1 },
      { gameDate: '2026-04-15', roundTitle: 'Bahor-2026 2-tur', round1: 10, round2: 9, round3: 8, total: 27, rank: 1 }
    ]
  },
  {
    id: 't-2',
    name: 'Genius',
    classGrade: '10-B',
    captain: 'Jasurbek Aliyev',
    captainPhone: '+998 91 234 56 78',
    username: 'genius',
    password: '123456',
    members: ['Jasurbek Aliyev', 'Diyora Abdullayeva', 'Shohruh Ergashev', 'Kamola Normurodova', 'Boburmirzo Olimov', 'Sevinch Rayimova'],
    points: 44,
    gamesPlayed: 10,
    wins: 7,
    draws: 2,
    losses: 1,
    ratingRank: 2,
    logoColor: 'from-blue-600 to-cyan-600',
    motto: 'Har bir savolda g\'alaba siri bor!',
    achievements: ['Sinflararo Chempionat Vitse-chempioni'],
    gameHistory: [
      { gameDate: '2026-05-15', roundTitle: 'Bahor-2026 Final', round1: 10, round2: 9, round3: 10, total: 29, rank: 2 },
      { gameDate: '2026-04-15', roundTitle: 'Bahor-2026 2-tur', round1: 9, round2: 8, round3: 9, total: 26, rank: 2 }
    ]
  },
  {
    id: 't-3',
    name: 'Al-Xorazmiy',
    classGrade: '11-B',
    captain: 'Diyorbek Qodirov',
    captainPhone: '+998 93 345 67 89',
    username: 'al_xorazmiy',
    password: '123456',
    members: ['Diyorbek Qodirov', 'Farangiz Rustamova', 'Sirojiddin Botirov', 'Lobar Temirova', 'Asadbek Nurmatov', 'Gulnora Hamidova'],
    points: 39,
    gamesPlayed: 10,
    wins: 6,
    draws: 1,
    losses: 3,
    ratingRank: 3,
    logoColor: 'from-emerald-600 to-teal-700',
    motto: 'Aniq hisob-kitob va tezkor fikrlash!',
    achievements: ['Zakovat-Gambit bronza medali sohibi']
  },
  {
    id: 't-4',
    name: 'Intellekt',
    classGrade: '9-A',
    captain: 'Shaxboz Mirzayev',
    captainPhone: '+998 94 456 78 90',
    username: 'intellekt',
    password: '123456',
    members: ['Shaxboz Mirzayev', 'Zilola Nuraliyeva', 'Doniyor Mansurov', 'Ruxsora Karimova', 'Murodjon Zokirov', 'Mohinur Qosimova'],
    points: 35,
    gamesPlayed: 10,
    wins: 5,
    draws: 2,
    losses: 3,
    ratingRank: 4,
    logoColor: 'from-purple-600 to-indigo-800',
    motto: 'Yosh bo\'lsak-da, tajribamiz ulkan!',
    achievements: ['Mavsum kashfiyoti - 2026']
  }
];

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p-1',
    fullName: 'Sardorbek Rahimov',
    teamName: 'Lochinlar',
    classGrade: '11-A',
    role: 'Kapitan',
    bestScore: 142,
    correctAnswers: 89,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    badge: '👑 Eng yaxshi kapitan',
    bio: '44-maktab Zakovat klubi yetakchisi. Fizika va Mantiq bo\'yicha maktab olimpiadasi g\'olibi.'
  },
  {
    id: 'p-2',
    fullName: 'Jasurbek Aliyev',
    teamName: 'Genius',
    classGrade: '10-B',
    role: 'Kapitan',
    bestScore: 135,
    correctAnswers: 82,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    badge: '⚡ Mantiq Ustasi',
    bio: 'Tezkor fikrlash va tarixiy savollar mutaxassisi. 2 marta eng yaxshi bilimdon sovrini sohibi.'
  }
];

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'tour-1',
    title: '44-Maktab Kuzgi Zakovat Ligasi - 2026',
    season: 'Kuz-2026',
    description: 'Barcha 8-11 sinflar o\'rtasida 6 bosqichdan iborat maktab chempionati. Eng kuchli jamoa tuman bosqichiga yo\'llanma oladi.',
    startDate: '2026-09-01',
    endDate: '2026-11-20',
    registrationStartDate: '2026-08-01',
    registrationEndDate: '2026-08-30',
    isRegistrationOpen: true,
    status: 'Ro\'yxatga olish',
    rounds: [
      {
        roundNumber: 1,
        title: '1-Tur: Mantiq va Fikr',
        date: '2026-09-15',
        time: '14:00',
        venue: '44-Maktab Akt Zali',
        status: 'Kutilmoqda',
        teamsCount: 12
      }
    ],
    excelResults: [
      {
        id: 'ex-1',
        fileName: 'Kuzgi_Liga_Tayyorgarlik_1.xlsx',
        uploadDate: '2026-08-10',
        roundTitle: 'Sinov mashg\'uloti natijalari',
        scores: [
          { teamName: 'Lochinlar', round1: 10, round2: 12, round3: 11, total: 33, rank: 1 },
          { teamName: 'Genius', round1: 9, round2: 10, round3: 11, total: 30, rank: 2 },
          { teamName: 'Al-Xorazmiy', round1: 8, round2: 9, round3: 10, total: 27, rank: 3 }
        ]
      }
    ]
  },
  {
    id: 'tour-2',
    title: 'Bahorgi Maktab Chempionati - 2026',
    season: 'Bahor-2026',
    description: '44-maktabning bahorgi mavsum intellektual turniri. 10 ta jamoa ishtirok etdi.',
    startDate: '2026-03-01',
    endDate: '2026-05-15',
    registrationStartDate: '2026-02-15',
    registrationEndDate: '2026-02-28',
    isRegistrationOpen: false,
    status: 'Yakunlangan',
    champion: 'Lochinlar (11-A)',
    runnerUp: 'Genius (10-B)',
    thirdPlace: 'Al-Xorazmiy (11-B)',
    rounds: [
      {
        roundNumber: 1,
        title: 'Saralash turi',
        date: '2026-03-10',
        time: '14:00',
        venue: '44-Maktab Akt Zali',
        status: 'Yakunlangan',
        teamsCount: 10,
        winnerTeam: 'Lochinlar'
      }
    ]
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    questionText: 'Qadimgi Rimda ushbu predmetdan harbiylar, shifokorlar va oshpazlar foydalanishgan. Harbiylar uni signal berish uchun, shifokorlar dorilarni o\'lchash uchun, oshpazlar esa taom tayyorlashda qo\'llashgan. Diqqat, savol: Sanoqda bu narsa nima deb ataladi?',
    category: 'Tarix',
    difficulty: 'O\'rta',
    answer: 'Soat (Qum soati)',
    explanation: 'Qum soatlari aniq vaqt oraliqlarini o\'lchash uchun ishlatilgan.',
    source: '44-Maktab Zakovat Savollar Bazasi',
    author: 'O\'qituvchi N.Karimova',
    likes: 42,
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'q-2',
    questionText: 'Yaponiyada bir kishi metroda ketayotib kutilmaganda chamadonidan kichik ko\'zguni olib o\'z yuziga tutdi va kulib qo\'ydi. U psixologik tavsiya bo\'yicha o\'zining kayfiyatini yaxshilamoqchi edi. Olimlar aniqlashicha, odam sun\'iy ravishda U NARSANI qilsa ham miyada baxt gormoni ajraladi. Diqqat, savol: U NARSANI toping.',
    category: 'Mantiq',
    difficulty: 'Oson',
    answer: 'Tabassum qilish (Kulish)',
    explanation: 'Sun\'iy tabassum ham yuz mushaklarini harakatga keltirib, miyaga ijobiy signal beradi.',
    source: 'Zakovat Ochiq Manbasi',
    author: 'Kapitan Sardorbek',
    likes: 56,
    mediaType: 'text'
  },
  {
    id: 'q-3',
    questionText: 'Musiqiy savol: Ushbu simfonik ohang jahon kinosi durdonalarida qahramonning chuqur tafakkurga cho\'mish sahnasida yangraydi. Diqqat, savol: Ushbu mumtoz musiqaning muallifi bo\'lgan mashhur nemis kompozitorini ayting.',
    category: 'Adabiyot',
    difficulty: 'Murakkab',
    answer: 'Lyudvig van Betxoven (yoki Motsart)',
    explanation: 'Betxovenning "Elizaga" yoki 5-simfoniyasi butun dunyo kinosi va intellektual teledasturlarining ramziga aylangan.',
    source: 'Jahon Mumtoz Musiqa Fondi',
    author: 'Musiqa fani to\'garagi',
    likes: 68,
    mediaType: 'audio',
    audioTitle: 'Klassik Mumtoz Simfoniya (Fur Elise / Beethoven)',
    audioUrl: 'synth:classic'
  },
  {
    id: 'q-4',
    questionText: 'Video/Vizual savol: 1969-yil 20-iyul kuni butun dunyo teleekranlarida efirga uzatilgan ushbu tarixiy qadam paytida: "Bu inson uchun kichik bir qadam, biroq butun insoniyat uchun ulkan sakrashdir" jumlasi yangragan. Diqqat, savol: Ushbu so\'zlarni aytgan astronavt kim?',
    category: 'Fan va Texnika',
    difficulty: 'Oson',
    answer: 'Nil Armstrong (Neil Armstrong)',
    explanation: 'Apollo 11 missiyasi doirasida Oy sathiga ilk bor qadam qo\'ygan astronavt Nil Armstrong edi.',
    source: 'Kosmonavtika Tarixi',
    author: 'Fizika fani o\'qituvchisi',
    likes: 74,
    mediaType: 'video',
    videoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'q-5',
    questionText: 'Audio Savol: Ushbu o\'zbek xalq maqomi parchasini eshiting. Alisher Navoiy g\'azali bilan ijro etiladigan bu ohang qaysi mashhur xalq dostonining bosh g\'oyasiga ohangdosh?',
    category: 'Adabiyot',
    difficulty: 'Murakkab',
    answer: 'Farhod va Shirin (yoki Layli va Majnun)',
    explanation: 'Navoiy g\'azallari asosidagi Shashmaqom yo\'llari o\'zbek mumtoz adabiyotining yuksak namunasidir.',
    source: 'O\'zbekiston Madaniyati Arxivi',
    author: 'Ona tili va adabiyot to\'garagi',
    likes: 49,
    mediaType: 'audio',
    audioTitle: 'Mumtoz Shashmaqom kuyi',
    audioUrl: 'synth:classic'
  }
];

export const INITIAL_DAILY_QUESTIONS = [
  {
    id: 'dq-2026-08-14',
    date: '2026-08-14',
    questionText: 'Dunyodagi eng qadimiy kutubxonalardan birida kitob javonlari orasida mushuklar erkin yurishi uchun maxsus maoshli "qo\'riqchi mushuklar" saqlangan. Ular qaysi xavfli dushmandan qo\'lyozmalarni asrash uchun jalb etilgan?',
    category: 'Tarix & Madaniyat',
    difficulty: 'O\'rta',
    answer: 'Kalamush va sichqonlar (Kemiruvchilar)',
    hints: [
      'Ular qog\'oz va pergamentni yeb qo\'yishi mumkin bo\'lgan jonzotlardir.',
      'Mushuklarning eng tabiiy ovi hisoblanadi.'
    ],
    explanation: 'Ermitaj va qadimiy Oksford kutubxonalarida qimmatbaho kitoblarni kemiruvchilardan himoya qilish uchun asrlar davomida rasmiy mushuk xizmatidan foydalanilgan.',
    funFact: 'Sankt-Peterburg Ermitaj muzeyida hozirgi kunda ham 50 dan ortiq rasmiy xizmatdagi mushuklar bor!'
  },
  {
    id: 'dq-2026-08-15',
    date: '2026-08-15',
    questionText: 'U doim oldinga qarab yuguradi, hech qachon orqaga qaytmaydi. U boyga ham, kambag\'alga ham bir xil beriladi, lekin uni hech kim sotib ololmaydi yoki to\'xtata olmaydi. U nima?',
    category: 'Mantiqiy Jumboq',
    difficulty: 'Oson',
    answer: 'Vaqt',
    hints: [
      'Zakovatda unga 60 soniya ajratiladi.',
      'Soat mili uni o\'lchaydi.'
    ],
    explanation: 'Vaqt — insoniyatning eng bebaho va qaytarib bo\'lmas resursidir.',
    funFact: 'Bir kunda 86,400 soniya bor, uning har biridan oqilona foydalanish mantiqiy g\'alabaga yetaklaydi.'
  }
];

export const INITIAL_DUEL_QUESTIONS = [
  {
    id: 'duel-1',
    question: 'Qaysi sayyora Quyosh tizimidagi eng katta sayyora hisoblanadi?',
    options: ['Mars', 'Yupiter', 'Saturn', 'Venera'],
    correctAnswer: 'Yupiter',
    explanation: 'Yupiter barcha boshqa sayyoralarning umumiy massasidan 2.5 barobar kattaroqdir.',
    points: 10
  },
  {
    id: 'duel-2',
    question: 'Alisher Navoiyning mashhur 5 ta dostondan iborat asari nima deb ataladi?',
    options: ['Xamsa', 'Devoni Foniy', 'Muhokamat ul-lug\'atayn', 'Lison ut-tayr'],
    correctAnswer: 'Xamsa',
    explanation: 'Xamsa turkiy tilda yozilgan ilk beshlik dostondir.',
    points: 10
  },
  {
    id: 'duel-3',
    question: 'Zakovat o\'yinida jamoaviy muhokama uchun necha soniya vaqt beriladi?',
    options: ['30 soniya', '45 soniya', '60 soniya', '90 soniya'],
    correctAnswer: '60 soniya',
    explanation: 'Klassik Zakovat qoidalariga ko\'ra 1 daqiqa (60 soniya) ajratiladi.',
    points: 10
  },
  {
    id: 'duel-4',
    question: 'Dunyodagi eng uzun daryo qaysi?',
    options: ['Amazonka', 'Nil', 'Yanszi', 'Missisipi'],
    correctAnswer: 'Nil (yoki Amazonka)',
    explanation: 'Nil daryosi 6650 km uzunlik bilan Afrikaning eng uzun daryosidir.',
    points: 10
  },
  {
    id: 'duel-5',
    question: 'Amir Temur davlatining bosh shiori nima bo\'lgan?',
    options: ['Kuch — adolatdadir', 'Bilim — kuchdir', 'G\'alaba biz tomonda', 'Adolat va taraqqiyot'],
    correctAnswer: 'Kuch — adolatdadir',
    explanation: 'Amir Temur saltanatining tamal toshi "Kuch — adolatdadir" (Rosti-rasti) shiori bo\'lgan.',
    points: 10
  }
];

export const ZAKOVAT_TACTICS = [
  {
    id: 't-1',
    title: '1. Savolni To\'g\'ri Tahlil Qilish Sirlari',
    icon: 'Brain',
    color: 'from-amber-500 to-yellow-600',
    summary: 'Savol matnidagi yashirin ishoralar va so\'z o\'yinlarini birinchi 10 soniyada payqash.',
    tips: [
      'Savolning oxirgi jumlasi (Diqqat savol)ni diqqat bilan eshiting: Nima so\'ralmoqda? (Odam ismi, shahar, buyum, kitob yoki mavhum tushuncha?).',
      'Savolda qo\'llangan sifatlar va ta\'riflarga e\'tibor bering (masalan: "eng qadimgi", "qizil rangli", "ikki qavatli").',
      'Agar savolda kutilmagan g\'ayritabiiy fakt berilgan bo\'lsa, bu kalit nuqtadir.'
    ]
  },
  {
    id: 't-2',
    title: '2. Mantiqiy Kalit So\'zlarni Topish',
    icon: 'Key',
    color: 'from-amber-600 to-orange-600',
    summary: 'Ortiqcha ma\'lumotlarni ajratib, javobga olib boruvchi 2-3 ta asosiy so\'zni aniqlash.',
    tips: [
      'Savoldagi assotsiatsiyalarni zanjir qilib bog\'lang: Masalan: Rim + Harbiylar + Vaqt = Qum soati.',
      'Sinfonim yoki majoziy ma\'nolarni qidiring: "Oltin kuz", "Temir qanot", "Qora oltin".',
      'Tarixiy sanalar yoki shaxslar bog\'liqligini eslang.'
    ]
  },
  {
    id: 't-3',
    title: '3. 60 Soniyali Vaqtni To\'g\'ri Taqsimlash',
    icon: 'Clock',
    color: 'from-yellow-500 to-amber-700',
    summary: 'Zakovatda g\'alabaning 70% qismi vaqtni to\'g\'ri boshqarishga bog\'liq.',
    tips: [
      '0 - 15 soniya: Jimgina savol matnini miyadan o\'tkazish va birlamchi tezkor versiyalarni aytish.',
      '15 - 40 soniya: Jamoaviy "Miya hujumi" (Brainstorming) — hech bir versiyani rad etmasdan rivojlantirish.',
      '40 - 50 soniya: Eng kuchli 2 ta versiyani solishtirish va eng mantiqiysini tanlash.',
      '50 - 60 soniya: Javob varaqasiga xatosiz, aniq va lo\'nda qilib yozish.'
    ]
  },
  {
    id: 't-4',
    title: '4. "Miya Hujumi" (Brainstorming) Qoidalari',
    icon: 'Users',
    color: 'from-amber-400 to-amber-600',
    summary: 'Jamoada o\'zaro hurmat va fikrlarni erkin bayon qilish madaniyati.',
    tips: [
      'Hech qachon jamoadoshingizning versiyasini muhokama paytida tanqid qilmang yoki ustidan kulmang!',
      'G\'alati tuyulgan versiyalar ko\'pincha haqiqiy to\'g\'ri javob bo\'lib chiqadi.',
      'Kapitan so\'nggi so\'z egasi: bahslar bo\'lganda kapitan sovuqqonlik bilan yakuniy qarorni qabul qiladi.'
    ]
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'n-1',
    title: '44-Maktab Zakovat Jamoasi Kuzgi Tumanda 1-O\'rinni Qo\'lga Kiritdi!',
    summary: 'Maktabimizning "Lochinlar" va "Genius" jamoalari tuman bosqichida munosib ishtirok etib, umumiy hisobda oltin va kumush medallarni qo\'lga kiritishdi.',
    content: 'Kuni kecha tuman Xalq ta\'limi bo\'limi tomonidan tashkil etilgan Zakovat intellektual o\'yinida 44-sonli umumiy o\'rta ta\'lim maktabining vakillari yuksak tayyorgarlik ko\'rsatishdi. 12 ta maktab jamoalari o\'rtasida kechgan shiddatli bahsda "Lochinlar" (11-A sinf) 30 ta savoldan 26 tasiga to\'g\'ri javob berib, 1-o\'rinni egalladi.',
    date: '2026-08-05',
    category: 'G\'oliblar',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'
    ],
    author: 'Maktab Matbuot Xizmati',
    views: 342
  },
  {
    id: 'n-2',
    title: 'Kuzgi Mavsum Uchun Jamoalarni Ro\'yxatdan O\'tkazish Boshlandi!',
    summary: '8-11 sinf o\'quvchilari diqqatiga! Maktabimizning ichki chempionatida qatnashish uchun o\'z jamoangizni ro\'yxatdan o\'tkazishingiz mumkin.',
    content: "Yangi o'quv yili munosabati bilan 44-maktab Zakovat klubi o'zining an'anaviy Kuzgi chempionatini e'lon qiladi. Har bir sinfdan 1 tadan yoki birlashgan jamoalar shakllantirilishi mumkin. Ro'yxatdan o'tish 31-avgustga qadar davom etadi.",
    date: '2026-08-01',
    category: 'E\'lonlar',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
    ],
    author: 'Klub Koordinatorligi',
    views: 520
  }
];

export const INITIAL_GALLERY: GalleryMedia[] = [
  {
    id: 'g-1',
    title: 'Bahorgi Mavsum Finali va Taqdirlash Marosimi',
    date: '2026-05-18',
    category: 'Taqdirlash',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    caption: 'Maktab direktori tomonidan g\'olib "Lochinlar" jamoasiga kubok topshirish onlari.'
  }
];

export const FAQ_LIST = INITIAL_SCHOOL_INFO.faqList;

export const INITIAL_REGISTRATIONS: TeamRegistration[] = [
  {
    id: 'reg-101',
    teamName: 'Zukko Yoshlar',
    classGrade: '8-B',
    captainName: 'Bekzod Rahmonov',
    captainPhone: '+998 90 123 45 67',
    memberNames: ['Bekzod Rahmonov', 'Shohrux Alimov', 'Nigora Ismoilova', 'Aziz Kabilov', 'Mohira Yuldasheva', 'Doston Normurodov'],
    motto: 'Bilim va mantiq g\'alaba garovidir!',
    registrationDate: '2026-08-10',
    status: 'pending'
  }
];
