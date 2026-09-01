import React, { useEffect, useRef, useState } from 'react';
import { Activity, Mic, Radio, Wifi, Zap, Volume2, ShieldCheck } from 'lucide-react';

interface AudioWaveformVisualizerProps {
  mode?: 'idle' | 'detecting' | 'streaming' | 'success';
  interactive?: boolean;
  onKeywordTrigger?: () => void;
  className?: string;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({
  mode = 'idle',
  interactive = true,
  onKeywordTrigger,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMode, setCurrentMode] = useState<'idle' | 'detecting' | 'streaming' | 'success'>(mode);
  const [confidence, setConfidence] = useState(12);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const animationFrameRef = useRef<number>(0);
  const audioTimeRef = useRef<number>(0);

  // Sync mode prop with local state if changed from outside
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const simulateSpeech = (type: 'antariksh' | 'noise' | 'other_word') => {
    if (type === 'antariksh') {
      setActiveKeyword('Antariksh (अन्तरिक्ष)');
      setCurrentMode('detecting');
      setConfidence(45);

      // Phase 1: Keyword being spoken
      setTimeout(() => {
        setConfidence(94.2);
        setCurrentMode('streaming');
        if (onKeywordTrigger) onKeywordTrigger();
      }, 700);

      // Phase 2: WiFi Streaming to ASR
      setTimeout(() => {
        setCurrentMode('success');
      }, 1600);

      // Reset to idle
      setTimeout(() => {
        setCurrentMode('idle');
        setConfidence(12);
        setActiveKeyword(null);
      }, 3500);
    } else if (type === 'other_word') {
      setActiveKeyword('Random Word ("Alexa / Google")');
      setCurrentMode('detecting');
      setConfidence(28);

      setTimeout(() => {
        setConfidence(14);
        setCurrentMode('idle');
        setActiveKeyword(null);
      }, 1200);
    } else {
      setActiveKeyword('Background Noise / Ambience');
      setCurrentMode('idle');
      setConfidence(8);
      setTimeout(() => {
        setActiveKeyword(null);
      }, 1000);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 120);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 120;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      audioTimeRef.current += 0.05;
      const t = audioTimeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const centerY = height / 2;
      const barCount = Math.floor(width / 6);
      const barWidth = 3;
      const spacing = 3;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + spacing);
        const normX = i / barCount;

        let amplitude = 4; // base ambient noise
        let barColor = 'rgba(100, 116, 139, 0.4)';

        if (currentMode === 'idle') {
          // Subtle low amplitude jitter with Tri-ranga shimmer
          amplitude = 3 + Math.sin(t * 2 + i * 0.3) * 3 + Math.cos(t * 3 + i * 0.8) * 2;
          barColor = 'rgba(248, 250, 252, 0.35)'; // Crisp White
        } else if (currentMode === 'detecting') {
          // Spiky keyword waveform - Vibrant Saffron / Kesariya
          const speechPulse = Math.sin(normX * Math.PI) * Math.sin(t * 8 + i * 0.5);
          amplitude = 8 + Math.abs(speechPulse) * 38 + Math.sin(i * 0.9 + t * 4) * 8;
          barColor = '#f97316'; // Saffron trigger color
        } else if (currentMode === 'streaming') {
          // Fast streaming audio packets - Pristine White with gold edge
          const streamPulse = Math.sin(t * 12 + i * 0.7) * Math.cos(normX * 10);
          amplitude = 12 + Math.abs(streamPulse) * 44 + Math.sin(i * 1.5) * 6;
          barColor = '#f8fafc'; // Pure White
        } else if (currentMode === 'success') {
          // Smooth stable harmonic pulse - India Green / Harit
          amplitude = 10 + Math.sin(t * 4 + i * 0.2) * 16;
          barColor = '#22c55e'; // Green
        }

        const barHeight = Math.min(height - 10, Math.max(4, amplitude));

        // Draw upper and lower mirrored bars
        ctx.fillStyle = barColor;
        ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);

