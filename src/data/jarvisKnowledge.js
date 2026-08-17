import { personalDetails, projectsData, experienceData, certsData, skillsData } from './portfolioData';

export const sectionContexts = {
  home: {
    title: "Hero Section",
    summary: "Welcome! Janardhan Devarala is a Python Developer, Aspiring AI Engineer, and Full-Stack Learner currently pursuing B.Tech in Artificial Intelligence at Audisankara College.",
    suggestions: [
      "Why hire Janardhan?",
      "Tell me about his Finance Manager app",
      "How can I download his resume?"
    ]
  },
  about: {
    title: "About Janardhan",
    summary: "Janardhan is studying B.Tech in Artificial Intelligence at Audisankara Institute of Technology, Gudur (affiliated with JNTU Anantapur, 2023-2027), based in Andhra Pradesh, India.",
    suggestions: [
      "What college is Janardhan studying at?",
      "What are his core engineering goals?",
      "What internships has he completed?"
    ]
  },
  skills: {
    title: "Skills & Stack",
    summary: "Janardhan's technical stack spans Python (Tkinter, Matplotlib, SQLite), Web Development (React, Tailwind CSS, Node.js/Express), Java, and Google Cloud AI Badges.",
    suggestions: [
      "What are his top Python skills?",
      "What databases does he use?",
      "Does he build full-stack web apps?"
    ]
  },
  projects: {
    title: "Projects Gallery",
    summary: "Highlights practical software lead by the Finance Manager desktop application built during his Python Developer Internship at InnoByte Services, plus AI & React web applications.",
    suggestions: [
      "How was the Finance Manager app built?",
      "Tell me about the AI Quiz platform",
      "Where are his GitHub repositories?"
    ]
  },
  experience: {
    title: "Work Experience",
    summary: "Includes Python Developer Internship at InnoByte Services (Jul-Aug 2026) and APSCHE + CSC India Student Internship (Apr-Jun 2026, Certificate ID: CSCIndia-663B777P).",
    suggestions: [
      "What did he build at InnoByte Services?",
      "What is his APSCHE Certificate ID?",
      "What did he learn in the DSA program?"
    ]
  },
  achievements: {
    title: "Certifications",
    summary: "Features verified credentials from APSCHE/CSC India, Tata Data Visualisation (Forage), Google Cloud Skill Badges (Generative AI & Responsible AI), and CodeSprint-2026 Hackathon.",
    suggestions: [
      "Verify Certificate ID CSCIndia-663B777P",
      "What Google Cloud AI badges does he have?",
      "Tell me about his hackathon experience"
    ]
  },
  contact: {
    title: "Contact & Hiring",
    summary: "Direct channel to connect with Janardhan for software engineering internships, entry-level full-stack/Python developer roles, or technical collaborations.",
    suggestions: [
      "How can I email or call Janardhan?",
      "Is Janardhan open to remote roles?",
      "What is his LinkedIn profile?"
    ]
  }
};

export function getAiResponse(query, activeSection = 'home') {
  const q = query.toLowerCase().trim();

  // Short inputs / greetings
  if (!q || q.length < 2 || q === 'hi' || q === 'hello' || q === 'hey' || q === 'ss') {
    return {
      text: `Hello! How can I assist you with Janardhan's portfolio today? You can ask about his projects, technical skills, academic background, or internship credentials.`,
      chips: ["Why hire Janardhan?", "Tell me about his Finance Manager app", "How can I contact him?"]
    };
  }

  // 1. Recruiter / Hiring FAQs
  if (q.includes('hire') || q.includes('why') || q.includes('recruit') || q.includes('candidate') || q.includes('role')) {
    return {
      text: `Janardhan is an ideal candidate for software engineering roles because he combines strong Python and web development skills with real internship experience. At InnoByte Services, he engineered a complete desktop Finance Manager with SQLite and Matplotlib. He also completed certified DSA training (ID: CSCIndia-663B777P) and is pursuing B.Tech in AI at Audisankara College.`,
      chips: ["View Projects", "Check Experience", "Get Contact Info"]
    };
  }

  // 2. Finance Manager Deep Dive
  if (q.includes('finance manager') || q.includes('innobyte') || q.includes('tkinter') || q.includes('capstone')) {
    return {
      text: `The Finance Manager is Janardhan's capstone desktop application built during his Python Developer Internship at InnoByte Services. It features user authentication, SQLite database persistence, interactive Matplotlib financial analytics, budget threshold alerts, and one-click backup/restore functionality.`,
      chips: ["View Projects", "See GitHub Code", "Other Projects"]
    };
  }

  // 3. Certificate & DSA Internship
  if (q.includes('certificate') || q.includes('cscindia') || q.includes('apsche') || q.includes('dsa') || q.includes('verify')) {
    return {
      text: `Janardhan earned an official certification from the APSCHE Student Internship Initiative in collaboration with CSC India for "Data Structures and Algorithms using Python". The verified Certificate ID is CSCIndia-663B777P. He also holds Google Cloud AI Badges and Tata Data Visualisation credentials.`,
      chips: ["Verify Certificate ID", "View Experience", "Contact Janardhan"]
    };
  }

  // 4. Education & College
  if (q.includes('college') || q.includes('audisankara') || q.includes('jntu') || q.includes('degree') || q.includes('education')) {
    return {
      text: `Janardhan is studying Bachelor of Technology (B.Tech) in Artificial Intelligence at Audisankara Institute of Technology, Gudur (affiliated with JNTU Anantapur), with expected graduation in August 2027.`,
      chips: ["View Skills", "Open Resume", "Contact Info"]
    };
  }

  // 5. Contact / Email / Phone / Resume
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('resume')) {
    return {
      text: `You can reach Janardhan directly via email at ${personalDetails.email} or by phone at +91 7207463004. You can also view or download his full resume using the "Resume" button in the top menu!`,
      chips: ["Open Resume", "Copy Email", "Go to Contact Section"]
    };
  }

  // 6. Skills & Tech Stack
  if (q.includes('python') || q.includes('react') || q.includes('skill') || q.includes('tech stack') || q.includes('database')) {
    return {
      text: `Janardhan's core skills include Python (Tkinter, Matplotlib, Pandas), JavaScript (React, Tailwind CSS, Express/Node.js), Java, HTML/CSS, SQL (SQLite, MongoDB), and Git/GitHub.`,
      chips: ["View Skills Grid", "See Projects", "Why Hire Janardhan?"]
    };
  }

  // 7. Contextual Fallback
  const currentCtx = sectionContexts[activeSection] || sectionContexts.home;
  return {
    text: `${currentCtx.summary} Feel free to ask about his Finance Manager capstone, DSA internship, Google Cloud badges, or how to contact him!`,
    chips: currentCtx.suggestions
  };
}
