import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <div className="w-16 flex-shrink-0 h-full z-50">
      <aside className={`fixed left-0 top-0 h-full group flex flex-col shadow-2xl transition-all duration-300 ease-in-out border-r overflow-hidden w-16 hover:w-64 ${isDarkMode ? 'bg-[#111827] border-white/10' : 'bg-slate-100 border-black/10'}`}>
        <div className="h-16 flex items-center border-b border-white/5 flex-shrink-0 w-full">
          <div className="w-16 flex items-center justify-center flex-shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg">R</div>
          </div>
          <span className={`font-black text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ROV MENU</span>
        </div>

        <nav className="flex-1 py-4 space-y-2 w-full">
          {/* Navigasi Pintu 1: Home */}
          <NavLink to="/" className={({ isActive }) => `w-full flex items-center h-12 transition-colors relative ${isActive ? 'text-blue-500' : 'text-slate-500 hover:bg-white/5'}`}>
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-md"></div>}
                <div className="w-16 flex items-center justify-center flex-shrink-0 text-xl">🏠</div>
                <span className="font-bold text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">HOME MENU</span>
              </>
            )}
          </NavLink>
          
          {/* Navigasi Pintu 2: Live Data */}
          <NavLink to="/live" className={({ isActive }) => `w-full flex items-center h-12 transition-colors relative ${isActive ? 'text-blue-500' : 'text-slate-500 hover:bg-white/5'}`}>
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-md"></div>}
                <div className="w-16 flex items-center justify-center flex-shrink-0 text-xl">📊</div>
                <span className="font-bold text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">LIVE DATA</span>
              </>
            )}
          </NavLink>
        </nav>
      </aside>
    </div>
  );
};