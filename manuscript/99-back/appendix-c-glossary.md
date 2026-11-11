---
letter: C
title: Glossary
bn: পরিভাষা
subtitle: বইয়ে ব্যবহৃত গুরুত্বপূর্ণ technical শব্দের সহজ বাংলা ব্যাখ্যা
---

বইয়ে technical শব্দগুলো ইচ্ছা করে ইংরেজিতে রাখা হয়েছে, কারণ documentation, error message, interview ও code review-তে এগুলোই আপনি দেখবেন। এখানে প্রতিটির সহজ বাংলা ব্যাখ্যা ও যে অধ্যায়ে বিস্তারিত আছে তা দেওয়া হলো।

## A–C

| শব্দ | সহজ ব্যাখ্যা | অধ্যায় |
| --- | --- | --- |
| ABAC | User, resource ও পরিবেশের বৈশিষ্ট্য দেখে অনুমতির সিদ্ধান্ত | ৮ |
| ACID | Transaction-এর চার নিশ্চয়তা: সব-অথবা-কিছুই-না, বৈধ অবস্থা, পারস্পরিক বিচ্ছিন্নতা, স্থায়িত্ব | ৪ |
| Active-Active / Active-Passive | সব node কাজ করে / একটি কাজ করে, অন্যটি অপেক্ষায় | ৯ |
| ADR | Architecture-এর সিদ্ধান্ত, বিকল্প ও কারণের লিখিত রেকর্ড | ১৭, পরিশিষ্ট B |
| Agent (AI) | LLM যে লক্ষ্য পেয়ে নিজে tool বেছে নিয়ে ধাপে ধাপে কাজ করে | ১৬ |
| AI Gateway | সব LLM call-এর কেন্দ্রীয় স্তর: routing, budget, cache, log | ১৫ |
| API Gateway | সব API-র একক প্রবেশদ্বার: routing, auth, rate limit | ৭ |
| Availability | System কতটুকু সময় ব্যবহারযোগ্য থাকে | ৩, ৯ |
| Backpressure | Producer যখন consumer-এর চেয়ে দ্রুত, তখনকার চাপ ও তা সামলানো | ১১ |
| BFF | প্রতিটি ধরনের client-এর জন্য আলাদা পাতলা backend | ৭ |
| Blue-Green Deployment | দুটি পূর্ণ environment, একবারে traffic বদল | ১৪ |
| Bloom Filter | "নিশ্চিতভাবে নেই" বা "সম্ভবত আছে" বলতে পারা ছোট data structure | ৬ |
| Bounded Context | একটি domain-এর সীমানা, যার ভেতরে শব্দগুলোর অর্থ একটি | ১০ |
| Bulkhead | প্রতিটি dependency-র জন্য আলাদা resource সীমা, যাতে একটি ব্যর্থতা সব না আটকায় | ১০ |
| Cache-Aside | আগে cache দেখা, না পেলে database থেকে এনে cache-এ রাখা | ৬ |
| Cache Stampede | Cache মুছে গেলে একসাথে বহু request database-এ ছুটে যাওয়া | ৬ |
| Canary Release | নতুন version প্রথমে অল্প user-কে, metric দেখে ধাপে ধাপে বাড়ানো | ১৪ |
| CAP Theorem | Network বিচ্ছিন্নতায় consistency আর availability-র একটি বেছে নিতে হয় | ৩ |
| CDC | Database-এর পরিবর্তন event হিসেবে বের করে আনা | ৫, ১০ |
| CDN | User-এর কাছাকাছি server থেকে content দেওয়ার network | ৬, ২৩ |
| Chaos Engineering | নিয়ন্ত্রিতভাবে ব্যর্থতা ঘটিয়ে system-এর সহনশীলতা যাচাই | ৯, ২০ |
| Chunking (RAG) | Document-কে খোঁজার উপযোগী ছোট অংশে ভাগ করা | ১৫ |
| Circuit Breaker | বারবার ব্যর্থ dependency-কে সাময়িকভাবে call না করা | ১০ |
| Connection Pooling | Database connection পুনর্ব্যবহার করা, প্রতিবার নতুন না খুলে | ৫ |
| Consistent Hashing | Server যোগ-বিয়োগে কম data সরে এমন বণ্টন কৌশল | ৯ |
| Consumer Group | Kafka-তে একসাথে একটি topic-এর কাজ ভাগ করে নেওয়া consumer-এর দল | ১১ |
| Consumer Lag | Consumer কতটা পিছিয়ে আছে | ১১, ১২ |
| Container | Application ও তার পরিবেশ একসাথে প্যাক করা চলমান একক | ১৩ |
| CQRS | লেখা ও পড়ার model আলাদা রাখা | ৫ |
| CSRF | User-এর অজান্তে তার session দিয়ে অন্য site থেকে কাজ করানোর আক্রমণ | ৮ |

