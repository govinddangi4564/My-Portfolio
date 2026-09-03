import {
  Brain,
  FlaskConical,
  ShoppingCart,
  Ship,
  Globe,
  HeartPulse,
  Database,
  Layers,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export const projects = [
  {
    id: 1,
    name: "PathLab Manager",
    shortName: "PathLab",
    color: "#f43f5e",
    bgImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    icon: (
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <FlaskConical size={32} className="text-accent3" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "Full-stack pathology lab management system with role-based access, OTP-based 2FA authentication, online appointment booking, digital reports, and real-time admin analytics dashboard.",
    metrics: [
      { num: "2FA", label: "Auth" },
      { num: "ACID", label: "DB Design" },
    ],
    tags: [
      "Java",
      "Java Web Application",
      "JSP",
      "Jakarta Servlet API",
      "MySQL",
      "Database Driven Application",
      "Full Stack Project",
    ],
    github: "https://github.com/govinddangi4564/PathologyLab-Management-System",
    live: "https://pathology-lab-java.onrender.com/",
  },
  {
    id: 2,
    name: "HireDrift — Resume Screening with NLP",
    shortName: "HireDrift",
    color: "#22d3ee",
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    icon: (
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Brain size={32} className="text-accent2" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "An NLP-based resume screening system for automated candidate shortlisting using Sentence-BERT semantic matching. Improved screening accuracy to ~85% and reduced processing time by ~80%. Built as a team of 4 — I led the frontend.",
    metrics: [
      { num: "85%", label: "Accuracy" },
      { num: "80%", label: "Faster" },
      { num: "4", label: "Team Size" },
    ],
    tags: [
      "Python",
      "FastAPI",
      "Machine Learning",
      "Sentence-BERT",
      "PostgreSQL",
      "HTML/CSS",
      "JavaScript Developer",
      "End to End Web Developer",
    ],
    github: "https://github.com/govinddangi4564/HireDrift",
    live: "https://www.hiredrift.in",
  },
  {
    id: 3,
    name: "Logistics & Shipment Tracker AI",
    shortName: "ShipTrack AI",
    color: "#38bdf8",
    bgImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    icon: (
      <motion.div
        animate={{ rotate: [-6, 6, -6], y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Ship size={32} className="text-accent" />
      </motion.div>
    ),
    status: "wip",
    featured: false,
    description:
      "A full-stack AI-powered logistics platform. Input a route and receive instant AI-generated shipment analysis: risk scoring, cost estimation, multi-modal freight comparison (Air, Ocean, Road), and delivery time predictions — all powered by Google Gemini.",
    metrics: [
      { num: "3", label: "Freight Modes" },
      { num: "AI", label: "Risk Scoring" },
      { num: "REST", label: "API Design" },
    ],
    tags: [
      "React Developer",
      "Node.js",
      "Express",
      "Google Gemini AI",
      "REST API Developer",
      "Backend API Developer",
    ],
    github: "https://github.com/govinddangi4564/DELAYSHIELD-AI",
    live: "https://delayshield-ai.vercel.app/",
  },
  {
    id: 4,
    name: "E-Commerce System",
    shortName: "E-Commerce",
    color: "#10b981",
    bgImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    icon: (
      <motion.div
        animate={{ x: [0, 4, -4, 0], y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShoppingCart size={32} className="text-accent" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "Shopkeeper-oriented e-commerce system for managing customers, products, orders, and reports. MVC architecture with DAO pattern, CRUD operations, category-wise product handling, and report generation.",
    metrics: [
      { num: "MVC", label: "Architecture" },
      { num: "DAO", label: "Pattern" },
    ],
    tags: [
      "Java Developer",
      "JDBC",
      "Servlets",
      "JSP",
      "MySQL Developer",
      "Database Management Systems",
    ],
    github: "https://github.com/govinddangi4564/Ecommerce-Management-System",
    live: "#",
  },
  {
    id: 5,
    name: "E-Commerce DAL — Spring Boot",
    shortName: "Spring DAL",
    color: "#6DB33F",
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    icon: (
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Layers size={32} className="text-emerald-400" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "Enterprise-grade Data Access Layer (DAL) designed with Spring Boot, Spring Data JPA, and Hibernate. Features repository abstractions, custom transactional boundaries, entity relationship mappings, and high-performance querying.",
    metrics: [
      { num: "Spring", label: "Boot JPA" },
      { num: "DAL", label: "Architecture" },
      { num: "ACID", label: "Transactions" },
    ],
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "REST API",
      "Backend Architecture",
    ],
    github: "https://github.com/govinddangi4564/Ecommerce-DAL-SpringBoot",
    live: "#",
  },
  {
    id: 6,
    name: "E-Commerce DAL — Hibernate ORM",
    shortName: "Hibernate DAL",
    color: "#59666C",
    bgImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    icon: (
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Database size={32} className="text-accent2" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "Robust Data Access Layer implemented with native Hibernate ORM & SessionFactory architecture. Implements HQL queries, caching layers, Criteria API queries, and ACID-compliant transaction lifecycle management.",
    metrics: [
      { num: "ORM", label: "Hibernate" },
      { num: "HQL", label: "Queries" },
      { num: "ACID", label: "Transactions" },
    ],
    tags: [
      "Java",
      "Hibernate ORM",
      "HQL",
      "MySQL",
      "JDBC",
      "Data Persistence",
      "Backend Architecture",
    ],
    github: "https://github.com/govinddangi4564/Ecommerce-DAL-Hibernate",
    live: "#",
  },
  {
    id: 7,
    name: "JWT Security & Stateless Auth Engine",
    shortName: "JWT Auth",
    color: "#e4e4e7",
    bgImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    icon: (
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lock size={32} className="text-accent" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "Stateless token-based authentication and authorization engine built with JSON Web Tokens (JWT) and Spring Security / Java. Implements cryptographic token signing, expiration handling, claims parsing, and role-based route guard filters.",
    metrics: [
      { num: "JWT", label: "Tokens" },
      { num: "RBAC", label: "Security" },
      { num: "Stateless", label: "Auth" },
    ],
    tags: [
      "Java",
      "JWT",
      "Spring Security",
      "Authentication",
      "Cryptography",
      "REST API Security",
      "Token Auth",
    ],
    github: "https://github.com/govinddangi4564/JWT-Work",
    live: "#",
  },
  {
    id: 8,
    name: "ClimateAct - Gamified Eco Platform",
    shortName: "ClimateAct",
    color: "#22d3ee",
    bgImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    icon: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <Globe size={32} className="text-accent2" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "A premium, highly interactive full-stack web application dedicated to climate awareness, gamified carbon footprint tracking, and community eco-challenges. Features a Live Earth Vitals Dashboard, 1.5°C Climate Clock, and an Eco-Rewards Marketplace.",
    metrics: [
      { num: "Live", label: "Earth Vitals" },
      { num: "XP", label: "Gamified Tracking" },
    ],
    tags: [
      "React",
      "Express",
      "Node.js",
      "MySQL",
      "Sequelize ORM",
      "Tailwind CSS",
    ],
    github: "https://github.com/govinddangi4564/climateact",
    live: "https://climate-change-prediction.vercel.app",
  },
  {
    id: 9,
    name: "LifeLine AI - Patient Side Module",
    shortName: "LifeLine AI",
    color: "#f43f5e",
    bgImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
    icon: (
      <motion.div
        animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <HeartPulse size={32} className="text-accent" />
      </motion.div>
    ),
    status: "complete",
    featured: false,
    description:
      "Production-ready patient experience for AI-assisted emergency triage and hospital routing. Features symptom/voice input, report upload, AI triage analysis, and hospital recommendations with maps.",
    metrics: [
      { num: "AI", label: "Triage" },
      { num: "Maps", label: "Routing" },
      { num: "Voice", label: "Input" },
    ],
    tags: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini API",
      "Google Maps API",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
    github: "https://github.com/govinddangi4564/MediRoute_AI",
    live: "https://medi-route-ai-frontend.vercel.app/",
  },
];


