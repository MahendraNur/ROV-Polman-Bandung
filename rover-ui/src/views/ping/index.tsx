import React, { useState } from 'react';
import { Eye, Radio, Settings2 } from 'lucide-react'; // Menggunakan lucide-react untuk icon

const PingSonarPage = () => {
  const [mavlinkEnabled, setMavlinkEnabled] = useState(true);

  return (
    <div className="p-8 bg-white text-slate-800 font-sans">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-[#1a5f96] flex items-center gap-2 mb-4">
        <span className="text-slate-300">#</span> Ping Sonar Devices
      </h1>
      
      <p className="italic text-gray-600 mb-2">
        <span className="font-bold">Based On:</span> <a href="#" className="text-blue-500 underline">Ping Service</a> | Port: 9110
      </p>
      
      <p className="text-blue-500 text-sm mb-6">New in 1.1</p>

      <p className="mb-4 leading-relaxed">
        The Ping Sonar Devices page shows any detected <a href="#" className="text-blue-500 underline">sonars</a> from the Ping family, 
        including <a href="#" className="text-blue-500 underline">ethernet-configured Ping360s</a> that are visible on the local network 
        (e.g. via an <a href="#" className="text-blue-500 underline">Ethernet Switch</a>).
      </p>

      <ul className="list-disc ml-6 mb-8 space-y-2">
        <li>Allows configuring Ping Sonar distance estimates to send as MAVLink <code className="text-blue-600 bg-blue-50 px-1 rounded text-sm font-mono">DISTANCE_SENSOR</code> messages to the autopilot, for viewing in the Control Station Software and logging as part of the telemetry stream</li>
        <li>Provides a viewing utility for devices connected via USB/serial, to show which port they are plugged into</li>
      </ul>

      {/* Cards Container */}
      <div className="bg-[#1e88e5] p-10 rounded-sm flex flex-wrap gap-6 justify-center">
        
        {/* Card Ping1D */}
        <div className="bg-white w-[320px] rounded-sm shadow-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center border-b border-gray-100">
             <Radio className="text-[#1e88e5] w-12 h-12 mb-2" />
             <h2 className="text-xl text-gray-700">Ping1D</h2>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Bridge</span>
              <span className="font-mono text-gray-800">UDP 9090</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">MAVLink Distances</span>
              <button 
                onClick={() => setMavlinkEnabled(!mavlinkEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${mavlinkEnabled ? 'bg-blue-400' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${mavlinkEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">FW</span>
              <span className="text-gray-800">3.29.0</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">ID</span>
              <span className="text-gray-800">1</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Model</span>
              <span className="text-gray-800">0</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Revision</span>
              <span className="text-gray-800">1</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray-600">Device</span>
                <span className="text-gray-800 font-mono">/dev/ttyUSB0</span>
              </div>
              <Eye className="text-gray-400 w-5 h-5 cursor-pointer hover:text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-50 p-2 flex justify-center">
            <span className="text-gray-400">^</span>
          </div>
        </div>

        {/* Card Ping360 */}
        <div className="bg-white w-[320px] h-fit rounded-sm shadow-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center border-b border-gray-100">
             <Settings2 className="text-[#1e88e5] w-12 h-12 mb-2 rotate-90" />
             <h2 className="text-xl text-gray-700">Ping360</h2>
          </div>
          <div className="p-4 flex justify-between text-sm">
            <span className="text-gray-600">IP</span>
            <span className="font-mono text-gray-800">192.168.2.4:12345</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PingSonarPage;