import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InteractiveEdgeSimulatorModal } from './components/InteractiveEdgeSimulatorModal';
import { HomePage } from './pages/HomePage';
import { ProblemPage } from './pages/ProblemPage';
import { SolutionPage } from './pages/SolutionPage';
import { TechStackPage } from './pages/TechStackPage';
import { BenchmarksPage } from './pages/BenchmarksPage';
import { TeamPage } from './pages/TeamPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-orange-500/20 selection:text-orange-900 overflow-x-hidden aerospace-bg">
      
      {/* Subtle Aerospace Ambient Glow Backdrops (Light Mode) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Persistent Official Mission Control Navbar */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Main Page Content with Smooth Transition */}
      <main className="flex-1 relative z-10 w-full max-w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {currentPage === 'home' && (
              <HomePage 
                onNavigate={handleNavigate} 
                onOpenSimulator={() => setSimulatorOpen(true)} 
              />
            )}
            {currentPage === 'problem' && (
              <ProblemPage 
                onNavigate={handleNavigate} 
              />
            )}
            {currentPage === 'solution' && (
              <SolutionPage 
                onNavigate={handleNavigate} 
                onOpenSimulator={() => setSimulatorOpen(true)} 
              />
            )}
            {currentPage === 'tech' && (
              <TechStackPage 
                onNavigate={handleNavigate} 
              />
            )}
            {currentPage === 'benchmarks' && (
              <BenchmarksPage 
                onNavigate={handleNavigate} 
                onOpenSimulator={() => setSimulatorOpen(true)} 
              />
            )}
            {currentPage === 'team' && (
              <TeamPage 
                onNavigate={handleNavigate} 
                onOpenSimulator={() => setSimulatorOpen(true)} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Live Edge Testbench Telemetry Simulator Modal */}
      <InteractiveEdgeSimulatorModal 
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />

    </div>
  );
}

