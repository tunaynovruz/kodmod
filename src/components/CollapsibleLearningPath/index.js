import React, { useState } from 'react';
import styles from './styles.module.css';

export default function CollapsibleLearningPath({ title, description, roadmap }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.pathContainer}>
            <div className={styles.pathHeader} onClick={toggleExpand}>
                <div className={styles.pathHeaderContent}>
                    <h3 className={styles.pathTitle}>{title}</h3>
                    <p className={styles.pathDescription}>{description}</p>
                </div>
                <div className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                    {isExpanded ? '−' : '+'}
                </div>
            </div>
            
            {isExpanded && (
                <div className={styles.pathContent}>
                    {roadmap.map((section, idx) => (
                        <div key={idx} className={styles.roadmapSection}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.sectionNumber}>{idx + 1}</span>
                                <h4 className={styles.sectionTitle}>{section.title}</h4>
                            </div>
                            {section.description && (
                                <p className={styles.sectionDescription}>{section.description}</p>
                            )}
                            {section.steps && section.steps.length > 0 && (
                                <ul className={styles.stepsList}>
                                    {section.steps.map((step, stepIdx) => (
                                        <li key={stepIdx} className={styles.step}>
                                            {step.link ? (
                                                <a href={step.link} className={styles.stepLink}>
                                                    {step.title}
                                                </a>
                                            ) : (
                                                <span>{step.title}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
