import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiBootstrap,
  SiThreedotjs,
  SiSpringboot,
  SiMysql,
  SiDocker,
  SiPostman,
  SiPython,
  SiGithub,
  SiCplusplus,
  SiApachetomcat,
  SiHibernate,
} from "react-icons/si";
import { FaJava, FaDatabase, FaCode } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export const skillTabs = {
  frontend: [
    { name: "HTML", icon: <SiHtml5 className="text-[#E34F26]" />, level: 88 },
    { name: "CSS", icon: <SiCss className="text-[#1572B6]" />, level: 85 },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-[#F7DF1E] bg-black" />,
      level: 82,
    },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" />, level: 70 },
    {
      name: "Bootstrap",
      icon: <SiBootstrap className="text-[#7952B3]" />,
      level: 80,
    },
    {
      name: "Three.js",
      icon: <SiThreedotjs className="text-text" />,
      level: 60,
    },
  ],
  backend: [
    { name: "Java", icon: <FaJava className="text-[#007396]" />, level: 85 },
    {
      name: "Spring Boot",
      icon: <SiSpringboot className="text-[#6DB33F]" />,
      level: 65,
    },
    {
      name: "JSP/Servlet",
      icon: <SiApachetomcat className="text-[#F8DC75]" />,
      level: 80,
    },
    {
      name: "Hibernate",
      icon: <SiHibernate className="text-[#59666C]" />,
      level: 70,
    },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" />, level: 82 },
    { name: "REST API", icon: <TbApi className="text-accent2" />, level: 80 },
  ],
  core: [
    { name: "Data Structures", icon: <FaCode className="text-accent" />, level: 80 },
    { name: "OOP", icon: <FaJava className="text-[#007396]" />, level: 85 },
    { name: "Problem Solving", icon: <TbApi className="text-[#FF6C37]" />, level: 80 },
    { name: "Database Mgmt", icon: <FaDatabase className="text-[#4479A1]" />, level: 80 },
  ],
  tools: [
    {
      name: "Git/GitHub",
      icon: <SiGithub className="text-text" />,
      level: 85,
    },
    {
      name: "Docker",
      icon: <SiDocker className="text-[#2496ED]" />,
      level: 55,
    },
    {
      name: "Postman",
      icon: <SiPostman className="text-[#FF6C37]" />,
      level: 80,
    },
    {
      name: "Python",
      icon: <SiPython className="text-[#3776AB]" />,
      level: 55,
    },
    {
      name: "C/C++",
      icon: <SiCplusplus className="text-[#00599C]" />,
      level: 70,
    },
    {
      name: "VS Code",
      icon: <VscVscode className="text-[#007ACC]" />,
      level: 88,
    },
  ],
};
