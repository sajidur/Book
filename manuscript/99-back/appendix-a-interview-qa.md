---
letter: A
title: System Design Interview Q&A
bn: Interview প্রশ্নোত্তর
subtitle: দ্রুত রিভিশনের জন্য ১৭০টি প্রশ্ন ও সংক্ষিপ্ত উত্তর, বিষয়ভিত্তিক
---

## কীভাবে ব্যবহার করবেন

এই পরিশিষ্টের প্রশ্নোত্তরগুলো ইচ্ছাকৃতভাবে **ইংরেজিতে**, কারণ বেশিরভাগ System Design interview ইংরেজিতে হয় এবং এই শব্দগুলোই সেখানে শুনবেন। প্রতিটি অংশের শিরোনামে উল্লেখ আছে বিস্তারিত ব্যাখ্যা কোন অধ্যায়ে।

- **প্রথম পাঠে:** প্রশ্ন পড়ে উত্তর ঢেকে রাখুন; নিজে বলুন, তারপর মিলিয়ে দেখুন।
- **Interview-এর আগের সপ্তাহে:** প্রতিদিন একটি অংশ।
- **মনে রাখুন:** এক লাইনের উত্তর interview-এর শুরু মাত্র। ভালো উত্তরে থাকে একটি উদাহরণ ও একটি trade-off (অধ্যায় ২৫)।


## ভিত্তি, Scaling ও Caching

*বিস্তারিত: অধ্যায় ১-৩, ৬*

1. **What is system design?** The high-level process of defining a system's architecture, components, and interactions to meet requirements.
2. **What's the difference between functional and non-functional requirements?** Functional specifies behavior; non-functional specifies quality attributes like latency and availability.
3. **What is scalability?** The ability of a system to handle increased load by adding resources.
4. **Vertical vs horizontal scaling?** Vertical adds power to a single node; horizontal adds more nodes.
5. **What is a load balancer?** A component that distributes incoming traffic across multiple servers.
6. **What is CDN used for?** Caching and delivering static assets from edge locations to reduce latency.
7. **What is cache aside pattern?** Application checks cache first, on miss reads DB and populates cache.
8. **What is cache invalidation?** The process of removing or updating stale cache entries.
9. **What is a cache miss?** When requested data is not found in cache and must be fetched from the source.
10. **What is a cache hit?** When requested data is found in cache and returned directly.
11. **What is cache stampede?** Many requests miss cache simultaneously causing DB overload.
12. **How to prevent cache stampede?** Use locks, request coalescing, or staggered expirations and pre-warming.
13. **What is a CDN cache TTL?** Time-to-live; how long content is cached at CDN edges.

## Data: Sharding, Replication, Consistency ও Transaction

*বিস্তারিত: অধ্যায় ৩-৫, ১০*

14. **What is sharding?** Splitting data horizontally across multiple databases (shards).
15. **What is vertical partitioning?** Splitting a table into multiple tables by columns.
16. **What is horizontal partitioning?** Dividing rows into separate tables or databases.
17. **What is replication?** Copying data across nodes for redundancy and read scaling.
18. **Master-slave vs master-master replication?** Master-slave has one writer; master-master allows multiple writers with conflict resolution.
19. **What is eventual consistency?** System guarantees that reads will converge to the latest state eventually.
20. **What is strong consistency?** Reads always return the latest write.
21. **When to choose eventual consistency?** When availability and partition tolerance are prioritized over immediate consistency.
22. **What is CAP theorem?** You can only have two of Consistency, Availability, and Partition tolerance simultaneously in a distributed system.
23. **What is quorum?** A minimum number of nodes required to accept reads/writes in distributed systems.
24. **What is leader election?** A process to choose a primary node for coordination.
25. **What is a distributed transaction?** A transaction spanning multiple databases or services.
26. **What is two-phase commit (2PC)?** A protocol to ensure atomic commits across distributed resources.
27. **Downsides of 2PC?** Blocking behavior and performance overhead.
28. **What is Saga pattern?** A distributed transaction pattern using compensating actions for failure.
29. **When to use CQRS?** Separate read and write responsibilities when read and write workloads differ significantly.
30. **What is event sourcing?** Storing state changes as a sequence of immutable events.
31. **Benefits of event sourcing?** Auditability, replayability, and easy projection creation.
32. **Downsides of event sourcing?** Complexity and storage growth.

## Messaging ও Idempotency

*বিস্তারিত: অধ্যায় ৭, ১১*

