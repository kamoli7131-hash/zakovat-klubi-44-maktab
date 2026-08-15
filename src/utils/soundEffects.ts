// Web Audio API Synthesizer for Zakovat Sound Effects (Gong, Ticking, Fanfare, Chimes)

class SoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Authentic Zakovat Starting Gong (Deep harmonic metallic bell resonance)
  playGong() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Fundamental and overtone frequencies for a rich orchestral gong
      const frequencies = [130.81, 261.63, 392.00, 523.25, 784.00];
      const gains = [0.6, 0.4, 0.3, 0.2, 0.1];

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + 3.5);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(gains[i] * 0.5, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.8);
      });
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  // Ticking sound for the 60s countdown
  playTick(isUrgent = false) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isUrgent ? 880 : 587.33, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

      gainNode.gain.setValueAtTime(isUrgent ? 0.35 : 0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn(e);
    }
  }

  // 10-Second Warning Chime
  playWarningChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gainNode.gain.setValueAtTime(0.001, now + idx * 0.08);
        gainNode.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.85);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Time is Up Finish Gong
  playTimesUp() {
    this.playGong();
  }

  // Correct Answer Victorious Fanfare
  playSuccess() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gainNode.gain.setValueAtTime(0.001, now + idx * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.25, now + idx * 0.1 + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + (idx === notes.length - 1 ? 1.2 : 0.4));

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.25);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Wrong Answer Soft Chime
  playWrong() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [370, 311, 277];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);

        gainNode.gain.setValueAtTime(0.001, now + idx * 0.15);
        gainNode.gain.linearRampToValueAtTime(0.15, now + idx * 0.15 + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 0.4);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.45);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Duel Buzzer Sound
  playBuzzer() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);

      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn(e);
    }
  }

  // Play Sample Classical / Audio question snippet
  playMelodySnippet(melodyType: string = 'classic') {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Fur Elise / Beethoven 5th motif snippet
      const notes = [
        { f: 659.25, d: 0.2 }, { f: 622.25, d: 0.2 }, { f: 659.25, d: 0.2 },
        { f: 622.25, d: 0.2 }, { f: 659.25, d: 0.2 }, { f: 493.88, d: 0.2 },
        { f: 587.33, d: 0.2 }, { f: 523.25, d: 0.2 }, { f: 440.00, d: 0.5 }
      ];

      let cumulative = 0;
      notes.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.f, now + cumulative);

        gain.gain.setValueAtTime(0.001, now + cumulative);
        gain.gain.linearRampToValueAtTime(0.2, now + cumulative + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + cumulative + item.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + cumulative);
        osc.stop(now + cumulative + item.d + 0.05);

        cumulative += item.d;
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

export const soundEffects = new SoundSynthesizer();
