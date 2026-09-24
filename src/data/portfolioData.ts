export interface EducationItem {
  degree: string;
  institution: string;
  date: string;
  gpa: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  description: string;
}

export interface SkillItem {
  name: string;
  proficiency: number;
  usage: number;
}

export interface TechStackItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & ML' | 'Database' | 'Cloud & Tools';
  iconType: string;
}

export interface ProjectGalleryImage {
  url: string;
  title: string;
  caption: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  problemStatement?: string;
  solutionArchitecture?: string;
  tech: string[];
  techStackDetails: TechStackItem[];
  features: string[];
  metrics: ProjectMetric[];
  github: string;
  live_link: string;
  image: string;
  gallery: ProjectGalleryImage[];
}

export interface AwardItem {
  award: string;
  issuer: string;
}

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Technology in CSE",
    institution: "National Institute of Technology Meghalaya, Sohra",
    date: "2022 - 2026",
    gpa: "CGPA: 9.39"
  }
];

export const experienceData: ExperienceItem[] = [
  {
    role: "Summer Research Intern (SURAJ)",
    company: "IIT Jodhpur",
    date: "June 2025 - July 2025",
    description: "Analyzed and benchmarked Transformer variants to identify optimal models for low-resource environments, deconstructing architectures to pinpoint computational bottlenecks."
  },
  {
    role: "Data Science & ML Intern",
    company: "My Job Grow (Virtual)",
    date: "Aug 2024 - Oct 2024",
    description: "Engineered and deployed 3 live ML projects, improving predictive accuracy by 25% using supervised and unsupervised models."
  },
  {
    role: "AI/ML Coordinator",
    company: "SanganaKriti - NITM Coding Club",
    date: "Mar 2024 - Present",
    description: "Organized and led over 5 ML workshops and AI awareness sessions for more than 100 students to foster a community of AI enthusiasts."
  },
  {
    role: "Student Convener",
    company: "NITM Astronomy Club",
    date: "Aug 2024 - Present",
    description: "Spearheaded the organization of 3 major club events, successfully increasing student participation by 40%."
  }
];

export const skillsData: Record<string, SkillItem[]> = {
  "Languages & Databases": [
    { name: "Python", proficiency: 95, usage: 90 },
    { name: "C/C++", proficiency: 85, usage: 60 },
    { name: "JavaScript", proficiency: 80, usage: 75 },
    { name: "Java", proficiency: 70, usage: 40 },
    { name: "SQL (MySQL)", proficiency: 80, usage: 50 },
    { name: "NoSQL (MongoDB, Firebase)", proficiency: 85, usage: 70 },
  ],
  "Frameworks & Libraries": [
    { name: "TensorFlow & Keras", proficiency: 90, usage: 85 },
    { name: "PyTorch", proficiency: 90, usage: 85 },
    { name: "Scikit-learn", proficiency: 95, usage: 80 },
    { name: "React.js", proficiency: 80, usage: 60 },
    { name: "Flask", proficiency: 85, usage: 50 },
    { name: "Tailwind CSS", proficiency: 90, usage: 75 },
  ],
  "Tools & Platforms": [
    { name: "Git & GitHub", proficiency: 95, usage: 100 },
    { name: "Vercel & Netlify", proficiency: 90, usage: 80 },
    { name: "Jupyter Notebooks", proficiency: 95, usage: 90 },
    { name: "VSCode", proficiency: 95, usage: 100 },
    { name: "Streamlit", proficiency: 80, usage: 40 },
  ]
};