33. **What is a message queue?** An intermediary that decouples producer and consumer via messages.
34. **Kafka vs RabbitMQ?** Kafka is a distributed log optimized for throughput; RabbitMQ is a broker with flexible routing.
35. **What is at-least-once delivery?** Messages may be delivered multiple times; consumers must be idempotent.
36. **What is exactly-once processing?** Ensuring message effects are applied only once, often hard to achieve end-to-end.
37. **What is dead-letter queue (DLQ)?** A queue for messages that cannot be processed after retries.
38. **What is backpressure?** Mechanism to avoid overwhelming consumers when producers are faster.
39. **What is idempotency?** Making operations safe to repeat without changing the result.
40. **How to implement idempotency?** Use unique request IDs and detect duplicates server-side.

## API, Resilience ও Networking

*বিস্তারিত: অধ্যায় ৭, ৯, ১০*

41. **What is API Gateway?** Single entry point for external clients providing routing, auth, and rate limiting.
42. **What is rate limiting?** Restricting the number of requests in a time window per user or IP.
43. **Common rate limiting algorithms?** Token bucket, leaky bucket, fixed window, sliding window.
44. **What is throttling vs rate limiting?** Throttling slows requests; rate limiting rejects excess requests.
45. **What is circuit breaker pattern?** Prevent cascading failures by stopping calls to unhealthy services.
46. **What is bulkhead pattern?** Isolating resources so failures in one component don't affect others.
47. **What is service discovery?** Finding service instances dynamically (e.g., via Consul, DNS, or Kubernetes).
48. **What is gRPC?** High-performance RPC framework using HTTP/2 and Protobuf.
49. **When to use gRPC?** For internal microservice communication with low latency requirements.
50. **When to use REST?** For public APIs where hypermedia, caching, and wide client compatibility matter.
51. **What is GraphQL?** Query language allowing clients to specify exact data shapes.
52. **Downsides of GraphQL?** Caching complexity and potential for expensive queries.
53. **What is web socket used for?** Persistent, bi-directional communication for real-time apps.
54. **When to use polling vs websockets?** Polling for infrequent updates; websockets for real-time frequent updates.
55. **What is connection pooling?** Reusing connections to reduce latency and resource overhead.
56. **What is CDN edge caching?** Storing content near users to lower latency and origin load.
57. **What is origin server?** The authoritative server for content behind a CDN.
58. **What is TLS termination?** Offloading SSL/TLS decryption at load balancer or proxy.

## Security

*বিস্তারিত: অধ্যায় ৮*

59. **What is mutual TLS?** Both client and server present certificates for mutual authentication.
60. **What is JWT?** JSON Web Token used for stateless authentication.
61. **Downsides of JWT?** Revocation and long-lived tokens can be security risks.
62. **What is OAuth2?** Authorization framework for delegated access.
63. **What is refresh token?** A long-lived token used to obtain new short-lived access tokens.
64. **What is RBAC?** Role-Based Access Control to manage permissions by roles.
65. **What is ABAC?** Attribute-Based Access Control using attributes for policies.
66. **What is SQL injection?** Attacker injects SQL via unsanitized inputs.
67. **How to prevent SQL injection?** Use parameterized queries and ORM protections.
68. **What is XSS?** Cross-site scripting where attackers inject scripts into web pages.
69. **How to prevent XSS?** Escape output and sanitize inputs.
70. **What is CSRF?** Cross-site request forgery tricking authenticated users into actions.
71. **How to prevent CSRF?** Use anti-CSRF tokens and SameSite cookies.
72. **What is OAuth implicit flow deprecated?** It's less secure for SPAs; use authorization code with PKCE.
73. **What is PKCE?** Proof Key for Code Exchange to secure OAuth authorization code flow for public clients.
74. **What is rate limiting at edge?** Applying limits at API Gateway or CDN edge to block abusive traffic early.
75. **What is WAF?** Web Application Firewall that protects against common web attacks.
76. **What is anomaly detection in security?** Using metrics and ML to spot unusual access or patterns.
77. **What is encryption at rest?** Encrypting stored data to protect it if storage is compromised.
78. **What is encryption in transit?** Encrypting data while moving over networks (TLS).
79. **What is key rotation?** Periodically replacing encryption keys to limit exposure.
80. **What is secret management?** Securely storing and accessing credentials (Vault, AWS KMS).

## Distributed System ও Storage-এর ভেতরের কথা

*বিস্তারিত: অধ্যায় ৩-৫, ৯*

