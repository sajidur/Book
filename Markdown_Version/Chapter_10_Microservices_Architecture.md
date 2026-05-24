# Chapter 10 — Microservices Architecture

Service Decomposition, Communication, Event-Driven Systems &amp; Saga Pattern
Practical System Design in Bangla

10.1 Introduction
একটা system যখন ছোট থাকে, তখন একটি single application (monolith) যথেষ্ট।
কিন্তু যখন system বড় হয়:
multiple team
multiple feature domain
high traffic
complex business logic
independent deployment needed
তখন monolith system আর work করে না।

তখন আমরা move করি:
Microservices Architecture

10.2 Real Production Story — Monolith Breakdown Problem
একটি ERP system শুরু হয়েছিল:
single .NET application
single database
all modules in one project

Initially:
fast development
easy deployment

After 2–3 years:
HR module change করলে Accounting break
deployment risky
team conflict
build time 40+ minutes
bug impact huge

Problem:
“everything tightly coupled”

Solution:
system split into microservices
independent deployment
domain separation

10.3 Microservices কী?
Microservices হলো:
একটি বড় system কে ছোট independent services এ ভাগ করা

প্রতিটি service:
independent deployable
own database (ideally)
specific business domain
loosely coupled

10.4 Monolith vs Microservices
Feature
Monolith
Microservices
Deployment
Single
Independent
Scaling
Whole system
Per service
Complexity
Low
High
Flexibility
Low
High
Team size
Small
Large

10.5 Service Decomposition Strategy
Microservices design করার সবচেয়ে গুরুত্বপূর্ণ অংশ:
কিভাবে system কে ভাগ করা হবে

Strategies
1. Business Domain Based (Best)
HR Service
Payroll Service
Inventory Service
Payment Service

2. Function Based (Bad for large system)
User Service
Email Service
Report Service

10.6 Real ERP Microservices Example
Service
Responsibility
Auth Service
login, token
HR Service
employee
Payroll Service
salary
Inventory Service
stock
Reporting Service
analytics

10.7 Communication Between Services
Microservices একে অপরের সাথে communicate করে।

1. Synchronous (REST/gRPC)
direct API call
immediate response

2. Asynchronous (Message Queue)
RabbitMQ
Kafka
event-driven

10.8 Synchronous Communication Problem
Example:
Order Service → Payment Service → Inventory Service

Problem:
one service slow → entire flow slow
cascading failure risk

10.9 Asynchronous Communication
Instead of direct call:
Order Created → Event → Queue → Consumer Services

Benefit
decoupled system
scalable
resilient

10.10 Event-Driven Architecture
System reacts based on events.

Example Event
OrderCreated
PaymentCompleted
StockUpdated

Flow
Order Service → emits event → Kafka → multiple consumers

10.11 Real Production Example — Event System
E-commerce system:
order placed
inventory update
email send
notification push

Without event system:
tightly coupled
slow response
With event system:
fast API
async processing

10.12 API Gateway in Microservices
Microservices direct access না দিয়ে:
API Gateway ব্যবহার করা হয়

Responsibilities
routing
authentication
rate limiting
logging

Architecture
Client → API Gateway → Microservices

10.13 Database per Service
Best practice:
each microservice should own its database

Benefit
independent scaling
loose coupling
easier maintenance

Problem
distributed transactions difficult

10.14 Shared Database Problem
Bad design:
all services same DB

Problem:
tight coupling
schema conflict
deployment risk

10.15 Distributed Transactions Problem
Example:
Order → Payment → Inventory

Problem:
one fails → consistency issue

10.16 Saga Pattern
Saga solves distributed transaction problem.

Types
1. Choreography
services communicate via events

2. Orchestration
central coordinator manages flow

10.17 Saga Example
Order flow:
Order created
Payment success
Inventory update
Shipping

If failure:
rollback compensation actions

Example Compensation
payment refund
stock restore

10.18 Real Production Story — Payment Failure
System:
order placed
payment failed mid-way
Problem:
stock already reduced
order inconsistent
Solution:
saga compensation implemented

Result:
data consistency restored

10.19 Service Discovery
Microservices dynamic system।

Problem:
services IP change
Solution:
service registry

Example tools:
Consul
Eureka
Kubernetes DNS

10.20 Load Balancing in Microservices
Each service has its own scaling:
Auth Service → 3 instances
Order Service → 10 instances

10.21 Fault Isolation
Microservices advantage:
one service failure does not break system

Example:
notification service down
payment still works

10.22 Circuit Breaker Pattern
Prevent cascading failure.

States
Closed
Open
Half-open

Benefit
system stability
failure isolation

10.23 Retry &amp; Timeout Strategy
Important in distributed system:
retry logic
exponential backoff
timeout control

10.24 Logging &amp; Observability
Microservices require:
centralized logging
tracing
metrics

Tools:
ELK stack
Prometheus
Grafana
Jaeger

10.25 Real Production Story — Microservice Debugging
Problem:
payment delayed
order stuck

Issue:
no distributed tracing
logs scattered

Solution:
centralized logging system
trace ID implemented

Result:
issue root cause identified quickly

10.26 Common Mistakes

Mistake 1 — Premature Microservices
Small system → unnecessary complexity

Mistake 2 — Too Many Services
100+ microservices → unmanageable

Mistake 3 — Shared Database
Breaks independence

Mistake 4 — No Observability
Debug impossible

Mistake 5 — No Event Design
Tight coupling system

10.27 Enterprise Best Practices
domain-driven design (DDD)
event-driven architecture
API gateway
service isolation
circuit breaker
centralized logging
database per service

10.28 Interview Perspective
Common questions:
Microservices কী?
Monolith vs Microservices
Saga pattern কী?
Event-driven architecture কী?
Service discovery কী?
Circuit breaker কী?

10.29 Mini Design Exercise
Design:
“Food Delivery Microservices System”
Consider:
user service
restaurant service
order service
payment service
delivery service
event system
scaling strategy

10.30 Chapter Summary
এই chapter এ আমরা শিখলাম:
Microservices architecture
Service decomposition strategy
Synchronous vs asynchronous communication
Event-driven system
API gateway role
Database per service
Saga pattern
Distributed transaction handling
Service discovery
Circuit breaker
Observability in microservices
Real production issues
