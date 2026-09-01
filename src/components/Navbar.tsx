import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Rocket, 
  Cpu, 
  Layers, 
  Gauge, 
  Users, 
  Menu, 
  X, 
  Radio, 
  HelpCircle,
  Play,
  Activity
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenSimulator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Overview', icon: Rocket },
    { id: 'problem', label: 'Problem', icon: HelpCircle },
    { id: 'solution', label: 'Architecture', icon: Layers },
    { id: 'tech', label: 'Tech Stack', icon: Cpu },
    { id: 'benchmarks', label: 'Benchmarks', icon: Gauge },
    { id: 'team', label: 'Team', icon: Users },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-xs transition-all">
      {/* National Tri-Color Accent Line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-slate-300 to-emerald-600 shadow-[0_0_8px_rgba(249,115,22,0.2)]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo & Attribution */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 group-hover:border-orange-400 group-hover:shadow-sm transition-all">
              <Radio className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight font-display uppercase group-hover:text-orange-600 transition-colors">
                ANTARIKSH<span className="text-orange-600 ml-0.5">KWS</span>
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono-tech bg-orange-50 text-orange-700 border border-orange-200 font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span>ISRO • SIH26172</span>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-slate-900 bg-slate-100 border border-slate-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-orange-500 to-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Edge Hardware Telemetry Pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Live Edge Telemetry Status Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-[11px] font-mono-tech text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-orange-600 font-bold">ESP32:</span>
            <span className="text-slate-800 font-semibold">182KB RAM</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-semibold">7.2% CPU</span>
          </div>

          <button
            id="nav-open-simulator-btn"
            onClick={onOpenSimulator}
            className="px-3.5 sm:px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs font-display uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white shrink-0" />
            <span>Live Testbench</span>
          </button>

          {/* Mobile/Tablet Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in duration-200">
          <div className="px-2 py-1 text-[11px] font-mono-tech text-slate-600 border-b border-slate-100 mb-2 flex items-center justify-between">
            <span className="text-orange-600 font-bold">Smart India Hackathon • SIH26172</span>
            <span className="text-emerald-600 font-bold">ISRO</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono-tech">
            <div className="text-slate-600">Target MCU: <span className="text-slate-900 font-semibold">ESP32</span></div>
            <div className="text-slate-600">Idle CPU: <span className="text-emerald-600 font-semibold">&lt; 7.2%</span></div>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {isActive && <span className="text-[10px] font-mono-tech text-orange-600 font-bold">ACTIVE</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

