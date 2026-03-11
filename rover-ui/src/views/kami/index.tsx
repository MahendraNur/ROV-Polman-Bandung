import React, { useState } from 'react';

// Pastikan gambar rov-bg.jpg sudah kamu simpan di dalam folder src/assets/
// @ts-ignore
import rovBgImage from '../../assets/rov-bg.jpg';

// 1. Tentukan Struktur Data (Type Interface)
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
    width: 64, height: 64, borderRadius: 16,
    background: 'linear-gradient(135deg, rgba(30,58,138,0.8), rgba(42,110,192,0.8))',
    border: '2px solid rgba(74,184,240,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, fontWeight: 800, color: '#fff',
    fontFamily: "'JetBrains Mono', monospace",
    overflow: 'hidden', flexShrink: 0,
    boxShadow: '0 4px 12px rgba(74,184,240,0.2)'
  }}>
    {src ? <img src={src} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
  </div>
);

/* ─── Modern MemberCard Component ─── */
interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '340px', // Lebar seragam
        flexGrow: 1, 
        maxWidth: '380px',
        background: hovered ? 'rgba(22, 40, 72, 0.9)' : 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? 'rgba(74,184,240,0.5)' : 'rgba(100,160,255,0.15)'}`,
        borderRadius: 20,
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,184,240,0.2)' : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow Effect */}
      <div style={{
        position: 'absolute', top: '-50px', right: '-50px', width: '100px', height: '100px',
        background: hovered ? 'radial-gradient(circle, rgba(74,184,240,0.15) 0%, transparent 70%)' : 'transparent',
        transition: 'background 0.4s ease', borderRadius: '50%'
      }} />

      {/* Header: Avatar + Info */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Avatar initials={member.initials} />
          {/* Status Indicator */}
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: '50%', background: '#3dd68c', border: '3px solid #0f172a', animation: 'blink 2.5s infinite' }} />
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#6ea8fe', letterSpacing: '1px', marginBottom: '4px' }}>
            {member.uid}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '4px' }}>
            {member.name}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#4ab8f0', display: 'inline-block', background: 'rgba(74,184,240,0.1)', padding: '2px 8px', borderRadius: '6px' }}>
            {member.role}
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' }} />

      {/* Program Studi & Divisi (Grid Ringkas) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Divisi</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#cbd5e1' }}>{member.divisi}</div>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Program Studi</div>
          <div style={{ fontSize: '12px', fontWeight: 500, color: '#94a3b8', lineHeight: 1.3 }}>{member.prodi}</div>
        </div>
      </div>

      {/* Tanggung Jawab Box */}
      <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '12px' }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Tanggung Jawab</div>
        <div style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: 1.4 }}>{member.tanggung_jawab}</div>
      </div>

      {/* Tags (Selalu di bawah) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {member.tags.map((tag: string) => (
          <span key={tag} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9.5px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(110,168,254,0.05)', border: '1px solid rgba(110,168,254,0.2)', color: '#6ea8fe' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Main Page Export ─── */
export const Team = () => {
  return (
    <div style={{ fontFamily: "'Exo 2', sans-serif", color: '#ddeeff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        @keyframes slideUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes blink   { 0%,100% { opacity:1; box-shadow: 0 0 8px rgba(61,214,140,0.6); } 50% { opacity:.5; box-shadow: none; } }
      `}</style>

      {/* ── HERO DENGAN IMAGE SANDWICH (Tetap Sama) ── */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center', borderRadius: '20px', marginBottom: '20px' }}>
        <img src={rovBgImage} alt="ROV Underwater" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10, 20, 45, 1) 0%, rgba(10, 20, 45, 0.8) 40%, transparent 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'linear-gradient(to right, black 40%, transparent 100%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '80px 72px', maxWidth: 620 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#4ab8f0', marginBottom: 20, animation: 'fadeIn .5s ease both .2s' }}>
            <span style={{ width: 28, height: 1.5, background: '#4ab8f0', borderRadius: 2, display: 'inline-block' }} />
            Industrial Informatics · TRIN
          </div>

          <h1 style={{ fontSize: 'clamp(38px, 4.8vw, 62px)', fontWeight: 900, lineHeight: 1.06, letterSpacing: -1, color: '#fff', marginBottom: 20, animation: 'slideUp .65s cubic-bezier(.22,.68,0,1) both .25s' }}>
            Tim di Balik<br /><em style={{ fontStyle: 'italic', color: '#4ab8f0' }}>ROV</em> Kami
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
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#3d6a90', marginTop: 5 }}>{lbl}</div>
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
      <div id="team-section" style={{ padding: '40px 72px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(100,160,255,0.18)', marginBottom: 40 }}>
        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase' }}>
          ANGGOTA <span style={{ color: '#4ab8f0' }}>TIM</span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: '#3d6a90' }}>
          ROV · POLMAN BANDUNG · 05 MEMBERS
        </div>
      </div>

      {/* ── NEW BALANCED GRID LAYOUT ── */}
      <div style={{ padding: '0 72px 80px' }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '24px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {MEMBERS.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </div>
  );
};