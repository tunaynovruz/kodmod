import React from 'react';
import styles from './styles.module.css';

export default function TagsSection({ tags }) {
    return (
        <section className={styles.tagsSection}>
            <h2 className={styles.sectionTitle}>Populyar Teqlər</h2>
            <div className={styles.tagsContainer}>
                {tags.map((tag) => (
                    <a 
                        key={tag.label} 
                        href={tag.link} 
                        className={styles.tag}
                        title={`${tag.label} haqqında daha çox`}
                    >
                        #{tag.label}
                    </a>
                ))}
            </div>
        </section>
    );
}
