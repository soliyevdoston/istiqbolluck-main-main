// --- 1. UMUMIY ASSETLAR (Rasmlar va Videolar o'zgarmaydi) ---
const commonAssets = {
  blog: {
    // blogdagi maqolalar rasmlari
    posts: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
      },
      {
        id: 2,
        image: "/assets/gallary11.jpg",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1526318472351-3d1843f15b54?w=800",
      },
    ],
    // sertifikarlar uchun umumiy rasmlar
    certs: [
      {
        id: 1,
        img: "https://img.freepik.com/free-vector/professional-certificate-template-flat-design_23-2148201211.jpg?w=800",
      },
      {
        id: 2,
        img: "https://img.freepik.com/free-vector/clean-modern-certificate-appreciation-template_1017-15222.jpg?w=800",
      },
      {
        id: 3,
        img: "https://img.freepik.com/free-vector/modern-education-certificate-template_23-2148333341.jpg?w=800",
      },
      {
        id: 4,
        img: "https://img.freepik.com/free-vector/gradient-certificate-template_23-2149155702.jpg?w=800",
      },
    ],
  },
  life: {
    hero_img: "/assets/gallary5.jpg",
    row1: [
      "/assets/gallary1.jpg",
      "/assets/gallary2.jpg",
      "/assets/gallary3.jpg",
      "/assets/gallary8.jpg",
      "/assets/oshxona.jpg",
      "/assets/gallary10.jpg",
    ],
    row2: [
      "/assets/gallary4.jpg",
      "/assets/gallary6.jpg",
      "/assets/gallary7.jpg",
      "/assets/oshxona2.jpg",
      "/assets/gallary9.jpg",
      "/assets/gallary11.jpg",
    ],
    fac_img: "/assets/qoriqlash.jpg",
    proc: {
      theory: "/assets/gallary2.jpg",
      discipline: "/assets/gallary10.jpg",
      experience: "/assets/gallary12.jpg",
      creative: "/assets/gallary7.jpg",
    },
  },
  home: {
    hero_bg: "/assets/newhero.jpg",
    studentVids: [
      {
        videoUrl: "/videos/interview1.mp4",
        thumbnail: "/assets/interview1-img.png",
      },
      {
        videoUrl: "/videos/interview2.mp4",
        thumbnail: "/assets/interview2-img.png",
      },
      {
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail:
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
      },
    ],
    universities: [
      // --- O'zbekistondagi Xalqaro Filiallar ---
      "WESTMINSTER", // WIUT
      "INHA", // Inha
      "TURIN", // TTPU (Turin politexnika)
      "WEBSTER", // Webster
      "AMITY", // Amity
      "MDIST", // Singapur instituti
      "AKFA (CAU)", // Central Asian University
      "TEAM", // Team universiteti
      "BRITISH MANAGEMENT", // BMU

      // --- O'zbekistondagi nufuzli Davlat OTMlari ---
      "TATU", // Axborot texnologiyalari
      "JIDU", // Diplomatiya (UWED)
      "O'zMU", // Milliy Universitet
      "TDIU", // Iqtisodiyot (Narxoz)
      "ToshDTU", // Texnika universiteti (Politex)
      "TTA", // Tibbiyot akademiyasi
      "YANGI O'ZBEKISTON", // New Uzbekistan University
      "FarDU", // Farg'ona davlat universiteti
      "FarPI", // Farg'ona politexnika instituti
      "SamDU", // Samarqand davlat universiteti
      "AndDU", // Andijon davlat universiteti

      // --- Dunyo bo'yicha TOP Universitetlar ---
      "HARVARD",
      "STANFORD",
      "MIT",
      "OXFORD",
      "CAMBRIDGE",
      "YALE",
      "PRINCETON",
      "COLUMBIA",
      "CHICAGO",
      "UCL",
      "NUS", // National University of Singapore
    ],
  },
  team: {
    director_img:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800",
    staff_imgs: {
      a1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
      a2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      a3: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
      a4: "https://images.unsplash.com/photo-1580894732234-83e9e3ec5997?w=800",
      a5: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800",
      t1: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800",
      t2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
      t6: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
      t11: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800",
      t12: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800",
    },
  },
};

// --- 2. TARJIMALARNI ASSETLAR BILAN BIRLASHTIRISH FUNKSIYASI ---
const createTranslation = (texts) => ({
  ...texts,
  blogPosts: commonAssets.blog.posts.map((p, i) => ({
    ...p,
    ...texts.blogPosts[i],
  })),
  certificates: commonAssets.blog.certs.map((c, i) => ({
    ...c,
    ...texts.certificates[i],
  })),
  life_page: {
    ...texts.life_page,
    hero_img: commonAssets.life.hero_img,
    galleryRow1: commonAssets.life.row1,
    galleryRow2: commonAssets.life.row2,
    fac_main_img: commonAssets.life.fac_img,
    process_images: commonAssets.life.proc,
  },
  home_page: {
    ...texts.home_page,
    // MANA BU QATORNI QO'SHDIM:
    hero_bg: commonAssets.home.hero_bg,
    life_gallery1: commonAssets.home.life_gallery1 || commonAssets.life.row1,
    life_gallery2: commonAssets.home.life_gallery2 || commonAssets.life.row2,
    studentFeedbacks: commonAssets.home.studentVids.map((v, i) => ({
      ...v,
      ...texts.home_page.studentFeedbacks[i],
    })),
    universities: commonAssets.home.universities,
  },
  team_page: {
    ...texts.team_page,
    director: {
      ...texts.team_page.director,
      img: commonAssets.team.director_img,
    },
    administration: texts.team_page.administration.map((a) => ({
      ...a,
      img: commonAssets.team.staff_imgs[a.id],
    })),
    teachers: texts.team_page.teachers.map((t) => ({
      ...t,
      img: commonAssets.team.staff_imgs[t.id],
    })),
  },
});

// --- 3. HAR BIR TIL UCHUN FAQAT MATNLAR ---

