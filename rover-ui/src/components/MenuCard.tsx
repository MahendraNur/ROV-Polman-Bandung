import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: string;
}

export const MenuCard: React.FC<Props> = ({ title, description, icon }) => (
  <div className="bg-[#111827] hover:bg-[#1a2333] p-6 rounded-xl border border-slate-800 transition-all cursor-pointer group shadow-lg flex flex-col justify-between min-h-[160px]">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-slate-100 text-lg leading-tight w-2/3">{title}</h3>
      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors text-xl">
        {icon}
      </div>
    </div>
    <p className="text-sm text-slate-500 mt-4 line-clamp-2 font-light">{description}</p>
  </div>
);