81. **What is multi-region deployment?** Running services in multiple geographic regions for latency and resilience.
82. **What is active-active vs active-passive?** Active-active serves traffic from multiple regions; active-passive uses standby failover.
83. **What is eventual consistency's read anomaly?** Stale reads returning older data than the most recent write.
84. **How to mitigate stale reads?** Use read-your-write session affinity or stronger consistency for critical operations.
85. **What is leader-based replication?** One leader handles writes; followers replicate data.
86. **What is leaderless replication?** Any node can accept writes; conflicts resolved via timestamps or vector clocks.
87. **What is vector clock?** A method to track causal relationships in distributed systems.
88. **What is gossip protocol?** Scalable peer-to-peer state dissemination used by many distributed systems.
89. **What is eventual convergence?** System nodes reaching the same state after propagation.
90. **What is anti-entropy?** Background processes to reconcile divergent replicas.
91. **What is tombstone in databases?** Marker for a deleted record used in eventual consistency systems.
92. **What is compaction?** Process of cleaning tombstones and consolidating storage.
93. **What is bloom filter?** Probabilistic data structure to test set membership with false positives.
94. **Use case for bloom filter?** Quickly check if key likely exists before expensive lookup.
95. **What is consistent hashing?** Technique for evenly distributing keys with minimal rebalancing.
96. **Use of consistent hashing?** Cache sharding and distributed key-value placement.
97. **What is write amplification?** Extra writes caused by storage systems (e.g., SSDs, LSM-trees).
98. **What is LSM-tree?** Log-structured merge-tree used by many NoSQL databases for fast writes.
99. **What is B-Tree?** Balanced tree structure used by many relational DB indexes.
100. **What is indexing cost?** Indexes speed reads but slow writes and consume storage.
101. **What is denormalization?** Storing redundant data to speed reads at the expense of writes.
102. **When to denormalize?** When read performance is critical and data duplication is manageable.
103. **What is normalization?** Structuring data to reduce redundancy and maintain integrity.
104. **What is ACID?** Atomicity, Consistency, Isolation, Durability properties of transactions.
105. **What is BASE?** Basically Available, Soft state, Eventual consistency approach for distributed systems.
106. **What is a hotspot?** A key or shard receiving disproportionate traffic causing load imbalance.
107. **How to mitigate hotspots?** Use sharding, caching, replication, or key prefixing/randomization.
108. **What is read-replica lag?** Delay between primary writes and replica availability.
109. **Impact of replica lag?** Stale reads and potential inconsistency for read-after-write expectations.
110. **What is leader lease?** A time-limited leadership to prevent split-brain in leader election.
111. **What is split-brain?** Multiple nodes think they're leader due to partition, causing conflicts.
112. **How to avoid split-brain?** Use majority quorum and reliable leader election algorithms.
113. **What is Paxos?** Consensus algorithm for distributed systems.
114. **What is Raft?** Easier-to-understand consensus algorithm alternative to Paxos.
115. **When to use consensus algorithms?** For replicated logs, metadata services, and leader election.
116. **What is metadata service?** Component that stores topology and configuration for distributed systems.
117. **What is ZooKeeper used for?** Coordination, configs, leader election, and service discovery.
118. **What is heartbeating?** Regular liveness signals between nodes or services.

## Deployment, Observability, Storage ও Compliance

*বিস্তারিত: অধ্যায় ১২-১৪, ২৩*

119. **What is graceful shutdown?** Allowing in-flight requests to finish before stopping a service.
120. **What is blue-green deployment?** Technique to switch traffic from old to new version with rollback capability.
121. **What is canary deployment?** Rolling out changes to a small subset of users first to detect issues.
122. **What is feature flagging?** Turning features on/off at runtime without deploys.
123. **Benefits of feature flags?** Safer releases and A/B testing.
124. **What is observability?** Ability to understand system state via logs, metrics, and traces.
125. **Differences: logging, metrics, tracing?** Logs are events, metrics are aggregated numbers, traces show request flows.
126. **What is OpenTelemetry?** Standard for instrumenting and collecting observability data.
127. **What is distributed tracing?** Following a request as it traverses services to identify latency.
128. **What is span and trace?** A trace is the whole request; spans are segments representing operations.
129. **What is sampling in tracing?** Collecting a subset of traces to reduce overhead.
130. **What is SLI, SLO, SLA?** SLI is metric, SLO is target, SLA is contractual guarantee.
131. **Example SLO?** 99.9% of requests have latency < 200ms.
132. **What is alert fatigue?** Too many alerts causing important ones to be ignored.
133. **How to reduce alert fatigue?** Tune thresholds, group alerts, and use runbooks.
134. **What is synthetic monitoring?** Periodic scripted checks simulating user behavior.
135. **What is chaos engineering?** Intentionally injecting failures to validate resilience.
136. **What is circuit breaker threshold?** Error rate or latency threshold to open the circuit.
137. **What is retry with exponential backoff?** Re-attempting operations with increasing delays to reduce overload.
138. **Why not retry indefinitely?** It can overload downstream systems and delay failure detection.
139. **What is idempotent HTTP method?** Methods like GET, PUT, DELETE that can be repeated safely.
140. **Is POST idempotent?** Typically no; but can be designed to be with idempotency keys.
141. **What is multipart upload?** Uploading large files in parts to improve reliability and resume on failure.
142. **What is presigned URL?** Temporary URL granting upload/download permission to object storage.
143. **What is blob storage?** Object storage for large unstructured data like files and media.
144. **What is eventual delete vs soft delete?** Soft delete marks items deleted; eventual delete purges them later.
145. **What is data retention policy?** Rules defining how long data is kept before deletion or archiving.
146. **What is GDPR concern in design?** Data privacy, right-to-be-forgotten, and lawful processing of personal data.
147. **How to design for compliance?** Data classification, access controls, audit logs, and retention policies.
148. **What is rate limiting key selection?** Choose per-user, per-IP, or per-API-key depending on threat model.
149. **What is throttling window size?** Time interval over which rate limits are enforced.
150. **What is cold start in serverless?** Latency experienced when initializing a function instance from idle.

