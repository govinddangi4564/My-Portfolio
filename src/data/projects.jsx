import { Brain, FlaskConical, ShoppingCart, Ship } from "lucide-react";

export const projects = [
  {
    id: 1,
    name: "Logistics & Shipment Tracker AI",
    shortName: "ShipTrack AI",
    icon: <Ship size={32} className="text-accent" />,
    status: "wip",
    featured: false,
    description:
      "A full-stack AI-powered logistics platform. Input a route and receive instant AI-generated shipment analysis: risk scoring, cost estimation, multi-modal freight comparison (Air, Ocean, Road), and delivery time predictions — all powered by Google Gemini.",
    metrics: [
      { num: "3", label: "Freight Modes" },
      { num: "AI", label: "Risk Scoring" },
      { num: "REST", label: "API Design" },
    ],
    tags: ["React", "Node.js", "Express", "Google Gemini AI", "REST API"],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    name: "HireDrift — Resume Screening with NLP",
    shortName: "HireDrift",
    icon: <Brain size={32} className="text-accent2" />,
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
      "SpaCy",
      "Sentence-BERT",
      "PostgreSQL",
      "HTML/CSS",
      "JavaScript",
    ],
    github: "https://github.com/govinddangi4564",
    live: "#",
  },
  {
    id: 3,
    name: "PathLab Manager",
    icon: <FlaskConical size={32} className="text-accent3" />,
    status: "complete",
    featured: false,
    description:
      "Full-stack pathology lab management system with role-based access, OTP-based 2FA authentication, online appointment booking, digital reports, and real-time admin analytics dashboard.",
    metrics: [
      { num: "2FA", label: "Auth" },
      { num: "ACID", label: "DB Design" },
    ],
    tags: ["Java", "JSP", "Jakarta Servlet API", "MySQL", "BCrypt", "Maven"],
    github: "https://github.com/govinddangi4564",
    live: "#",
  },
  {
    id: 4,
    name: "E-Commerce System",
    icon: <ShoppingCart size={32} className="text-accent" />,
    status: "complete",
    featured: false,
    description:
      "Shopkeeper-oriented e-commerce system for managing customers, products, orders, and reports. MVC architecture with DAO pattern, CRUD operations, category-wise product handling, and report generation.",
    metrics: [
      { num: "MVC", label: "Architecture" },
      { num: "DAO", label: "Pattern" },
    ],
    tags: ["Java", "JDBC", "Servlets", "JSP", "MySQL", "Git"],
    github: "https://github.com/govinddangi4564",
    live: "#",
  },
];
