import React from 'react';
import styles from './styles.module.css';

export default function TopicCard({ title, description, link, icon }) {
    return (
        <a href={link} className={styles.topicCard}>
            {icon && <div className={styles.topicIcon}>{icon}</div>}
            <h3 className={styles.topicTitle}>{title}</h3>
            <p className={styles.topicDescription}>{description}</p>
            <span className={styles.topicLink}>Daha çox →</span>
        </a>
    );
}