// --- UZ MATNLARI ---
const uzTexts = {
  about: "Biz haqimizda",
  dtm: "DTM",
  life: "Maktab hayoti",
  team: "Jamoamiz",
  blog: "Blog",
  menu: "Menyu",
  contact: "Aloqa",
  theme: "Mavzu",
  phone: "+998 90 123 45 67",
  back: "Orqaga",
  not_found: "Maqola topilmadi",
  close: "Yopish",
  toast_success: "Natijalar yuklandi!",
  toast_error: "ID topilmadi!",
  header_sub: "Natijalar onlayn monitori",
  id_placeholder: "O'quvchi ID raqami...",
  latest_label: "oxirgi",
  status_active: "Status: Faol",
  direction_label: "Yo'nalish",
  class_label: "Sinf",
  cert_label: "Yutuq",
  rank_label: "Reyting",
  grant_label: "Grant",
  percent_label: "Percentile",
  analysis_label: "Analiz",
  rank_short: "Reyt",
  grant_short: "Gran",
  percent_short: "Perc",
  analysis_short: "Anal",
  student_btn: "O'quvchi",
  school_btn: "Maktab",
  analysis_title: "Imtihon Tahlili",
  total_label: "Jami Ball",
  dynamics_title: "Natijalar dinamikasi",
  dyn_total: "Umumiy ballar dinamikasi",
  dyn_block1: "1-Blok fan tahlili",
  dyn_block2: "2-Blok fan tahlili",
  dyn_sub1: "Ona tili",
  dyn_sub2: "Matematika",
  dyn_sub3: "Tarix",
  sections: "Bo'limlar",
  footerDesc:
    "Muvaffaqiyatli kelajak poydevorini biz bilan quring. Toza ta'lim, minimalist yondashuv.",
  networks: "Tarmoqlar",
  toTop: "Tepaga",
  rights: "© 2026 ISTIQBOL LUCK. BARCHA HUQUQLAR HIMOYALANGAN.",
  developed: "DEVELOPED BY SOLIYEV.UZ",
  chat: {
    title: "Luck Assistant",
    status: "Online",
    placeholder: "Savol yo'llang...",
    typing: "Luck AI yozmoqda",
    welcome: "Salom! Men Istiqbol Luck AI. Sizga qanday yordam bera olaman?",
    error: "Kechirasiz, ma'lumot topilmadi. Ma'muriyat: +998 90 123 45 67",
    kb: [
      {
        keywords: ["salom", "assalom"],
        reply: "Assalomu alaykum! Istiqbol Luck markaziga xush kelibsiz.",
      },
      {
        keywords: ["manzil", "joy"],
        reply: "Biz Farg'ona viloyati, Rishton tumanida joylashganmiz.",
      },
      {
        keywords: ["narx", "qancha"],
        reply:
          "Narxlar yo'nalishga qarab farq qiladi. Aloqa: +998 90 123 45 67",
      },
    ],
  },
  blog_subtitle: "Bizning dunyomiz",
  blog_title1: "BLOG",
  blog_title2: "MAQOLALAR",
  blog_desc:
    "Zamonaviy ta'lim tendensiyalari, metodikalar va muvaffaqiyat hikoyalari.",
  blog_all: "Barchasi",
  blog_read_time: "5 daqiqa mutolaa",
  blog_read_more: "O'qish",
  cert_subtitle: "Sifat kafolati",
  cert_title1: "XALQARO",
  cert_title2: "YUTUQLAR",
  cert_detail_label: "Sertifikat tafsiloti",
  cert_confirm_text:
    "Ushbu sertifikat professional muvaffaqiyatni tasdiqlaydi.",
  blogPosts: [
    {
      title: "Matematika Olimpiadasida g'alaba",
      category: "Yutuqlar",
      date: "10 Yan, 2024",
      desc: "O'quvchilarimiz AQSHda 3 ta oltin medalni olishdi...",
      content:
        "To'liq matn: Maktabimiz o'quvchilari xalqaro maydonda munosib ishtirok etishdi.",
    },
    {
      title: "Innovatsion metodika",
      category: "Metodika",
      date: "05 Yan, 2024",
      desc: "Ta'limda yangi texnologiyalar qo'llanilmoqda...",
      content:
        "To'liq matn: STEM va robototexnika darslarimiz haqida batafsil.",
    },
    {
      title: "Sport majmuasi ochilishi",
      category: "Sport",
      date: "28 Dek, 2023",
      desc: "Yangi suzish havzasi foydalanishga topshirildi...",
      content: "To'liq matn: O'quvchilar salomatligi biz uchun muhim.",
    },
    {
      title: "San'at haftaligi",
      category: "Madaniyat",
      date: "12 Dek, 2023",
      desc: "Yosh iste'dodlar ko'rgazmasi bo'lib o'tdi...",
      content: "To'liq matn: Ijodiy ishlar va madaniy tadbirlarimiz.",
    },
  ],
  certificates: [
    { title: "International Teacher", teacher: "Alisher Rasulov" },
    { title: "IELTS Expert", teacher: "Sevara Ismoilova" },
    { title: "STEM Specialist", teacher: "Davronbek Karimov" },
    { title: "Pedagogy Excellence", teacher: "Nigora Aliyeva" },
  ],
  school_title: "TEZ ORADA!",
  school_desc:
    "Maktab ko'rsatkichlari va umumiy tahlillar bo'limi loyihalashtirilmoqda.",
  system_analysis: "Tizim tahlili",
  new_dashboard: "Yangi Dashboard",
  life_page: {
    hero_label: "Life in focus",
    hero_title1: "MAKTAB",
    hero_title2: "HAYOTI",
    hero_desc:
      "Har bir lahza — bu muvaffaqiyatga qo'yilgan qadamdir. Bizda har bir kun qadrlanadi.",
    view_gallery: "GALEREYANI KO'RISH",
    clubs_subtitle: "Qiziqishlar markazi",
    clubs_title1: "DARSDAN",
    clubs_title2: "TASHQARI",
    clubs_desc:
      "Biz o'quvchilarimiz nafaqat bilim olishini, balki o'z qiziqishlari bo'yicha erkin rivojlanishlarini ta'minlash uchun maxsus to'garaklar tashkil etganmiz.",
    extraClubs: [
      {
        title: "Sport Klublari",
        desc: "Sog‘lom tana, jismoniy chidamlilik va g‘oliblik ruhi",
      },
      {
        title: "Madaniy Hordiq",
        desc: "Filmlar va madaniy tadbirlar orqali hordiq",
      },
      { title: "Kompyuter va IT", desc: "Dasturlash va texnologik loyihalar" },
      {
        title: "Qo‘shimcha Darslar",
        desc: "Fanlar bo‘yicha chuqurlashtirilgan tayyorgarlik",
      },
    ],
    mission_subtitle: "Muvaffaqiyat poydevori",
    mission_title1: "BIZNING",
    mission_title2: "YO‘NALISHIMIZ",
    mission_desc:
      "Biz o'quvchilarimizga faqat nazariy bilim emas, balki hayotiy ko'nikmalarni individual tarzda o'rgatamiz.",
    missions: [
      {
        id: 1,
        title: "Individual yondashuv",
        desc: "Har bir bola o'zining kuchli va kuchsiz tomonlariga ega ekanligini inobatga olamiz.",
      },
      {
        id: 2,
        title: "Global dunyoqarash",
        desc: "Xalqaro standartlar va zamonaviy metodikalar asosida darslar o'tiladi.",
      },
      {
        id: 3,
        title: "Amaliy ko'nikma",
        desc: "Nazariyadan ko'ra ko'proq amaliyot va hayotiy tajribaga urg'u beriladi.",
      },
    ],
    fac_subtitle: "Ideal sharoitlar",
    fac_title1: "KOMFORT",
    fac_title2: "HUDUDI",
    fac_desc:
      "O'quvchilarimiz uchun maksimal darajadagi qulaylik, xavfsizlik va zamonaviy texnologiyalar bilan jihozlangan muhit.",
    facilities: [
      {
        title: "SMART SINFLAR",
        desc: "Eng so'nggi texnologiyalar va sensorli doskalar bilan jihozlangan sinf xonalari.",
      },
      {
        title: "SPORT KOMPLEKS",
        desc: "Sog'lom turmush tarzi uchun barcha sharoitlar mavjud.",
      },
      {
        title: "XAVFSIZ HUDUD",
        desc: "24/7 kuzatuv va xavfsizlik tizimi bilan to'liq nazorat qilinadi.",
      },
      {
        title: "KUTUBXONA",
        desc: "O'quvchilar dunyoqarashini kengaytirish uchun boy kitob fondi.",
      },
    ],
    safe_badge: "100% Xavfsiz",
    proc_subtitle: "Bizning metodika",
    proc_title1: "O'QUV",
    proc_title2: "JARAYONLARI",
    proc_desc:
      "Nazariya va amaliyotning uyg'unligi orqali o'quvchilarimizda mustahkam bilim poydevorini quramiz.",
    theory: "Nazariya",
    discipline: "Intizom",
    creative: "Ijodiy muhit",
  },
  home_page: {
    hero_label: "Kelajak yetakchilari akademiyasi",
    hero_title1: "ISTIQBOL",
    hero_title2: "LUCK",
    hero_desc: "Istiqbol Luck — kelajak yetakchilari shu yerda kamol topadi.",
    hero_cta: "Bog'lanish",
    adv_subtitle: "Nega aynan biz?",
    adv_title: "Afzalliklarimiz",
    adv_desc: "Har bir bolaning yashirin qobiliyatlarini yuzaga chiqaramiz.",
    advantages: [
      {
        id: "01",
        title: "Hayotiy ko‘nikmalar",
        desc: "O‘z fikrini erkin ifodalash va jamoada ishlash ko‘nikmalari rivojlanadi.",
      },
      {
        id: "02",
        title: "Kuchli ta’lim tizimi",
        desc: "Eng samarali xorijiy ta’lim tajribalari asosida tuzilgan dasturlar.",
      },
      {
        id: "03",
        title: "Alohida e’tibor",
        desc: "O‘quvchi darajasidan qat’i nazar, unga mos yondashuv qo‘llaniladi.",
      },
    ],
    stats_subtitle: "Muvaffaqiyat ko'zgusi",
    stats_title1: "ISHONCH",
    stats_title2: "RAQAMLARDA",
    stats: [
      {
        label: "O'quvchilar",
        value: "1200+",
        desc: "Bilimga chanqoq yoshlar bir oiladek jamlangan.",
      },
      {
        label: "Bitiruvchilar",
        value: "850+",
        desc: "Nufuzli oliygohlar va hayot yo'lida o'z o'rnini topganlar.",
      },
      {
        label: "O'qishga kirish",
        value: "98%",
        desc: "Bitiruvchilarimizning davlat va xalqaro OTMlardagi ulushi.",
      },
    ],
    life_title1: "MAKTAB",
    life_title2: "HAYOTI",
    life_desc:
      "Har bir kunimiz quvonch va yangi bilimlar bilan boyitilgan. Yorqin lavhalar to'plami.",
    feed_subtitle: "Samimiy fikrlar",
    feed_title1: "O'QUVCHILAR",
    feed_title2: "OVOZI",
    feed_desc:
      "Bizning eng katta yutug'imiz — o'quvchilarimizning samimiy fikrlari.",
    studentFeedbacks: [
      { name: "Ergasheva Aziza", role: "11-'f'sinf o'quvchisi" },
      { name: "Habibullayeva Mehriniso", role: "10-sinf o'quvchisi" },
      { name: "Jasur Mirzayev", role: "9-sinf o'quvchisi" },
    ],
    textFeedbacks: [
      {
        name: "Zuhra Karimova",
        role: "9-sinf",
        message:
          "Maktabdagi muhit menga juda yoqadi, mentorlar bilan ishlash tizimi foydali.",
      },
      {
        name: "Bekzod Rahmonov",
        role: "10-sinf",
        message:
          "Xalqaro olimpiadalarga tayyorgarlik ko'rish uchun eng yaxshi joy.",
      },
      {
        name: "Omina Ergasheva",
        role: "8-sinf",
        message:
          "Darslar faqat nazariya emas, amaliyotda ham juda ko'p ishlaymiz.",
      },
    ],
    uni_subtitle: "Muvaffaqiyat yo'li",
    uni_title1: "BITIRUVCHILARIMIZ",
    uni_title2: "OLIYGOHLARDA",
    uni_desc:
      "Bitiruvchilarimiz nufuzli akademik dargohlarda ta'limni davom ettirmoqdalar.",
    form_title1: "QO'SHILISH VAQTI",
    form_title2: "KELDI.",
    form_name_label: "Ismingiz",
    form_name_placeholder: "Masalan: Ali Valiev",
    form_phone_label: "Telefon raqamingiz",
    form_submit: "Ariza topshirish",
    form_success_title: "Murojaat qabul qilindi!",
    form_success_desc: "Tez orada siz bilan bog'lanamiz.",
    map_branch: "Asosiy Filial",
    map_address: "Rishton tumani, Markaziy ko'cha",
    map_find: "Xaritadan topish",
    faq_subtitle: "Sizni qiziqtirgan savollar",
    faq_title1: "KO'P BERILADIGAN",
    faq_title2: "SAVOLLAR",
    faq_desc:
      "Agar savollaringizga javob topa olmasangiz, biz bilan bog'laning.",
    faqs: [
      {
        question: "Maktabga qabul jarayoni qanday?",
        answer:
          "Qabul jarayoni suhbat va aniq fanlardan test sinovi asosida amalga oshiriladi.",
      },
      {
        question: "O'quv kun tartibi qanday?",
        answer: "Darslar soat 08:30 da boshlanadi va 16:30 gacha davom etadi.",
      },
      {
        question: "Ovqatlanish tizimi bormi?",
        answer: "Ha, maktabimizda 3 mahal issiq ovqat tashkil etilgan.",
      },
      {
        question: "Qanday diplom beriladi?",
        answer:
          "Bitiruvchilarga davlat namunasidagi shahodatnoma (attestat) beriladi.",
      },
    ],
  },
  team_page: {
    hero_title1: "BIZNING",
    hero_title2: "JAMOA",
    dir_label: "Maktab Direktori",
    more_info: "Batafsil ma'lumot",
    view_all: "Barchasini ko'rish",
    hide: "Yashirish",
    exp_label: "Tajriba",
    achievements_label: "Yutuqlar va Sertifikatlar",
    details_btn: "Batafsil",
    years: "yil",
    admin_section: {
      subtitle: "Leadership",
      title: "Rahbariyat",
      desc: "Maktab rivoji va strategik boshqaruvini ta'minlovchi professional jamoa.",
    },
    staff_section: {
      subtitle: "Faculty",
      title1: "Pedagogik",
      title2: "Staff",
      desc: "Har bir yo'nalish bo'yicha eng yuqori malakali mutaxassislarimiz.",
    },
    director: {
      name: "Mamasodiqov Gulomjon",
      role: "Maktab Direktori",
      quote:
        "Ta'lim - bu kelajak poydevori. Biz har bir bolaning yashirin qobiliyatlarini yuzaga chiqarishni maqsad qilganmiz.",
      education: "TDIU (Magistratura)",
      experience: "25",
      achievements: [
        "Xalq ta'limi a'lochisi",
        "Yilning eng yaxshi innovatsion rahbari (2023)",
        "Xalqaro menejment sertifikati sohibi",
      ],
      bio: "Gulomjon Mamasodiqov rahbarligida maktab zamonaviy innovatsion ta'lim tizimiga o'tdi.",
    },
    categories: [
      { id: "all", name: "Barchasi" },
      { id: "aniq", name: "Aniq fanlar" },
      { id: "tabiiy", name: "Tabiiy fanlar" },
      { id: "filologiya", name: "Filologiya" },
    ],
    administration: [
      {
        id: "a1",
        name: "Anvarova Dilnoza",
        role: "O'quv ishlari mudiri",
        education: "TDPU (Oliy)",
        experience: "18",
        achievements: ["Oliy toifa", "Metodist ustoz"],
        bio: "O'quv jarayonini xalqaro standartlar asosida tashkil etish va nazorat qilish bo'yicha mutaxassis.",
      },
      {
        id: "a2",
        name: "Karimov Sherzod",
        role: "Ma'naviyat mudiri",
        education: "O'zMU (Oliy)",
        experience: "12",
        achievements: ["Malakali pedagog", "Madaniyat targ'ibotchisi"],
        bio: "O'quvchilarning axloqiy va ma'naviy tarbiyasi, ijtimoiy loyihalar bo'yicha mas'ul.",
      },
      {
        id: "a3",
        name: "Sultonov Alisher",
        role: "Xo'jalik ishlari mudiri",
        education: "ToshDTU (Oliy)",
        experience: "15",
        achievements: ["Samarali boshqaruvchi"],
        bio: "Maktabning texnik holati va o'quvchilar xavfsizligini ta'minlashga mas'ul.",
      },
      {
        id: "a4",
        name: "Azizova Nigora",
        role: "Kadrlar bo'limi boshlig'i",
        education: "WIUT (Oliy)",
        experience: "10",
        achievements: ["HR eksperti"],
        bio: "Jamoani shakllantirish va xodimlarning malakasini oshirish tizimini boshqaradi.",
      },
      {
        id: "a5",
        name: "Ergashev Rustam",
        role: "Bosh hisobchi",
        education: "TMI (Oliy)",
        experience: "20",
        achievements: ["Professional buxgalter"],
        bio: "Maktabning moliyaviy barqarorligi va shaffofligini ta'minlaydi.",
      },
    ],
    teachers: [
      {
        id: "t1",
        category: "aniq",
        isLead: true,
        subject: "Matematika",
        name: "Jasur Mirzayev",
        education: "O'zMU",
        experience: "10",
        bio: "Matematik mantiq va olimpiada masalalari bo'yicha mutaxassis.",
      },
      {
        id: "t2",
        category: "aniq",
        subject: "Fizika",
        name: "Sobir Ergashev",
        education: "SamDU",
        experience: "12",
        bio: "Kvant fizikasi va laboratoriya tajribalari ustasi.",
      },
      {
        id: "t6",
        category: "tabiiy",
        isLead: true,
        subject: "Biologiya",
        name: "Lola Karimova",
        education: "O'zMU",
        experience: "15",
        bio: "Genetika va molekulyar biologiya tadqiqotchisi.",
      },
      {
        id: "t11",
        category: "filologiya",
        isLead: true,
        subject: "Ingliz tili",
        name: "Nodira Aliyeva",
        education: "O'zJTMU",
        experience: "6",
        bio: "IELTS 8.5 sohibasi, xalqaro ta'lim metodisti.",
      },
      {
        id: "t12",
        category: "filologiya",
        subject: "Ona tili",
        name: "Abduvahob Saidov",
        education: "TDPU",
        experience: "22",
        bio: "O'zbek tili va adabiyoti bo'yicha oliy toifali pedagog.",
      },
    ],
  },
};

