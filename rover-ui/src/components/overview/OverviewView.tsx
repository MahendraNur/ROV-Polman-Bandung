// src/components/overview/OverviewView.tsx
import SensorTable from './SensorTable';
import ModuleCard from './ModuleCard';

export default function OverviewView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Kolom Kiri: Visualisasi & Modul */}
      <div className="lg:col-span-2 space-y-6">
        {/* Placeholder Visualisasi ROV */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl h-64 flex items-center justify-center text-gray-500">
          [ 3D Model / Image Placeholder ]
        </div>

        {/* Baris Modul Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ModuleCard title="Battery" value="15.8 V" status="OK" />
          <ModuleCard title="Leak Sensor" value="Dry" status="OK" />
          <ModuleCard title="Lights" value="On" status="WARN" />
          <ModuleCard title="Video" value="Active" status="OK" />
        </div>
      </div>

      {/* Kolom Kanan: Vehicle Info & Sensor */}
      <div className="space-y-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Vehicle Info</h3>
          <div className="text-sm text-gray-400 space-y-2">
            <p>Flight Controller: <span className="text-white">Pixhawk1</span></p>
            <p>Firmware: <span className="text-white">ArduSub 4.5.0</span></p>
            <p>Frame: <span className="text-white">Vectored</span></p>
          </div>
        </div>
        <SensorTable />
      </div>
    </div>
  );
}