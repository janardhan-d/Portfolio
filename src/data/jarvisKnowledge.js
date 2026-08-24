import { personalDetails, projectsData, experienceData, certsData, skillsData } from './portfolioData';

// --- Local Storage Memory Helper for AI Self-Learning ---
const MEMORY_KEY = 'jarvis_learned_memory';

export function getLearnedMemory() {
  try {
    const data = localStorage.getItem(MEMORY_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function saveLearnedFact(key, value) {
  try {
    const memory = getLearnedMemory();
    memory[key.toLowerCase().trim()] = value;
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
    return true;
  } catch (e) {
    return false;
  }
}

export const sectionContexts = {
  home: {
    title: "Hero Section",
    summary: "Welcome! Janardhan Devarala is a Python Developer, Full-Stack Learner, and AI Enthusiast building practical software.",
    suggestions: [
      "Why hire Janardhan?",
      "Tell me about his Finance Manager app",
      "How to contact Janardhan?"
    ]
  },
  about: {
    title: "About Janardhan",
    summary: "Janardhan is pursuing B.Tech in Artificial Intelligence at Audisankara Institute of Technology (JNTU Anantapur, 2023-2027).",
    suggestions: [
      "What college is he studying at?",
      "What are his core career goals?",
      "What internships has he completed?"
    ]
  },
  skills: {
    title: "Skills & Tech Stack",
    summary: "Janardhan's stack spans Python (Tkinter, Matplotlib, SQLite), Web Dev (React, Tailwind CSS, Node.js), Java, and Google Cloud AI Badges.",
    suggestions: [
      "What are his top Python skills?",
      "What databases does he use?",
      "Does he build full-stack web apps?"
    ]
  },
  projects: {
    title: "Projects Gallery",
    summary: "Highlights include the desktop Finance Manager built during his InnoByte Services Internship, plus React AI web applications.",
    suggestions: [
      "How was the Finance Manager app built?",
      "Where are his GitHub repositories?",
      "What other projects did he build?"
    ]
  },
  experience: {
    title: "Work Experience",
    summary: "Includes Python Developer Internship at InnoByte Services (ID: RF/A1/F2370) and APSCHE + CSC India Virtual Internship (ID: CscIndia-NL55C2RM).",
    suggestions: [
      "What did he build at InnoByte Services?",
      "What is his CSC India Certificate ID?",
      "What did he learn in DSA Internship?"
    ]
  },
  achievements: {
    title: "Certifications & Awards",
    summary: "Features verified credentials from InnoByte, CSC India, Google Cloud AI Badges, Intel AI FOR ALL, and Hackathon Top 5 Finalist awards.",
    suggestions: [
      "Verify Certificate IDs",
      "What Google Cloud AI badges does he have?",
      "Tell me about his hackathon wins"
    ]
  },
  contact: {
    title: "Contact & Hiring",
    summary: "Direct channel to connect with Janardhan for software engineering internships, Python/Full-Stack developer roles, or collaborations.",
    suggestions: [
      "How can I email or call Janardhan?",
      "Is Janardhan open to remote roles?",
      "What is his LinkedIn profile?"
    ]
  }
};

export function getAiResponse(query, activeSection = 'home') {
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();

  // -------------------------------------------------------------
  // 0. SELF-LEARNING & MEMORY CAPABILITY (TEACH THE AI NEW FACTS)
  // -------------------------------------------------------------
  // Example inputs: "Remember that I am a recruiter from Microsoft", "Learn: Janardhan loves PyTorch", "My name is Alex"
  if (q.startsWith('remember ') || q.startsWith('learn ') || q.startsWith('note ') || q.includes('my name is') || q.includes('i am ')) {
    let factKey = 'user_fact_' + Date.now();
    let factValue = rawQ;

    if (q.includes('my name is')) {
      const name = rawQ.split(/my name is/i)[1]?.trim();
      if (name) {
        factKey = 'user_name';
        factValue = name;
      }
    } else if (q.includes('learn:')) {
      const parts = rawQ.split(/learn:/i);
      factKey = parts[1]?.split('=')[0]?.trim() || 'learned_fact';
      factValue = parts[1]?.split('=')[1]?.trim() || parts[1]?.trim();
    }

    saveLearnedFact(factKey, factValue);

    return {
      text: `🧠 Got it! I have stored that in my local AI memory: "${factValue}". Ask me "What do you remember?" anytime to recall your learned facts!`,
      chips: ["What do you remember?", "Why hire Janardhan?", "View Skills"]
    };
  }

  // Recall Learned Facts
  if (q.includes('what do you remember') || q.includes('learned memory') || q.includes('my name') || q.includes('what did you learn')) {
    const memory = getLearnedMemory();
    const memoryKeys = Object.keys(memory);

    if (memoryKeys.length === 0) {
      return {
        text: `I haven't stored any custom user facts yet! You can teach me by typing: "Remember that I am hiring for a Python role" or "My name is [Your Name]".`,
        chips: ["Remember that I am a recruiter", "Why hire Janardhan?", "Check Experience"]
      };
    }

    const factsList = memoryKeys.map(k => `• ${memory[k]}`).join('\n');
    return {
      text: `🧠 Here is what I currently remember from our conversation:\n${factsList}`,
      chips: ["Why hire Janardhan?", "View Certifications", "Contact Info"]
    };
  }

  // -------------------------------------------------------------
  // 1. GREETINGS & CASUAL INTENTS
  // -------------------------------------------------------------
  if (!q || q.length < 2 || ['hi', 'hello', 'hey', 'greetings', 'yo', 'ss', 'namaste'].includes(q)) {
    return {
      text: `👋 Hello! I am Janardhan's AI Assistant. How can I help you today? You can ask me about his Python Developer Internship at InnoByte, Capstone Projects, DSA Certifications, or hiring info!`,
      chips: ["Why hire Janardhan?", "Tell me about Finance Manager app", "How to contact him?"]
    };
  }

  if (q.includes('who are you') || q.includes('what can you do') || q.includes('your role')) {
    return {
      text: `I am Janardhan Devarala's interactive 3D AI Portfolio Assistant! I can answer technical questions about his software architecture, verified credentials, Python/React projects, academic background, and connect you directly with him.`,
      chips: ["Why hire Janardhan?", "Show Skills", "Open Resume"]
    };
  }

  // -------------------------------------------------------------
  // 2. RECRUITER / WHY HIRE JANARDHAN
  // -------------------------------------------------------------
  if (q.includes('hire') || q.includes('why') || q.includes('recruit') || q.includes('candidate') || q.includes('role') || q.includes('salary') || q.includes('available')) {
    return {
      text: `Janardhan is an outstanding candidate for Python & Full-Stack Software Engineering roles because:\n\n1. 💻 **Hands-on Internship Experience**: Built desktop GUI Finance Manager at InnoByte Services with SQLite & Matplotlib.\n2. 📜 **Verified Certifications**: CSC India + APSCHE Virtual Internship (ID: CscIndia-NL55C2RM) & Google Cloud AI Badges.\n3. 🏅 **Hackathon Finalist**: Top 5 ranking at SVC Hackathon & CodeSprint 2026 participant.\n4. 🎓 **Strong Academic Base**: Pursuing B.Tech in Artificial Intelligence (2023-2027) at Audisankara College.`,
      chips: ["View Experience", "Open Resume", "Contact Information"]
    };
  }

  // -------------------------------------------------------------
  // 3. INNOBYTE SERVICES INTERNSHIP & FINANCE MANAGER APP
  // -------------------------------------------------------------
  if (q.includes('innobyte') || q.includes('finance manager') || q.includes('tkinter') || q.includes('matplotlib') || q.includes('capstone')) {
    return {
      text: `During his Python Developer Internship at InnoByte Services (20 July – 20 August 2026, Credential ID: RF/A1/F2370), Janardhan engineered the Finance Manager application:\n\n• **GUI Interface**: Built using Python Tkinter & CustomTkinter.\n• **Data Analytics**: Integrated Matplotlib for interactive visual income vs expense charts.\n• **Database**: SQLite database persistence with automated schema migrations.\n• **Security & Backup**: User login authentication and 1-click JSON/DB export & restore.`,
      chips: ["View Projects Section", "Verify Certificate ID", "See GitHub Code"]
    };
  }

  // -------------------------------------------------------------
  // 4. CSC INDIA & APSCHE VIRTUAL INTERNSHIP
  // -------------------------------------------------------------
  if (q.includes('csc') || q.includes('apsche') || q.includes('dsa') || q.includes('cscindia-nl55c2rm')) {
    return {
      text: `Janardhan completed a 2-month Virtual Internship in "Data Structures and Algorithms using Python" under the combined APSCHE + CSC India initiative (27 April – 27 June 2026).\n\n• **Verified Credential ID**: CscIndia-NL55C2RM\n• **Topics Mastered**: Arrays, Linked Lists, Trees, Sorting Algorithms, Time Complexity Optimization (Big-O), and Dynamic Programming.`,
      chips: ["Verify Certificate ID", "View All Achievements", "Contact Janardhan"]
    };
  }

  // -------------------------------------------------------------
  // 5. HACKATHONS & COMPETITIONS
  // -------------------------------------------------------------
  if (q.includes('hackathon') || q.includes('svc') || q.includes('nrcm') || q.includes('codesprint') || q.includes('synapse') || q.includes('competition')) {
    return {
      text: `Janardhan has achieved multiple hackathon honors:\n\n🏆 **SVC Hackathon**: Achieved Top 5 Finalist ranking at Sri Venkateswara College.\n🏅 **NRCM Hackathon**: Selected as Finalist for rapid prototype engineering.\n⚡ **CodeSprint-2026**: Participated with Team Synapse building rapid full-stack web prototypes under tight deadlines.`,
      chips: ["View Achievements", "Check Skills", "Why Hire Janardhan?"]
    };
  }

  // -------------------------------------------------------------
  // 6. GOOGLE CLOUD, MICROSOFT, INTEL & NASSCOM BADGES
  // -------------------------------------------------------------
  if (q.includes('cloud') || q.includes('google') || q.includes('microsoft') || q.includes('intel') || q.includes('nasscom') || q.includes('forage')) {
    return {
      text: `Janardhan holds multiple verified cloud & AI industry badges:\n\n🌐 **Google Cloud Platform**: Skill Badges in Responsible AI, Generative AI & Large Language Models (LLMs).\n🟦 **Microsoft Learn**: AI Concepts for Developers (Credential: MSFT-4c5e9vzk).\n⚡ **Intel AI FOR ALL**: AI Appreciation Certification (2025).\n📈 **JP Morgan Forage**: Midas Core Financial Simulation.\n📑 **NASSCOM FutureSkills Prime**: Emerging Tech Badges.`,
      chips: ["View Certifications", "Show Tech Stack", "Open Resume"]
    };
  }

  // -------------------------------------------------------------
  // 7. EDUCATION & COLLEGE
  // -------------------------------------------------------------
  if (q.includes('college') || q.includes('audisankara') || q.includes('jntu') || q.includes('education') || q.includes('degree') || q.includes('b.tech') || q.includes('btech')) {
    return {
      text: `Janardhan is pursuing his Bachelor of Technology (B.Tech) in **Artificial Intelligence** at Audisankara Institute of Technology, Gudur (affiliated with JNTU Anantapur, 2023–2027).\n\nHe maintains strong academic performance alongside practical project engineering in Python, AI, and Full-Stack Web Development.`,
      chips: ["View Skills", "Open Resume", "Contact Information"]
    };
  }

  // -------------------------------------------------------------
  // 8. SKILLS & TECH STACK
  // -------------------------------------------------------------
  if (q.includes('python') || q.includes('react') || q.includes('javascript') || q.includes('sql') || q.includes('sqlite') || q.includes('node') || q.includes('skill') || q.includes('stack')) {
    return {
      text: `Janardhan's Technical Stack includes:\n\n🐍 **Languages**: Python, JavaScript (ES6+), Java, HTML5, CSS3, SQL.\n⚡ **Frameworks & Libs**: React, Tailwind CSS, CustomTkinter, Matplotlib, Pandas, Node.js/Express.\n🗄️ **Databases & Tools**: SQLite, MongoDB, Git, GitHub, VS Code, Postman.`,
      chips: ["View Skills Section", "See Projects", "Why Hire Janardhan?"]
    };
  }

  // -------------------------------------------------------------
  // 9. CONTACT & SOCIAL LINKS
  // -------------------------------------------------------------
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('mobile') || q.includes('linkedin') || q.includes('github') || q.includes('location')) {
    return {
      text: `You can connect with Janardhan directly:\n\n📧 **Email**: ${personalDetails.email}\n📞 **Phone**: +91 7207463004\n🐙 **GitHub**: github.com/janardhan-d\n💼 **LinkedIn**: linkedin.com/in/janardhan-devarala\n📍 **Location**: Gudur, Andhra Pradesh, India (Open to Remote & Relocation worldwide).`,
      chips: ["Open Resume", "Go to Contact Section", "Why Hire Janardhan?"]
    };
  }

  // -------------------------------------------------------------
  // 10. CONTEXTUAL & GENERAL FALLBACK
  // -------------------------------------------------------------
  const currentCtx = sectionContexts[activeSection] || sectionContexts.home;
  return {
    text: `I understand you're asking about "${rawQ}". ${currentCtx.summary}\n\nYou can also teach me custom facts! For example, try typing: "Remember that I am interested in hiring Janardhan" or ask about his Finance Manager app!`,
    chips: currentCtx.suggestions
  };
}
