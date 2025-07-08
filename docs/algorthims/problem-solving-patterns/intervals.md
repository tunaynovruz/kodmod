---
title: Intervals Pattern
description: Intervals pattern-in ətraflı izahı və nümunələr
slug: intervals-pattern
tags: [algorithms, problem-solving, intervals, ranges, merging]
keywords: [intervals, algorithm pattern, interview problems, range problems, merging intervals]
hide_table_of_contents: false
---

# Intervals Pattern

## Giriş

Intervals (İntervallar) pattern-i, aralıqlar və ya intervallar ilə bağlı problemləri həll etmək üçün istifadə olunan bir üsuldur. Bu pattern, başlanğıc və son nöqtələri olan intervallar üzərində əməliyyatlar aparmağı nəzərdə tutur. İntervallar pattern-i, xüsusilə zaman planlaması, resurs ayrılması və aralıqların birləşdirilməsi kimi problemlərdə faydalıdır.

## Pattern-in Əsas Xüsusiyyətləri

- **İnterval Təsviri**: Adətən [start, end] şəklində təsvir olunur
- **Sıralama**: Çox vaxt intervalları başlanğıc və ya son nöqtələrinə görə sıralamaq lazım gəlir
- **Örtüşmə Yoxlanışı**: İki intervalın örtüşüb-örtüşmədiyini təyin etmək
- **Birləşdirmə**: Örtüşən intervalları birləşdirmək
- **Kəsişmə**: İki və ya daha çox intervalın kəsişməsini tapmaq

## Intervals Pattern-in Tətbiq Sahələri

1. **Meeting Rooms**: Toplantı otaqlarının planlaşdırılması
2. **Job Scheduling**: İş planlaması
3. **Interval Merging**: Örtüşən intervalların birləşdirilməsi
4. **Range Queries**: Aralıq sorğuları
5. **Calendar Applications**: Təqvim tətbiqləri və boş vaxtların tapılması

## Nümunə Problemlər və Həllər

### 1. Merge Intervals

**Problem**: Verilmiş intervallar siyahısını birləşdirin, belə ki, örtüşən intervallar bir intervala çevrilsin.

**Həll**:

```java
public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) {
        return intervals;
    }
    
    // İntervalları başlanğıc nöqtələrinə görə sıralayırıq
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    
    List<int[]> result = new ArrayList<>();
    int[] currentInterval = intervals[0];
    result.add(currentInterval);
    
    for (int[] interval : intervals) {
        // Əgər cari interval əvvəlki intervalın sonundan sonra başlayırsa
        if (interval[0] > currentInterval[1]) {
            // Yeni interval əlavə edirik
            currentInterval = interval;
            result.add(currentInterval);
        } else {
            // Əks halda, intervalları birləşdiririk
            currentInterval[1] = Math.max(currentInterval[1], interval[1]);
        }
    }
    
    return result.toArray(new int[result.size()][]);
}
```

### 2. Insert Interval

**Problem**: Verilmiş sıralanmış intervallar siyahısına yeni bir interval əlavə edin və örtüşən intervalları birləşdirin.

**Həll**:

```java
public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0;
    int n = intervals.length;
    
    // Yeni intervaldan əvvəl gələn intervalları əlavə edirik
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i]);
        i++;
    }
    
    // Örtüşən intervalları birləşdiririk
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    
    // Birləşdirilmiş intervalı əlavə edirik
    result.add(newInterval);
    
    // Qalan intervalları əlavə edirik
    while (i < n) {
        result.add(intervals[i]);
        i++;
    }
    
    return result.toArray(new int[result.size()][]);
}
```

### 3. Non-overlapping Intervals

**Problem**: Verilmiş intervallar siyahısından minimum sayda interval silinməlidir ki, qalan intervallar örtüşməsin.

**Həll**:

```java
public int eraseOverlapIntervals(int[][] intervals) {
    if (intervals.length <= 1) {
        return 0;
    }
    
    // İntervalları son nöqtələrinə görə sıralayırıq
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
    
    int count = 0;
    int end = intervals[0][1];
    
    for (int i = 1; i < intervals.length; i++) {
        // Əgər cari interval əvvəlki intervalın sonundan sonra başlayırsa
        if (intervals[i][0] >= end) {
            // Örtüşmə yoxdur, son nöqtəni yeniləyirik
            end = intervals[i][1];
        } else {
            // Örtüşmə var, intervalı silmək lazımdır
            count++;
        }
    }
    
    return count;
}
```

### 4. Meeting Rooms II

**Problem**: Verilmiş toplantı vaxtlarına əsasən, eyni vaxtda keçirilən maksimum toplantı sayını (yəni lazım olan minimum otaq sayını) tapın.

**Həll**:

```java
public int minMeetingRooms(int[][] intervals) {
    if (intervals.length == 0) {
        return 0;
    }
    
    // Başlanğıc və son vaxtları ayrı-ayrı sıralayırıq
    int[] starts = new int[intervals.length];
    int[] ends = new int[intervals.length];
    
    for (int i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    
    Arrays.sort(starts);
    Arrays.sort(ends);
    
    int rooms = 0;
    int endIndex = 0;
    
    for (int i = 0; i < starts.length; i++) {
        // Əgər yeni toplantı başlayırsa və əvvəlki toplantı hələ bitməyibsə
        if (starts[i] < ends[endIndex]) {
            // Yeni otaq lazımdır
            rooms++;
        } else {
            // Əvvəlki toplantı bitib, eyni otaqdan istifadə edə bilərik
            endIndex++;
        }
    }
    
    return rooms;
}
```

### 5. Interval List Intersections

**Problem**: İki sıralanmış interval siyahısının kəsişməsini tapın.

**Həll**:

```java
public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {
    List<int[]> result = new ArrayList<>();
    int i = 0, j = 0;
    
    while (i < firstList.length && j < secondList.length) {
        // İki intervalın kəsişməsinin başlanğıc və son nöqtələrini tapırıq
        int start = Math.max(firstList[i][0], secondList[j][0]);
        int end = Math.min(firstList[i][1], secondList[j][1]);
        
        // Əgər kəsişmə varsa, onu nəticəyə əlavə edirik
        if (start <= end) {
            result.add(new int[]{start, end});
        }
        
        // Sonu daha tez olan intervalı keçirik
        if (firstList[i][1] < secondList[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    
    return result.toArray(new int[result.size()][]);
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: Adətən O(n log n), sıralama əməliyyatı səbəbindən
- **Məkan Mürəkkəbliyi**: Adətən O(n), nəticə və ya köməkçi data strukturlar üçün

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- İntervallar ilə bağlı problemləri həll etmək üçün sistematik bir yanaşma təqdim edir
- Sıralama ilə birlikdə istifadə edildikdə effektivdir
- Bir çox real dünya problemlərində tətbiq oluna bilər

### Çatışmazlıqlar
- Sıralama əməliyyatı zaman mürəkkəbliyini artırır
- Böyük interval sayı üçün yaddaş tələbi yüksək ola bilər
- Bəzi hallarda əlavə data strukturlar (məsələn, priority queue) tələb edə bilər

## Nəticə

Intervals pattern-i, aralıqlar və ya intervallar ilə bağlı problemləri həll etmək üçün güclü bir üsuldur. Bu pattern, xüsusilə zaman planlaması, resurs ayrılması və aralıqların birləşdirilməsi kimi problemlərdə faydalıdır. İntervallar pattern-ini başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək və real dünya tətbiqlərini yaratmaq üçün vacib bir bacarıqdır.