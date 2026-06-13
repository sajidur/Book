# Chapter 7 — API Design &amp; Backend Architecture

REST, GraphQL, gRPC, Versioning, Rate Limiting &amp; Scalable Backend Systems
Practical System Design in Bangla

## 7.1 Introduction
একটি system যতই বড় হয়, সবকিছুর কেন্দ্র হয়ে দাঁড়ায় API।
কারণ:
frontend API call করে
mobile app API call করে
third-party integration API ব্যবহার করে
microservices একে অপরের সাথে API দিয়ে communicate করে

তাই বলা যায়:
“API হলো পুরো system এর nervous system।”

একটি দুর্বল API design পুরো system কে slow, unstable এবং unscalable করে দিতে পারে।

## 7.2 Real Production Story — Bad API Design
একটি ERP system এ শুরুতে API ছিল:
single endpoint
heavy response
no pagination
no caching
no versioning

Problem:
report API 10–15 second নিচ্ছিল
mobile app crash করছিল
network payload huge ছিল
database overload হচ্ছিল

Root cause:
API design proper system thinking ছাড়া করা হয়েছিল

Solution:
RESTful redesign
pagination
caching
DTO optimization
versioning

Result:
12 sec → 250ms
70% bandwidth reduction

## 7.3 API কী?
API (Application Programming Interface) হলো:
দুই system এর মধ্যে communication bridge

Example:
Frontend → API → Backend → Database

## 7.4 REST API কী?
REST (Representational State Transfer) হলো সবচেয়ে common API architecture style।

REST Principles
stateless
resource-based
HTTP methods use
standardized structure

## 7.5 REST Methods
Method
Use
GET
data read
POST
create
PUT
full update
PATCH
partial update
DELETE
remove

Example
GET /users/1
POST /users
PUT /users/1
DELETE /users/1

## 7.6 REST Best Practices
proper naming
consistent structure
versioning
pagination
filtering
error handling

Bad API Example
GET /getUserDataByIdAndType

Good API Example
GET /users/{id}

## 7.7 API Versioning
System evolve করলে API change হয়।

Why Versioning Needed?
backward compatibility
mobile app stability
gradual migration

Example
GET /api/v1/users
GET /api/v2/users

## 7.8 API Response Design
Good API response always structured:
{
  "success": true,
  "data": {},
  "error": null
}

Bad Response
{ "name": "Sajid" }

## 7.9 Pagination
Large dataset একসাথে load করা dangerous।

Example
GET /orders?page=1&amp;size=50

Benefit
faster response
reduced memory usage
better UX

## 7.10 Filtering &amp; Sorting
Enterprise API supports:
GET /products?category=mobile&amp;sort=price_desc

## 7.11 GraphQL
GraphQL হলো:
client driven query API

Example
Client decides কী data লাগবে।

{
  user(id: 1) {
    name
    email
    orders {
      id
      total
    }
  }
}

GraphQL Benefits
over-fetching কম
under-fetching কম
flexible query

Problem
caching difficult
complexity high
learning curve steep

## 7.12 gRPC
gRPC হলো high-performance binary API protocol।

Features
very fast
binary communication
HTTP/2 based
strongly typed

Use Case
microservices communication
internal system calls

Example Flow
Auth Service → User Service → Order Service

## 7.13 REST vs GraphQL vs gRPC
Type
Use Case
REST
public APIs
GraphQL
frontend flexible queries
gRPC
internal microservices

## 7.14 API Gateway
API Gateway হলো:
single entry point for all APIs

Responsibilities
routing
authentication
rate limiting
logging
load balancing

Architecture
Client → API Gateway → Microservices

## 7.15 Rate Limiting
API abuse prevent করার জন্য rate limiting ব্যবহার হয়।

Example
100 requests / minute per user

Techniques
- token bucket
- leaky bucket
- fixed window
- sliding window log
- sliding window counter

### Rate Limiting Design
- User-based limits: user ID বা API token অনুযায়ী limit set করা
- IP-based limits: client IP থেকে burst traffic detect করা
- Global limits: distributed system এ shared counter use করা
- Burst support: token bucket allow short bursts while keeping average low

### Distributed Rate Limiting
API Gateway বা service mesh এ global rate limiting implement করলে:
- centralized counter use করতে হবে (Redis, distributed cache)
- local limits + global sync করা যেতে পারে
- client-side retry/backoff important

Real Use Case
Login API protect against brute force attack

## 7.16 Authentication &amp; Authorization

Authentication
User কে verify করা

Authorization
User কী করতে পারবে সেটা control করা

Example
Admin → full access
User → limited access

## 7.17 JWT (JSON Web Token)
JWT হলো stateless authentication method।

Flow
login
token generate
API call with token

Benefits
scalable
no session storage needed

## 7.18 API Security
Important protections:
HTTPS
JWT validation
input validation
SQL injection prevention
CORS policy

## 7.19 Input Validation
Bad input → system crash বা attack

Example
null check
length validation
type validation

## 7.20 Error Handling
Good API always consistent error return করে।

Example
{
  "success": false,
  "error": {
    "code": "5001",
    "message": "Invalid input"
  }
}

## 7.21 Idempotency
Idempotency মানে:
same request multiple times call করলেও result same থাকবে

Example
Payment API:
duplicate request → double payment হবে না

## 7.22 Async API Design
Heavy operation async করা উচিত।

Example
report generation
email sending
file processing

Flow
API → Queue → Worker → Result

## 7.23 API Performance Optimization
Techniques:
caching
pagination
compression
async processing
connection pooling

## 7.24 Compression
API response compress করা হয় (gzip)

Benefit
bandwidth reduce
faster response

## 7.25 Real Production Story — API Bottleneck
Problem:
5000 concurrent user
API slow 8 sec
Cause:
heavy join
no cache
no pagination
Solution:
DTO optimize
Redis cache
split API
Result:
8 sec → 180ms

## 7.26 Logging &amp; Observability
API level monitoring খুব গুরুত্বপূর্ণ।

Track:
latency
error rate
request count
response time

## 7.27 Common Mistakes

Mistake 1 — Chatty API
Too many small calls

Mistake 2 — Overfetching Data
Unnecessary data load

Mistake 3 — No Versioning
Breaking production app

Mistake 4 — No Rate Limiting
System abuse

Mistake 5 — No Timeout Handling
API hang issue

## 7.28 Timeout Strategy
Every API must have timeout:
database timeout
service timeout
external API timeout

## 7.29 Interview Perspective
Common questions:
REST vs GraphQL
API versioning
JWT কী?
Rate limiting কী?
Idempotency কী?
gRPC কেন use করা হয়?

## 7.30 Mini Design Exercise
Design:
“Food Delivery API System”
Think:
order API
restaurant API
rider tracking
payment API
caching strategy
rate limiting
scalability

## 7.31 Chapter Summary
এই chapter এ আমরা শিখলাম:
REST API design
API best practices
GraphQL concept
gRPC architecture
API Gateway
Rate limiting
Authentication &amp; JWT
Security practices
Idempotency
Async API design
Performance optimization
Real production API issues
