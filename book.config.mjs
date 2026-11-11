// Single source of truth for the book's metadata and reading order.
// Every manuscript path is relative to ./manuscript
export default {
  title: 'Practical System Design',
  titleSuffix: 'in Bangla',
  titleBn: 'প্র্যাকটিক্যাল সিস্টেম ডিজাইন',
  subtitle:
    'Scalable Software Architecture, Microservices, Database Scaling, Caching, DevOps, AI ও Real Production Experience',
  tagline: 'বাস্তব প্রজেক্ট · বাস্তব সমস্যা · বাস্তব সমাধান',
  author: 'Md. Sajidur Rahman',
  edition: 'First Edition',
  editionBn: 'প্রথম সংস্করণ',
  year: 2026,
  publishedIn: 'Published in Bangladesh',
  lang: 'bn',
  description:
    'বাংলাভাষী সফটওয়্যার ইঞ্জিনিয়ার, টিম লিড ও আর্কিটেক্টদের জন্য বাস্তব প্রজেক্ট, production incident, AI-যুগের আর্কিটেকচার এবং মানুষের গল্পের মধ্য দিয়ে System Design শেখার একটি পূর্ণাঙ্গ বই।',
  backCover: [
    'রাত দুইটায় production down। CPU 100%। ক্লায়েন্ট ফোন করছেন। আপনি কী করবেন?',
    'এই বই আপনাকে সেই মুহূর্তের জন্য প্রস্তুত করে। এখানে System Design শেখানো হয়েছে মানুষের গল্প দিয়ে: একজন junior developer, একজন অভিজ্ঞ architect, একজন on-call SRE আর একটি টিম, যারা একটি ছোট admission portal থেকে লাখো ব্যবহারকারীর platform তৈরি করতে গিয়ে একের পর এক বাস্তব সমস্যার মুখোমুখি হয়।',
    'Database scaling, caching, API design, security, microservices, message queue, observability, Kubernetes, CI/CD থেকে শুরু করে LLM, RAG, AI agent এবং Responsible AI পর্যন্ত: প্রতিটি অধ্যায়ে আছে পরিষ্কার diagram, বাস্তব incident, ভুল থেকে শেখা, এবং interview প্রস্তুতি।',
  ],
  front: [
    '00-front/01-copyright.md',
    '00-front/02-dedication.md',
    '00-front/03-preface.md',
    '00-front/04-how-to-read.md',
    '00-front/05-meet-the-team.md',
  ],
  parts: [
    {
      number: 1,
      bn: 'ভিত্তি',
      title: 'Foundations',
      blurb: 'System Design কী, কেন দরকার, requirement কীভাবে বুঝতে হয়, আর scalability, availability ও CAP-এর মতো মূল ধারণাগুলো।',
      chapters: [
        'part-1-foundation/ch01-system-design-introduction.md',
        'part-1-foundation/ch02-requirements-capacity-planning.md',
        'part-1-foundation/ch03-core-architecture-concepts.md',
      ],
    },
    {
      number: 2,
      bn: 'ডেটা ও স্টোরেজ',
      title: 'Data & Storage',
      blurb: 'যেকোনো system-এর হৃদয় হলো ডেটা। Database design, indexing, sharding, replication, CQRS এবং caching।',
      chapters: [
        'part-2-data/ch04-database-design-fundamentals.md',
        'part-2-data/ch05-database-scaling.md',
        'part-2-data/ch06-caching.md',
      ],
    },
    {
      number: 3,
      bn: 'Backend ও Distributed System',
      title: 'Backend & Distributed Systems',
      blurb: 'API থেকে microservices, security থেকে message queue, load balancing থেকে observability: বড় system চালানোর সব কলকবজা।',
      chapters: [
        'part-3-backend/ch07-api-design.md',
        'part-3-backend/ch08-security.md',
        'part-3-backend/ch09-load-balancing-high-availability.md',
        'part-3-backend/ch10-microservices.md',
        'part-3-backend/ch11-message-queue-event-streaming.md',
        'part-3-backend/ch12-observability.md',
      ],
    },
    {
      number: 4,
      bn: 'Platform ও Delivery',
      title: 'Platform & Delivery',
      blurb: 'Container, Kubernetes, CI/CD এবং নিরাপদ deployment: code কীভাবে নির্ভয়ে production-এ পৌঁছায়।',
      chapters: ['part-4-platform/ch13-docker-kubernetes.md', 'part-4-platform/ch14-cicd.md'],
    },
    {
      number: 5,
      bn: 'AI যুগের System Design',
      title: 'System Design in the AI Era',
      blurb: 'LLM application, RAG, vector database, AI agent, MLOps, Responsible AI, আর AI-কে সহকর্মী বানিয়ে একজন architect কীভাবে কাজ করবেন।',
      chapters: [
        'part-5-ai/ch15-llm-application-architecture.md',
        'part-5-ai/ch16-ai-agents-mlops-responsible-ai.md',
        'part-5-ai/ch17-architect-in-ai-era.md',
      ],
    },
    {
      number: 6,
      bn: 'Enterprise System',
      title: 'Enterprise Systems',
      blurb: 'ERP ও Fintech: যেখানে একটি ভুল মানে কোটি টাকার ক্ষতি, আর consistency, audit ও security সবার আগে।',
      chapters: [
        'part-6-enterprise/ch18-erp-system-design.md',
        'part-6-enterprise/ch19-fintech-system-design.md',
      ],
    },
    {
      number: 7,
      bn: 'বাস্তব কেস স্টাডি',
      title: 'Real-World Case Studies',
      blurb: 'Netflix, Amazon, Uber, News Feed, Chat, Video Streaming, আর শেষে বইয়ের শুরুর Admission Portal-কে নতুন করে design করা।',
      chapters: [
        'part-7-case-studies/ch20-big-tech-case-studies.md',
        'part-7-case-studies/ch21-news-feed.md',
        'part-7-case-studies/ch22-chat-system.md',
        'part-7-case-studies/ch23-video-streaming.md',
        'part-7-case-studies/ch24-capstone-admission-portal.md',
      ],
    },
    {
      number: 8,
      bn: 'Interview ও Career',
      title: 'Interview & Career',
      blurb: 'System Design interview-এর framework, estimation, trade-off আলোচনা এবং senior engineer-এর মতো চিন্তা করার কৌশল।',
      chapters: ['part-8-interview/ch25-interview-mastery.md'],
    },
  ],
  back: [
    '99-back/appendix-a-interview-qa.md',
    '99-back/appendix-b-architect-toolkit.md',
    '99-back/appendix-c-glossary.md',
    '99-back/appendix-d-references.md',
  ],
};