## D–H

| শব্দ | সহজ ব্যাখ্যা | অধ্যায় |
| --- | --- | --- |
| Data Drift / Concept Drift | Input-এর ধরন বদলানো / input ও ফলাফলের সম্পর্ক বদলানো | ১৬ |
| Dead Letter Queue (DLQ) | বারবার ব্যর্থ message আলাদা করে রাখার queue | ১১ |
| Deadlock | দুটি transaction একে অপরের lock-এর জন্য চিরকাল অপেক্ষা | ৪, ১৯ |
| Denormalization | পড়ার গতির জন্য সচেতনভাবে data duplicate করা | ৪ |
| Distributed Monolith | নামে microservice, কিন্তু shared database ও জট পাকানো নির্ভরতা | ১০ |
| DORA Metrics | Deploy-এর হার, lead time, failure rate ও restore time | ১৪ |
| Double-entry | প্রতিটি লেনদেনে মোট debit = মোট credit | ১৮, ১৯ |
| Dual Write | দুটি আলাদা system-এ আলাদাভাবে লেখার ঝুঁকিপূর্ণ অভ্যাস | ১০ |
| E2EE | শুধু প্রেরক ও প্রাপকের device পড়তে পারে, server নয় | ২২ |
| Embedding | Text-এর অর্থকে সংখ্যার vector-এ রূপান্তর | ১৫ |
| Error Budget | SLO অনুযায়ী অনুমোদিত ব্যর্থতার পরিমাণ | ১২ |
| Evaluation (Eval) | AI-এর উত্তরের মান অনেক উদাহরণে মাপা | ১৫ |
| Event Sourcing | বর্তমান অবস্থার বদলে সব পরিবর্তনের event সংরক্ষণ | ১১ |
| Eventual Consistency | কিছু সময় পর সব জায়গায় data মিলে যাবে | ৩ |
| Expand-Contract | ধাপে ধাপে, downtime ছাড়া schema পরিবর্তন | ১৪ |
| Failover | প্রধানটি ব্যর্থ হলে বিকল্পে স্বয়ংক্রিয়ভাবে সরে যাওয়া | ৯ |
| Fanout | একটি post বা message বহু প্রাপকের কাছে ছড়ানো | ২১ |
| Fault Tolerance | অংশবিশেষ ব্যর্থ হলেও কাজ চালিয়ে যাওয়ার ক্ষমতা | ৩ |
| Feature Flag | Deploy ছাড়াই feature চালু-বন্ধ করার switch | ১৪ |
| Feature Store | ML-এর জন্য training ও production-এ একই নিয়মে হিসাব করা feature | ১৬ |
| Fine-tuning | নির্দিষ্ট data দিয়ে model-কে আরো train করে আচরণ বদলানো | ১৫ |
| GitOps | Production-এর কাঙ্ক্ষিত অবস্থা git-এ রাখা, tool তা মিলিয়ে রাখে | ১৪ |
| Graceful Degradation | কিছু feature বন্ধ রেখে মূল কাজ চালু রাখা | ৩ |
| Grounding | AI-এর উত্তর দেওয়া তথ্যের উপর ভিত্তি করে কি না যাচাই | ১৫ |
| gRPC | Binary, দ্রুত, strongly typed RPC framework | ৭ |
| Guardrail | AI-এর input ও output-এ নিরাপত্তা ও নীতির পাহারা | ১৫ |
| Hallucination | AI-এর আত্মবিশ্বাসী কিন্তু বানানো বা ভুল তথ্য | ১৫, ১৭ |
| Health Check (Liveness/Readiness) | Process জীবিত কি না / traffic নিতে প্রস্তুত কি না | ৯, ১৩ |
| Horizontal Scaling | Server সংখ্যা বাড়ানো | ৩ |
| Hot Key / Hot Partition / Hot Account | অস্বাভাবিক বেশি চাপ পড়া একটি key, partition বা account | ৬, ১৯, ২২ |
| HPA | Kubernetes-এ load অনুযায়ী pod সংখ্যা বদলানো | ১৩ |
| Hybrid Search | Vector ও keyword search একসাথে | ১৫ |

## I–O

