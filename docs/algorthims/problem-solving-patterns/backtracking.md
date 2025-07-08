---
title: Backtracking Pattern
description: Backtracking pattern-in ətraflı izahı və nümunələr
slug: backtracking-pattern
tags: [algorithms, problem-solving, backtracking, recursion, combinatorial]
keywords: [backtracking, algorithm pattern, interview problems, recursion, combinatorial problems]
hide_table_of_contents: false
---

# Backtracking Pattern

## Giriş

Backtracking (Geri İzləmə) pattern-i, problemləri həll etmək üçün istifadə olunan rekursiv bir üsuldur. Bu pattern, mümkün bütün həlləri sistematik şəkildə araşdıraraq, hər addımda bir seçim edir və əgər bu seçim həllə aparmırsa, geri qayıdıb başqa bir seçim sınayır. Backtracking, xüsusilə kombinatorik problemləri həll etmək üçün güclü bir üsuldur.

## Pattern-in Əsas Xüsusiyyətləri

- **Rekursiv Təbiət**: Problemin alt problemlərə bölünməsi və rekursiv həlli
- **Seçim və Geri Qayıtma**: Hər addımda bir seçim edilir və lazım gəldikdə geri qayıdılır
- **Pruning (Budama)**: Perspektivsiz yolları erkən mərhələdə kəsmək
- **State Space Tree**: Bütün mümkün həlləri bir ağac strukturunda təmsil etmək
- **Constraint Satisfaction**: Məhdudiyyətləri ödəyən həlləri tapmaq

## Backtracking Pattern-in Tətbiq Sahələri

1. **Permutasiyalar və Kombinasiyalar**: Verilmiş elementlərin bütün mümkün düzülüşlərini tapmaq
2. **Subset Problems**: Verilmiş çoxluğun bütün alt çoxluqlarını tapmaq
3. **Puzzle Solving**: Sudoku, N-Queens kimi tapmacaları həll etmək
4. **Path Finding**: Labirintdə yol tapmaq
5. **Constraint Satisfaction Problems**: Məhdudiyyətləri ödəyən həlləri tapmaq

## Nümunə Problemlər və Həllər

### 1. Permutations

**Problem**: Verilmiş bir array-in bütün mümkün permutasiyalarını tapın.

**Həll**:

```java
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> tempList, int[] nums) {
    // Əgər müvəqqəti siyahı bütün elementləri ehtiva edirsə, onu nəticəyə əlavə edirik
    if (tempList.size() == nums.length) {
        result.add(new ArrayList<>(tempList));
        return;
    }
    
    for (int i = 0; i < nums.length; i++) {
        // Əgər element artıq müvəqqəti siyahıda varsa, onu atlayırıq
        if (tempList.contains(nums[i])) continue;
        
        // Elementi seçirik
        tempList.add(nums[i]);
        
        // Rekursiv olaraq qalan elementlərlə davam edirik
        backtrack(result, tempList, nums);
        
        // Backtrack: son əlavə edilmiş elementi çıxarırıq
        tempList.remove(tempList.size() - 1);
    }
}
```

### 2. Subsets

**Problem**: Verilmiş bir array-in bütün mümkün alt çoxluqlarını tapın.

**Həll**:

```java
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums, 0);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> tempList, int[] nums, int start) {
    // Hər bir mərhələdə müvəqqəti siyahını nəticəyə əlavə edirik
    result.add(new ArrayList<>(tempList));
    
    for (int i = start; i < nums.length; i++) {
        // Elementi seçirik
        tempList.add(nums[i]);
        
        // Rekursiv olaraq qalan elementlərlə davam edirik
        backtrack(result, tempList, nums, i + 1);
        
        // Backtrack: son əlavə edilmiş elementi çıxarırıq
        tempList.remove(tempList.size() - 1);
    }
}
```

### 3. N-Queens

**Problem**: N×N şahmat taxtasında N vəziri bir-birini təhdid etmədən yerləşdirmək.

**Həll**:

