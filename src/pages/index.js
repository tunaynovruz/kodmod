import React from 'react';

const topics = [
    {
        title: 'Sistem Dizaynı',
        description: 'Müasir tətbiqlər üçün miqyaslana bilən və etibarlı sistemlər qurun.',
        link: '/system-design',
    },
    {
        title: 'API',
        description: 'REST, GraphQL və digər API dizayn və tətbiq metodlarını başa düşün.',
        link: '/api',
    },
    {
        title: 'Mikroservislər',
        description: 'Mikroservis arxitekturası, nümunələr...',
        link: '/microservices',
    },
    {
        title: 'Data Strukturları',
        description: 'Nədir, harda istifadə olunur və nümunə kodlar...',
        link: '/data-structures',
    },
    {
        title: 'Alqoritmlər',
        description: 'Alqoritmlər, problem həll etmə strategiyaları və mürəkkəblik analizi haqqında...',
        link: '/algorithms',
    },
    {
        title: 'Necə dəstək olmaq olar?',
        description: 'Ətraflı məlumat üçün...',
        link: '/algorithms',
    },
];

function TopicCard({ title, description, link }) {
    return (
        <a href={link} style={styles.card} className="topic-card">
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.description}>{description}</p>
            <span style={styles.link}>Daha çox →</span>
        </a>
    );
}

export default function HomePage() {
    return (
        <>
            <main style={styles.container}>
                <header style={styles.header}>
                    <h1 style={styles.heading}>KodMod</h1>
                    <p style={styles.subheading}>
                        Kodlaşdırma, sistem dizaynı, API və s. qeydlər.
                    </p>
                </header>
                <section style={styles.grid}>
                    {topics.map((topic) => (
                        <TopicCard key={topic.title} {...topic} />
                    ))}
                </section>
                <footer style={styles.footer}>
                    <small>© {new Date().getFullYear()} KodMod.</small>
                </footer>
            </main>

            <style>{`
        .topic-card:hover {
          box-shadow: 0 8px 20px rgba(0, 112, 243, 0.3);
          transform: translateY(-5px);
          transition: all 0.3s ease;
          border-color: #0070f3;
        }
      `}</style>
        </>
    );
}

const styles = {
    container: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 960,
        margin: '0 auto',
        padding: '2rem 1rem',
        color: '#222',
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    heading: {
        fontSize: '2.5rem',
        margin: 0,
    },
    subheading: {
        fontSize: '1.2rem',
        color: '#555',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.8rem',
    },
    card: {
        display: 'block',
        padding: '1.8rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: '0 0 5px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
    },
    title: {
        margin: '0 0 0.8rem',
        fontSize: '1.5rem',
    },
    description: {
        fontSize: '1rem',
        marginBottom: '1.2rem',
        color: '#444',
        minHeight: '60px',
    },
    link: {
        fontWeight: '600',
        color: '#0070f3',
    },
    footer: {
        marginTop: '4rem',
        textAlign: 'center',
        color: '#888',
    },
};
