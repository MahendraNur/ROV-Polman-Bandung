import { useState } from 'react';
import PwmOutputs from '../components/PwmOutputs';
import OverviewView from '../components/overview/OverviewView'; 

export default function VehicleSetup() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full h-screen bg-gray-950 p-8 text-white overflow-hidden">
      
      {/* JUDUL */}
      <h1 className="text-2xl font-bold mb-6">Vehicle Setup</h1>

      {/* TAB NAVIGATION */}
      <div className="flex space-x-8 border-b border-gray-700 mb-6">
        <TabButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="OVERVIEW" />
        <TabButton isActive={activeTab === 'pwm'} onClick={() => setActiveTab('pwm')} label="PWM OUTPUTS" />
        <TabButton isActive={activeTab === 'configure'} onClick={() => setActiveTab('configure')} label="CONFIGURE" />
      </div>

      {/* KONTEN DINAMIS */}
      <div className="mt-4">
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'pwm' && <PwmOutputs />}
        {activeTab === 'configure' && <div className="text-gray-400">Tampilan Configure (Segera diisi!)</div>}
      </div>
      
    </div>
  );
}

function TabButton({ isActive, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`pb-2 font-semibold transition-all ${
        isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