        // Glowing cap points
        if (currentMode === 'streaming' || currentMode === 'detecting') {
          ctx.fillStyle = currentMode === 'streaming' ? '#ffffff' : '#fb923c';
          ctx.fillRect(x, centerY - barHeight / 2 - 1, barWidth, 1.5);
          ctx.fillRect(x, centerY + barHeight / 2, barWidth, 1.5);
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentMode]);

  return (
    <div
      id="waveform-signal-visualizer"
      className={`glass-panel rounded-2xl p-5 border border-slate-200 shadow-md relative overflow-hidden bg-white/90 ${className}`}
    >
      {/* Top Tiranga Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 tiranga-bar" />

      {/* Top Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span
              className={`w-3 h-3 rounded-full block ${
                currentMode === 'idle'
                  ? 'bg-slate-400 animate-pulse'
                  : currentMode === 'detecting'
                  ? 'bg-orange-500 animate-ping'
                  : currentMode === 'streaming'
                  ? 'bg-sky-500 animate-bounce'
                  : 'bg-emerald-500'
              }`}
            />
            <span
              className={`w-3 h-3 rounded-full absolute inset-0 ${
                currentMode === 'idle'
                  ? 'bg-slate-400/50'
                  : currentMode === 'detecting'
                  ? 'bg-orange-500'
                  : currentMode === 'streaming'
                  ? 'bg-sky-500'
                  : 'bg-emerald-500'
              }`}
            />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-mono-tech font-semibold">
              DSP Audio Stream • I2S DMA Ring Buffer (16kHz 16-bit Mono)
            </span>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-display">
              {currentMode === 'idle' && (
                <span className="text-slate-700 flex items-center gap-1">
                  <Mic className="w-3.5 h-3.5 text-orange-600" /> Continuous Listening Mode (Idle: 7.2% CPU Load)
                </span>
              )}
              {currentMode === 'detecting' && (
                <span className="text-orange-600 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-orange-600 animate-pulse" /> Keyword Trigger Evaluation: TFLite Micro DS-CNN
                </span>
              )}
              {currentMode === 'streaming' && (
                <span className="text-sky-600 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-sky-600 animate-pulse" /> Wake Confirmed! Streaming Audio to Vosk ASR Server
                </span>
              )}
              {currentMode === 'success' && (
                <span className="text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Command Acknowledged (Round-trip Latency: 64ms)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Real-time confidence meter */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono-tech">
          <span className="text-slate-600 font-medium">Model Conf:</span>
          <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
            <div
              className={`h-full transition-all duration-300 ${
                confidence > 85 ? 'bg-emerald-500' : confidence > 40 ? 'bg-orange-500' : 'bg-slate-400'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className={`font-bold ${confidence > 85 ? 'text-emerald-700' : confidence > 40 ? 'text-orange-600' : 'text-slate-600'}`}>
            {confidence.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Waveform Canvas Oscilloscope */}
      <div className="relative w-full bg-[#090d16] rounded-xl p-2 border border-slate-800 mb-4 shadow-inner">
        <canvas ref={canvasRef} className="w-full block" />

        {/* Overlay Label when keyword detected */}
        {activeKeyword && (
          <div className="absolute top-2 right-3 px-2.5 py-1 rounded bg-slate-900/95 border border-orange-500/60 text-orange-400 text-xs font-mono-tech flex items-center gap-1.5 shadow-md">
            <Radio className="w-3 h-3 text-orange-400 animate-spin" />
            <span>Sample: {activeKeyword}</span>
          </div>
        )}
      </div>

      {/* Interactive Trigger Buttons */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="text-slate-600 font-mono-tech flex items-center gap-1 font-medium">
            <Volume2 className="w-3.5 h-3.5 text-orange-600" />
            <span>Simulate Acoustic Input to ESP32:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="simulate-antariksh-btn"
              onClick={() => simulateSpeech('antariksh')}
              className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold font-display uppercase tracking-wider text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
              Speak &quot;Antariksh&quot;
            </button>
            <button
              id="simulate-other-btn"
              onClick={() => simulateSpeech('other_word')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all active:scale-95 text-xs font-medium cursor-pointer"
            >
              Speak &quot;Alexa / Google&quot; (Reject)
            </button>
            <button
              id="simulate-noise-btn"
              onClick={() => simulateSpeech('noise')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all active:scale-95 text-xs cursor-pointer"
            >
              Room Noise (Idle)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
