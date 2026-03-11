import { 
  Home, 
  Activity, 
  Settings, 
  Info, 
  Package, 
  Gamepad2,
  Terminal,
  Video,
  FileCode,
  Zap,
  Database,
  Search
} from 'lucide-react';

export const menuGroups = [
  {
    title: "VEHICLE",
    items: [
      { title: "Home Menu", icon: Home, path: "/" },
      { title: "Live Telemetry", icon: Activity, path: "/live" },
      { title: "Vehicle Setup", icon: Settings, path: "/setup" },
      { title: "Simulation", icon: Gamepad2, path: "/simulation" }
    ]
  },
  {
    title: "AUTOPILOT",
    items: [
      { title: "Autopilot Firmware", icon: Zap, path: "/firmware" },
      { title: "Autopilot Parameters", icon: Database, path: "/params" },
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { title: "System Information", icon: Info, path: "/system-info" },
      { title: "BlueOS Version", icon: Package, path: "/blueos", status: "BETA" },
      { title: "Terminal", icon: Terminal, path: "/terminal" },
      { title: "Video Streams", icon: Video, path: "/video" },
      { title: "Log Browser", icon: Search, path: "/logs" }
    ]
  }
];