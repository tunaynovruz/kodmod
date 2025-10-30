import React from 'react';
import styles from './index.module.css';
import CustomSearchBar from '@site/src/components/CustomSearchBar';
import CollapsibleLearningPath from '@site/src/components/CollapsibleLearningPath';
import TopicCard from '@site/src/components/TopicCard';
import TagsSection from '@site/src/components/TagsSection';

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
    {
        title: 'Computer Architecture',
        description: 'CPU, memory hierarchy, cache, parallelism və müasir prosessor arxitekturası.',
        link: '/computer-architecture',
    },
    {
        title: 'Image Processing',
        description: 'Rəqəmsal şəkil emalı, filtrlər, transformasiyalar və komputer görmə əsasları.',
        link: '/image-processing',
    },
    {
        title: 'Audio Processing',
        description: 'Audio siqnalların emalı, FFT, filtrlər, kompressiya və audio effektləri.',
        link: '/audio-processing',
    },
    {
        title: 'Network',
        description: 'OSI model, TCP/IP, HTTP/HTTPS, DNS, şəbəkə təhlükəsizliyi və protokollar.',
        link: '/network',
    },
];

// Öyrənmə Yolları (Learning Paths) - Genişləndirilmiş və Ətraflı
const learningPaths = [
    {
        title: 'Sistem Dizaynı Mövzuları',
        description: 'Miqyaslana bilən, etibarlı və performanslı sistem dizaynı üçün fundamental konseptlər.',
        roadmap: [
            {
                title: 'Əsas Konseptlər',
                description: 'Sistem dizaynının əsas prinsipləri və komponentləri',
                steps: [
                    { title: 'Scalability və Load Balancing', link: '/sistem-dizayn/load-balancer' },
                    { title: 'Caching strategiyaları', link: '/sistem-dizayn/caching' },
                    { title: 'Database Sharding və Replication', link: '/sistem-dizayn/database' },
                    { title: 'CAP Teoremi', link: '/sistem-dizayn/cap-theorem' },
                    { title: 'Messaging Queues', link: '/sistem-dizayn/message-queues' },
                    { title: 'CDN və Content Delivery', link: '/sistem-dizayn/cdn' },
                    { title: 'Microservices Architecture', link: '/sistem-dizayn/microservices' },
                ]
            },
            {
                title: 'İrəli Səviyyə Mövzular',
                description: 'Mürəkkəb sistem dizayn konseptləri',
                steps: [
                    { title: 'Distributed Systems', link: '/sistem-dizayn/movzular/distributed-systems' },
                    { title: 'Consistency Patterns', link: '/sistem-dizayn/movzular/consistency' },
                    { title: 'Availability Patterns', link: '/sistem-dizayn/movzular/availability' },
                    { title: 'API Gateway və Rate Limiting', link: '/sistem-dizayn/movzular/api-gateway' },
                    { title: 'Service Discovery', link: '/sistem-dizayn/movzular/service-discovery' },
                ]
            },
            {
                title: 'Performans və Optimizasiya',
                description: 'Sistem performansını artırmaq üçün texnikalar',
                steps: [
                    { title: 'Database Optimization', link: '/database' },
                    { title: 'Caching Strategies', link: '/sistem-dizayn/movzular/caching' },
                    { title: 'Horizontal vs Vertical Scaling', link: '/sistem-dizayn/movzular/scaling' },
                    { title: 'Monitoring və Logging', link: '/sistem-dizayn/movzular/monitoring' },
                ]
            }
        ]
    },
    {
        title: 'Sistem Dizaynı Sualları',
        description: 'Real müsahibə sualları və böyük miqyaslı sistemlərin dizaynı.',
        roadmap: [
            {
                title: 'Hazırlıq və Yanaşma',
                description: 'Sistem dizayn müsahibələrinə necə hazırlaşmaq',
                steps: [
                    { title: 'Tələblərin dəqiqləşdirilməsi', link: '/sistem-dizayn/suallar' },
                    { title: 'Capacity Estimation', link: '/sistem-dizayn/suallar' },
                    { title: 'API dizaynı', link: '/sistem-dizayn/suallar' },
                    { title: 'Database schema dizaynı', link: '/sistem-dizayn/suallar' },
                    { title: 'Trade-offs və bottlenecks', link: '/sistem-dizayn/suallar' },
                ]
            },
            {
                title: 'Klassik Dizayn Sualları',
                description: 'Ən çox verilən sistem dizayn müsahibə sualları',
                steps: [
                    { title: 'URL Shortener dizaynı', link: '/sistem-dizayn/design-url-shortener' },
                    { title: 'Twitter dizaynı', link: '/sistem-dizayn/design-twitter' },
                    { title: 'Instagram dizaynı', link: '/sistem-dizayn/design-instagram' },
                    { title: 'YouTube dizaynı', link: '/sistem-dizayn/design-youtube' },
                    { title: 'Uber dizaynı', link: '/sistem-dizayn/design-uber' },
                    { title: 'WhatsApp dizaynı', link: '/sistem-dizayn/design-whatsapp' },
                    { title: 'Netflix dizaynı', link: '/sistem-dizayn/design-netflix' },
                ]
            },
            {
                title: 'E-commerce və İş Sistemləri',
                description: 'Ticarət və biznes tətbiqlərinin dizaynı',
                steps: [
                    { title: 'E-commerce Platform', link: '/sistem-dizayn/design-ecommerce' },
                    { title: 'Payment System', link: '/sistem-dizayn/design-payment' },
                    { title: 'Booking System', link: '/sistem-dizayn/design-booking' },
                ]
            }
        ]
    },
    {
        title: 'Backend Mühəndisliyi Yol Xəritəsi',
        description: 'Java və Spring ilə professional backend developer olmaq üçün addım-addım təlimat.',
        roadmap: [
            {
                title: 'Java Fundamentalları',
                description: 'Java dilinin əsasları və core konseptlər',
                steps: [
                    { title: 'OOP Prinsipləri', link: '/java' },
                    { title: 'Collections Framework', link: '/java' },
                    { title: 'Streams və Lambda', link: '/java' },
                    { title: 'Multithreading', link: '/java' },
                    { title: 'Exception Handling', link: '/java' },
                ]
            },
            {
                title: 'Spring Framework',
                description: 'Spring və Spring Boot ilə enterprise tətbiqlər',
                steps: [
                    { title: 'Spring Core və Dependency Injection', link: '/java' },
                    { title: 'Spring Boot', link: '/java' },
                    { title: 'Spring Data JPA', link: '/java' },
                    { title: 'Spring Security', link: '/security' },
                    { title: 'REST API Development', link: '/java' },
                ]
            },
            {
                title: 'Database və Persistence',
                description: 'Verilənlər bazası idarəetməsi və optimizasiya',
                steps: [
                    { title: 'SQL və Relational Databases', link: '/database' },
                    { title: 'NoSQL Databases', link: '/database' },
                    { title: 'Database Indexing', link: '/database' },
                    { title: 'Transaction Management', link: '/database' },
                ]
            },
            {
                title: 'Mikroservislər və Deployment',
                description: 'Mikroservis arxitekturası və DevOps',
                steps: [
                    { title: 'Mikroservis Patternləri', link: '/mikroservisler' },
                    { title: 'Docker və Containerization', link: '/texnologiyalar' },
                    { title: 'Kubernetes', link: '/texnologiyalar' },
                    { title: 'CI/CD Pipeline', link: '/texnologiyalar' },
                ]
            }
        ]
    },
    {
        title: 'Alqoritmlər və Data Strukturları Yolu',
        description: 'Kodlaşma müsahibələri və problem həll etmək üçün fundamental bilikler.',
        roadmap: [
            {
                title: 'Əsas Data Strukturları',
                description: 'Fundamental data strukturlarının öyrənilməsi',
                steps: [
                    { title: 'Array və String', link: '/data-strukturlar' },
                    { title: 'Linked List', link: '/data-strukturlar' },
                    { title: 'Stack və Queue', link: '/data-strukturlar' },
                    { title: 'Hash Table', link: '/data-strukturlar' },
                    { title: 'Tree (Binary, BST)', link: '/data-strukturlar' },
                    { title: 'Heap', link: '/data-strukturlar' },
                    { title: 'Graph', link: '/data-strukturlar' },
                ]
            },
            {
                title: 'Alqoritmlər',
                description: 'Problem həll strategiyaları və texnikaları',
                steps: [
                    { title: 'Sorting və Searching', link: '/alqoritmler' },
                    { title: 'Two Pointers', link: '/alqoritmler' },
                    { title: 'Sliding Window', link: '/alqoritmler' },
                    { title: 'Recursion və Backtracking', link: '/alqoritmler' },
                    { title: 'Dynamic Programming', link: '/alqoritmler/dp' },
                    { title: 'Greedy Algorithms', link: '/alqoritmler' },
                    { title: 'Graph Algorithms (BFS, DFS)', link: '/alqoritmler' },
                ]
            },
            {
                title: 'Praktika və Müsahibə',
                description: 'Real problemlər və müsahibə hazırlığı',
                steps: [
                    { title: 'LeetCode Easy problemlər' },
                    { title: 'LeetCode Medium problemlər' },
                    { title: 'LeetCode Hard problemlər' },
                    { title: 'Mock Interview', link: '/interview' },
                ]
            }
        ]
    },
    {
        title: 'Mikroservislər Arxitekturası',
        description: 'Mikroservis dizaynı, implementasiyası və best practices.',
        roadmap: [
            {
                title: 'Mikroservis Əsasları',
                description: 'Mikroservislərə giriş və əsas prinsiplər',
                steps: [
                    { title: 'Monolith vs Mikroservis', link: '/mikroservisler' },
                    { title: 'Domain Driven Design', link: '/mikroservisler' },
                    { title: 'Service Discovery', link: '/mikroservisler' },
                    { title: 'API Gateway', link: '/mikroservisler' },
                ]
            },
            {
                title: 'Kommunikasiya Patternləri',
                description: 'Servislər arası əlaqə strategiyaları',
                steps: [
                    { title: 'REST API', link: '/mikroservisler' },
                    { title: 'gRPC', link: '/mikroservisler' },
                    { title: 'Message Queues (Kafka, RabbitMQ)', link: '/texnologiyalar' },
                    { title: 'Event-Driven Architecture', link: '/mikroservisler' },
                ]
            },
            {
                title: 'Resilience və Monitoring',
                description: 'Etibarlılıq və izləmə',
                steps: [
                    { title: 'Circuit Breaker Pattern', link: '/mikroservisler' },
                    { title: 'Distributed Tracing', link: '/mikroservisler' },
                    { title: 'Logging və Monitoring', link: '/mikroservisler' },
                    { title: 'Health Checks', link: '/mikroservisler' },
                ]
            }
        ]
    },
    {
        title: 'Database Mütəxəssisliyi',
        description: 'SQL və NoSQL database-lərdə dərin bilik əldə edin.',
        roadmap: [
            {
                title: 'SQL Mastery',
                description: 'Relational database-lər və SQL',
                steps: [
                    { title: 'SQL Queries və Joins', link: '/database' },
                    { title: 'Indexing strategiyaları', link: '/database' },
                    { title: 'Query Optimization', link: '/database' },
                    { title: 'Transactions və ACID', link: '/database' },
                    { title: 'Database Normalization', link: '/database' },
                ]
            },
            {
                title: 'NoSQL Databases',
                description: 'Müxtəlif NoSQL database növləri',
                steps: [
                    { title: 'Document Stores (MongoDB)', link: '/database' },
                    { title: 'Key-Value Stores (Redis)', link: '/texnologiyalar' },
                    { title: 'Column Family (Cassandra)', link: '/database' },
                    { title: 'Graph Databases', link: '/database' },
                ]
            },
            {
                title: 'Scalability və Performance',
                description: 'Böyük məlumat həcmləri ilə işləmək',
                steps: [
                    { title: 'Sharding', link: '/database' },
                    { title: 'Replication', link: '/database' },
                    { title: 'Caching Strategies', link: '/sistem-dizayn' },
                    { title: 'Database Performance Tuning', link: '/database' },
                ]
            }
        ]
    },
    {
        title: 'Təhlükəsizlik (Security) Mütəxəssisi',
        description: 'Veb və tətbiq təhlükəsizliyində ekspertlik.',
        roadmap: [
            {
                title: 'Veb Təhlükəsizlik Əsasları',
                description: 'Ümumi təhlükələr və müdafiə yolları',
                steps: [
                    { title: 'OWASP Top 10', link: '/security' },
                    { title: 'SQL Injection', link: '/security' },
                    { title: 'XSS və CSRF', link: '/security' },
                    { title: 'Authentication vs Authorization', link: '/security' },
                ]
            },
            {
                title: 'Authentication və Authorization',
                description: 'İstifadəçi identifikasiyası və icazələr',
                steps: [
                    { title: 'OAuth 2.0', link: '/security' },
                    { title: 'JWT Tokens', link: '/security' },
                    { title: 'Session Management', link: '/security' },
                    { title: 'Role-Based Access Control', link: '/security' },
                ]
            },
            {
                title: 'Advanced Security',
                description: 'İrəli səviyyə təhlükəsizlik konseptləri',
                steps: [
                    { title: 'Encryption və Hashing', link: '/security' },
                    { title: 'Rate Limiting', link: '/security' },
                    { title: 'API Security', link: '/security' },
                    { title: 'Security Best Practices', link: '/security' },
                ]
            }
        ]
    },
    {
        title: 'Computer Architecture',
        description: 'Müasir prosessor arxitekturası, memory hierarchy və performans optimizasiyası.',
        roadmap: [
            {
                title: 'Əsas Konseptlər',
                description: 'CPU və memory əsasları',
                steps: [
                    { title: 'CPU Architecture', link: '/computer-architecture/cpu-architecture' },
                    { title: 'Memory Hierarchy', link: '/computer-architecture/memory-hierarchy' },
                    { title: 'Cache Memory', link: '/computer-architecture/cache-memory' },
                    { title: 'Instruction Set Architecture (ISA)', link: '/computer-architecture/instruction-set-architecture' },
                ]
            },
            {
                title: 'Performans və Optimizasiya',
                description: 'CPU performansı və optimization texnikaları',
                steps: [
                    { title: 'CPU Performance', link: '/computer-architecture/cpu-performance' },
                    { title: 'Branch Prediction', link: '/computer-architecture/branch-prediction' },
                    { title: 'Memory Ordering', link: '/computer-architecture/memory-ordering' },
                    { title: 'Performance Optimization', link: '/computer-architecture/performance-optimization' },
                ]
            },
            {
                title: 'Parallelizm və Multiprocessor',
                description: 'Paralel sistemlər və çoxnüvəli arxitektura',
                steps: [
                    { title: 'Parallelism', link: '/computer-architecture/parallelism' },
                    { title: 'Multiprocessor Systems', link: '/computer-architecture/multiprocessor-systems' },
                    { title: 'Synchronization', link: '/computer-architecture/synchronization' },
                    { title: 'Modern Architectures', link: '/computer-architecture/modern-architectures' },
                ]
            },
            {
                title: 'Sistem Komponentləri',
                description: 'I/O, storage və digər sistem komponentləri',
                steps: [
                    { title: 'I/O Systems', link: '/computer-architecture/io-systems' },
                    { title: 'Storage Systems', link: '/computer-architecture/storage-systems' },
                    { title: 'Virtualization', link: '/computer-architecture/virtualization' },
                    { title: 'Power Management', link: '/computer-architecture/power-management' },
                    { title: 'Security Features', link: '/computer-architecture/security-features' },
                ]
            }
        ]
    },
    {
        title: 'Network',
        description: 'Şəbəkə protokolları, TCP/IP, HTTP və şəbəkə təhlükəsizliyi.',
        roadmap: [
            {
                title: 'Şəbəkə Fundamentalları',
                description: 'Əsas şəbəkə konseptləri və protokollar',
                steps: [
                    { title: 'OSI Model', link: '/network/osi-model' },
                    { title: 'TCP/IP', link: '/network/tcp-ip' },
                    { title: 'HTTP/HTTPS', link: '/network/http-https' },
                    { title: 'DNS', link: '/network/dns' },
                ]
            },
            {
                title: 'İrəli Səviyyə Mövzular',
                description: 'Şəbəkə təhlükəsizliyi və miqyaslanma',
                steps: [
                    { title: 'Network Security', link: '/network/network-security' },
                    { title: 'Load Balancing', link: '/network/load-balancing' },
                    { title: 'CDN (Content Delivery Network)', link: '/network/cdn' },
                    { title: 'WebSocket', link: '/network/websocket' },
                ]
            }
        ]
    },
    {
        title: 'Image Processing',
        description: 'Rəqəmsal şəkil emalı, filtrlər və komputer görmə əsasları.',
        roadmap: [
            {
                title: 'Əsas Konseptlər',
                description: 'Şəkil emalının əsasları',
                steps: [
                    { title: 'Image Basics', link: '/image-processing/image-basics' },
                    { title: 'Color Spaces', link: '/image-processing/color-spaces' },
                    { title: 'Histogram Processing', link: '/image-processing/histogram-processing' },
                ]
            },
            {
                title: 'Filtrlər və Transformasiyalar',
                description: 'Şəkil filtrasiyası və transformasiya texnikaları',
                steps: [
                    { title: 'Filtering və Convolution', link: '/image-processing/filtering-convolution' },
                    { title: 'Edge Detection', link: '/image-processing/edge-detection' },
                    { title: 'Image Transformations', link: '/image-processing/image-transformations' },
                    { title: 'Morphological Operations', link: '/image-processing/morphological-operations' },
                ]
            },
            {
                title: 'İrəli Səviyyə',
                description: 'Şəkil kompressiyası və kompleks əməliyyatlar',
                steps: [
                    { title: 'Image Compression', link: '/image-processing/image-compression' },
                ]
            }
        ]
    },
    {
        title: 'Audio Processing',
        description: 'Audio siqnal emalı, FFT, kompressiya və audio effektləri.',
        roadmap: [
            {
                title: 'Əsas Konseptlər',
                description: 'Audio emalının əsasları',
                steps: [
                    { title: 'Audio Fundamentals', link: '/audio-processing/audio-fundamentals' },
                    { title: 'Sampling və Quantization', link: '/audio-processing/sampling-quantization' },
                ]
            },
            {
                title: 'Audio Emalı Texnikaları',
                description: 'Filtrlər və tezlik analizi',
                steps: [
                    { title: 'Digital Filters', link: '/audio-processing/digital-filters' },
                    { title: 'FFT və Frequency Analysis', link: '/audio-processing/fft-frequency-analysis' },
                ]
            },
            {
                title: 'İrəli Səviyyə',
                description: 'Kompressiya və effektlər',
                steps: [
                    { title: 'Audio Compression', link: '/audio-processing/audio-compression' },
                    { title: 'Audio Effects', link: '/audio-processing/audio-effects' },
                ]
            }
        ]
    },
    {
        title: 'Interview Hazırlığı',
        description: 'Texniki müsahibələrə tam hazırlıq - kodlaşma, OOD və sistem dizayn.',
        roadmap: [
            {
                title: 'Kodlaşma Müsahibələri',
                description: 'Algorithm və data structure sualları',
                steps: [
                    { title: 'Array və String problemləri', link: '/alqoritmler' },
                    { title: 'Tree və Graph sualları', link: '/alqoritmler' },
                    { title: 'Dynamic Programming', link: '/alqoritmler/dp' },
                    { title: 'Time və Space Complexity', link: '/alqoritmler' },
                ]
            },
            {
                title: 'Object-Oriented Design',
                description: 'OOD müsahibə sualları',
                steps: [
                    { title: 'Design Patterns', link: '/design-patternler' },
                    { title: 'SOLID Prinsipləri', link: '/design-patternler' },
                    { title: 'UML Diaqramları', link: '/diaqramlar' },
                    { title: 'OOD praktik suallar', link: '/interview' },
                ]
            },
            {
                title: 'Sistem Dizayn Müsahibələri',
                description: 'Böyük miqyaslı sistem dizaynı',
                steps: [
                    { title: 'Sistem Dizayn Fundamentalları', link: '/sistem-dizayn' },
                    { title: 'Scalability Patternləri', link: '/sistem-dizayn' },
                    { title: 'Praktik sistem dizayn sualları', link: '/sistem-dizayn/suallar' },
                ]
            },
            {
                title: 'Behavioral Interview',
                description: 'Davranışsal müsahibə hazırlığı',
                steps: [
                    { title: 'STAR metodu', link: '/interview' },
                    { title: 'Liderlik sualları', link: '/interview' },
                    { title: 'Konflikt həlli', link: '/interview' },
                ]
            }
        ]
    }
];