// --- UZ_KR MATNLARI ---
const uzKrTexts = {
  about: "Биз ҳақимизда",
  dtm: "ДТМ",
  life: "Мактаб ҳаёти",
  team: "Жамоамиз",
  blog: "Блог",
  menu: "Меню",
  contact: "Алоқа",
  theme: "Мавзу",
  phone: "+998 90 123 45 67",
  back: "Орқага",
  not_found: "Мақола топилмади",
  close: "Ёпиш",
  toast_success: "Натижалар юкланди!",
  toast_error: "ID топилмади!",
  header_sub: "Натижалар онлайн монитори",
  id_placeholder: "Ўқувчи ID рақами...",
  latest_label: "охирги",
  status_active: "Статус: Фаол",
  direction_label: "Йўналиш",
  class_label: "Синф",
  cert_label: "Ютуқ",
  rank_label: "Рейтинг",
  grant_label: "Грант",
  percent_label: "Перцентиль",
  analysis_label: "Анализ",
  rank_short: "Рейт",
  grant_short: "Гран",
  percent_short: "Перс",
  analysis_short: "Анал",
  student_btn: "Ўқувчи",
  school_btn: "Мактаб",
  analysis_title: "Имтиҳон Таҳлили",
  total_label: "Жами Балл",
  dynamics_title: "Натижалар динамикаси",
  dyn_total: "Умумий баллар динамикаси",
  dyn_block1: "1-Блок фан таҳлили",
  dyn_block2: "2-Блок фан таҳлили",
  dyn_sub1: "Она тили",
  dyn_sub2: "Математика",
  dyn_sub3: "Тарих",
  sections: "Бўлимлар",
  footerDesc:
    "Муваффақиятли келажак пойдеворини биз билан қуринг. Тоза таълим, минималист ёндашув.",
  networks: "Тармоқлар",
  toTop: "Тепага",
  rights: "© 2026 ISTIQBOL LUCK. БАРЧА ҲУҚУҚЛАР ҲИМОЯЛАНГАН.",
  developed: "DEVELOPED BY SOLIYEV.UZ",
  chat: {
    title: "Luck Assistant",
    status: "Онлайн",
    placeholder: "Савол йўлланг...",
    typing: "Luck AI ёзмоқда",
    welcome: "Салом! Мен Istiqbol Luck AI. Сизга қандай ёрдам бера оламан?",
    error: "Кечирасиз, маълумот топилмади. Маъмурият: +998 90 123 45 67",
    kb: [
      {
        keywords: ["салом", "ассалом"],
        reply: "Ассалому алайкум! Istiqbol Luck марказига хуш келибсиз.",
      },
      {
        keywords: ["манзил", "жой"],
        reply: "Биз Фарғона вилояти, Риштон туманида жойлашганмиз.",
      },
      {
        keywords: ["нарх", "қанча"],
        reply: "Нархлар йўналишга қараб фарқ қилади. Алоқа: +998 90 123 45 67",
      },
    ],
  },
  blog_subtitle: "Бизнинг дунёмиз",
  blog_title1: "БЛОГ",
  blog_title2: "МАҚОЛАЛАР",
  blog_desc:
    "Замонавий таълим тенденциялари, методикалар ва муваффақият ҳикоялари.",
  blog_all: "Барчаси",
  blog_read_time: "5 дақиқа мутолаа",
  blog_read_more: "Ўқиш",
  cert_subtitle: "Сифат кафолати",
  cert_title1: "ХАЛҚАРО",
  cert_title2: "ЮТУҚЛАР",
  cert_detail_label: "Сертификат тафсилоти",
  cert_confirm_text: "Ушбу сертификат профессионал муваффақиятни тасдиқлайди.",
  blogPosts: [
    {
      title: "Математика Олимпиадасида ғалаба",
      category: "Ютуқлар",
      date: "10 Янв, 2024",
      desc: "Ўқувчиларимиз АҚШда 3 та олтин медални олишди...",
    },
    {
      title: "Инновацион методика",
      category: "Методика",
      date: "05 Янв, 2024",
      desc: "Таълимда янги технологиялар қўлланилмоқда...",
    },
    {
      title: "Спорт мажмуаси очилиши",
      category: "Спорт",
      date: "28 Дек, 2023",
      desc: "Янги сузиш ҳавзаси фойдаланишга топширилди...",
    },
    {
      title: "Санъат ҳафталиги",
      category: "Маданият",
      date: "12 Дек, 2023",
      desc: "Ёш истеъдодлар кўргазмаси бўлиб ўтди...",
    },
  ],
  certificates: [
    { title: "International Teacher", teacher: "Алишер Расулов" },
    { title: "IELTS Expert", teacher: "Севара Исмоилова" },
    { title: "STEM Specialist", teacher: "Давронбек Каримов" },
    { title: "Pedagogy Excellence", teacher: "Нигора Алиева" },
  ],
  school_title: "ТЕЗ ОРАДА!",
  school_desc:
    "Мактаб кўрсаткичлари ва умумий таҳлиллар бўлими лойиҳалаштирилмоқда.",
  system_analysis: "Тизим таҳлили",
  new_dashboard: "Янги Дашбоард",
  life_page: {
    hero_label: "Life in focus",
    hero_title1: "МАКТАБ",
    hero_title2: "ҲАЁТИ",
    hero_desc:
      "Ҳар бир лаҳза — бу муваффақиятга қўйилган қадамдир. Бизда ҳар бир кун қадрланади.",
    view_gallery: "ГАЛЕРЕЯНИ КЎРИШ",
    clubs_subtitle: "Қизиқишлар маркази",
    clubs_title1: "ДАРСДАН",
    clubs_title2: "ТАШҚАРИ",
    clubs_desc:
      "Биз ўқувчиларимиз нафақат билим олишини, балки ўз қизиқишлари бўйича эркин ривожланишларини таъминлаш учун махсус тўгараклар ташкил этганмиз.",
    extraClubs: [
      {
        title: "Спорт Клублари",
        desc: "Соғлом тана, жисмоний чидамлилик ва ғолиблик руҳи",
      },
      {
        title: "Маданий Ҳордиқ",
        desc: "Фильмлар ва маданий тадбирлар орқали ҳордиқ",
      },
      { title: "Компьютер ва IT", desc: "Дастурлаш ва технологик лойиҳалар" },
      {
        title: "Қўшимча Дарслар",
        desc: "Фанлар бўйича чуқурлаштирилган тайёргарлик",
      },
    ],
    mission_subtitle: "Муваффақият пойдевори",
    mission_title1: "БИЗНИНГ",
    mission_title2: "ЙЎНАЛИШИМИЗ",
    mission_desc:
      "Биз ўқувчиларимизга фақат назарий билим эмас, балки ҳаётий кўникмаларни индивидуал тарзда ўргатамиз.",
    missions: [
      {
        id: 1,
        title: "Индивидуал ёндашув",
        desc: "Ҳар бир бола ўзининг кучли ва кучсиз томонларига эга эканлигини инобатга оламиз.",
      },
      {
        id: 2,
        title: "Глобал дунёқараш",
        desc: "Халқаро стандартлар ва замонавий методикалар асосида дарслар ўтилади.",
      },
      {
        id: 3,
        title: "Амалий кўникма",
        desc: "Назариядан кўра кўпроқ амалиёт ва ҳаётий тажрибага урғу берилади.",
      },
    ],
    fac_subtitle: "Идеал шароитлар",
    fac_title1: "КОМФОРТ",
    fac_title2: "ҲУДУДИ",
    fac_desc:
      "Ўқувчиларимиз учун максимал даражадаги қулайлик, хавфсизлик ва замонавий технологиялар билан жиҳозланган муҳит.",
    facilities: [
      {
        title: "СМАРТ СИНФЛАР",
        desc: "Энг сўнгги технологиялар ва сенсорли доскалар билан жиҳозланган синф хоналари.",
      },
      {
        title: "СПОРТ КОМПЛЕКС",
        desc: "Соғлом турмуш тарзи учун барча шароитлар мавжуд.",
      },
      {
        title: "ХАВФСИЗ ҲУДУД",
        desc: "24/7 кузатув ва хавфсизлик тизими билан тўлиқ назорат қилинади.",
      },
      {
        title: "КУТУБХОНА",
        desc: "Ўқувчилар дунёқарашини кенгайтириш учун бой китоб фонди.",
      },
    ],
    safe_badge: "100% Хавфсиз",
    proc_subtitle: "Бизнинг методика",
    proc_title1: "ЎҚУВ",
    proc_title2: "ЖАРАЁНЛАРИ",
    proc_desc:
      "Назария ва амалиётнинг уйғунлиги орқали ўқувчиларимизда мустаҳкам билим пойдеворини қурамиз.",
    theory: "Назария",
    discipline: "Интизом",
    creative: "Ижодий муҳит",
  },
  home_page: {
    hero_label: "Келажак етакчилари академияси",
    hero_title1: "ISTIQBOL",
    hero_title2: "LUCK",
    hero_desc: "Istiqbol Luck — келажак етакчилари шу ерда камол топади.",
    hero_cta: "Боғланиш",
    adv_subtitle: "Нега айнан биз?",
    adv_title: "Афзалликларимиз",
    adv_desc: "Ҳар бир боланинг яширин қобилиятларини юзага чиқарамиз.",
    advantages: [
      {
        id: "01",
        title: "Ҳаётий кўникмалар",
        desc: "Ўз фикрини эркин ифодалаш ва жамоада ишлаш кўникмалари ривожланади.",
      },
      {
        id: "02",
        title: "Кучли таълим тизими",
        desc: "Энг самарали хорижий таълим тажрибалари асосида тузилган дастурлар.",
      },
      {
        id: "03",
        title: "Алоҳида эътибор",
        desc: "Ўқувчи даражасидан қатъи назар, унга мос ёндашув қўлланилади.",
      },
    ],
    stats_subtitle: "Муваффақият кўзгуси",
    stats_title1: "ИШОНЧ",
    stats_title2: "РАҚАМЛАРДА",
    stats: [
      {
        label: "Ўқувчилар",
        value: "1200+",
        desc: "Билимга чанқоқ ёшлар бир оиадек жамланган.",
      },
      {
        label: "Битирувчилар",
        value: "850+",
        desc: "Нуфузли олийгоҳлар ва ҳаёт йўлида ўз ўрнини топганлар.",
      },
      {
        label: "Ўқишга кириш",
        value: "98%",
        desc: "Битирувчиларимизнинг давлат ва халқаро ОТМлардаги улуши.",
      },
    ],
    life_title1: "МАКТАБ",
    life_title2: "ҲАЁТИ",
    life_desc:
      "Ҳар бир кунимиз қувонч ва янги билимлар билан бойитилган. Ёрқин лавҳалар тўплами.",
    feed_subtitle: "Самимий фикрлар",
    feed_title1: "ЎҚУВЧИЛАР",
    feed_title2: "ОВОЗИ",
    feed_desc:
      "Бизнинг энг катта ютуғимиз — ўқувчиларимизнинг самимий фикрлари.",
    studentFeedbacks: [
      { name: "Лола Абдуллаева", role: "11-синф битирувчиси" },
      { name: "Асадбек Орифов", role: "10-синф ўқувчиси" },
      { name: "Жасур Мирзаев", role: "9-синф ўқувчиси" },
    ],
    textFeedbacks: [
      {
        name: "Зуҳра Каримова",
        role: "9-синф",
        message:
          "Мактабдаги муҳит менга жуда ёқади, менторлар билан ишлаш тизими фойдали.",
      },
      {
        name: "Бекзод Раҳмонов",
        role: "10-синф",
        message: "Халқаро олимпиадаларга тайёргарлик кўриш учун энг яхши жой.",
      },
      {
        name: "Омина Эргашева",
        role: "8-синф",
        message: "Дарслар фақат назария эмас, амалиётда ҳам жуда кўп ишлаймиз.",
      },
    ],
    uni_subtitle: "Муваффақият йўли",
    uni_title1: "БИТИРУВЧИЛАРИМИЗ",
    uni_title2: "ОЛИЙГОҲЛАРДА",
    uni_desc:
      "Битирувчиларимиз нуфузли академик даргоҳларда таълимни давом эттирмоқдалар.",
    form_title1: "ҚЎШИЛИШ ВАҚТИ",
    form_title2: "КЕЛДИ.",
    form_name_label: "Исмингиз",
    form_name_placeholder: "Масалан: Али Валиев",
    form_phone_label: "Телефон рақамингиз",
    form_submit: "Ариза топшириш",
    form_success_title: "Мурожаат қабул қилинди!",
    form_success_desc: "Тез орада сиз билан боғланамиз.",
    map_branch: "Асосий Филиал",
    map_address: "Риштон тумани, Марказий кўча",
    map_find: "Харитадан топиш",
    faq_subtitle: "Сизни қизиқтирган саволлар",
    faq_title1: "КЎП БЕРИЛАДИГАН",
    faq_title2: "САВОЛЛАР",
    faq_desc:
      "Агар саволларингизга жавоб топа олмасангиз, биз билан боғланинг.",
    faqs: [
      {
        question: "Мактабга қабул жараёни қандай?",
        answer:
          "Қабул жараёни суҳбат ва аниқ фанлардан тест синови асосида амалга оширилади.",
      },
      {
        question: "Ўқув кун тартиби қандай?",
        answer: "Дарслар соат 08:30 да бошланади ва 16:30 гача давом этади.",
      },
      {
        question: "Овқатланиш тизими борми?",
        answer: "Ҳа, мактабимизда 3 маҳал иссиқ овқат ташкил этилган.",
      },
      {
        question: "Қандай диплом берилади?",
        answer:
          "Битирувчиларга давлат намунасидаги шаҳодатнома (аттестат) берилади.",
      },
    ],
  },
  team_page: {
    hero_title1: "БИЗНИНГ",
    hero_title2: "ЖАМОА",
    dir_label: "Мактаб Директори",
    more_info: "Батафсил маълумот",
    view_all: "Барчасини кўриш",
    hide: "Яшириш",
    exp_label: "Тажриба",
    achievements_label: "Ютуқлар ва Сертификатлар",
    details_btn: "Батафсил",
    years: "йил",
    admin_section: {
      subtitle: "Leadership",
      title: "Раҳбарият",
      desc: "Мактаб ривожи ва стратегик бошқарувини таъминловчи профессионал жамоа.",
    },
    staff_section: {
      subtitle: "Faculty",
      title1: "Педагогик",
      title2: "Staff",
      desc: "Ҳар бир йўналиш бўйича энг юқори малакали мутахассисларимиз.",
    },
    director: {
      name: "Мамасодиқов Ғуломжон",
      role: "Мактаб Директори",
      quote:
        "Таълим - бу келажак пойдевори. Биз ҳар бир боланинг яширин қобилиятларини юзага чиқаришни мақсад қилганмиз.",
      education: "ТДИУ (Магистратура)",
      experience: "25",
      achievements: [
        "Халқ таълими аълочиси",
        "Йилнинг энг яхши инновацион раҳбари (2023)",
        "Халқаро менежмент сертификати соҳиби",
      ],
      bio: "Ғуломжон Мамасодиқов раҳбарлигида мактаб замонавий инновацион таълим тизимига ўтди.",
    },
    categories: [
      { id: "all", name: "Барчаси" },
      { id: "aniq", name: "Аниқ фанлар" },
      { id: "tabiiy", name: "Табиий фанлар" },
      { id: "filologiya", name: "Филология" },
    ],
    administration: [
      {
        id: "a1",
        name: "Анварова Дилноза",
        role: "Ўқув ишлари мудири",
        education: "ТДПУ (Олий)",
        experience: "18",
        achievements: ["Олий тоифа", "Методист устоз"],
        bio: "Ўқув жараёнини халқаро стандартлар асосида ташкил этиш ва назорат қилиш бўйича мутахассис.",
      },
      {
        id: "a2",
        name: "Каримов Шерзод",
        role: "Маънавият мудири",
        education: "ЎзМУ (Олий)",
        experience: "12",
        achievements: ["Малакали педагог", "Маданият тарғиботчиси"],
        bio: "Ўқувчиларнинг ахлоқий ва маънавий тарбияси, ижтимоий лойиҳалар бўйича масъул.",
      },
      {
        id: "a3",
        name: "Султонов Алишер",
        role: "Хўжалик ишлари мудири",
        education: "ТошДТУ (Олий)",
        experience: "15",
        achievements: ["Самарали бошқарувчи"],
        bio: "Мактабнинг техник ҳолати ва ўқувчилар хавфсизлигини таъминлашга масъул.",
      },
      {
        id: "a4",
        name: "Азизова Нигора",
        role: "Кадрлар бўлими бошлиғи",
        education: "WIUT (Олий)",
        experience: "10",
        achievements: ["HR эксперти"],
        bio: "Жамоани шакллантириш ва ходимлар малакасини ошириш тизимини бошқаради.",
      },
      {
        id: "a5",
        name: "Эргашев Рустам",
        role: "Бош ҳисобчи",
        education: "ТМИ (Олий)",
        experience: "20",
        achievements: ["Профессионал бухгалтер"],
        bio: "Мактабнинг молиявий барқарорлиги ва шаффофлигини таъминлайди.",
      },
    ],
    teachers: [
      {
        id: "t1",
        category: "aniq",
        isLead: true,
        subject: "Математика",
        name: "Жасур Мирзаев",
        education: "ЎзМУ",
        experience: "10",
        bio: "Математик мантиқ ва олимпиада масалалари бўйича мутахассис.",
      },
      {
        id: "t2",
        category: "aniq",
        subject: "Физика",
        name: "Собир Эргашев",
        education: "СамДУ",
        experience: "12",
        bio: "Квант физикаси ва лаборатория тажрибалари устаси.",
      },
      {
        id: "t6",
        category: "tabiiy",
        isLead: true,
        subject: "Биология",
        name: "Лола Каримова",
        education: "ЎзМУ",
        experience: "15",
        bio: "Генетика ва молекуляр биология тадқиқотчиси.",
      },
      {
        id: "t11",
        category: "filologiya",
        isLead: true,
        subject: "Инглиз тили",
        name: "Нодира Алиева",
        education: "ЎзЖТМУ",
        experience: "6",
        bio: "IELTS 8.5 соҳибаси, халқаро таълим методисти.",
      },
      {
        id: "t12",
        category: "filologiya",
        subject: "Она тили",
        name: "Абдуваҳоб Саидов",
        education: "ТДПУ",
        experience: "22",
        bio: "Ўзбек тили ва адабиёти бўйича олий тоифали педагог.",
      },
    ],
  },
};

