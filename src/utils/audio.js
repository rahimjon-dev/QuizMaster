import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const SOUND_STORAGE_KEY = '@quizmaster_sound_enabled';
const MUSIC_STORAGE_KEY = '@quizmaster_music_enabled';

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
      audioContext.resume();
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
 * Play a synthesized sound frequency pattern using Web Audio API
 * @param {'click' | 'success' | 'wrong' | 'toggle'} type
 */
export const playSound = async (type = 'click') => {
  const enabled = await isSoundEnabled();
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'toggle') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'success') {
      // Pleasant high chime
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.15); // G5
      gain2.gain.setValueAtTime(0.2, now + 0.15);
      gain2.gain.linearRampToValueAtTime(0.01, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.3);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.4);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Audio playback error can be safely ignored
  }
};

// -------------------------------------------------------------
// "KIM MILLIONER BO'LMOQCHI" (MILLIONAIRE) SUSPENSE MUSIC ENGINE
// -------------------------------------------------------------

let millionaireMusicState = {
  isPlaying: false,
  gainNode: null,
  droneOsc: null,
  padOsc1: null,
  padOsc2: null,
  pulseInterval: null,
};

/**
 * Starts the dramatic "Kim millioner bo'lmoqchi" suspense soundtrack:
 * 1. Deep sub-bass tension drone
 * 2. Second-by-second heartbeat / countdown clock tick
 * 3. Atmospheric minor harmonics
 */
export const startMillionaireMusic = async () => {
  const enabled = await isMusicEnabled();
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (millionaireMusicState.isPlaying) return;

  try {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);
    masterGain.connect(ctx.destination);

    // 1. Deep Sub-bass Suspense Drone (73.4Hz D2)
    const droneOsc = ctx.createOscillator();
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(140, ctx.currentTime);

    droneOsc.type = 'sawtooth';
    droneOsc.frequency.setValueAtTime(73.42, ctx.currentTime);
    droneOsc.connect(droneFilter);
    droneFilter.connect(masterGain);
    droneOsc.start();

    // 2. Ambient Tension Pad (Minor suspense harmony)
    const padOsc1 = ctx.createOscillator();
    const padOsc2 = ctx.createOscillator();
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'bandpass';
    padFilter.frequency.setValueAtTime(320, ctx.currentTime);
    padFilter.Q.setValueAtTime(3, ctx.currentTime);

    padOsc1.type = 'sine';
    padOsc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3
    padOsc2.type = 'sine';
    padOsc2.frequency.setValueAtTime(155.56, ctx.currentTime); // Eb3 tension half-step

    padOsc1.connect(padFilter);
    padOsc2.connect(padFilter);
    padFilter.connect(masterGain);
    padOsc1.start();
    padOsc2.start();

    // 3. Heartbeat & Clock Countdown Tension Pulse (every 1 second)
    const playTensionBeat = () => {
      if (!millionaireMusicState.isPlaying) return;
      try {
        const beatNow = ctx.currentTime;
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();

        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(95, beatNow);
        kickOsc.frequency.exponentialRampToValueAtTime(38, beatNow + 0.12);

        kickGain.gain.setValueAtTime(0.26, beatNow);
        kickGain.gain.exponentialRampToValueAtTime(0.001, beatNow + 0.14);

        kickOsc.connect(kickGain);
        kickGain.connect(ctx.destination);

        kickOsc.start(beatNow);
        kickOsc.stop(beatNow + 0.15);

        // High subtle clock tick
        const tickOsc = ctx.createOscillator();
        const tickGain = ctx.createGain();
        tickOsc.type = 'triangle';
        tickOsc.frequency.setValueAtTime(800, beatNow + 0.02);
        tickOsc.frequency.exponentialRampToValueAtTime(400, beatNow + 0.06);

        tickGain.gain.setValueAtTime(0.06, beatNow + 0.02);
        tickGain.gain.linearRampToValueAtTime(0.001, beatNow + 0.07);

        tickOsc.connect(tickGain);
        tickGain.connect(ctx.destination);

        tickOsc.start(beatNow + 0.02);
        tickOsc.stop(beatNow + 0.08);
      } catch (e) {}
    };

    playTensionBeat();
    const pulseInterval = setInterval(playTensionBeat, 1000);

    millionaireMusicState = {
      isPlaying: true,
      gainNode: masterGain,
      droneOsc,
      padOsc1,
      padOsc2,
      pulseInterval,
    };
  } catch (e) {
    console.warn('Suspense music error:', e);
  }
};

export const stopMillionaireMusic = () => {
  if (!millionaireMusicState.isPlaying) return;

  try {
    const ctx = getAudioContext();
    if (ctx && millionaireMusicState.gainNode) {
      millionaireMusicState.gainNode.gain.linearRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.25
      );
    }

    if (millionaireMusicState.pulseInterval) {
      clearInterval(millionaireMusicState.pulseInterval);
    }

    setTimeout(() => {
      try {
        if (millionaireMusicState.droneOsc) millionaireMusicState.droneOsc.stop();
        if (millionaireMusicState.padOsc1) millionaireMusicState.padOsc1.stop();
        if (millionaireMusicState.padOsc2) millionaireMusicState.padOsc2.stop();
      } catch {}
      millionaireMusicState = {
        isPlaying: false,
        gainNode: null,
        droneOsc: null,
        padOsc1: null,
        padOsc2: null,
        pulseInterval: null,
      };
    }, 300);
  } catch (e) {
    millionaireMusicState.isPlaying = false;
  }
};
