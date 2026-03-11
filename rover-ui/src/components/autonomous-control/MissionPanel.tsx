import React from 'react';

interface MissionPanelProps {
  goals: Array<any>;
  removeGoal: (id: number) => void;
  activeGoalId: number | null;
  sendToROV: (id: number) => void;
  haltROV: () => void;
}

export const MissionPanel: React.FC<MissionPanelProps> = ({ goals, removeGoal, activeGoalId, sendToROV, haltROV }) => {
  return (
    <div className="flex flex-col h-full">
      <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-2 mb-4">
        Target Dispatcher
      </h4>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-6 min-h-[150px]">
        {goals.map((goal, idx) => {
          const isActive = activeGoalId === goal.id;
          
          return (
            <div key={goal.id} className={`p-3 rounded-lg border transition-all flex justify-between items-center group ${
              isActive ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-black/40 border-white/10'
            }`}>
              
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center border ${
                  isActive ? 'bg-blue-600 text-white border-blue-400' : 'bg-purple-600/20 text-purple-400 border-purple-500/30'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-300">Target {idx + 1}</div>
                  <div className="text-[9px] font-mono text-slate-500">
                    X: <span className="text-blue-400">{goal.rosX}</span> | Y: <span className="text-green-400">{goal.rosY}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Tombol Pesawat Kertas / Stop */}
                {isActive ? (
                  <button onClick={haltROV} className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    🛑 STOP
                  </button>
                ) : (
                  <button onClick={() => sendToROV(goal.id)} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all">
                    ✈️ SEND
                  </button>
                )}
                <button onClick={() => removeGoal(goal.id)} className="text-slate-600 hover:text-red-500 p-1 transition-all">✕</button>
              </div>

            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="text-center text-slate-500 text-[10px] mt-10 uppercase tracking-widest">
            Belum ada target di peta
          </div>
        )}
      </div>
    </div>
  );
};