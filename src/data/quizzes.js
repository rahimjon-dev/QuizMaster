// Quiz Dataset for QuizMaster App with 3 Languages (EN, UZ, RU)
// 5 Categories x 30 Questions = 150 Total Questions (Easy, Medium, Hard)

export const QUIZ_CATEGORIES = [
  {
    id: 'general',
    title: {
      en: 'General Knowledge',
      uz: 'Umumiy Bilimlar',
      ru: 'Общие Знания',
    },
    icon: '🧠',
    description: {
      en: 'Test your awareness of world facts, history, and records',
      uz: 'Dunyoviy dalillar, tarix va rekordlar bo\'yicha bilimingizni sinang',
      ru: 'Проверьте свои знания о мировых фактах, истории и рекордах',
    },
    difficulty: 'All Levels',
    color: '#8B5CF6',
  },
  {
    id: 'programming',
    title: {
      en: 'Programming',
      uz: 'Dasturlash',
      ru: 'Программирование',
    },
    icon: '💻',
    description: {
      en: 'JavaScript, React Native, algorithms, and systems',
      uz: 'JavaScript, React Native, algoritmlar va tizimlar',
      ru: 'Концепции JavaScript, React Native, алгоритмов и систем',
    },
    difficulty: 'All Levels',
    color: '#38BDF8',
  },
  {
    id: 'geography',
    title: {
      en: 'Geography',
      uz: 'Geografiya',
      ru: 'География',
    },
    icon: '🌍',
    description: {
      en: 'Capitals, continents, extreme points, and topography',
      uz: 'Poytaxtlar, qit\'alar, eng chekka nuqtalar va topografiya',
      ru: 'Столицы, континенты, крайние точки и топография',
    },
    difficulty: 'All Levels',
    color: '#10B981',
  },
  {
    id: 'football',
    title: {
      en: 'Football',
      uz: 'Futbol',
      ru: 'Футбол',
    },
    icon: '⚽',
    description: {
      en: 'World Cup, Champions League, tactical history, and legends',
      uz: 'Jahon chempionati, Chempionlar ligasi va afsonalar',
      ru: 'Чемпионат мира, Лига чемпионов, история и легенды',
    },
    difficulty: 'All Levels',
    color: '#F59E0B',
  },
  {
    id: 'science',
    title: {
      en: 'Science',
      uz: 'Fan va Tabiat',
      ru: 'Наука и Природа',
    },
    icon: '🔬',
    description: {
      en: 'Quantum physics, biology, chemistry, and space',
      uz: 'Kvant fizikasi, biologiya, kimyo va koinot',
      ru: 'Квантовая физика, биология, химия и космос',
    },
    difficulty: 'All Levels',
    color: '#EC4899',
  },
];

