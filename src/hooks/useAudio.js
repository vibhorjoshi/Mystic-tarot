import { useRef, useCallback } from 'react';

export function useAudio() {
  const audioRef = useRef({});

  const playSound = useCallback((soundType) => {
    try {
      // Create audio context for web audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      switch (soundType) {
        case 'cardFlip':
          // Generate card flip sound
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
          
        case 'ambient':
          // Generate mystical ambient sound
          const ambientOsc = audioContext.createOscillator();
          const ambientGain = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          ambientOsc.connect(filter);
          filter.connect(ambientGain);
          ambientGain.connect(audioContext.destination);
          
          ambientOsc.frequency.setValueAtTime(220, audioContext.currentTime);
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1000, audioContext.currentTime);
          
          ambientGain.gain.setValueAtTime(0.1, audioContext.currentTime);
          
          ambientOsc.start(audioContext.currentTime);
          ambientOsc.stop(audioContext.currentTime + 2);
          break;
          
        case 'success':
          // Generate success sound
          const successOsc = audioContext.createOscillator();
          const successGain = audioContext.createGain();
          
          successOsc.connect(successGain);
          successGain.connect(audioContext.destination);
          
          successOsc.frequency.setValueAtTime(523, audioContext.currentTime);
          successOsc.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
          successOsc.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
          
          successGain.gain.setValueAtTime(0.2, audioContext.currentTime);
          successGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          successOsc.start(audioContext.currentTime);
          successOsc.stop(audioContext.currentTime + 0.3);
          break;
          
        case 'error':
          // Generate error sound
          const errorOsc = audioContext.createOscillator();
          const errorGain = audioContext.createGain();
          
          errorOsc.connect(errorGain);
          errorGain.connect(audioContext.destination);
          
          errorOsc.frequency.setValueAtTime(200, audioContext.currentTime);
          errorOsc.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
          
          errorGain.gain.setValueAtTime(0.2, audioContext.currentTime);
          errorGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          
          errorOsc.start(audioContext.currentTime);
          errorOsc.stop(audioContext.currentTime + 0.2);
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  const stopSound = useCallback(() => {
    // Stop all audio contexts
    if (audioRef.current.audioContext) {
      audioRef.current.audioContext.close();
    }
  }, []);

  return { playSound, stopSound };
}
