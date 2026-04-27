# 🌊 ROV Ground Control Station (GCS) 

## 📖 Tentang Proyek

<div align="justify">
Website ini merupakan antarmuka <b>Ground Control Station (GCS)</b> yang dirancang secara khusus untuk memonitor, mengontrol, dan menyimulasikan <i>Remotely Operated Vehicle</i> (ROV) bawah air. Proyek ini dikembangkan sebagai bagian dari sistem Rancang Bangun ROV untuk mendukung aktivitas eksplorasi dan observasi bawah laut.
<br><br>
Dashboard ini bertindak sebagai pusat komando yang menjembatani komunikasi <i>real-time</i> antara operator dan sistem robotika. Sistem ini mengintegrasikan data telemetri dari robot dengan simulasi visual, memberikan kendali penuh kepada operator melalui antarmuka web modern yang responsif.
</div>

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

---

## 🚀 Cara Clone dan Menjalankan Website

Ikuti langkah-langkah di bawah ini untuk menjalankan dashboard ini di komputer lokal kamu.

### 1. Clone Repository
Buka terminal dan jalankan perintah berikut untuk mengunduh kode dari GitHub:

```bash
git clone [ https://github.com/MahendraNur/ROV-Polman-Bandung ]
cd rover-ui
```

### 2. Setup Frontend (React)
Pastikan kamu sudah berada di dalam folder `rover-ui`. Kemudian, masuk ke folder frontend, install dependencies, dan jalankan server:

```bash
cd frontend
npm install
npm run dev
```
*Website biasanya akan berjalan di http://localhost:5173.*

### 3. Setup Backend (FastAPI & ROS2 Bridge)
Buka terminal baru. Masuk dulu ke folder utama `rover-ui`, lalu masuk ke folder backend. Pastikan environment ROS2 sudah di-source, lalu jalankan server API:

```bash
cd rover-ui
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🤖 Panduan Instalasi ROS2
Proyek ini membutuhkan ROS2 (direkomendasikan versi Humble untuk Ubuntu 22.04 atau Jazzy untuk Ubuntu 24.04).

### Langkah Instalasi (Ubuntu)

**1. Set Locale**
```bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

**2. Setup Sources**
```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL [https://raw.githubusercontent.com/ros/rosdistro/master/ros.key](https://raw.githubusercontent.com/ros/rosdistro/master/ros.key) -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] [http://packages.ros.org/ros2/ubuntu](http://packages.ros.org/ros2/ubuntu) $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

**3. Install ROS2 Desktop**
```bash
sudo apt update
sudo apt upgrade
sudo apt install ros-humble-desktop 
```
*(Ganti humble menjadi jazzy jika menggunakan Ubuntu 24.04)*

**4. Environment Setup**
Agar perintah ROS2 bisa dikenali secara otomatis:
```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

---
*Dikembangkan untuk proyek Rancang Bangun ROV - Politeknik Manufaktur Bandung*
