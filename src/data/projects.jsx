import {
  Brain,
  FlaskConical,
  ShoppingCart,
  Ship,
  Globe,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";

export const projects = [
  {
    id: 1,
    name: "PathLab Manager",
    shortName: "PathLab",
    color: "#f43f5e",
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
    live: "#",
  },
  {
    id: 3,
    name: "Logistics & Shipment Tracker AI",
    shortName: "ShipTrack AI",
    color: "#8b5cf6",
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
    name: "ClimateAct - Gamified Eco Platform",
    shortName: "ClimateAct",
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
    id: 6,
    name: "LifeLine AI - Patient Side Module",
    shortName: "LifeLine AI",
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
