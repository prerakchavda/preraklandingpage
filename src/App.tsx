import { useEffect, useState } from 'react';
import { PHeading, PText, PIcon, PTag } from '@porsche-design-system/components-react';

interface Service {
  name: string;
  tagline: string;
  description: string;
  url: string;
  accentColor: string;
  glowColor: string;
  iconName: string;
  label: string;
}

const SERVICES: Service[] = [
  {
    name: 'Jellyfin',
    tagline: 'Stream Media',
    description: 'Your private cinema. Stream movies, TV shows, and personal media in stunning high-definition.',
    url: 'https://jellyfin.prerakland.com',
    accentColor: '#aa5cc3',
    glowColor: 'rgba(170,92,195,0.35)',
    iconName: 'play',
    label: 'MEDIA SERVER',
  },
  {
    name: 'Jellyseerr',
    tagline: 'Request Content',
    description: 'Want to watch something new? Instantly request movies and shows to be added to the library.',
    url: 'https://jellyseerr.prerakland.com',
    accentColor: '#f4845f',
    glowColor: 'rgba(244,132,95,0.35)',
    iconName: 'add',
    label: 'CONTENT REQUESTS',
  },
  {
    name: 'Kavita',
    tagline: 'The Library',
    description: 'An immersive digital reader. Dive into your favorite manga, comics, and ebooks.',
    url: 'https://kavita.prerakland.com',
    accentColor: '#4ecdc4',
    glowColor: 'rgba(78,205,196,0.35)',
    iconName: 'book',
    label: 'DIGITAL LIBRARY',
  },
];

interface LockedService {
  name: string;
  description: string;
  iconName: string;
}

const LOCKED_SERVICES: LockedService[] = [
  {
    name: 'Nextcloud',
    description: 'Personal Cloud Storage — your files, contacts, and calendar, fully self-hosted.',
    iconName: 'cloud',
  },
  {
    name: 'Uptime Kuma',
    description: 'Live status monitoring and uptime tracking for all Prerakland services.',
    iconName: 'chart',
  },
  {
    name: 'Immich',
    description: 'Self-hosted photo and video backup — Google Photos, but yours.',
    iconName: 'image',
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

export default function App() {
  const [greeting, setGreeting] = useState(getGreeting());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="prerak-root">
      {/* Animated cinematic background */}
      <div className="bg-animated" aria-hidden="true">
        <div className="bg-layer-1" />
        <div className="bg-layer-2" />
        <div className="bg-noise" />
      </div>

      {/* Status indicator */}
      <div className="status-bar">
        <span className="status-dot" />
        <PText size="x-small" color="contrast-medium">All Systems Operational</PText>
      </div>

      <main className="portal-main">
        {/* Hero */}
        <header className="hero-section">
          <div className="wordmark-row">
            <span className="prerak-logo">P</span>
            <span className="prerak-wordmark">RERAKLAND</span>
          </div>
          <PHeading tag="h1" size="xx-large" align="center" className="hero-title">
            {greeting},
          </PHeading>
          <PHeading tag="h2" size="large" align="center" className="hero-subtitle" style={{ color: 'var(--pds-theme-dark-contrast-medium, #afb0b3)' }}>
            Welcome to your personal media universe.
          </PHeading>
          <PText align="center" color="contrast-medium" size="small" className="hero-desc">
            Everything you stream, read, and explore — hosted privately, curated for you.
          </PText>
        </header>

        {/* Section label */}
        <div className="section-label-row">
          <div className="section-divider" />
          <PText size="x-small" color="contrast-medium" className="section-label">ACTIVE SERVICES</PText>
          <div className="section-divider" />
        </div>

        {/* Service cards */}
        <section className="services-grid" aria-label="Active services">
          {SERVICES.map((service, i) => (
            <a
              key={service.name}
              href={service.url}
              className={`service-card${hoveredIndex === i ? ' service-card--hovered' : ''}`}
              style={{
                '--accent': service.accentColor,
                '--glow': service.glowColor,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Top accent bar */}
              <div className="card-accent-bar" />

              {/* Icon area */}
              <div className="card-icon-wrap">
                <PIcon name={service.iconName as Parameters<typeof PIcon>[0]['name']} color="primary" size="large" />
              </div>

              {/* Meta */}
              <div className="card-meta">
                <PTag color="background-frosted" className="card-tag">{service.label}</PTag>
                <PHeading tag="h3" size="large" className="card-name">{service.name}</PHeading>
                <PText size="small" color="contrast-medium" className="card-tagline">{service.tagline}</PText>
              </div>

              {/* Description revealed on hover */}
              <div className="card-desc-wrap">
                <PText size="x-small" color="contrast-medium" className="card-desc">{service.description}</PText>
              </div>

              {/* CTA */}
              <div className="card-cta">
                <span className="cta-label">Launch</span>
                <PIcon name="arrow-right" color="primary" size="small" />
              </div>
            </a>
          ))}
        </section>

        {/* Forthcoming section */}
        <div className="section-label-row forthcoming-label-row">
          <div className="section-divider" />
          <PText size="x-small" color="contrast-medium" className="section-label">FORTHCOMING INTEGRATIONS</PText>
          <div className="section-divider" />
        </div>

        <section className="forthcoming-grid" aria-label="Coming soon services">
          {LOCKED_SERVICES.map((svc) => (
            <div key={svc.name} className="locked-card" aria-disabled="true">
              <div className="locked-card-inner">
                <div className="locked-icon-row">
                  <PIcon name={svc.iconName as Parameters<typeof PIcon>[0]['name']} color="contrast-medium" size="medium" />
                  <PIcon name="lock" color="contrast-low" size="small" className="lock-icon" />
                </div>
                <PHeading tag="h4" size="small" className="locked-name" style={{ color: 'var(--pds-theme-dark-contrast-medium, #afb0b3)' }}>{svc.name}</PHeading>
                <PText size="x-small" color="contrast-low" className="locked-desc">{svc.description}</PText>
                <div className="locked-badge">
                  <PTag color="background-frosted">COMING SOON</PTag>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="portal-footer">
          <PText size="x-small" color="contrast-low" align="center">
            Prerakland &mdash; Self-hosted. Private. Yours.
          </PText>
        </footer>
      </main>
    </div>
  );
}
