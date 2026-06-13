# Chapter 12 — System Observability &amp; Monitoring

Logging, Metrics, Tracing, Prometheus, Grafana &amp; Production Debugging
Practical System Design in Bangla

## 12.1 Introduction
একটা system live production এ গেলে সবচেয়ে বড় প্রশ্ন হলো:
“System ভিতরে কী হচ্ছে সেটা আমরা কীভাবে বুঝবো?”

কারণ production এ সমস্যা সবসময় visible না:
API slow কিন্তু কেন slow বোঝা যাচ্ছে না
error হচ্ছে কিন্তু কোথায় হচ্ছে unclear
user complain করছে কিন্তু root cause unknown

এই সমস্যা solve করার জন্য দরকার:
Observability (পর্যবেক্ষণযোগ্যতা)

## 12.2 Observability কী?
Observability হলো:
system এর ভিতরের state external signals দিয়ে বোঝার capability

Three Pillars of Observability
Logs
Metrics
Traces

## 12.3 Real Production Story — Unknown Production Issue
একটি ERP system এ:
dashboard slow
but no error in logs

Problem:
DB query slow ছিল
but identify করা যাচ্ছিল না

Root cause:
missing observability system

Fix:
logging + metrics + tracing implement

Result:
issue detect time 2 hours → 5 minutes

## 12.4 Logging কী?
Logging হলো:
system এর ঘটনাগুলো record করা

Example Log
User 101 logged in at 10:05 PM

Types of Logs
Info log
Warning log
Error log
Debug log

## 12.5 Structured Logging
Bad log:
User error happened
Good log:
{
  "userId": 101,
  "action": "login",
  "status": "failed",
  "reason": "invalid password"
}

## 12.6 Centralized Logging
Microservices system এ logs scattered থাকে।

Solution:
centralized logging system

Tools:
ELK Stack (Elasticsearch, Logstash, Kibana)

## 12.7 Metrics কী?
Metrics হলো:
system performance numbers

Example Metrics
CPU usage
memory usage
request per second
response time
error rate

## 12.8 Key System Metrics
Metric
Meaning
Latency
response time
Throughput
requests/sec
Error Rate
failed requests
Availability
uptime

## 12.9 Real Production Example — CPU Spike
Problem:
API slow

Metrics check:
CPU 95%
DB query slow

Solution:
indexing fix
caching added

## 12.10 Monitoring Tools — Prometheus
Prometheus হলো:
metrics collection system

Features:
time series data
alerting
query support

## 12.11 Visualization Tool — Grafana
Grafana ব্যবহার করা হয়:
metrics visualize করার জন্য

Example dashboards:
API latency graph
CPU usage graph
error rate chart

## 12.12 Metrics Flow
Application → Prometheus → Grafana → Dashboard

## 12.13 Alerting System
System problem detect হলে alert যায়:
email
SMS
Slack
webhook

Example Alert
API latency &gt; 2 sec

## 12.14 Distributed Tracing কী?
Tracing হলো:
request পুরো system এর ভিতর কোথায় কোথায় যাচ্ছে তা track করা

Example Flow
User → API Gateway → Service A → Service B → DB

Tracing দেখায়:
কোথায় delay হচ্ছে
কোন service slow

## 12.15 Trace ID Concept
Every request gets unique ID:
TRACE-ID: abc123

## 12.16 Real Production Story — Microservice Debugging
Problem:
payment delay

Without tracing:
guess work

With tracing:
order service slow identified
DB query bottleneck found

Result:
debugging time 3 hours → 10 minutes

## 12.17 OpenTelemetry
Modern standard for observability:
logs
metrics
traces

## 12.18 Logging vs Metrics vs Tracing
Type
Purpose
Logs
events record
Metrics
numbers
Tracing
request flow

## 12.19 Error Tracking
Production system এ error track করা গুরুত্বপূর্ণ।

Tools:
Sentry
ELK stack

## 12.20 Health Check System
System health check করে:
service alive?
DB connected?
dependency OK?

Example Endpoint
GET /health

## 12.21 Log Retention Strategy
Logs forever রাখা যাবে না।

Strategy:
7 days hot logs
30 days cold logs
archive storage

## 12.22 Performance Monitoring
Track:
slow queries
API bottlenecks
memory leak

## 12.23 Real Production Story — Memory Leak
Problem:
server slow over time

Metrics:
memory usage increasing

Root cause:
object not disposed properly

Fix:
code optimization
proper memory management

## 12.24 Distributed System Monitoring Challenges
Challenges:
multiple services
scattered logs
inconsistent metrics

Solution:
centralized observability stack

## 12.25 SLI, SLO, SLA

SLI (Service Level Indicator)
actual performance metric

SLO (Service Level Objective)
target performance

SLA (Service Level Agreement)
business contract

Example
SLA: 99.9% uptime
SLO: &lt; 200ms response time

## 12.26 Incident Response System
Production incident হলে:
detect
alert
analyze
fix
postmortem

## 12.27 Common Mistakes

Mistake 1 — No Logging Strategy
Debug impossible

Mistake 2 — No Metrics
Performance blind

Mistake 3 — No Tracing
Root cause unknown

Mistake 4 — Too Much Logging
Storage waste

Mistake 5 — No Alerts
Problem unnoticed

## 12.28 Enterprise Observability Architecture
User → API → Services → DB↓Logs + Metrics + Traces↓ELK + Prometheus + Grafana

## 12.29 Interview Perspective
Common questions:
Logging vs Metrics vs Tracing
Prometheus কী?
Grafana কীভাবে কাজ করে?
Distributed tracing কী?
SLI/SLO/SLA কী?
Observability কেন দরকার?

## 12.30 Mini Design Exercise
Design:
“Global Banking Monitoring System”
Consider:
transaction monitoring
fraud detection logs
latency tracking
alert system
distributed tracing
dashboard system

## 12.31 Chapter Summary
এই chapter এ আমরা শিখলাম:
Observability concept
Logging system design
Metrics system
Prometheus &amp; Grafana
Distributed tracing
Alerting system
Health checks
SLI/SLO/SLA
Incident management
Production debugging strategy
Real enterprise monitoring architecture
