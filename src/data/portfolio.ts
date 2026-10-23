export interface QuickFact {
  label: string;
  value: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  tech: string[];
  bullets: string[];
  // TODO [PLACEHOLDER]: Owner to fill with repository and live deployment URLs
  githubUrl?: string;
  liveUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    title: string;
    tagline: string;
    // TODO [PLACEHOLDER]: Owner to fill with current city, currently renders fallback gracefully
    cityPlaceholder?: string;
    location: string;
    email: string;
    linkedinUrl: string;
    // TODO [PLACEHOLDER]: Owner to provide GitHub profile URL
    githubUrl?: string;
    // TODO [PLACEHOLDER: Profile photo]: Replace with URL or place photo at /public/profile.jpg
    profilePhoto?: string;
    resumePath: string;
    availabilityStatus: string;
  };
  about: {
    summary: string;
    quickFacts: QuickFact[];
  };
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  currentlyLearning: string[];
}

export const portfolioData: PortfolioData = {
  identity: {
    name: 'Varun Sai',
    title: 'Software Engineer (Java, Spring Boot, React)',
    tagline: 'I build and ship full-stack web applications with Java, Spring Boot, and React.',
    // TODO [PLACEHOLDER: current city]: Owner to replace with specific city name
    cityPlaceholder: '',
    location: 'India',
    email: 'varunsaiv0713@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/varun-sai-6379aa242/',
    // TODO [PLACEHOLDER: GitHub profile URL]: Owner to replace with exact GitHub profile link
    githubUrl: '',
    // TODO [PLACEHOLDER: Profile photo]: Replace with photo URL or drop your image into public/profile.jpg
    profilePhoto: '',
    resumePath: '/Varunsai_Associate_Engineer%20.pdf',
    availabilityStatus: 'Open to Software Engineer opportunities',
  },
  about: {
    summary:
      'Software Engineer with hands-on experience developing and troubleshooting REST APIs and web applications using Java, Spring Boot, React.js, and SQL. Experienced in backend development, API integration, database operations, application security, debugging, and Agile software development. Strong problem-solving and analytical skills with an interest in platform monitoring, incident troubleshooting, and reliable production systems.',
    quickFacts: [
      { label: 'Primary Focus', value: 'Full-Stack REST APIs & Web Applications' },
      { label: 'Core Stack', value: 'Java, Spring Boot, React.js, SQL' },
      { label: 'Location', value: 'India' },
      { label: 'Specialization', value: 'API Design, App Security & System Reliability' },
    ],
  },
  skills: [
    {
      title: 'Languages',
      skills: ['Java', 'Python', 'JavaScript'],
    },
    {
      title: 'Frontend',
      skills: ['React.js', 'HTML5', 'CSS3', 'Figma', 'Tailwind CSS'],
    },
    {
      title: 'Backend',
      skills: ['Spring Boot', 'Spring Security', 'Hibernate', 'REST APIs'],
    },
    {
      title: 'Databases',
      skills: ['MySQL', 'PostgreSQL'],
    },
    {
      title: 'Cloud & DevOps',
      skills: ['Google Cloud (GCP)', 'Git', 'GitHub', 'Jenkins (CI/CD)', 'Docker', 'Kubernetes'],
    },
    {
      title: 'Concepts',
      skills: ['OOP', 'Microservices', 'Logging & Monitoring'],
    },
    {
      title: 'Testing & Monitoring',
      skills: ['Postman', 'JUnit', 'Prometheus'],
    },
  ],
  experience: [
    {
      role: 'Associate Software Engineer',
      company: 'Oppty Techhub Private Limited',
      period: 'Oct 2025 to Sep 2026',
      bullets: [
        'Architected a full-stack HRMS using React.js, Spring Boot, and MySQL covering employee records, attendance, leave, and payroll workflows, reducing manual administrative effort by about 40%.',
        'Designed and delivered 10+ production REST APIs with Spring Boot and Hibernate, implementing efficient data access layers and improving system response performance.',
        'Secured the application using Spring Security with JWT-based authentication and RBAC across 3+ user roles; managed the codebase using Git in an Agile sprint workflow.',
      ],
    },
    {
      role: 'Data Analysis Intern',
      company: 'Allied Market Research',
      period: 'May 2024 to July 2024',
      bullets: [
        'Performed exploratory data analysis using Python and SQL to identify market trends and delivered actionable insights.',
        'Conducted primary and secondary research and structured findings to support data-driven decision-making across market segments.',
        'Visualised market trends and patterns using Matplotlib to support clear data-driven reporting.',
      ],
    },
  ],
  projects: [
    {
      id: 'devconnect',
      title: 'DevConnect: Developer Collaboration Platform',
      tagline: 'Developer collaboration and community networking platform',
      year: '2026',
      role: 'Full Stack Developer',
      tech: ['React.js', 'Tailwind CSS', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT'],
      bullets: [
        'Developed RESTful API endpoints using Spring Boot and Hibernate with backend validation on a normalized PostgreSQL schema.',
        'Implemented JWT-based authentication and role-based access control (RBAC) to secure API routes and enforce user-level permissions.',
        'Translated Figma wireframes into a responsive, component-driven React.js and Tailwind CSS interface.',
      ],
      // TODO [PLACEHOLDER]: Owner to fill with live demo & GitHub repo URLs when published
      githubUrl: '',
      liveUrl: '',
    },
    {
      id: 'taskflow',
      title: 'TaskFlow: Team Task Management System',
      tagline: 'Component-driven team task tracker and dashboard system',
      year: '2026',
      role: 'Frontend Developer',
      tech: ['React.js', 'Tailwind CSS'],
      bullets: [
        'Built responsive dashboards and UI screens with a clean, reusable component architecture.',
        'Created dynamic UI features including task cards, progress indicators, and team views with seamless navigation across devices.',
      ],
      // TODO [PLACEHOLDER]: Owner to fill with live demo & GitHub repo URLs when published
      githubUrl: '',
      liveUrl: '',
    },
  ],
  education: [
    {
      institution: 'Gitam Institute of Technology',
      degree: 'B.Tech in Electronics and Communication Engineering',
      period: '2021 to 2025',
      location: 'Bengaluru, India',
    },
    {
      institution: 'Vignan Junior College',
      degree: 'Higher Secondary (12th)',
      period: '2019 to 2021',
      location: 'Guntur, India',
    },
  ],
  // TODO [PLACEHOLDER: owner fills with real items, for example "Data structures and algorithms practice", "A RAG-based assistant project"]
  // Note: If empty, the component will cleanly hide the entire section.
  currentlyLearning: [
    'Data structures and algorithms practice',
    'Cloud-native microservices architecture & Kubernetes',
    'Spring Boot 3 observability & Grafana',
  ],
};
