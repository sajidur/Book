# Chapter 8 — Authentication, Security &amp; Distributed System Protection

JWT, OAuth, RBAC, Encryption, Attack Prevention &amp; Enterprise Security Architecture
Practical System Design in Bangla

## 8.1 Introduction
একটা system যত বড় হয়, তত বেশি গুরুত্বপূর্ণ হয়ে যায় Security।
কারণ:
শুধু feature কাজ করলেই হবে না
system কে safe, trusted, tamper-proof হতে হবে

একটি insecure system মানে:
“পুরো system ঠিক আছে, কিন্তু যে কেউ ঢুকে data বদলে দিতে পারে”

## 8.2 Real Production Story — Security Failure
একটি enterprise ERP system এ:
API endpoint ছিল public
proper authentication ছিল না
token validation weak ছিল

Problem:
unauthorized user salary data access করছিল
invoice modify করা যাচ্ছিল
audit log mismatch হচ্ছিল

Root Cause:
authentication + authorization properly design করা হয়নি

Fix:
JWT implementation
RBAC system
API gateway security
encryption

Result:
system secured
audit control restored
access controlled properly

## 8.3 Authentication vs Authorization
এই দুইটা সবচেয়ে important concept।

Authentication (Who are you?)
User identity verify করা।
Example:
login
password check
OTP verification

Authorization (What can you do?)
User permission control করা।
Example:
admin can delete user
normal user cannot

## 8.4 Authentication Flow
User login
credentials verify
token generate
token store/use
API call with token

## 8.5 JWT (JSON Web Token)
JWT হলো stateless authentication system।

Structure
JWT consists of:
Header
Payload
Signature

Example Payload
{
  "userId": 101,
  "role": "Admin",
  "exp": 1710000000
}

## 8.6 JWT Flow in System Design
User → Login API → JWT Token → API Request → Validate Token

Benefits
stateless system
scalable
no session DB needed
microservice friendly

Problem
token leak হলে security risk
revoke করা hard

## 8.7 Refresh Token Strategy
JWT short-lived হয়।
Refresh token ব্যবহার হয় long session maintain করতে।

Flow
Access Token (short)
Refresh Token (long)

Example
Access token: 15 min
Refresh token: 7 days

## 8.8 OAuth2
OAuth হলো third-party authentication system।

Example
Login with Google
Login with Facebook

Flow
redirect to provider
user login
token receive
access API

## 8.9 Role-Based Access Control (RBAC)
RBAC হলো:
user role অনুযায়ী permission control system

Example
Role
Permission
Admin
Full access
Manager
Limited access
User
Read-only

Real ERP Example
HR can view salary
Employee cannot

## 8.10 Permission System Design
Enterprise system এ permission dynamic হয়।

Structure
User
Role
Permission
Module

Problem
Complex hierarchy handling difficult

## 8.11 Encryption
Encryption হলো data protect করার technique।

Types
1. Symmetric Encryption
Same key used
2. Asymmetric Encryption
Public + Private key

Example
HTTPS uses encryption
password stored hashed

## 8.12 Hashing vs Encryption
Type
Purpose
Hashing
irreversible
Encryption
reversible

Example
Password:
Stored as hash (not plain text)

## 8.13 Password Security
Never store plain password.

Good Practice
bcrypt
salt
strong hashing

## 8.14 API Security Layers
Enterprise system usually has multiple layers:

Client → API Gateway → Auth Service → Microservice → DB

## 8.15 API Gateway Security
API Gateway handles:
authentication
rate limiting
IP filtering
logging

## 8.16 Rate Limiting for Security
Prevent attack:
brute force
DDoS

Example
100 requests/min per user

## 8.17 CORS Security
CORS controls:
which domain API access করতে পারবে

## 8.18 SQL Injection Attack
Most dangerous attack.

Bad Example
SELECT * FROM Users WHERE Name = 'input'

Attack
User input:
' OR 1=1 --

Fix
parameterized query
ORM use

## 8.19 XSS Attack
Frontend security issue।

Example
User input injects script:
&lt;script&gt;alert('hack')&lt;/script&gt;

Fix
input sanitization
output encoding

## 8.20 CSRF Attack
User session misuse করে unauthorized action।

Fix
CSRF token
secure cookies

## 8.21 Distributed System Security
Microservice architecture এ security আরও complex।

Challenges
multiple services
network communication
token propagation

Solution
centralized auth service
API gateway validation
service-to-service authentication

## 8.22 Zero Trust Architecture
Modern system design concept:
“Never trust, always verify”

Principle
every request validate করতে হবে
internal serviceও trusted না

## 8.23 Secure Communication
Use:
HTTPS
TLS
encrypted channels

## 8.24 Audit Logging
Enterprise system এ audit mandatory।

Example
User
Action
Time
Admin
Updated salary
10:05 PM

Benefit
traceability
fraud detection
compliance

## 8.25 Real Production Story — Unauthorized Access
Problem:
employee access level bypass করা হয়েছিল
Cause:
missing role validation in API layer
Fix:
centralized RBAC middleware
gateway-level authorization

Result:
security restored
access fully controlled

## 8.26 Security Monitoring
Track:
login attempts
failed login
API abuse
unusual traffic

## 8.27 Common Mistakes

Mistake 1 — Only Frontend Security
Backend bypass possible

Mistake 2 — Weak Password Policy
Easy brute force

Mistake 3 — No Token Expiry
Stolen token forever valid

Mistake 4 — No Role Validation
Unauthorized access

Mistake 5 — No Audit Logs
No traceability

## 8.28 Enterprise Security Checklist
JWT/OAuth
RBAC
HTTPS
Encryption
Rate limiting
Input validation
Logging
Monitoring
API Gateway security

## 8.29 Interview Perspective
Common questions:
Authentication vs Authorization
JWT কী?
OAuth কীভাবে কাজ করে?
RBAC কী?
SQL injection কী?
XSS কী?
CSRF কী?

## 8.30 Mini Design Exercise
Design:
“Banking Security System”
Consider:
login security
transaction security
audit logs
fraud detection
multi-factor authentication
encryption strategy

## 8.31 Chapter Summary
এই chapter এ আমরা শিখলাম:
Authentication vs Authorization
JWT architecture
OAuth system
RBAC design
Encryption &amp; hashing
API security layers
SQL injection prevention
XSS &amp; CSRF protection
Distributed system security
Zero trust architecture
Audit logging
Enterprise security mindset
