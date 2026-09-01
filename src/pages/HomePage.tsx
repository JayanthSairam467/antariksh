import React from 'react';
import { PageId } from '../types';
import { 
  Radio, 
  Cpu, 
  Zap, 
  Layers, 
  Gauge, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Play, 
  Activity, 
  Lock, 
  Wifi, 
  Server,
  Microchip,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { AudioWaveformVisualizer } from '../components/AudioWaveformVisualizer';
import { initialBenchmarkData } from '../data/projectData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenSimulator: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSimulator }) => {
  return (
    <div className="relative z-10 pt-24 sm:pt-28 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        
        {/* Attribution Badges with modern glowing pill styling */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-mono-tech shadow-xs">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span className="font-bold">Smart India Hackathon 2024</span>
            <span className="text-slate-300">•</span>
            <span className="text-orange-600 font-bold">SIH26172</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono-tech shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Problem Owner: <strong className="text-slate-900 font-bold">ISRO</strong> (Indian Space Research Organisation)</span>
          </div>
        </div>

        {/* Hero Title & Typography with Ultra-Bold Wide Geometric Archetype */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-900 font-display leading-[1.05] uppercase">
            ANTARIKSH <span className="tiranga-gradient-text">KWS</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-slate-800 font-display uppercase tracking-tight">
            Ultra-Low Latency & Resource-Efficient Voice Activator for Edge Microcontrollers
          </p>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Eliminating cloud latency and 24/7 eavesdropping on embedded space & IoT systems.
            A custom int8 Keyword Spotting (KWS) engine running autonomously on the <strong className="text-slate-900 font-semibold">ESP32</strong> (SRAM &lt; 182KB, idle CPU &lt; 7.2%), streaming audio to open-source ASR (<strong className="text-slate-900 font-semibold">Vosk / whisper.cpp</strong>) only upon detecting the custom wake word <em className="text-orange-600 font-bold not-italic">&quot;Antariksh&quot;</em> (अन्तरिक्ष).
          </p>
        </div>

        {/* Real-time Hardware Metrics - High-Tech Telemetry Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-8 max-w-4xl">
          <div className="glass-panel-saffron rounded-2xl p-4 transition-all hover:scale-[1.02] shadow-sm">
            <div className="text-[11px] font-mono-tech text-orange-700 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>SRAM Footprint</span>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1 tracking-tight">
              {initialBenchmarkData.efficiency.ramUsageKb} <span className="text-sm font-bold text-orange-600">KB</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono-tech mt-0.5">&lt; 256KB constraint (71% used)</div>
          </div>

          <div className="glass-panel-cyan rounded-2xl p-4 transition-all hover:scale-[1.02] shadow-sm">
            <div className="text-[11px] font-mono-tech text-sky-700 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>Idle CPU Load</span>
              <span className="w-2 h-2 rounded-full bg-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1 tracking-tight">
              {initialBenchmarkData.efficiency.idleCpuPercent}<span className="text-sm font-bold text-sky-600">%</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono-tech mt-0.5">&lt; 10% strict target limit</div>
          </div>

          <div className="glass-panel-green rounded-2xl p-4 transition-all hover:scale-[1.02] shadow-sm">
            <div className="text-[11px] font-mono-tech text-emerald-700 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>Trigger Latency</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1 tracking-tight">
              {initialBenchmarkData.latency.totalWakeToStreamMs} <span className="text-sm font-bold text-emerald-600">ms</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono-tech mt-0.5">wake-to-stream pipeline</div>
          </div>

          <div className="glass-panel-saffron rounded-2xl p-4 transition-all hover:scale-[1.02] shadow-sm">
            <div className="text-[11px] font-mono-tech text-amber-800 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>Keyword Accuracy</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-1 tracking-tight">
              {initialBenchmarkData.accuracy.truePositiveRate}<span className="text-sm font-bold text-amber-600">%</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono-tech mt-0.5">TPR @ 10dB SNR in noisy env</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3.5">
          <button
            id="hero-launch-simulator-btn"
            onClick={onOpenSimulator}
            className="px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold font-display uppercase tracking-wider text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Live Testbench</span>
          </button>

          <button
            id="hero-explore-architecture-btn"
            onClick={() => onNavigate('solution')}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold font-display uppercase tracking-wider text-xs flex items-center gap-2 border border-slate-300 shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="w-4 h-4 text-orange-600" />
          </button>

          <button
            id="hero-view-benchmarks-btn"
            onClick={() => onNavigate('benchmarks')}
            className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold font-display uppercase tracking-wider text-xs border border-slate-200 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Gauge className="w-4 h-4 text-emerald-600" />
            <span>Verified Benchmarks</span>
          </button>
        </div>

        {/* Live Audio Visualizer Teaser */}
        <div className="mt-12">
          <AudioWaveformVisualizer interactive={true} onKeywordTrigger={onOpenSimulator} />
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8 text-slate-400 animate-bounce">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-mono-tech tracking-widest uppercase text-slate-500 font-medium">Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 text-orange-500" />
          </div>
        </div>
      </section>

      {/* 2. THREE SUMMARY TEASER CARDS (Problem, Architecture, Results) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono-tech uppercase text-orange-600 tracking-widest mb-2 flex items-center justify-center gap-2 font-bold">
            <span className="w-2 h-0.5 bg-orange-500" />
            <span>Problem Statement • SIH26172</span>
            <span className="w-2 h-0.5 bg-emerald-500" />
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
            Built for Space & Edge Constrained Hardware
          </h3>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Solving the core challenges of hands-free voice processing in resource-starved, mission-critical environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Problem Statement (Saffron Accent) */}
          <div 
            onClick={() => onNavigate('problem')}
            className="glass-panel-saffron rounded-2xl p-6 transition-all hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-600 mb-4 group-hover:shadow-md transition-all">
                <Lock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-xs font-mono-tech text-orange-700 uppercase font-bold tracking-wider mb-1">
                The Challenge • SIH26172
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 font-display uppercase group-hover:text-orange-600 transition-colors">
                Why Cloud-Only Voice Fails
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Piping continuous raw audio to the cloud creates <strong className="text-slate-900">high recurring latency (650-950ms)</strong>, heavy bandwidth drain, and severe privacy risks. On resource-constrained edge chips like ESP32, unoptimized ML causes instant memory overflow.
              </p>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs font-bold text-orange-600 font-display uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>Read Full Problem Statement</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Hybrid Architecture (ISRO Cyan Accent) */}
          <div 
            onClick={() => onNavigate('solution')}
            className="glass-panel-cyan rounded-2xl p-6 transition-all hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 mb-4 group-hover:shadow-md transition-all">
                <Layers className="w-6 h-6 text-sky-600" />
              </div>
              <div className="text-xs font-mono-tech text-sky-700 uppercase font-bold tracking-wider mb-1">
                The Solution • Edge Wake + ASR
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 font-display uppercase group-hover:text-sky-600 transition-colors">
                Hybrid Edge-Cloud Pipeline
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Zero audio leaves the device during idle listening. On-device <strong className="text-slate-900">TFLite Micro DS-CNN</strong> detects &quot;Antariksh&quot; in 18ms. Upon trigger, audio streams instantly over WiFi to open-source <strong className="text-slate-900">Vosk/whisper.cpp</strong> ASR.
              </p>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs font-bold text-sky-600 font-display uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>View Step-by-Step Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Results & Benchmarks (Green Accent) */}
          <div 
            onClick={() => onNavigate('benchmarks')}
            className="glass-panel-green rounded-2xl p-6 transition-all hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-4 group-hover:shadow-md transition-all">
                <Gauge className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-xs font-mono-tech text-emerald-700 uppercase font-bold tracking-wider mb-1">
                Evaluation Metrics
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 font-display uppercase group-hover:text-emerald-600 transition-colors">
                Benchmarks & Verification
              </h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Evaluated against ISRO&apos;s strict triple metrics: <strong className="text-slate-900">182KB RAM</strong> (under 256KB), <strong className="text-slate-900">7.2% idle CPU</strong> (under 10%), <strong className="text-slate-900">96.8% accuracy</strong>, and <strong className="text-slate-900">64ms total latency</strong>.
              </p>
            </div>

            <div className="pt-6 flex items-center gap-2 text-xs font-bold text-emerald-600 font-display uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>Inspect Benchmarks & Charts</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. ISRO / SPACE CONNECTION CALLOUT - Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden bg-white/95 border border-slate-200 shadow-md">
          {/* Top Tiranga Strip inside card */}
          <div className="absolute top-0 left-0 right-0 h-1.5 tiranga-bar" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-mono-tech border border-orange-200">
                <Radio className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-semibold">ISRO PROBLEM TRACK • &quot;अन्तरिक्ष&quot; (ANTARIKSH)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
                Engineered for High-Reliability Space & Edge IoT Applications
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In space habitats, ground rover telemetry stations, and remote field deployments, internet connectivity is intermittent and bandwidth is precious. Antariksh KWS provides completely autonomous, hands-free edge activation that functions seamlessly whether isolated in a space pod or connected to local private mission control servers.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>100% Offline Wake Detection</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>Zero Cloud Eavesdropping</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Open-Source Licensing</span>
                </div>
              </div>
            </div>

            <div className="glass-panel-saffron rounded-2xl p-5 space-y-3 font-mono-tech text-xs border border-orange-200/80 shadow-xs">
              <div className="text-orange-700 font-bold text-sm border-b border-orange-200 pb-2 flex items-center justify-between">
                <span>PS Specifications Summary</span>
                <span className="text-emerald-700">🇮🇳 SIH26172</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Problem ID:</span>
                <span className="text-orange-600 font-bold">SIH26172</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Target MCU:</span>
                <span className="font-semibold text-slate-900">ESP32 (240MHz Xtensa)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Wake Word:</span>
                <span className="text-orange-600 font-bold">&quot;Antariksh&quot;</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">RAM Budget:</span>
                <span className="font-semibold text-slate-900">&lt; 256 KB SRAM (182KB)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">Idle CPU Target:</span>
                <span className="text-emerald-700 font-bold">&lt; 10% (7.2% actual)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span className="text-slate-500">ASR Backend:</span>
                <span className="font-semibold text-slate-900">Vosk / whisper.cpp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
