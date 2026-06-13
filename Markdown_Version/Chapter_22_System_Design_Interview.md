# Chapter 22 — System Design Interview

This chapter equips you to approach system design interviews methodically: clarifying requirements, proposing a high-level architecture, diving into detailed components, and communicating trade-offs clearly. It includes an interview-friendly framework, a worked example, common pitfalls, a checklist, and recommended resources.

**1. Interview Approach (step-by-step)**
- **Clarify the problem:** Ask about scope, users, request patterns, throughput, latency targets, data retention, and SLAs. Restate requirements to confirm understanding.
- **Set constraints & goals:** Identify scale (RPS, data size), consistency needs, availability, cost limits, and any regulatory constraints.
- **Define APIs and core workflows:** Surface the public API endpoints, request/response shapes, and major flows (reads, writes, background jobs).
- **High-level design:** Sketch major components and their interactions (clients, load balancers, stateless services, databases, caches, queues, storage).
- **Data model & storage choices:** Propose schemas, indexes, storage engines, replication, and partitioning strategies.
- **Capacity & scaling plan:** Estimate traffic, compute resource needs, database throughput, partitioning/sharding, caching layers, and autoscaling approach.
- **Bottlenecks, trade-offs & failure modes:** Identify single points of failure, consistency trade-offs, and mitigations.
- **Detailed design & APIs:** Drill into one or two components (e.g., data partitioning, caching, message queue consumers), include pseudo-code if helpful.
- **Monitoring & operations:** Propose metrics, logging, tracing, alert thresholds, and runbook ideas.
- **Security & compliance:** Authentication, authorization, encryption, rate-limiting, and data protection.

**2. Common System Building Blocks**
- Load balancers (L4/L7)
- API gateway
- Stateless application servers / microservices
- Relational and NoSQL databases
- Caches (in-memory, distributed)
- Message queues and stream processors
- Object storage (S3-like)
- CDN for static assets
- Monitoring, tracing, and alerting stack

**3. Worked Example — Design a URL Shortener (concise)**
- **Requirements (sample):**
	- Create short URLs for long URLs
	- Redirect short -> long with low latency
	- Handle 10M daily active users, 100k writes/day, 10M reads/day
	- Support custom aliases and basic analytics
- **APIs:**
	- `POST /shorten { url, custom_alias? } -> { short_id }`
	- `GET /:short_id -> 302 Location: <long_url>`
	- `GET /stats/:short_id -> { clicks, created_at }`
- **High-level design:**
	- Clients -> CDN/LB -> Shortener service (stateless) -> Primary DB (for mappings) + cache (for hot lookups) + event stream for analytics
- **Data model:**
	- Table: Urls(short_id PK, long_url, user_id, created_at, ttl, custom_alias, click_count)
	- Index on `short_id`; for custom alias ensure uniqueness constraint
- **ID generation:**
	- Use a base62-encoded unique ID from a distributed ID generator (Snowflake) or generate a random 6–8 char token and handle collisions with a retry loop
- **Scaling reads:**
	- Cache redirects in Redis with long TTL; use CDN for static redirect responses if applicable
	- Use read replicas for DB reads
- **Scaling writes:**
	- Writes are less frequent; shard by `short_id` or user namespace if necessary
	- Use async pipelines for analytics (produce events to Kafka)
- **Availability & durability:**
	- Replicate primary data across multiple AZs/regions
	- Backups and point-in-time recovery for the DB
- **Security & abuse:**
	- Rate-limit `POST /shorten` per user/IP
	- Scan long URLs for malware/phishing
- **Monitoring & SLOs:**
	- Redirect latency (p95), error rate (5xx), cache hit ratio, event pipeline lag

**4. Common Interview Questions & Prompts**
- How would you shard this database? Why that key?
- How do you design for eventual consistency vs strong consistency here?
- Where would you put the cache and what TTLs would you choose?
- How would you handle hot keys or a single viral short URL?
- What metrics would you use to validate the system in production?

