/**
 * Curated high-resolution, fast-loading educational image CDN links
 * matched to questions, topics, and categories.
 */

const THEMATIC_IMAGES = {
  // Anatomy & Biology
  anatomy_bones: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80',
  heart_biology: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&auto=format&fit=crop&q=80',
  brain_science: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80',
  dna_genetics: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',

  // Astronomy & Space
  space_mars: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
  space_galaxy: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
  space_moon: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&auto=format&fit=crop&q=80',
  space_earth: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80',

  // Geography & Nature
  ocean_water: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
  mountain_everest: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
  desert_sahara: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',

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
  ancient_rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',
  ancient_pyramids: 'https://images.unsplash.com/photo-1503152394-c571994fd383?w=800&auto=format&fit=crop&q=80',
  medieval_castle: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef96?w=800&auto=format&fit=crop&q=80',
  samarkand_registan: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80',

  // Science & Chemistry
  chemistry_lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
  physics_particles: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',
  microscope_science: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',

  // Culture & Art
  art_monalisa: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
  music_instruments: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
  theater_cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
  literature_books: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
};

/**
 * Returns a high-resolution, relevant image URL based on question keywords,
 * explicit question image property, and category fallback.
 */
export const getQuestionImageUrl = (question, categoryId = 'general') => {
  if (question?.image && typeof question.image === 'string' && question.image.startsWith('http')) {
    return question.image;
  }

  const qText = (
    typeof question?.question === 'object'
      ? `${question.question.uz || ''} ${question.question.en || ''}`
      : question?.question || ''
  ).toLowerCase();

  // Anatomy & Body keywords
  if (qText.includes('suyak') || qText.includes('skelet') || qText.includes('organizm') || qText.includes('anatom') || qText.includes('bone')) {
    return THEMATIC_IMAGES.anatomy_bones;
  }
  if (qText.includes('yurak') || qText.includes('heart') || qText.includes('qon') || qText.includes('tomir')) {
    return THEMATIC_IMAGES.heart_biology;
  }
  if (qText.includes('miya') || qText.includes('brain') || qText.includes('asab') || qText.includes('neyron')) {
    return THEMATIC_IMAGES.brain_science;
  }
  if (qText.includes('dnk') || qText.includes('genetika') || qText.includes('hujayra') || qText.includes('dna')) {
    return THEMATIC_IMAGES.dna_genetics;
  }

  // Space & Astronomy keywords
  if (qText.includes('mars') || qText.includes('sayyora') || qText.includes('planet') || qText.includes('yupiter') || qText.includes('venera') || qText.includes('saturn')) {
    return THEMATIC_IMAGES.space_mars;
  }
  if (qText.includes('galaktika') || qText.includes('somon') || qText.includes('koinot') || qText.includes('yulduz') || qText.includes('andromeda')) {
    return THEMATIC_IMAGES.space_galaxy;
  }
  if (qText.includes('oy') || qText.includes('moon') || qText.includes('quyosh') || qText.includes('sun')) {
    return THEMATIC_IMAGES.space_moon;
  }

  // Geography
  if (qText.includes('okean') || qText.includes('dengiz') || qText.includes('suv') || qText.includes('daryo') || qText.includes('tinch okean')) {
    return THEMATIC_IMAGES.ocean_water;
  }
  if (qText.includes('tog') || qText.includes('everest') || qText.includes('cho\'qqi') || qText.includes('vulkan')) {
    return THEMATIC_IMAGES.mountain_everest;
  }
  if (qText.includes('saxroi') || qText.includes('cho\'l') || qText.includes('sahara') || qText.includes('qum')) {
    return THEMATIC_IMAGES.desert_sahara;
  }

  // Technology & Programming
  if (qText.includes('dastur') || qText.includes('python') || qText.includes('javascript') || qText.includes('kod') || qText.includes('algoritm') || qText.includes('react') || qText.includes('java') || qText.includes('c++')) {
    return THEMATIC_IMAGES.code_syntax;
  }
  if (qText.includes('protsessor') || qText.includes('chip') || qText.includes('ram') || qText.includes('kompyuter') || qText.includes('smartfon') || qText.includes('android') || qText.includes('apple')) {
    return THEMATIC_IMAGES.chip_hardware;
  }
  if (qText.includes('ai') || qText.includes('sun\'iy intellekt') || qText.includes('robot') || qText.includes('neyron tarmoq')) {
    return THEMATIC_IMAGES.robot_ai;
  }
  if (qText.includes('xavfsizlik') || qText.includes('kiber') || qText.includes('parol') || qText.includes('hacker') || qText.includes('virus')) {
    return THEMATIC_IMAGES.cybersecurity;
  }

  // Sport & Football
  if (qText.includes('futbol') || qText.includes('ronaldo') || qText.includes('messi') || qText.includes('gol') || qText.includes('stadion') || qText.includes('fifa') || qText.includes('uefa')) {
    return THEMATIC_IMAGES.football_stadium;
  }
  if (qText.includes('chempion') || qText.includes('kubok') || qText.includes('oltin to\'p') || qText.includes('medal') || qText.includes('sovrin')) {
    return THEMATIC_IMAGES.football_trophy;
  }
  if (qText.includes('olimpiada') || qText.includes('boks') || qText.includes('yugurish') || qText.includes('sport') || qText.includes('tennis')) {
    return THEMATIC_IMAGES.olympics_running;
  }

  // History & Civilizations
  if (qText.includes('tarix') || qText.includes('rim') || qText.includes('imperiya') || qText.includes('urush') || qText.includes('imperator') || qText.includes('caesar')) {
    return THEMATIC_IMAGES.ancient_rome;
  }
  if (qText.includes('misr') || qText.includes('piramida') || qText.includes('fir\'avn') || qText.includes('yunon') || qText.includes('afina')) {
    return THEMATIC_IMAGES.ancient_pyramids;
  }
  if (qText.includes('temur') || qText.includes('samarqand') || qText.includes('buxoro') || qText.includes('ipak yo\'li') || qText.includes('bobur')) {
    return THEMATIC_IMAGES.samarkand_registan;
  }

  // Science & Chemistry
  if (qText.includes('kimyo') || qText.includes('element') || qText.includes('kislorod') || qText.includes('mendeleyev') || qText.includes('formula') || qText.includes('reaksiya')) {
    return THEMATIC_IMAGES.chemistry_lab;
  }
  if (qText.includes('fizika') || qText.includes('nyuton') || qText.includes('eynshteyn') || qText.includes('tezlik') || qText.includes('gravitatsiya') || qText.includes('atom') || qText.includes('kvant')) {
    return THEMATIC_IMAGES.physics_particles;
  }

  // Culture & Art
  if (qText.includes('mona liza') || qText.includes('da vinchi') || qText.includes('pikasso') || qText.includes('rassom') || qText.includes('san\'at') || qText.includes('muzey')) {
    return THEMATIC_IMAGES.art_monalisa;
  }
  if (qText.includes('musiqa') || qText.includes('motsart') || qText.includes('betxoven') || qText.includes('simfoniya') || qText.includes('opera') || qText.includes('qo\'shiq')) {
    return THEMATIC_IMAGES.music_instruments;
  }
  if (qText.includes('kino') || qText.includes('oskar') || qText.includes('film') || qText.includes('teatr') || qText.includes('aktyor')) {
    return THEMATIC_IMAGES.theater_cinema;
  }
  if (qText.includes('kitob') || qText.includes('adabiyot') || qText.includes('navoiy') || qText.includes('she\'r') || qText.includes('roman') || qText.includes('yozuvchi')) {
    return THEMATIC_IMAGES.literature_books;
  }

  // Default category fallbacks
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
