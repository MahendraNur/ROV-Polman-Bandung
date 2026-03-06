import React, { useState } from 'react';

// Pastikan gambar rov-bg.jpg sudah kamu simpan di dalam folder src/assets/
// @ts-ignore
import rovBgImage from '../../assets/rov-bg.jpg';

// 1. Tentukan Struktur Data (Type Interface) agar TypeScript mengerti
interface Member {
  id: number;
  initials: string;
  name: string;
  uid: string;
  role: string;
  prodi: string;
  divisi: string;
  tanggung_jawab: string;
  tags: string[];
}

// 2. Terapkan Tipe Data ke variabel MEMBERS
const MEMBERS: Member[] = [
  {
    id: 1, initials: 'NS',
    name: 'Naufal Shiddiq',
    uid: '#TRN·001',
    role: 'PIC Battery',
    prodi: 'Teknologi Mekatronika',
    divisi: 'Hardware',
    tanggung_jawab: 'Person in charge sistem baterai ROV',
    tags: ['Battery System', 'Electronics', 'Design'],
  },
  {
    id: 2, initials: 'NZ',
    name: 'Nazhifa',
    uid: '#TRN·002',
    role: 'PIC Thruster',
    prodi: 'Teknologi Mekatronika',
    divisi: 'Hardware',
    tanggung_jawab: 'Person in charge sistem thruster ROV',
    tags: ['Thruster', 'Propulsion', 'Design'],
  },
  {
    id: 3, initials: 'MN',
    name: 'Mahendra Nur Pramudiansyah',
    uid: '#TRN·003',
    role: 'PIC Software Website',
    prodi: 'Teknologi Rekayasa Informatika Industri',
    divisi: 'Software',
    tanggung_jawab: 'Person in charge tim software & website ROV',
    tags: ['Web Dev', 'Software', 'UI/UX', 'Gazebo', 'ROS2'],
  },
  {
    id: 4, initials: 'HA',
    name: 'Hamiya Aisya Mardhiya',
    uid: '#TRN·004',
    role: 'Anggota Software Website',
    prodi: 'Teknologi Rekayasa Informatika Industri',
    divisi: 'Software',
    tanggung_jawab: 'Anggota tim software & website ROV',
    tags: ['Web Dev', 'Software', 'UI/UX'],
  },
  {
    id: 5, initials: 'NK',
    name: 'Naurah Kaltsum Azaria',
    uid: '#TRN·005',
    role: 'Anggota Software Website',
    prodi: 'Teknologi Rekayasa Informatika Industri',
    divisi: 'Software',
    tanggung_jawab: 'Anggota tim software & website ROV',
    tags: ['Web Dev', 'Software', 'UI/UX'],
  },
];

/* ─── Avatar Component ─── */
interface AvatarProps {
  initials: string;
  src?: string;
}

const Avatar = ({ initials, src }: AvatarProps) => (
  <div style={{
    width: 50, height: 50, borderRadius: 12,
    background: 'linear-gradient(135deg,#1e4a8a,#2a6ec0)',
    border: '2px solid #162848',
    outline: '3px solid rgba(74,184,240,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, color: '#4ab8f0',
    fontFamily: "'JetBrains Mono', monospace",
    overflow: 'hidden', flexShrink: 0,
  }}>
    {src ? <img src={src} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} /> : initials}
  </div>
);

/* ─── InfoBox Component ─── */
interface InfoBoxProps {
  label: string;
  value: string;
  wide?: boolean;
}

const InfoBox = ({ label, value, wide }: InfoBoxProps) => (
  <div style={{
    background: '#1a3058',
    border: '1px solid rgba(100,160,255,0.18)',
    borderRadius: 8, padding: '8px 10px',
    gridColumn: wide ? 'span 2' : undefined,
  }}>
    <div style={{ 
      fontFamily: "'JetBrains Mono', monospace", 
      fontSize: '8.5px', 
      letterSpacing: 2, 
      textTransform: 'uppercase', 
      color: '#3d6a90', 
      marginBottom: 3 
    }}>
      {label}
    </div>
    <div style={{ 
      fontSize: '12px', 
      color: '#7aaacf', 
      fontWeight: 500, 
      lineHeight: 1.3 
    }}>
      {value}
    </div>
  </div>
);

/* ─── MemberCard Component ─── */
interface MemberCardProps {
  member: Member;
  index: number;
  total: number;
}

