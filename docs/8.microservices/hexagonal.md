---
draft: true
title: Heksaqonal Arxitektura (Hexagonal Architecture)
description: Mikroservis mühitində Heksaqonal Arxitektura (Ports and Adapters) nümunəsi və tətbiqi
slug: /mikroservisler/hexagonal
authors: [tunay]
sidebar_position: 6
---

# Heksaqonal Arxitektura (Hexagonal Architecture)

## Heksaqonal Arxitektura Nədir?

Heksaqonal Arxitektura (həmçinin "Ports and Adapters" adlanır), tətbiqin əsas biznes məntiqini xarici asılılıqlardan (məlumat bazası, UI, xarici servislər və s.) ayırmaq üçün nəzərdə tutulmuş bir proqram dizayn nümunəsidir. Bu arxitektura, Alistair Cockburn tərəfindən 2005-ci ildə təqdim edilmişdir və Domain-Driven Design (DDD) prinsipləri ilə yaxşı uyğunlaşır.

## Əsas Prinsiplər

Heksaqonal Arxitekturanın əsas prinsipləri:

1. **Asılılıqların İnversiyası (Dependency Inversion)**: Biznes məntiqinin xarici komponentlərdən asılı olmaması, əksinə xarici komponentlərin biznes məntiqinə uyğunlaşması
2. **Portlar və Adapterlər**: Tətbiqin xarici dünya ilə əlaqəsi portlar (interfeyslər) və adapterlər (implementasiyalar) vasitəsilə həyata keçirilir
3. **Tətbiq Mərkəzli Dizayn**: Biznes məntiqinin tətbiqin mərkəzində yerləşməsi və xarici təsirlərdən qorunması

## Arxitektura Təbəqələri

Heksaqonal Arxitektura üç əsas təbəqədən ibarətdir:

### 1. Domain Təbəqəsi (Mərkəz)

Bu, tətbiqin "ürəyi"dir və biznes məntiqini ehtiva edir:

- **Domain Modelləri**: Biznes anlayışlarını təmsil edən obyektlər
- **Domain Servisləri**: Mürəkkəb biznes qaydalarını həyata keçirən servislər
- **Value Objects**: Dəyər obyektləri
- **Aggregates**: Əlaqəli obyektlərin qrupları

Domain təbəqəsi heç bir xarici asılılığa malik olmamalıdır.

### 2. Tətbiq Təbəqəsi (Application Layer)

Bu təbəqə domain təbəqəsini əhatə edir və istifadəçi ssenarilərini həyata keçirir:

- **Use Cases / Application Services**: İstifadəçi ssenarilərini həyata keçirən servislər
- **Port İnterfeysləri**: Xarici dünya ilə əlaqə üçün interfeyslər
  - **Giriş Portları (Primary/Driving Ports)**: Tətbiqi idarə edən interfeyslər
  - **Çıxış Portları (Secondary/Driven Ports)**: Tətbiqin xarici resurslara çıxışı üçün interfeyslər

### 3. İnfrastruktur Təbəqəsi (Xarici Təbəqə)

Bu təbəqə tətbiqi xarici dünya ilə əlaqələndirir:

- **Giriş Adapterləri (Primary/Driving Adapters)**: Tətbiqi idarə edən adapterlər (REST API, CLI, UI və s.)
- **Çıxış Adapterləri (Secondary/Driven Adapters)**: Tətbiqin xarici resurslara çıxışını təmin edən adapterlər (məlumat bazası, xarici servislər və s.)

## Portlar və Adapterlər

### Portlar (Ports)

Portlar, tətbiqin xarici dünya ilə əlaqə qurduğu interfeyslərdir:

- **Giriş Portları (Primary/Driving Ports)**: Tətbiqi idarə edən interfeyslər (məsələn, `UserService` interfeysi)
- **Çıxış Portları (Secondary/Driven Ports)**: Tətbiqin xarici resurslara çıxışı üçün interfeyslər (məsələn, `UserRepository` interfeysi)

### Adapterlər (Adapters)

Adapterlər, portların konkret implementasiyalarıdır:

- **Giriş Adapterləri (Primary/Driving Adapters)**: REST Controller, CLI, UI və s.
- **Çıxış Adapterləri (Secondary/Driven Adapters)**: Repository implementasiyaları, xarici servis klientləri və s.

## Nümunə Kod

