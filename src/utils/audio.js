import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const SOUND_STORAGE_KEY = '@quizmaster_sound_enabled';
const MUSIC_STORAGE_KEY = '@quizmaster_music_enabled';

// High quality audio CDN sources with fallbacks
const AUDIO_SOURCES = {
  // Sokin, tinchlantiruvchi ambient musiqa
  calm: [
    '/assets/audio/calm_music.mp3',
    '/assets/audio/suspense.mp3',
    'https://assets.mixkit.co/active_storage/sfx/2440/2440-preview.mp3',
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
let ambientOscillators = [];
let ambientGainNode = null;
let isAmbientPlaying = false;
let userHasInteracted = false;

/**
 * Get or create the shared Web Audio Context
 */
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

/**
 * Mobile touch audio unlocker:
 * Mobile browsers require a user gesture to enable audio playback.
 * We attach a one-time touch/click listener to unlock the audio context immediately.
 */
if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  const unlockAudio = () => {
    userHasInteracted = true;
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    // Create and play an inaudible 1-sample buffer to unlock HTML5 audio pipeline
    try {
      if (ctx) {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
    } catch (e) {}

    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('touchend', unlockAudio);
    window.removeEventListener('click', unlockAudio);
  };

  window.addEventListener('touchstart', unlockAudio, { passive: true, once: true });
  window.addEventListener('touchend', unlockAudio, { passive: true, once: true });
  window.addEventListener('click', unlockAudio, { passive: true, once: true });
}

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
      stopCalmMusic();
    }
  } catch (e) {
    console.error('Failed to save music state:', e);
  }
};

/**
 * Play an audible sound effect (click, correct, wrong, toggle)
 * Runs HTML5 Audio with instant Web Audio API synthesizer guarantee
 */
export const playSound = async (type = 'click') => {
  const enabled = await isSoundEnabled();
  if (!enabled) return;

  const resolvedType = type === 'success' ? 'correct' : type;

  // Always play synthesized sound immediately for 0ms tactile feedback
  playSynthesizedFeedback(resolvedType);

  // Also trigger HTML5 Audio for rich acoustic depth if supported
  if (typeof window !== 'undefined' && typeof window.Audio !== 'undefined') {
    const sources = AUDIO_SOURCES[resolvedType] || AUDIO_SOURCES.click;
    for (const src of sources) {
      try {
        const audio = new window.Audio(src);
        audio.volume = resolvedType === 'correct' ? 0.75 : resolvedType === 'wrong' ? 0.65 : 0.45;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
          break;
        }
      } catch (e) {}
    }
  }
};

/**
 * Hardware-level Web Audio API sound generator (Zero latency, works offline, 100% reliable)
 */
function playSynthesizedFeedback(type) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    if (type === 'correct') {
      // 🌟 Triumphant Victory Chime: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
      const notes = [
        { f: 523.25, start: 0.0, dur: 0.28 },
        { f: 659.25, start: 0.08, dur: 0.3 },
        { f: 783.99, start: 0.16, dur: 0.35 },
        { f: 1046.5, start: 0.24, dur: 0.6 },
      ];

      notes.forEach(({ f, start, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + start);
        gain.gain.setValueAtTime(0.28, now + start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + start);
        osc.stop(now + start + dur);
      });
    } else if (type === 'wrong') {
      // ❌ Distinct Error Buzzer: Dissonant dual frequency drop
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(165, now);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 0.38);

      osc2.frequency.setValueAtTime(175, now); // Dissonant half-step
      osc2.frequency.exponentialRampToValueAtTime(115, now + 0.38);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else {
      // 🔘 Tactile Button Click: Crisp pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {}
}

// -------------------------------------------------------------
// SOKIN FON MUSIQASI (CALM & RELAXING AMBIENT BACKGROUND MUSIC)
// -------------------------------------------------------------

/**
 * Starts a calm, relaxing background music loop.
 * Dual implementation:
 * 1. Rich HTML5 Audio stream (calm ambient MP3)
 * 2. Harmonic Web Audio ambient generator (Lush meditative peaceful chord drone)
 */
export const startCalmMusic = async () => {
  const enabled = await isMusicEnabled();
  if (!enabled) return;

  // 1. Try HTML5 Audio
  if (typeof window !== 'undefined' && typeof window.Audio !== 'undefined') {
    try {
      if (!bgMusicAudio) {
        bgMusicAudio = new window.Audio(AUDIO_SOURCES.calm[0]);
        bgMusicAudio.loop = true;
        bgMusicAudio.volume = 0.28;

        let srcIndex = 0;
        bgMusicAudio.onerror = () => {
          srcIndex++;
          if (srcIndex < AUDIO_SOURCES.calm.length && bgMusicAudio) {
            bgMusicAudio.src = AUDIO_SOURCES.calm[srcIndex];
            bgMusicAudio.play().catch(() => {});
          }
        };
      }

      bgMusicAudio.volume = 0.28;
      const promise = bgMusicAudio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser blocked autoplay, start procedural ambient soundscape
          startSynthesizedAmbientDrone();
        });
      }
    } catch (e) {
      startSynthesizedAmbientDrone();
    }
  } else {
    startSynthesizedAmbientDrone();
  }
};

/**
 * Creates a soothing, gentle ambient meditation chord in Web Audio API.
 * Peaceful, relaxing, never jarring, loops infinitely.
 */
function startSynthesizedAmbientDrone() {
  const ctx = getAudioContext();
  if (!ctx || isAmbientPlaying) return;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    isAmbientPlaying = true;
    ambientOscillators = [];

    ambientGainNode = ctx.createGain();
    ambientGainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    ambientGainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.5); // smooth fade in

    // Low-pass warm filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, ctx.currentTime);

    // Warm Major 9th chord frequencies: C3 (130.8), G3 (196.0), B3 (246.9), E4 (329.6)
    const chordFrequencies = [130.81, 196.0, 246.94, 329.63];

    chordFrequencies.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(ambientGainNode);
      osc.start();
      ambientOscillators.push(osc);
    });

    ambientGainNode.connect(filter);
    filter.connect(ctx.destination);
  } catch (e) {}
}

/**
 * Stops or pauses background music smoothly
 */
export const stopCalmMusic = () => {
  try {
    if (bgMusicAudio) {
      bgMusicAudio.pause();
      bgMusicAudio.currentTime = 0;
    }
  } catch (e) {}

  try {
    if (isAmbientPlaying && ambientGainNode && audioContext) {
      ambientGainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      setTimeout(() => {
        ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (err) {}
        });
        ambientOscillators = [];
        isAmbientPlaying = false;
      }, 350);
    }
  } catch (e) {}
};

// Aliases so all previous calls work seamlessly
export const startMillionaireMusic = startCalmMusic;
export const stopMillionaireMusic = stopCalmMusic;
