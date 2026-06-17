/**
 * About Page — TD Nutrition
 * Historia, misión, visión, valores y equipo de la empresa
 */

import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './About.module.css';

/* ── Valores ── */
const VALUES = [
  { icon: '🏆', title: 'Rendimiento',  desc: 'Impulsamos tu mejor versión.' },
  { icon: '🎯', title: 'Disciplina',   desc: 'Nutrición para quienes viven el fitness en serio.' },
  { icon: '🔥', title: 'Pasión',       desc: 'Tu progreso es nuestra motivación.' },
  { icon: '📈', title: 'Superación',   desc: 'Más que suplementos, una filosofía de vida.' },
  { icon: '⚡', title: 'Energía',      desc: 'Entrená fuerte. Alimentate mejor. Evolucioná.' },
  { icon: '💪', title: 'Confianza',    desc: 'Tu aliado en cada entrenamiento, siempre.' },
];

/* ── Equipo ── */
const TEAM = [
  {
    name:     'Thomas Jose Daruich',
    role:     'CEO & Co-Fundador',
    initials: 'TD',
    exp:      'Visionario detrás de TD Nutrition',
    instagram: 'https://www.instagram.com/thomasjosed_/',
  },
  {
    name:     'David Medina',
    role:     'Co-Fundador & CTO',
    initials: 'DM',
    exp:      'Desarrollo y estrategia digital',
    instagram: 'https://www.instagram.com/sdavidmedina1/',
  },
  {
    name:     'Laura González',
    role:     'Nutricionista Jefe',
    initials: 'LG',
    exp:      'PhD en Ciencias del Deporte',
    instagram: null,
  },
  {
    name:     'Ana Flores',
    role:     'Head of Marketing',
    initials: 'AF',
    exp:      'Especialista en branding digital',
    instagram: null,
  },
];

/* ── Instagram Icon ── */
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function About() {
  const { ref: missionRef,  isVisible: missionVisible  } = useIntersectionObserver();
  const { ref: valuesRef,   isVisible: valuesVisible   } = useIntersectionObserver();
  const { ref: storyRef,    isVisible: storyVisible    } = useIntersectionObserver();

  // Fallback: asegurar que las tarjetas siempre se muestren tras 600ms
  const [forceShow, setForceShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setForceShow(true), 600);
    return () => clearTimeout(t);
  }, []);

  const showValues = valuesVisible || forceShow;

  return (
    <main className={styles.page}>

      {/* ── Hero Banner ── */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className="badge badge-orange">Nuestra Historia</span>
            <h1 className={styles.heroTitle}>
              Más que suplementos,<br />
              <span className="gradient-text">un estilo de vida</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Desde 2014 ayudamos a miles de personas a superar sus límites con
              nutrición deportiva de calidad premium.
            </p>
          </div>
        </div>
      </section>

      {/* ── Misión / Visión ── */}
      <section className={`section ${styles.missionSection}`} ref={missionRef}>
        <div className="container">
          <div className={`${styles.missionGrid} ${missionVisible ? styles.visible : ''}`}>

            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>🎯</div>
              <h2>Misión</h2>
              <p>
                Empoderar a cada persona en su camino hacia el bienestar físico proporcionando
                suplementos deportivos de la más alta calidad, respaldados por ciencia y formulados
                para entregar resultados reales. Queremos ser el aliado confiable de cada atleta,
                desde el principiante hasta el profesional.
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={styles.missionIcon}>🔭</div>
              <h2>Visión</h2>
              <p>
                Convertirnos en la marca líder de suplementación deportiva en Latinoamérica,
                reconocida por su compromiso con la calidad, la innovación científica y el
                acompañamiento personalizado a cada uno de nuestros clientes en su viaje
                hacia la salud óptima.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className={`section ${styles.valuesSection}`} ref={valuesRef}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="badge badge-orange">Lo que nos define</span>
            <h2 className="section-title" style={{ marginTop: 'var(--space-md)' }}>
              Nuestros <span className="text-orange">Valores</span>
            </h2>
            <div className="accent-line" />
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map((val, i) => (
              <div
                key={val.title}
                className={`${styles.valueCard} ${showValues ? styles.valueVisible : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className={styles.valueIcon}>{val.icon}</span>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>"{val.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nuestra Trayectoria (Narrative) ── */}
      <section className={`section ${styles.storySection}`} ref={storyRef}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="badge badge-orange">Nuestra trayectoria</span>
            <h2 className="section-title" style={{ marginTop: 'var(--space-md)' }}>
              De garage a <span className="text-orange">líderes</span>
            </h2>
            <div className="accent-line" />
          </div>

          <div className={`${styles.storyCard} ${storyVisible ? styles.storyVisible : ''}`}>
            {/* Accent quote mark */}
            <div className={styles.storyQuoteMark}>"</div>

            <p className={styles.storyText}>
              Fundada en <strong>2014</strong> por <strong>Thomas</strong> y <strong>David</strong>,
              TD Nutrition nació con una misión clara: acercar suplementos de calidad a quienes buscan
              superarse día a día. Lo que comenzó como un pequeño emprendimiento gestionado desde un
              garage se transformó en una marca enfocada en el rendimiento, la salud y el crecimiento
              personal. Hoy, TD Nutrition continúa impulsando a miles de personas a alcanzar sus metas
              físicas y deportivas, manteniendo intacta la pasión que dio origen a este proyecto.
            </p>

            {/* Milestone chips */}
            <div className={styles.storyMilestones}>
              {[
                { year: '2014', label: 'Fundación' },
                { year: '2016', label: '1ª Tienda' },
                { year: '2018', label: 'E-commerce' },
                { year: '2020', label: 'Expansión' },
                { year: '2022', label: 'Certificaciones ISO' },
                { year: '2024', label: '+50K Clientes' },
              ].map(({ year, label }) => (
                <div key={year} className={styles.storyChip}>
                  <span className={styles.storyChipYear}>{year}</span>
                  <span className={styles.storyChipLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipo ── */}
      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="badge badge-orange">Las personas detrás de TD</span>
            <h2 className="section-title" style={{ marginTop: 'var(--space-md)' }}>
              Nuestro <span className="text-orange">Equipo</span>
            </h2>
            <div className="accent-line" />
          </div>
          <div className={styles.teamGrid}>
            {TEAM.map(member => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{member.initials}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <span className={styles.teamRole}>{member.role}</span>
                <p className={styles.teamExp}>{member.exp}</p>
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.teamInstagram}
                    aria-label={`Instagram de ${member.name}`}
                  >
                    <InstagramIcon />
                    @{member.instagram.split('/').filter(Boolean).pop()}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>¿Listo para dar el siguiente paso?</h2>
            <p>Descubrí todos nuestros productos y comenzá tu transformación hoy.</p>
            <a href="/products" className="btn btn-primary" id="about-cta-products">
              Ver Catálogo Completo →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