// --- RU МАТНЛАРИ (Русский) ---
const ruTexts = {
  about: "О нас",
  dtm: "ГЦТ",
  life: "Школьная жизнь",
  team: "Наша команда",
  blog: "Блог",
  menu: "Меню",
  contact: "Контакты",
  theme: "Тема",
  phone: "+998 90 123 45 67",
  back: "Назад",
  not_found: "Статья не найдена",
  close: "Закрыть",
  toast_success: "Результаты загружены!",
  toast_error: "ID не найден!",
  header_sub: "Онлайн мониторинг результатов",
  id_placeholder: "ID номер ученика...",
  latest_label: "последний",
  status_active: "Статус: Активен",
  direction_label: "Направление",
  class_label: "Класс",
  cert_label: "Достижение",
  rank_label: "Рейтинг",
  grant_label: "Грант",
  percent_label: "Перцентиль",
  analysis_label: "Анализ",
  rank_short: "Рейт",
  grant_short: "Гран",
  percent_short: "Перс",
  analysis_short: "Анал",
  student_btn: "Ученик",
  school_btn: "Школа",
  analysis_title: "Анализ экзамена",
  total_label: "Общий балл",
  dynamics_title: "Динамика результатов",
  dyn_total: "Динамика общих баллов",
  dyn_block1: "Анализ 1-го блока",
  dyn_block2: "Анализ 2-го блока",
  dyn_sub1: "Родной язык",
  dyn_sub2: "Математика",
  dyn_sub3: "История",
  sections: "Разделы",
  footerDesc:
    "Стройте фундамент успешного будущего вместе с нами. Чистое образование, минималистичный подход.",
  networks: "Сети",
  toTop: "Наверх",
  rights: "© 2026 ISTIQBOL LUCK. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
  developed: "DEVELOPED BY SOLIYEV.UZ",
  chat: {
    title: "Luck Assistant",
    status: "В сети",
    placeholder: "Задайте вопрос...",
    typing: "Luck AI пишет",
    welcome: "Привет! Я Luck AI. Чем я могу вам помочь?",
    error: "Извините, информация не найдена. Администрация: +998 90 123 45 67",
    kb: [
      {
        keywords: ["привет", "здравствуйте"],
        reply: "Здравствуйте! Добро пожаловать в центр Istiqbol Luck.",
      },
      {
        keywords: ["адрес", "место"],
        reply: "Мы находимся в Риштанском районе Ферганской области.",
      },
      {
        keywords: ["цена", "сколько"],
        reply:
          "Цены варьируются в зависимости от направления. Контакты: +998 90 123 45 67",
      },
    ],
  },
  blog_subtitle: "Наш мир",
  blog_title1: "БЛОГ",
  blog_title2: "СТАТЬИ",
  blog_desc:
    "Современные образовательные тенденции, методики и истории успеха.",
  blog_all: "Все",
  blog_read_time: "5 мин чтения",
  blog_read_more: "Читать",
  cert_subtitle: "Гарантия качества",
  cert_title1: "МЕЖДУНАРОДНЫЕ",
  cert_title2: "ДОСТИЖЕНИЯ",
  cert_detail_label: "Детали сертификата",
  cert_confirm_text: "Данный сертификат подтверждает профессиональный успех.",
  blogPosts: [
    {
      title: "Победа на математической олимпиаде",
      category: "Успехи",
      date: "10 Янв, 2024",
      desc: "Наши ученики выиграли 3 золотые медали в США...",
    },
    {
      title: "Инновационная методика",
      category: "Методика",
      date: "05 Янв, 2024",
      desc: "В образовании применяются новые технологии...",
    },
    {
      title: "Открытие спорткомплекса",
      category: "Спорт",
      date: "28 Дек, 2023",
      desc: "Сдан в эксплуатацию новый бассейн...",
    },
    {
      title: "Неделя искусства",
      category: "Культура",
      date: "12 Дек, 2023",
      desc: "Прошла выставка юных талантов...",
    },
  ],
  certificates: [
    { title: "International Teacher", teacher: "Алишер Расулов" },
    { title: "IELTS Expert", teacher: "Севара Исмоилова" },
    { title: "STEM Specialist", teacher: "Давронбек Каримов" },
    { title: "Pedagogy Excellence", teacher: "Нигора Алиева" },
  ],
  school_title: "СКОРО!",
  school_desc:
    "Раздел школьных показателей и общего анализа находится в разработке.",
  system_analysis: "Анализ системы",
  new_dashboard: "Новый Дашборд",
  life_page: {
    hero_label: "Life in focus",
    hero_title1: "ШКОЛЬНАЯ",
    hero_title2: "ЖИЗНЬ",
    hero_desc: "Каждый момент — это шаг к успеху. У нас ценится каждый день.",
    view_gallery: "СМОТРЕТЬ ГАЛЕРЕЮ",
    clubs_subtitle: "Центр интересов",
    clubs_title1: "ВНЕ",
    clubs_title2: "УРОКОВ",
    clubs_desc:
      "Мы организовали специальные кружки, чтобы наши ученики могли свободно развиваться в соответствии со своими интересами.",
    extraClubs: [
      {
        title: "Спорт Клубы",
        desc: "Здоровое тело, физическая выносливость и дух победы",
      },
      {
        title: "Культурный Отдых",
        desc: "Отдых через кино и культурные мероприятия",
      },
      {
        title: "Компьютер и IT",
        desc: "Программирование и технологические проекты",
      },
      {
        title: "Доп. Занятия",
        desc: "Углубленная подготовка по школьным предметам",
      },
    ],
    mission_subtitle: "Фундамент успеха",
    mission_title1: "НАШЕ",
    mission_title2: "НАПРАВЛЕНИЕ",
    mission_desc:
      "Мы обучаем наших студентов не только теории, но и жизненно важным навыкам индивидуально.",
    missions: [
      {
        id: 1,
        title: "Индивидуальный подход",
        desc: "Мы учитываем, что у каждого ребенка есть свои сильные и слабые стороны.",
      },
      {
        id: 2,
        title: "Глобальное видение",
        desc: "Занятия проводятся на основе международных стандартов и современных методик.",
      },
      {
        id: 3,
        title: "Практические навыки",
        desc: "Упор делается на практику и жизненный опыт, а не только на теорию.",
      },
    ],
    fac_subtitle: "Идеальные условия",
    fac_title1: "ЗОНА",
    fac_title2: "КОМФОРТА",
    fac_desc:
      "Среда, оснащенная максимальным комфортом, безопасностью и современными технологиями для наших студентов.",
    facilities: [
      {
        title: "СМАРТ КЛАССЫ",
        desc: "Классные комнаты, оснащенные новейшими технологиями и сенсорными досками.",
      },
      {
        title: "СПОРТ КОМПЛЕКС",
        desc: "Все условия для здорового образа жизни и физического развития.",
      },
      {
        title: "БЕЗОПАСНАЯ ЗОНА",
        desc: "Полный контроль с круглосуточным наблюдением и системой безопасности.",
      },
      {
        title: "БИБЛИОТЕКА",
        desc: "Богатый книжный фонд для расширения кругозора учащихся.",
      },
    ],
    safe_badge: "100% Безопасно",
    proc_subtitle: "Наша методика",
    proc_title1: "УЧЕБНЫЙ",
    proc_title2: "ПРОЦЕСС",
    proc_desc:
      "Мы строим прочный фундамент знаний через гармонию теории и практики.",
    theory: "Теория",
    discipline: "Дисциплина",
    creative: "Творческая среда",
  },
  home_page: {
    hero_label: "Академия будущих лидеров",
    hero_title1: "ISTIQBOL",
    hero_title2: "LUCK",
    hero_desc: "Istiqbol Luck — место, где формируются будущие лидеры.",
    hero_cta: "Связаться",
    adv_subtitle: "Почему именно мы?",
    adv_title: "Наши преимущества",
    adv_desc: "Мы раскрываем скрытые таланты каждого ребенка.",
    advantages: [
      {
        id: "01",
        title: "Жизненные навыки",
        desc: "Развиваем навыки свободного самовыражения и командной работы.",
      },
      {
        id: "02",
        title: "Сильная система",
        desc: "Программы, основанные на лучшем мировом образовательном опыте.",
      },
      {
        id: "03",
        title: "Особое внимание",
        desc: "Индивидуальный подход к каждому ученику, независимо от его уровня.",
      },
    ],
    stats_subtitle: "Зеркало успеха",
    stats_title1: "ДОВЕРИЕ",
    stats_title2: "В ЦИФРАХ",
    stats: [
      {
        label: "Ученики",
        value: "1200+",
        desc: "Стремящаяся к знаниям молодежь, собранная как одна семья.",
      },
      {
        label: "Выпускники",
        value: "850+",
        desc: "Те, кто нашел свое место в престижных вузах и в жизни.",
      },
      {
        label: "Поступление",
        value: "98%",
        desc: "Доля наших выпускников в государственных и международных вузах.",
      },
    ],
    life_title1: "ШКОЛЬНАЯ",
    life_title2: "ЖИЗНЬ",
    life_desc:
      "Каждый наш день наполнен радостью и новыми знаниями. Коллекция ярких моментов.",
    feed_subtitle: "Искренние отзывы",
    feed_title1: "ГОЛОС",
    feed_title2: "УЧЕНИКОВ",
    feed_desc:
      "Наше самое большое достижение — успехи и отзывы наших учеников.",
    studentFeedbacks: [
      { name: "Лола Абдуллаева", role: "Выпускница 11-класса" },
      { name: "Асадбек Орифов", role: "Ученик 10-класса" },
      { name: "Жасур Мирзаев", role: "Ученик 9-класса" },
    ],
    textFeedbacks: [
      {
        name: "Зухра Каримова",
        role: "9-класс",
        message:
          "Мне очень нравится атмосфера, система работы с менторами очень полезна.",
      },
      {
        name: "Бекзод Рахмонов",
        role: "10-класс",
        message: "Лучшее место для подготовки к международным олимпиадам.",
      },
      {
        name: "Омина Эргашева",
        role: "8-класс",
        message:
          "Уроки — это не только теория, мы очень много работаем на практике.",
      },
    ],
    uni_subtitle: "Путь к успеху",
    uni_title1: "НАШИ ВЫПУСКНИКИ",
    uni_title2: "В УНИВЕРСИТЕТАХ",
    uni_desc:
      "Наши выпускники продолжают обучение в самых престижных академических заведениях.",
    form_title1: "ВРЕМЯ ПРИСОЕДИНИТЬСЯ",
    form_title2: "ПРИШЛО.",
    form_name_label: "Ваше имя",
    form_name_placeholder: "Например: Али Валиев",
    form_phone_label: "Номер телефона",
    form_submit: "Подать заявку",
    form_success_title: "Заявка принята!",
    form_success_desc: "Мы свяжемся с вами в ближайшее время.",
    map_branch: "Основной филиал",
    map_address: "Риштанский район, Центральная улица",
    map_find: "Найти на карте",
    faq_subtitle: "Интересующие вас вопросы",
    faq_title1: "ЧАСТО ЗАДАВАЕМЫЕ",
    faq_title2: "ВОПРОСЫ",
    faq_desc: "Если вы не нашли ответ на свой вопрос, свяжитесь с нами.",
    faqs: [
      {
        question: "Как проходит прием в школу?",
        answer:
          "Прием осуществляется на основе собеседования и тестирования по точным наукам.",
      },
      {
        question: "Каков распорядок дня?",
        answer: "Уроки начинаются в 08:30 и продолжаются до 16:30.",
      },
      {
        question: "Есть ли питание?",
        answer: "Да, в нашей школе организовано 3-разовое горячее питание.",
      },
      {
        question: "Какой документ выдается?",
        answer: "Выпускникам выдается аттестат государственного образца.",
      },
    ],
  },
  team_page: {
    hero_title1: "НАША",
    hero_title2: "КОМАНДА",
    dir_label: "Директор школы",
    more_info: "Подробнее",
    view_all: "Показать всех",
    hide: "Скрыть",
    exp_label: "Опыт",
    achievements_label: "Достижения и Сертификаты",
    details_btn: "Детали",
    years: "лет",
    admin_section: {
      subtitle: "Leadership",
      title: "Руководство",
      desc: "Профессиональная команда, обеспечивающая развитие и стратегическое управление школой.",
    },
    staff_section: {
      subtitle: "Faculty",
      title1: "Педагогический",
      title2: "Staff",
      desc: "Наши высококвалифицированные специалисты по каждому направлению.",
    },
    director: {
      name: "Мамасодиков Гуломжон",
      role: "Директор школы",
      quote:
        "Образование – это фундамент будущего. Мы стремимся раскрыть скрытые таланты каждого ребенка.",
      education: "ТГЭУ (Магистратура)",
      experience: "25",
      achievements: [
        "Отличник народного образования",
        "Лучший инновационный лидер года (2023)",
        "Обладатель международного сертификата менеджмента",
      ],
      bio: "Под руководством Гуломжона Мамасодикова школа перешла на современную инновационную систему обучения.",
    },
    categories: [
      { id: "all", name: "Все" },
      { id: "aniq", name: "Точные науки" },
      { id: "tabiiy", name: "Естественные науки" },
      { id: "filologiya", name: "Филология" },
    ],
    administration: [
      {
        id: "a1",
        name: "Анварова Дильноза",
        role: "Завуч по учебной части",
        education: "ТГПУ",
        experience: "18",
        achievements: ["Высшая категория", "Учитель-методист"],
        bio: "Специалист по организации учебного процесса по международным стандартам.",
      },
      {
        id: "a2",
        name: "Каримов Шерзод",
        role: "Завуч по духовно-просветительской работе",
        education: "НУУз",
        experience: "12",
        achievements: ["Квалифицированный педагог", "Пропагандист культуры"],
        bio: "Ответственный за духовно-нравственное воспитание и социальные проекты.",
      },
      {
        id: "a3",
        name: "Султонов Алишер",
        role: "Завхоз",
        education: "ТашГТУ",
        experience: "15",
        achievements: ["Эффективный менеджер"],
        bio: "Отвечает за техническое состояние школы и безопасность учащихся.",
      },
      {
        id: "a4",
        name: "Азизова Нигора",
        role: "Начальник отдела кадров",
        education: "WIUT",
        experience: "10",
        achievements: ["HR эксперт"],
        bio: "Управляет формированием команды и системой повышения квалификации сотрудников.",
      },
      {
        id: "a5",
        name: "Эргашев Рустам",
        role: "Главный бухгалтер",
        education: "ТФИ",
        experience: "20",
        achievements: ["Профессиональный бухгалтер"],
        bio: "Обеспечивает финансовую стабильность и прозрачность школы.",
      },
    ],
    teachers: [
      {
        id: "t1",
        category: "aniq",
        isLead: true,
        subject: "Математика",
        name: "Джасур Мирзаев",
        education: "НУУз",
        experience: "10",
        bio: "Специалист по математической логике и олимпиадным задачам.",
      },
      {
        id: "t2",
        category: "aniq",
        subject: "Физика",
        name: "Собир Эргашев",
        education: "СамГУ",
        experience: "12",
        bio: "Мастер квантовой физики и лабораторных экспериментов.",
      },
      {
        id: "t6",
        category: "tabiiy",
        isLead: true,
        subject: "Биология",
        name: "Лола Каримова",
        education: "НУУз",
        experience: "15",
        bio: "Исследователь в области генетики и молекулярной биологии.",
      },
      {
        id: "t11",
        category: "filologiya",
        isLead: true,
        subject: "Английский язык",
        name: "Нодира Алиева",
        education: "УзГУМЯ",
        experience: "6",
        bio: "Обладательница IELTS 8.5, международный методист по образованию.",
      },
      {
        id: "t12",
        category: "filologiya",
        subject: "Родной язык",
        name: "Абдувахоб Саидов",
        education: "ТГПУ",
        experience: "22",
        bio: "Педагог высшей категории по узбекскому языку и литературе.",
      },
    ],
  },
};

