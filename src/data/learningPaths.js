// Öyrənmə Yolları (Learning Paths) - Genişləndirilmiş və Ətraflı
const learningPaths = [
    {
        title: 'Sistem Dizaynı Yol xəritəsi',
        description: 'Miqyaslana bilən, etibarlı və performanslı sistem dizaynı üçün fundamental konseptlər.',
        roadmap: [
            {
                title: 'Əsas Konseptlər',
                description: 'Sistem dizaynının fundamental prinsipləri',
                steps: [
                    { title: 'Load Balancers', link: '/sistem-dizayn/load-balancer' },
                    { title: 'Caching', link: '/sistem-dizayn/cache' },
                    { title: 'API Gateway', link: '/sistem-dizayn/api-gateway' },
                    { title: 'API Design', link: '/sistem-dizayn/api-design' },
                ]
            },
            {
                title: 'İrəli Səviyyə Mövzular',
                description: 'Kompleks sistem dizayn patternləri',
                steps: [
                    { title: 'Consistent Hashing', link: '/sistem-dizayn/consistent-hashing' },
                    { title: 'Distributed Systems', link: '/sistem-dizayn/distributed-systems' },
                    { title: 'CDN', link: '/sistem-dizayn/cdn' },
                    { title: 'Proxy', link: '/sistem-dizayn/proxy' },
                ]
            },
            {
                title: 'Sistem Dizayn Müsahibələri',
                description: 'Real müsahibə sualları və həllər',
                steps: [
                    { title: 'Design URL Shortener', link: '/sistem-dizayn/url-shortener' },
                    { title: 'Design Twitter', link: '/sistem-dizayn/twitter' },
                    { title: 'Design Instagram', link: '/sistem-dizayn/instagram' },
                    { title: 'Design Uber', link: '/sistem-dizayn/uber' },
                ]
            }
        ]
    },
    {
        title: 'Alqoritmlər və Data Strukturları Yol xəritəsi',
        description: 'Kodlaşma müsahibələri və problem həll etmək üçün fundamental bilikler.',
        roadmap: [
            {
                title: 'Data Strukturları',
                description: 'Əsas data strukturları',
                steps: [
                    { title: 'Array', link: '/data-strukturlar/array' },
                    { title: 'Linked List', link: '/data-strukturlar/linkedlist' },
                    { title: 'Stack', link: '/data-strukturlar/stack' },
                    { title: 'Queue', link: '/data-strukturlar/queue' },
                    { title: 'Heap', link: '/data-strukturlar/heap' },
                    { title: 'Hash Map', link: '/data-strukturlar/hashmap' },
                    { title: 'Hash Set', link: '/data-strukturlar/hashset' },
                    { title: 'Tree', link: '/data-strukturlar/tree-data-structure' },
                    { title: 'Graph', link: '/data-strukturlar/graph' },
                    { title: 'Trie', link: '/data-strukturlar/trie' },
                ]
            },
            {
                title: 'Dynamic Programming',
                description: 'Dynamic Programming mövzuları və həllər',
                steps: [
                    { title: 'Fibonacci', link: '/alqoritmler/dp/fibonacci' },
                    { title: 'Climbing Stairs', link: '/alqoritmler/dp/climbing-stairs' },
                    { title: 'Coin Change', link: '/alqoritmler/dp/coin-change' },
                    { title: 'Knapsack', link: '/alqoritmler/dp/knapsack' },
                    { title: 'Longest Common Subsequence', link: '/alqoritmler/dp/longest-common-subsequence' },
                ]
            }
        ]
    },
    {
        title: 'Mikroservislər Yol xəritəsi',
        description: 'Mikroservis dizaynı, implementasiyası və best practices.',
        roadmap: [
            {
                title: 'Əsas Konseptlər',
                description: 'Mikroservis arxitekturasının əsasları',
                steps: [
                    { title: 'Service Discovery', link: '/mikroservisler/service-discovery' },
                    { title: 'API Composition', link: '/mikroservisler/api-composition' },
                    { title: 'Database per Service', link: '/mikroservisler/database-per-service' },
                    { title: 'Domain-Driven Design', link: '/mikroservisler/domain-driven-design' },
                ]
            },
            {
                title: 'Kommunikasiya və Patternlər',
                description: 'Servislər arası əlaqə və dizayn patternləri',
                steps: [
                    { title: 'Kommunikasiya', link: '/mikroservisler/kommunikasiya' },
                    { title: 'Event-Driven Architecture', link: '/mikroservisler/event-driven' },
                    { title: 'CQRS', link: '/mikroservisler/cqrs' },
                    { title: 'Saga Pattern', link: '/mikroservisler/saga' },
                ]
            },
            {
                title: 'Best Practices',
                description: 'Mikroservis dizayn patternləri və deployment',
                steps: [
                    { title: 'Circuit Breaker', link: '/mikroservisler/circuit-breaker' },
                    { title: 'Hexagonal Architecture', link: '/mikroservisler/hexagonal' },
                    { title: 'Deployment Strategiyalar', link: '/mikroservisler/deployment-strategiyalar' },
                    { title: 'Dead Letter Queue', link: '/mikroservisler/dlq' },
                ]
            }
        ]
    },
    {
        title: 'Database Yol xəritəsi',
        description: 'SQL və NoSQL database-lərdə dərin bilik əldə edin.',
        roadmap: [
            {
                title: 'Database Əsasları',
                description: 'SQL və NoSQL database fundamentalları',
                steps: [
                    { title: 'SQL', link: '/database/sql' },
                    { title: 'İndekslər', link: '/database/indeksler' },
                    { title: 'Transactions', link: '/database/transactions' },
                    { title: 'ACID Properties', link: '/database/acid' },
                    { title: 'NoSQL', link: '/database/nosql' },
                    { title: 'Normalization', link: '/database/normalization' },
                ]
            },
            {
                title: 'İrəli Səviyyə',
                description: 'Database optimization və miqyaslanma',
                steps: [
                    { title: 'Sharding və Partitioning', link: '/database/sharding-partitioning' },
                    { title: 'Replication', link: '/database/replication' },
                    { title: 'Optimistic vs Pessimistic Lock', link: '/database/optimistic-vs-pessimistic-lock' },
                    { title: 'N+1 Problem', link: '/database/nplus1problem' },
                ]
            }
        ]
    },
    {
        title: 'Computer Arxitekturası Yol xəritəsi',
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
        title: 'İntervyu hazırlığı',
        description: 'Texniki müsahibələrə tam hazırlıq - kodlaşma, OOD və sistem dizayn.',
        roadmap: [
            {
                title: 'Object-Oriented Design Sualları',
                description: 'OOD müsahibə sualları və həllər',
                steps: [
                    { title: 'ATM System', link: '/interview/ood-suallar/ood/atm' },
                    { title: 'Elevator System', link: '/interview/ood-suallar/ood/elevator' },
                    { title: 'Parking Lot', link: '/interview/ood-suallar/ood/parking-lot' },
                    { title: 'Vending Machine', link: '/interview/ood-suallar/ood/vending-machine' },
                    { title: 'Movie Ticket Booking', link: '/interview/ood-suallar/ood/movie-ticket' },
                ]
            },
            {
                title: 'Behavioral Interview',
                description: 'Davranış müsahibələri',
                steps: [
                    { title: 'Communication', link: '/interview/behavioral/communication' },
                    { title: 'Conflict Management', link: '/interview/behavioral/conflict-management' },
                    { title: 'Feedback', link: '/interview/behavioral/feedback' },
                    { title: 'Leadership and Management', link: '/interview/behavioral/leadership-and-management' },
                    { title: 'Time Management', link: '/interview/behavioral/time-management' },
                ]
            }
        ]
    }
];

export default learningPaths;
