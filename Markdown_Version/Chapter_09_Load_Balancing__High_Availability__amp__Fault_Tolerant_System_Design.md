# Chapter 9 — Load Balancing, High Availability &amp; Fault Tolerant System Design

NGINX, HAProxy, Failover, Redundancy &amp; Enterprise Scale Architecture
Practical System Design in Bangla

9.1 Introduction
একটা system যখন বড় হয়, তখন সবচেয়ে বড় সমস্যা হয়:
“একটা server এর উপর সব traffic চলে আসে”
Result:
server overload
API slow
crash
downtime
business loss

এই problem solve করার জন্য আমরা ব্যবহার করি:
Load Balancing + High Availability + Fault Tolerance

9.2 Real Production Story — Single Server Disaster
একটি ERP system শুরু হয়েছিল:
1 application server
1 database server

Initially:
smooth
fast
stable

After growth:
10,000 concurrent user
heavy report generation
API traffic increase

Problem:
CPU 100%
IIS crash
system down 3 hours
users cannot login

Root Cause:
single server architecture (no load balancing)

9.3 Load Balancing কী?
Load balancing হলো:
incoming traffic multiple server এ distribute করা

Simple idea:
Instead of:
1 server handles everything
We use:
multiple servers share load

9.4 Load Balancer Architecture
User → Load Balancer → App Server 1→ App Server 2→ App Server 3

9.5 Why Load Balancing is Important?
performance improve
high availability
fault tolerance
scalable system

9.6 Load Balancer Types

1. Hardware Load Balancer
physical device
expensive
enterprise level

2. Software Load Balancer
NGINX
HAProxy
Apache

3. Cloud Load Balancer
AWS ELB
Azure Load Balancer

9.7 Load Balancing Algorithms

1. Round Robin
Requests distribute sequentially

Example
Server1 → Server2 → Server3 → repeat

2. Least Connection
যে server least busy, সেখানে request যাবে

3. IP Hash
Same user → same server

4. Weighted Round Robin
Powerful server বেশি load পাবে

9.8 Real Production Example
E-commerce system:
product browsing
order processing

Problem:
Server 1 overloaded
Server 2 idle

Solution:
least connection algorithm
proper load balancing

Result:
balanced traffic
stable system

9.9 High Availability (HA)
High availability মানে:
system always available থাকবে

Formula
Availability = \frac{Uptime}{Uptime + Downtime}

9.10 Availability Levels
Level
Downtime
99%
3.65 days/year
99.9%
8.7 hours/year
99.99%
52 minutes/year

9.11 High Availability Architecture
Core idea:
multiple servers
redundancy
failover system

Example
User → Load Balancer → Server A→ Server B (backup)

9.12 Failover System
Failover মানে:
primary system fail হলে automatically backup system activate হবে

Types
1. Active-Passive
one active
one standby

2. Active-Active
both active
both serve traffic

9.13 Real Example — Server Crash Recovery
Banking system এ:
primary server crash
secondary server auto activate

Result:
zero downtime
user not affected

9.14 Fault Tolerance কী?
Fault tolerance মানে:
system partial failure হলেও continue চলবে

Example
notification service down
but payment system still works

9.15 Redundancy
Redundancy মানে:
same component multiple copy রাখা

Types
server redundancy
database redundancy
network redundancy

9.16 Database Failover
Database architecture:
Primary DB → Replica DB

Scenario
Primary fail → Replica takes over

9.17 Real Production Story — Database Failure
An ERP system:
single SQL Server
disk failure

Result:
system down 6 hours
no replication

Lesson:
redundancy is not optional

9.18 Health Check System
Load balancer continuously checks:
server alive?
response time?
error rate?

If failed:
remove from pool

9.19 Sticky Session Problem
Problem:
User session must stay same server

Solution:
sticky session (IP based)
Redis session store

9.20 Stateless Architecture
Modern system prefers:
stateless servers

Benefit:
easy scaling
no session dependency
better failover

9.21 Horizontal Scaling with Load Balancer
User → LB → multiple stateless servers

9.22 Rate Limiting at Load Balancer
Protect system from abuse:
request limit per IP
DDoS protection

9.23 Load Balancer + Cache + DB Architecture
User→ Load Balancer→ App Server→ Redis Cache→ Database

9.24 CDN Integration
Static content serve:
images
JS
CSS

Flow:
User → CDN → Origin Server

9.25 Network Redundancy
Enterprise system uses:
multiple ISP
backup route
failover network

9.26 Monitoring Load Balancer
Track:
request count
latency
server health
error rate

9.27 Real Production Story — Traffic Spike
Flash sale event:
traffic 20x increase

Without LB:
system crash
With LB:
traffic distributed
system stable

9.28 Common Mistakes

Mistake 1 — Single Load Balancer
If LB fails → whole system down

Mistake 2 — No Health Check
Dead server still gets traffic

Mistake 3 — No Failover Strategy
Manual recovery only

Mistake 4 — Sticky Session Abuse
Uneven load distribution

Mistake 5 — No Auto Scaling
Static infrastructure

9.29 Enterprise Best Practices
multiple load balancer
auto scaling group
health check enabled
stateless services
distributed caching
DB replication

9.30 Interview Perspective
Common questions:
Load balancing কী?
Round robin vs least connection
Failover কী?
High availability কী?
Sticky session সমস্যা কী?
Active-active vs active-passive

9.31 Mini Design Exercise
Design:
“Global E-Commerce Platform”
Consider:
global traffic
CDN
load balancing
failover system
database replication
caching strategy
disaster recovery

9.32 Chapter Summary
এই chapter এ আমরা শিখলাম:
Load balancing concept
NGINX / HAProxy role
Load balancing algorithms
High availability design
Failover system
Fault tolerance
Redundancy strategy
Stateless architecture
Health checks
CDN integration
Real production scaling issues
