import React from 'react';
import styles from './index.module.css';
import CustomSearchBar from '@site/src/components/CustomSearchBar';

const topics = [
    {
        title: 'Sistem Dizaynı',
        description: 'Müasir tətbiqlər üçün miqyaslana bilən və etibarlı sistemlər qurun.',
        link: '/sistem-dizayn',
    },
    {
        title: 'Mikroservislər',
        description: 'Mikroservis arxitekturası, dizayn prinsipləri və implementasiya nümunələri.',
        link: '/mikroservisler',
    },
    {
        title: 'Database',
        description: 'SQL və NoSQL database-lər, indexing, optimization və digər konseptlər.',
        link: '/database',
    },
    {
        title: 'Dizayn Patternlər',
        description: 'Proqram təminatı dizaynında istifadə olunan pattern-lər və Java-da implementasiyaları.',
        link: '/design-patternler',
    },
    {
        title: 'Data Strukturları',
        description: 'Əsas data strukturları, onların implementasiyası və istifadə sahələri.',
        link: '/data-strukturlar',
    },
    {
        title: 'Alqoritmlər',
        description: 'Alqoritmlər, problem həll etmə strategiyaları və mürəkkəblik analizi haqqında.',
        link: '/alqoritmler',
    },
    {
        title: 'Java',
        description: 'Java proqramlaşdırma dili, collections, streams, multithreading və digər xüsusiyyətlər.',
        link: '/java',
    },
    {
        title: 'Texnologiyalar',
        description: 'Docker, Kubernetes, Kafka, Redis və digər müasir texnologiyalar.',
        link: '/texnologiyalar',
    },
    {
        title: 'Testing',
        description: 'Unit, integration, e2e testlər, test piramidası və keyfiyyət strategiyaları.',
        link: '/testing',
    },
    {
        title: 'Security',
        description: 'Veb və tətbiq təhlükəsizliyi mövzuları: CSRF, XSS, OAuth, Rate Limiting, SQL Injection.',
        link: '/security',
    },
    {
        title: 'Interview',
        description: 'Texniki və behavioral interview hazırlığı, OOD və sistem dizayn sualları.',
        link: '/interview',
    },
    {
        title: 'Diaqramlar',
        description: 'UML, Use Case, Sequence, Class və E-R diaqramları ilə sistem modelləşdirmə.',
        link: '/diaqramlar',
    },
]; 

// Öyrənmə Yolları (Learning Paths)
const learningPaths = [
    {
        title: 'Backend Mühəndisliyi',
        description: 'Java, Spring, verilənlər bazası və sistem dizaynı ilə güclü backend əsasları qurun.',
        link: '/java',
        steps: ['Java', 'Spring', 'Database', 'Sistem Dizaynı'],
    },
    {
        title: 'Sistem Dizaynı Fokus',
        description: 'MiQyaslana bilən sistemlərin prinsipləri, nümunələr və sual həlləri.',
        link: '/sistem-dizayn',
        steps: ['CAP', 'Caching', 'Sharding', 'Messaging'],
    },
    {
        title: 'Alqoritmlər + Data Strukturları',
        description: 'Fundamental anlayışları möhkəmləndir, müsahibələrə hazırlaş.',
        link: '/alqoritmler',
        steps: ['Array', 'Tree', 'Graph', 'DP'],
    },
    {
        title: 'Müstəqil Öyrənmə',
        description: 'Öz tempində öyrən. Mövzu seç, hədəf qoy və başla! ',
        link: '#topics',
        steps: ['Mövzu seç', 'Plan qur', 'Praktika et'],
        independent: true,
    },
];

// Səviyyələr (Levels)
const levels = [
    {
        title: 'Başlanğıc',
        description: 'Temel anlayışlar və güclü baza.',
        icon: '🌱',
        recommendations: [
            { label: 'Java', link: '/java' },
            { label: 'Data Strukturları', link: '/data-strukturlar' },
            { label: 'Alqoritmlər', link: '/alqoritmler' },
        ],
    },
    {
        title: 'Orta',
        description: 'Müasir texnologiyalar və praktik tətbiqlər.',
        icon: '🧩',
        recommendations: [
            { label: 'Mikroservislər', link: '/mikroservisler' },
            { label: 'Database', link: '/database' },
            { label: 'Testing', link: '/testing' },
        ],
    },
    {
        title: 'İrəli',
        description: 'Performans, təhlükəsizlik və sistem dizaynı.',
        icon: '🚀',
        recommendations: [
            { label: 'Sistem Dizaynı', link: '/sistem-dizayn' },
            { label: 'Security', link: '/security' },
            { label: 'Texnologiyalar', link: '/texnologiyalar' },
        ],
    },
];