export const QUIZ_QUESTIONS = {
  general: [
    {
      id: 1,
      question: {
        en: 'Which planet in our solar system is known as the Red Planet?',
        uz: 'Quyosh tizimidagi qaysi sayyora "Qizil sayyora" deb ataladi?',
        ru: 'Какая планета нашей солнечной системы известна как Красная планета?',
      },
      options: {
        en: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        uz: ['Venera', 'Mars', 'Yupiter', 'Saturn'],
        ru: ['Венера', 'Марс', 'Юпитер', 'Сатурн'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 2,
      question: {
        en: 'Who painted the famous Mona Lisa artwork?',
        uz: 'Mashhur "Mona Liza" asarini kim chizgan?',
        ru: 'Кто написал знаменитую картину «Мона Лиза»?',
      },
      options: {
        en: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
        uz: ['Vinsent van Gog', 'Pablo Pikasso', 'Leonardo da Vinchi', 'Klod Mone'],
        ru: ['Винсент ван Гог', 'Пабло Пикассо', 'Леонардо да Винчи', 'Клод Моне'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 3,
      question: {
        en: 'What is the largest ocean on Earth?',
        uz: 'Yer yuzidagi eng katta okean qaysi?',
        ru: 'Какой океан является самым большим на Земле?',
      },
      options: {
        en: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        uz: ['Atlantika okeani', 'Hind okeani', 'Shimoliy Muz okeani', 'Tinch okeani'],
        ru: ['Атлантический океан', 'Индийский океан', 'Северный Ледовитый', 'Тихий океан'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 4,
      question: {
        en: 'Which element has the chemical symbol "O"?',
        uz: 'Qaysi kimyoviy elementning belgisi "O"?',
        ru: 'Какой химический элемент имеет символ «O»?',
      },
      options: {
        en: ['Oxygen', 'Gold', 'Osmium', 'Zinc'],
        uz: ['Kislorod', 'Oltin', 'Osmiy', 'Sink'],
        ru: ['Кислород', 'Золото', 'Осмий', 'Цинк'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 5,
      question: {
        en: 'How many bones are there in an adult human body?',
        uz: 'Kattalar odam organizmida nechta suyak bor?',
        ru: 'Сколько костей в организме взрослого человека?',
      },
      options: {
        en: ['210', '206', '198', '204'],
        uz: ['210', '206', '198', '204'],
        ru: ['210', '206', '198', '204'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 6,
      question: {
        en: 'What is the national currency of Japan?',
        uz: 'Yaponiyaning milliy valyutasi nima?',
        ru: 'Какая национальная валюта Японии?',
      },
      options: {
        en: ['Yuan', 'Won', 'Yen', 'Ringgit'],
        uz: ['Yuan', 'Vona', 'Iena', 'Ringgit'],
        ru: ['Юань', 'Вона', 'Иена', 'Ринггит'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 7,
      question: {
        en: 'Which country is home to the ancient pyramids of Giza?',
        uz: 'Qaysi davlatda qadimgi Giza piramidalari joylashgan?',
        ru: 'В какой стране находятся древние пирамиды Гизы?',
      },
      options: {
        en: ['Greece', 'Peru', 'Mexico', 'Egypt'],
        uz: ['Gretsiya', 'Peru', 'Meksika', 'Misr'],
        ru: ['Греция', 'Перу', 'Мексика', 'Египет'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 8,
      question: {
        en: 'Who invented the modern telephone?',
        uz: 'Zamonaviy telefonni kim ixtiro qilgan?',
        ru: 'Кто изобрел современный телефон?',
      },
      options: {
        en: ['Alexander Graham Bell', 'Thomas Edison', 'Nikola Tesla', 'Guglielmo Marconi'],
        uz: ['Aleksandr Greyam Bell', 'Tomas Edison', 'Nikola Tesla', 'Gugliyelmo Markoni'],
        ru: ['Александр Грэхем Белл', 'Томас Эдисон', 'Никола Тесла', 'Гульельмо Маркони'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 9,
      question: {
        en: 'What is the hardest natural substance found on Earth?',
        uz: 'Yerdagi eng qattiq tabiiy modda nima?',
        ru: 'Какое самое твердое природное вещество на Земле?',
      },
      options: {
        en: ['Titanium', 'Diamond', 'Quartz', 'Graphene'],
        uz: ['Titan', 'Olmos', 'Kvars', 'Grafen'],
        ru: ['Титан', 'Алмаз', 'Кварц', 'Графен'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 10,
      question: {
        en: 'In which year did World War II end?',
        uz: 'Ikkinchi jahon urushi qaysi yili tugagan?',
        ru: 'В каком году закончилась Вторая мировая война?',
      },
      options: {
        en: ['1943', '1950', '1945', '1939'],
        uz: ['1943', '1950', '1945', '1939'],
        ru: ['1943', '1950', '1945', '1939'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 11,
      question: {
        en: 'Which instrument is used to measure atmospheric pressure?',
        uz: 'Atmosfera bosimini o\'lchash uchun qaysi asbob ishlatiladi?',
        ru: 'Какой прибор используется для измерения атмосферного давления?',
      },
      options: {
        en: ['Thermometer', 'Hygrometer', 'Anemometer', 'Barometer'],
        uz: ['Termometr', 'Gigrometr', 'Anemometr', 'Barometr'],
        ru: ['Термометр', 'Гигрометр', 'Анемометр', 'Барометр'],
      },
      correctAnswer: 3,
      difficulty: 'Medium',
    },
    {
      id: 12,
      question: {
        en: 'What is the capital city of Australia?',
        uz: 'Avstraliyaning poytaxti qaysi shahar?',
        ru: 'Какая столица Австралии?',
      },
      options: {
        en: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
        uz: ['Kanberra', 'Sidney', 'Melburn', 'Brisben'],
        ru: ['Канберра', 'Сидней', 'Мельбурн', 'Брисбен'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 13,
      question: {
        en: 'Which gas makes up the majority of Earth\'s atmosphere?',
        uz: 'Yer atmosferasining ko\'p qismini qaysi gaz tashkil qiladi?',
        ru: 'Какой газ составляет большую часть атмосферы Земли?',
      },
      options: {
        en: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
        uz: ['Kislorod', 'Azot', 'Uglerod dioksidi', 'Argon'],
        ru: ['Кислород', 'Азот', 'Углекислый газ', 'Аргон'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 14,
      question: {
        en: 'Who wrote the play "Romeo and Juliet"?',
        uz: '"Romeo va Julyetta" asarini kim yozgan?',
        ru: 'Кто написал пьесу «Ромео и Джульетта»?',
      },
      options: {
        en: ['Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen'],
        uz: ['Charlz Dikkens', 'Mark Tven', 'Uilyam Shekspir', 'Djeyn Ostin'],
        ru: ['Чарльз Диккенс', 'Марк Твен', 'Уильям Шекспир', 'Джейн Остин'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 15,
      question: {
        en: 'What is the fastest land animal in the world?',
        uz: 'Dunyodagi eng tez yuguradigan quruqlik hayvoni qaysi?',
        ru: 'Какое самое быстрое сухопутное животное в мире?',
      },
      options: {
        en: ['Lion', 'Cheetah', 'Falcon', 'Pronghorn'],
        uz: ['Sher', 'Gepard', 'Lochin', 'Antilopa'],
        ru: ['Лев', 'Гепард', 'Сокол', 'Антилопа'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    // General Knowledge: Hard Level (Deep, challenging questions)
    {
      id: 16,
      question: {
        en: 'Which ancient civilization constructed the city of Machu Picchu?',
        uz: 'Machu Pikchu shahrini qaysi qadimgi sivilizatsiya qurgan?',
        ru: 'Какая древняя цивилизация построила город Мачу-Пикчу?',
      },
      options: {
        en: ['Aztecs', 'Mayans', 'Incas', 'Olmecs'],
        uz: ['Atsteklar', 'Mayyalar', 'Inklar', 'Olmeyklar'],
        ru: ['Ацтеки', 'Майя', 'Инки', 'Ольмеки'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 17,
      question: {
        en: 'What was the code name for the Allied invasion of Normandy in June 1944?',
        uz: '1944-yilgi Normandiya desant operatsiyasining maxfiy kodi nima edi?',
        ru: 'Каково было кодовое название высадки союзников в Нормандии в 1944 году?',
      },
      options: {
        en: ['Operation Barbarossa', 'Operation Overlord', 'Operation Market Garden', 'Operation Torch'],
        uz: ['Operatsiya Barbarossa', 'Operatsiya Overlord', 'Operatsiya Market Garden', 'Operatsiya Torch'],
        ru: ['Операция Барбаросса', 'Операция Оверлорд', 'Операция Маркет Гарден', 'Операция Торч'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 18,
      question: {
        en: 'In philosophy, who famously declared "Cogito, ergo sum" (I think, therefore I am)?',
        uz: 'Falsafada "Cogito, ergo sum" (Fikr qilyapmanmi, demak mavjudman) iborasining muallifi kim?',
        ru: 'Кто из философов сформулировал тезис «Cogito, ergo sum»?',
      },
      options: {
        en: ['Rene Descartes', 'Immanuel Kant', 'Friedrich Nietzsche', 'John Locke'],
        uz: ['Rene Dekart', 'Immanuil Kant', 'Fridrix Nitsshe', 'Jon Lokk'],
        ru: ['Рене Декарт', 'Иммануил Кант', 'Фридрих Ницше', 'Джон Локк'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 19,
      question: {
        en: 'Which European treaty in 1648 marked the end of the Thirty Years\' War?',
        uz: '1648-yilda O\'ttiz yillik urushga barham bergan mashhur sulh qaysi?',
        ru: 'Какой мирный договор 1648 года завершил Тридцатилетнюю войну?',
      },
      options: {
        en: ['Treaty of Versailles', 'Peace of Westphalia', 'Treaty of Utrecht', 'Treaty of Tordesillas'],
        uz: ['Versal shartnomasi', 'Vestfaliya tinchligi', 'Utrext sulhi', 'Tordesilyas bitimi'],
        ru: ['Версальский мир', 'Вестфальский мир', 'Утрехтский мир', 'Тордесильясский договор'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 20,
      question: {
        en: 'What is the only known mammal capable of true sustained flight?',
        uz: 'Haqiqiy uchish qobiliyatiga ega bo\'lgan yagona sutemizuvchi hayvon qaysi?',
        ru: 'Какое единственное известное млекопитающее способно к активному полету?',
      },
      options: {
        en: ['Flying Squirrel', 'Sugar Glider', 'Bat', 'Colugo'],
        uz: ['Uchar olmaxon', 'Qandli posum', 'Ko\'rshapalak', 'Junqanot'],
        ru: ['Летяга', 'Сахарный летяга', 'Летучая мышь', 'Шерстокрыл'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 21,
      question: {
        en: 'Which country has the most official languages in the world (with 16+ recognized)?',
        uz: 'Dunyoda eng ko\'p davlat va rasmiy tillariga ega mamlakat qaysi (16 tadan ortiq)?',
        ru: 'Какая страна имеет наибольшее количество официальных языков в мире (более 16)?',
      },
      options: {
        en: ['Switzerland', 'India', 'Zimbabwe', 'South Africa'],
        uz: ['Shveysariya', 'Hindiston', 'Zimbabve', 'Janubiy Afrika'],
        ru: ['Швейцария', 'Индия', 'Зимбабве', 'ЮАР'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 22,
      question: {
        en: 'Who was the first emperor of unified China (Qin dynasty)?',
        uz: 'Yagona Xitoy imperiyasining birinchi imperatori kim bo\'lgan?',
        ru: 'Кто был первым императором объединенного Китая?',
      },
      options: {
        en: ['Qin Shi Huang', 'Han Wudi', 'Kublai Khan', 'Sun Tzu'],
        uz: ['Sin Shixuandi', 'Xan Vudi', 'Xubilayxon', 'Sun Szi'],
        ru: ['Цинь Шихуанди', 'Хань У-ди', 'Хубилай', 'Сунь-цзы'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 23,
      question: {
        en: 'What is the deepest point in Earth\'s oceans, located in the Mariana Trench?',
        uz: 'Mariana botig\'idagi Yer okeanlarining eng chuqur nuqtasi qanday ataladi?',
        ru: 'Как называется самая глубокая точка мирового океана в Марианской впадине?',
      },
      options: {
        en: ['Java Deep', 'Challenger Deep', 'Puerto Rico Trench', 'Tonga Trench'],
        uz: ['Yava chuqurligi', 'Challenjer tubi (Challenger Deep)', 'Puerto-Riko botig\'i', 'Tonga botig\'i'],
        ru: ['Яванская впадина', 'Бездна Челленджера', 'Пуэрто-Рико', 'Впадина Тонга'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 24,
      question: {
        en: 'Which author created the legendary detective character Hercule Poirot?',
        uz: 'Afsonaviy izquvar Erkül Puaro obrazining muallifi kim?',
        ru: 'Какой писатель создал персонажа Эркюля Пуаро?',
      },
      options: {
        en: ['Arthur Conan Doyle', 'Agatha Christie', 'Edgar Allan Poe', 'Raymond Chandler'],
        uz: ['Artur Konan Doyl', 'Agata Kristi', 'Edgar Allan Po', 'Reymond Chandler'],
        ru: ['Артур Конан Дойл', 'Агата Кристи', 'Эдгар Аллан По', 'Рэймонд Чандлер'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 25,
      question: {
        en: 'What does the mathematical acronym "Q.E.D." stand for at the end of a proof?',
        uz: 'Matematik isbotlar oxirida qo\'yiladigan "Q.E.D." qisqartmasining lotincha ma\'nosi nima?',
        ru: 'Что означает латинское сокращение «Q.E.D.» в конце доказательства?',
      },
      options: {
        en: ['Quod erat demonstrandum', 'Quantum erat divisum', 'Quid est datum', 'Quo errat demonstratio'],
        uz: ['Quod erat demonstrandum', 'Quantum erat divisum', 'Quid est datum', 'Quo errat demonstratio'],
        ru: ['Quod erat demonstrandum', 'Quantum erat divisum', 'Quid est datum', 'Quo errat demonstratio'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 26,
      question: {
        en: 'In which year did the Apollo 11 mission successfully land the first humans on the Moon?',
        uz: 'Apollon 11 missiyasi insoniyat tarixida ilk bor Oyga qaysi yili muvaffaqiyatli qo\'ndi?',
        ru: 'В каком году миссия «Аполлон-11» высадила первых людей на Луну?',
      },
      options: {
        en: ['1967', '1971', '1969', '1965'],
        uz: ['1967', '1971', '1969', '1965'],
        ru: ['1967', '1971', '1969', '1965'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 27,
      question: {
        en: 'Which ancient wonder was located in Alexandria and guided sailors into harbor?',
        uz: 'Qadimgi dunyoning yetti mo\'jizasidan qaysi biri Iskandariyada dengizchilarga yo\'l ko\'rsatgan?',
        ru: 'Какое чудо света находилось в Александрии и указывало путь морякам?',
      },
      options: {
        en: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Temple of Artemis', 'Mausoleum at Halicarnassus'],
        uz: ['Rodos bahayi', 'Iskandariya mayog\'i', 'Artemida ibodatxonasi', 'Galikarnas maqbarasi'],
        ru: ['Колосс Родосский', 'Александрийский маяк', 'Храм Артемиды', 'Мавзолей в Галикарнасе'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 28,
      question: {
        en: 'What is the oldest continuously inhabited capital city in the world?',
        uz: 'Dunyodagi uzluksiz aholi yashab kelayotgan eng qadimiy poytaxt shahar qaysi?',
        ru: 'Какая столица считается старейшим непрерывно населенным городом в мире?',
      },
      options: {
        en: ['Athens', 'Rome', 'Damascus', 'Cairo'],
        uz: ['Afina', 'Rim', 'Damashq', 'Qohira'],
        ru: ['Афины', 'Рим', 'Дамаск', 'Каир'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 29,
      question: {
        en: 'Which biological taxonomy rank sits between "Order" and "Genus"?',
        uz: 'Biologik tasnifda "Tartib" (Order) va "Urug\'" (Genus) o\'rtasida qaysi bosqich turadi?',
        ru: 'Какой ранг биологической таксономии находится между «Отрядом» и «Родом»?',
      },
      options: {
        en: ['Family', 'Class', 'Phylum', 'Kingdom'],
        uz: ['Oila (Family)', 'Sinf (Class)', 'Tip (Phylum)', 'Shohlik (Kingdom)'],
        ru: ['Семейство', 'Класс', 'Тип', 'Царство'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 30,
      question: {
        en: 'Who formulated the famous economic theory known as the "Invisible Hand"?',
        uz: 'Iqtisodiyotda mashhur "Ko\'rinmas qo\'l" nazariyasini kim ishlab chiqqan?',
        ru: 'Кто сформулировал знаменитую экономическую концепцию «Невидимой руки рынка»?',
      },
      options: {
        en: ['John Maynard Keynes', 'Karl Marx', 'Adam Smith', 'Milton Friedman'],
        uz: ['Jon Meynard Keyns', 'Karl Marks', 'Adam Smit', 'Milton Fridman'],
        ru: ['Джон Мейнард Кейнс', 'Карл Маркс', 'Адам Смит', 'Милтон Фридман'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
  ],

  programming: [
    {
      id: 1,
      question: {
        en: 'Which language is primarily used to build React Native applications?',
        uz: 'React Native dasturlarini yaratishda asosiy qaysi til ishlatiladi?',
        ru: 'Какой язык в основном используется для создания приложений React Native?',
      },
      options: {
        en: ['Python', 'JavaScript / TypeScript', 'C++', 'Java'],
        uz: ['Python', 'JavaScript / TypeScript', 'C++', 'Java'],
        ru: ['Python', 'JavaScript / TypeScript', 'C++', 'Java'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 2,
      question: {
        en: 'What component is used in React Native instead of web <div> element?',
        uz: 'React Native da web <div> elementi o\'rniga qaysi komponent ishlatiladi?',
        ru: 'Какой компонент используется в React Native вместо веб-элемента <div>?',
      },
      options: {
        en: ['<Container>', '<Section>', '<View>', '<Box>'],
        uz: ['<Container>', '<Section>', '<View>', '<Box>'],
        ru: ['<Container>', '<Section>', '<View>', '<Box>'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 3,
      question: {
        en: 'Which React Hook is used to manage local component state?',
        uz: 'Komponentning ichki holatini boshqarish uchun qaysi React Hook ishlatiladi?',
        ru: 'Какой React Hook используется для управления локальным состоянием компонента?',
      },
      options: {
        en: ['useEffect', 'useMemo', 'useContext', 'useState'],
        uz: ['useEffect', 'useMemo', 'useContext', 'useState'],
        ru: ['useEffect', 'useMemo', 'useContext', 'useState'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 4,
      question: {
        en: 'What framework simplifies creating React Native mobile apps?',
        uz: 'React Native mobil ilovalarini osongina yaratishga yordam beradigan freymvork qaysi?',
        ru: 'Какой фреймворк упрощает создание мобильных приложений React Native?',
      },
      options: {
        en: ['Expo', 'Webpack', 'Gulp', 'Babel'],
        uz: ['Expo', 'Webpack', 'Gulp', 'Babel'],
        ru: ['Expo', 'Webpack', 'Gulp', 'Babel'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 5,
      question: {
        en: 'In React Native Flexbox, what is the default `flexDirection` value?',
        uz: 'React Native Flexbox-da `flexDirection` ning standart qiymati nima?',
        ru: 'В React Native Flexbox какое значение `flexDirection` используется по умолчанию?',
      },
      options: {
        en: ['row', 'column', 'row-reverse', 'grid'],
        uz: ['row', 'column', 'row-reverse', 'grid'],
        ru: ['row', 'column', 'row-reverse', 'grid'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 6,
      question: {
        en: 'Which component must wrap all text strings in React Native?',
        uz: 'React Native-da barcha matnlar qaysi komponent ichiga olinishi shart?',
        ru: 'Какой компонент должен обертывать все текстовые строки в React Native?',
      },
      options: {
        en: ['<Label>', '<Span>', '<Text>', '<P>'],
        uz: ['<Label>', '<Span>', '<Text>', '<P>'],
        ru: ['<Label>', '<Span>', '<Text>', '<P>'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 7,
      question: {
        en: 'What storage engine is used for local key-value data in React Native?',
        uz: 'React Native-da ma\'lumotlarni mahalliy saqlash uchun nima ishlatiladi?',
        ru: 'Какая библиотека используется для локального хранения данных в React Native?',
      },
      options: {
        en: ['LocalStorage', 'IndexedDB', 'SessionStorage', 'AsyncStorage'],
        uz: ['LocalStorage', 'IndexedDB', 'SessionStorage', 'AsyncStorage'],
        ru: ['LocalStorage', 'IndexedDB', 'SessionStorage', 'AsyncStorage'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 8,
      question: {
        en: 'Which JS array method transforms elements into a new array?',
        uz: 'Massiv elementlarini o\'zgartirib yangi massiv qaytaradigan JS metodi qaysi?',
        ru: 'Какой метод массивов JS преобразует элементы в новый массив?',
      },
      options: {
        en: ['map()', 'filter()', 'forEach()', 'reduce()'],
        uz: ['map()', 'filter()', 'forEach()', 'reduce()'],
        ru: ['map()', 'filter()', 'forEach()', 'reduce()'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 9,
      question: {
        en: 'Which keyword declares read-only constant variables in ES6 JavaScript?',
        uz: 'O\'zgarmas o\'zgaruvchilarni e\'lon qilish uchun qaysi kalit so\'z ishlatiladi?',
        ru: 'Какое ключевое слово объявляет неизменяемые константы в ES6 JavaScript?',
      },
      options: {
        en: ['var', 'const', 'let', 'static'],
        uz: ['var', 'const', 'let', 'static'],
        ru: ['var', 'const', 'let', 'static'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 10,
      question: {
        en: 'Which component is used for touch interaction feedback in React Native?',
        uz: 'Bosish effekti bilan ishlaydigan zamonaviy knopka komponenti qaysi?',
        ru: 'Какой компонент используется для обработки нажатий с откликом в React Native?',
      },
      options: {
        en: ['<Clickable>', '<ButtonView>', '<Pressable>', '<TouchEvent>'],
        uz: ['<Clickable>', '<ButtonView>', '<Pressable>', '<TouchEvent>'],
        ru: ['<Clickable>', '<ButtonView>', '<Pressable>', '<TouchEvent>'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 11,
      question: {
        en: 'What feature reloads code immediately when saving files in Expo?',
        uz: 'Faylni saqlaganizda ilovani darhol avto-yangilaydigan funksiya nomi nima?',
        ru: 'Какая функция мгновенно перезагружает код при сохранении файлов?',
      },
      options: {
        en: ['Fast Refresh', 'Live Compile', 'Hot Swap', 'Static Reload'],
        uz: ['Fast Refresh', 'Live Compile', 'Hot Swap', 'Static Reload'],
        ru: ['Fast Refresh', 'Live Compile', 'Hot Swap', 'Static Reload'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 12,
      question: {
        en: 'What is the primary function of `useEffect` in React?',
        uz: 'React-da `useEffect` hookining asosiy vazifasi nima?',
        ru: 'Какова основная функция `useEffect` в React?',
      },
      options: {
        en: ['Render HTML', 'Handle side-effects & data fetching', 'Style components', 'Routing'],
        uz: ['Render qilish', 'Tashqi ta\'sirlar va ma\'lumot yuklash', 'Stil berish', 'Routing'],
        ru: ['Рендеринг', 'Побочные эффекты и загрузка данных', 'Стилизация', 'Маршрутизация'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 13,
      question: {
        en: 'Which component is optimized for rendering long dynamic lists in React Native?',
        uz: 'Katta ro\'yxatlarni samarali chiqarish uchun mo\'ljallangan komponent qaysi?',
        ru: 'Какой компонент оптимизирован для вывода больших списков данных?',
      },
      options: {
        en: ['<ScrollView>', '<ListView>', '<FlatList>', '<DataGrid>'],
        uz: ['<ScrollView>', '<ListView>', '<FlatList>', '<DataGrid>'],
        ru: ['<ScrollView>', '<ListView>', '<FlatList>', '<DataGrid>'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 14,
      question: {
        en: 'In JavaScript, what does `typeof null` evaluate to?',
        uz: 'JavaScript-da `typeof null` natijasi nima bo\'ladi?',
        ru: 'Что возвращает выражение `typeof null` в JavaScript?',
      },
      options: {
        en: ['null', 'undefined', 'object', 'boolean'],
        uz: ['null', 'undefined', 'object', 'boolean'],
        ru: ['null', 'undefined', 'object', 'boolean'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 15,
      question: {
        en: 'What hook is used to memoize computationally expensive calculations in React?',
        uz: 'React-da murakkab hisob-kitoblarni keshlab saqlash uchun qaysi hook ishlatiladi?',
        ru: 'Какой хук используется для мемоизации сложных вычислений в React?',
      },
      options: {
        en: ['useCallback', 'useMemo', 'useRef', 'useLayoutEffect'],
        uz: ['useCallback', 'useMemo', 'useRef', 'useLayoutEffect'],
        ru: ['useCallback', 'useMemo', 'useRef', 'useLayoutEffect'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    // Programming: Hard Level (Advanced Architecture & Engine concepts)
    {
      id: 16,
      question: {
        en: 'What is the New Architecture C++ communication layer that replaced the old React Native Bridge?',
        uz: 'React Native-ning yangi arxitekturasida eski ko\'prik (Bridge) o\'rnini egallagan C++ qatlam nima?',
        ru: 'Какой C++ слой заменил старый Bridge в новой архитектуре React Native?',
      },
      options: {
        en: ['Hermes Engine', 'JSI (JavaScript Interface)', 'Fabric Renderer', 'TurboModule Native'],
        uz: ['Hermes Engine', 'JSI (JavaScript Interface)', 'Fabric Renderer', 'TurboModule Native'],
        ru: ['Hermes Engine', 'JSI (JavaScript Interface)', 'Fabric Renderer', 'TurboModule Native'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 17,
      question: {
        en: 'What is the average time complexity of searching a key in a balanced Hash Map?',
        uz: 'Muvozanatli Hash Map (xesh jadval)da kalitni qidirishning o\'rtacha vaqt murakkabligi nima?',
        ru: 'Какова средняя временная сложность поиска ключа в сбалансированной Hash Map?',
      },
      options: {
        en: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        uz: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
        ru: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 18,
      question: {
        en: 'In the JavaScript Event Loop, which queue executes FIRST after the current execution context finishes?',
        uz: 'JavaScript Event Loop-da sinxron kod tugagach birinchi bo\'lib qaysi navbat bajariladi?',
        ru: 'В Event Loop JavaScript какая очередь выполняется ПЕРВОЙ после завершения стека вызовов?',
      },
      options: {
        en: ['Macrotask Queue (setTimeout)', 'Microtask Queue (Promises, queueMicrotask)', 'UI Rendering Queue', 'I/O Polling'],
        uz: ['Macrotask (setTimeout)', 'Microtask (Promislar, queueMicrotask)', 'UI Rendering', 'I/O Polling'],
        ru: ['Macrotask Queue (setTimeout)', 'Microtask Queue (Promises, queueMicrotask)', 'UI Rendering Queue', 'I/O Polling'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 19,
      question: {
        en: 'What new rendering engine in React Native New Architecture supports concurrent rendering and synchronous layout?',
        uz: 'React Native yangi arxitekturasida sinxron layout va parallel render qiluvchi yangi tizim qaysi?',
        ru: 'Какой новый движок рендеринга в новой архитектуре React Native поддерживает конкурентный рендеринг?',
      },
      options: {
        en: ['Fabric', 'Yoga', 'TurboModules', 'Metro'],
        uz: ['Fabric', 'Yoga', 'TurboModules', 'Metro'],
        ru: ['Fabric', 'Yoga', 'TurboModules', 'Metro'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 20,
      question: {
        en: 'What will `[1, 2, 3] + [4, 5, 6]` evaluate to in JavaScript?',
        uz: 'JavaScript-da `[1, 2, 3] + [4, 5, 6]` ifodasi qanday natija qaytaradi?',
        ru: 'К чему приведет выражение `[1, 2, 3] + [4, 5, 6]` в JavaScript?',
      },
      options: {
        en: ['[1, 2, 3, 4, 5, 6]', '"1,2,34,5,6"', 'NaN', 'TypeError'],
        uz: ['[1, 2, 3, 4, 5, 6]', '"1,2,34,5,6"', 'NaN', 'TypeError'],
        ru: ['[1, 2, 3, 4, 5, 6]', '"1,2,34,5,6"', 'NaN', 'TypeError'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 21,
      question: {
        en: 'Which HTTP status code represents "429"?',
        uz: 'HTTP 429 xato kodi nimani bildiradi?',
        ru: 'Что означает HTTP статус код 429?',
      },
      options: {
        en: ['Unauthorized', 'Too Many Requests (Rate Limited)', 'Payload Too Large', 'Service Unavailable'],
        uz: ['Ruxsat yo\'q', 'Too Many Requests (So\'rovlar limiti oshgan)', 'Hajm juda katta', 'Server ishlamayapti'],
        ru: ['Unauthorized', 'Too Many Requests (Превышен лимит запросов)', 'Payload Too Large', 'Service Unavailable'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 22,
      question: {
        en: 'What design pattern does React utilize when updating the DOM with a Virtual DOM reconciliation tree?',
        uz: 'React DOM-ni Virtual DOM daraxti bilan yangilashda qaysi algoritmik tamoyil (reconciliation)dan foydalanadi?',
        ru: 'Какой алгоритмический принцип использует React при согласовании (reconciliation) Virtual DOM?',
      },
      options: {
        en: ['Heuristic O(n) Diffing Algorithm', 'Brute-force O(n^3) Tree Matching', 'Dijkstra Shortest Path', 'Binary Tree Inversion'],
        uz: ['Evristik O(n) Diffing algoritmi', 'O(n^3) to\'liq tekshiruv', 'Dijkstra algoritmi', 'Ikkilik daraxt inversiyasi'],
        ru: ['Эвристический алгоритм Diffing O(n)', 'Полный перебор O(n^3)', 'Алгоритм Дейкстры', 'Инверсия дерева'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 23,
      question: {
        en: 'Which statement accurately describes a JavaScript Closure?',
        uz: 'JavaScript-da Closure (yopilish) tushunchasi nimani anglatadi?',
        ru: 'Какое утверждение точно описывает замыкание (Closure) в JavaScript?',
      },
      options: {
        en: [
          'A function having access to its outer lexical scope even after the outer function has closed',
          'A method to immediately terminate execution of an async function',
          'A private class property syntax introduced in ES2022',
          'A garbage collector cycle that cleans unused memory',
        ],
        uz: [
          'Funksiya o\'zi e\'lon qilingan tashqi leksik muhitdagi o\'zgaruvchilarni eslab qolishi',
          'Asinxron funksiyani to\'xtatish usuli',
          'ES2022 dagi klasslarning yopiq propertisi',
          'Xotirani tozalovchi garbage collector usuli',
        ],
        ru: [
          'Функция сохраняет доступ к своей внешней лексической области видимости после ее завершения',
          'Способ немедленного завершения асинхронной функции',
          'Приватное свойство класса в ES2022',
          'Цикл сборщика мусора для очистки памяти',
        ],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 24,
      question: {
        en: 'What engine does Meta develop and optimize specifically for React Native on Android and iOS?',
        uz: 'Meta kompaniyasi React Native uchun maxsus optimallashtirib ishlab chiqqan JS dvigateli qaysi?',
        ru: 'Какой JS-движок Meta разработала специально для оптимизации React Native?',
      },
      options: {
        en: ['V8 Engine', 'Hermes', 'JavaScriptCore', 'SpiderMonkey'],
        uz: ['V8 Engine', 'Hermes', 'JavaScriptCore', 'SpiderMonkey'],
        ru: ['V8 Engine', 'Hermes', 'JavaScriptCore', 'SpiderMonkey'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 25,
      question: {
        en: 'What does the `useCallback(fn, deps)` hook return in React?',
        uz: 'React-da `useCallback(fn, deps)` hooki nimani qaytaradi?',
        ru: 'Что возвращает хук `useCallback(fn, deps)` в React?',
      },
      options: {
        en: ['The memoized return value of the function', 'A memoized version of the callback function itself', 'A state dispatch function', 'A mutable ref object'],
        uz: ['Funksiyaning hisoblangan natijasini', 'Funksiyaning o\'zining keshdagi nusxasini', 'Dispatch funksiyasini', 'Mutable ref obyektini'],
        ru: ['Мемоизированный результат функции', 'Мемоизированную версию самой функции', 'Функцию dispatch', 'Объект ref'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 26,
      question: {
        en: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
        uz: 'Qaysi ma\'lumotlar tuzilmasi FIFO (Birinchi kirgan - birinchi chiqadi) tamoyili asosida ishlaydi?',
        ru: 'Какая структура данных работает по принципу FIFO (Первым пришел — первым ушел)?',
      },
      options: {
        en: ['Stack', 'Queue', 'Binary Search Tree', 'Heap'],
        uz: ['Stack (Stek)', 'Queue (Navbat)', 'Binary Search Tree', 'Heap'],
        ru: ['Стек (Stack)', 'Очередь (Queue)', 'Бинарное дерево', 'Куча (Heap)'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 27,
      question: {
        en: 'What is the purpose of `React.memo`?',
        uz: 'React-da `React.memo` nima maqsadda ishlatiladi?',
        ru: 'Какова цель использования `React.memo`?',
      },
      options: {
        en: ['To manage asynchronous network calls', 'To prevent unnecessary re-renders when props do not change', 'To handle global application state', 'To inspect memory leaks'],
        uz: ['Tarmoq so\'rovlarini boshqarish', 'Props o\'zgarmaganda keraksiz qayta renderlarni oldini olish', 'Global holatni saqlash', 'Xotira xatolarini tekshirish'],
        ru: ['Для сетевых запросов', 'Для предотвращения лишних ререндеров, если пропсы не изменились', 'Для глобального стейта', 'Для поиска утечек памяти'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 28,
      question: {
        en: 'In React Native, which style property is required to make an absolute positioned element render on top of others on Android?',
        uz: 'Android qurilmalarida elementni boshqalarning ustiga chiqarish uchun qaysi property ishlatiladi?',
        ru: 'В React Native какое свойство стиля необходимо для отображения поверх других на Android?',
      },
      options: {
        en: ['zIndex & elevation', 'display: overlay', 'float: top', 'opacity: 1'],
        uz: ['zIndex va elevation', 'display: overlay', 'float: top', 'opacity: 1'],
        ru: ['zIndex и elevation', 'display: overlay', 'float: top', 'opacity: 1'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 29,
      question: {
        en: 'What is the return value of `Boolean("false")` in JavaScript?',
        uz: 'JavaScript-da `Boolean("false")` ifodasining natijasi nima?',
        ru: 'Каков результат выражения `Boolean("false")` в JavaScript?',
      },
      options: {
        en: ['false', 'true', 'null', 'undefined'],
        uz: ['false', 'true', 'null', 'undefined'],
        ru: ['false', 'true', 'null', 'undefined'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 30,
      question: {
        en: 'In computer science, what problem is proven undecidable by Alan Turing in 1936?',
        uz: '1936-yilda Alan Tyuring tomonidan hal qilib bo\'lmasligi isbotlangan mashhur muammo qaysi?',
        ru: 'Какая знаменитая проблема была доказана Аланом Тьюрингом как алгоритмически неразрешимая?',
      },
      options: {
        en: ['The Halting Problem', 'The Traveling Salesperson Problem', 'P vs NP Problem', 'The Dining Philosophers'],
        uz: ['To\'xtash muammosi (Halting Problem)', 'Sayohatchi savdogar muammosi', 'P vs NP muammosi', 'Tushlikdagi faylasuflar'],
        ru: ['Проблема остановки (Halting Problem)', 'Задача коммивояжера', 'Проблема P vs NP', 'Задача обедающих философов'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
  ],

  geography: [
    {
      id: 1,
      question: {
        en: 'What is the capital city of France?',
        uz: 'Fransiyaning poytaxti qaysi shahar?',
        ru: 'Какая столица Франции?',
      },
      options: {
        en: ['Lyon', 'Marseille', 'Paris', 'Nice'],
        uz: ['Lion', 'Marsel', 'Parij', 'Nitssa'],
        ru: ['Лион', 'Марсель', 'Париж', 'Ницца'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 2,
      question: {
        en: 'Which continent is the largest by land area?',
        uz: 'Maydoni bo\'yicha eng katta qit\'a qaysi?',
        ru: 'Какой континент самый большой по площади?',
      },
      options: {
        en: ['Africa', 'North America', 'Europe', 'Asia'],
        uz: ['Afrika', 'Shimoliy Amerika', 'Yevropa', 'Osiyo'],
        ru: ['Африка', 'Северная Америка', 'Европа', 'Азия'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 3,
      question: {
        en: 'Which is the longest river in the world?',
        uz: 'Dunyodagi eng uzun daryo qaysi?',
        ru: 'Какая река самая длинная в мире?',
      },
      options: {
        en: ['Nile River', 'Amazon River', 'Mississippi River', 'Yangtze River'],
        uz: ['Nil daryosi', 'Amazonka daryosi', 'Missisipi daryosi', 'Yanszi daryosi'],
        ru: ['Река Нил', 'Река Амазонка', 'Река Миссисипи', 'Река Янцзы'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 4,
      question: {
        en: 'Mount Everest is located in which mountain range?',
        uz: 'Everest cho\'qqisi qaysi tog\' tizmasida joylashgan?',
        ru: 'Гора Эверест находится в каком горном хребте?',
      },
      options: {
        en: ['Andes', 'Himalayas', 'Alps', 'Rockies'],
        uz: ['And tog\'lari', 'Gimalay tog\'lari', 'Alp tog\'lari', 'Qoyali tog\'lar'],
        ru: ['Анды', 'Гималаи', 'Альпы', 'Скалистые горы'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 5,
      question: {
        en: 'Which country has the largest population in the world?',
        uz: 'Aholisi eng ko\'p bo\'lgan davlat qaysi?',
        ru: 'Какая страна имеет самое большое население в мире?',
      },
      options: {
        en: ['United States', 'Indonesia', 'India', 'China'],
        uz: ['AQSH', 'Indoneziya', 'Hindiston', 'Xitoy'],
        ru: ['США', 'Индонезия', 'Индия', 'Китай'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 6,
      question: {
        en: 'What is the smallest country in the world by land area?',
        uz: 'Maydoni bo\'yicha dunyodagi eng kichik davlat qaysi?',
        ru: 'Какая самая маленькая страна в мире по площади?',
      },
      options: {
        en: ['Monaco', 'San Marino', 'Liechtenstein', 'Vatican City'],
        uz: ['Monako', 'San-Marino', 'Lixtenshteyn', 'Vatikan'],
        ru: ['Монако', 'Сан-Марино', 'Лихтенштейн', 'Ватикан'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 7,
      question: {
        en: 'Which city is known as the Big Apple?',
        uz: '"Katta olma" taxallusi bilan tanilgan shahar qaysi?',
        ru: 'Какой город известен как «Большое Яблоко»?',
      },
      options: {
        en: ['New York City', 'Los Angeles', 'Chicago', 'Toronto'],
        uz: ['Nyu-York', 'Los-Anjeles', 'Chikago', 'Toronto'],
        ru: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Торонто'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 8,
      question: {
        en: 'Which desert is the largest hot desert in the world?',
        uz: 'Dunyodagi eng katta issiq sahro qaysi?',
        ru: 'Какая пустыня является самой большой жаркой пустыней в мире?',
      },
      options: {
        en: ['Gobi Desert', 'Sahara Desert', 'Kalahari Desert', 'Atacama Desert'],
        uz: ['Gobi sahrosi', 'Saxara sahrosi', 'Kalahari sahrosi', 'Atakama sahrosi'],
        ru: ['Пустыня Гоби', 'Пустыня Сахара', 'Пустыня Калахари', 'Пустыня Атакама'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 9,
      question: {
        en: 'What is the capital of Japan?',
        uz: 'Yaponiyaning poytaxti qaysi shahar?',
        ru: 'Какая столица Японии?',
      },
      options: {
        en: ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'],
        uz: ['Kioto', 'Osaka', 'Tokio', 'Hirosima'],
        ru: ['Киото', 'Осака', 'Токио', 'Хиросима'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 10,
      question: {
        en: 'Which South American country is famous for the Amazon Rainforest?',
        uz: 'Amazonka o\'rmonlari asosan qaysi Janubiy Amerika davlatida joylashgan?',
        ru: 'Какая южноамериканская страна славится тропическими лесами Амазонки?',
      },
      options: {
        en: ['Argentina', 'Chile', 'Colombia', 'Brazil'],
        uz: ['Argentina', 'Chili', 'Kolumbiya', 'Braziliya'],
        ru: ['Аргентина', 'Чили', 'Колумбия', 'Бразилия'],
      },
      correctAnswer: 3,
      difficulty: 'Medium',
    },
    {
      id: 11,
      question: {
        en: 'What is the official language of Brazil?',
        uz: 'Braziliyaning rasmiy tili qaysi?',
        ru: 'Какой официальный язык Бразилии?',
      },
      options: {
        en: ['Portuguese', 'Spanish', 'French', 'English'],
        uz: ['Portugal tili', 'Ispan tili', 'Fransuz tili', 'Ingliz tili'],
        ru: ['Португальский', 'Испанский', 'Французский', 'Английский'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 12,
      question: {
        en: 'Which sea separates Europe and Africa?',
        uz: 'Yevropa va Afrikani ajratib turuvchi dengiz qaysi?',
        ru: 'Какое море разделяет Европу и Африку?',
      },
      options: {
        en: ['Red Sea', 'Mediterranean Sea', 'Black Sea', 'Baltic Sea'],
        uz: ['Qizil dengiz', 'O\'rta yer dengizi', 'Qora dengiz', 'Boltiq dengizi'],
        ru: ['Красное море', 'Средиземное море', 'Черное море', 'Балтийское море'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 13,
      question: {
        en: 'What is the capital city of Canada?',
        uz: 'Kanadaning poytaxti qaysi shahar?',
        ru: 'Какая столица Канады?',
      },
      options: {
        en: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
        uz: ['Toronto', 'Vankuver', 'Ottava', 'Monreal'],
        ru: ['Торонто', 'Ванкувер', 'Оттава', 'Монреаль'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 14,
      question: {
        en: 'Which island nation is famous for its fjords and northern lights?',
        uz: 'Shimoliy yog\'dular va fyordlari bilan tanilgan orol davlat qaysi?',
        ru: 'Какая островная страна славится своими фьордами и северным сиянием?',
      },
      options: {
        en: ['Iceland', 'New Zealand', 'Madagascar', 'Japan'],
        uz: ['Islandiya', 'Yangi Zelandiya', 'Madagaskar', 'Yaponiya'],
        ru: ['Исландия', 'Новая Зеландия', 'Мадагаскар', 'Япония'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 15,
      question: {
        en: 'Which country is shaped like a boot?',
        uz: 'Qaysi davlat xaritada etik (etikcha) shakliga ega?',
        ru: 'Какая страна по форме напоминает сапог?',
      },
      options: {
        en: ['Spain', 'Italy', 'Greece', 'Portugal'],
        uz: ['Ispaniya', 'Italiya', 'Gretsiya', 'Portugaliya'],
        ru: ['Испания', 'Италия', 'Греция', 'Португалия'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    // Geography: Hard Level (Extreme points, enclaves, obscure capitals)
    {
      id: 16,
      question: {
        en: 'What is the capital city of Kazakhstan (renamed from Nur-Sultan)?',
        uz: 'Qozog\'istonning poytaxti qaysi shahar?',
        ru: 'Какая столица Казахстана?',
      },
      options: {
        en: ['Almaty', 'Astana', 'Shymkent', 'Aktau'],
        uz: ['Almati', 'Ostona', 'Chimkent', 'Aqtau'],
        ru: ['Алматы', 'Астана', 'Шымкент', 'Актау'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 17,
      question: {
        en: 'Which African nation is completely surrounded by South Africa (an enclave)?',
        uz: 'To\'liq Janubiy Afrika Respublikasi hududi bilan o\'rab olingan anklav davlat qaysi?',
        ru: 'Какое африканское государство полностью окружено ЮАР (анклав)?',
      },
      options: {
        en: ['Swaziland (Eswatini)', 'Lesotho', 'Botswana', 'Namibia'],
        uz: ['Esvatini', 'Lesoto', 'Botsvana', 'Namibiya'],
        ru: ['Эсватини', 'Лесото', 'Ботсвана', 'Намибия'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 18,
      question: {
        en: 'What is the capital city of Mongolia?',
        uz: 'Mo\'g\'ulistonning poytaxti qaysi shahar?',
        ru: 'Какая столица Монголии?',
      },
      options: {
        en: ['Ulaanbaatar', 'Astana', 'Bishkek', 'Tashkent'],
        uz: ['Ulan-Bator', 'Ostona', 'Bishkek', 'Toshkent'],
        ru: ['Улан-Батор', 'Астана', 'Бишкек', 'Ташкент'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 19,
      question: {
        en: 'Which strait connects the Atlantic Ocean to the Mediterranean Sea?',
        uz: 'Atlantika okeanini O\'rta yer dengizi bilan bog\'laydigan bo\'g\'oz qaysi?',
        ru: 'Какой пролив соединяет Атлантический океан со Средиземным морем?',
      },
      options: {
        en: ['Bosphorus Strait', 'Strait of Gibraltar', 'Strait of Malacca', 'Bering Strait'],
        uz: ['Bosfor bo\'g\'ozi', 'Gibraltar bo\'g\'ozi', 'Malakka bo\'g\'ozi', 'Bering bo\'g\'ozi'],
        ru: ['Пролив Босфор', 'Гибралтарский пролив', 'Малаккский пролив', 'Берингов пролив'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 20,
      question: {
        en: 'What is the highest uninterrupted waterfall in the world?',
        uz: 'Dunyodagi eng baland uzluksiz tushuvchi sharshara qaysi?',
        ru: 'Какой водопад является самым высоким в мире?',
      },
      options: {
        en: ['Niagara Falls', 'Victoria Falls', 'Angel Falls', 'Iguazu Falls'],
        uz: ['Niagara sharsharasi', 'Viktoriya sharsharasi', 'Anxel sharsharasi (Angel)', 'Iguasu sharsharasi'],
        ru: ['Ниагарский водопад', 'Водопад Виктория', 'Водопад Анхель', 'Игуасу'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 21,
      question: {
        en: 'Which sea has such high salinity that swimmers float effortlessly without sinking?',
        uz: 'Sho\'rligi juda yuqori bo\'lganligi sababli odam suv yuzida bemalol cho\'kmasdan suza oladigan dengiz qaysi?',
        ru: 'Какое море имеет настолько высокую соленость, что в нем невозможно утонуть?',
      },
      options: {
        en: ['Red Sea', 'Dead Sea', 'Caspian Sea', 'Baltic Sea'],
        uz: ['Qizil dengiz', 'O\'lik dengiz', 'Kaspiy dengizi', 'Boltiq dengizi'],
        ru: ['Красное море', 'Мертвое море', 'Каспийское море', 'Балтийское море'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 22,
      question: {
        en: 'What is the only country in the world that borders both the Mediterranean Sea and the Black Sea?',
        uz: 'Dunyoda ham O\'rta yer dengizi, ham Qora dengiz bilan chegaradosh yagona davlat qaysi?',
        ru: 'Какая единственная страна в мире омывается и Средиземным, и Черным морями?',
      },
      options: {
        en: ['Greece', 'Bulgaria', 'Turkey', 'Georgia'],
        uz: ['Gretsiya', 'Bolgariya', 'Turkiya', 'Gruziya'],
        ru: ['Греция', 'Болгария', 'Турция', 'Грузия'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 23,
      question: {
        en: 'Which country has the most natural lakes in the world, containing over 60% of all global lakes?',
        uz: 'Dunyodagi barcha ko\'llarning 60% dan ortig\'iga ega bo\'lgan davlat qaysi?',
        ru: 'В какой стране мира находится больше всего озер (более 60% от всех на планете)?',
      },
      options: {
        en: ['Russia', 'Finland', 'Canada', 'United States'],
        uz: ['Rossiya', 'Finlyandiya', 'Kanada', 'AQSH'],
        ru: ['Россия', 'Финляндия', 'Канада', 'США'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 24,
      question: {
        en: 'What is the capital city of New Zealand?',
        uz: 'Yangi Zelandiyaning poytaxti qaysi shahar?',
        ru: 'Какая столица Новой Зеландии?',
      },
      options: {
        en: ['Auckland', 'Wellington', 'Christchurch', 'Queenstown'],
        uz: ['Oklend', 'Vellington', 'Kraystcherch', 'Kuinstaun'],
        ru: ['Окленд', 'Веллингтон', 'Крайстчерч', 'Куинстаун'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 25,
      question: {
        en: 'Which desert in South America is considered the driest non-polar desert on Earth?',
        uz: 'Janubiy Amerikadagi dunyoning eng qurg\'oqchil qutbsiz sahrosi qaysi?',
        ru: 'Какая пустыня в Южной Америке считается самой сухой неполярной пустыней на Земле?',
      },
      options: {
        en: ['Patagonian Desert', 'Atacama Desert', 'Sonoran Desert', 'Mojave Desert'],
        uz: ['Patagoniya sahrosi', 'Atakama sahrosi', 'Sonora sahrosi', 'Moxave sahrosi'],
        ru: ['Патагонская пустыня', 'Пустыня Атакама', 'Сонора', 'Мохаве'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 26,
      question: {
        en: 'Which two countries are doubly landlocked (surrounded solely by other landlocked countries)?',
        uz: 'Dunyoda faqat boshqa dengizga chiqish imkoni bo\'lmagan davlatlar bilan o\'ralgan ikki davlat qaysi?',
        ru: 'Какие две страны в мире окружены исключительно странами, не имеющими выхода к морю?',
      },
      options: {
        en: ['Uzbekistan & Liechtenstein', 'Mongolia & Bolivia', 'Switzerland & Austria', 'Nepal & Bhutan'],
        uz: ['O\'zbekiston va Lixtenshteyn', 'Mo\'g\'uliston va Boliviya', 'Shveysariya va Avstriya', 'Nepal va Butan'],
        ru: ['Узбекистан и Лихтенштейн', 'Монголия и Боливия', 'Швейцария и Австрия', 'Непал и Бутан'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 27,
      question: {
        en: 'What is the largest island in the world that is NOT considered a continent?',
        uz: 'Qit\'a hisoblanmaydigan dunyodagi eng katta orol qaysi?',
        ru: 'Какой остров является самым большим в мире из тех, что не считаются континентом?',
      },
      options: {
        en: ['Madagascar', 'Greenland', 'New Guinea', 'Borneo'],
        uz: ['Madagaskar', 'Grenlandiya', 'Yangi Gvineya', 'Borneo'],
        ru: ['Мадагаскар', 'Гренландия', 'Новая Гвинея', 'Борнео'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 28,
      question: {
        en: 'Which European city is built on 118 small islands separated by canals and linked by over 400 bridges?',
        uz: 'Kanallar bilan ajratilgan va 400 dan ortiq ko\'priklar bilan bog\'langan 118 ta orol ustida qurilgan shahar qaysi?',
        ru: 'Какой европейский город построен на 118 островах, разделенных каналами и соединенных мостами?',
      },
      options: {
        en: ['Amsterdam', 'Bruges', 'Venice', 'Stockholm'],
        uz: ['Amsterdam', 'Bryugge', 'Venetsiya', 'Stokgolm'],
        ru: ['Амстердам', 'Брюгге', 'Венеция', 'Стокгольм'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 29,
      question: {
        en: 'What river flows through Paris?',
        uz: 'Parij shahri bo\'ylab qaysi daryo oqadi?',
        ru: 'Какая река протекает через Париж?',
      },
      options: {
        en: ['Danube', 'Thames', 'Seine', 'Rhine'],
        uz: ['Dunay', 'Temza', 'Sena', 'Reyn'],
        ru: ['Дунай', 'Темза', 'Сена', 'Рейн'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 30,
      question: {
        en: 'What is the capital city of Iceland?',
        uz: 'Islandiyaning poytaxti qaysi shahar?',
        ru: 'Какая столица Исландии?',
      },
      options: {
        en: ['Reykjavik', 'Oslo', 'Helsinki', 'Copenhagen'],
        uz: ['Reykyavik', 'Oslo', 'Xelsinki', 'Kopengagen'],
        ru: ['Рейкьявик', 'Осло', 'Хельсинки', 'Копенгаген'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
  ],

  football: [
    {
      id: 1,
      question: {
        en: 'Which country won the FIFA World Cup in 2022?',
        uz: '2022-yilgi Jahon chempionatida qaysi terma jamoa g\'olib bo\'ldi?',
        ru: 'Какая страна выиграла чемпионат мира по футболу 2022 года?',
      },
      options: {
        en: ['France', 'Brazil', 'Argentina', 'Croatia'],
        uz: ['Fransiya', 'Braziliya', 'Argentina', 'Xorvatiya'],
        ru: ['Франция', 'Бразилия', 'Аргентина', 'Хорватия'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 2,
      question: {
        en: 'How many players are on the field for one team during a match?',
        uz: 'O\'yin davomida bitta jamoadan maydonda nechta futbolchi bo\'ladi?',
        ru: 'Сколько игроков от одной команды находится на поле во время матча?',
      },
      options: {
        en: ['10', '12', '9', '11'],
        uz: ['10', '12', '9', '11'],
        ru: ['10', '12', '9', '11'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 3,
      question: {
        en: 'Who has won the most Ballon d\'Or awards in football history?',
        uz: 'Futbol tarixida eng ko\'p "Oltin to\'p" olgan futbolchi kim?',
        ru: 'Кто выиграл больше всего наград «Золотой мяч» в истории футбола?',
      },
      options: {
        en: ['Lionel Messi', 'Cristiano Ronaldo', 'Johan Cruyff', 'Zinedine Zidane'],
        uz: ['Lionel Messi', 'Kriştianu Ronaldu', 'Yoxan Kroyff', 'Zinedin Zidan'],
        ru: ['Лионель Месси', 'Криштиану Роналду', 'Йохан Кройф', 'Зинедин Зидан'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 4,
      question: {
        en: 'Which football club is known as "The Red Devils"?',
        uz: 'Qaysi futbol klubi "Qizil iblislar" deb ataladi?',
        ru: 'Какой футбольный клуб известен как «Красные дьяволы»?',
      },
      options: {
        en: ['Liverpool', 'Manchester United', 'Arsenal', 'AC Milan'],
        uz: ['Liverpul', 'Manchestr Yunayted', 'Arsenal', 'Milan'],
        ru: ['Ливерпуль', 'Манчестер Юнайтед', 'Арсенал', 'Милан'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 5,
      question: {
        en: 'Which nation has won the most FIFA World Cup titles?',
        uz: 'Jahon chempionlik unvonini eng ko\'p qo\'lga kiritgan mamlakat qaysi?',
        ru: 'Какая страна выиграла больше всего титулов чемпионата мира по футболу?',
      },
      options: {
        en: ['Germany', 'Italy', 'Brazil', 'Argentina'],
        uz: ['Germaniya', 'Italiya', 'Braziliya', 'Argentina'],
        ru: ['Германия', 'Италия', 'Бразилия', 'Аргентина'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 6,
      question: {
        en: 'What is the standard duration of a regular football match?',
        uz: 'Futbol o\'yinining asosiy vaqti necha daqiqa davom etadi?',
        ru: 'Какова стандартная продолжительность регулярного футбольного матча?',
      },
      options: {
        en: ['80 mins', '100 mins', '120 mins', '90 mins'],
        uz: ['80 daqiqa', '100 daqiqa', '120 daqiqa', '90 daqiqa'],
        ru: ['80 минут', '100 минут', '120 минут', '90 минут'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 7,
      question: {
        en: 'Which stadium is known as the home of English national football?',
        uz: 'Angliya terma jamoasining uyi hisoblangan stadion qaysi?',
        ru: 'Какой стадион является домашним для сборной Англии по футболу?',
      },
      options: {
        en: ['Wembley Stadium', 'Old Trafford', 'Anfield', 'Camp Nou'],
        uz: ['Uembli stadioni', 'Old Trafford', 'Enfild', 'Kamp Nou'],
        ru: ['Уэмбли', 'Олд Траффорд', 'Энфилд', 'Камп Ноу'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 8,
      question: {
        en: 'Who scored the famous "Hand of God" goal in 1986?',
        uz: '1986-yildagi mashhur "Xudoning qo\'li" golini kim urgan?',
        ru: 'Кто забил знаменитый гол «Рука Бога» в 1986 году?',
      },
      options: {
        en: ['Pele', 'Diego Maradona', 'Ronaldo Nazario', 'Marco van Basten'],
        uz: ['Pele', 'Diyego Maradona', 'Ronaldo Nazario', 'Marko van Basten'],
        ru: ['Пеле', 'Диего Марадона', 'Роналдо Назарио', 'Марко ван Бастен'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 9,
      question: {
        en: 'Which club won the UEFA Champions League in 2023?',
        uz: '2023-yilda UEFA Chempionlar Ligasida qaysi klub g\'olib bo\'ldi?',
        ru: 'Какой клуб выиграл Лигу чемпионов УЕФА в 2023 году?',
      },
      options: {
        en: ['Real Madrid', 'Inter Milan', 'Manchester City', 'Bayern Munich'],
        uz: ['Real Madrid', 'Inter Milan', 'Manchestr Siti', 'Bavariya'],
        ru: ['Реал Мадрид', 'Интер Милан', 'Манчестер Сити', 'Бавария'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 10,
      question: {
        en: 'What color card is shown to immediately eject a player?',
        uz: 'Futbolchini maydondan darhol chetlatish uchun hakam qaysi rangdagi kartochkani ko\'rsatadi?',
        ru: 'Какую карточку показывает арбитр для немедленного удаления игрока?',
      },
      options: {
        en: ['Yellow Card', 'Blue Card', 'Green Card', 'Red Card'],
        uz: ['Sariq kartochka', 'Ko\'k kartochka', 'Yashil kartochka', 'Qizil kartochka'],
        ru: ['Желтая карточка', 'Синяя карточка', 'Зеленая карточка', 'Красная карточка'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 11,
      question: {
        en: 'Which country hosted the 2014 FIFA World Cup?',
        uz: '2014-yilgi FIFA Jahon chempionati qaysi mamlakatda bo\'lib o\'tgan?',
        ru: 'Какая страна принимала чемпионат мира по футболу 2014 года?',
      },
      options: {
        en: ['Brazil', 'South Africa', 'Germany', 'Russia'],
        uz: ['Braziliya', 'Janubiy Afrika', 'Germaniya', 'Rossiya'],
        ru: ['Бразилия', 'ЮАР', 'Германия', 'Россия'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 12,
      question: {
        en: 'Who is the all-time top goalscorer in Champions League history?',
        uz: 'Chempionlar Ligasi tarixidagi eng yaxshi to\'purar kim?',
        ru: 'Кто является лучшим бомбардиром в истории Лиги чемпионов?',
      },
      options: {
        en: ['Lionel Messi', 'Cristiano Ronaldo', 'Robert Lewandowski', 'Benzema'],
        uz: ['Lionel Messi', 'Kriştianu Ronaldu', 'Robert Levandovski', 'Benzema'],
        ru: ['Лионель Месси', 'Криштиану Роналду', 'Роберт Левандовский', 'Бензема'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 13,
      question: {
        en: 'Which player is nicknamed "The King of Football" (O Rei)?',
        uz: '"Futbol qiroli" taxallusiga sazovor bo\'lgan futbolchi kim?',
        ru: 'Какой игрок прозван «Королем футбола» (O Rei)?',
      },
      options: {
        en: ['Eusebio', 'Ronaldinho', 'Pele', 'Romario'],
        uz: ['Eusebio', 'Ronaldinyo', 'Pele', 'Romario'],
        ru: ['Эйсебио', 'Роналдиньо', 'Пеле', 'Ромарио'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 14,
      question: {
        en: 'Which team had an undefeated "Invincibles" EPL season in 2003-04?',
        uz: '2003-04 yillarda Angliya Premyer Ligasida mag\'lubiyatsiz chempion bo\'lgan jamoa?',
        ru: 'Какая команда прошла сезон АПЛ 2003-04 без единого поражения?',
      },
      options: {
        en: ['Chelsea', 'Manchester City', 'Tottenham', 'Arsenal'],
        uz: ['Chelsi', 'Manchestr Siti', 'Tottenxem', 'Arsenal'],
        ru: ['Челси', 'Манчестер Сити', 'Тоттенхэм', 'Арсенал'],
      },
      correctAnswer: 3,
      difficulty: 'Medium',
    },
    {
      id: 15,
      question: {
        en: 'What is the term when a player scores 3 goals in one match?',
        uz: 'Bitta o\'yinda futbolchi 3 ta gol ursa bu nima deyiladi?',
        ru: 'Как называется, когда игрок забивает 3 гола в одном матче?',
      },
      options: {
        en: ['Brace', 'Hat-trick', 'Triple', 'Grand Slam'],
        uz: ['Dubl', 'Xet-trik', 'Trepl', 'Penta-trik'],
        ru: ['Дубль', 'Хет-трик', 'Трипл', 'Пента-трик'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    // Football: Hard Level (Tactics, historical records, obscure stats)
    {
      id: 16,
      question: {
        en: 'Who is the only goalkeeper in football history to win the prestigious Ballon d\'Or?',
        uz: 'Futbol tarixida nufuzli "Oltin to\'p"ni yutgan yagona darvozabon kim?',
        ru: 'Кто единственный вратарь в истории футбола, выигравший «Золотой мяч»?',
      },
      options: {
        en: ['Gianluigi Buffon', 'Lev Yashin', 'Iker Casillas', 'Manuel Neuer'],
        uz: ['Janluiji Buffon', 'Lev Yashin', 'Iker Kasilyas', 'Manuel Noyer'],
        ru: ['Джанлуиджи Буффон', 'Лев Яшин', 'Икер Касильяс', 'Мануэль Нойер'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 17,
      question: {
        en: 'Which country won the very first FIFA World Cup tournament held in 1930?',
        uz: '1930-yilda o\'tkazilgan birinchi Jahon chempionatida qaysi terma jamoa g\'olib bo\'lgan?',
        ru: 'Какая страна выиграла самый первый чемпионат мира по футболу в 1930 году?',
      },
      options: {
        en: ['Argentina', 'Brazil', 'Uruguay', 'Italy'],
        uz: ['Argentina', 'Braziliya', 'Urugvay', 'Italiya'],
        ru: ['Аргентина', 'Бразилия', 'Уругвай', 'Италия'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 18,
      question: {
        en: 'Which Dutch tactician pioneered the revolutionary tactical philosophy known as "Total Football"?',
        uz: '"Total futbol" deb nomlanuvchi inqilobiy falsafaga asos solgan niderlandiyalik murabbiy kim?',
        ru: 'Какой нидерландский тренер стал основоположником философии «Тотального футбола»?',
      },
      options: {
        en: ['Johan Cruyff', 'Rinus Michels', 'Louis van Gaal', 'Guus Hiddink'],
        uz: ['Yoxan Kroyff', 'Rinus Mixels', 'Lui van Gal', 'Gus Xiddink'],
        ru: ['Йохан Кройф', 'Ринус Михелс', 'Луи ван Гал', 'Гус Хиддинк'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 19,
      question: {
        en: 'Who holds the record for scoring the most goals in a single calendar year (91 goals in 2012)?',
        uz: 'Bir kalendar yilida eng ko\'p gol urish bo\'yicha mutlaq rekordchi kim (2012-yilda 91 ta gol)?',
        ru: 'Кто держит рекорд по голам за один календарный год (91 гол в 2012 году)?',
      },
      options: {
        en: ['Gerd Muller', 'Cristiano Ronaldo', 'Lionel Messi', 'Robert Lewandowski'],
        uz: ['Gerd Myuller', 'Kriştianu Ronaldu', 'Lionel Messi', 'Robert Levandovski'],
        ru: ['Герд Мюллер', 'Криштиану Роналду', 'Лионель Месси', 'Роберт Левандовский'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 20,
      question: {
        en: 'Which player holds the record for the fastest hat-trick in English Premier League history (2 mins 56 secs)?',
        uz: 'Angliya Premyer Ligasida eng tezkor xet-trik muallifi kim (2 daqiqa 56 soniyada)?',
        ru: 'Кто является автором самого быстрого хет-трика в истории АПЛ (2 мин 56 сек)?',
      },
      options: {
        en: ['Sadio Mane', 'Sergio Aguero', 'Robbie Fowler', 'Erling Haaland'],
        uz: ['Sadio Mane', 'Serxio Aguero', 'Robbi Fauler', 'Erling Xoland'],
        ru: ['Садио Мане', 'Серхио Агуэро', 'Робби Фаулер', 'Эрлинг Холанд'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 21,
      question: {
        en: 'Who is the only player to have won the UEFA Champions League with three DIFFERENT clubs?',
        uz: 'Uch xil BOSHQA-BOSHQA klublar bilan Chempionlar Ligasida g\'olib chiqqan yagona futbolchi kim?',
        ru: 'Кто единственный игрок, выигравший Лигу чемпионов с тремя РАЗНЫМИ клубами?',
      },
      options: {
        en: ['Cristiano Ronaldo', 'Clarence Seedorf', 'Samuel Eto\'o', 'Zlatan Ibrahimovic'],
        uz: ['Kriştianu Ronaldu', 'Klarens Zeedorf', 'Samuyel Eto\'o', 'Zlatan Ibragimovich'],
        ru: ['Криштиану Роналду', 'Кларенс Зеедорф', 'Самюэль Это\'О', 'Златан Ибрагимович'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 22,
      question: {
        en: 'What iconic defensive system was perfected by Helenio Herrera at Inter Milan in the 1960s?',
        uz: '1960-yillarda Inter Milan safida Elenio Errera tomonidan mukammallashtirilgan himoyaviy taktika nima?',
        ru: 'Какую культовую оборонительную систему усовершенствовал Эленио Эррера в «Интере»?',
      },
      options: {
        en: ['Tiki-Taka', 'Gegenpressing', 'Catenaccio', 'WM Formation'],
        uz: ['Tiki-Taka', 'Gegenpressing', 'Katenachcho (Catenaccio)', 'WM tuzilmasi'],
        ru: ['Тики-Така', 'Гегенпрессинг', 'Катеначчо (Catenaccio)', 'Система WM'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 23,
      question: {
        en: 'Who scored the winning goal in extra time of the 2010 FIFA World Cup Final for Spain?',
        uz: '2010-yilgi Jahon chempionati finalida Ispaniyaga g\'alaba keltirgan golni kim urgan?',
        ru: 'Кто забил победный гол в дополнительное время финала ЧМ-2010 за сборную Испании?',
      },
      options: {
        en: ['Fernando Torres', 'Xavi Hernandez', 'Andres Iniesta', 'David Villa'],
        uz: ['Fernando Torres', 'Xavi', 'Andres Inyesta', 'David Vilya'],
        ru: ['Фернандо Торрес', 'Хави', 'Андрес Иньеста', 'Давид Вилья'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 24,
      question: {
        en: 'What is the record for the most goals scored by a single player in a single FIFA World Cup tournament?',
        uz: 'Bitta Jahon chempionati turnirida bitta futbolchi tomonidan urilgan eng ko\'p gol rekordi nechta (Just Fontaine)?',
        ru: 'Сколько голов составляет рекорд Жюста Фонтена на одном чемпионате мира (1958)?',
      },
      options: {
        en: ['10 goals', '13 goals', '15 goals', '11 goals'],
        uz: ['10 ta', '13 ta', '15 ta', '11 ta'],
        ru: ['10 голов', '13 голов', '15 голов', '11 голов'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 25,
      question: {
        en: 'Which club has won the most UEFA Europa League / UEFA Cup titles in history?',
        uz: 'Tarixda UEFA Yevropa Ligasi (UEFA Kubogi) kubogini eng ko\'p yutgan klub qaysi?',
        ru: 'Какой клуб выиграл больше всего титулов Лиги Европы УЕФА?',
      },
      options: {
        en: ['Liverpool', 'Inter Milan', 'Sevilla', 'Juventus'],
        uz: ['Liverpul', 'Inter Milan', 'Sevilya', 'Yuventus'],
        ru: ['Ливерпуль', 'Интер Милан', 'Севилья', 'Ювентус'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 26,
      question: {
        en: 'Which African player won the African Footballer of the Year award a record 4 times consecutively?',
        uz: 'Afrikada yilning eng yaxshi futbolchisi unvonini 4 marta ketma-ket qo\'lga kiritgan afsonaviy yarimhimoyachi kim?',
        ru: 'Какой африканский игрок выиграл награду «Футболист года в Африке» 4 раза подряд?',
      },
      options: {
        en: ['Didier Drogba', 'Samuel Eto\'o', 'Yaya Toure', 'Mohamed Salah'],
        uz: ['Didye Drogba', 'Samuyel Eto\'o', 'Yaya Ture', 'Muhammad Saloh'],
        ru: ['Дидье Дрогба', 'Самюэль Это\'О', 'Яя Туре', 'Мохамед Салах'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 27,
      question: {
        en: 'Which player is the youngest goalscorer in FIFA World Cup history (aged 17 years and 239 days in 1958)?',
        uz: 'Jahon chempionatlari tarixidagi eng yosh gol muallifi kim (17 yoshu 239 kun)?',
        ru: 'Кто является самым молодым автором гола в истории чемпионатов мира?',
      },
      options: {
        en: ['Kylian Mbappe', 'Pele', 'Michael Owen', 'Lionel Messi'],
        uz: ['Kilian Mbappe', 'Pele', 'Maykl Ouen', 'Lionel Messi'],
        ru: ['Килиан Мбаппе', 'Пеле', 'Майкл Оуэн', 'Лионель Месси'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 28,
      question: {
        en: 'In which year was the first UEFA European Championship (Euros) held, won by the Soviet Union?',
        uz: 'SSSR g\'olib bo\'lgan birinchi Yevropa Chempionati (Yevro) qaysi yili o\'tkazilgan?',
        ru: 'В каком году прошел первый чемпионат Европы по футболу (Евро)?',
      },
      options: {
        en: ['1956', '1960', '1964', '1952'],
        uz: ['1956', '1960', '1964', '1952'],
        ru: ['1956', '1960', '1964', '1952'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 29,
      question: {
        en: 'Who was the manager of Leicester City when they won the miracle Premier League title in 2015-16?',
        uz: '2015-16 yillarda Lester Siti mo\'jizaviy chempion bo\'lganida ularning bosh murabbiyi kim edi?',
        ru: 'Кто был главным тренером «Лестера», когда они выиграли АПЛ в сезоне 2015-16?',
      },
      options: {
        en: ['Claudio Ranieri', 'Nigel Pearson', 'Brendan Rodgers', 'Roberto Mancini'],
        uz: ['Klaudio Raneri', 'Nayjel Pirson', 'Brendan Rodjers', 'Roberto Manchini'],
        ru: ['Клаудио Раньери', 'Найджел Пирсон', 'Брендан Роджерс', 'Роберто Манчини'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 30,
      question: {
        en: 'Which Italian club was relegated to Serie B following the infamous Calciopoli scandal in 2006?',
        uz: '2006-yilgi mashhur "Kalchopoli" mojarosi natijasida qaysi klub B Seriyaga tushirib yuborilgan?',
        ru: 'Какой итальянский клуб был отправлен в Серию B после скандала Кальчополи в 2006 году?',
      },
      options: {
        en: ['AC Milan', 'Juventus', 'Lazio', 'Fiorentina'],
        uz: ['Milan', 'Yuventus', 'Latsio', 'Fiorentina'],
        ru: ['Милан', 'Ювентус', 'Лацио', 'Фиорентина'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
  ],

  science: [
    {
      id: 1,
      question: {
        en: 'What is the boiling point of water at standard sea level in Celsius?',
        uz: 'Suvning standart bosimda qaynash harorati necha daraja Selsiy?',
        ru: 'Какова температура кипения воды при стандартном давлении в градусах Цельсия?',
      },
      options: {
        en: ['90°C', '100°C', '120°C', '80°C'],
        uz: ['90°C', '100°C', '120°C', '80°C'],
        ru: ['90°C', '100°C', '120°C', '80°C'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 2,
      question: {
        en: 'What organ in the human body filters waste from the blood?',
        uz: 'Inson organizmida qonni tozaydigan va filtrlaydigan a\'zo qaysi?',
        ru: 'Какой орган в организме человека фильтрует кровь?',
      },
      options: {
        en: ['Heart', 'Lungs', 'Kidneys', 'Liver'],
        uz: ['Yurak', 'O\'pka', 'Buyraklar', 'Jigar'],
        ru: ['Сердце', 'Легкие', 'Почки', 'Печень'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 3,
      question: {
        en: 'What is known as the powerhouse organelle of the cell?',
        uz: 'Hujayraning "energiya stansiyasi" deb nimaga aytiladi?',
        ru: 'Что называют «энергетической станцией» клетки?',
      },
      options: {
        en: ['Nucleus', 'Ribosome', 'Endoplasmic Reticulum', 'Mitochondria'],
        uz: ['Yadro', 'Ribosoma', 'Endoplazmatik to\'r', 'Mitoxondriya'],
        ru: ['Ядро', 'Рибосома', 'Эндоплазматическая сеть', 'Митохондрия'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 4,
      question: {
        en: 'What force keeps planets in orbit around the Sun?',
        uz: 'Sayyoralarni Quyosh atrofida ushlab turuvchi kuch qaysi?',
        ru: 'Какая сила удерживает планеты на орбите вокруг Солнца?',
      },
      options: {
        en: ['Gravity', 'Magnetism', 'Friction', 'Nuclear Force'],
        uz: ['Tortishish kuchi (Gravitatsiya)', 'Magnetizm', 'Ishqalanish', 'Yadro kuchi'],
        ru: ['Гравитация', 'Магнетизм', 'Трение', 'Ядерная сила'],
      },
      correctAnswer: 0,
      difficulty: 'Easy',
    },
    {
      id: 5,
      question: {
        en: 'What is the chemical formula for pure water?',
        uz: 'Sof suvning kimyoviy formulasi nima?',
        ru: 'Какова химическая формула чистой воды?',
      },
      options: {
        en: ['CO2', 'H2O', 'NaCl', 'O2'],
        uz: ['CO2', 'H2O', 'NaCl', 'O2'],
        ru: ['CO2', 'H2O', 'NaCl', 'O2'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 6,
      question: {
        en: 'Which planet is closest to the Sun?',
        uz: 'Quyoshga eng yaqin joylashgan sayyora qaysi?',
        ru: 'Какая планета находится ближе всего к Солнцу?',
      },
      options: {
        en: ['Venus', 'Earth', 'Mercury', 'Mars'],
        uz: ['Venera', 'Yer', 'Merkuriy', 'Mars'],
        ru: ['Венера', 'Земля', 'Меркурий', 'Марс'],
      },
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 7,
      question: {
        en: 'What gas do plants absorb during photosynthesis?',
        uz: 'O\'simliklar fotosintez jarayonida qaysi gazni yutadi?',
        ru: 'Какой газ поглощают растения в процессе фотосинтеза?',
      },
      options: {
        en: ['Oxygen', 'Nitrogen', 'Helium', 'Carbon Dioxide'],
        uz: ['Kislorod', 'Azot', 'Geliy', 'Uglerod dioksidi (Karbonat)'],
        ru: ['Кислород', 'Азот', 'Гелий', 'Углекислый газ'],
      },
      correctAnswer: 3,
      difficulty: 'Easy',
    },
    {
      id: 8,
      question: {
        en: 'What is the approximate speed of light in a vacuum?',
        uz: 'Vakuumda yorug\'lik tezligi taxminan necha km/s?',
        ru: 'Какова примерная скорость света в вакууме?',
      },
      options: {
        en: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '3,000 km/s'],
        uz: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '3,000 km/s'],
        ru: ['300,000 км/с', '150,000 км/с', '1,000,000 км/с', '3,000 км/с'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 9,
      question: {
        en: 'Which subatomic particle carries a negative charge?',
        uz: 'Qaysi zarracha manfiy zaryadga ega?',
        ru: 'Какая элементарная частица имеет отрицательный заряд?',
      },
      options: {
        en: ['Proton', 'Electron', 'Neutron', 'Photon'],
        uz: ['Proton', 'Elektron', 'Neytron', 'Foton'],
        ru: ['Протон', 'Электрон', 'Нейтрон', 'Фотон'],
      },
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 10,
      question: {
        en: 'What is the primary gas found inside our Sun?',
        uz: 'Quyosh tarkibidagi asosiy gaz qaysi?',
        ru: 'Какой основной газ составляет наше Солнце?',
      },
      options: {
        en: ['Oxygen', 'Nitrogen', 'Hydrogen', 'Methane'],
        uz: ['Kislorod', 'Azot', 'Vodorod', 'Metan'],
        ru: ['Кислород', 'Азот', 'Водород', 'Метан'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 11,
      question: {
        en: 'What unit is used to measure electrical resistance?',
        uz: 'Elektr qarshiligini o\'lchash birligi nima?',
        ru: 'Какая единица используется для измерения электрического сопротивления?',
      },
      options: {
        en: ['Volt', 'Ampere', 'Watt', 'Ohm'],
        uz: ['Volt', 'Amper', 'Vatt', 'Om'],
        ru: ['Вольт', 'Ампер', 'Ватт', 'Ом'],
      },
      correctAnswer: 3,
      difficulty: 'Medium',
    },
    {
      id: 12,
      question: {
        en: 'What metal is liquid at standard room temperature?',
        uz: 'Xona haroratida suyuq holatda bo\'ladigan metall qaysi?',
        ru: 'Какой металл является жидким при комнатной температуре?',
      },
      options: {
        en: ['Mercury', 'Lead', 'Aluminum', 'Iron'],
        uz: ['Simob', 'Qo\'rg\'oshin', 'Alyuminiy', 'Temir'],
        ru: ['Ртуть', 'Свинец', 'Алюминий', 'Железо'],
      },
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 13,
      question: {
        en: 'What is the largest internal organ in the human body?',
        uz: 'Inson tanasidagi eng katta ichki a\'zo qaysi?',
        ru: 'Какой самый крупный внутренний орган у человека?',
      },
      options: {
        en: ['Brain', 'Liver', 'Heart', 'Stomach'],
        uz: ['Bosh miya', 'Jigar', 'Yurak', 'Oshqozon'],
        ru: ['Мозг', 'Печень', 'Сердце', 'Желудок'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 14,
      question: {
        en: 'Who proposed the famous Theory of Relativity?',
        uz: 'Nisbiylik nazariyasini kim kashf etgan?',
        ru: 'Кто сформулировал теорию относительности?',
      },
      options: {
        en: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Niels Bohr'],
        uz: ['Isaak Nyuton', 'Galileo Galiley', 'Albert Eynshteyn', 'Nils Bor'],
        ru: ['Исаак Ньютон', 'Галилео Галилей', 'Альберт Эйнштейн', 'Нильс Бор'],
      },
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 15,
      question: {
        en: 'What pH value represents a neutral solution like pure water?',
        uz: 'Sof suvning neytral pH qiymati nechaga teng?',
        ru: 'Какое значение pH соответствует нейтральному раствору?',
      },
      options: {
        en: ['0', '14', '5', '7'],
        uz: ['0', '14', '5', '7'],
        ru: ['0', '14', '5', '7'],
      },
      correctAnswer: 3,
      difficulty: 'Medium',
    },
    // Science: Hard Level (Quantum mechanics, biochemistry, relativity, particle physics)
    {
      id: 16,
      question: {
        en: 'What fundamental particle provides mass to other elementary particles via its quantum field?',
        uz: 'Kvant maydoni orqali boshqa elementar zarrachalarga massa beruvchi fundamental bozon qaysi?',
        ru: 'Какая элементарная частица наделяет массой другие частицы через квантовое поле?',
      },
      options: {
        en: ['Higgs Boson', 'Gluon', 'Graviton', 'Muon'],
        uz: ['Xiggs bozoni (Higgs Boson)', 'Glyuon', 'Graviton', 'Myuon'],
        ru: ['Бозон Хиггса', 'Глюон', 'Гравитон', 'Мюон'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 17,
      question: {
        en: 'What is the theoretical boundary around a black hole beyond which nothing can escape?',
        uz: 'Qora tuynuk atrofidagi hech narsa undan qochib qutula olmaydigan chegaraviy chegara nima?',
        ru: 'Какая граница вокруг черной дыры не позволяет ничему вырваться наружу?',
      },
      options: {
        en: ['Ergosphere', 'Photon Sphere', 'Event Horizon', 'Singularity'],
        uz: ['Ergosfera', 'Foton sferasi', 'Hodisalar gorizonti (Event Horizon)', 'Singulyarlik'],
        ru: ['Эргосфера', 'Фотонная сфера', 'Горизонт событий', 'Сингулярность'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 18,
      question: {
        en: 'In molecular biology, which enzyme is responsible for synthesizing mRNA from a DNA template during transcription?',
        uz: 'DNK andozasidan mRNK sintez qiluvchi asosiy ferment qaysi?',
        ru: 'Какой фермент синтезирует мРНК с матрицы ДНК в процессе транскрипции?',
      },
      options: {
        en: ['DNA Polymerase', 'RNA Polymerase', 'Helicase', 'Ligase'],
        uz: ['DNK Polimeraza', 'RNK Polimeraza', 'Xelikaza', 'Ligaza'],
        ru: ['ДНК-полимераза', 'РНК-полимераза', 'Хеликаза', 'Лигаза'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 19,
      question: {
        en: 'What principle of quantum mechanics states that position and momentum cannot both be precisely known simultaneously?',
        uz: 'Zarrachaning o\'rni va impulsini bir vaqtning o\'zida aniq bilib bo\'lmasligini bildiruvchi kvant qoidasi qaysi?',
        ru: 'Какой принцип квантовой механики гласит, что невозможно одновременно точно измерить координату и импульс?',
      },
      options: {
        en: ['Pauli Exclusion Principle', 'Heisenberg Uncertainty Principle', 'Schrodinger Wave Equation', 'Planck Postulate'],
        uz: ['Pauli prinsipi', 'Geyzenberg noaniqlik prinsipi', 'Shryodinger tenglamasi', 'Plank postulati'],
        ru: ['Принцип Паули', 'Принцип неопределенности Гейзенберга', 'Уравнение Шрёдингера', 'Постулат Планка'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 20,
      question: {
        en: 'What is the absolute zero temperature in degrees Celsius (theoretical point of zero thermal kinetic energy)?',
        uz: 'Termodinamikada mutlaq nol (absolute zero) harorat Selsiy shkalasida nechaga teng?',
        ru: 'Какова температура абсолютного нуля в градусах Цельсия?',
      },
      options: {
        en: ['-273.15°C', '-300.00°C', '-212.50°C', '-100.00°C'],
        uz: ['-273.15°C', '-300.00°C', '-212.50°C', '-100.00°C'],
        ru: ['-273.15°C', '-300.00°C', '-212.50°C', '-100.00°C'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 21,
      question: {
        en: 'Which of the following is NOT one of the four fundamental forces of nature?',
        uz: 'Quyidagilardan qaysi biri tabiatning to\'rtta fundamental kuchlariga kirmaydi?',
        ru: 'Какая из перечисленных сил НЕ входит в четыре фундаментальных взаимодействия природы?',
      },
      options: {
        en: ['Gravitational Force', 'Electromagnetic Force', 'Centrifugal Force', 'Strong Nuclear Force'],
        uz: ['Gravitatsiya kuchi', 'Elektromagnit kuch', 'Markazdan qochma kuch', 'Kuchli yadroviy ta\'sir'],
        ru: ['Гравитационное', 'Электромагнитное', 'Центробежная сила', 'Сильное ядерное'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 22,
      question: {
        en: 'Which blood type is considered the universal red blood cell donor in transfusions?',
        uz: 'Qaysi qon guruhi universal qon donor guruhi hisoblanadi (O manfiy)?',
        ru: 'Какая группа крови является универсальным донором для переливания?',
      },
      options: {
        en: ['AB positive (AB+)', 'O negative (O-)', 'A positive (A+)', 'B negative (B-)'],
        uz: ['AB musbat (AB+)', 'O manfiy (O-)', 'A musbat (A+)', 'B manfiy (B-)'],
        ru: ['AB положительная (AB+)', 'O отрицательная (O-)', 'A положительная (A+)', 'B отрицательная (B-)'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 23,
      question: {
        en: 'What is the most abundant chemical element in the observable universe by mass?',
        uz: 'Kuzatiladigan butun koinotda massasi bo\'yicha eng ko\'p tarqalgan kimyoviy element qaysi?',
        ru: 'Какой химический элемент является самым распространенным во Вселенной по массе?',
      },
      options: {
        en: ['Helium', 'Carbon', 'Hydrogen', 'Oxygen'],
        uz: ['Geliy', 'Uglerod', 'Vodorod', 'Kislorod'],
        ru: ['Гелий', 'Углерод', 'Водород', 'Кислород'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 24,
      question: {
        en: 'In human cellular respiration, in which organelle cycle is the majority of ATP generated (chemiosmosis)?',
        uz: 'Inson hujayrasida nafas olish davrida ATP energiyasining eng ko\'p qismi qaysi jarayonda hosil bo\'ladi?',
        ru: 'В каком цикле дыхания клетки вырабатывается наибольшее количество АТФ?',
      },
      options: {
        en: ['Glycolysis', 'Electron Transport Chain (Oxidative Phosphorylation)', 'Fermentation', 'Calvin Cycle'],
        uz: ['Glikoliz', 'Elektron tashish zanjiri (Oksidlovchi fosforillanish)', 'Bijg\'ish', 'Kalvin sikli'],
        ru: ['Гликолиз', 'Электронно-транспортная цепь (Окислительное фосфорилирование)', 'Брожение', 'Цикл Кальвина'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 25,
      question: {
        en: 'What is the approximate half-life of Carbon-14 used in radiometric dating?',
        uz: 'Radiouglerod usulida qadimgi topilmalarni aniqlashda ishlatiladigan Uglerod-14 ning yarim yemirilish davri qancha?',
        ru: 'Каков период полураспада изотопа углерода-14, используемого в радиоуглеродном анализе?',
      },
      options: {
        en: ['5,730 years', '1,200 years', '25,000 years', '100,000 years'],
        uz: ['5,730 yil', '1,200 yil', '25,000 yil', '100,000 yil'],
        ru: ['5 730 лет', '1 200 лет', '25 000 лет', '100 000 лет'],
      },
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 26,
      question: {
        en: 'What mathematical equation describes Einstein\'s mass-energy equivalence?',
        uz: 'Eynshteynning massa va energiya ekvivalentligini ifodalovchi mashhur tenglamasi nima?',
        ru: 'Какая формула описывает эквивалентность массы и энергии Эйнштейна?',
      },
      options: {
        en: ['F = ma', 'E = mc²', 'PV = nRT', 'a² + b² = c²'],
        uz: ['F = ma', 'E = mc²', 'PV = nRT', 'a² + b² = c²'],
        ru: ['F = ma', 'E = mc²', 'PV = nRT', 'a² + b² = c²'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 27,
      question: {
        en: 'Which noble gas has the lowest boiling point of any element (-268.9°C)?',
        uz: 'Barcha elementlar ichida eng past qaynash haroratiga (-268.9°C) ega bo\'lgan inert gaz qaysi?',
        ru: 'Какой благородный газ имеет самую низкую температуру кипения среди всех элементов?',
      },
      options: {
        en: ['Neon', 'Argon', 'Helium', 'Xenon'],
        uz: ['Neon', 'Argon', 'Geliy', 'Ksenon'],
        ru: ['Неон', 'Аргон', 'Гелий', 'Ксенон'],
      },
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 28,
      question: {
        en: 'What type of eclipse occurs when the Moon passes directly between the Earth and the Sun?',
        uz: 'Oy to\'g\'ridan-to\'g\'ri Yer va Quyosh o\'rtasidan o\'tib quyosh nurini to\'sganda qanday tutilish sodir bo\'ladi?',
        ru: 'Какое затмение происходит, когда Луна проходит прямо между Землей и Солнцем?',
      },
      options: {
        en: ['Lunar Eclipse', 'Solar Eclipse', 'Penumbral Eclipse', 'Annular Corona'],
        uz: ['Oy tutilishi', 'Quyosh tutilishi', 'Yarim soyali tutilish', 'Halqasimon toj'],
        ru: ['Лунное затмение', 'Солнечное затмение', 'Полутеневое затмение', 'Кольцевая корона'],
      },
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 29,
      question: {
        en: 'What is the powerhouse organ in the human endocrine system often called the "Master Gland"?',
        uz: 'Inson endokrin tizimidagi barcha boshqa bezlarni boshqaruvchi "Asosiy bez" (Master gland) qaysi?',
        ru: 'Какая железа в эндокринной системе человека часто называется «Главной железой»?',
      },
      options: {
        en: ['Thyroid Gland', 'Pituitary Gland', 'Adrenal Gland', 'Pancreas'],
        uz: ['Qalqonsimon bez', 'Gipofiz bezi (Pituitary)', 'Buyrak usti bezi', 'Oshqozon osti bezi'],
        ru: ['Щитовидная железа', 'Гипофиз', 'Надпочечники', 'Поджелудочная железа'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 30,
      question: {
        en: 'What is the name of the nearest major spiral galaxy to our Milky Way?',
        uz: 'Somon yo\'li galaktikamizga eng yaqin joylashgan yirik spiral galaktika qaysi?',
        ru: 'Как называется ближайшая к нашему Млечному Пути крупная спиральная галактика?',
      },
      options: {
        en: ['Triangulum Galaxy', 'Andromeda Galaxy (M31)', 'Large Magellanic Cloud', 'Sombrero Galaxy'],
        uz: ['Uchburchak galaktikasi', 'Andromeda galaktikasi (M31)', 'Katta Magellan buluti', 'Sombrero galaktikasi'],
        ru: ['Галактика Треугольника', 'Галактика Андромеды (M31)', 'Большое Магелланово Облако', 'Галактика Сомбреро'],
      },
      correctAnswer: 1,
      difficulty: 'Hard',
    },
  ],
};
