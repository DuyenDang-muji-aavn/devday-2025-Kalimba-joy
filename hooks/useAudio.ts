
import { useRef, useCallback } from 'react';

// This guard prevents errors during server-side rendering
const AudioContext = window.AudioContext || (window as any).webkitAudioContext || null;

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNote = useCallback((frequency: number) => {
    if (!AudioContext) {
      console.warn('Web Audio API is not supported in this browser.');
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const context = audioContextRef.current;
    
    if (context.state === 'suspended') {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine'; // A sine wave is a gentle tone similar to a kalimba
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    gainNode.gain.setValueAtTime(0.5, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.5);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 1.5);
  }, []);

  return { playNote };
};