## AI যুগের System Design

*বিস্তারিত: অধ্যায় ১৫-১৭*

151. **What is RAG and why use it?** Retrieval-Augmented Generation retrieves relevant documents and gives them to the LLM as context, so answers use fresh, private and citable data instead of the model's memorised knowledge.
152. **RAG vs fine-tuning?** Use RAG to supply knowledge that changes or must be cited; use fine-tuning to change behaviour, style or a narrow skill. Many systems need only good prompts plus RAG.
153. **What is an embedding?** A numeric vector representing the meaning of text (or images) so that semantically similar items are close together in vector space.
154. **What is hybrid search?** Combining vector (semantic) search with keyword search such as BM25, then merging or reranking results; it handles both meaning and exact terms like codes and names.
155. **What is a reranker?** A model that scores query–document pairs more precisely than the first-stage search, used to pick the best few chunks from a larger candidate set.
156. **How do you choose chunk size?** Follow document structure, keep each chunk self-contained with its context (title, section), add small overlap, and tune by measuring retrieval recall on real questions.
157. **How do you enforce permissions in RAG?** Filter retrieval by the user's permissions and tenant before anything reaches the model; never rely on the prompt to hide documents.
158. **What is hallucination and how do you reduce it?** Confident but unsupported output. Reduce it with grounding in retrieved context, citations, output checks for numbers and facts, an explicit "I don't know" path and human handoff.
159. **How do you evaluate an LLM application?** Use a golden dataset of real questions with expected answers and sources; measure retrieval recall, faithfulness, correctness, refusal accuracy, safety, latency and cost; run it in CI for every prompt or model change.
160. **What is LLM-as-judge?** Using a model to grade outputs against criteria. It scales evaluation but can be biased or wrong, so calibrate it against human judgements.
161. **What is prompt injection?** Text that tries to override the system's instructions, either typed by the user (direct) or hidden in content the model reads (indirect). Mitigate with least-privilege tools, authorization outside the model and human approval for risky actions.
162. **What does an AI gateway do?** Centralises LLM access: key management, routing and fallback between models, token-based rate limits and budgets, caching, PII redaction, logging and cost tracking.
163. **How do you reduce LLM latency?** Stream tokens, route simple requests to smaller models, cache (semantic and prompt caching), parallelise retrieval, cap output length and move long jobs to async queues.
164. **How do you reduce LLM cost?** Retrieve fewer but better chunks, route by difficulty, cache, use batch APIs for non-urgent work and enforce per-feature budgets with alerts.
165. **What is semantic caching and its risk?** Reusing a previous answer when a new question is similar in meaning. Risks: leaking personalised answers across users and wrong matches for questions that look similar but mean different things.
166. **Workflow vs agent?** A workflow follows predefined steps (some may use an LLM); an agent lets the model choose steps and tools in a loop. Prefer workflows when the path is known; agents only when it truly is not.
167. **How should tools for agents be designed?** Narrow and explicit, read separated from write, idempotent writes, drafts instead of final actions, clear error messages, and executed with the end user's permissions.
168. **What is the "lethal trifecta" for agents?** Access to private data, exposure to untrusted content, and the ability to communicate externally. Together they allow data exfiltration through prompt injection; remove at least one.
169. **What is data drift vs concept drift?** Data drift: the input distribution changes. Concept drift: the relationship between inputs and the correct output changes. Both require monitoring and retraining.
170. **Where must humans stay in the loop?** Irreversible or high-impact actions (money movement, approvals, deletion, production changes), low-confidence cases, and decisions affecting people's rights such as credit, hiring and admission.
