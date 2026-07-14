import { useEffect, useState } from 'react';

const SERVICES = [
  {
    num: '01',
    name: 'JELLYFIN',
    sub: 'CINEMA',
    desc: 'Personal media library. Stream films, series, and private archives.',
    url: 'https://jellyfin.prerakland.com',
  },
  {
    num: '02',
    name: 'JELLYSEERR',
    sub: 'REQUESTS',
    desc: 'Acquisition engine. Submit titles directly into the pipeline.',
    url: 'https://jellyseerr.prerakland.com',
  },
  {
    num: '03',
    name: 'KAVITA',
    sub: 'LIBRARY',
    desc: 'Digital reading engine. Manga, comics, and bound texts.',
    url: 'https://kavita.prerakland.com',
  },
];

const FORTHCOMING = [
  { id: '04', name: 'NEXTCLOUD', note: 'Personal cloud storage & file sync.' },
  { id: '05', name: 'UPTIME KUMA', note: 'Service health monitoring dashboard.' },
  { id: '06', name: 'IMMICH', note: 'Self-hosted photo and video archive.' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5)  return 'LATE NIGHT';
  if (h < 12) return 'GOOD MORNING';
  if (h < 17) return 'GOOD AFTERNOON';
  if (h < 21) return 'GOOD EVENING';
  return 'GOOD NIGHT';
}

export default function App() {
  const [greeting, setGreeting] = useState(getGreeting());
  const [blink, setBlink] = useState(true);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  useEffect(() => {
    const clock = setInterval(() => setGreeting(getGreeting()), 60_000);
    const blinker = setInterval(() => setBlink(b => !b), 600);
    return () => { clearInterval(clock); clearInterval(blinker); };
  }, []);

  return (
    <div className="root-wrap">

      {/* ── TOP BAR ── */}
      <header className="top-bar">
        <nav className="nav-links">
          <span className="nav-item">HOME</span>
          <span className="nav-sep">/</span>
          <span className="nav-item nav-dim">STATUS</span>
          <span className="nav-sep">/</span>
          <span className="nav-item nav-dim">ARCHIVE</span>
        </nav>

        <div className="status-block">
          <span className={`status-square${blink ? '' : ' status-square--off'}`}>■</span>
          <span className="status-text">[ ALL SYSTEMS OPERATIONAL ]</span>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        {/* structural column number */}
        <div className="hero-col-num" aria-hidden="true">§</div>

        <div className="hero-body">
          <p className="hero-greeting">{greeting} —</p>
          <h1 className="hero-title">
            PRERAK<br />LAND
          </h1>
          <div className="hero-rule" />
          <p className="hero-tagline">
            A privately hosted media infrastructure.<br />
            Everything streaming, reading, requesting — self-owned.
          </p>
        </div>

        {/* decorative vertical rule */}
        <div className="hero-vline" aria-hidden="true" />
      </section>

      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="section-header">
          <span className="section-index">ACTIVE SERVICES</span>
          <div className="section-hline" />
        </div>

        <ul className="service-list">
          {SERVICES.map((s, i) => (
            <li key={s.name}>
              <a
                href={s.url}
                className={`service-row${hoveredService === i ? ' service-row--active' : ''}`}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="service-num">{s.num}</span>

                <span className="service-name-wrap">
                  <span className="service-name">{s.name}</span>
                  <span className="service-sub">({s.sub})</span>
                </span>

                <span className="service-desc">{s.desc}</span>

                <span className="service-arrow">→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FORTHCOMING ── */}
      <section className="forthcoming-section">
        <div className="section-header">
          <span className="section-index">FORTHCOMING</span>
          <div className="section-hline" />
        </div>

        <ul className="forthcoming-list">
          {FORTHCOMING.map(f => (
            <li key={f.id} className="forthcoming-row">
              <span className="forthcoming-id">{f.id}</span>
              <span className="forthcoming-name">{f.name}</span>
              <span className="forthcoming-locked">[ LOCKED ]</span>
              <span className="forthcoming-note">{f.note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-hline" />
        <div className="footer-inner">
          <span className="footer-copy">PRERAKLAND © {new Date().getFullYear()}</span>
          <span className="footer-note">SELF-HOSTED · PRIVATE · SOVEREIGN</span>
        </div>
      </footer>

    </div>
  );
}