| শব্দ | সহজ ব্যাখ্যা | অধ্যায় |
| --- | --- | --- |
| Idempotency | একই অনুরোধ বহুবার এলেও ফলাফল একবারের মতো | ৭, ১১, ১৯ |
| IDOR / BOLA | ID বদলে অন্যের data পেয়ে যাওয়ার দুর্বলতা | ৮ |
| Index (B-Tree) | দ্রুত খোঁজার জন্য database-এর সাজানো কাঠামো | ৪ |
| Infrastructure as Code | Server, network ইত্যাদি code দিয়ে তৈরি ও পরিচালনা | ১৪ |
| Isolation Level | একসাথে চলা transaction একে অপরকে কতটা দেখতে পায় | ৪ |
| JWT | Signed token, যার ভেতরে user-এর তথ্য থাকে | ৮ |
| Kafka | Partitioned, সংরক্ষিত event log-ভিত্তিক streaming platform | ১১ |
| Latency (p50/p95/p99) | Response time; percentile খারাপ দিনের অভিজ্ঞতা দেখায় | ২, ১২ |
| Little's Law | একসাথে চলা request = আগমনের হার × গড় সময় | ২ |
| LLM | বিপুল text থেকে শেখা ভাষা model | ১৫ |
| Load Balancer | Traffic একাধিক server-এ ভাগ করে | ৯ |
| Load Shedding | Capacity-র বাইরে কিছু request ভদ্রভাবে ফিরিয়ে দেওয়া | ৯ |
| Maker-Checker | একজন তৈরি করেন, আরেকজন অনুমোদন দেন | ১৮, ১৯, ২৪ |
| MCP | AI application-এর সাথে tool ও data যুক্ত করার open standard | ১৬ |
| Microservices | ছোট, স্বাধীনভাবে deploy করা যায় এমন service-এ ভাগ করা system | ১০ |
| MLOps | ML model-এর পুরো জীবনচক্র নির্ভরযোগ্যভাবে পরিচালনা | ১৬ |
| Modular Monolith | এক deploy, কিন্তু ভেতরে কঠোর module-সীমানা | ১০ |
| Multi-tenancy | একটি system একাধিক client (tenant)-কে আলাদাভাবে সেবা দেয় | ১৮ |
| mTLS | দুই পক্ষই certificate দিয়ে নিজের পরিচয় প্রমাণ করে | ৮ |
| N+1 Query | Loop-এর ভেতরে প্রতিটি item-এর জন্য আলাদা query | ৪, ৭ |
| Noisy Neighbor | Shared resource-এ একজনের ভারী কাজ অন্যদের ধীর করা | ১৮ |
| Normalization | একই তথ্য একাধিক জায়গায় না রাখার নিয়ম | ৪ |
| OAuth2 / OIDC | Authorization delegation / তার উপর login-এর স্তর | ৮ |
| Observability | System-এর ভেতরের অবস্থা বাইরের signal থেকে বোঝার ক্ষমতা | ১২ |
| OpenTelemetry | Logs, metrics, traces সংগ্রহের open standard | ১২ |
| Outbox Pattern | Data ও event একই transaction-এ লিখে পরে নির্ভরযোগ্যভাবে প্রকাশ | ১০ |

## P–S

