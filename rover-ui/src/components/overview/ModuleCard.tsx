export default function ModuleCard({ title, value, status }: any) {
  const statusColor = status === 'OK' ? 'text-green-500' : 'text-yellow-500';
  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
      <p className="text-xs text-gray-400 uppercase">{title}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      <span className={`text-xs ${statusColor}`}>● {status}</span>
    </div>
  );
}