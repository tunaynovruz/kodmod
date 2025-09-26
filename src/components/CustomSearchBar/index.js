import React, { useState } from 'react';
import styles from './index.module.css';

export default function CustomSearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // Navigate to Docusaurus search page with query
            window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.searchInputWrapper}>
                    <svg
                        className={styles.searchIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Axtarış..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.searchInput}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className={styles.clearButton}
                        >
                            ×
                        </button>
                    )}
                </div>
                <button type="submit" className={styles.searchButton}>
                    Axtar
                </button>
            </form>
        </div>
    );
}