**5. Common Mistakes Candidates Make**
- Jumping to a database choice without clarifying scale or access patterns
- Forgetting client-side and network constraints (timeouts, retries)
- Overlooking operational concerns: monitoring, SLOs, and runbooks
- Not discussing trade-offs (cost vs latency vs complexity)
- Designing a single-region system when the requirement implies global users

**6. Practical Interview Tips**
- Start by asking clarifying questions; state assumptions explicitly.
- Draw a simple, clear high-level diagram first.
- Be pragmatic: propose a minimal viable design, then iterate for scale and reliability.
- When you pick technologies, briefly justify them in terms of requirements.
- Communicate trade-offs aloud: every design choice has a cost.
- If asked to dive deeper, choose one component and go deep (data model, caching, or partitioning).

**7. Checklist Before Finishing an Interview Design**
- Requirements restated and assumptions listed
- API endpoints and data model sketched
- High-level components and data flow diagrammed
- Capacity estimates and scaling plan discussed
- Failure modes and mitigation strategies explained
- Monitoring, alerting, and operational concerns covered
- Security and privacy considerations addressed

**8. Further Reading & Resources**
- Designing Data-Intensive Applications — Martin Kleppmann
- The System Design Primer (GitHub)
- Production-Ready Microservices patterns and SRE books/articles
- Talks and blogs from major cloud providers (AWS, GCP, Azure)

**Summary**
System design interviews reward structure, clarity, and trade-off reasoning. Use a repeatable approach: clarify, scope, propose a simple working design, then iterate for scale, reliability, and cost. Practice common examples and be ready to explain why you chose a particular strategy.

## Appendix — 300 System Design Interview Questions & Answers

Below are 300 concise, interview-style questions with short answers to practice core system design concepts. Use these for quick review and mock interviews.

