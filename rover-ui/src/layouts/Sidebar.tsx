import React from 'react';

interface SidebarProps {
  currentView: string;
  setView: (view: 'home' | 'live') => void;
  isDarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isDarkMode }) => {
  return (
    // Spacer: Mengamankan ruang 64px (w-16) agar konten kanan tidak tertabrak
    <div className="w-16 flex-shrink-0 h-full z-50">
      
      {/* Sidebar Asli: Melayang dan melebar saat di-hover */}
      <aside 
        className={`fixed left-0 top-0 h-full group flex flex-col shadow-2xl transition-all duration-300 ease-in-out border-r overflow-hidden
          w-16 hover:w-64
          ${isDarkMode ? 'bg-[#111827] border-white/10' : 'bg-slate-100 border-black/10'}
        `}
      >
        {/* Header / Logo (Dijamin tidak gepeng) */}
        <div className="h-16 flex items-center border-b border-white/5 flex-shrink-0 w-full">
          <div className="w-16 flex items-center justify-center flex-shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              R
            </div>
          </div>
          <span className="font-black text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity tracking-tighter text-slate-200">
            ROV <span className="text-blue-500">MENU</span>
          </span>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 py-4 space-y-2 w-full">
          <button 
            onClick={() => setView('home')}
            className={`w-full flex items-center h-12 transition-colors relative ${
              currentView === 'home' ? 'text-blue-500' : isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:bg-black/5'
            }`}
          >
            {/* Garis biru penanda aktif */}
            {currentView === 'home' && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-md"></div>}
            
            <div className="w-16 flex items-center justify-center flex-shrink-0 text-xl">🏠</div>
            <span className="font-bold text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">HOME MENU</span>
          </button>
          
          <button 
            onClick={() => setView('live')}
            className={`w-full flex items-center h-12 transition-colors relative ${
              currentView === 'live' ? 'text-blue-500' : isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:bg-black/5'
            }`}
          >
            {currentView === 'live' && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-md"></div>}
            <div className="w-16 flex items-center justify-center flex-shrink-0 text-xl">📊</div>
            <span className="font-bold text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">LIVE TELEMETRY</span>
          </button>
        </nav>

        {/* Footer / Pirate Mode */}
        <div className="h-14 border-t border-white/5 flex items-center flex-shrink-0 w-full overflow-hidden bg-black/20">
           <div className="w-16 flex items-center justify-center flex-shrink-0 text-lg">🏴‍☠️</div>
           <span className="font-black text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase text-slate-500">Pirate Mode</span>
        </div>
      </aside>

    </div>
  );
};