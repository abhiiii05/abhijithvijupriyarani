export type Metric = {
  value: string;
  label: string;
};

export type Proof = {
  id: string;
  year: string;
  period: string;
  kind: "Experience" | "Client contract";
  title: string;
  organisation: string;
  role: string;
  location: string;
  stack: readonly string[];
  outcome: string;
  summary: string;
  bullets: readonly string[];
  metrics: readonly Metric[];
};

export type Project = {
  id: string;
  year: string;
  date: string;
  title: string;
  stack: readonly string[];
  outcome: string;
  summary: string;
  bullets: readonly string[];
  metrics: readonly Metric[];
};

export type Experience = {
  id: string;
  organisation: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: readonly string[];
};

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export type Achievement = {
  text: string;
  detail: string;
};

export type Leadership = {
  role: string;
  organisation: string;
  year: string;
  detail: string;
};

export type Content = {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  availability: string;
  email: string;
  phone: string;
  github: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  };
  proof: readonly Proof[];
  experience: readonly Experience[];
  projects: readonly Project[];
  skills: readonly SkillGroup[];
  achievements: readonly Achievement[];
  leadership: readonly Leadership[];
  microcopy: {
    proofLead: string;
    projectsLead: string;
    aboutLead: string;
    contactLead: string;
    footerNote: string;
  };
};

