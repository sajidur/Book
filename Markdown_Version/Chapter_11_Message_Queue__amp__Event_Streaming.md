# Chapter 11 — Message Queue &amp; Event Streaming

RabbitMQ, Kafka, Background Processing &amp; Distributed Event Systems
Practical System Design in Bangla

11.1 Introduction
একটা large system এ সবচেয়ে common problem হলো:
“সব কাজ একসাথে synchronousভাবে করা”

Result:
API slow
timeout
user experience খারাপ
system overload

এই problem solve করার জন্য আমরা ব্যবহার করি:
Message Queue &amp; Event Streaming

11.2 Real Production Story — Email System Failure
একটি ERP system এ:
user registration
সাথে সাথে email send করা হচ্ছিল

Problem:
email service slow
API response delay 6–10 sec
occasional timeout

Root cause:
email sending was synchronous

Solution:
message queue implement
background worker add

Result:
API response 200ms
email async process

11.3 Message Queue কী?
Message queue হলো:
system এর মধ্যে asynchronous communication mechanism

Simple idea:
Producer → Queue → Consumer

11.4 Why Message Queue Needed?
async processing
system decoupling
scalability
reliability
retry mechanism

11.5 Queue vs Direct API Call
Feature
Direct Call
Message Queue
Speed
Slow
Fast
Dependency
Tight
Loose
Failure Impact
High
Low
Scalability
Limited
High

11.6 RabbitMQ কী?
RabbitMQ হলো:
traditional message broker system

Features:
queue-based messaging
reliable delivery
routing support
acknowledgements

11.7 RabbitMQ Architecture
Producer → Exchange → Queue → Consumer

11.8 Kafka কী?
Kafka হলো:
distributed event streaming platform

Features:
high throughput
massive scale
persistent log system
replay capability

11.9 RabbitMQ vs Kafka
Feature
RabbitMQ
Kafka
Model
Queue
Event log
Speed
Medium
Very high
Use case
task processing
event streaming
Replay
Limited
Yes

11.10 When to Use RabbitMQ?
email sending
background jobs
notification system
task queue

11.11 When to Use Kafka?
analytics system
real-time tracking
log processing
event sourcing

11.12 Background Processing
Background processing মানে:
heavy task API থেকে আলাদা করে worker process এ করা

Example
User request:
generate report

Instead of:
API wait
We do:
queue job
worker process
async response

11.13 Real Production Example — Report System
Problem:
report generation 15 sec
API timeout
Solution:
queue based processing

Flow:
API → job enqueue
worker → process
store result
user fetch later

Result:
API fast
system stable

11.14 Producer &amp; Consumer
Producer
message send করে
Consumer
message process করে

11.15 Message Acknowledgement
Consumer must confirm:
message received
processed successfully

If not:
message retry হবে

11.16 Retry Mechanism
System failure handle করতে retry লাগে:
temporary failure
network issue
service downtime

11.17 Dead Letter Queue (DLQ)
Failed messages যায়:
DLQ (Dead Letter Queue)

Purpose:
error analysis
manual retry
debugging

11.18 Real Production Story — Payment Retry Issue
System:
payment processing queue

Problem:
payment gateway timeout
message lost risk

Solution:
retry + DLQ

Result:
zero message loss
consistent processing

11.19 Event Streaming Concept
Kafka-based system এ:
everything is event

Example events:
UserCreated
OrderPlaced
PaymentCompleted

11.20 Event Flow Architecture
Producer → Kafka Topic → Multiple Consumers

Benefit
real-time processing
scalable system
decoupled architecture

11.21 Event Replay Feature
Kafka advantage:
old event আবার process করা যায়

Use case:
analytics rebuild
audit system
debugging

11.22 Topic Partitioning
Kafka data split করে:
partition 1
partition 2
partition 3

Benefit:
parallel processing
high throughput

11.23 Message Ordering Problem
Important concept:
ordering guarantee per partition

11.24 Queue Backpressure Problem
When producer faster than consumer:
queue overflow
latency increase

Solution:
scale consumer
limit producer
buffer management

11.25 Real Production Story — Traffic Spike
E-commerce flash sale:
100,000 order/min

Without queue:
system crash
With queue:
smooth processing
controlled load

11.26 Idempotent Consumer
Important concept:
same message multiple times process হলেও result same হবে

Example:
payment event duplicate
still single transaction

11.27 Monitoring Queue System
Track:
queue length
consumer lag
processing time
failure rate

11.28 Common Mistakes

Mistake 1 — No Retry Strategy
Message lost risk

Mistake 2 — No DLQ
Error invisible

Mistake 3 — Overloading Consumer
System crash

Mistake 4 — No Idempotency
Duplicate data issue

Mistake 5 — Wrong Tool Choice
Kafka vs RabbitMQ mismatch

11.29 Enterprise Architecture Example
Banking system:
Kafka → transaction events
RabbitMQ → email + notification
Worker service → report generation

11.30 Interview Perspective
Common questions:
Message queue কী?
RabbitMQ vs Kafka
Producer vs Consumer
Event-driven architecture
DLQ কী?
Idempotency কী?

11.31 Mini Design Exercise
Design:
“Large Scale Notification System”
Consider:
email queue
SMS queue
push notification
retry mechanism
DLQ
scaling strategy

11.32 Chapter Summary
এই chapter এ আমরা শিখলাম:
Message Queue concept
RabbitMQ architecture
Kafka streaming system
Producer/Consumer model
Background processing
Retry mechanism
Dead Letter Queue
Event-driven architecture
Partitioning &amp; ordering
Idempotency concept
Real production queue systems