// Populyar Teqlər
const popularTags = [
    { label: 'Java', link: '/java' },
    { label: 'Spring', link: '/java' },
    { label: 'Sistem Dizaynı', link: '/sistem-dizayn' },
    { label: 'Mikroservislər', link: '/mikroservisler' },
    { label: 'Database', link: '/database' },
    { label: 'SQL', link: '/database' },
    { label: 'NoSQL', link: '/database' },
    { label: 'Docker', link: '/texnologiyalar' },
    { label: 'Kubernetes', link: '/texnologiyalar' },
    { label: 'Kafka', link: '/texnologiyalar' },
    { label: 'Redis', link: '/texnologiyalar' },
    { label: 'REST API', link: '/java' },
    { label: 'Alqoritmlər', link: '/alqoritmler' },
    { label: 'Data Strukturları', link: '/data-strukturlar' },
    { label: 'Dynamic Programming', link: '/alqoritmler/dp' },
    { label: 'Design Patterns', link: '/design-patternler' },
    { label: 'Security', link: '/security' },
    { label: 'OAuth', link: '/security' },
    { label: 'Testing', link: '/testing' },
    { label: 'Interview', link: '/interview' },
    { label: 'Load Balancing', link: '/sistem-dizayn' },
    { label: 'Caching', link: '/sistem-dizayn' },
    { label: 'Sharding', link: '/database' },
    { label: 'CAP Theorem', link: '/sistem-dizayn' },
    { label: 'Computer Architecture', link: '/computer-architecture' },
    { label: 'Network', link: '/network' },
    { label: 'Image Processing', link: '/image-processing' },
    { label: 'Audio Processing', link: '/audio-processing' },
    { label: 'TCP/IP', link: '/network' },
    { label: 'HTTP/HTTPS', link: '/network' },
];


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
