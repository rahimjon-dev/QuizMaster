/**
 * Curated high-resolution, fast-loading educational image CDN links
 * matched precisely to questions, topics, options, and categories.
 */

const THEMATIC_IMAGES = {
  // Geography & Nature
  desert_sahara: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
  river_waterfall: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80',
  ocean_water: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  mountain_everest: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
  city_capitals: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
  ice_glacier: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&auto=format&fit=crop&q=80',

  // Anatomy & Biology
  anatomy_bones: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
  heart_biology: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&auto=format&fit=crop&q=80',
  brain_science: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
  dna_genetics: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
  microscope_biology: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',

  // Astronomy & Space
  space_mars: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
  space_galaxy: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  space_moon: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&auto=format&fit=crop&q=80',
  space_earth: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80',

  // Technology & Programming
  code_syntax: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  chip_hardware: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
  robot_ai: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
  cybersecurity: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',

  // Sports & Football
  football_stadium: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
  football_trophy: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
  olympics_running: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',

  // History & Architecture
  ancient_pyramids: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800&auto=format&fit=crop&q=80',
  ancient_rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',
  samarkand_registan: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80',
  medieval_castle: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef96?w=800&auto=format&fit=crop&q=80',

  // Science & Chemistry
  chemistry_lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
  physics_particles: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',

  // Culture & Art
  art_monalisa: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
  music_instruments: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
  literature_books: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
  theater_cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
};

/**
 * Normalizes text by converting to lowercase and standardizing all Uzbek apostrophe variations
 */
