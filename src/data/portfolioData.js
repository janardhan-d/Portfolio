export const personalDetails = {
  name: "Janardhan Devarala",
  headline: "Aspiring AI Engineer | Python Developer | Full-Stack Learner",
  tagline: "Building practical, real-world software — from desktop finance tools to full-stack AI web applications.",
  aboutText: [
    "I'm a Python and Full-Stack developer with hands-on experience building desktop and web applications, currently pursuing my B.Tech in Artificial Intelligence at Audisankara Institute of Technology, Gudur (affiliated with JNTU Anantapur).",
    "During my Python Developer Internship at InnoByte Services, I engineered a full-featured desktop Finance Manager using Tkinter, SQLite, and Matplotlib. I also completed an intensive internship under the APSCHE Student Internship Initiative (in collaboration with CSC India) focusing on Data Structures and Algorithms using Python.",
    "Driven by curiosity and a passion for engineering practical tools, I actively participate in hackathons and continuously expand my skill set across modern Web Development and Artificial Intelligence."
  ],
  location: "Sri Potti Sriramulu Nellore, Andhra Pradesh, India",
  email: "janardhand2021@gmail.com",
  secondaryEmail: "devaralajanardhan@gmail.com",
  phone: "+91 7207463004",
  github: "https://github.com/janardhan-d",
  linkedin: "https://www.linkedin.com/in/janardhan-devarala-1552172a1",
  college: "Audisankara Institute of Technology, Gudur",
  degree: "B.Tech, Artificial Intelligence",
  batch: "2023 - 2027",
  quickFacts: [
    { label: "Education", value: "B.Tech in AI (2023 - 2027)", icon: "GraduationCap" },
    { label: "Location", value: "Andhra Pradesh, India", icon: "MapPin" },
    { label: "Current Focus", value: "Full-Stack Web & AI Engineering", icon: "Code2" },
    { label: "Languages", value: "English, Telugu", icon: "Languages" },
  ]
};

export const skillsData = [
  {
    category: "Languages",
    icon: "FileCode2",
    skills: [
      { name: "Python", level: 90, highlight: true },
      { name: "JavaScript", level: 85, highlight: true },
      { name: "Java", level: 75 },
      { name: "HTML5 / CSS3", level: 92, highlight: true },
      { name: "SQL", level: 80 }
    ]
  },
  {
    category: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React", level: 85, highlight: true },
      { name: "Tailwind CSS", level: 90, highlight: true },
      { name: "Responsive UI/UX", level: 88 },
      { name: "DOM Manipulation", level: 85 },
      { name: "Component Design", level: 88 }
    ]
  },
  {
    category: "Backend & Databases",
    icon: "Database",
    skills: [
      { name: "Node.js", level: 78 },
      { name: "Express.js", level: 80, highlight: true },
      { name: "SQLite", level: 88, highlight: true },
      { name: "MongoDB", level: 75 },
      { name: "REST APIs", level: 82 }
    ]
  },
  {
    category: "Desktop / GUI",
    icon: "Monitor",
    skills: [
      { name: "Tkinter", level: 92, highlight: true },
      { name: "Matplotlib", level: 85, highlight: true },
      { name: "Pillow (PIL)", level: 80 },
      { name: "tkcalendar", level: 82 }
    ]
  },
  {
    category: "Tools & Ecosystem",
    icon: "Wrench",
    skills: [
      { name: "Git & GitHub", level: 88, highlight: true },
      { name: "VS Code", level: 95 },
      { name: "Google Cloud (GCP)", level: 75 },
      { name: "Vite / npm", level: 85 }
    ]
  }
];

export const projectsData = [
  {
    id: "finance-manager",
    title: "Finance Manager — Personal Finance Suite (Gold UI)",
    subtitle: "InnoByte Services Internship Capstone Project",
    category: "Python / GUI",
    featured: true,
    description: "A complete desktop personal finance application built during my Python Developer Internship at InnoByte Services. Features user login/auth, interactive analytics dashboard, transaction logs, budget alerts, and SQLite DB backup.",
    techStack: ["Python", "Tkinter", "SQLite", "Matplotlib", "Pillow", "tkcalendar"],
    github: "https://github.com/janardhan-d/finance-manager-innobyte-services",
    liveUrl: "https://janardhan-d.github.io/finance-manager-innobyte-services",
    imageBg: "from-amber-950/60 via-amber-900/40 to-slate-950",
    features: [
      "Secure multi-user authentication with encrypted SQLite storage",
      "Interactive income vs expense chart analytics with Matplotlib",
      "Monthly & annual financial summary generator",
      "Custom budget threshold warnings & real-time alerts",
      "One-click database backup and restore system"
    ],
    architecture: "MVC Architecture using Tkinter frames, SQLite database connector layer, and Matplotlib Canvas embeds."
  },
  {
    id: "ai-quiz-app",
    title: "Smart AI Quiz & Assessment Hub",
    subtitle: "Interactive Full-Stack Web Application",
    category: "Full-Stack & AI",
    featured: true,
    description: "An interactive full-stack learning platform where users can select computer science topics, take timed quizzes, view analytical scorecards, and get automated performance reviews.",
    techStack: ["React", "Tailwind CSS", "JavaScript", "Node.js", "Express"],
    github: "https://github.com/janardhan-d/ai-quiz-platform",
    liveUrl: "https://janardhan-d.github.io/ai-quiz-platform",
    imageBg: "from-yellow-950/60 via-amber-950/40 to-slate-950",
    features: [
      "Dynamic topic selector with timed question modules",
      "Instant feedback with detailed answer explanations",
      "Comprehensive score breakdown & performance analytics",
      "Persistent state tracking across quiz sessions"
    ],
    architecture: "React functional components with custom state hooks and Express REST API backend endpoints."
  },
  {
    id: "kanban-board",
    title: "DevTask Kanban Command Center",
    subtitle: "Productivity & Workflow Tool",
    category: "Full-Stack",
    featured: true,
    description: "A sleek, responsive Kanban board web app designed for software developers to manage tasks, assign priority tags, search items, and track progress seamlessly.",
    techStack: ["React", "Tailwind CSS", "LocalStorage API", "Lucide Icons"],
    github: "https://github.com/janardhan-d/kanban-board",
    liveUrl: "https://janardhan-d.github.io/kanban-board",
    imageBg: "from-amber-900/60 via-yellow-950/40 to-slate-950",
    features: [
      "Drag and drop task status updates (To Do, In Progress, Review, Done)",
      "Priority badges (High, Medium, Low) with visual indicator lights",
      "Instant fuzzy search filter for task titles and descriptions",
      "Browser LocalStorage sync for offline productivity"
    ],
    architecture: "Clean component state hierarchy with customized Tailwind styling."
  }
];

