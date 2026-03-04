export default function SensorTable() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
      <h3 className="text-lg font-bold mb-4">Autopilot Sensors</h3>
      <table className="w-full text-sm text-left text-gray-400">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2">Sensor</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="py-2">ACC_MPU6000</td><td className="text-green-500 py-2">● OK</td></tr>
          <tr><td className="py-2">LSM303D</td><td className="text-green-500 py-2">● OK</td></tr>
          <tr><td className="py-2">MS5611</td><td className="text-yellow-500 py-2">● Warn</td></tr>
        </tbody>
      </table>
    </div>
  );
}