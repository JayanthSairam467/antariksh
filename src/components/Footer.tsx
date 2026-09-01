import React from 'react';
import { PageId } from '../types';
import { Radio, ShieldCheck, Terminal, Heart, ExternalLink, Cpu, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenSimulator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSimulator }) => {
  return (
    <footer className="relative z-10 bg-white border-t border-slate-200 pt-12 pb-8 text-slate-600 text-xs">
      {/* Tri-ranga Accent Strip at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-1 tiranga-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200">
          
          {/* Col 1: Project Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <Radio className="w-4 h-4 text-orange-600" />
              </div>
              <span className="font-extrabold text-base text-slate-900 font-display uppercase tracking-tight">
                ANTARIKSH<span className="text-orange-600 ml-1">KWS</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Low-Latency, Resource-Efficient Voice Activator for Edge Devices (ESP32).
              Built for <strong className="text-slate-900">Smart India Hackathon 2024 (SIH26172)</strong>, sponsored by <strong className="text-orange-600">ISRO</strong>.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[11px] font-mono-tech text-emerald-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-semibold">100% Open-Source Pipeline</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 font-display text-xs tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>Project Navigation</span>
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-orange-600 transition-colors cursor-pointer text-slate-600">
                  Overview & Landing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('problem')} className="hover:text-orange-600 transition-colors cursor-pointer text-slate-600">
                  Problem Statement (SIH26172)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solution')} className="hover:text-orange-600 transition-colors cursor-pointer text-slate-600">
                  Hybrid Edge-Cloud Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tech')} className="hover:text-orange-600 transition-colors cursor-pointer text-slate-600">
                  Technology Stack & Licenses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('benchmarks')} className="hover:text-orange-600 transition-colors cursor-pointer text-slate-600">
                  Results & Hardware Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-orange-600 transition-colors cursor-pointer text-slate-600">
                  Team & Project Details
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech & Open-Source Stack */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 font-display text-xs tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Open-Source Stack</span>
            </h4>
            <ul className="space-y-1.5 font-mono-tech text-[11px]">
              <li className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">ESP-IDF / FreeRTOS</span>
                <span className="text-slate-500">Apache 2.0</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">TensorFlow Lite Micro</span>
                <span className="text-slate-500">Apache 2.0</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Vosk ASR Server</span>
                <span className="text-slate-500">Apache 2.0</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">whisper.cpp</span>
                <span className="text-slate-500">MIT</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Custom Antariksh KWS</span>
                <span className="text-emerald-600 font-semibold">Open Hackathon</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Evaluation Quick Test */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 font-display text-xs tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Interactive Testbench</span>
            </h4>
            <p className="text-xs text-slate-600">
              Test keyword spotting & audio streaming in our real-time hardware telemetry simulator.
            </p>
            <button
              onClick={onOpenSimulator}
              className="w-full px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold font-display uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5 text-white" />
              Launch Hardware Simulator
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Antariksh KWS • Smart India Hackathon (<strong className="text-slate-800">SIH26172</strong>) • Sponsored by <strong className="text-orange-600 font-bold">ISRO</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Low Latency Voice Activator</span>
            <span>•</span>
            <span className="text-emerald-700 font-mono-tech font-bold">🇮🇳 Indigenous Edge Computing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
