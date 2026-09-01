import React, { useState, useEffect } from 'react';
import { PageId, BenchmarkData, OptimizationComparisonItem } from '../types';
import { initialBenchmarkData, optimizationComparisons } from '../data/projectData';
import { 
  Gauge, 
  Cpu, 
  Clock, 
  Target, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Edit3, 
  Save, 
  RotateCcw, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  Sparkles,
  Info
} from 'lucide-react';

interface BenchmarksPageProps {
  onNavigate: (page: PageId) => void;
  onOpenSimulator: () => void;
}

export const BenchmarksPage: React.FC<BenchmarksPageProps> = ({ onNavigate, onOpenSimulator }) => {
  const [data, setData] = useState<BenchmarkData>(initialBenchmarkData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<BenchmarkData>(initialBenchmarkData);
  const [activeChartMetric, setActiveChartMetric] = useState<'latency' | 'memory' | 'cpu'>('latency');

  // Animated numbers counter effect
  const [counterProgress, setCounterProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = 1 / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= 1) {
        setCounterProgress(1);
        clearInterval(timer);
      } else {
        setCounterProgress(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleSaveEdit = () => {
    setData(tempData);
    setIsEditing(false);
  };

  const handleReset = () => {
    setData(initialBenchmarkData);
    setTempData(initialBenchmarkData);
    setIsEditing(false);
  };

  return (
    <div className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-mono-tech shadow-xs">
            <Gauge className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold">Official Evaluation Criteria • SIH26172</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
            Results & <span className="text-orange-600">Hardware Benchmarks</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Rigorous experimental verification on the <strong className="text-slate-900 font-semibold">ESP32-WROOM (240MHz Xtensa Dual-Core)</strong>. Evaluated on the three official ISRO metrics: <strong className="text-slate-900 font-semibold">Efficiency</strong>, <strong className="text-slate-900 font-semibold">Accuracy</strong>, and <strong className="text-slate-900 font-semibold">Latency</strong>.
          </p>
        </div>

        {/* Edit Benchmarks Toggle Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="toggle-edit-benchmarks-btn"
            onClick={() => {
              if (!isEditing) setTempData(data);
              setIsEditing(!isEditing);
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-orange-600" />
            <span>{isEditing ? 'Cancel Editing' : 'Calibrate / Edit Numbers'}</span>
          </button>
          {isEditing && (
            <button
              id="save-benchmarks-btn"
              onClick={handleSaveEdit}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Values</span>
            </button>
          )}
        </div>
      </div>

      {/* EDIT MODAL / INLINE DRAWER (If isEditing is active) */}
      {isEditing && (
        <div className="my-6 bg-white rounded-2xl p-6 border border-orange-300 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <h3 className="font-extrabold text-sm text-slate-900 font-display uppercase">
                Testbench Hardware Measurement Inputs (Live Calibrator)
              </h3>
            </div>
            <button onClick={handleReset} className="text-xs text-slate-500 hover:text-orange-600 flex items-center gap-1 font-mono-tech cursor-pointer font-semibold transition-colors">
              <RotateCcw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-tech">
            {/* Efficiency inputs */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-orange-600 font-bold uppercase text-[11px] block">1. Efficiency Metrics</span>
              <div>
                <label className="text-slate-600 text-[10px] block font-medium">RAM Usage (KB):</label>
                <input
                  type="number"
                  value={tempData.efficiency.ramUsageKb}
                  onChange={(e) => setTempData({
                    ...tempData,
                    efficiency: { ...tempData.efficiency, ramUsageKb: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-0.5 focus:border-orange-500 focus:outline-hidden shadow-xs"
                />
              </div>
              <div>
                <label className="text-slate-600 text-[10px] block font-medium">Idle CPU Usage (%):</label>
                <input
                  type="number"
                  step="0.1"
                  value={tempData.efficiency.idleCpuPercent}
                  onChange={(e) => setTempData({
                    ...tempData,
                    efficiency: { ...tempData.efficiency, idleCpuPercent: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-0.5 focus:border-orange-500 focus:outline-hidden shadow-xs"
                />
              </div>
            </div>

            {/* Accuracy inputs */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-emerald-700 font-bold uppercase text-[11px] block">2. Accuracy Metrics</span>
              <div>
                <label className="text-slate-600 text-[10px] block font-medium">True Positive Rate (%):</label>
                <input
                  type="number"
                  step="0.1"
                  value={tempData.accuracy.truePositiveRate}
                  onChange={(e) => setTempData({
                    ...tempData,
                    accuracy: { ...tempData.accuracy, truePositiveRate: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-0.5 focus:border-orange-500 focus:outline-hidden shadow-xs"
                />
              </div>
              <div>
                <label className="text-slate-600 text-[10px] block font-medium">False Trigger Rate (per hr):</label>
                <input
                  type="number"
                  step="0.01"
                  value={tempData.accuracy.falseActivationRatePerHour}
                  onChange={(e) => setTempData({
                    ...tempData,
                    accuracy: { ...tempData.accuracy, falseActivationRatePerHour: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-0.5 focus:border-orange-500 focus:outline-hidden shadow-xs"
                />
              </div>
            </div>

            {/* Latency inputs */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-amber-700 font-bold uppercase text-[11px] block">3. Latency Metrics</span>
              <div>
                <label className="text-slate-600 text-[10px] block font-medium">Total Wake-to-Stream (ms):</label>
                <input
                  type="number"
                  value={tempData.latency.totalWakeToStreamMs}
                  onChange={(e) => setTempData({
                    ...tempData,
                    latency: { ...tempData.latency, totalWakeToStreamMs: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-0.5 focus:border-orange-500 focus:outline-hidden shadow-xs"
                />
              </div>
              <div>
                <label className="text-slate-600 text-[10px] block font-medium">TFLite Inference Time (ms):</label>
                <input
                  type="number"
                  value={tempData.latency.tfliteInferenceMs}
                  onChange={(e) => setTempData({
                    ...tempData,
                    latency: { ...tempData.latency, tfliteInferenceMs: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 mt-0.5 focus:border-orange-500 focus:outline-hidden shadow-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. THREE OFFICIAL EVALUATION METRIC CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
        
        {/* CARD 1: EFFICIENCY */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <Cpu className="w-5 h-5 text-orange-600" />
              </div>
              <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono-tech font-bold">
                CRITERIA 1
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 font-display mt-4 uppercase">
              Resource Efficiency
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Memory footprint & continuous listening power profile.
            </p>

            {/* Metric Displays */}
            <div className="mt-6 space-y-4">
              {/* RAM Usage */}
              <div>
                <div className="flex justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-600 font-medium">SRAM Arena Footprint:</span>
                  <span className="text-orange-600 font-bold">
                    {(data.efficiency.ramUsageKb * counterProgress).toFixed(0)} KB / {data.efficiency.ramBudgetKb} KB
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-500 rounded-full"
                    style={{ width: `${(data.efficiency.ramUsageKb / data.efficiency.ramBudgetKb) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono-tech mt-0.5 block">
                  ✓ Fits comfortably within internal ESP32 SRAM (No PSRAM required)
                </span>
              </div>

              {/* Idle CPU */}
              <div>
                <div className="flex justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-600 font-medium">Continuous Idle CPU:</span>
                  <span className="text-emerald-700 font-bold">
                    {(data.efficiency.idleCpuPercent * counterProgress).toFixed(1)}% / {data.efficiency.idleCpuBudgetPercent}% limit
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${(data.efficiency.idleCpuPercent / data.efficiency.idleCpuBudgetPercent) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono-tech mt-0.5 block">
                  ✓ Exceeds ISRO budget of &lt; 10% CPU usage
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech">
            <span className="text-slate-500">Flash Model Binary:</span>
            <span className="text-slate-900 font-bold">{data.efficiency.flashUsageKb} KB (int8)</span>
          </div>
        </div>

        {/* CARD 2: ACCURACY */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono-tech font-bold">
                CRITERIA 2
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 font-display mt-4 uppercase">
              Detection Accuracy & Rejection
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              True-positive keyword spotting vs. false activations in noise.
            </p>

            {/* Metric Displays */}
            <div className="mt-6 space-y-4">
              {/* True Positive */}
              <div>
                <div className="flex justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-600 font-medium">True-Positive Rate (TPR):</span>
                  <span className="text-emerald-700 font-bold text-sm">
                    {(data.accuracy.truePositiveRate * counterProgress).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${data.accuracy.truePositiveRate}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono-tech mt-0.5 block">
                  ✓ Evaluated on Hindi phonetics at 10dB SNR room noise
                </span>
              </div>

              {/* False Activations */}
              <div>
                <div className="flex justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-600 font-medium">False Activation Rate:</span>
                  <span className="text-emerald-700 font-bold">
                    {(data.accuracy.falseActivationRatePerHour * counterProgress).toFixed(2)} / hour
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (0.12 / 1.0) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono-tech mt-0.5 block">
                  ✓ 99.1% rejection on phonetic confusion words
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech">
            <span className="text-slate-500">Clean Speech Accuracy:</span>
            <span className="text-emerald-700 font-bold">{data.accuracy.cleanSpeechAccuracy}%</span>
          </div>
        </div>

        {/* CARD 3: LATENCY */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-mono-tech font-bold">
                CRITERIA 3
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 font-display mt-4 uppercase">
              Activation Latency
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Time from keyword utterance finish to ASR stream receipt.
            </p>

            {/* Metric Displays */}
            <div className="mt-6 space-y-4">
              {/* Total Latency */}
              <div>
                <div className="flex justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-600 font-medium">Total Wake-to-Stream:</span>
                  <span className="text-amber-700 font-bold text-sm">
                    {(data.latency.totalWakeToStreamMs * counterProgress).toFixed(0)} ms / {data.latency.targetBudgetMs}ms budget
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                    style={{ width: `${(data.latency.totalWakeToStreamMs / data.latency.targetBudgetMs) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono-tech mt-0.5 block">
                  ✓ 57% faster than 150ms maximum target threshold
                </span>
              </div>

              {/* TFLite Inference */}
              <div>
                <div className="flex justify-between text-xs font-mono-tech mb-1">
                  <span className="text-slate-600 font-medium">TFLite Micro Inference:</span>
                  <span className="text-orange-600 font-bold">
                    {(data.latency.tfliteInferenceMs * counterProgress).toFixed(0)} ms
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-orange-500 transition-all duration-500 rounded-full"
                    style={{ width: `${(data.latency.tfliteInferenceMs / 50) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono-tech mt-0.5 block">
                  ✓ Optimized via Xtensa SIMD fixed-point DSP kernels
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono-tech">
            <span className="text-slate-500">WiFi Socket Packetization:</span>
            <span className="text-slate-900 font-bold">{data.latency.wifiPacketDispatchMs} ms</span>
          </div>
        </div>

      </div>

      {/* 2. OPTIMIZATION COMPARISON BAR & WATERFALL CHART */}
      <section className="my-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <h3 className="text-xl font-extrabold text-slate-900 font-display uppercase">
                Optimization Comparison: Baseline vs. Antariksh KWS
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Visualizing the dramatic efficiency leaps achieved through int8 quantization & zero-copy streaming.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveChartMetric('latency')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                activeChartMetric === 'latency' ? 'bg-orange-600 text-white font-bold shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Latency (ms)
            </button>
            <button
              onClick={() => setActiveChartMetric('memory')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                activeChartMetric === 'memory' ? 'bg-orange-600 text-white font-bold shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              RAM (KB)
            </button>
            <button
              onClick={() => setActiveChartMetric('cpu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
                activeChartMetric === 'cpu' ? 'bg-orange-600 text-white font-bold shadow-xs' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              Idle CPU (%)
            </button>
          </div>
        </div>

        {/* Visual Bar Comparison Component */}
        <div className="space-y-6 pt-2">
          {activeChartMetric === 'latency' && (
            <div className="space-y-4 font-mono-tech text-xs">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Cloud-Only Continuous Streaming (Baseline)</span>
                  <span className="text-rose-600 font-bold">820 ms</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-slate-200 p-0.5">
                  <div className="h-full bg-rose-500 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold" style={{ width: '100%' }}>
                    820 ms
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Unoptimized Float32 Edge Model</span>
                  <span className="text-amber-600 font-bold">220 ms</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-slate-200 p-0.5">
                  <div className="h-full bg-amber-500 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold" style={{ width: '27%' }}>
                    220 ms
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-900 mb-1">
                  <span className="text-orange-600 font-bold">Antariksh KWS (int8 DS-CNN on ESP32)</span>
                  <span className="text-emerald-700 font-bold">64 ms (12.8x Faster)</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-emerald-300 p-0.5">
                  <div className="h-full bg-emerald-600 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold shadow-xs" style={{ width: '7.8%' }}>
                    64ms
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeChartMetric === 'memory' && (
            <div className="space-y-4 font-mono-tech text-xs">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Unoptimized KWS Model (Float32 weights)</span>
                  <span className="text-rose-600 font-bold">480 KB (Crashes ESP32 256KB SRAM)</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-slate-200 p-0.5">
                  <div className="h-full bg-rose-500 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold" style={{ width: '100%' }}>
                    480 KB (OOM)
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-900 mb-1">
                  <span className="text-orange-600 font-bold">Antariksh Quantized int8 Model</span>
                  <span className="text-emerald-700 font-bold">182 KB (Comfortably fits in 256KB budget)</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-emerald-300 p-0.5">
                  <div className="h-full bg-emerald-600 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold shadow-xs" style={{ width: '38%' }}>
                    182 KB
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeChartMetric === 'cpu' && (
            <div className="space-y-4 font-mono-tech text-xs">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Baseline Continuous TLS/Network Streaming</span>
                  <span className="text-rose-600 font-bold">45% CPU load</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-slate-200 p-0.5">
                  <div className="h-full bg-rose-500 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold" style={{ width: '100%' }}>
                    45%
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-900 mb-1">
                  <span className="text-orange-600 font-bold">Antariksh Idle Listening (DMA + int8 DSP)</span>
                  <span className="text-emerald-700 font-bold">7.2% CPU (Well below 10% ceiling)</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden border border-emerald-300 p-0.5">
                  <div className="h-full bg-emerald-600 rounded flex items-center justify-end pr-2 text-[10px] text-white font-bold shadow-xs" style={{ width: '16%' }}>
                    7.2%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Full Comparison Table */}
        <div className="pt-6 border-t border-slate-200 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-tech">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="py-2.5 px-3">Metric Description</th>
                <th className="py-2.5 px-3">Cloud-Only</th>
                <th className="py-2.5 px-3">Antariksh Edge KWS</th>
                <th className="py-2.5 px-3 text-emerald-700">Net Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {optimizationComparisons.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">{item.metric}</td>
                  <td className="py-3 px-3 text-rose-600 font-semibold">{item.baselineCloudOnly}</td>
                  <td className="py-3 px-3 text-orange-600 font-bold">{item.antarikshOptimized}</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">{item.improvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Latency Waterfall Breakdown */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2 uppercase">
          <Clock className="w-5 h-5 text-orange-600" />
          End-to-End Latency Waterfall Timeline (64 ms Total)
        </h3>
        <p className="text-xs text-slate-500">
          Step-by-step millisecond execution budget from keyword termination to ASR server speech recognition.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono-tech text-xs">
            <span className="text-[10px] text-slate-500 uppercase block font-medium">1. DMA Flush</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">4 ms</div>
            <span className="text-[10px] text-slate-500">I2S Ring Buffer</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono-tech text-xs">
            <span className="text-[10px] text-slate-500 uppercase block font-medium">2. MFCC Features</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">14 ms</div>
            <span className="text-[10px] text-slate-500">ESP-DSP FFT</span>
          </div>

          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 font-mono-tech text-xs">
            <span className="text-[10px] text-orange-700 uppercase block font-bold">3. TFLM Inference</span>
            <div className="text-lg font-bold text-orange-600 mt-0.5">18 ms</div>
            <span className="text-[10px] text-slate-600">int8 DS-CNN</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono-tech text-xs">
            <span className="text-[10px] text-slate-500 uppercase block font-medium">4. Softmax Gate</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">2 ms</div>
            <span className="text-[10px] text-slate-500">&gt;0.88 Conf</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono-tech text-xs">
            <span className="text-[10px] text-slate-500 uppercase block font-medium">5. WiFi Socket</span>
            <div className="text-lg font-bold text-sky-600 mt-0.5">8 ms</div>
            <span className="text-[10px] text-slate-500">UDP Packetize</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-mono-tech text-xs">
            <span className="text-[10px] text-emerald-700 uppercase block font-bold">6. Vosk ASR</span>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">18 ms</div>
            <span className="text-[10px] text-slate-600">1st Token Recv</span>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => onNavigate('tech')}
          className="text-slate-500 hover:text-slate-800 text-xs font-mono-tech cursor-pointer font-semibold transition-colors"
        >
          ← Back to Tech Stack
        </button>
        <button
          onClick={() => onNavigate('team')}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <span>Meet the Team & Submission Details</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