| শব্দ | সহজ ব্যাখ্যা | অধ্যায় |
| --- | --- | --- |
| PACELC | স্বাভাবিক সময়েও latency বনাম consistency-র trade-off | ৩ |
| Partitioning | একটি বড় table একই server-এ ভাগ করা | ৫ |
| PDB | Kubernetes-এ একসাথে কতগুলো pod বন্ধ হতে পারবে তার সীমা | ১৩ |
| Pod | Kubernetes-এর সবচেয়ে ছোট চলমান একক | ১৩ |
| Poison Message | কখনো সফল হবে না এমন message | ১১ |
| Polyglot Persistence | কাজভেদে একাধিক ধরনের database ব্যবহার | ৪ |
| Pre-signed URL | সাময়িক অনুমতিসহ সরাসরি storage-এ upload/download-এর URL | ২৩ |
| Prompt Injection | AI-এর নির্দেশ বদলে দেওয়ার উদ্দেশ্যে লেখা text | ৮, ১৬ |
| RAG | খুঁজে আনা তথ্য দিয়ে AI-কে উত্তর লেখানো | ১৫ |
| Rate Limiting | নির্দিষ্ট সময়ে কতগুলো request অনুমোদিত তার সীমা | ৭ |
| RBAC | ভূমিকা অনুযায়ী অনুমতি | ৮ |
| Read Replica | শুধু পড়ার জন্য primary database-এর copy | ৫ |
| Read-your-writes | যে লিখেছে, সে অন্তত নিজের নতুন data দেখবে | ৩, ৫ |
| Reconciliation | নিজের হিসাব ও অন্যের হিসাব মিলিয়ে পার্থক্য খোঁজা | ১৯ |
| Redundancy | একই component-এর একাধিক copy | ৩, ৯ |
| Reliability | System সঠিকভাবে ও ধারাবাহিকভাবে কাজ করে কি না | ৩ |
| Replication Lag | Replica কতটা পিছিয়ে আছে | ৫ |
| Reranker | খোঁজার ফলাফল আরো নিখুঁতভাবে সাজানোর model | ১৫ |
| RPO / RTO | কতটুকু data হারানো চলবে / কত দ্রুত ফিরতে হবে | ২, ৯ |
| RPS / QPS | প্রতি সেকেন্ডে request / query | ২ |
| Saga | ছোট local transaction-এর ধারা, ব্যর্থতায় compensation | ১০ |
| SBOM | Software-এ কোন কোন library কোন version-এ আছে তার তালিকা | ১৪ |
| Semantic Cache | অর্থের মিল দেখে আগের AI উত্তর পুনর্ব্যবহার | ৬, ১৫ |
| Service Mesh | প্রতিটি service-এর পাশে proxy দিয়ে network-এর দায়িত্ব নেওয়া | ১০ |
| Sharding | Data আলাদা physical database-এ ভাগ করা | ৫ |
| SLI / SLO / SLA | মাপা সূচক / অভ্যন্তরীণ লক্ষ্য / চুক্তিভিত্তিক প্রতিশ্রুতি | ১২ |
| SPOF | যে একটি অংশ ব্যর্থ হলে পুরো system বন্ধ | ৩ |
| Split Brain | দুটি node দুজনেই নিজেকে primary ভাবা | ৯ |
| SQL Injection | User input দিয়ে database query বদলে দেওয়ার আক্রমণ | ৮ |
| SSRF | Server-কে দিয়ে ভেতরের বা নিষিদ্ধ ঠিকানায় request পাঠানো | ৮ |
| Stateless | Server আগের request-এর কোনো অবস্থা মনে রাখে না | ৩ |
| Strangler Fig | পুরনো system চালু রেখে ধীরে ধীরে নতুন দিয়ে প্রতিস্থাপন | ১০ |
| Structured Logging | Log-কে field-সহ (যেমন JSON) লেখা | ১২ |

## T–Z

| শব্দ | সহজ ব্যাখ্যা | অধ্যায় |
| --- | --- | --- |
| Throughput | নির্দিষ্ট সময়ে কতগুলো কাজ সম্পন্ন হয় | ২ |
| Token (LLM) | AI-এর হিসাবের text-একক; দাম ও সীমা এতে | ১৫ |
| Token Bucket | নির্দিষ্ট হারে token জমে, request token খরচ করে: rate limiting algorithm | ৭ |
| Trace / Span | একটি request-এর পুরো যাত্রা / তার একটি ধাপ | ১২ |
| Transcoding | Video-কে বিভিন্ন মান ও format-এ রূপান্তর | ২৩ |
| Trunk-based Development | ছোট, স্বল্পস্থায়ী branch ও ঘন ঘন মূল branch-এ merge | ১৪ |
| TTL | Cache বা data-র মেয়াদ | ৬ |
| Vector Database | Embedding সংরক্ষণ ও অর্থের দিক থেকে কাছের item খোঁজার database | ১৫ |
| Vertical Scaling | একটি server-এর ক্ষমতা বাড়ানো | ৩ |
| Virtual Waiting Room | ভিড়ের সময় user-দের সারিতে রেখে নির্দিষ্ট হারে প্রবেশ | ৯, ২৪ |
| WAF | ক্ষতিকর HTTP request আটকানোর firewall | ৮, ৯ |
| WebSocket | Client ও server-এর মধ্যে স্থায়ী, দ্বিমুখী connection | ২২ |
| Write-behind | আগে cache-এ লিখে পরে batch-এ database-এ | ৬ |
| XSS | User-এর দেওয়া script অন্যের browser-এ চালানোর আক্রমণ | ৮ |
| Zero Trust | ভেতরের network-কেও বিশ্বাস না করে প্রতিটি অনুরোধ যাচাই | ৮ |