export const projectList: ProjectItem[] = [
  {
    id: "nirmaya-health",
    title: "Nirmaya Health Services",
    tagline: "AI-Powered Patient Care & Hospital Operations Platform",
    description: "A full-stack single-page web app modernizing patient experience and streamlining hospital administration with an intelligent AI assistant powered by Google Gemini API.",
    longDescription: "Nirmaya Health Services is an end-to-end healthcare management platform built to bridge the communication gap between patients, healthcare providers, and clinical staff. It integrates conversational AI for instant symptom pre-triage, a real-time doctor appointment dispatching engine, and role-based access control for administrative workflows.",
    problemStatement: "Traditional clinical portals often have fragmented scheduling systems, slow triage workflows, and overwhelming user experiences that delay urgent consultations.",
    solutionArchitecture: "Developed a modular React SPA paired with Tailwind CSS for high responsiveness. Integrated Google Gemini models for structured medical symptom parsing, while Firebase delivers real-time synchronizations and strict security rules for patient records.",
    tech: ["React.js", "Tailwind CSS", "Gemini API", "Firebase Auth", "Firestore"],
    techStackDetails: [
      { name: "React.js", category: "Frontend", iconType: "react" },
      { name: "Tailwind CSS", category: "Frontend", iconType: "layers" },
      { name: "Google Gemini API", category: "AI & ML", iconType: "sparkles" },
      { name: "Firebase Auth", category: "Backend", iconType: "shield" },
      { name: "Cloud Firestore", category: "Database", iconType: "database" }
    ],
    features: [
      "AI Symptom Pre-Triage Assistant with contextual suggestions & urgency rating",
      "Dynamic Doctor Appointment Booking with real-time slot locking",
      "Comprehensive Hospital Administration dashboard with patient load metrics",
      "Secure Role-Based Access Control (Patient, Doctor, Administrator)"
    ],
    metrics: [
      { label: "Triage Speed", value: "<1.2s" },
      { label: "UI Response", value: "60 FPS" },
      { label: "Uptime", value: "99.9%" }
    ],
    github: "https://github.com/RSaha0507/Nirmaya-Health-Services",
    live_link: "https://nirmaya-health-services.netlify.app/",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
        title: "Clinical Dashboard Overview",
        caption: "Main portal interface featuring rapid patient intake and operational metrics."
      },
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
        title: "AI Medical Consultation",
        caption: "Interactive Gemini-powered triage interface providing non-emergency symptom classification."
      },
      {
        url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&auto=format&fit=crop&q=80",
        title: "Resource & Doctor Schedule Queue",
        caption: "Real-time doctor calendar and outpatient department management panel."
      }
    ]
  },
  {
    id: "cyber-threat-intel",
    title: "Cyber Threat Intelligence System",
    tagline: "Automated Threat Ingestion, Geolocation & IOC Reputation Scoring",
    description: "A Python-based threat analysis platform integrating real-time APIs (AlienVault OTX, AbuseIPDB) and geolocation to analyze and categorize malicious behavior patterns with 92% accuracy.",
    longDescription: "A proactive cyber threat intelligence engine designed to aggregate, parse, and correlate Indicators of Compromise (IOCs) across distributed threat feeds. The system cross-references IP reputations, domain signatures, and attack vectors in real-time to alert security operations teams before intrusions escalate.",
    problemStatement: "Security Operations Centers (SOCs) are overwhelmed by disjointed threat feeds, high false-positive noise, and manual investigation bottlenecks.",
    solutionArchitecture: "Engineered high-throughput asynchronous scrapers and REST ingestion pipelines in Python. Aggregates data into MongoDB with optimized indexing, and visualizes live security incidents on an interactive Streamlit SOC dashboard with geolocated threat vectors.",
    tech: ["Python", "MongoDB", "Streamlit", "REST APIs", "Scikit-learn"],
    techStackDetails: [
      { name: "Python", category: "Backend", iconType: "python" },
      { name: "Scikit-learn", category: "AI & ML", iconType: "sparkles" },
      { name: "MongoDB", category: "Database", iconType: "database" },
      { name: "Streamlit", category: "Frontend", iconType: "layers" },
      { name: "AlienVault & AbuseIPDB APIs", category: "Cloud & Tools", iconType: "shield" }
    ],
    features: [
      "Real-time IOC ingestion from AlienVault OTX, AbuseIPDB, and IPQualityScore",
      "Automated IP reputation and threat confidence score calculation",
      "Interactive geospatial threat map pinpointing live botnet/C2 origins",
      "Categorical clustering of attack signatures (DDoS, Brute Force, Scanners)"
    ],
    metrics: [
      { label: "Classification Accuracy", value: "92%" },
      { label: "Lookup Latency", value: "<1.5s" },
      { label: "Daily IOCs Ingested", value: "10,000+" }
    ],
    github: "https://github.com/RSaha0507/Cyber-Threat-Intelligence-and-Response-System",
    live_link: "#",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
        title: "Threat Intelligence Live Feed",
        caption: "Automated ingestion pipeline categorizing active malicious IP addresses."
      },
      {
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
        title: "Geospatial Threat Mapping",
        caption: "Global heat map representing geolocation of high-confidence malicious host servers."
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
        title: "IOC Reputation Matrix",
        caption: "Detailed breakdown of autonomous system numbers (ASNs), reverse DNS, and threat categories."
      }
    ]
  },
  {
    id: "lightweight-transformer",
    title: "Lightweight Transformer Model",
    tagline: "Architecture Pruning & Quantization for Low-Resource Edge AI",
    description: "(Ongoing) Developing an efficient transformer architecture for resource-constrained edge hardware, applying structured pruning, quantization, and knowledge distillation.",
    longDescription: "A deep-learning research project originated during research at IIT Jodhpur focusing on compression techniques for Attention mechanisms. The architecture addresses quadratic computational scaling by selectively pruning redundant self-attention heads and applying 8-bit/4-bit INT quantization without degrading semantic coherence.",
    problemStatement: "Standard state-of-the-art Transformer architectures have high parameter counts and memory footprints that prevent deployment on microcontrollers, edge IoT, and mobile devices.",
    solutionArchitecture: "Built using PyTorch and TensorFlow, implementing magnitude-based structured pruning, post-training quantization (PTQ), and Quantization-Aware Training (QAT). Benchmarked on ARM architectures to measure throughput and energy consumption.",
    tech: ["Python", "PyTorch", "TensorFlow", "Quantization", "HuggingFace"],
    techStackDetails: [
      { name: "PyTorch", category: "AI & ML", iconType: "pytorch" },
      { name: "TensorFlow", category: "AI & ML", iconType: "cpu" },
      { name: "Python", category: "AI & ML", iconType: "python" },
      { name: "Quantization & Pruning", category: "AI & ML", iconType: "layers" },
      { name: "Hugging Face Transformers", category: "AI & ML", iconType: "sparkles" }
    ],
    features: [
      "Structured attention-head pruning to reduce multi-head computation complexity",
      "Post-Training Quantization (PTQ) converting weights from FP32 to INT8/INT4",
      "Benchmarked energy and latency metrics across CPU and ARM edge hardware",
      "Minimal perplexity degradation (<1.2%) while achieving near 4x compression"
    ],
    metrics: [
      { label: "Model Compression", value: "3.8x" },
      { label: "CPU Latency Drop", value: "-42%" },
      { label: "Perplexity Delta", value: "<1.2%" }
    ],
    github: "https://github.com/RSaha0507/Lightweight-transformer-for-resource-constrained-environment",
    live_link: "#",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
        title: "Attention Matrix Optimization",
        caption: "Visualizing sparse attention weights after structured pruning passes."
      },
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
        title: "Edge Hardware Profiling",
        caption: "Benchmarking memory footprint and FLOP throughput across edge processor architectures."
      },
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
        title: "Quantization Layer Breakdown",
        caption: "Comparison between FP32 full precision vs INT8 tensor representations."
      }
    ]
  }
];

export const awardsList: AwardItem[] = [
  { award: "Certificate of Merit", issuer: "ML Vision 2024" },
  { award: "GATE 2025 DA Rank 3748", issuer: "GATE Examination" },
  { award: "3rd Position, Inter-departmental Hackathon", issuer: "NIT Meghalaya, 2024" },
  { award: "Certified in Deep Learning (NPTEL)", issuer: "Coursera" },
  { award: "Certificate of Excellence", issuer: "NITM Astronomy Club" }
];
