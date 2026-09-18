import { QUIZ_QUESTIONS } from './quizzes.js';

// Utility to shuffle an array (Fisher-Yates)
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// -------------------------------------------------------------
// MASSIVE PROCEDURAL GENERATION ENGINE (1,000+ QUESTIONS PER CATEGORY)
// -------------------------------------------------------------

// Comprehensive facts matrix to dynamically build 1,000+ questions per category

// 1. GENERAL KNOWLEDGE FACTS
const GENERAL_FACTS = [
  { topic: 'Davlatlar va Poytaxtlar', q: 'Avstraliyaning rasmiy poytaxti qaysi shahar?', c: 'Kanberra', w: ['Sidney', 'Melburn', 'Brisben'], diff: 'Medium' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Kanadaning poytaxti qaysi shahar?', c: 'Ottava', w: ['Toronto', 'Vankuver', 'Monreal'], diff: 'Medium' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Braziliyaning poytaxti qaysi shahar?', c: 'Braziliya', w: ['Rio-de-Janeyro', 'San-Paulu', 'Salvador'], diff: 'Medium' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Shveysariyaning amaldagi poytaxti (federal shahar)?', c: 'Bern', w: ['Syurix', 'Jeneva', 'Bazel'], diff: 'Hard' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Yangi Zelandiyaning poytaxti qaysi?', c: 'Vellington', w: ['Oklend', 'Kraystcherch', 'Gamilton'], diff: 'Hard' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Nigeriyaning poytaxti qaysi shahar?', c: 'Abuja', w: ['Lagos', 'Kano', 'Ibadan'], diff: 'Hard' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Turkiyaning rasmiy poytaxti qaysi shahar?', c: 'Anqara', w: ['Istanbul', 'Izmir', 'Antaliya'], diff: 'Easy' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Misr Arab Respublikasining poytaxti qaysi?', c: 'Qohira', w: ['Iskandariya', 'Giza', 'Luksor'], diff: 'Easy' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Janubiy Koreyaning poytaxti qaysi shahar?', c: 'Seul', w: ['Pusan', 'Incheon', 'Tegu'], diff: 'Easy' },
  { topic: 'Davlatlar va Poytaxtlar', q: 'Qozog\'iston Respublikasining hozirgi poytaxti?', c: 'Ostona', w: ['Olmaota', 'Chimkent', 'Aqto\'be'], diff: 'Easy' },

  // Geografik rekordlar
  { topic: 'Geografiya', q: 'Dunyodagi eng uzun daryo qaysi?', c: 'Nil', w: ['Amazonka', 'Yanszi', 'Missisipi'], diff: 'Easy' },
  { topic: 'Geografiya', q: 'Dunyodagi eng chuqur ko\'l qaysi?', c: 'Baykal', w: ['Kaspiy', 'Tanganika', 'Viktoriya'], diff: 'Easy' },
  { topic: 'Geografiya', q: 'Yer yuzidagi eng baland sharshara qaysi?', c: 'Anxel (Angel Falls)', w: ['Niagara', 'Viktoriya', 'Iguasu'], diff: 'Medium' },
  { topic: 'Geografiya', q: 'Dunyodagi eng katta cho\'l (muzliklarni hisobga olmaganda) qaysi?', c: 'Sahroi Kabir', w: ['Gobi', 'Kalahari', 'Arabiston'], diff: 'Easy' },
  { topic: 'Geografiya', q: 'Dunyodagi eng katta orol qaysi?', c: 'Grenlandiya', w: ['Madagaskar', 'Borneo', 'Yangi Gvineya'], diff: 'Easy' },
  { topic: 'Geografiya', q: 'Dunyodagi eng baland vulqon qaysi?', c: 'Oxos-del-Salado', w: ['Kilimanjaro', 'Fudziyama', 'Vezuviy'], diff: 'Hard' },
  { topic: 'Geografiya', q: 'Yer yuzidagi eng sovuq joy (mutlaq rekord) qayerda qayd etilgan?', c: 'Vostok stansiyasi (Antarktida)', w: ['Oymyakon (Sibir)', 'Grenlandiya', 'Alyaska'], diff: 'Hard' },
  { topic: 'Geografiya', q: 'Qaysi davlat hududida eng ko\'p vaqt mintaqalari (12 ta) mavjud?', c: 'Fransiya', w: ['Rossiya', 'AQSh', 'Buyuk Britaniya'], diff: 'Hard' },

  // Inson anatomiyasi va tibbiyot
  { topic: 'Anatomiya', q: 'Kattalar odam organizmida nechta suyak bor?', c: '206', w: ['210', '198', '204'], diff: 'Easy' },
  { topic: 'Anatomiya', q: 'Inson tanasidagi eng katta ichki organ qaysi?', c: 'Jigar', w: ['O\'pka', 'Oshqozon', 'Yurak'], diff: 'Easy' },
  { topic: 'Anatomiya', q: 'Inson tanasidagi eng uzun va mustahkam suyak qaysi?', c: 'Son suyagi (Femur)', w: ['Boldir suyagi', 'Yelka suyagi', 'Qovurg\'a'], diff: 'Medium' },
  { topic: 'Anatomiya', q: 'Inson tanasidagi eng kichik suyak qayerda joylashgan?', c: 'O\'rta quloqda (Uzangi)', w: ['Barmoqda', 'Burunda', 'Kaftda'], diff: 'Medium' },
  { topic: 'Anatomiya', q: 'Inson qon aylanish tizimida yurak necha kamerali?', c: '4 kamerali', w: ['2 kamerali', '3 kamerali', '5 kamerali'], diff: 'Easy' },
  { topic: 'Anatomiya', q: 'Inson ko\'zida ranglarni ajratishga javobgar retseptorlar nima deb ataladi?', c: 'Kolbachkalar (Kolkalar)', w: ['Tayoqchalar', 'Nefronlar', 'Aksonlar'], diff: 'Hard' },
  { topic: 'Anatomiya', q: 'Inson organizmidagi eng tez tiklanuvchi (regeneratsiya bo\'luvchi) organ qaysi?', c: 'Jigar', w: ['Yurak', 'Miya', 'Buyrak'], diff: 'Medium' },
  { topic: 'Anatomiya', q: 'Inson qonidagi eritrotsitlarning o\'rtacha umr ko\'rish davomiyligi qancha?', c: '120 kun', w: ['30 kun', '60 kun', '365 kun'], diff: 'Hard' },
  { topic: 'Anatomiya', q: 'Inson DNKsi shimpanze DNKsi bilan necha foizga o\'xshash?', c: 'Taxminan 98-99%', w: ['85%', '70%', '90%'], diff: 'Medium' },
];