function PathCard({ title, description, link, icon, steps = [], duration, independent }) {
    return (
        <a href={link} className={styles.topicCard}>
            <div className={styles.topicIcon}>{icon}</div>
            <h2 className={styles.topicTitle}>{title}</h2>
            <p className={styles.topicDescription}>{description}</p>
            {steps?.length > 0 && (
                <div className={styles.chipsRow}>
                    {steps.slice(0, 4).map((s) => (
                        <span key={s} className={styles.chip}>{s}</span>
                    ))}
                </div>
            )}
            <div className={styles.metaRow}>
                {duration && (
                    <span className={styles.badge}>{duration}</span>
                )}
                {independent && (
                    <span className={styles.badgeIndependent}>Müstəqil</span>
                )}
            </div>
            <span className={styles.topicLink}>Bax →</span>
        </a>
    );
}

function LevelCard({ title, description, icon, recommendations = [] }) {
    return (
        <div className={styles.topicCard}>
            <div className={styles.topicIcon}>{icon}</div>
            <h2 className={styles.topicTitle}>{title}</h2>
            <p className={styles.topicDescription}>{description}</p>
            {recommendations?.length > 0 && (
                <div className={styles.chipsRow}>
                    {recommendations.map((r) => (
                        <a key={r.label} href={r.link} className={styles.chipLink}>
                            <span className={styles.chip}>{r.label}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function TopicCard({ title, description, link, icon }) {
    return (
        <a href={link} className={styles.topicCard}>
            <div className={styles.topicIcon}>{icon}</div>
            <h2 className={styles.topicTitle}>{title}</h2>
            <p className={styles.topicDescription}>{description}</p>
            <span className={styles.topicLink}>Daha çox →</span>
        </a>
    );
}

export default function HomePage() {
    return (
        <div className={styles.homepageWrapper}>
            <main className={styles.homepageContainer}>
                <header className={styles.hero}>
                    <h1 className={styles.heroTitle}>Kodmod</h1>
                    <div className={styles.heroDescription}>
                        <p>
                            Bu layihə proqramlaşdırma öyrənən və Software Development Engineer olmaq istəyən şəxslər üçün hazırlanmışdır. Sistem dizaynı, alqoritmlər, data strukturları, verilənlər bazası və digər texniki mövzular haqqında qısa qeydlər, faydalı resurslar və praktik nümunələr təqdim olunur.
                        </p>
                    </div>
                </header>

                {/* Add Algolia search bar before topics */}
                <CustomSearchBar />

                {/* Öyrənmə Yolları */}
                <section className={styles.topicsSection} id="learning-paths">
                    <h2 className={styles.sectionTitle}>Öyrənmə Yolları</h2>
                    <div className={styles.topicsGrid}>
                        {learningPaths.map((path) => (
                            <PathCard key={path.title} {...path} />
                        ))}
                    </div>
                </section>

                {/* Mövzular */}
                <section className={styles.topicsSection} id="topics">
                    <h2 className={styles.sectionTitle}>Mövzular</h2>
                    <div className={styles.topicsGrid}>
                        {topics.map((topic) => (
                            <TopicCard key={topic.title} {...topic} />
                        ))}
                    </div>
                </section>

                {/* Səviyyələr */}
                <section className={styles.topicsSection} id="levels">
                    <h2 className={styles.sectionTitle}>Səviyyələr</h2>
                    <div className={styles.topicsGrid}>
                        {levels.map((lvl) => (
                            <LevelCard key={lvl.title} {...lvl} />
                        ))}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.copyright}>
                            © {new Date().getFullYear()} cs.tunay.me

                        </div>
                    </div>
                </footer>
            </main>
            <meta name="algolia-site-verification"  content="0A3C3630DDD5C1E1" />
        </div>
    );
}