export const experienceData = [
  {
    role: "Python Developer Intern",
    company: "InnoByte Services",
    period: "Jul 2026 – Aug 2026",
    type: "Internship",
    location: "Remote / India",
    points: [
      "Architected and developed a full-featured desktop Finance Manager application from ground up.",
      "Implemented SQLite database integration for multi-user transaction records, category tags, and account security.",
      "Designed visual analytics dashboards using Matplotlib for automated expense breakdown reports.",
      "Created budget threshold notification logic and database backup/restore utilities."
    ],
    skills: ["Python", "Tkinter", "SQLite", "Matplotlib", "Software Architecture"]
  },
  {
    role: "Student Intern",
    company: "APSCHE Student Internship Initiative (collab with CSC India)",
    period: "Apr 2026 – Jun 2026",
    type: "Certified Internship",
    location: "Andhra Pradesh, India",
    points: [
      "Completed rigorous technical training program: 'Data Structures and Algorithms using Python'.",
      "Implemented core data structures including Linked Lists, Trees, Graphs, Sorting algorithms, and Dynamic Programming.",
      "Earned official completion certificate with Certificate ID: CSCIndia-663B777P."
    ],
    certificateId: "CSCIndia-663B777P",
    skills: ["Python", "Data Structures", "Algorithms", "Problem Solving", "Complexity Analysis"]
  },
  {
    role: "B.Tech in Artificial Intelligence",
    company: "Audisankara Institute of Technology, Gudur",
    period: "Aug 2023 – Aug 2027 (Expected)",
    type: "Undergraduate Degree",
    location: "Gudur, Andhra Pradesh (Affiliated to JNTU Anantapur)",
    points: [
      "Specializing in Artificial Intelligence, Machine Learning fundamentals, Data Structures, and Software Development.",
      "Actively participating in university hackathons, coding contests, and technical workshops.",
      "Maintaining strong academic performance while building hands-on portfolio software."
    ],
    skills: ["Artificial Intelligence", "Python", "Java", "Web Engineering", "Database Management"]
  }
];

export const certsData = [
  {
    title: "Data Structures and Algorithms using Python",
    issuer: "APSCHE & CSC India",
    date: "Jun 2026",
    credentialId: "CSCIndia-663B777P",
    badge: "Official Certificate",
    icon: "Award",
    color: "gold",
    description: "Comprehensive certification covering advanced data structures, algorithmic complexity, recursion, graph algorithms, and optimization in Python."
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata (Forage Simulation)",
    date: "2026",
    credentialId: "Tata-Forage-DV2026",
    badge: "Job Simulation",
    icon: "BarChart3",
    color: "gold",
    description: "Completed practical job simulation creating executive data dashboards, framing business metrics, and presenting data insights."
  },
  {
    title: "Introduction to Responsible AI",
    issuer: "Google Cloud",
    date: "2026",
    credentialId: "GCP-RESP-AI-2026",
    badge: "Skill Badge",
    icon: "ShieldCheck",
    color: "gold",
    description: "Demonstrated understanding of ethical AI frameworks, safety evaluation, bias mitigation, and Google's 7 AI principles."
  },
  {
    title: "Responsible AI: Applying AI Principles with Google Cloud",
    issuer: "Google Cloud",
    date: "2026",
    credentialId: "GCP-RESP-AI-APPLY",
    badge: "Skill Badge",
    icon: "Sparkles",
    color: "gold",
    description: "Applied operational workflows for deploying responsible AI models on Google Cloud Platform with governance best practices."
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud / SVU CSE Dept",
    date: "2026",
    credentialId: "GCP-GEN-AI-INTRO",
    badge: "Specialized Course",
    icon: "Cpu",
    color: "gold",
    description: "Foundational mastery of Large Language Models (LLMs), generative image synthesis, transformer architectures, and prompt engineering."
  },
  {
    title: "CodeSprint-2026 Hackathon Participant",
    issuer: "Team Synapse",
    date: "2026",
    credentialId: "CODESPRINT-2026-SYN",
    badge: "Hackathon Trophy",
    icon: "Trophy",
    color: "gold",
    description: "Participated in high-intensity competitive hackathon designing rapid prototype software solutions under strict time constraints."
  }
];
