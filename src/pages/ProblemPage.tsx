import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Wifi, 
  WifiOff, 
  DollarSign, 
  EyeOff, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { problemStatementInfo } from '../data/projectData';

interface ProblemPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProblemPage: React.FC<ProblemPageProps> = ({ onNavigate }) => {
  const [interactiveStreamTime, setInteractiveStreamTime] = useState<number>(30); // 30 days active

  return (
    <div className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      
      {/* Header Badge & Title */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-mono-tech shadow-xs">
          <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
          <span className="font-semibold">SIH26172 • Sponsored by ISRO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
          The Problem Statement: <br className="hidden sm:inline"/>
          <span className="text-orange-600">
            Why Cloud-Only Voice Processing Fails at the Edge
          </span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
          Traditional voice assistants (Amazon Alexa, Google Home, Siri) and standard IoT setups rely on continuously streaming raw microphone audio or high-latency multi-tier cloud handshakes. In space mission telemetry, industrial IoT, and embedded defense devices, this model is fatal.
        </p>
      </div>

      {/* 3 Core Failures of Cloud-Only Voice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        
        {/* Failure 1: High Latency */}
        <div className="rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display uppercase">1. Crippling Latency (650 - 950ms)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sending every acoustic frame over cellular/satellite links to cloud clusters introduces network roundtrip jitter, TLS handshake overhead, and queue delays before speech is even parsed.
          </p>
          <div className="p-2.5 rounded-lg bg-orange-50/70 border border-orange-200 text-[11px] font-mono-tech text-orange-800 font-semibold">
            Antariksh Target: &lt; 70ms local wake response
          </div>
        </div>

        {/* Failure 2: Privacy Invasion & Eavesdropping */}
        <div className="rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <EyeOff className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display uppercase">2. Severe Privacy Invasions</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Continuous cloud streaming requires microphones to transmit confidential conversations, room chatter, and classified mission control background noise to third-party cloud servers 24/7.
          </p>
          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[11px] font-mono-tech text-amber-800 font-semibold">
            Antariksh Guarantee: 0 bytes leaves device until triggered
          </div>
        </div>

        {/* Failure 3: Bandwidth & Continuous Cost */}
        <div className="rounded-2xl p-6 border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <DollarSign className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display uppercase">3. Massive Bandwidth & Cloud Bills</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            16kHz 16-bit audio produces ~32 KB/sec (~2.7 GB/day per device). For a fleet of 10,000 IoT sensor nodes, this consumes 800+ Terabytes of monthly bandwidth and thousands in API fees.
          </p>
          <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200 text-[11px] font-mono-tech text-rose-800 font-semibold">
            Antariksh Result: 100% idle bandwidth savings
          </div>
        </div>

      </div>

      {/* ANIMATED SIDE-BY-SIDE ARCHITECTURAL COMPARISON DIAGRAM */}
      <section className="my-16 space-y-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-mono-tech uppercase text-orange-600 font-bold tracking-widest mb-1">
            Visual Architecture Comparison
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase">
            Cloud-Only Listening vs. Antariksh Hybrid Edge-Wake
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            See how the data path fundamentally changes when intelligence is pushed to the edge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Approach A: Traditional Cloud-Only (Inferior) */}
          <div className="rounded-2xl p-6 sm:p-8 border border-rose-200 relative overflow-hidden bg-rose-50/30 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-200">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 font-display uppercase">Traditional Cloud-Only Voice</h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-rose-100 border border-rose-300 text-rose-800 font-mono-tech text-xs font-bold">
                FLAWED PARADIGM
              </span>
            </div>

            {/* Architecture Flow */}
            <div className="space-y-4 font-mono-tech text-xs">
              
              <div className="p-3.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Microphone Captures Audio</div>
                    <div className="text-[11px] text-slate-500">All room ambient noise + speech</div>
                  </div>
                </div>
                <span className="text-rose-700 text-[11px] font-semibold">Unchecked</span>
              </div>

              <div className="flex justify-center text-rose-400">
                <div className="h-6 w-0.5 bg-rose-300 relative">
                  <span className="absolute -left-1 top-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Continuous 24/7 Cloud Audio Stream</div>
                    <div className="text-[11px] text-rose-600">Streaming raw PCM 128 kbps over Internet</div>
                  </div>
                </div>
                <span className="text-rose-700 text-[11px] font-semibold">High Risk</span>
              </div>

              <div className="flex justify-center text-rose-400">
                <div className="h-6 w-0.5 bg-rose-300 relative" />
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Proprietary Cloud Server Cluster</div>
                    <div className="text-[11px] text-slate-500">Processes keyword in cloud + logs audio</div>
                  </div>
                </div>
                <span className="text-rose-700 text-[11px] font-semibold">~850ms Delay</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className="mt-6 p-4 rounded-xl bg-rose-100/60 border border-rose-200 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Major Deficiencies:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Total dependence on persistent internet connectivity.</li>
                <li>Zero hardware air-gapping: microphones continuously transmit.</li>
                <li>High recurring cloud API costs and bandwidth saturation.</li>
              </ul>
            </div>
          </div>

          {/* Approach B: Antariksh Hybrid Edge-Wake (Superior) */}
          <div className="rounded-2xl p-6 sm:p-8 border border-emerald-200 relative overflow-hidden bg-emerald-50/30 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 font-display uppercase">Antariksh Hybrid Edge-Wake</h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono-tech text-xs font-bold">
                SIH26172 ARCHITECTURE
              </span>
            </div>

            {/* Architecture Flow */}
            <div className="space-y-4 font-mono-tech text-xs">
              
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">ESP32 On-Device Continuous Listening</div>
                    <div className="text-[11px] text-emerald-700 font-bold">TFLite Micro int8 Model (7.2% CPU, 182KB RAM)</div>
                  </div>
                </div>
                <span className="text-emerald-700 text-[11px] font-bold">100% Offline</span>
              </div>

              <div className="flex justify-center text-emerald-400">
                <div className="h-6 w-0.5 bg-emerald-300 relative">
                  <span className="absolute -left-1 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-orange-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-700 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Hardware Trigger Gate: &quot;Antariksh&quot;</div>
                    <div className="text-[11px] text-orange-600 font-bold">Keyword Detected locally in 18ms (&gt;0.88 Conf)</div>
                  </div>
                </div>
                <span className="text-orange-700 text-[11px] font-bold">Zero Leakage</span>
              </div>

              <div className="flex justify-center text-emerald-400">
                <div className="h-6 w-0.5 bg-emerald-300 relative" />
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Selective Stream to Open ASR (Vosk/Whisper)</div>
                    <div className="text-[11px] text-emerald-700">Pipes subsequent command only. 100% Open Source.</div>
                  </div>
                </div>
                <span className="text-emerald-700 text-[11px] font-bold">64ms Total</span>
              </div>
            </div>

            {/* Benefits Box */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-100/60 border border-emerald-200 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Antariksh Advantages:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Strict privacy: Hardware air-gap until &quot;Antariksh&quot; is spoken.</li>
                <li>Instant response: 18ms inference + 46ms network streaming.</li>
                <li>Zero proprietary lock-in: Uses Vosk & whisper.cpp open-source ASR.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE BANDWIDTH & PRIVACY CALCULATOR */}
      <section className="rounded-3xl p-8 border border-slate-200 bg-white shadow-md my-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono-tech mb-2 font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-orange-600" />
            <span>Interactive Bandwidth & Privacy Impact Calculator</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 font-display uppercase">
            Compare Cumulative Network Consumption
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Adjust the operating duration slider to visualize data savings between continuous cloud streaming vs. Antariksh Edge Spotting.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-slate-700 font-medium">Continuous Operating Duration:</span>
              <span className="text-orange-600 font-bold text-sm">{interactiveStreamTime} Days</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="90"
              value={interactiveStreamTime}
              onChange={(e) => setInteractiveStreamTime(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1 font-mono-tech text-xs">
                <div className="text-rose-700 font-bold uppercase">Cloud-Only Continuous Streaming:</div>
                <div className="text-2xl font-bold text-slate-900">
                  {(interactiveStreamTime * 2.76).toFixed(1)} GB
                </div>
                <div className="text-slate-600 text-[11px]">
                  ~{interactiveStreamTime * 24} hours of unencrypted room audio recorded.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 font-mono-tech text-xs">
                <div className="text-emerald-700 font-bold uppercase">Antariksh Edge Hybrid KWS:</div>
                <div className="text-2xl font-bold text-emerald-700">
                  {(interactiveStreamTime * 0.004).toFixed(3)} GB
                </div>
                <div className="text-emerald-800 text-[11px] font-medium">
                  &gt;99.8% bandwidth reduction • 0 hours background eavesdropping.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIH26172 Constraints Compliance Checklist */}
      <section className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 font-display uppercase">
          SIH26172 Constraint Verification Matrix
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {problemStatementInfo.coreConstraints.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs">
              <div>
                <div className="text-slate-500 font-mono-tech text-[11px] font-medium">{item.name}</div>
                <div className="font-bold text-slate-900 mt-0.5">{item.spec}</div>
              </div>
              <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono-tech text-[10px] font-bold">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Solution */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
        <div className="text-slate-600 text-xs font-mono-tech">
          Next Phase: Technical Deep-Dive & Waveform Flow
        </div>
        <button
          onClick={() => onNavigate('solution')}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <span>Explore Solution Architecture</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
