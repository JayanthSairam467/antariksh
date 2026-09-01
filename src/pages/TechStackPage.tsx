import React, { useState } from 'react';
import { PageId, TechStackItem } from '../types';
import { techStackList } from '../data/projectData';
import { 
  Cpu, 
  Layers, 
  Radio, 
  Mic, 
  Wifi, 
  Server, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Code2, 
  FileCode,
  Tag
} from 'lucide-react';

interface TechStackPageProps {
  onNavigate: (page: PageId) => void;
}

export const TechStackPage: React.FC<TechStackPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hardware', 'On-Device ML', 'Model Architecture', 'Networking', 'Cloud ASR', 'Toolchain'];

  const filteredItems = selectedCategory === 'All' 
    ? techStackList 
    : techStackList.filter((item) => item.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-orange-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-orange-600" />;
      case 'Radio': return <Radio className="w-5 h-5 text-amber-600" />;
      case 'Mic': return <Mic className="w-5 h-5 text-emerald-600" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-sky-600" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-600" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-purple-600" />;
      default: return <Cpu className="w-5 h-5 text-orange-600" />;
    }
  };

  return (
    <div className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-mono-tech shadow-xs">
          <Cpu className="w-3.5 h-3.5 text-orange-600" />
          <span className="font-semibold">Complete Open-Source Ecosystem</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
          Technology Stack & <br className="hidden sm:inline"/>
          <span className="text-orange-600">
            Open-Source Licensing Compliance
          </span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
          Every component in the Antariksh KWS pipeline—from bare-metal DSP on the ESP32 to server-side ASR—is strictly built on permissive open-source frameworks (Apache 2.0, MIT, BSD), fully satisfying the official <strong className="text-slate-900 font-semibold">SIH26172 ISRO licensing requirement</strong> with zero proprietary vendor lock-in.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 my-8">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tech transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-orange-600 text-white font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {filteredItems.map((tech) => (
          <div
            key={tech.id}
            id={`tech-card-${tech.id}`}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-orange-400 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                  {getIcon(tech.icon)}
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono-tech bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    {tech.license}
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono-tech mt-0.5">
                    {tech.category}
                  </div>
                </div>
              </div>

              {/* Title & Role */}
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-display uppercase">
                  {tech.name}
                </h3>
                <div className="text-xs font-mono-tech text-orange-600 font-semibold mt-0.5">
                  {tech.role} • <span className="text-slate-500">{tech.version}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                  {tech.description}
                </p>
              </div>

              {/* Specifications / Highlights */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold block">
                  Key Specifications:
                </span>
                {tech.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-[11px] text-slate-700 font-mono-tech">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* OPEN-SOURCE LICENSING AUDIT MATRIX TABLE */}
      <section className="mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-extrabold text-slate-900 font-display uppercase">
                Open-Source Licensing Compliance Audit
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Satisfying ISRO Problem Statement SIH26172 requirement for 100% open-source software pipeline.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono-tech font-bold">
            100% AUDIT PASS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-tech">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4">Layer</th>
                <th className="py-3 px-4">License Type</th>
                <th className="py-3 px-4">Commercial / ISRO Use</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">ESP-IDF Framework</td>
                <td className="py-3.5 px-4 text-slate-500">Microcontroller RTOS / HAL</td>
                <td className="py-3.5 px-4 text-orange-700 font-semibold">Apache 2.0 / BSD</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">Permissive / Free</td>
                <td className="py-3.5 px-4"><span className="text-emerald-700 font-bold">✓ Compliant</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">TensorFlow Lite Micro (TFLM)</td>
                <td className="py-3.5 px-4 text-slate-500">On-Device Edge ML Inference</td>
                <td className="py-3.5 px-4 text-orange-700 font-semibold">Apache 2.0</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">Permissive / Free</td>
                <td className="py-3.5 px-4"><span className="text-emerald-700 font-bold">✓ Compliant</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Custom Antariksh DS-CNN Model</td>
                <td className="py-3.5 px-4 text-slate-500">Target Wake Word Weights</td>
                <td className="py-3.5 px-4 text-orange-700 font-semibold">MIT / Open Access</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">Permissive / Free</td>
                <td className="py-3.5 px-4"><span className="text-emerald-700 font-bold">✓ Compliant</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">Vosk ASR Engine (Kaldi)</td>
                <td className="py-3.5 px-4 text-slate-500">Speech-to-Text Server</td>
                <td className="py-3.5 px-4 text-orange-700 font-semibold">Apache 2.0</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">Permissive / Free</td>
                <td className="py-3.5 px-4"><span className="text-emerald-700 font-bold">✓ Compliant</span></td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-slate-900">whisper.cpp</td>
                <td className="py-3.5 px-4 text-slate-500">Optional Fallback ASR</td>
                <td className="py-3.5 px-4 text-orange-700 font-semibold">MIT License</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">Permissive / Free</td>
                <td className="py-3.5 px-4"><span className="text-emerald-700 font-bold">✓ Compliant</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={() => onNavigate('solution')}
          className="text-slate-500 hover:text-slate-900 text-xs font-mono-tech cursor-pointer font-semibold transition-colors"
        >
          ← Back to Architecture
        </button>
        <button
          onClick={() => onNavigate('benchmarks')}
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <span>View Results & Hardware Benchmarks</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};
