---
draft: true
---
# Elasticsearch
draft: true

- **Paylanmış Axtarış Mühərriki:** Elasticsearch artan sayda istifadə hallarını həll etməyə qadir olan paylanmış, RESTful axtarış və analitika mühərrikidir.
- **Sənəd Yönümlü:** Məlumatları JSON sənədləri kimi saxlayır, bu da müxtəlif məlumat strukturları üçün çeviklik təmin edir.
- **Demək Olar ki Real Vaxt (NRT):** İndeksləşdirmədən axtarışa qədər cüzi gecikməyə (adətən bir saniyə) malik real vaxta yaxın axtarış imkanları təqdim edir.
- **Miqyaslana bilən:** Klasterə daha çox node əlavə etməklə üfüqi miqyaslanma edə bilər.
- **Sxemsiz:** Məlumat növlərini avtomatik aşkar edir və xəritələyir, baxmayaraq ki, mürəkkəb məlumatlar üçün açıq xəritələmə tövsiyə olunur.
- **Tam Mətn Axtarışı:** Çoxlu dil dəstəyi ilə güclü tam mətn axtarış imkanları.
- **Analitika:** Məlumat təhlili və vizuallaşdırması üçün aqreqasiya çərçivəsi təqdim edir.

## Əsas Anlayışlar

### Sənəd və İndekslər

- **Sənəd:** Elasticsearch-da JSON formatında ifadə olunan əsas məlumat vahidi.
- **İndeks:** Oxşar xüsusiyyətlərə malik sənədlər toplusu.
- **Növ:** (Yeni versiyalarda köhnəlmiş) İndeks daxilində məntiqli kateqoriya/bölgü.
- **Xəritələmə:** Sənədlərin və onların sahələrinin necə saxlanması və indeksləşdirilməsini təyin edir.
- **Shardlar:** İndeksin üfüqi bölünmələri, node-lar arasında paylanmağa imkan verir.
- **Replikalar:** Ehtiyat və təkmil axtarış performansı üçün shardların nüsxələri.

### Elasticsearch vs Ənənəvi Verilənlər Bazası

| Xüsusiyyət | Elasticsearch | Ənənəvi RDBMS |
|------------|---------------|---------------|
| Məlumat Modeli | Sənəd yönümlü (JSON) | Cədvəl əsaslı (sətir və sütun) |
| Sxem | Dinamik, çevik | Sərt, əvvəlcədən müəyyən |
| Sorğu Dili | Query DSL (JSON əsaslı) | SQL |
| Tranzaksiyalar | Məhdud dəstək | ACID uyğun |
| Miqyaslanma | Üfüqi miqyaslanma | Əsasən şaquli miqyaslanma |
| Axtarış İmkanları | Təkmil tam mətn axtarışı | Əsas mətn axtarışı |
| Performans | Axtarış və analitika üçün optimallaşdırılmış | Tranzaksiyalar üçün optimallaşdırılmış |

## Elasticsearch Arxitekturası

- **Node:** Elasticsearch-ın tək nümunəsi.
- **Klaster:** Bağlı node-ların toplusu.
- **Master Node:** Klasteri idarə edir və klaster səviyyəsində əməliyyatlara məsuliyyət daşıyır.
- **Məlumat Node-u:** Məlumatları saxlayır və məlumatlarla bağlı əməliyyatları yerinə yetirir.
- **Müştəri Node-u:** Klaster sorğularını master node-a, məlumat əlaqəli sorğuları isə məlumat node-larına ötürür.
- **Ingest Node:** Sənədləri indeksləşdirmədən əvvəl əvvəlcədən emal edir.
- **Koordinasiya Node-u:** Sorğuları istiqamətləndirir, axtarış azaltma fazasını idarə edir və kütləvi indeksləşdirməni paylayır.

## Ümumi Elasticsearch Əməliyyatları

### İndeks yaratmaq
```
# REST API çağırışı
PUT /my_index

# Sorğu gövdəsi
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  }
}
```

### Sənədi indeksləşdirmək
```
# REST API çağırışı
POST /my_index/_doc

# Sorğu gövdəsi
{
  "title": "Elasticsearch Bələdçisi",
  "content": "Elasticsearch üzrə hərtərəfli bələdçi",
  "tags": ["axtarış", "verilənlər bazası", "dərslik"],
  "published_date": "2023-07-15"
}
```

### Sənədləri axtarmaq
```
# REST API çağırışı
GET /my_index/_search

# Sorğu gövdəsi
{
  "query": {
    "match": {
      "content": "elasticsearch"
    }
  }
}
```

### Aqreqasiya nümunəsi
```
# REST API çağırışı
GET /my_index/_search

# Sorğu gövdəsi
{
  "size": 0,
  "aggs": {
    "tags_count": {
      "terms": {
        "field": "tags.keyword"
      }
    }
  }
}
```

## İstifadə Halları

- **Axtarış Tətbiqetmələri:** E-ticarət saytları, məzmun idarəetmə sistemləri
- **Loq Analizi:** Sistem loglarının toplanması və təhlili
- **Real Vaxt Analitika:** Biznes metrikləri və KPI-ların izlənməsi
- **Geo-məkan Axtarışı:** Məkana əsaslı xidmətlər
- **Təhlükəsizlik İnformasiya və Hadisə İdarəetməsi (SIEM):** Təhlükəsizlik hadisələrinin izlənməsi
- **Aplikasiya Performans Monitorinqi (APM):** Tətbiqetmə performansının izlənməsi

## Ən Yaxşı Təcrübələr

- Düzgün mapping-ləri əvvəlcədən təyin edin
- Uyğun shard sayını seçin (çox kiçik və ya böyük olmasın)
- Replikaları performans və ehtiyat üçün istifadə edin
- İndeks şablonlarından istifadə edin
- Monitoring və alerting quraşdırın
- Klaster sağlamlığını müntəzəm yoxlayın
- ILM (Index Lifecycle Management) istifadə edin
- Uyğun hardware seçin (SSD, yetərli RAM)
- Sorğuları optimize edin