### Domain Təbəqəsi


<details>
<summary>Koda bax</summary>

```java
// Domain Model
public class User {
    private UserId id;
    private String name;
    private String email;

    // Constructors, getters, business methods...
}

// Value Object
public class UserId {
    private final String value;

    public UserId(String value) {
        this.value = value;
    }

    // Getters, equals, hashCode...
}
```
</details>

### Tətbiq Təbəqəsi


<details>
<summary>Koda bax</summary>

```java
// Giriş Portu (Primary/Driving Port)
public interface UserService {
    User createUser(String name, String email);
    User getUserById(UserId id);
    void updateUser(User user);
}

// Çıxış Portu (Secondary/Driven Port)
public interface UserRepository {
    void save(User user);
    User findById(UserId id);
    void update(User user);
}

// Use Case / Application Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(String name, String email) {
        User user = new User(new UserId(UUID.randomUUID().toString()), name, email);
        userRepository.save(user);
        return user;
    }

    @Override
    public User getUserById(UserId id) {
        return userRepository.findById(id);
    }

    @Override
    public void updateUser(User user) {
        userRepository.update(user);
    }
}
```
</details>

### İnfrastruktur Təbəqəsi


<details>
<summary>Koda bax</summary>

```java
// Giriş Adapteri (Primary/Driving Adapter)
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody CreateUserRequest request) {
        User user = userService.createUser(request.getName(), request.getEmail());
        return ResponseEntity.ok(UserDto.fromDomain(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {
        User user = userService.getUserById(new UserId(id));
        return ResponseEntity.ok(UserDto.fromDomain(user));
    }
}

// Çıxış Adapteri (Secondary/Driven Adapter)
@Repository
public class UserRepositoryImpl implements UserRepository {
    private final JpaUserRepository jpaUserRepository;

    public UserRepositoryImpl(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    @Override
    public void save(User user) {
        UserEntity entity = UserEntity.fromDomain(user);
        jpaUserRepository.save(entity);
    }

    @Override
    public User findById(UserId id) {
        UserEntity entity = jpaUserRepository.findById(id.getValue())
            .orElseThrow(() -> new UserNotFoundException(id));
        return entity.toDomain();
    }

    @Override
    public void update(User user) {
        UserEntity entity = UserEntity.fromDomain(user);
        jpaUserRepository.save(entity);
    }
}
```
</details>

## Mikroservislərdə Heksaqonal Arxitekturanın Üstünlükləri

1. **Təmiz Arxitektura**: Biznes məntiqinin xarici asılılıqlardan ayrılması
2. **Testləşdirmə Asanlığı**: Domain və tətbiq təbəqələrinin unit testləri asanlıqla yazıla bilər
3. **Texnologiya Dəyişikliyi**: Xarici komponentləri (məlumat bazası, UI və s.) dəyişdirmək asandır
4. **Paralel İnkişaf**: Müxtəlif komandalar müxtəlif adapterləri paralel inkişaf etdirə bilər
5. **Domain-Driven Design ilə Uyğunluq**: DDD prinsipləri ilə yaxşı uyğunlaşır

## Mikroservislərdə Heksaqonal Arxitekturanın Tətbiqi

Mikroservis mühitində hər bir servis öz heksaqonal arxitekturasına malik ola bilər:

1. **Servis Sərhədləri**: Hər servis bir və ya bir neçə bounded context-i əhatə edir
2. **Servislərarası Kommunikasiya**: Servislər bir-biri ilə adapterlər vasitəsilə əlaqə qurur
3. **Texnologiya Müxtəlifliyi**: Hər servis öz ehtiyaclarına uyğun texnologiyalardan istifadə edə bilər

## Çətinliklər və Həll Yolları

1. **Əlavə Kod Miqdarı**: Portlar və adapterlər əlavə kod tələb edir
   - **Həll**: Sadə hallarda sadələşdirilmiş versiyadan istifadə etmək

2. **Öyrənmə Əyrisi**: Yeni başlayanlar üçün anlaşılması çətin ola bilər
   - **Həll**: Yaxşı sənədləşdirmə və nümunələr təmin etmək

3. **Overengineering Riski**: Kiçik tətbiqlər üçün həddindən artıq mürəkkəb ola bilər
   - **Həll**: Tətbiqin mürəkkəbliyinə uyğun olaraq arxitekturanı uyğunlaşdırmaq

