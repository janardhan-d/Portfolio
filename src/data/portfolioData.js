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
  // --- 🎓 INTERNSHIPS ---
  {
    title: "Python Developer Internship Certificate",
    issuer: "InnoByte Services",
    date: "20 July – 20 August 2026",
    credentialId: "RF/A1/F2370",
    category: "internships",
    badge: "Official Internship",
    icon: "ShieldCheck",
    color: "gold",
    image: "/certificates/innobyte_certificate.png",
    description: "Official Internship Certificate & Letter of Recommendation for Python Developer Intern role at InnoByte Services, building desktop Finance Manager GUI."
  },
  {
    title: "Data Structures & Algorithms Virtual Internship",
    issuer: "CSC India & AICTE - APSCHE Initiative",
    date: "27 April – 27 June 2026",
    credentialId: "CscIndia-NL55C2RM",
    category: "internships",
    badge: "Government Initiative",
    icon: "Award",
    color: "gold",
    image: "/certificates/csc_india_apsche.png",
    description: "Certified 2-month Virtual Internship covering Python Data Structures, Algorithmic Problem Solving & Complexity under AICTE-APSCHE Initiative."
  },
  {
    title: "Frontend Development Internship Certificate",
    issuer: "Syntecxhub",
    date: "2026",
    credentialId: "SYNTECX-FE-2026",
    category: "internships",
    badge: "Frontend Internship",
    icon: "ShieldCheck",
    color: "gold",
    image: "/certificates/innobyte_certificate.png",
    description: "Internship completion certificate for Web Development, React component design, and responsive frontend software architecture."
  },

  // --- 🏅 HACKATHONS & COMPETITIONS ---
  {
    title: "Smart India Hackathon (SIH) Finalist Certificate",
    issuer: "Ministry of Education & Govt. of India",
    date: "2026",
    credentialId: "SIH-2026-FINALIST",
    category: "hackathons",
    badge: "National Finalist",
    icon: "Trophy",
    color: "gold",
    image: "/certificates/sih_finalist.svg",
    description: "National Finalist recognition at Smart India Hackathon for engineering innovative software solutions for real-world problem statements."
  },
  {
    title: "SVC Hackathon Top 5 Finalist Certificate",
    issuer: "Sri Venkateswara College (SVCE)",
    date: "2026",
    credentialId: "SVC-HACK-TOP5-2026",
    category: "hackathons",
    badge: "Top 5 Ranking",
    icon: "Trophy",
    color: "gold",
    image: "/certificates/sih_finalist.svg",
    description: "Achieved Top 5 ranking in competitive hackathon building rapid prototype AI & full-stack web applications under time limits."
  },
  {
    title: "NRCM Hackathon Finalist Certificate",
    issuer: "NRCM Engineering College",
    date: "2026",
    credentialId: "NRCM-HACK-2026",
    category: "hackathons",
    badge: "Hackathon Finalist",
    icon: "Trophy",
    color: "gold",
    image: "/certificates/sih_finalist.svg",
    description: "Selected as Finalist for technical innovation, live code presentation, and system prototype design."
  },
  {
    title: "CodeSprint-2026 Hackathon Participant",
    issuer: "Team Synapse",
    date: "2026",
    credentialId: "CODESPRINT-2026-SYN",
    category: "hackathons",
    badge: "Hackathon Trophy",
    icon: "Trophy",
    color: "gold",
    image: "/certificates/apsche_csc_dsa.svg",
    description: "Participated in high-intensity competitive hackathon designing rapid prototype software under strict time constraints."
  },

  // --- 🌐 TECHNICAL & CLOUD ACHIEVEMENTS ---
  {
    title: "Google Cloud Skill Badges (Responsible AI, GenAI & LLMs)",
    issuer: "Google Cloud Platform (GCP)",
    date: "2026",
    credentialId: "GCP-RESP-GENAI-2026",
    category: "cloud",
    badge: "GCP Skill Badges",
    icon: "Cpu",
    color: "gold",
    image: "/certificates/google_cloud_badge.svg",
    description: "Verified GCP Skill Badges for Responsible AI, Generative AI, Large Language Models (LLMs), and Prompt Engineering."
  },
  {
    title: "Microsoft Learn — GenAI, Cloud & Big Data Analytics",
    issuer: "Microsoft Learn",
    date: "Jun 2026",
    credentialId: "MSFT-4c5e9vzk",
    category: "cloud",
    badge: "Microsoft Achievements",
    icon: "Sparkles",
    color: "gold",
    image: "/certificates/microsoft_ai_concepts.svg",
    description: "Official Microsoft Learn achievements in AI Concepts for Developers, Cloud Computing Fundamentals, and Big Data Analytics."
  },
  {
    title: "AI FOR ALL — AI APPRECIATE 2025",
    issuer: "Intel & Digital India (CBSE)",
    date: "2025",
    credentialId: "INTEL-AI-2025-JANARDHAN",
    category: "cloud",
    badge: "Intel Certification",
    icon: "Cpu",
    color: "gold",
    image: "/certificates/intel_ai_for_all.jpg",
    description: "Official Intel & Digital India certification for AI Appreciation, recognizing foundational AI skills and practical awareness."
  },

  // --- 📑 OTHER RECOGNITIONS & SIMULATIONS ---
  {
    title: "JP Morgan Forage Job Simulation (Midas Core)",
    issuer: "JP Morgan Chase & Co. (Forage)",
    date: "2026",
    credentialId: "JPMORGAN-MIDAS-2026",
    category: "recognitions",
    badge: "Job Simulation",
    icon: "BarChart3",
    color: "gold",
    image: "/certificates/jpmorgan_forage.svg",
    description: "Completed virtual software engineering simulation building core data pipelines, financial backend feeds, and systems analysis."
  },
  {
    title: "NASSCOM FutureSkills Prime Badges",
    issuer: "NASSCOM & MeitY (Govt. of India)",
    date: "2026",
    credentialId: "NASSCOM-FSP-2026",
    category: "recognitions",
    badge: "NASSCOM Badge",
    icon: "Award",
    color: "gold",
    image: "/certificates/google_cloud_badge.svg",
    description: "Verified industry skill badges for Emerging Technologies, Software Engineering, and Digital Competencies."
  }
];
