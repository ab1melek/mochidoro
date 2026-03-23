'use client';

export const useFartSound = () => {
  // Generar sonido de fart usando Web Audio API
  const playFartSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Crear oscilador para el sonido base
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Conectar oscilador al gain y al output
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configurar sonido de fart
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.3);
      
      // Envelope de amplitud
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      // Notas secundarias para más "realismo"
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(120, audioContext.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.25);
      
      gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
      
      // Reproducir
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + 0.25);
    } catch (err) {
      console.log('Audio no disponible');
    }
  };
  
  return { playFartSound };
};
