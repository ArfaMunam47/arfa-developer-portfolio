/**
 * =========================================================================
 * ARFA MUNAM — PORTFOLIO CONFIGURATION & DATA SOURCE
 * =========================================================================
 * 
 * Hi Arfa! You can easily update your portfolio information, projects,
 * certificates, social links, and images directly in this file.
 * Any changes made here will automatically reflect throughout the website.
 */

const PORTFOLIO_DATA = {
  // -----------------------------------------------------------------------
  // PERSONAL BRANDING & BIO
  // -----------------------------------------------------------------------
  personal: {
    name: "Arfa Munam",
    headlinePrefix: "Hello, I'm",
    roleTitles: [
      "Frontend Developer",
      "Prompt Engineer",
      "AI Enthusiast & Vibe Coder"
    ],
    primaryHeadings: [
      {
        id: "frontend",
        title: "Frontend Developer",
        tagline: "Crafting living, responsive web interfaces with pixel precision",
        gradient: "linear-gradient(135deg, #FA5538 0%, #F59E0B 100%)",
        icon: "💻",
        accent: "#FA5538"
      },
      {
        id: "prompt",
        title: "Prompt Engineer",
        tagline: "Architecting structured reasoning & production LLM prompts",
        gradient: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
        icon: "⚡",
        accent: "#6366F1"
      },
      {
        id: "ai",
        title: "AI Enthusiast",
        tagline: "Continuously learning, experimenting & vibe coding with velocity",
        gradient: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
        icon: "🤖",
        accent: "#10B981"
      }
    ],
    heroTagline: "Frontend Developer • Prompt Engineer • AI Enthusiast (Always Learning & Building)",
    shortBio: "I'm a Computer Science student and creative developer building high-impact web interfaces with modern frontend tech, engineering structured prompts for frontier AI, and vibe coding fast prototypes.",
    detailedBio: [
      "I'm Arfa Munam, a Computer Science student building at the intersection of modern frontend craft, structured prompt engineering, and rapid AI vibe coding. I believe modern websites should feel alive — animated, colorful, tactile, and engineered with craft.",
      "My core technical foundation spans HTML5, CSS3, JavaScript, Bootstrap, React, Tailwind CSS, and fluid GSAP physics. I combine these foundational tools with modern AI-driven vibe coding to ship ambitious products in record time.",
      "As a prompt engineer and AI enthusiast, I work daily with Claude, ChatGPT, and generative models, designing intelligent systems, automated workflows, and self-reinforcing learning loops."
    ],
    availability: "Available for high-impact roles & creative engineering",
    statusBadge: "Active & Available for Work",
    
    // Images
    images: {
      creativePhoto: "creative-hero-portrait.jpg",
      realPhoto: "main.png.png",
      profilePhotoAlt: "profile-photo.png",
      animeAvatar: "anime-avatar.jpg"
    }
  },

  // -----------------------------------------------------------------------
  // SOCIAL & CONTACT LINKS (Preserving all your real working links!)
  // -----------------------------------------------------------------------
  contact: {
    email: "arfamunam01@gmail.com",
    github: "https://github.com/ArfaMunam47",
    linkedin: "https://www.linkedin.com/in/arfa-munam-a823573a1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    resumePdf: "Arfa-Munam-Resume.pdf"
  },

  // -----------------------------------------------------------------------
  // STATS & MILESTONES (Real data from your portfolio)
  // -----------------------------------------------------------------------
  stats: [
    { label: "Projects Completed", value: 10, suffix: "+", icon: "🚀" },
    { label: "Skills & Technologies", value: 15, suffix: "+", icon: "🛠️" },
    { label: "AI Tools Mastered", value: 8, suffix: "+", icon: "🤖" },
    { label: "GitHub Commits", value: 500, suffix: "+", icon: "⭐" }
  ],

  // -----------------------------------------------------------------------
  // FEATURED & SHOWCASE PROJECTS (4 Curated Exhibition Artifacts)
  // -----------------------------------------------------------------------
  projects: [
    {
      id: "founderos",
      number: "01",
      title: "FounderOS — 3D Premium Frontend",
      tagline: "Futuristic 3D Dashboard UI for Modern Founders",
      category: "frontend",
      categoryLabel: "3D UI & Frontend Architecture",
      description: "A futuristic 3D premium frontend experience built for startup founders. Features cinematic entrance animations, glassmorphic UI components, real-time responsive analytics layouts, and an immersive product-driven design system that commands attention.",
      technologies: ["HTML5", "CSS3", "JavaScript", "3D Motion", "Glassmorphism"],
      githubUrl: "https://github.com/ArfaMunam47/founderos-3d-premium-frontend",
      liveUrl: "https://github.com/ArfaMunam47/founderos-3d-premium-frontend",
      accentColor: "#0D3834",
      previewGradient: "linear-gradient(135deg, #0D3834 0%, #155E57 50%, #2A857A 100%)",
      icon: "🏗️",
      highlights: ["3D Perspective Tilt", "Bento Grid Dashboard", "Clean Responsive Code"]
    },
    {
      id: "educampus",
      number: "02",
      title: "EduCampus — Modern Education Platform",
      tagline: "Clean, Accessible Course & Learning Portal",
      category: "frontend",
      categoryLabel: "Education Platform & LMS",
      description: "A comprehensive education platform web application designed for students and educational institutions. Includes structured course catalog views, interactive syllabi cards, mobile-first responsive navigation, and accessible UI.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Responsive UX"],
      githubUrl: "https://github.com/ArfaMunam47/EduCampus",
      liveUrl: "https://github.com/ArfaMunam47/EduCampus",
      accentColor: "#FA5538",
      previewGradient: "linear-gradient(135deg, #FA5538 0%, #FB7158 50%, #FF8A73 100%)",
      icon: "🎓",
      highlights: ["Modular Course Catalog", "Bootstrap 5 Responsive Grid", "Fast Load Times"]
    },
    {
      id: "foodiehub",
      number: "03",
      title: "FoodieHub — Food Delivery Experience",
      tagline: "Vibrant Food Ordering & Restaurant Discovery UI",
      category: "frontend",
      categoryLabel: "Food Delivery & Commerce UI",
      description: "An appetizing food delivery and discovery web interface crafted with vibrant visuals, rich dish cards, intuitive category filtering, and micro-animations designed to elevate user engagement and conversion.",
      technologies: ["HTML5", "CSS3", "JavaScript", "UI/UX Design", "Bootstrap"],
      githubUrl: "https://github.com/ArfaMunam47/FoodieHub",
      liveUrl: "https://github.com/ArfaMunam47/FoodieHub",
      accentColor: "#D97706",
      previewGradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FBBF24 100%)",
      icon: "🍕",
      highlights: ["Interactive Menu Cards", "Cart Drawer Interaction", "Mouth-Watering Layout"]
    },
    {
      id: "promptcraft",
      number: "04",
      title: "PromptCraft AI — Workflow & Prompt Engine",
      tagline: "Frontier LLM Prompt Engineering & Generative Studio",
      category: "ai",
      categoryLabel: "Prompt Engineering & AI Workflows",
      description: "An interactive prompt engineering testbed and automated workflow engine. Allows developers and creators to design structured reasoning chains, evaluate few-shot LLM prompts, and prototype generative AI features with real-time feedback.",
      technologies: ["Prompt Engineering", "Claude 3.7", "ChatGPT", "Bolt AI", "JavaScript"],
      githubUrl: "https://github.com/ArfaMunam47/arfa-premium-portfolio",
      liveUrl: "https://github.com/ArfaMunam47/arfa-premium-portfolio",
      accentColor: "#7C3AED",
      previewGradient: "linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #8B5CF6 100%)",
      icon: "⚡",
      highlights: ["Chain-of-Thought Templates", "Interactive Prompt Tester", "Fast AI Prototyping"]
    }
  ],

  // -----------------------------------------------------------------------
  // CERTIFICATIONS SECTION (The 3 Google Certifications as requested)
  // -----------------------------------------------------------------------
  certificates: [
    {
      id: "cert-1",
      number: "01",
      title: "Google AI Professional Certificate",
      issuer: "Google / Grow with Google",
      date: "2024",
      badge: "Google Certified AI Professional",
      image: "", // Ready for user certificate image upload
      description: "Rigorous professional certification validating practical application of machine learning concepts, neural network foundations, generative AI architecture, model tuning, and deploying AI solutions responsibly.",
      skills: ["Generative AI Architecture", "Machine Learning Concepts", "Responsible AI", "Model Integration"],
      verifyUrl: ""
    },
    {
      id: "cert-2",
      number: "02",
      title: "Google AI Essentials Specialization",
      issuer: "Google / Coursera",
      date: "2024",
      badge: "Google AI Essentials",
      image: "", // Ready for user certificate image upload
      description: "Comprehensive foundational mastery of artificial intelligence tools, identifying business applications, using generative AI to accelerate workflows, and evaluating AI output for safety and accuracy.",
      skills: ["AI Foundations", "Workflow Automation", "AI Ethics & Safety", "Productivity Acceleration"],
      verifyUrl: ""
    },
    {
      id: "cert-3",
      number: "03",
      title: "Google Prompting Essentials Specialization",
      issuer: "Google / Coursera",
      date: "2025",
      badge: "Google Prompting Specialist",
      image: "", // Ready for user certificate image upload
      description: "Specialized certification in designing structured, high-precision prompts for Large Language Models. Covers role specification, context constraints, Chain-of-Thought reasoning, few-shot prompting, and iterative refinement.",
      skills: ["Prompt Architecture", "Chain-of-Thought (CoT)", "Few-Shot Prompting", "LLM Reasoning"],
      verifyUrl: ""
    }
  ],

  // -----------------------------------------------------------------------
  // SKILLS & EXPERTISE CATEGORIES (Enhanced with 2026 Backend & AI Automation)
  // -----------------------------------------------------------------------
  skillsCategories: [
    {
      id: "frontend-core",
      title: "Core Frontend & Frameworks",
      subtitle: "Semantic HTML5, responsive CSS3 architecture, JavaScript ES6+, Bootstrap, React & Tailwind.",
      icon: "🌐",
      accent: "coral",
      skills: [
        { name: "HTML5", level: "Semantic Architecture", tag: "HTML", icon: "🌐" },
        { name: "CSS3", level: "Modern Flex/Grid & Variables", tag: "CSS", icon: "🎨" },
        { name: "JavaScript (ES6+)", level: "Async, Fetch & DOM", tag: "JS", icon: "⚡" },
        { name: "Bootstrap 5", level: "Component Systems & UX", tag: "Bootstrap", icon: "🅱️" },
        { name: "React", level: "Components & State Management", tag: "React", icon: "⚛️" },
        { name: "Tailwind CSS", level: "Utility Architecture", tag: "Tailwind", icon: "💨" },
        { name: "GSAP Motion", level: "ScrollTrigger & Physics", tag: "GSAP", icon: "🎬" }
      ]
    },
    {
      id: "backend-2026",
      title: "2026 Backend & Full-Stack Frontier",
      subtitle: "Active deep dive into scalable server architecture, relational data, and cloud APIs.",
      icon: "🛠️",
      accent: "teal",
      skills: [
        { name: "Node.js", level: "Server-Side Runtimes & Async IO", tag: "Backend", icon: "🟢" },
        { name: "Express.js", level: "REST API Design & Middleware", tag: "Backend", icon: "🚂" },
        { name: "PostgreSQL", level: "Relational Modeling & Queries", tag: "Database", icon: "🐘" },
        { name: "Supabase", level: "Auth, Realtime & Storage", tag: "Cloud", icon: "⚡" },
        { name: "Git & GitHub", level: "Git Workflows & CI/CD", tag: "DevOps", icon: "🐙" },
        { name: "RESTful Architecture", level: "API Security & CRUD Contracts", tag: "API", icon: "🔌" }
      ]
    },
    {
      id: "ai-prompting",
      title: "Prompt Engineering & Frontier AI",
      subtitle: "Structured reasoning, multi-turn system prompts, and collaborative LLM architecture.",
      icon: "🧠",
      accent: "gold",
      skills: [
        { name: "Claude 3.7 / 3.5 Sonnet", level: "Extended Thinking & Code Synthesis", tag: "LLMs", icon: "⚡" },
        { name: "ChatGPT (o-series)", level: "Deep Reasoning & Architecture", tag: "LLMs", icon: "🤖" },
        { name: "Chain-of-Thought (CoT)", level: "Structured Stepwise Prompts", tag: "Prompting", icon: "🔗" },
        { name: "Few-Shot Prompting", level: "Exemplar Alignment & Guardrails", tag: "Prompting", icon: "🎯" },
        { name: "System Prompt Design", level: "Persona & Boundary Architecture", tag: "Prompting", icon: "🛡️" }
      ]
    },
    {
      id: "ai-automation",
      title: "AI Automation & Vibe Coding",
      subtitle: "Autonomous agent pipelines, automated workflow orchestration, and flow-state shipping.",
      icon: "🚀",
      accent: "purple",
      skills: [
        { name: "AI Automations & n8n", level: "Multi-Step Workflow Automations", tag: "Automation", icon: "⚙️" },
        { name: "Agentic Pipelines", level: "Autonomous Agent Orchestration", tag: "Agents", icon: "🤖" },
        { name: "Vibe Coding", level: "Flow-State Natural Language Dev", tag: "Vibe", icon: "✨" },
        { name: "Bolt AI & v0", level: "Rapid Full-Stack Prototyping", tag: "Prototyping", icon: "⚡" }
      ]
    }
  ],

  // -----------------------------------------------------------------------
  // SERVICES OFFERED
  // -----------------------------------------------------------------------
  services: [
    {
      num: "01",
      title: "Frontend Development",
      desc: "Pixel-perfect, accessible, and high-performance interfaces built with modern HTML5, CSS3, and JavaScript.",
      icon: "💻"
    },
    {
      num: "02",
      title: "Responsive Web Design",
      desc: "Flawless viewing experiences calibrated for smartphones, tablets, laptops, and ultra-wide desktop monitors.",
      icon: "📱"
    },
    {
      num: "03",
      title: "Landing Pages & Portfolios",
      desc: "High-impact, memorable web presences designed to showcase products or personal brands with distinctive personality.",
      icon: "🚀"
    },
    {
      num: "04",
      title: "AI Prompt Engineering",
      desc: "Precision prompts and system instructions for Claude, ChatGPT, and reasoning models to automate complex workflows.",
      icon: "🤖"
    },
    {
      num: "05",
      title: "AI-Assisted Prototyping",
      desc: "Accelerating the journey from wireframe to functioning digital product using modern AI dev engines like Bolt AI and v0.",
      icon: "⚡"
    },
    {
      num: "06",
      title: "UI Polish & Optimization",
      desc: "Refining visual hierarchy, micro-interactions, accessibility contrast, and typography balance for existing web apps.",
      icon: "✨"
    }
  ],

  // -----------------------------------------------------------------------
  // LEARNING JOURNEY TIMELINE
  // -----------------------------------------------------------------------
  timeline: [
    {
      year: "2022",
      period: "The Foundation",
      title: "First Line of Code",
      desc: "Embarked on the Computer Science journey. Discovered HTML & CSS, falling in love with the magic of bringing ideas to life on the web canvas.",
      icon: "🌱"
    },
    {
      year: "2023",
      period: "Skill Acceleration",
      title: "Frontend Deep Dive & Git Mastery",
      desc: "Mastered responsive layout systems, Bootstrap, and core JavaScript. Began building real-world landing pages, interactive UIs, and maintaining Git version control on GitHub.",
      icon: "⚡"
    },
    {
      year: "2024",
      period: "The AI Turning Point",
      title: "AI-Assisted Development & Prompt Craft",
      desc: "Embraced generative AI dev tools. Focused intently on Prompt Engineering with Claude and ChatGPT, turning AI into a daily collaborative partner.",
      icon: "🤖"
    },
    {
      year: "2025",
      period: "Frontier Acceleration",
      title: "Building at the Intersection of Code & AI",
      desc: "Merged deep frontend engineering with modern AI engines (Bolt AI, v0, Claude 3.7). Shipped high-impact digital products and earned Google AI and Prompting specializations.",
      icon: "🚀"
    },
    {
      year: "2026",
      period: "Active Frontier",
      title: "Backend Engineering & AI Automation Exploration",
      desc: "Actively mastering Node.js, Express, and PostgreSQL/Supabase to build scalable full-stack web applications. Exploring AI automation pipelines, autonomous agent workflows (n8n, LangChain), and real-time intelligent developer tooling.",
      icon: "⚡"
    }
  ]
};

// Export to global scope for client-side rendering
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