```java
public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    char[][] board = new char[n][n];
    
    // Şahmat taxtasını inisializasiya edirik
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            board[i][j] = '.';
        }
    }
    
    backtrack(result, board, 0, n);
    return result;
}

private void backtrack(List<List<String>> result, char[][] board, int row, int n) {
    // Əgər bütün sətirləri doldurmuşuqsa, həlli nəticəyə əlavə edirik
    if (row == n) {
        List<String> solution = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            solution.add(new String(board[i]));
        }
        result.add(solution);
        return;
    }
    
    // Cari sətirdə hər bir sütunu sınayırıq
    for (int col = 0; col < n; col++) {
        if (isValid(board, row, col, n)) {
            // Vəziri yerləşdiririk
            board[row][col] = 'Q';
            
            // Növbəti sətirə keçirik
            backtrack(result, board, row + 1, n);
            
            // Backtrack: vəziri çıxarırıq
            board[row][col] = '.';
        }
    }
}

private boolean isValid(char[][] board, int row, int col, int n) {
    // Eyni sütunda vəzir olub-olmadığını yoxlayırıq
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') {
            return false;
        }
    }
    
    // Sol yuxarı diaqonalı yoxlayırıq
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }
    
    // Sağ yuxarı diaqonalı yoxlayırıq
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') {
            return false;
        }
    }
    
    return true;
}
```

### 4. Sudoku Solver

**Problem**: 9×9 Sudoku tapmacasını həll edin.

**Həll**:

```java
public void solveSudoku(char[][] board) {
    solve(board);
}

private boolean solve(char[][] board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            // Boş xananı tapırıq
            if (board[row][col] == '.') {
                // 1-dən 9-a qədər hər bir rəqəmi sınayırıq
                for (char num = '1'; num <= '9'; num++) {
                    if (isValid(board, row, col, num)) {
                        // Rəqəmi yerləşdiririk
                        board[row][col] = num;
                        
                        // Rekursiv olaraq qalan xanaları doldurmağa çalışırıq
                        if (solve(board)) {
                            return true;
                        }
                        
                        // Backtrack: rəqəmi çıxarırıq
                        board[row][col] = '.';
                    }
                }
                
                // Əgər heç bir rəqəm uyğun deyilsə, geri qayıtmalıyıq
                return false;
            }
        }
    }
    
    // Bütün xanalar doldurulub
    return true;
}

private boolean isValid(char[][] board, int row, int col, char num) {
    // Sətri yoxlayırıq
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == num) {
            return false;
        }
    }
    
    // Sütunu yoxlayırıq
    for (int i = 0; i < 9; i++) {
        if (board[i][col] == num) {
            return false;
        }
    }
    
    // 3x3 bloku yoxlayırıq
    int blockRow = (row / 3) * 3;
    int blockCol = (col / 3) * 3;
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[blockRow + i][blockCol + j] == num) {
                return false;
            }
        }
    }
    
    return true;
}
```

## Zaman və Məkan Mürəkkəbliyi

- **Zaman Mürəkkəbliyi**: Adətən eksponensial, O(b^d), burada b budaqlanma faktoru, d isə ağacın dərinliyidir
- **Məkan Mürəkkəbliyi**: O(d), rekursiya stack-i üçün, burada d ağacın dərinliyidir

## Üstünlüklər və Çatışmazlıqlar

### Üstünlüklər
- Kombinatorik problemləri həll etmək üçün effektivdir
- Bütün mümkün həlləri sistematik şəkildə araşdırır
- Pruning texnikaları ilə optimallaşdırıla bilər
- Constraint satisfaction problemləri üçün uyğundur

### Çatışmazlıqlar
- Böyük problem ölçüləri üçün zaman mürəkkəbliyi yüksək ola bilər
- Pruning olmadan çox səmərəsiz ola bilər
- Rekursiya stack overflow probleminə səbəb ola bilər
- Bəzi hallarda daha effektiv həll üsulları mövcud ola bilər

## Nəticə

Backtracking pattern-i, xüsusilə kombinatorik və constraint satisfaction problemlərini həll etmək üçün güclü bir üsuldur. Bu pattern, mümkün bütün həlləri sistematik şəkildə araşdıraraq, hər addımda bir seçim edir və lazım gəldikdə geri qayıdır. Backtracking-i başa düşmək və tətbiq etmək, müsahibə problemlərini həll etmək üçün vacib bir bacarıqdır.