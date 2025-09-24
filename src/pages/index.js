import React from 'react';
import styles from './index.module.css';

const topics = [
    {
        title: 'Sistem Dizaynı',
        description: 'Müasir tətbiqlər üçün miqyaslana bilən və etibarlı sistemlər qurun.',
        link: '/sistem-dizayn',
        icon: '🏗️',
    },
    {
        title: 'Mikroservislər',
        description: 'Mikroservis arxitekturası, dizayn prinsipləri və implementasiya nümunələri.',
        link: '/mikroservisler',
        icon: '🔌',
    },

    {
        title: 'DataBase',
        description: 'SQL və NoSQL database-lər, indexing, optimization və digər konseptlər.',
        link: '/database',
        icon: '🗄️',
    },
    {
        title: 'Dizayn Patternlər',
        description: 'Proqram təminatı dizaynında istifadə olunan pattern-lər və Java-da implementasiyaları.',
        link: '/design-patternler',
        icon: '🧩',
    },
    {
        title: 'Data Strukturları',
        description: 'Əsas data strukturları, onların implementasiyası və istifadə sahələri.',
        link: '/data-strukturlar',
        icon: '📊',
    },{
        title: 'Alqoritmlər',
        description: 'Alqoritmlər, problem həll etmə strategiyaları və mürəkkəblik analizi haqqında.',
        link: '/alqoritmler',
        icon: '🧮',
    },
    {
        title: 'Java',
        description: 'Java proqramlaşdırma dili, collections, streams, multithreading və digər xüsusiyyətlər.',
        link: '/java',
        icon: '☕',
    },
    {
        title: 'Texnologiyalar',
        description: 'Docker, Kubernetes, Kafka, Redis və digər müasir texnologiyalar.',
        link: '/texnologiyalar',
        icon: '🚀',
    }
];

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

                <section className={styles.topicsSection}>
                    <h2 className={styles.sectionTitle}>Mövzular</h2>
                    <div className={styles.topicsGrid}>
                        {topics.map((topic) => (
                            <TopicCard key={topic.title} {...topic} />
                        ))}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerLinks}>
                            <a href="https://github.com/tunaynovruz/kodmod" className={styles.footerLink}>GitHub</a>
                        </div>
                        <div className={styles.copyright}>
                            © {new Date().getFullYear()} Kodmod
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