const MemberCard = ({ member, index, total }: MemberCardProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#162848',
        border: `1px solid ${hovered ? 'rgba(100,180,255,0.5)' : 'rgba(100,160,255,0.18)'}`,
        borderRadius: 14, overflow: 'hidden', position: 'relative', cursor: 'pointer',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(74,184,240,0.1)' : 'none',
        transition: 'transform .3s, box-shadow .3s, border-color .3s',
      }}
    >
      {/* Card number */}
      <div style={{
        position: 'absolute', top: 10, right: 12, zIndex: 5,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 9,
        color: 'rgba(255,255,255,0.18)', letterSpacing: 1,
      }}>
        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </div>

      {/* Photo banner */}
      <div style={{ height: 105, background: 'linear-gradient(160deg,#1a3a6e,#0f2245)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg,transparent,transparent 18px,rgba(74,184,240,0.025) 18px,rgba(74,184,240,0.025) 19px)' }} />
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: 26, fontWeight: 600, color: 'rgba(74,184,240,0.18)', userSelect: 'none' }}>
          {member.initials}
        </div>
        <div style={{ position: 'absolute', bottom: -24, left: 20, zIndex: 10 }}>
          <div style={{ position: 'relative' }}>
            <Avatar initials={member.initials} />
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 11, height: 11, borderRadius: '50%', background: '#3dd68c', border: '2px solid #162848', boxShadow: '0 0 7px rgba(61,214,140,.7)', animation: 'blink 2.5s infinite' }} />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '32px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 5 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#ddeeff', letterSpacing: '.3px' }}>
            {member.name}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#3d6a90', letterSpacing: 1, paddingTop: 2, whiteSpace: 'nowrap' }}>
            {member.uid}
          </div>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '10.5px', fontWeight: 600, color: '#4ab8f0', background: 'rgba(74,184,240,0.12)', border: '1px solid rgba(74,184,240,0.22)', borderRadius: 6, padding: '4px 10px', marginBottom: 14 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ab8f0', flexShrink: 0 }} />
          {member.role}
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(100,160,255,0.18),transparent)', marginBottom: 13 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <InfoBox label="Program Studi" value={member.prodi} wide />
          <InfoBox label="Divisi" value={member.divisi} />
          <InfoBox label="Tanggung Jawab" value={member.tanggung_jawab} wide />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {member.tags.map((tag: string) => (
            <span key={tag} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, padding: '3px 8px', borderRadius: 5, background: 'rgba(110,168,254,0.08)', border: '1px solid rgba(110,168,254,0.2)', color: '#6ea8fe', letterSpacing: '.3px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page Export ─── */
export const Team = () => {
  const row1 = MEMBERS.slice(0, 3);
  const row2 = MEMBERS.slice(3);

  return (
    <div style={{ fontFamily: "'Exo 2', sans-serif", color: '#ddeeff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes slideUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes blink   { 0%,100% { opacity:1 } 50% { opacity:.3 } }
        @keyframes cardUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      {/* ── HERO DENGAN IMAGE SANDWICH ── */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center', borderRadius: '20px', marginBottom: '20px' }}>
        
        {/* 1. LAYER PALING BAWAH: GAMBAR LOKAL */}
        <img 
          src={rovBgImage} 
          alt="ROV Underwater" 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            objectPosition: 'center',
            zIndex: 1
          }} 
        />
        
        {/* 2. LAYER TENGAH: GRADIENT OVERLAY (Gelap di kiri, transparan di kanan) */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to right, rgba(10, 20, 45, 1) 0%, rgba(10, 20, 45, 0.8) 40%, transparent 100%)',
          zIndex: 1
        }} />
        
        {/* Opsional: Efek Titik-titik (Dot Grid) agar lebih futuristik */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', 
          backgroundSize: '28px 28px', 
          WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 100%)', 
          maskImage: 'linear-gradient(to right, black 40%, transparent 100%)',
          zIndex: 1
        }} />

        {/* 3. LAYER PALING ATAS: KONTEN TEKS */}
        <div style={{ position: 'relative', zIndex: 2, padding: '80px 72px', maxWidth: 620 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#4ab8f0', marginBottom: 20, animation: 'fadeIn .5s ease both .2s' }}>
            <span style={{ width: 28, height: 1.5, background: '#4ab8f0', borderRadius: 2, display: 'inline-block' }} />
            Industrial Informatics · TRIN
          </div>

          <h1 style={{ fontSize: 'clamp(38px, 4.8vw, 62px)', fontWeight: 900, lineHeight: 1.06, letterSpacing: -1, color: '#fff', marginBottom: 20, animation: 'slideUp .65s cubic-bezier(.22,.68,0,1) both .25s' }}>
            Tim di Balik<br />
            <em style={{ fontStyle: 'italic', color: '#4ab8f0' }}>ROV</em> Kami
          </h1>

          <p style={{ fontSize: 14, color: '#7aaacf', lineHeight: 1.75, maxWidth: 430, marginBottom: 36, animation: 'fadeIn .6s ease both .4s' }}>
            Sebuah tim yang terdiri dari individu berdedikasi dengan keahlian di bidang software, hardware, dan sistem navigasi bawah air — bersama membangun dan mengoperasikan ROV Polman Bandung.
          </p>

          <div style={{ display: 'flex', gap: 0, marginBottom: 40, animation: 'fadeIn .6s ease both .5s' }}>
            {[['5', '+', 'Anggota'], ['3', '+', 'Bidang Keahlian'], ['1', '', 'Unit ROV']].map(([num, plus, lbl], i) => (
              <div key={lbl} style={{ paddingRight: i < 2 ? 28 : 0, marginRight: i < 2 ? 28 : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -1 }}>
                  {num}<span style={{ color: '#4ab8f0' }}>{plus}</span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#3d6a90', marginTop: 5 }}>
                  {lbl}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#3d6a90', cursor: 'pointer', border: 'none', background: 'none', animation: 'fadeIn .6s ease both .6s', padding: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(100,160,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>↓</div>
            Lihat Anggota Tim
          </button>
        </div>
      </div>

      {/* ── SECTION HEADER ── */}
      <div id="team-section" style={{ padding: '40px 72px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(100,160,255,0.18)', marginBottom: 32 }}>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' }}>
          ANGGOTA <span style={{ color: '#4ab8f0' }}>TIM</span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#3d6a90' }}>
          ROV · POLMAN BANDUNG · 05 MEMBERS
        </div>
      </div>

      {/* ── CARDS ── */}
      <div style={{ padding: '0 72px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, maxWidth: 1000 }}>
          {row1.map((m, i) => <MemberCard key={m.id} member={m} index={i} total={MEMBERS.length} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, maxWidth: 'calc(66.66% + 6px)', margin: '18px auto 0' }}>
          {row2.map((m, i) => <MemberCard key={m.id} member={m} index={i + 3} total={MEMBERS.length} />)}
        </div>
      </div>
    </div>
  );
};