export const content: Content = {
  name: "Abhijith Viju Priya Rani",
  shortName: "Abhijith Viju",
  title: "Backend Engineer | Distributed Systems & Cloud-Native Infrastructure",
  tagline:
    "Backend engineer working on distributed systems and cloud-native infrastructure.",
  availability:
    "Open to backend engineering roles and freelance backend work.",
  email: "abhijithviju2005@gmail.com",
  phone: "+91 8281800297",
  github: "https://github.com/abhiiii05",
  education: {
    degree: "B.Tech Computer Science and Engineering",
    institution: "Indian Institute of Information Technology Vadodara",
    period: "Aug 2023 – May 2027",
  },
  proof: [
    {
      id: "wipro",
      year: "2026",
      period: "May – Jul 2026",
      kind: "Experience",
      title: "Wipro — four services out of the monolith",
      organisation: "Wipro",
      role: "Backend Engineering Intern",
      location: "Hyderabad, India",
      stack: ["Service migration", "Functional parity", "Regression testing"],
      outcome:
        "Migrated 4 core backend services with full functional parity and caught 3 critical defects before launch.",
      summary:
        "Moved four core services off a legacy monolith, closed the data-integrity gaps the migration exposed, and validated every module against a 40+ case regression suite with senior engineers.",
      bullets: [
        "Migrated 4 core backend services from a legacy monolith to a modernised architecture with full functional parity.",
        "Refactored components to close data-integrity gaps found during migration.",
        "Validated migrated modules against a regression suite of 40+ test cases with senior engineers, catching 3 critical defects before launch.",
      ],
      metrics: [
        { value: "4", label: "core services migrated" },
        { value: "40+", label: "regression test cases" },
        { value: "3", label: "critical defects caught" },
      ],
    },
    {
      id: "vasco",
      year: "2026",
      period: "Jun 2026 – Present",
      kind: "Client contract",
      title: "Vasco Foods — production e-commerce",
      organisation: "Vasco Foods",
      role: "Production e-commerce backend",
      location: "via PiixelTheory",
      stack: ["Razorpay", "Shiprocket", "E-commerce backend"],
      outcome:
        "Live at vascofoods.in with Razorpay payments and Shiprocket courier logistics.",
      summary:
        "Built through PiixelTheory, a freelance web studio co-founded with a partner. Own backend architecture and integrations; the partner leads frontend and design.",
      bullets: [
        "Built the production e-commerce backend for Vasco Foods (vascofoods.in) with Razorpay payments and Shiprocket courier logistics.",
      ],
      metrics: [],
    },
    {
      id: "solarium",
      year: "2026",
      period: "Multi-year contract",
      kind: "Client contract",
      title: "Solarium Green Energy — multi-year contract",
      organisation: "Solarium Green Energy",
      role: "Website rebuild & solar e-commerce",
      location: "via PiixelTheory",
      stack: ["Website rebuild", "Solar e-commerce"],
      outcome:
        "Multi-year contract covering a full website rebuild and a new e-commerce vertical for solar panel sales.",
      summary:
        "Signed a BSE-listed solar EPC firm to a multi-year contract through PiixelTheory: a full website rebuild plus a new e-commerce vertical for solar panel sales.",
      bullets: [
        "Signed Solarium Green Energy, a BSE-listed solar EPC firm, on a multi-year contract: full website rebuild plus a new e-commerce vertical for solar panel sales.",
      ],
      metrics: [],
    },
  ],
  experience: [
    {
      id: "piixeltheory",
      organisation: "PiixelTheory",
      role: "Co-Founder & Backend Engineer",
      location: "Remote",
      period: "Jun 2026 – Present",
      summary:
        "Freelance web studio. Own backend architecture and integrations; a partner leads frontend and design.",
      bullets: [
        "Built the production e-commerce backend for Vasco Foods (vascofoods.in) with Razorpay payments and Shiprocket courier logistics.",
        "Signed Solarium Green Energy, a BSE-listed solar EPC firm, on a multi-year contract: full website rebuild plus a new e-commerce vertical for solar panel sales.",
      ],
    },
    {
      id: "wipro-role",
      organisation: "Wipro",
      role: "Backend Engineering Intern",
      location: "Hyderabad, India",
      period: "May – Jul 2026",
      summary:
        "Migration work on four core services, with data-integrity fixes and regression validation.",
      bullets: [
        "Migrated 4 core backend services from a legacy monolith to a modernised architecture with full functional parity.",
        "Refactored components to close data-integrity gaps found during migration.",
        "Validated migrated modules against a regression suite of 40+ test cases with senior engineers, catching 3 critical defects before launch.",
      ],
    },
  ],
  projects: [
    {
      id: "file-processing",
      year: "2026",
      date: "Mar 2026",
      title: "Scalable File Processing System",
      stack: [
        "Node.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Redis",
        "BullMQ",
        "Docker",
        "Azure Container Apps",
      ],
      outcome:
        "Queue-based backend handling 25+ concurrent upload jobs with no dropped tasks.",
      summary:
        "A Dockerized, queue-based file processing backend handling 25+ concurrent upload jobs with no dropped tasks.",
      bullets: [
        "Dockerized, queue-based file processing backend handling 25+ concurrent upload jobs with no dropped tasks.",
        "Fixed an Azure Container Apps / Redis networking incompatibility by deploying a Redis base image from Docker Hub.",
        "Designed idempotent job retry logic.",
        "Built a type-safe Drizzle schema with tracked migrations across dev, staging and production.",
      ],
      metrics: [
        { value: "25+", label: "concurrent upload jobs" },
        { value: "0", label: "dropped tasks" },
      ],
    },
    {
      id: "claude-code",
      year: "2026",
      date: "Apr 2026",
      title: "Claude Code: Autonomous Coding Agent",
      stack: ["TypeScript", "Node.js", "OpenRouter API"],
      outcome:
        "CLI coding agent with a ReAct-style loop and Read/Write/Bash tool-calling.",
      summary:
        "A CLI coding agent built for CodeCrafters that plans, executes and self-corrects across 15+ file operations per task.",
      bullets: [
        "CLI coding agent with a ReAct-style reasoning loop and Read/Write/Bash tool-calling.",
        "Plans, executes and self-corrects across 15+ file operations per task.",
        "Modular tool-registration system, so new tools need no change to the core loop.",
      ],
      metrics: [
        { value: "15+", label: "file operations per task" },
      ],
    },
    {
      id: "obelisk",
      year: "2025",
      date: "Jul 2025",
      title: "Obelisk: On-Chain Product Authenticity Platform",
      stack: ["Next.js", "IPFS (Pinata)", "Solidity", "Hardhat", "Ethers.js"],
      outcome:
        "Full-stack Web3 app verifying product authenticity on-chain with 50+ product entries.",
      summary:
        "A full-stack Web3 app for verifying product authenticity on-chain, with 50+ product entries recorded and sub-2-second lookup.",
      bullets: [
        "Full-stack Web3 app for verifying product authenticity on-chain, 50+ product entries recorded, sub-2-second lookup.",
        "Contracts tested locally with Hardhat before deployment.",
      ],
      metrics: [
        { value: "50+", label: "product entries recorded" },
      ],
    },
  ],
  skills: [
    {
      label: "Languages",
      items: ["Python", "Java", "C", "JavaScript", "TypeScript"],
    },
    {
      label: "Frameworks",
      items: ["Next.js", "React", "Node.js", "Express"],
    },
    {
      label: "Cloud/Infra",
      items: [
        "Azure (Container Apps, Blob Storage)",
        "Docker",
        "Redis",
        "BullMQ",
        "CI/CD",
      ],
    },
    {
      label: "Data",
      items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Supabase"],
    },
    {
      label: "Other",
      items: [
        "Solidity",
        "Hardhat",
        "Ethers.js",
        "IPFS (Pinata)",
        "REST APIs",
        "System Design",
      ],
    },
  ],
  achievements: [
    { text: "Certified by NASA", detail: "Kennedy Space Center, Orlando" },
    { text: "1st place, Web Development", detail: "Hack-IIITV 2023" },
    { text: "5th place, CTF", detail: "Tech Hunt 2024" },
    { text: "3rd place, Football", detail: "Inter IIIT 2023" },
    { text: "2nd place, Football", detail: "Concours 2024" },
  ],
  leadership: [
    {
      role: "Sports Committee Secretary",
      organisation: "IIIT Vadodara",
      year: "2025",
      detail:
        "Ran logistics for 100+ student athletes across 4 inter-college tournaments, including budget, scheduling and vendors.",
    },
    {
      role: "Technical Committee Core Member",
      organisation: "IIIT Vadodara",
      year: "2025",
      detail:
        "Planned and executed 3 technical events for 400+ participants across 5 sub-teams.",
    },
  ],
  microcopy: {
    proofLead:
      "Production work first: a service migration, a live store, and a signed multi-year contract.",
    projectsLead:
      "Three builds that show the systems behind the work: queues, an agent loop, and on-chain verification.",
    aboutLead:
      "Computer science at IIIT Vadodara, backend work in production, and a studio co-founded with a partner.",
    contactLead:
      "Available for backend engineering roles and freelance backend work.",
    footerNote: "How this was built",
  },
};

export const profile = content;