// --- EN MATNLARI (English) ---
const enTexts = {
  about: "About Us",
  dtm: "DTM",
  life: "School Life",
  team: "Our Team",
  blog: "Blog",
  menu: "Menu",
  contact: "Contact",
  theme: "Theme",
  phone: "+998 90 123 45 67",
  back: "Back",
  not_found: "Article not found",
  close: "Close",
  toast_success: "Results loaded!",
  toast_error: "ID not found!",
  header_sub: "Online results monitoring",
  id_placeholder: "Student ID number...",
  latest_label: "latest",
  status_active: "Status: Active",
  direction_label: "Direction",
  class_label: "Class",
  cert_label: "Achievement",
  rank_label: "Ranking",
  grant_label: "Scholarship",
  percent_label: "Percentile",
  analysis_label: "Analysis",
  rank_short: "Rank",
  grant_short: "Schol",
  percent_short: "Perc",
  analysis_short: "Anal",
  student_btn: "Student",
  school_btn: "School",
  analysis_title: "Exam Analysis",
  total_label: "Total Score",
  dynamics_title: "Result Dynamics",
  dyn_total: "Total Score Dynamics",
  dyn_block1: "1st Block Analysis",
  dyn_block2: "2nd Block Analysis",
  dyn_sub1: "Native Language",
  dyn_sub2: "Mathematics",
  dyn_sub3: "History",
  sections: "Sections",
  footerDesc:
    "Build the foundation of a successful future with us. Pure education, minimalist approach.",
  networks: "Networks",
  toTop: "To Top",
  rights: "© 2026 ISTIQBOL LUCK. ALL RIGHTS RESERVED.",
  developed: "DEVELOPED BY SOLIYEV.UZ",
  chat: {
    title: "Luck Assistant",
    status: "Online",
    placeholder: "Ask a question...",
    typing: "Luck AI is typing",
    welcome: "Hello! I'm Istiqbol Luck AI. How can I help you?",
    error: "Sorry, information not found. Administration: +998 90 123 45 67",
    kb: [
      {
        keywords: ["hello", "hi"],
        reply: "Hello! Welcome to Istiqbol Luck center.",
      },
      {
        keywords: ["address", "location"],
        reply: "We are located in Rishtan district, Fergana region.",
      },
      {
        keywords: ["price", "cost"],
        reply:
          "Prices vary depending on the course. Contact: +998 90 123 45 67",
      },
    ],
  },
  blog_subtitle: "Our World",
  blog_title1: "BLOG",
  blog_title2: "ARTICLES",
  blog_desc: "Modern educational trends, methodologies and success stories.",
  blog_all: "All",
  blog_read_time: "5 min read",
  blog_read_more: "Read",
  cert_subtitle: "Quality Assurance",
  cert_title1: "INTERNATIONAL",
  cert_title2: "AWARDS",
  cert_detail_label: "Certificate details",
  cert_confirm_text: "This certificate confirms professional success.",
  blogPosts: [
    {
      title: "Victory at Math Olympiad",
      category: "Awards",
      date: "Jan 10, 2024",
      desc: "Our students won 3 gold medals in USA...",
    },
    {
      title: "Innovative Methodology",
      category: "Methodology",
      date: "Jan 05, 2024",
      desc: "New technologies are used in education...",
    },
    {
      title: "Sports Complex Opening",
      category: "Sports",
      date: "Dec 28, 2023",
      desc: "New swimming pool is open for use...",
    },
    {
      title: "Arts Week",
      category: "Culture",
      date: "Dec 12, 2023",
      desc: "Exhibition of young talents was held...",
    },
  ],
  certificates: [
    { title: "International Teacher", teacher: "Alisher Rasulov" },
    { title: "IELTS Expert", teacher: "Sevara Ismoilova" },
    { title: "STEM Specialist", teacher: "Davronbek Karimov" },
    { title: "Pedagogy Excellence", teacher: "Nigora Aliyeva" },
  ],
  school_title: "COMING SOON!",
  school_desc:
    "The school performance and general analytics section is under development.",
  system_analysis: "System Analysis",
  new_dashboard: "New Dashboard",
  life_page: {
    hero_label: "Life in focus",
    hero_title1: "SCHOOL",
    hero_title2: "LIFE",
    hero_desc:
      "Every moment is a step towards success. Every day is valued with us.",
    view_gallery: "VIEW GALLERY",
    clubs_subtitle: "Center of Interests",
    clubs_title1: "EXTRA",
    clubs_title2: "CURRICULAR",
    clubs_desc:
      "We have organized special clubs to ensure our students not only gain knowledge but also develop freely according to their interests.",
    extraClubs: [
      {
        title: "Sports Clubs",
        desc: "Healthy body, physical endurance and winning spirit",
      },
      {
        title: "Cultural Leisure",
        desc: "Relaxation through films and cultural events",
      },
      {
        title: "Computer & IT",
        desc: "Programming and technological projects",
      },
      {
        title: "Extra Classes",
        desc: "In-depth preparation in academic subjects",
      },
    ],
    mission_subtitle: "Foundation of Success",
    mission_title1: "OUR",
    mission_title2: "DIRECTION",
    mission_desc:
      "We teach our students not only theoretical knowledge but also life skills individually.",
    missions: [
      {
        id: 1,
        title: "Individual Approach",
        desc: "We take into account that every child has their own strengths and weaknesses.",
      },
      {
        id: 2,
        title: "Global Vision",
        desc: "Classes are conducted based on international standards and modern methodologies.",
      },
      {
        id: 3,
        title: "Practical Skills",
        desc: "Emphasis is placed on practice and real-life experience rather than just theory.",
      },
    ],
    fac_subtitle: "Ideal Conditions",
    fac_title1: "COMFORT",
    fac_title2: "ZONE",
    fac_desc:
      "An environment equipped with maximum comfort, safety, and modern technologies for our students.",
    facilities: [
      {
        title: "SMART CLASSES",
        desc: "Classrooms equipped with the latest technologies and touchscreens.",
      },
      {
        title: "SPORTS COMPLEX",
        desc: "All conditions for a healthy lifestyle and physical development.",
      },
      {
        title: "SAFE AREA",
        desc: "Full control with 24/7 surveillance and security system.",
      },
      {
        title: "LIBRARY",
        desc: "A rich collection of books to broaden students' horizons.",
      },
    ],
    safe_badge: "100% Safe",
    proc_subtitle: "Our Methodology",
    proc_title1: "LEARNING",
    proc_title2: "PROCESS",
    proc_desc:
      "We build a solid foundation of knowledge for our students through the harmony of theory and practice.",
    theory: "Theory",
    discipline: "Discipline",
    creative: "Creative Environment",
  },
  home_page: {
    hero_label: "Academy of Future Leaders",
    hero_title1: "ISTIQBOL",
    hero_title2: "LUCK",
    hero_desc: "Istiqbol Luck — where future leaders grow and thrive.",
    hero_cta: "Contact Us",
    adv_subtitle: "Why choose us?",
    adv_title: "Our Advantages",
    adv_desc: "We bring out the hidden potential of every child.",
    advantages: [
      {
        id: "01",
        title: "Life Skills",
        desc: "Developing skills for free self-expression and teamwork.",
      },
      {
        id: "02",
        title: "Strong System",
        desc: "Programs based on the most effective global educational experiences.",
      },
      {
        id: "03",
        title: "Individual Care",
        desc: "A tailored approach to every student, regardless of their level.",
      },
    ],
    stats_subtitle: "Mirror of Success",
    stats_title1: "TRUST",
    stats_title2: "IN NUMBERS",
    stats: [
      {
        label: "Students",
        value: "1200+",
        desc: "Knowledge-seeking youth gathered as one big family.",
      },
      {
        label: "Graduates",
        value: "850+",
        desc: "Those who found their place in prestigious universities and life.",
      },
      {
        label: "Admission Rate",
        value: "98%",
        desc: "The share of our graduates in state and international universities.",
      },
    ],
    life_title1: "SCHOOL",
    life_title2: "LIFE",
    life_desc:
      "Every day is filled with joy and new knowledge. A collection of bright moments.",
    feed_subtitle: "Sincere Feedback",
    feed_title1: "STUDENTS'",
    feed_title2: "VOICE",
    feed_desc:
      "Our greatest achievement is our students' success and feedback.",
    studentFeedbacks: [
      { name: "Lola Abdullaeva", role: "11th-grade graduate" },
      { name: "Asadbek Orifov", role: "10th-grade student" },
      { name: "Jasur Mirzayev", role: "9th-grade student" },
    ],
    textFeedbacks: [
      {
        name: "Zuhra Karimova",
        role: "9th-grade",
        message:
          "I love the atmosphere here; the mentor system is incredibly helpful.",
      },
      {
        name: "Bekzod Rahmonov",
        role: "10th-grade",
        message:
          "There's no better place to prepare for international olympiads.",
      },
      {
        name: "Omina Ergasheva",
        role: "8th-grade",
        message:
          "Lessons are not just theory; we work a lot on practical projects.",
      },
    ],
    uni_subtitle: "Path to Success",
    uni_title1: "OUR GRADUATES",
    uni_title2: "IN UNIVERSITIES",
    uni_desc:
      "Our graduates continue their education at the most prestigious academic institutions.",
    form_title1: "TIME TO JOIN",
    form_title2: "IS NOW.",
    form_name_label: "Your Name",
    form_name_placeholder: "e.g., Ali Valiev",
    form_phone_label: "Phone Number",
    form_submit: "Submit Application",
    form_success_title: "Application Received!",
    form_success_desc: "We will contact you shortly.",
    map_branch: "Main Branch",
    map_address: "Rishtan District, Central Street",
    map_find: "Find on Map",
    faq_subtitle: "Questions you may have",
    faq_title1: "FREQUENTLY ASKED",
    faq_title2: "QUESTIONS",
    faq_desc:
      "If you cannot find the answer to your question, please contact us.",
    faqs: [
      {
        question: "How is the admission process?",
        answer:
          "Admission is based on an interview and tests in exact sciences.",
      },
      {
        question: "What is the daily schedule?",
        answer: "Classes start at 08:30 and continue until 16:30.",
      },
      {
        question: "Is there a catering system?",
        answer: "Yes, our school provides 3 hot meals a day.",
      },
      {
        question: "What diploma is provided?",
        answer: "Graduates are issued a state-standard certificate (attestat).",
      },
    ],
  },
  team_page: {
    hero_title1: "OUR",
    hero_title2: "TEAM",
    dir_label: "School Director",
    more_info: "More info",
    view_all: "View all",
    hide: "Hide",
    exp_label: "Experience",
    achievements_label: "Achievements & Certificates",
    details_btn: "Details",
    years: "years",
    admin_section: {
      subtitle: "Leadership",
      title: "Administration",
      desc: "A professional team ensuring the growth and strategic management of the school.",
    },
    staff_section: {
      subtitle: "Faculty",
      title1: "Pedagogical",
      title2: "Staff",
      desc: "Our highly qualified specialists in each field of study.",
    },
    director: {
      name: "Gulomjon Mamasodiqov",
      role: "School Director",
      quote:
        "Education is the foundation of the future. We aim to bring out the hidden potential of every child.",
      education: "TSUE (Master's)",
      experience: "25",
      achievements: [
        "Excellence in Public Education",
        "Innovative Leader of the Year (2023)",
        "International Management Certificate Holder",
      ],
      bio: "Under the leadership of Gulomjon Mamasodiqov, the school transitioned to a modern innovative education system.",
    },
    categories: [
      { id: "all", name: "All" },
      { id: "aniq", name: "Exact Sciences" },
      { id: "tabiiy", name: "Natural Sciences" },
      { id: "filologiya", name: "Philology" },
    ],
    administration: [
      {
        id: "a1",
        name: "Dilnoza Anvarova",
        role: "Director of Studies",
        education: "TSPU",
        experience: "18",
        achievements: ["Highest category", "Methodist teacher"],
        bio: "Specialist in organizing and supervising the educational process based on international standards.",
      },
      {
        id: "a2",
        name: "Sherzod Karimov",
        role: "Spirituality Director",
        education: "NUUz",
        experience: "12",
        achievements: ["Qualified pedagogue", "Culture advocate"],
        bio: "Responsible for ethical and spiritual education and social projects.",
      },
      {
        id: "a3",
        name: "Alisher Sultonov",
        role: "Economic Affairs Manager",
        education: "TashSTU",
        experience: "15",
        achievements: ["Effective manager"],
        bio: "Responsible for school technical maintenance and student safety.",
      },
      {
        id: "a4",
        name: "Nigora Azizova",
        role: "HR Manager",
        education: "WIUT",
        experience: "10",
        achievements: ["HR expert"],
        bio: "Manages team building and the staff professional development system.",
      },
      {
        id: "a5",
        name: "Rustam Ergashev",
        role: "Chief Accountant",
        education: "TFI",
        experience: "20",
        achievements: ["Professional accountant"],
        bio: "Ensures the school's financial stability and transparency.",
      },
    ],
    teachers: [
      {
        id: "t1",
        category: "aniq",
        isLead: true,
        subject: "Mathematics",
        name: "Jasur Mirzayev",
        education: "NUUz",
        experience: "10",
        bio: "Expert in mathematical logic and olympiad problems.",
      },
      {
        id: "t2",
        category: "aniq",
        subject: "Physics",
        name: "Sobir Ergashev",
        education: "SamSU",
        experience: "12",
        bio: "Master of quantum physics and laboratory experiments.",
      },
      {
        id: "t6",
        category: "tabiiy",
        isLead: true,
        subject: "Biology",
        name: "Lola Karimova",
        education: "NUUz",
        experience: "15",
        bio: "Researcher in genetics and molecular biology.",
      },
      {
        id: "t11",
        category: "filologiya",
        isLead: true,
        subject: "English Language",
        name: "Nodira Aliyeva",
        education: "UzSWLU",
        experience: "6",
        bio: "IELTS 8.5 holder, international educational methodologist.",
      },
      {
        id: "t12",
        category: "filologiya",
        subject: "Native Language",
        name: "Abduvakhob Saidov",
        education: "TSPU",
        experience: "22",
        bio: "Highest category pedagogue in Uzbek language and literature.",
      },
    ],
  },
};

// --- 4. EXPORT ---
export const translations = {
  UZ: createTranslation(uzTexts),
  UZ_KR: createTranslation(uzKrTexts),
  RU: createTranslation(ruTexts),
  EN: createTranslation(enTexts),
};