1. Q: What is system design? A: The high-level process of defining a system's architecture, components, and interactions to meet requirements.
2. Q: What's the difference between functional and non-functional requirements? A: Functional specifies behavior; non-functional specifies quality attributes like latency and availability.
3. Q: What is scalability? A: The ability of a system to handle increased load by adding resources.
4. Q: Vertical vs horizontal scaling? A: Vertical adds power to a single node; horizontal adds more nodes.
5. Q: What is a load balancer? A: A component that distributes incoming traffic across multiple servers.
6. Q: What is CDN used for? A: Caching and delivering static assets from edge locations to reduce latency.
7. Q: What is cache aside pattern? A: Application checks cache first, on miss reads DB and populates cache.
8. Q: What is cache invalidation? A: The process of removing or updating stale cache entries.
9. Q: What is a cache miss? A: When requested data is not found in cache and must be fetched from the source.
10. Q: What is a cache hit? A: When requested data is found in cache and returned directly.
11. Q: What is cache stampede? A: Many requests miss cache simultaneously causing DB overload.
12. Q: How to prevent cache stampede? A: Use locks, request coalescing, or staggered expirations and pre-warming.
13. Q: What is a CDN cache TTL? A: Time-to-live; how long content is cached at CDN edges.
14. Q: What is sharding? A: Splitting data horizontally across multiple databases (shards).
15. Q: What is vertical partitioning? A: Splitting a table into multiple tables by columns.
16. Q: What is horizontal partitioning? A: Dividing rows into separate tables or databases.
17. Q: What is replication? A: Copying data across nodes for redundancy and read scaling.
18. Q: Master-slave vs master-master replication? A: Master-slave has one writer; master-master allows multiple writers with conflict resolution.
19. Q: What is eventual consistency? A: System guarantees that reads will converge to the latest state eventually.
20. Q: What is strong consistency? A: Reads always return the latest write.
21. Q: When to choose eventual consistency? A: When availability and partition tolerance are prioritized over immediate consistency.
22. Q: What is CAP theorem? A: You can only have two of Consistency, Availability, and Partition tolerance simultaneously in a distributed system.
23. Q: What is quorum? A: A minimum number of nodes required to accept reads/writes in distributed systems.
24. Q: What is leader election? A: A process to choose a primary node for coordination.
25. Q: What is a distributed transaction? A: A transaction spanning multiple databases or services.
26. Q: What is two-phase commit (2PC)? A: A protocol to ensure atomic commits across distributed resources.
27. Q: Downsides of 2PC? A: Blocking behavior and performance overhead.
28. Q: What is Saga pattern? A: A distributed transaction pattern using compensating actions for failure.
29. Q: When to use CQRS? A: Separate read and write responsibilities when read and write workloads differ significantly.
30. Q: What is event sourcing? A: Storing state changes as a sequence of immutable events.
31. Q: Benefits of event sourcing? A: Auditability, replayability, and easy projection creation.
32. Q: Downsides of event sourcing? A: Complexity and storage growth.
33. Q: What is a message queue? A: An intermediary that decouples producer and consumer via messages.
34. Q: Kafka vs RabbitMQ? A: Kafka is a distributed log optimized for throughput; RabbitMQ is a broker with flexible routing.
35. Q: What is at-least-once delivery? A: Messages may be delivered multiple times; consumers must be idempotent.
36. Q: What is exactly-once processing? A: Ensuring message effects are applied only once, often hard to achieve end-to-end.
37. Q: What is dead-letter queue (DLQ)? A: A queue for messages that cannot be processed after retries.
38. Q: What is backpressure? A: Mechanism to avoid overwhelming consumers when producers are faster.
39. Q: What is idempotency? A: Making operations safe to repeat without changing the result.
40. Q: How to implement idempotency? A: Use unique request IDs and detect duplicates server-side.
41. Q: What is API Gateway? A: Single entry point for external clients providing routing, auth, and rate limiting.
42. Q: What is rate limiting? A: Restricting the number of requests in a time window per user or IP.
43. Q: Common rate limiting algorithms? A: Token bucket, leaky bucket, fixed window, sliding window.
44. Q: What is throttling vs rate limiting? A: Throttling slows requests; rate limiting rejects excess requests.
45. Q: What is circuit breaker pattern? A: Prevent cascading failures by stopping calls to unhealthy services.
46. Q: What is bulkhead pattern? A: Isolating resources so failures in one component don't affect others.
47. Q: What is service discovery? A: Finding service instances dynamically (e.g., via Consul, DNS, or Kubernetes).
48. Q: What is gRPC? A: High-performance RPC framework using HTTP/2 and Protobuf.
49. Q: When to use gRPC? A: For internal microservice communication with low latency requirements.
50. Q: When to use REST? A: For public APIs where hypermedia, caching, and wide client compatibility matter.
51. Q: What is GraphQL? A: Query language allowing clients to specify exact data shapes.
52. Q: Downsides of GraphQL? A: Caching complexity and potential for expensive queries.
53. Q: What is web socket used for? A: Persistent, bi-directional communication for real-time apps.
54. Q: When to use polling vs websockets? A: Polling for infrequent updates; websockets for real-time frequent updates.
55. Q: What is connection pooling? A: Reusing connections to reduce latency and resource overhead.
56. Q: What is CDN edge caching? A: Storing content near users to lower latency and origin load.
57. Q: What is origin server? A: The authoritative server for content behind a CDN.
58. Q: What is TLS termination? A: Offloading SSL/TLS decryption at load balancer or proxy.
59. Q: What is mutual TLS? A: Both client and server present certificates for mutual authentication.
60. Q: What is JWT? A: JSON Web Token used for stateless authentication.
61. Q: Downsides of JWT? A: Revocation and long-lived tokens can be security risks.
62. Q: What is OAuth2? A: Authorization framework for delegated access.
63. Q: What is refresh token? A: A long-lived token used to obtain new short-lived access tokens.
64. Q: What is RBAC? A: Role-Based Access Control to manage permissions by roles.
65. Q: What is ABAC? A: Attribute-Based Access Control using attributes for policies.
66. Q: What is SQL injection? A: Attacker injects SQL via unsanitized inputs.
67. Q: How to prevent SQL injection? A: Use parameterized queries and ORM protections.
68. Q: What is XSS? A: Cross-site scripting where attackers inject scripts into web pages.
69. Q: How to prevent XSS? A: Escape output and sanitize inputs.
70. Q: What is CSRF? A: Cross-site request forgery tricking authenticated users into actions.
71. Q: How to prevent CSRF? A: Use anti-CSRF tokens and SameSite cookies.
72. Q: What is OAuth implicit flow deprecated? A: It's less secure for SPAs; use authorization code with PKCE.
73. Q: What is PKCE? A: Proof Key for Code Exchange to secure OAuth authorization code flow for public clients.
74. Q: What is rate limiting at edge? A: Applying limits at API Gateway or CDN edge to block abusive traffic early.
75. Q: What is WAF? A: Web Application Firewall that protects against common web attacks.
76. Q: What is anomaly detection in security? A: Using metrics and ML to spot unusual access or patterns.
77. Q: What is encryption at rest? A: Encrypting stored data to protect it if storage is compromised.
78. Q: What is encryption in transit? A: Encrypting data while moving over networks (TLS).
79. Q: What is key rotation? A: Periodically replacing encryption keys to limit exposure.
80. Q: What is secret management? A: Securely storing and accessing credentials (Vault, AWS KMS).
81. Q: What is multi-region deployment? A: Running services in multiple geographic regions for latency and resilience.
82. Q: What is active-active vs active-passive? A: Active-active serves traffic from multiple regions; active-passive uses standby failover.
83. Q: What is eventual consistency's read anomaly? A: Stale reads returning older data than the most recent write.
84. Q: How to mitigate stale reads? A: Use read-your-write session affinity or stronger consistency for critical operations.
85. Q: What is leader-based replication? A: One leader handles writes; followers replicate data.
86. Q: What is leaderless replication? A: Any node can accept writes; conflicts resolved via timestamps or vector clocks.
87. Q: What is vector clock? A: A method to track causal relationships in distributed systems.
88. Q: What is gossip protocol? A: Scalable peer-to-peer state dissemination used by many distributed systems.
89. Q: What is eventual convergence? A: System nodes reaching the same state after propagation.
90. Q: What is anti-entropy? A: Background processes to reconcile divergent replicas.
91. Q: What is tombstone in databases? A: Marker for a deleted record used in eventual consistency systems.
92. Q: What is compaction? A: Process of cleaning tombstones and consolidating storage.
93. Q: What is bloom filter? A: Probabilistic data structure to test set membership with false positives.
94. Q: Use case for bloom filter? A: Quickly check if key likely exists before expensive lookup.
95. Q: What is consistent hashing? A: Technique for evenly distributing keys with minimal rebalancing.
96. Q: Use of consistent hashing? A: Cache sharding and distributed key-value placement.
97. Q: What is write amplification? A: Extra writes caused by storage systems (e.g., SSDs, LSM-trees).
98. Q: What is LSM-tree? A: Log-structured merge-tree used by many NoSQL databases for fast writes.
99. Q: What is B-Tree? A: Balanced tree structure used by many relational DB indexes.
100. Q: What is indexing cost? A: Indexes speed reads but slow writes and consume storage.
101. Q: What is denormalization? A: Storing redundant data to speed reads at the expense of writes.
102. Q: When to denormalize? A: When read performance is critical and data duplication is manageable.
103. Q: What is normalization? A: Structuring data to reduce redundancy and maintain integrity.
104. Q: What is ACID? A: Atomicity, Consistency, Isolation, Durability properties of transactions.
105. Q: What is BASE? A: Basically Available, Soft state, Eventual consistency approach for distributed systems.
106. Q: What is a hotspot? A: A key or shard receiving disproportionate traffic causing load imbalance.
107. Q: How to mitigate hotspots? A: Use sharding, caching, replication, or key prefixing/randomization.
108. Q: What is read-replica lag? A: Delay between primary writes and replica availability.
109. Q: Impact of replica lag? A: Stale reads and potential inconsistency for read-after-write expectations.
110. Q: What is leader lease? A: A time-limited leadership to prevent split-brain in leader election.
111. Q: What is split-brain? A: Multiple nodes think they're leader due to partition, causing conflicts.
112. Q: How to avoid split-brain? A: Use majority quorum and reliable leader election algorithms.
113. Q: What is Paxos? A: Consensus algorithm for distributed systems.
114. Q: What is Raft? A: Easier-to-understand consensus algorithm alternative to Paxos.
115. Q: When to use consensus algorithms? A: For replicated logs, metadata services, and leader election.
116. Q: What is metadata service? A: Component that stores topology and configuration for distributed systems.
117. Q: What is ZooKeeper used for? A: Coordination, configs, leader election, and service discovery.
118. Q: What is heartbeating? A: Regular liveness signals between nodes or services.
119. Q: What is graceful shutdown? A: Allowing in-flight requests to finish before stopping a service.
120. Q: What is blue-green deployment? A: Technique to switch traffic from old to new version with rollback capability.
121. Q: What is canary deployment? A: Rolling out changes to a small subset of users first to detect issues.
122. Q: What is feature flagging? A: Turning features on/off at runtime without deploys.
123. Q: Benefits of feature flags? A: Safer releases and A/B testing.
124. Q: What is observability? A: Ability to understand system state via logs, metrics, and traces.
125. Q: Differences: logging, metrics, tracing? A: Logs are events, metrics are aggregated numbers, traces show request flows.
126. Q: What is OpenTelemetry? A: Standard for instrumenting and collecting observability data.
127. Q: What is distributed tracing? A: Following a request as it traverses services to identify latency.
128. Q: What is span and trace? A: A trace is the whole request; spans are segments representing operations.
129. Q: What is sampling in tracing? A: Collecting a subset of traces to reduce overhead.
130. Q: What is SLI, SLO, SLA? A: SLI is metric, SLO is target, SLA is contractual guarantee.
131. Q: Example SLO? A: 99.9% of requests have latency < 200ms.
132. Q: What is alert fatigue? A: Too many alerts causing important ones to be ignored.
133. Q: How to reduce alert fatigue? A: Tune thresholds, group alerts, and use runbooks.
134. Q: What is synthetic monitoring? A: Periodic scripted checks simulating user behavior.
135. Q: What is chaos engineering? A: Intentionally injecting failures to validate resilience.
136. Q: What is circuit breaker threshold? A: Error rate or latency threshold to open the circuit.
137. Q: What is retry with exponential backoff? A: Re-attempting operations with increasing delays to reduce overload.
138. Q: Why not retry indefinitely? A: It can overload downstream systems and delay failure detection.
139. Q: What is idempotent HTTP method? A: Methods like GET, PUT, DELETE that can be repeated safely.
140. Q: Is POST idempotent? A: Typically no; but can be designed to be with idempotency keys.
141. Q: What is multipart upload? A: Uploading large files in parts to improve reliability and resume on failure.
142. Q: What is presigned URL? A: Temporary URL granting upload/download permission to object storage.
143. Q: What is blob storage? A: Object storage for large unstructured data like files and media.
144. Q: What is eventual delete vs soft delete? A: Soft delete marks items deleted; eventual delete purges them later.
145. Q: What is data retention policy? A: Rules defining how long data is kept before deletion or archiving.
146. Q: What is GDPR concern in design? A: Data privacy, right-to-be-forgotten, and lawful processing of personal data.
147. Q: How to design for compliance? A: Data classification, access controls, audit logs, and retention policies.
148. Q: What is rate limiting key selection? A: Choose per-user, per-IP, or per-API-key depending on threat model.
149. Q: What is throttling window size? A: Time interval over which rate limits are enforced.
150. Q: What is cold start in serverless? A: Latency experienced when initializing a function instance from idle.