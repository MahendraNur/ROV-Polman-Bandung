# 🌊 ROV Ground Control Station (GCS) 

## 📖 Tentang Proyek

Website ini merupakan antarmuka **Ground Control Station (GCS)** yang dirancang secara khusus untuk memonitor, mengontrol, dan menyimulasikan *Remotely Operated Vehicle* (ROV) bawah air. Proyek ini dikembangkan sebagai bagian dari sistem Rancang Bangun ROV untuk mendukung aktivitas eksplorasi dan observasi bawah laut.

Dashboard ini bertindak sebagai pusat komando yang menjembatani komunikasi *real-time* antara operator dan sistem robotika. Sistem ini mengintegrasikan data telemetri dari robot dengan simulasi visual, memberikan kendali penuh kepada operator melalui antarmuka web modern yang responsif.

### ✨ Fitur Utama
- **Mission Control (Pusat Misi):** Antarmuka utama untuk memberikan perintah kendali pergerakan ROV (mendukung manuver navigasi 6-DOF) dan memantau status operasional robot secara keseluruhan.
- **Engineering Data (Data Teknikal):** Visualisasi data telemetri secara *real-time*. Fitur ini menampilkan status sensor, kinerja aktuator/kinematika *thruster*, kondisi baterai, dan diagnostik sistem robot.
- **Simulasi Terintegrasi:** Terhubung langsung dengan *environment* simulasi (Gazebo), memungkinkan operator untuk melakukan pengujian pergerakan dan logika ROV di lingkungan virtual sebelum diturunkan ke perairan asli.
- **Komunikasi Web-ke-ROS2:** Menggunakan backend API sebagai jembatan untuk menerjemahkan interaksi di web (HTTP/WebSocket) menjadi *topics* dan *services* yang secara langsung dibaca dan dieksekusi oleh ekosistem ROS2 pada perangkat keras robot.

### 🛠️ Bahasa & Tools yang Digunakan
Proyek ini dibangun menggunakan arsitektur modern yang memisahkan frontend, backend, dan sistem robotika agar sistem berjalan ringan dan *scalable*:
- **Frontend:** React.js, Tailwind CSS (Menghadirkan UI/UX yang intuitif dan mudah dibaca oleh operator).
- **Backend & API Bridge:** Python, FastAPI (Menangani *routing* data secara asinkron dan cepat dari web ke sistem robot).
- **Robot Framework:** ROS2 (Humble / Jazzy) sebagai sistem operasi utama penyusun *node* robotika.
- **Simulasi:** Gazebo (Lingkungan pengujian virtual 3D).

## 🚀 Cara Clone dan Menjalankan Website

Ikuti langkah-langkah di bawah ini untuk menjalankan dashboard ini di komputer lokal kamu.

### 1. Clone Repository
Buka terminal dan jalankan perintah berikut untuk mengunduh kode dari GitHub:
```bash
git clone [https://github.com/username-kamu/nama-repo-kamu.git](https://github.com/username-kamu/nama-repo-kamu.git)

### 2. Setup Frontend (React)
cd  frontend
npm install
npm run dev
npm install
npm run dev
