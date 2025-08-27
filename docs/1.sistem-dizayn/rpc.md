# RPC (Remote Procedure Call)
draft: true

## Konsept

- RPC proqramlara başqa ünvan sahəsində (adətən şəbəkədə başqa kompüterdə) proseduru çağırmağa imkan verən protokoldur. Proqramçı çağırılacaq prosedurları müəyyən edir.
- Prosedur yönümlüdür: Client və server bir-biri ilə açıq şəkildə prosedur çağırışı vasitəsilə əlaqə saxlayır. Client uzaq metod çağırır, server icra nəticəsini qaytarır.
- Məlumat ötürülməsi üçün JSON (JSON-RPC), XML (XML-RPC) və ya protokol buferləri kimi binary formatlardan (gRPC) istifadə oluna bilər.
- Nümunə: Client uzaq serverdə `getComment(commentId)` metodunu çağırır, server məqalə məlumatını qaytarır.

## Üstünlüklər

- **Tight Coupling:** Server əməliyyatlarına prosedur kimi sadə uyğunlaşma təmin edir.
- **Efficient:** Binary RPC (məsələn, gRPC) məlumat ötürməsini sürətləndirir və performansı artırır.
- **Aydın müqavilə:** Prosedur tərifləri client və server arasında aydın razılaşma yaradır.

## Mənfi cəhətlər

- **Az çevikdir:** Serverdə müəyyən olunmuş metodlara sıx bağlıdır.
- **Stateful interaksiyalar:** Dövlət saxlayırsa, ölçəklənməni azalda bilər.
