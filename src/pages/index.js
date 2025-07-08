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
        link: '/algorithms',
        icon: '🧮',
    },
    {
        title: 'Data Strukturları',
        description: 'Əsas data strukturları, onların implementasiyası və istifadə sahələri.',
        link: '/data-structures',
        icon: '📊',
    },
    {
        title: 'Verilənlər Bazası',
        description: 'SQL və NoSQL database-lər, indexing, optimization və digər konseptlər.',
        link: '/database',
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
        link: '/microservices',
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
        <a href={link} className="topicCard">
            <div className="topicIcon">{icon}</div>
            <h2 className="topicTitle">{title}</h2>
            <p className="topicDescription">{description}</p>
            <span className="topicLink">Daha çox →</span>
        </a>
    );
}

export default function HomePage() {
    return (
        <div className="homepageWrapper">
            <main className="homepageContainer">
                <header className="hero">
                    <h1 className="heroTitle">KodMod</h1>
                    <p className="heroSubtitle">
                        Proqramlaşdırma və sistem dizaynı üzrə Azərbaycan dilində resurslar
                    </p>
                    <div className="heroDescription">
                        <p>
                            KodMod layihəsi proqramçılar üçün Azərbaycan dilində texniki bilikləri paylaşmaq məqsədi daşıyır. 
                            Burada Java, sistem dizaynı, alqoritmlər, data strukturları və digər mövzular üzrə materiallar tapa bilərsiniz.
                        </p>
                    </div>
                </header>

                <section className="topicsSection">
                    <h2 className="sectionTitle">Əsas Mövzular</h2>
                    <div className="topicsGrid">
                        {topics.map((topic) => (
                            <TopicCard key={topic.title} {...topic} />
                        ))}
                    </div>
                </section>

                <footer className="footer">
                    <div className="footerContent">
                        <div className="footerLinks">
                            <a href="/about" className="footerLink">Haqqımızda</a>
                            <a href="https://github.com/tunaynovruz/kodmod" className="footerLink">GitHub</a>
                        </div>
                        <div className="copyright">
                            © {new Date().getFullYear()} KodMod. Bütün hüquqlar qorunur.
                        </div>
                    </div>
                </footer>
            </main>

            <style jsx>{`
                .homepageWrapper {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: var(--ifm-font-color-base);
                    background-color: var(--ifm-background-color);
                }

                .homepageContainer {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1.5rem;
                }

                .hero {
                    text-align: center;
                    padding: 3rem 1rem;
                    margin-bottom: 2rem;
                    background: linear-gradient(to right, rgba(46, 133, 85, 0.1), rgba(60, 173, 110, 0.1));
                    border-radius: 12px;
                }

                .heroTitle {
                    font-size: 3.5rem;
                    font-weight: 700;
                    margin: 0;
                    background: linear-gradient(45deg, var(--ifm-color-primary-dark), var(--ifm-color-primary-light));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .heroSubtitle {
                    font-size: 1.5rem;
                    margin: 1rem 0;
                    color: var(--ifm-color-emphasis-700);
                }

                .heroDescription {
                    max-width: 800px;
                    margin: 1.5rem auto;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: var(--ifm-color-emphasis-700);
                }

                .sectionTitle {
                    text-align: center;
                    font-size: 2rem;
                    margin: 2rem 0;
                    color: var(--ifm-color-primary-dark);
                }

                .topicsSection {
                    margin: 3rem 0;
                }

                .topicsGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .topicCard {
                    display: flex;
                    flex-direction: column;
                    padding: 1.8rem;
                    border-radius: 12px;
                    background-color: var(--ifm-card-background-color, #fff);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: inherit;
                    border: 1px solid var(--ifm-color-emphasis-200);
                    height: 100%;
                }

                .topicCard:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 24px rgba(46, 133, 85, 0.2);
                    border-color: var(--ifm-color-primary);
                }

                .topicIcon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .topicTitle {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0 0 1rem;
                    color: var(--ifm-heading-color);
                }

                .topicDescription {
                    flex-grow: 1;
                    font-size: 1rem;
                    line-height: 1.5;
                    color: var(--ifm-color-emphasis-700);
                    margin-bottom: 1.2rem;
                }

                .topicLink {
                    font-weight: 600;
                    color: var(--ifm-color-primary);
                    display: inline-block;
                }

                .footer {
                    margin-top: 4rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--ifm-color-emphasis-200);
                }

                .footerContent {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .footerLinks {
                    display: flex;
                    gap: 1.5rem;
                }

                .footerLink {
                    color: var(--ifm-color-emphasis-700);
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .footerLink:hover {
                    color: var(--ifm-color-primary);
                }

                .copyright {
                    color: var(--ifm-color-emphasis-600);
                    font-size: 0.9rem;
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .heroTitle {
                        font-size: 2.5rem;
                    }

                    .heroSubtitle {
                        font-size: 1.2rem;
                    }

                    .heroDescription {
                        font-size: 1rem;
                    }

                    .topicsGrid {
                        grid-template-columns: 1fr;
                    }

                    .sectionTitle {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
