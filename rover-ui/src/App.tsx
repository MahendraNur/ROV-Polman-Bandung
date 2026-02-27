import { useState, useEffect } from 'react';
import { Sidebar } from './layouts/Sidebar';
import { Navbar } from './layouts/Navbar';
import { Home } from './views/Home';
import { Dashboard } from './views/Dashboard';
import { TelemetryData } from './types/telemetry';

function App() {
  const [view, setView] = useState<'home' | 'live'>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [telemetry, setTelemetry] = useState<TelemetryData>({
    depth: 0.0, heading: 0, voltage: 14.8, status: 'CONNECTED', mode: 'STABILIZE', pitch: 0, roll: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        depth: +(12.5 + Math.random() * 0.4 - 0.2).toFixed(2),
        heading: (prev.heading + 1) % 360,
        voltage: +(14.5 + Math.random() * 0.6).toFixed(1),
        pitch: +(Math.random() * 4 - 2).toFixed(1),
        roll: +(Math.random() * 6 - 3).toFixed(1),
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    // Wrapper Utama: Full Screen & Flex Row
    <div className={`flex h-screen w-full overflow-hidden transition-colors duration-500 font-sans ${isDarkMode ? 'bg-[#0b111a]' : 'bg-slate-50'}`}>
      
      {/* 1. Sidebar Kiri (Lebarnya dikunci 16 / 64px) */}
      <Sidebar currentView={view} setView={setView} isDarkMode={isDarkMode} />

      {/* 2. Area Kerja Kanan (Mengambil sisa ruang flex-1) */}
      <div className={`flex-1 flex flex-col h-full relative transition-colors duration-300 ${isDarkMode ? 'bg-[#1e4e8c]' : 'bg-blue-500'}`}>
        
        {/* Dekorasi Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px] z-0"></div>

        {/* Navbar Atas */}
        <Navbar telemetry={telemetry} isDarkMode={isDarkMode} toggleMode={() => setIsDarkMode(!isDarkMode)} />

        {/* Konten Utama (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 z-10">
          <div className="max-w-7xl mx-auto">
            {view === 'home' ? <Home /> : <Dashboard telemetry={telemetry} />}
          </div>
        </main>

        {/* Footer */}
        <footer className={`h-6 px-6 flex items-center justify-between text-[9px] font-mono border-t z-10 ${
          isDarkMode ? 'bg-[#111827]/90 border-white/10 text-slate-500' : 'bg-white border-black/10 text-slate-600'
        }`}>
          <span className="tracking-widest uppercase">Politeknik Manufaktur Bandung</span>
          <span className="font-bold">SYSTEM_STABLE_v1.0.4</span>
        </footer>

      </div>
    </div>
  );
}

export default App;