---
letter: D
title: References & Further Reading
bn: তথ্যসূত্র ও আরো পড়ুন
subtitle: বইয়ে উল্লেখিত বাস্তব ঘটনা, গবেষণা, বই ও standard-এর উৎস
---

বইয়ের বাস্তব ঘটনাগুলো (CASE বাক্স) সংশ্লিষ্ট প্রতিষ্ঠানের প্রকাশিত postmortem, engineering blog, আদালতের রায়, সরকারি তদন্ত প্রতিবেদন এবং নির্ভরযোগ্য সংবাদমাধ্যমের ভিত্তিতে সংক্ষেপে লেখা। বিস্তারিত ও সর্বশেষ তথ্যের জন্য মূল উৎস দেখুন। Web link সময়ের সাথে বদলাতে পারে; শিরোনাম দিয়ে খুঁজলে সাধারণত পাওয়া যায়।

## D.1 বই

**System Design ও Architecture**
- Martin Kleppmann. *Designing Data-Intensive Applications*. O'Reilly, 2017. (Data system-এর জন্য সবচেয়ে প্রভাবশালী বই; অধ্যায় ৩-৫, ১১)
- Alex Xu. *System Design Interview: An Insider's Guide*, Vol. 1 ও Vol. 2 (Sahn Lam-এর সাথে)। ByteByteGo. (অধ্যায় ২৫)
- Alan Dennis, Barbara Haley Wixom, Roberta M. Roth. *Systems Analysis and Design*, 5th ed. Wiley, 2012. (Requirement ও SDLC; অধ্যায় ১-২)
- Sam Newman. *Building Microservices*, 2nd ed. O'Reilly, 2021. (অধ্যায় ১০)
- Eric Evans. *Domain-Driven Design*. Addison-Wesley, 2003. (অধ্যায় ১০)
- Michael T. Nygard. *Release It!*, 2nd ed. Pragmatic Bookshelf, 2018. (Circuit breaker, bulkhead; অধ্যায় ৯-১০)
- Alex Petrov. *Database Internals*. O'Reilly, 2019. (অধ্যায় ৪-৫)
- Matthew Skelton, Manuel Pais. *Team Topologies*. IT Revolution, 2019. (Conway's Law; অধ্যায় ১০)

**Reliability, Operations ও Delivery**
- Betsy Beyer et al. (eds.). *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly, 2016. অনলাইনে বিনামূল্যে: https://sre.google/books/ (অধ্যায় ১২)
- Nicole Forsgren, Jez Humble, Gene Kim. *Accelerate*. IT Revolution, 2018. (DORA metric; অধ্যায় ১৪)
- Jez Humble, David Farley. *Continuous Delivery*. Addison-Wesley, 2010. (অধ্যায় ১৪)

**AI ও Machine Learning System**
- Chip Huyen. *Designing Machine Learning Systems*. O'Reilly, 2022. (অধ্যায় ১৬)
- Chip Huyen. *AI Engineering*. O'Reilly, 2025. (অধ্যায় ১৫-১৬)

## D.2 গবেষণাপত্র

- G. DeCandia et al. "Dynamo: Amazon's Highly Available Key-value Store." *SOSP*, 2007. (অধ্যায় ২০)
- R. Nishtala et al. "Scaling Memcache at Facebook." *NSDI*, 2013. (অধ্যায় ৬)
- C. A. Gomez-Uribe, N. Hunt. "The Netflix Recommender System: Algorithms, Business Value, and Innovation." *ACM Transactions on Management Information Systems*, 2015. (অধ্যায় ২০)
- A. Verma et al. "Large-scale cluster management at Google with Borg." *EuroSys*, 2015. (Kubernetes-এর পূর্বসূরি; অধ্যায় ১৩)
- S. Peng et al. "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot." arXiv:2302.06590, 2023. (অধ্যায় ১৭)
- METR. "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." arXiv:2507.09089, 2025. (অধ্যায় ১৭)
- P. Lewis et al. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks." *NeurIPS*, 2020. (RAG-এর মূল গবেষণা; অধ্যায় ১৫)

## D.3 বাস্তব ঘটনা ও Postmortem (অধ্যায় অনুযায়ী)

| অধ্যায় | ঘটনা | উৎস |
| --- | --- | --- |
| ১ | Healthcare.gov launch, ২০১৩ | U.S. GAO-এর প্রতিবেদন; Steven Brill, "Obama's Trauma Team," *Time*, ২০১৪ |
| ২ | Pokémon GO launch traffic, ২০১৬ | Google Cloud Blog, "Bringing Pokémon GO to life on Google Cloud," ২০১৬ |
| ৩ | GitHub network partition, অক্টোবর ২০১৮ | GitHub Blog, "October 21 post-incident analysis," ২০১৮: https://github.blog/2018-10-30-oct21-post-incident-analysis/ |
| ৩ | Stack Overflow architecture | Nick Craver, "Stack Overflow: The Architecture – 2016 Edition" |
| ৪ | GitLab database deletion, জানুয়ারি ২০১৭ | GitLab Blog, "Postmortem of database outage of January 31," ২০১৭ |
| ৫ | Notion Postgres sharding, ২০২১ | Notion Blog, "Herding elephants: Lessons learned from sharding Postgres at Notion," ২০২১ |
| ৭ | Stripe idempotency key | Stripe API documentation ও Stripe Engineering Blog, "Designing robust and predictable APIs with idempotency" |
| ৮ | Equifax breach, ২০১৭ | U.S. House Committee on Oversight and Government Reform, "The Equifax Data Breach," December 2018 |
| ৮ | Samsung ও generative AI, ২০২৩ | Bloomberg ও অন্যান্য সংবাদমাধ্যমের প্রতিবেদন, মে ২০২৩ |
| ৯ | AWS S3 outage, ফেব্রুয়ারি ২০১৭ | AWS, "Summary of the Amazon S3 Service Disruption in the Northern Virginia (US-EAST-1) Region": https://aws.amazon.com/message/41926/ |
| ৯ | Facebook outage, অক্টোবর ২০২১ | Engineering at Meta, "More details about the October 4 outage," ২০২১ |
| ১০ | Amazon API mandate | Steve Yegge, "Stevey's Google Platforms Rant," ২০১১ |
| ১০ | Segment microservices | Segment Engineering, "Goodbye Microservices: From 100s of problem children to 1 superstar," ২০১৮ |
| ১০ | Prime Video monitoring service | Prime Video Tech Blog, "Scaling up the Prime Video audio/video monitoring service and reducing costs by 90%," ২০২৩ |
| ১১ | Kafka-র জন্ম | Jay Kreps, "The Log: What every software engineer should know about real-time data's unifying abstraction," LinkedIn Engineering, ২০১৩ |
| ১২ | Blameless postmortem | John Allspaw, "Blameless PostMortems and a Just Culture," Etsy Code as Craft, ২০১২ |
| ১৩ | OpenAI outage, ডিসেম্বর ২০২৪ | OpenAI status page incident report, ১১ ডিসেম্বর ২০২৪ |
| ১৪ | Knight Capital, আগস্ট ২০১২ | U.S. SEC, Knight Capital Americas LLC সংক্রান্ত administrative proceeding ও press release, ২০১৩ |
| ১৪ | CrowdStrike, জুলাই ২০২৪ | CrowdStrike, Preliminary Post Incident Review ও Root Cause Analysis, ২০২৪; Microsoft-এর প্রকাশিত প্রভাবের হিসাব |
| ১৪ | Cloudflare outage, জুলাই ২০১৯ | Cloudflare Blog, "Details of the Cloudflare outage on July 2, 2019" |
| ১৫ | Air Canada chatbot | *Moffatt v. Air Canada*, 2024 BCCRT 149 (British Columbia Civil Resolution Tribunal) |
| ১৬ | Replit agent incident, জুলাই ২০২৫ | Jason Lemkin-এর প্রকাশ্য পোস্ট; Replit CEO-র বিবৃতি; *Fortune* ও অন্যান্য প্রতিবেদন, জুলাই ২০২৫ |
| ১৬ | Klarna AI assistant | Klarna press release, ফেব্রুয়ারি ২০২৪; Bloomberg ও অন্যান্য প্রতিবেদন, মে ২০২৫ |
| ১৬ | Lethal trifecta | Simon Willison, "The lethal trifecta for AI agents," ২০২৫ |
| ১৭ | Mata v. Avianca | *Mata v. Avianca, Inc.*, No. 22-cv-1461 (S.D.N.Y. 2023) |
| ১৮ | Lidl SAP প্রকল্প | *Handelsblatt* ও অন্যান্য জার্মান সংবাদমাধ্যমের প্রতিবেদন, ২০১৮ |
| ১৯ | Bangladesh Bank heist, ২০১৬ | Reuters, BBC ও অন্যান্য সংবাদমাধ্যমের অনুসন্ধানী প্রতিবেদন; বাংলাদেশ সরকারের তদন্ত কমিটির প্রকাশ্য তথ্য |
| ২০ | Netflix Open Connect, Chaos Monkey | Netflix Tech Blog; Open Connect overview (openconnect.netflix.com) |
| ২০ | Uber H3 | Uber Engineering, "H3: Uber's Hexagonal Hierarchical Spatial Index," ২০১৮ |
| ২১ | Twitter timeline | Raffi Krikorian, "Timelines at Scale," QCon San Francisco, ২০১২ |
| ২২ | WhatsApp connection | WhatsApp Blog, "1 million is so 2011," ২০১২ |
| ২২ | Discord message storage | Discord Blog, "How Discord Stores Trillions of Messages," ২০২৩ |
| ২২ | WhatsApp end-to-end encryption | WhatsApp Encryption Overview (technical white paper) |
| ২৩ | Netflix per-title encoding | Netflix Tech Blog, "Per-Title Encode Optimization," ২০১৫ |
| ২৩ | YouTube ও Vitess | Vitess project documentation ও ইতিহাস (vitess.io) |

## D.4 Standard ও Specification

| বিষয় | Standard |
| --- | --- |
| HTTP | RFC 9110 (HTTP Semantics) |
| API error | RFC 9457 (Problem Details for HTTP APIs) |
| JWT | RFC 7519 |
| OAuth 2.0 / PKCE | RFC 6749 / RFC 7636; OAuth 2.0 Security Best Current Practice |
| OpenID Connect | OpenID Connect Core 1.0 |
| Trace context | W3C Trace Context |
| Observability | OpenTelemetry specification (opentelemetry.io) |
| API নিরাপত্তা | OWASP API Security Top 10 (2023) |
| Web নিরাপত্তা | OWASP Top 10 |
| Card data | PCI DSS |
| AI নিয়ন্ত্রণ | Regulation (EU) 2024/1689 (EU AI Act) |
| AI tool সংযোগ | Model Context Protocol specification (modelcontextprotocol.io) |
| Streaming | HLS (RFC 8216), MPEG-DASH (ISO/IEC 23009-1) |

## D.5 নিয়মিত পড়ার মতো Engineering Blog

- Netflix Tech Blog · Uber Engineering · Meta Engineering · Discord Blog · Cloudflare Blog
- AWS Architecture Blog ও Amazon Builders' Library
- Google SRE resources (sre.google)
- Microsoft Azure Architecture Center (Cloud Design Patterns)
- Martin Fowler-এর website (martinfowler.com): pattern ও architecture প্রবন্ধ
- ByteByteGo newsletter
- বিভিন্ন প্রতিষ্ঠানের public postmortem সংগ্রহ (যেমন GitHub-এ "awesome postmortems" ধরনের তালিকা)

## D.6 বাংলাদেশের প্রেক্ষাপটে

এই বইয়ের নদী টেকের গল্পগুলো কাল্পনিক, কিন্তু বাংলাদেশের software industry-র বাস্তব অভিজ্ঞতা থেকে অনুপ্রাণিত: পাবলিক পরীক্ষার ফল প্রকাশ, ঈদের আগের e-commerce ও বেতন, mobile financial service, microfinance, গার্মেন্টস শিল্পের ERP। দেশের প্রতিষ্ঠানগুলোর engineering blog, tech conference-এর talk এবং community-র অভিজ্ঞতা বিনিময় (meetup, online group) এই জ্ঞানের সবচেয়ে মূল্যবান উৎস। আপনার নিজের team-এর postmortem লিখুন এবং, সম্ভব হলে, community-র সাথে ভাগ করুন। পরের প্রজন্মের engineer-রা সেখান থেকেই শিখবেন।