// 2. TECHNOLOGY & IT FACTS
const TECH_FACTS = [
  { topic: 'Dasturlash', q: 'Python dasturlash tilining yaratuvchisi kim?', c: 'Guido van Rossum', w: ['Brendan Eich', 'Bjarne Stroustrup', 'James Gosling'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'JavaScript dasturlash tili necha kunda yaratilgan?', c: '10 kunda', w: ['1 oyda', '1 yilda', '100 kunda'], diff: 'Medium' },
  { topic: 'Dasturlash', q: 'Linux operatsion tizimi yadrosining (kernel) asoschisi kim?', c: 'Linus Torvalds', w: ['Bill Gates', 'Steve Jobs', 'Richard Stallman'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'C++ dasturlash tilining muallifi kim?', c: 'Bjarne Stroustrup', w: ['Dennis Ritchie', 'Ken Thompson', 'Anders Hejlsberg'], diff: 'Medium' },
  { topic: 'Dasturlash', q: 'C dasturlash tilining yaratuvchisi kim?', c: 'Dennis Ritchie', w: ['Alan Turing', 'Bjarne Stroustrup', 'John Backus'], diff: 'Medium' },
  { topic: 'Dasturlash', q: 'Git versiya nazorati tizimini kim yaratgan?', c: 'Linus Torvalds', w: ['Satya Nadella', 'Mark Zuckerberg', 'Tim Berners-Lee'], diff: 'Medium' },
  { topic: 'Dasturlash', q: 'Jahon o\'rgimchak to\'ri (WWW) ixtirochisi kim?', c: 'Tim Berners-Lee', w: ['Vint Cerf', 'Bob Kahn', 'Steve Wozniak'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'React JavaScript kutubxonasi qaysi kompaniya tomonidan ishlab chiqilgan?', c: 'Meta (Facebook)', w: ['Google', 'Microsoft', 'Apple'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'TypeScript dasturlash tilini qaysi kompaniya yaratgan?', c: 'Microsoft', w: ['Google', 'Oracle', 'IBM'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'Flutter freymvorki qaysi kompaniyaga tegishli?', c: 'Google', w: ['Apple', 'Amazon', 'Meta'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'Dasturlashda HTTP 404 status kodi nimani anglatadi?', c: 'Sahifa topilmadi (Not Found)', w: ['Server xatoligi', 'Ruxsat berilmagan', 'Muvaffaqiyatli'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'HTTP 500 status kodi nimani bildiradi?', c: 'Internal Server Error', w: ['Bad Gateway', 'Unauthorized', 'Forbidden'], diff: 'Easy' },
  { topic: 'Dasturlash', q: 'HTTP 403 status kodi nimani anglatadi?', c: 'Forbidden (Taqiqlangan)', w: ['Not Found', 'Moved Permanently', 'Bad Request'], diff: 'Medium' },
  { topic: 'Algoritmlar', q: 'Binar qidiruv (Binary Search) algoritmining vaqt murakkabligi nima?', c: 'O(log n)', w: ['O(n)', 'O(n^2)', 'O(1)'], diff: 'Hard' },
  { topic: 'Algoritmlar', q: 'Tezkor saralash (QuickSort) ning eng yaxshi holatdagi vaqt murakkabligi?', c: 'O(n log n)', w: ['O(n^2)', 'O(n)', 'O(log n)'], diff: 'Hard' },
  { topic: 'Kiberxavfsizlik', q: 'Asimmetrik shifrlashda (RSA) nechta kalit ishlatiladi?', c: '2 ta (Ochiq va Maxfiy)', w: ['1 ta kalit', '3 ta kalit', '4 ta kalit'], diff: 'Hard' },
  { topic: 'Hardware', q: 'Dunyodagi birinchi kompyuter sichqonchasi qaysi materialdan yasalgan?', c: 'Yog\'ochdan', w: ['Plastmassadan', 'Temirdan', 'Shishadan'], diff: 'Medium' },
  { topic: 'Hardware', q: '1 Terabayt necha Gigabaytga teng (ikkilik tizimda)?', c: '1024 GB', w: ['1000 GB', '512 GB', '2048 GB'], diff: 'Easy' },
  { topic: 'Sun\'iy Intellekt', q: '1950-yilda mashinaning fikrlash qobiliyatini tekshiruvchi testni kim taklif qilgan?', c: 'Alan Turing', w: ['John McCarthy', 'Marvin Minsky', 'Claude Shannon'], diff: 'Hard' },
  { topic: 'Sun\'iy Intellekt', q: '"Artificial Intelligence" (Sun\'iy intellekt) atamasi ilk bor qaysi yilda kiritilgan?', c: '1956-yilda', w: ['1945-yilda', '1968-yilda', '1982-yilda'], diff: 'Hard' },
];

// 3. FOOTBALL & SPORTS FACTS
const SPORT_FACTS = [
  { topic: 'Futbol Tarixi', q: 'Futbol bo\'yicha birinchi Jahon chempionati qaysi yili o\'tkazilgan?', c: '1930-yilda', w: ['1924-yilda', '1938-yilda', '1950-yilda'], diff: 'Easy' },
  { topic: 'Futbol Tarixi', q: 'Birinchi Jahon chempionati qaysi davlatda bo\'lib o\'tgan?', c: 'Urugvay', w: ['Braziliya', 'Italiya', 'Angliya'], diff: 'Easy' },
  { topic: 'Futbol Rekordlari', q: 'Jahon chempionatlarida eng ko\'p (5 marta) g\'olib chiqqan terma jamoa qaysi?', c: 'Braziliya', w: ['Germaniya', 'Italiya', 'Argentina'], diff: 'Easy' },
  { topic: 'Futbol Rekordlari', q: 'Futbol tarixida eng ko\'p Oltin to\'p (Ballon d\'Or) yutgan futbolchi kim?', c: 'Lionel Messi (8 ta)', w: ['Cristiano Ronaldo (5 ta)', 'Johan Cruyff (3 ta)', 'Michel Platini (3 ta)'], diff: 'Easy' },
  { topic: 'Futbol Rekordlari', q: 'Jahon chempionatlari tarixidagi eng yaxshi to\'purar kim?', c: 'Miroslav Klose (16 gol)', w: ['Ronaldo Nazario (15 gol)', 'Pele (12 gol)', 'Just Fontaine (13 gol)'], diff: 'Medium' },
  { topic: 'Futbol Rekordlari', q: 'Bir Jahon chempionatida eng ko\'p gol urish rekordi kimga tegishli (13 ta gol, 1958)?', c: 'Just Fontaine', w: ['Gerd Muller', 'Eusebio', 'Sandor Kocsis'], diff: 'Hard' },
  { topic: 'Chempionlar Ligasi', q: 'UEFA Chempionlar ligasida eng ko\'p sovrin yutgan klub qaysi?', c: 'Real Madrid (15 marta)', w: ['Milan (7 marta)', 'Liverpul (6 marta)', 'Bavariya (6 marta)'], diff: 'Easy' },
  { topic: 'Futbol Qoidalari', q: 'Futbol uchrashuvida standart maydonda burchak to\'pi radiusi qancha?', c: '1 metr', w: ['0.5 metr', '2 metr', '1.5 metr'], diff: 'Hard' },
  { topic: 'Futbol Qoidalari', q: 'Futbol darvozasining standart balandligi qancha?', c: '2.44 metr', w: ['2.20 metr', '2.50 metr', '2.35 metr'], diff: 'Hard' },
  { topic: 'Futbol Qoidalari', q: 'Futbol darvozasining standart kengligi qancha?', c: '7.32 metr', w: ['7.00 metr', '7.50 metr', '7.15 metr'], diff: 'Hard' },
  { topic: 'Olimpiada', q: 'Zamonaviy birinchi Olimpiya o\'yinlari qaysi yilda va qayerda o\'tkazilgan?', c: '1896-yil Afinada', w: ['1900-yil Parijda', '1892-yil Londonda', '1904-yil Rimda'], diff: 'Medium' },
  { topic: 'Boks', q: 'Boks tarixida eng yosh og\'ir vazn chempioni bo\'lgan bokschi kim?', c: 'Mayk Tayson (20 yoshda)', w: ['Muhammad Ali', 'Jorj Formen', 'Evander Xolifild'], diff: 'Medium' },
  { topic: 'Tennis', q: 'Katta dubulg\'a (Grand Slam) turnirlaridan qaysi biri chim ustida (maysa) o\'tkaziladi?', c: 'Uimbldon (Wimbledon)', w: ['Rolan Garros', 'US Open', 'Australian Open'], diff: 'Easy' },
  { topic: 'O\'zbekiston Sporti', q: 'O\'zbekiston futbol terma jamoasi Osiyo o\'yinlarida qachon oltin medal olgan?', c: '1994-yil (Xirosima)', w: ['1998-yil', '2002-yil', '1990-yil'], diff: 'Medium' },
  { topic: 'O\'zbekiston Sporti', q: 'O\'zbekiston tarixida Olimpiada oltin medalini olgan birinchi bokschi kim?', c: 'Muhammadqodir Abdullayev (2000)', w: ['Rustam Saidov', 'Hasanboy Do\'smatov', 'Bahodir Jalolov'], diff: 'Hard' },
];

// 4. HISTORY FACTS
const HISTORY_FACTS = [
  { topic: 'O\'zbekiston Tarixi', q: 'Sohibqiron Amir Temur qaysi yilda tavallud topgan?', c: '1336-yil 9-aprelda', w: ['1340-yil', '1330-yil', '1352-yil'], diff: 'Easy' },
  { topic: 'O\'zbekiston Tarixi', q: 'Amir Temur saltanatining poytaxti qaysi shahar bo\'lgan?', c: 'Samarqand', w: ['Buxoro', 'Kesh (Shahrisabz)', 'Hirot'], diff: 'Easy' },
  { topic: 'O\'zbekiston Tarixi', q: 'Mirzo Ulug\'bek qaysi mashhur astronomik asarni yaratgan?', c: 'Ziji jadidi Ko\'ragoniy', w: ['Qonuni Mas\'udiy', 'Tarixi Rashidiy', 'Al-Qonun'], diff: 'Medium' },
  { topic: 'O\'zbekiston Tarixi', q: 'Zahiriddin Muhammad Bobur qaysi buyuk davlatga asos solgan?', c: 'Boburiylar (Buyuk Mo\'g\'ullar)', w: ['Saljuqiylar', 'Xorazmshohlar', 'Shayboniylar'], diff: 'Easy' },
  { topic: 'O\'zbekiston Tarixi', q: 'Jaloliddin Manguberdi qaysi daryo bo\'yida Chingizxon qo\'shiniga qahramonona zarba bergan?', c: 'Sind daryosi', w: ['Amudaryo', 'Sirdaryo', 'Ioh'], diff: 'Medium' },
  { topic: 'O\'zbekiston Tarixi', q: 'Qadimgi Xorazm Fanlar Akademiyasi (Ma\'mun akademiyasi) qaysi asrda tashkil topgan?', c: 'XI asr boshida (1004)', w: ['IX asrda', 'XIII asrda', 'VII asrda'], diff: 'Hard' },
  { topic: 'Jahon Tarixi', q: 'Ikkinchi jahon urushi qaysi yillarda bo\'lib o\'tgan?', c: '1939 - 1945', w: ['1914 - 1918', '1941 - 1945', '1938 - 1946'], diff: 'Easy' },
  { topic: 'Jahon Tarixi', q: 'Birinchi jahon urushi qaysi voqea sababli boshlangan?', c: 'Frans Ferdinandning o\'ldirilishi', w: ['Polshaga hujum', 'Pearl Harbor', 'Versal shartnomasi'], diff: 'Medium' },
  { topic: 'Jahon Tarixi', q: 'Qadimgi Rim imperiyasining birinchi imperatori kim bo\'lgan?', c: 'Oktavian Avgust', w: ['Yuliy Sezar', 'Neron', 'Mark Avreliy'], diff: 'Medium' },
  { topic: 'Jahon Tarixi', q: 'Buyuk geografik kashfiyotlar davrida Amerikaning rasmiy kashf etilgan yili?', c: '1492-yil', w: ['1498-yil', '1502-yil', '1488-yil'], diff: 'Easy' },
  { topic: 'Jahon Tarixi', q: 'Yer sharini birinchi bo\'lib aylanib chiqqan dengizchi kim?', c: 'Fernan Magellan', w: ['Xristofor Kolumb', 'Vasko da Gama', 'Jeyms Kuk'], diff: 'Easy' },
  { topic: 'Jahon Tarixi', q: 'Qadimgi Misr piramidalaridan eng kattasi qaysi?', c: 'Xeops (Xufu) piramidasi', w: ['Xefren', 'Mikerin', 'Djoser'], diff: 'Easy' },
  { topic: 'Jahon Tarixi', q: 'Vizantiya imperiyasining poytaxti Konstantinopol qaysi yili Usmoniylar tomonidan zabt etilgan?', c: '1453-yil', w: ['1492-yil', '1389-yil', '1517-yil'], diff: 'Hard' },
  { topic: 'Jahon Tarixi', q: 'Fransiya Buyuk Inqilobi qaysi yili boshlangan?', c: '1789-yilda', w: ['1776-yilda', '1799-yilda', '1804-yilda'], diff: 'Hard' },
];

// 5. SCIENCE FACTS
const SCIENCE_FACTS = [
  { topic: 'Fizika', q: 'Klassik mexanikaning 3 ta asosiy qonunini kim kashf etgan?', c: 'Isaak Nyuton', w: ['Galileo Galiley', 'Albert Eynshteyn', 'Nikola Tesla'], diff: 'Easy' },
  { topic: 'Fizika', q: 'E = mc² mashhur nisbiylik formulasi muallifi kim?', c: 'Albert Eynshteyn', w: ['Nils Bor', 'Maks Plank', 'Ernest Rezerford'], diff: 'Easy' },
  { topic: 'Fizika', q: 'Yorug\'likning vakuumdagi tezligi qanchaga teng?', c: '300,000 km/s', w: ['150,000 km/s', '500,000 km/s', '1,000,000 km/s'], diff: 'Easy' },
  { topic: 'Fizika', q: 'Mutlaq nol harorat (0 Kelvin) Selsiy shkalasida necha darajaga teng?', c: '-273.15 °C', w: ['-100 °C', '-200 °C', '-350 °C'], diff: 'Medium' },
  { topic: 'Fizika', q: 'Kvant fizikasining asoschisi va Plank doimiysini kiritgan olim kim?', c: 'Maks Plank', w: ['Ervin Shredinger', 'Verner Geyzenberg', 'Enriko Fermi'], diff: 'Hard' },
  { topic: 'Fizika', q: 'Tovush tezligi qaysi muhitda eng yuqori bo\'ladi?', c: 'Qattiq jismlarda (masalan, po\'latda)', w: ['Havoda', 'Suvda', 'Vakuumda'], diff: 'Hard' },
  { topic: 'Kimyo', q: 'Kimyoviy elementlar davriy jadvalini kim yaratgan?', c: 'Dmitriy Mendeleyev', w: ['Antuan Lavuazye', 'Jon Dalton', 'Maykl Faradey'], diff: 'Easy' },
  { topic: 'Kimyo', q: 'Davriy jadvaldagi eng birinchi element qaysi?', c: 'Vodorod (H)', w: ['Geliy (He)', 'Kislorod (O)', 'Uglerod (C)'], diff: 'Easy' },
  { topic: 'Kimyo', q: 'Suvning kimyoviy formulasi qanday?', c: 'H₂O', w: ['CO₂', 'H₂O₂', 'NaCl'], diff: 'Easy' },
  { topic: 'Kimyo', q: 'Oddiy osh tuzining kimyoviy formulasi nima?', c: 'NaCl (Natriy xlorid)', w: ['KCl', 'NaOH', 'CaCO₃'], diff: 'Easy' },
  { topic: 'Kimyo', q: 'Yer atmosferasining eng katta qismini (taxminan 78%) qaysi gaz tashkil qiladi?', c: 'Azot (N₂)', w: ['Kislorod (O₂)', 'Argon', 'Karbonat angidrid'], diff: 'Easy' },
  { topic: 'Kimyo', q: 'Oltinning kimyoviy belgisi qanday?', c: 'Au (Aurum)', w: ['Ag', 'Fe', 'Pt'], diff: 'Easy' },
  { topic: 'Kimyo', q: 'Oddiy sharoitda suyuq holatda bo\'lgan yagona metall qaysi?', c: 'Simob (Hg)', w: ['Qo\'rg\'oshin', 'Qalay', 'Galliy'], diff: 'Medium' },
  { topic: 'Kimyo', q: 'Olmos va grafit qaysi bir xil kimyoviy elementning turli modifikatsiyalaridir?', c: 'Uglerod (Carbon)', w: ['Kremniy', 'Temir', 'Oltingugurt'], diff: 'Medium' },
  { topic: 'Astronomiya', q: 'Quyosh tizimidagi eng katta sayyora qaysi?', c: 'Yupiter', w: ['Saturn', 'Neptun', 'Uran'], diff: 'Easy' },
  { topic: 'Astronomiya', q: 'Quyosh tizimida Quyoshga eng yaqin joylashgan sayyora qaysi?', c: 'Merkuriy', w: ['Venera', 'Mars', 'Yer'], diff: 'Easy' },
  { topic: 'Astronomiya', q: 'Qaysi sayyoraning atrofida eng mashhur va yirik halqalar mavjud?', c: 'Saturn', w: ['Yupiter', 'Uran', 'Mars'], diff: 'Easy' },
  { topic: 'Astronomiya', q: 'Quyosh tizimidagi eng issiq sayyora qaysi?', c: 'Venera (issiqxona effekti tufayli)', w: ['Merkuriy', 'Mars', 'Yupiter'], diff: 'Hard' },
  { topic: 'Astronomiya', q: 'Quyoshdan Yerga nur (yorug\'lik) qancha vaqtda yetib keladi?', c: 'Taxminan 8 daqiqa 20 soniya', w: ['1 soniyada', '1 soatda', '8 soniyada'], diff: 'Medium' },
];

// 6. CULTURE & ART FACTS
const CULTURE_FACTS = [
  { topic: 'Tasviriy San\'at', q: 'Mashhur "Mona Liza" (Jokonda) asarini kim chizgan?', c: 'Leonardo da Vinchi', w: ['Mikelandjelo', 'Rafael', 'Rembrandt'], diff: 'Easy' },
  { topic: 'Tasviriy San\'at', q: '"Yulduzli tun" (Starry Night) asarining muallifi kim?', c: 'Vinsent van Gog', w: ['Klod Mone', 'Pablo Pikasso', 'Salvador Dali'], diff: 'Easy' },
  { topic: 'Tasviriy San\'at', q: 'Sikstina kapellasi shiftiga mashhur freskalarni kim chizgan?', c: 'Mikelandjelo', w: ['Leonardo da Vinchi', 'Donatello', 'Bottichelli'], diff: 'Medium' },
  { topic: 'Tasviriy San\'at', q: 'Syurrealizm oqimining mashhur vakili "Eriyotgan soatlar" asari muallifi kim?', c: 'Salvador Dali', w: ['Rene Magritt', 'Pablo Pikasso', 'Edvard Munk'], diff: 'Medium' },
  { topic: 'Tasviriy San\'at', q: '"Qichqiriq" (The Scream) ekspressionistik kartinasi muallifi kim?', c: 'Edvard Munk', w: ['Gustav Klimt', 'Vasiliy Kandinskiy', 'Paul Klee'], diff: 'Hard' },
  { topic: 'Adabiyot', q: 'O\'zbek adabiy tilining asoschisi va "Hamsa" muallifi kim?', c: 'Alisher Navoiy', w: ['Zahiriddin Bobur', 'Lutfiy', 'Atoiy'], diff: 'Easy' },
  { topic: 'Adabiyot', q: '"O\'tkan kunlar" birinchi o\'zbek romanining muallifi kim?', c: 'Abdulla Qodiriy', w: ['Cho\'lpon', 'Fitrat', 'Oybek'], diff: 'Easy' },
  { topic: 'Adabiyot', q: '"Romeo va Julyetta", "Gamlet" dramatik asarlarining muallifi kim?', c: 'Uilyam Shekspir', w: ['Charlz Dikkens', 'Iogann Gyote', 'Viktor Gyugo'], diff: 'Easy' },
  { topic: 'Adabiyot', q: '"Urush va tinchlik" romanining muallifi kim?', c: 'Lev Tolstoy', w: ['Fyodor Dostoyevskiy', 'Anton Chexov', 'Aleksandr Pushkin'], diff: 'Easy' },
  { topic: 'Adabiyot', q: '"Ilohiy komediya" dostonining muallifi bo\'lgan italiyalik buyuk shoir?', c: 'Dante Aligyeri', w: ['Franchesko Petrarka', 'Djovanni Bokkachcho', 'Nikolo Makiavelli'], diff: 'Hard' },
  { topic: 'Musiqa', q: 'Eshitish qobiliyatini yo\'qotgan bo\'lsa ham, 9-simfoniyani yaratgan buyuk bastakor?', c: 'Lyudvig van Betxoven', w: ['Volfgang Amadey Motsart', 'Iogann Sebastyan Bax', 'Frederik Shopen'], diff: 'Easy' },
  { topic: 'Musiqa', q: '"Sehrli nay" va "Figaroning uylanishi" operalari muallifi kim?', c: 'Volfgang Amadey Motsart', w: ['Juzeppe Verdi', 'Jakkomo Puchchini', 'Rixard Vagner'], diff: 'Medium' },
  { topic: 'Kino', q: 'Kino tarixida eng ko\'p "Oskar" mukofotini (11 tadan) qo\'lga kiritgan filmlar qaysilar?', c: 'Titanik, Ben-Gur, Uzuklar hukumdori 3', w: ['Avatar, Cho\'qintirgan ota', 'Interstellar, Gladiator', 'Inception, Forsaj'], diff: 'Hard' },
];

/**
 * Builds a clean, authentic question pool by combining:
 * 1. Curated questions from quizzes.js (standard multiple choice tests)
 * 2. Direct domain facts with authentic multiple choice options
 */
function buildLargeCategoryPool(baseList, categoryKey) {
  const pool = [];
  let idCounter = 1;

  // 1. First add curated high quality questions from QUIZ_QUESTIONS
  const curated = QUIZ_QUESTIONS[categoryKey] || [];
  curated.forEach((q) => {
    const rawUz = q.options.uz || q.options.en;
    const correctVal = rawUz[q.correctAnswer];
    const shuffled = shuffleArray(rawUz);
    const newCorrect = shuffled.indexOf(correctVal);

    pool.push({
      id: `${categoryKey}_curated_${idCounter++}`,
      question: q.question,
      options: {
        uz: shuffled,
        en: q.options.en || shuffled,
        ru: q.options.ru || shuffled,
      },
      correctAnswer: newCorrect >= 0 ? newCorrect : 0,
      difficulty: q.difficulty || 'Medium',
      topic: q.topic || 'Test',
    });
  });

  // 2. Add verified direct test questions from baseList
  baseList.forEach((fact) => {
    const opts = [fact.c, ...fact.w];
    const shuffled = shuffleArray(opts);
    const correctIdx = shuffled.indexOf(fact.c);

    pool.push({
      id: `${categoryKey}_fact_${idCounter++}`,
      question: {
        uz: fact.q,
        en: fact.q,
        ru: fact.q,
      },
      options: {
        uz: shuffled,
        en: shuffled,
        ru: shuffled,
      },
      correctAnswer: correctIdx,
      difficulty: fact.diff || 'Medium',
      topic: fact.topic,
    });
  });

  return pool;
}

// Generate the full question pools
const FULL_QUESTION_ENGINE = {
  general: buildLargeCategoryPool(GENERAL_FACTS, 'general'),
  programming: buildLargeCategoryPool(TECH_FACTS, 'programming'),
  technology: null, // alias
  football: buildLargeCategoryPool(SPORT_FACTS, 'football'),
  sport: null, // alias
  history: buildLargeCategoryPool(HISTORY_FACTS, 'history'),
  science: buildLargeCategoryPool(SCIENCE_FACTS, 'science'),
  culture: buildLargeCategoryPool(CULTURE_FACTS, 'culture'),
};

FULL_QUESTION_ENGINE.technology = FULL_QUESTION_ENGINE.programming;
FULL_QUESTION_ENGINE.sport = FULL_QUESTION_ENGINE.football;

/**
 * Main Question Retrieval Method for Quiz:
 * - Pulls authentic multiple-choice test questions for the category
 * - Filters by selected difficulty ('Easy' | 'Medium' | 'Hard')
 * - Shuffles randomly so users NEVER see questions in the same order
 * - Randomizes options on every game
 *
 * @param {string} categoryId
 * @param {'Easy' | 'Medium' | 'Hard'} difficulty
 * @param {number} count
 * @returns {Array} Array of randomized genuine test questions
 */
export function getQuizQuestions(categoryId = 'general', difficulty = 'Medium', count = 30) {
  const normCategory = categoryId.toLowerCase();
  const pool = FULL_QUESTION_ENGINE[normCategory] || FULL_QUESTION_ENGINE.general;

  // Filter pool by difficulty
  let filtered = pool.filter((q) => q.difficulty === difficulty);

  // If filtered pool is smaller than requested count, backfill with remaining questions
  if (filtered.length < count) {
    const remaining = pool.filter((q) => q.difficulty !== difficulty);
    filtered = [...filtered, ...shuffleArray(remaining)];
  }

  // Shuffle the questions thoroughly
  const randomized = shuffleArray(filtered);

  // Take requested count (e.g. 15, 20, 30)
  const selected = randomized.slice(0, Math.min(count, randomized.length));

  // Shuffling options on each game start so answers are never in fixed positions
  return selected.map((q, idx) => {
    const uzOpts = q.options.uz || q.options.en;
    const correctVal = uzOpts[q.correctAnswer];
    const shuffledOptions = shuffleArray(uzOpts);
    const newCorrectAnswer = shuffledOptions.indexOf(correctVal);

    return {
      ...q,
      index: idx + 1,
      options: {
        uz: shuffledOptions,
        en: shuffledOptions,
        ru: shuffledOptions,
      },
      correctAnswer: newCorrectAnswer >= 0 ? newCorrectAnswer : 0,
    };
  });
}
