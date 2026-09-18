import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const SOUND_STORAGE_KEY = '@quizmaster_sound_enabled';
const MUSIC_STORAGE_KEY = '@quizmaster_music_enabled';

// Audio assets with dual strategy: local path + fast CDN backup
const AUDIO_SOURCES = {
  suspense: [
    '/assets/audio/suspense.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2431/2431-preview.mp3',
  ],
  correct: [
    '/assets/audio/correct.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  ],
  wrong: [
    '/assets/audio/wrong.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
  ],
  click: [
    '/assets/audio/click.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  ],
};

let bgMusicAudio = null;
let audioContext = null;

const getAudioContext = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
  }
  return audioContext;
};

export const isSoundEnabled = async () => {
  try {
    const val = await AsyncStorage.getItem(SOUND_STORAGE_KEY);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
};

export const setSoundEnabled = async (enabled) => {
  try {
    await AsyncStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to save sound state:', e);
  }
};

export const isMusicEnabled = async () => {
  try {
    const val = await AsyncStorage.getItem(MUSIC_STORAGE_KEY);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
};

export const setMusicEnabled = async (enabled) => {
  try {
    await AsyncStorage.setItem(MUSIC_STORAGE_KEY, enabled ? 'true' : 'false');
    if (!enabled) {
      stopMillionaireMusic();
    }
  } catch (e) {
    console.error('Failed to save music state:', e);
  }
};

/**
 * Play a high quality sound effect (Correct, Wrong, Click, Toggle)
 * Uses HTML5 Audio with Web Audio API fallback
 * @param {'click' | 'correct' | 'success' | 'wrong' | 'toggle'} type
 */
export const playSound = async (type = 'click') => {
  const enabled = await isSoundEnabled();
  if (!enabled) return;

  const resolvedType = type === 'success' ? 'correct' : type;

  // 1. Try HTML5 Audio in Web / Browser
  if (typeof window !== 'undefined' && typeof window.Audio !== 'undefined') {
    const sources = AUDIO_SOURCES[resolvedType] || AUDIO_SOURCES.click;
    let played = false;

    for (const src of sources) {
      try {
        const audio = new window.Audio(src);
        audio.volume = resolvedType === 'correct' ? 0.75 : resolvedType === 'wrong' ? 0.65 : 0.45;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          played = true;
          break;
        }
      } catch (e) {
        // Try next source
      }
    }

    if (played) return;
  }

  // 2. Synthesized fallback via Web Audio API if HTML5 audio cannot play
  playSynthesizedFallback(resolvedType);
};

function playSynthesizedFallback(type) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      // High triumph arpeggio (C5 -> E5 -> G5 -> C6)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(783.99, now + 0.15);
      osc2.frequency.setValueAtTime(1046.5, now + 0.25);
      gain2.gain.setValueAtTime(0.25, now + 0.15);
      gain2.gain.linearRampToValueAtTime(0.01, now + 0.55);

      osc.start(now);
      osc.stop(now + 0.4);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.55);
    } else if (type === 'wrong') {
      // Low buzzer / dissonance (F#2 + G2 buzzer)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(185, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(196, now); // Dissonant half-step
      gain2.gain.setValueAtTime(0.25, now);
      gain2.gain.linearRampToValueAtTime(0.01, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.35);
      osc2.start(now);
      osc2.stop(now + 0.35);
    } else {
      // Tap / click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {}
}

// -------------------------------------------------------------
// SUSPENSE QUIZ BACKGROUND MUSIC (REAL AUDIO TRACK)
// -------------------------------------------------------------

/**
 * Starts real suspense quiz music track in a smooth loop
 */
export const startMillionaireMusic = async () => {
  const enabled = await isMusicEnabled();
  if (!enabled) return;

  if (typeof window !== 'undefined' && typeof window.Audio !== 'undefined') {
    try {
      if (!bgMusicAudio) {
        // Try local file first, then CDN
        bgMusicAudio = new window.Audio(AUDIO_SOURCES.suspense[0]);
        bgMusicAudio.loop = true;
        bgMusicAudio.volume = 0.35;

        // If local file errors, switch to CDN
        bgMusicAudio.onerror = () => {
          if (bgMusicAudio) {
            bgMusicAudio.src = AUDIO_SOURCES.suspense[1];
            bgMusicAudio.play().catch(() => {});
          }
        };
      }

      bgMusicAudio.volume = 0.35;
      bgMusicAudio.play().catch((err) => {
        console.log('Background music play note:', err.message);
      });
      return;
    } catch (e) {
      console.warn('HTML5 music note:', e);
    }
  }
};

/**
 * Stops or pauses suspense background music
 */
export const stopMillionaireMusic = () => {
  try {
    if (bgMusicAudio) {
      bgMusicAudio.pause();
      bgMusicAudio.currentTime = 0;
    }
  } catch (e) {}
};
