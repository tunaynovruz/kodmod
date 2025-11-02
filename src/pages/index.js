import React from 'react';
import styles from './index.module.css';
import CustomSearchBar from '@site/src/components/CustomSearchBar';
import CollapsibleLearningPath from '@site/src/components/CollapsibleLearningPath';
import TopicCard from '@site/src/components/TopicCard';
import TagsSection from '@site/src/components/TagsSection';
import topics from '@site/src/data/topics';
import learningPaths from '@site/src/data/learningPaths';
import popularTags from '@site/src/data/tags';

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

                {/* Axtarış */}
                <CustomSearchBar />

                {/* Öyrənmə Yolları - Collapsible */}
                <section className={styles.learningPathsSection} id="learning-paths">
                    <h2 className={styles.sectionTitle}>Öyrənmə Yol Xəritələri</h2>
                    <p className={styles.sectionSubtitle}>
                        Addım-addım strukturlaşdırılmış öyrənmə yolları. Hər birinin üzərinə klikləyərək ətraflı məlumat əldə edin.
                    </p>
                    <div className={styles.learningPathsContainer}>
                        {learningPaths.map((path) => (
                            <CollapsibleLearningPath key={path.title} {...path} />
                        ))}
                    </div>
                </section>

                {/* Bütün Mövzular */}
                <section className={styles.topicsSection} id="topics">
                    <h2 className={styles.sectionTitle}>Bütün Mövzular</h2>
                    <p className={styles.sectionSubtitle}>
                        Backend, Database, Sistem Dizaynı, Computer Architecture, Network və digər texniki mövzular üzrə ətraflı məlumatlar.
                    </p>
                    <div className={styles.topicsGrid}>
                        {topics.map((topic) => (
                            <TopicCard key={topic.title} {...topic} />
                        ))}
                    </div>
                </section>

                {/* Populyar Teqlər */}
                <TagsSection tags={popularTags} />

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
