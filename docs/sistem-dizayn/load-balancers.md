---
slug: \load-balancer
---

Load Balance
============
## Nə üçün lazımdır?

## Üstünlükləri
- Heartbeatcheck (spof)
- global vs local load balancers
- healthcheck
- stateful vs stateless lb

## Alqoritmlər
- Round Robin: gələn sorğuları ardıcılolara serverlər arasınd abölüşdürür və cyclic olara ən başa qayıdır.
  - Bəzi çatışmazlıqlar: no load awareness, No session affinity, performance issues with different capacities, predictable distribution pattern
  - eyni ölçülü serverlər arasında, stateless applər üçün faydalıdır.
- Weighted Round robin
- Least connection
- IP hash
- Random
- Least response time
- Least bandwith