function normalizeText(text) {
  if (!text) return '';
  return String(text)
    .toLowerCase()
    .replace(/[\u2018\u2019\u02BB\u02BC`´']/g, "'");
}

/**
 * Returns a high-resolution, thematic image URL matching question text, topic, and answers.
 */
export const getQuestionImageUrl = (question, categoryId = 'general') => {
  if (question?.image && typeof question.image === 'string' && question.image.startsWith('http')) {
    return question.image;
  }

  // Combine question text, topic, and options into a searchable context
  const qStr =
    typeof question?.question === 'object'
      ? `${question.question.uz || ''} ${question.question.en || ''} ${question.question.ru || ''}`
      : question?.question || '';

  const optsStr =
    Array.isArray(question?.options)
      ? question.options.join(' ')
      : typeof question?.options === 'object'
      ? Object.values(question.options).flat().join(' ')
      : '';

  const topicStr = question?.topic || '';
  const fullText = normalizeText(`${topicStr} ${qStr} ${optsStr}`);

  // 1. Deserts, Sand Dunes & Arid regions (e.g. Sahroi Kabir, Gobi, Kalahari)
  if (
    fullText.includes("cho'l") ||
    fullText.includes('chol') ||
    fullText.includes('sahro') ||
    fullText.includes('saxro') ||
    fullText.includes('sahara') ||
    fullText.includes('gobi') ||
    fullText.includes('kalahari') ||
    fullText.includes('qum') ||
    fullText.includes('desert')
  ) {
    return THEMATIC_IMAGES.desert_sahara;
  }

  // 2. Rivers, Waterfalls & Lakes (e.g. Nil, Amazonka, Baykal, Anxel, Niagara)
  if (
    fullText.includes('daryo') ||
    fullText.includes('sharshara') ||
    fullText.includes("ko'l") ||
    fullText.includes('kol') ||
    fullText.includes('nil') ||
    fullText.includes('amazonka') ||
    fullText.includes('baykal') ||
    fullText.includes('anxel') ||
    fullText.includes('niagara') ||
    fullText.includes('viktoriya') ||
    fullText.includes('kaspiy')
  ) {
    return THEMATIC_IMAGES.river_waterfall;
  }

  // 3. Oceans, Seas & Islands (e.g. Tinch okean, Atlantika, Grenlandiya, Orol)
  if (
    fullText.includes('okean') ||
    fullText.includes('dengiz') ||
    fullText.includes('orol') ||
    fullText.includes('grenlandiya') ||
    fullText.includes('madagaskar') ||
    fullText.includes('borneo') ||
    fullText.includes('sohil') ||
    fullText.includes('ocean')
  ) {
    return THEMATIC_IMAGES.ocean_water;
  }

  // 4. Cold, Ice, Glaciers & Antarctica (e.g. Muzlik, Antarktida, Vostok)
  if (
    fullText.includes('muzlik') ||
    fullText.includes('muz') ||
    fullText.includes('antarktida') ||
    fullText.includes('vostok') ||
    fullText.includes('oymyakon') ||
    fullText.includes('sovuq')
  ) {
    return THEMATIC_IMAGES.ice_glacier;
  }

  // 5. Mountains, Volcanoes & Peaks (e.g. Everest, Vulqon, Cho'qqi, Kilimanjaro)
  if (
    fullText.includes("tog'") ||
    fullText.includes('tog') ||
    fullText.includes('everest') ||
    fullText.includes("cho'qqi") ||
    fullText.includes('choqqi') ||
    fullText.includes('vulqon') ||
    fullText.includes('kilimanjaro') ||
    fullText.includes('fudziyama') ||
    fullText.includes('vezuviy') ||
    fullText.includes('mountain')
  ) {
    return THEMATIC_IMAGES.mountain_everest;
  }

  // 6. Capitals, Cities & Nations (e.g. Poytaxt, Kanberra, Ottava, Parij, London)
  if (
    fullText.includes('poytaxt') ||
    fullText.includes('shahar') ||
    fullText.includes('davlat') ||
    fullText.includes('kanberra') ||
    fullText.includes('ottava') ||
    fullText.includes('bern') ||
    fullText.includes('abuja') ||
    fullText.includes('seul') ||
    fullText.includes('anqara') ||
    fullText.includes('vellington')
  ) {
    return THEMATIC_IMAGES.city_capitals;
  }

  // 7. Anatomy - Bones & Skeleton
  if (
    fullText.includes('suyak') ||
    fullText.includes('skelet') ||
    fullText.includes('organizm') ||
    fullText.includes('anatom') ||
    fullText.includes('uzangi') ||
    fullText.includes('femur')
  ) {
    return THEMATIC_IMAGES.anatomy_bones;
  }

  // 8. Anatomy - Heart, Blood, Liver & Internal Organs
  if (
    fullText.includes('yurak') ||
    fullText.includes('jigar') ||
    fullText.includes('qon') ||
    fullText.includes('tomir') ||
    fullText.includes("o'pka") ||
    fullText.includes('eritrotsit')
  ) {
    return THEMATIC_IMAGES.heart_biology;
  }

  // 9. Anatomy - Brain & Nervous System
  if (
    fullText.includes('miya') ||
    fullText.includes('asab') ||
    fullText.includes('neyron') ||
    fullText.includes('brain') ||
    fullText.includes("ko'z") ||
    fullText.includes('kolbachka')
  ) {
    return THEMATIC_IMAGES.brain_science;
  }

  // 10. Genetics, DNA & Cells
  if (
    fullText.includes('dnk') ||
    fullText.includes('genetika') ||
    fullText.includes('hujayra') ||
    fullText.includes('dna') ||
    fullText.includes('xromosoma')
  ) {
    return THEMATIC_IMAGES.dna_genetics;
  }

  // 11. Astronomy - Mars & Planets
  if (
    fullText.includes('mars') ||
    fullText.includes('sayyora') ||
    fullText.includes('yupiter') ||
    fullText.includes('venera') ||
    fullText.includes('saturn') ||
    fullText.includes('merkuriy') ||
    fullText.includes('neptun') ||
    fullText.includes('uran')
  ) {
    return THEMATIC_IMAGES.space_mars;
  }

  // 12. Astronomy - Moon, Sun & Earth
  if (fullText.includes('oy') || fullText.includes('moon')) {
    return THEMATIC_IMAGES.space_moon;
  }
  if (
    fullText.includes('galaktika') ||
    fullText.includes('somon') ||
    fullText.includes('koinot') ||
    fullText.includes('yulduz') ||
    fullText.includes('andromeda') ||
    fullText.includes('teleskop')
  ) {
    return THEMATIC_IMAGES.space_galaxy;
  }

  // 13. Programming & Software
  if (
    fullText.includes('dastur') ||
    fullText.includes('python') ||
    fullText.includes('javascript') ||
    fullText.includes('kod') ||
    fullText.includes('algoritm') ||
    fullText.includes('react') ||
    fullText.includes('typescript') ||
    fullText.includes('flutter') ||
    fullText.includes('http') ||
    fullText.includes('quicksort') ||
    fullText.includes('binary search')
  ) {
    return THEMATIC_IMAGES.code_syntax;
  }

  // 14. Hardware & Computers
  if (
    fullText.includes('protsessor') ||
    fullText.includes('chip') ||
    fullText.includes('ram') ||
    fullText.includes('kompyuter') ||
    fullText.includes('sichqoncha') ||
    fullText.includes('terabayt') ||
    fullText.includes('gigabayt') ||
    fullText.includes('hardware')
  ) {
    return THEMATIC_IMAGES.chip_hardware;
  }

  // 15. AI & Robotics
  if (
    fullText.includes('ai') ||
    fullText.includes("sun'iy intellekt") ||
    fullText.includes('robot') ||
    fullText.includes('turing')
  ) {
    return THEMATIC_IMAGES.robot_ai;
  }

  // 16. Cybersecurity
  if (
    fullText.includes('kiber') ||
    fullText.includes('parol') ||
    fullText.includes('xavfsizlik') ||
    fullText.includes('shifrlash') ||
    fullText.includes('rsa') ||
    fullText.includes('virus')
  ) {
    return THEMATIC_IMAGES.cybersecurity;
  }

  // 17. Football & Sports
  if (
    fullText.includes('futbol') ||
    fullText.includes('ronaldo') ||
    fullText.includes('messi') ||
    fullText.includes('pele') ||
    fullText.includes('maradona') ||
    fullText.includes('stadion') ||
    fullText.includes('fifa') ||
    fullText.includes('uefa') ||
    fullText.includes('mbappe')
  ) {
    return THEMATIC_IMAGES.football_stadium;
  }
  if (
    fullText.includes('chempion') ||
    fullText.includes('kubok') ||
    fullText.includes("oltin to'p") ||
    fullText.includes('sovrin') ||
    fullText.includes('medal')
  ) {
    return THEMATIC_IMAGES.football_trophy;
  }
  if (
    fullText.includes('olimpiada') ||
    fullText.includes('boks') ||
    fullText.includes('yugurish') ||
    fullText.includes('tennis') ||
    fullText.includes('sport')
  ) {
    return THEMATIC_IMAGES.olympics_running;
  }

  // 18. History - Egypt & Antiquity
  if (
    fullText.includes('misr') ||
    fullText.includes('piramida') ||
    fullText.includes("fir'avn") ||
    fullText.includes('giza')
  ) {
    return THEMATIC_IMAGES.ancient_pyramids;
  }
  if (
    fullText.includes('rim') ||
    fullText.includes('kolizey') ||
    fullText.includes('imperiya') ||
    fullText.includes('caesar') ||
    fullText.includes('afina') ||
    fullText.includes('yunon')
  ) {
    return THEMATIC_IMAGES.ancient_rome;
  }
  if (
    fullText.includes('temur') ||
    fullText.includes('samarqand') ||
    fullText.includes('buxoro') ||
    fullText.includes('registon') ||
    fullText.includes('ipak yo')
  ) {
    return THEMATIC_IMAGES.samarkand_registan;
  }

  // 19. Chemistry
  if (
    fullText.includes('kimyo') ||
    fullText.includes('mendeleyev') ||
    fullText.includes('kislorod') ||
    fullText.includes('vodorod') ||
    fullText.includes('element') ||
    fullText.includes('formula') ||
    fullText.includes('reaksiya')
  ) {
    return THEMATIC_IMAGES.chemistry_lab;
  }

  // 20. Physics
  if (
    fullText.includes('fizika') ||
    fullText.includes('nyuton') ||
    fullText.includes('eynshteyn') ||
    fullText.includes('tezlik') ||
    fullText.includes('gravitatsiya') ||
    fullText.includes('atom') ||
    fullText.includes('kvant')
  ) {
    return THEMATIC_IMAGES.physics_particles;
  }

  // 21. Culture, Art & Music
  if (
    fullText.includes('mona liza') ||
    fullText.includes('da vinchi') ||
    fullText.includes('pikasso') ||
    fullText.includes('rassom') ||
    fullText.includes("san'at")
  ) {
    return THEMATIC_IMAGES.art_monalisa;
  }
  if (
    fullText.includes('musiqa') ||
    fullText.includes('motsart') ||
    fullText.includes('betxoven') ||
    fullText.includes('simfoniya') ||
    fullText.includes('opera')
  ) {
    return THEMATIC_IMAGES.music_instruments;
  }
  if (
    fullText.includes('kitob') ||
    fullText.includes('adabiyot') ||
    fullText.includes('navoiy') ||
    fullText.includes("she'r") ||
    fullText.includes('roman')
  ) {
    return THEMATIC_IMAGES.literature_books;
  }
  if (
    fullText.includes('kino') ||
    fullText.includes('oskar') ||
    fullText.includes('film') ||
    fullText.includes('teatr')
  ) {
    return THEMATIC_IMAGES.theater_cinema;
  }

  // Category-based fallback
  switch (categoryId) {
    case 'programming':
    case 'technology':
      return THEMATIC_IMAGES.code_syntax;
    case 'football':
    case 'sport':
      return THEMATIC_IMAGES.football_stadium;
    case 'history':
      return THEMATIC_IMAGES.ancient_pyramids;
    case 'science':
      return THEMATIC_IMAGES.chemistry_lab;
    case 'culture':
      return THEMATIC_IMAGES.art_monalisa;
    default:
      return THEMATIC_IMAGES.space_earth;
  }
};
