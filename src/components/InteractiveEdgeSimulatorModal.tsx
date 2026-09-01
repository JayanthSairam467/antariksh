import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  Cpu, 
  Wifi, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RefreshCw, 
  Shield, 
  Zap, 
  Radio, 
  Volume2, 
  Clock, 
  Terminal, 
  Sparkles 
} from 'lucide-react';
import { TelemetryLog } from '../types';

interface InteractiveEdgeSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveEdgeSimulatorModal: React.FC<InteractiveEdgeSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [testPhrase, setTestPhrase] = useState<'antariksh_lights' | 'antariksh_temperature' | 'false_alexa' | 'ambient_noise'>('antariksh_lights');
  const [pipelineState, setPipelineState] = useState<'IDLE' | 'SAMPLING' | 'MFCC_INFERENCE' | 'TRIGGER_GATE' | 'WIFI_STREAMING' | 'ASR_TRANSCRIBING' | 'COMPLETE'>('IDLE');
  const [confidenceScore, setConfidenceScore] = useState<number>(0.08);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [executionTimeline, setExecutionTimeline] = useState<{ step: string; ms: number; status: string }[]>([]);
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([
    {
      id: '1',
      timestamp: '00:00.012',
      level: 'INFO',
      subsystem: 'I2S_DMA',
      message: 'ESP32 I2S DMA initialized at 16000Hz 16-bit mono. Ring buffer ready.',
    },
    {
      id: '2',
      timestamp: '00:00.045',
      level: 'INFO',
      subsystem: 'TFLITE_KWS',
      message: 'TFLM Arena allocated 182 KB SRAM. Model weights validated in flash.',
    },
    {
      id: '3',
      timestamp: '00:00.080',
      level: 'INFO',
      subsystem: 'WIFI_STREAM',
      message: 'WiFi station connected (192.168.1.104). UDP streamer standby.',
    },
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const runSimulation = () => {
    setPipelineState('SAMPLING');
    setExecutionTimeline([]);
    setTranscribedText('');

    const isAntariksh = testPhrase.startsWith('antariksh');
    const targetCommand = 
      testPhrase === 'antariksh_lights' ? 'अन्तरिक्ष, activate payload sensors' :
      testPhrase === 'antariksh_temperature' ? 'अन्तरिक्ष, report battery telemetry' :
      testPhrase === 'false_alexa' ? 'Hey Alexa, set a timer' : 'Background wind & machinery noise';

    const newLogs: TelemetryLog[] = [...telemetryLogs];
    const pushLog = (level: TelemetryLog['level'], subsystem: TelemetryLog['subsystem'], message: string) => {
      newLogs.push({
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString().substring(14, 22),
        level,
        subsystem,
        message,
      });
      setTelemetryLogs([...newLogs]);
    };

    pushLog('INFO', 'I2S_DMA', `Mic DMA stream incoming audio frame: "${targetCommand}"`);

    // Step 1: Sampling & DMA
    setTimeout(() => {
      setPipelineState('MFCC_INFERENCE');
      setExecutionTimeline((prev) => [...prev, { step: '1. I2S DMA Audio Frame Ingestion', ms: 4, status: 'OK' }]);
      pushLog('INFO', 'TFLITE_KWS', 'Computed 40-band MFCC Spectrogram. Feeding 180ms tensor into TFLite DS-CNN.');
    }, 250);

    // Step 2: Inference
    setTimeout(() => {
      const conf = isAntariksh ? 0.942 : testPhrase === 'false_alexa' ? 0.184 : 0.041;
      setConfidenceScore(conf);
      setPipelineState('TRIGGER_GATE');
      setExecutionTimeline((prev) => [...prev, { step: '2. TFLite Micro int8 Inference', ms: 18, status: 'OK' }]);

      if (isAntariksh) {
        pushLog('TRIGGER', 'TFLITE_KWS', `🎯 WAKE WORD "Antariksh" DETECTED! Softmax Confidence: ${(conf * 100).toFixed(1)}% (Threshold > 88.0%)`);
      } else {
        pushLog('WARN', 'TFLITE_KWS', `⛔ Non-target phrase rejected. Softmax Confidence: ${(conf * 100).toFixed(1)}% < 88.0% threshold.`);
      }
    }, 600);

    // Step 3: Trigger Gate or Reject
    setTimeout(() => {
      if (isAntariksh) {
        setPipelineState('WIFI_STREAMING');
        setExecutionTimeline((prev) => [...prev, { step: '3. Wake Trigger Gate (LED Active)', ms: 2, status: 'TRIGGERED' }]);
        pushLog('STREAM', 'WIFI_STREAM', 'Opening zero-copy socket. Streaming buffered pre-roll + live 16kHz audio frames to Vosk ASR.');
      } else {
        setPipelineState('COMPLETE');
        setExecutionTimeline((prev) => [
          ...prev, 
          { step: '3. Trigger Gate (Rejected / Zero Cloud Streaming)', ms: 2, status: 'BLOCKED - PRIVACY PRESERVED' }
        ]);
        setTranscribedText('[NO CLOUD STREAM: Air-gapped privacy maintained]');
      }
    }, 950);

    // Step 4: WiFi Streaming & Vosk ASR
    if (isAntariksh) {
      setTimeout(() => {
        setPipelineState('ASR_TRANSCRIBING');
        setExecutionTimeline((prev) => [...prev, { step: '4. WiFi UDP Audio Packetization', ms: 8, status: 'TRANSMITTED' }]);
        pushLog('INFO', 'ASR_VOSK', 'Vosk ASR Server receiving stream. Running Kaldi acoustic model beam search.');
      }, 1400);

      // Step 5: ASR Complete
      setTimeout(() => {
        setPipelineState('COMPLETE');
        const recognized = 
          testPhrase === 'antariksh_lights' ? '"activate payload sensors"' : '"report battery telemetry"';
        setTranscribedText(recognized);
        setExecutionTimeline((prev) => [
          ...prev, 
          { step: '5. Open-Source Vosk ASR Transcription', ms: 32, status: 'SUCCESS (64ms End-to-End)' }
        ]);
        pushLog('SUCCESS', 'ASR_VOSK', `✅ Transcribed: ${recognized}. Command dispatched to Space IoT controller.`);
      }, 1900);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="edge-simulator-modal-container"
        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header with Tiranga top bar */}
        <div className="h-1 w-full tiranga-bar" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-display uppercase tracking-tight">Antariksh KWS Edge Testbench Simulator</h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono-tech bg-orange-50 text-orange-700 border border-orange-200 font-bold">
                  SIH26172 ISRO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                Interactive real-time execution flow from ESP32 MEMS Mic to Vosk/whisper.cpp ASR.
              </p>
            </div>
          </div>
          <button
            id="close-simulator-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-white text-slate-700">
          {/* Audio Input Selector */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-xs">
            <label className="block text-xs font-mono-tech uppercase text-orange-700 tracking-wider mb-2 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Select Test Acoustic Signal:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                id="test-phrase-lights"
                onClick={() => setTestPhrase('antariksh_lights')}
                className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                  testPhrase === 'antariksh_lights'
                    ? 'bg-orange-50 border-orange-400 text-orange-900 shadow-xs ring-1 ring-orange-400/40'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-orange-700 mb-1">
                  <Zap className="w-3.5 h-3.5 text-orange-600" /> Target Positive 1 (Saffron)
                </div>
                <div className="text-xs font-mono-tech font-bold text-slate-900">
                  &quot;Antariksh, activate payload sensors&quot;
                </div>
              </button>

              <button
                id="test-phrase-temperature"
                onClick={() => setTestPhrase('antariksh_temperature')}
                className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                  testPhrase === 'antariksh_temperature'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs ring-1 ring-emerald-400/40'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" /> Target Positive 2 (Green)
                </div>
                <div className="text-xs font-mono-tech font-bold text-slate-900">
                  &quot;Antariksh, report battery telemetry&quot;
                </div>
              </button>

              <button
                id="test-phrase-alexa"
                onClick={() => setTestPhrase('false_alexa')}
                className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                  testPhrase === 'false_alexa'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs ring-1 ring-amber-400/40'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700 mb-1">
                  <Shield className="w-3.5 h-3.5 text-amber-600" /> Negative Rejection
                </div>
                <div className="text-xs font-mono-tech font-bold text-slate-900">
                  &quot;Hey Alexa, set a timer&quot;
                </div>
              </button>

              <button
                id="test-phrase-noise"
                onClick={() => setTestPhrase('ambient_noise')}
                className={`p-3 rounded-lg text-left transition-all border cursor-pointer ${
                  testPhrase === 'ambient_noise'
                    ? 'bg-slate-100 border-slate-400 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-slate-600" /> Background Noise
                </div>
                <div className="text-xs font-mono-tech font-bold text-slate-900">
                  Room chatter & wind noise
                </div>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono-tech font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>ESP32 Ready: Internal SRAM 182/256 KB • Idle CPU 7.2%</span>
              </div>
              <button
                id="execute-simulator-btn"
                onClick={runSimulation}
                disabled={pipelineState !== 'IDLE' && pipelineState !== 'COMPLETE'}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-display"
              >
                <Play className="w-4 h-4 text-white fill-white" />
                Fire Acoustic Event
              </button>
            </div>
          </div>

          {/* Interactive Pipeline State Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Step 1 */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              pipelineState === 'SAMPLING' ? 'bg-orange-50 border-orange-400 shadow-xs ring-1 ring-orange-400/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">EDGE STEP 1</span>
                <Mic className={`w-4 h-4 ${pipelineState === 'SAMPLING' ? 'text-orange-600 animate-bounce' : 'text-slate-400'}`} />
              </div>
              <div className="font-bold text-slate-900 text-xs">I2S DMA Audio</div>
              <div className="text-[11px] text-slate-500 mt-1 font-normal">16kHz 16-bit ring buffer</div>
            </div>

            {/* Step 2 */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              pipelineState === 'MFCC_INFERENCE' ? 'bg-orange-50 border-orange-400 shadow-xs ring-1 ring-orange-400/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">EDGE STEP 2</span>
                <Cpu className={`w-4 h-4 ${pipelineState === 'MFCC_INFERENCE' ? 'text-orange-600 animate-spin' : 'text-slate-400'}`} />
              </div>
              <div className="font-bold text-slate-900 text-xs">TFLite Micro</div>
              <div className="text-[11px] text-slate-500 mt-1 font-normal">int8 DS-CNN inference (18ms)</div>
            </div>

            {/* Step 3 */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              pipelineState === 'TRIGGER_GATE' ? 'bg-amber-50 border-amber-400 shadow-xs ring-1 ring-amber-400/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">EDGE STEP 3</span>
                <Zap className={`w-4 h-4 ${pipelineState === 'TRIGGER_GATE' ? 'text-amber-600 animate-pulse' : 'text-slate-400'}`} />
              </div>
              <div className="font-bold text-slate-900 text-xs">Threshold Gate</div>
              <div className="text-[11px] text-slate-500 mt-1 font-normal">&gt; 0.88 Softmax check</div>
            </div>

            {/* Step 4 */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              pipelineState === 'WIFI_STREAMING' ? 'bg-blue-50 border-blue-400 shadow-xs ring-1 ring-blue-400/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">NET STEP 4</span>
                <Wifi className={`w-4 h-4 ${pipelineState === 'WIFI_STREAMING' ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
              </div>
              <div className="font-bold text-slate-900 text-xs">WiFi UDP Stream</div>
              <div className="text-[11px] text-slate-500 mt-1 font-normal">Zero-copy audio sockets</div>
            </div>

            {/* Step 5 */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              pipelineState === 'ASR_TRANSCRIBING' ? 'bg-emerald-50 border-emerald-400 shadow-xs ring-1 ring-emerald-400/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">CLOUD STEP 5</span>
                <Server className={`w-4 h-4 ${pipelineState === 'ASR_TRANSCRIBING' ? 'text-emerald-600 animate-bounce' : 'text-slate-400'}`} />
              </div>
              <div className="font-bold text-slate-900 text-xs">Vosk / Whisper ASR</div>
              <div className="text-[11px] text-slate-500 mt-1 font-normal">100% Open-source STT</div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live Metrics */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono-tech text-slate-600 uppercase font-bold">Detection Confidence</span>
                <span className={`text-sm font-bold font-mono-tech ${confidenceScore > 0.88 ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {(confidenceScore * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
                <div 
                  className={`h-full transition-all duration-300 ${
                    confidenceScore > 0.88 ? 'bg-emerald-500' : 'bg-slate-500'
                  }`}
                  style={{ width: `${Math.min(100, confidenceScore * 100)}%` }}
                />
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono-tech text-slate-600 uppercase font-bold">ASR Output Transcription:</span>
                <div className="mt-1 p-3 rounded-lg bg-white border border-slate-200 min-h-[48px] flex items-center font-mono-tech text-xs text-orange-700 font-bold">
                  {transcribedText ? transcribedText : <span className="text-slate-400 italic font-normal">Waiting for acoustic trigger event...</span>}
                </div>
              </div>
            </div>

            {/* Execution Latency Breakdown */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-mono-tech text-slate-600 uppercase font-bold flex items-center justify-between">
                <span>Latency Breakdown:</span>
                <span className="text-emerald-700">Total: 64ms (Target &lt; 150ms)</span>
              </span>

              <div className="space-y-1.5 pt-1">
                {executionTimeline.length === 0 ? (
                  <div className="text-xs text-slate-400 italic p-3 text-center font-normal">
                    Trigger simulation to see real-time hardware execution logs.
                  </div>
                ) : (
                  executionTimeline.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono-tech p-1.5 rounded bg-white border border-slate-200">
                      <span className="text-slate-700">{item.step}</span>
                      <span className="text-orange-700 font-bold">+{item.ms}ms</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Telemetry Console */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-slate-100 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-tech text-slate-300 uppercase font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-orange-400" />
                ESP-IDF & Vosk Real-Time Serial Monitor Log:
              </span>
              <button
                onClick={() => setTelemetryLogs([])}
                className="text-[11px] text-slate-400 hover:text-slate-200 font-mono-tech cursor-pointer font-bold"
              >
                Clear Log
              </button>
            </div>
            <div className="h-36 overflow-y-auto font-mono-tech text-[11px] space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
              {telemetryLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-500 select-none">[{log.timestamp}]</span>
                  <span className={`px-1 rounded text-[10px] ${
                    log.level === 'TRIGGER' ? 'bg-orange-500/20 text-orange-300 font-bold' :
                    log.level === 'STREAM' ? 'bg-slate-100/20 text-slate-200 font-bold' :
                    log.level === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-300 font-bold' :
                    log.level === 'WARN' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
                  }`}>
                    [{log.subsystem}]
                  </span>
                  <span className={log.level === 'TRIGGER' ? 'text-orange-200 font-bold' : log.level === 'SUCCESS' ? 'text-emerald-200 font-bold' : 'text-slate-300'}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <div>
            Built for Smart India Hackathon <strong className="text-slate-900">SIH26172</strong> • Sponsored by <strong className="text-orange-700 font-semibold">ISRO</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium transition-colors cursor-pointer"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
