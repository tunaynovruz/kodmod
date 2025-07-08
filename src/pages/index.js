import React from 'react';
import styles from './index.module.css';

const topics = [
    {
        title: 'Java',
        description: 'Java proqramlaşdırma dili, collections, streams, multithreading və digər xüsusiyyətlər.',
        link: '/java',
        icon: '☕',
    },
    {
        title: 'Dizayn Pattern-lər',
        description: 'Proqram təminatı dizaynında istifadə olunan pattern-lər və Java-da implementasiyaları.',
        link: '/design-patterns',
        icon: '🧩',
    },
    {
        title: 'Sistem Dizaynı',
        description: 'Müasir tətbiqlər üçün miqyaslana bilən və etibarlı sistemlər qurun.',
        link: '/sistem-dizayn',
        icon: '🏗️',
    },
    {
        title: 'Alqoritmlər',
        description: 'Alqoritmlər, problem həll etmə strategiyaları və mürəkkəblik analizi haqqında.',
        link: '/alqoritmler',
        icon: '🧮',
    },
    {
        title: 'Data Strukturları',
        description: 'Əsas data strukturları, onların implementasiyası və istifadə sahələri.',
        link: '/data-strukturlar',
        icon: '📊',
    },
    {
        title: 'Verilənlər Bazası',
        description: 'SQL və NoSQL database-lər, indexing, optimization və digər konseptlər.',
        link: '/verilenler-bazasi',
        icon: '🗄️',
    },
    {
        title: 'Texnologiyalar',
        description: 'Docker, Kubernetes, Kafka, Redis və digər müasir texnologiyalar.',
        link: '/tech',
        icon: '🚀',
    },
    {
        title: 'Mikroservislər',
        description: 'Mikroservis arxitekturası, dizayn prinsipləri və implementasiya nümunələri.',
        link: '/mikroservisler/giris',
        icon: '🔌',
    },
    {
        title: 'Necə dəstək olmaq olar?',
        description: 'Layihəyə töhfə vermək və əməkdaşlıq etmək haqqında məlumat.',
        link: '/contribute',
        icon: '🤝',
    },
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
                    <h1 className={styles.heroTitle}>KodMod</h1>
                    <p className={styles.heroSubtitle}>
                        Proqramlaşdırma və sistem dizaynı üzrə Azərbaycan dilində resurslar
                    </p>
                    <div className={styles.heroDescription}>
                        <p>
                            KodMod layihəsi proqramçılar üçün Azərbaycan dilində texniki bilikləri paylaşmaq məqsədi daşıyır. 
                            Burada Java, sistem dizaynı, alqoritmlər, data strukturları və digər mövzular üzrə materiallar tapa bilərsiniz.
                        </p>
                    </div>
                </header>

                <section className={styles.topicsSection}>
                    <h2 className={styles.sectionTitle}>Əsas Mövzular</h2>
                    <div className={styles.topicsGrid}>
                        {topics.map((topic) => (
                            <TopicCard key={topic.title} {...topic} />
                        ))}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerLinks}>
                            <a href="/about" className={styles.footerLink}>Haqqımızda</a>
                            <a href="https://github.com/tunaynovruz/kodmod" className={styles.footerLink}>GitHub</a>
                        </div>
                        <div className={styles.copyright}>
                            © {new Date().getFullYear()} KodMod. Bütün hüquqlar qorunur.
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
