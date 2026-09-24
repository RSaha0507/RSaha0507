import React from 'react';

export interface TechItemInfo {
  name: string;
  category: 'Languages' | 'Databases' | 'AI & ML' | 'Frameworks' | 'Tools & Platforms' | 'Research & Optimization';
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.FC<{ className?: string }>;
}

export const PythonBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M11.91 2c-5.04 0-4.72 2.18-4.72 2.18l.01 2.26h4.79v.68H5.27S2 6.74 2 11.8s2.86 4.9 2.86 4.9h1.71v-2.41s-.09-2.86 2.81-2.86h4.82s2.68.04 2.68-2.61V5.04s.39-3.04-5.03-3.04zm-2.37 1.73a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z"
      fill="#387eb8"
    />
    <path
      d="M12.09 22c5.04 0 4.72-2.18 4.72-2.18l-.01-2.26H12.01v-.68h6.72s3.27.38 3.27-4.68-2.86-4.9-2.86-4.9h-1.71v2.41s.09 2.86-2.81 2.86H9.71s-2.68-.04-2.68 2.61v3.78s-.39 3.04 5.06 3.04zm2.37-1.73a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7z"
      fill="#ffe052"
    />
  </svg>
);

export const CppBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#00599C" />
    <path d="M12 4.2L4 8.2v7.6l8 4 8-4V8.2L12 4.2z" fill="#004482" />
    <path d="M9.5 8.5C8.1 8.5 7 9.6 7 11v2c0 1.4 1.1 2.5 2.5 2.5 1 0 1.8-.6 2.2-1.4l-1.3-.7c-.2.4-.5.6-.9.6-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1 .4 0 .7.2.9.6l1.3-.7c-.4-.8-1.2-1.4-2.2-1.4z" fill="#ffffff" />
    <path d="M14 11h1v-1h1v1h1v1h-1v1h-1v-1h-1v-1zm4.5 0h1v-1h1v1h1v1h-1v1h-1v-1h-1v-1z" fill="#ffffff" />
  </svg>
);

export const JavaScriptBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path d="M6.5 18.5l2-1.2c.4.7.8 1.2 1.6 1.2.8 0 1.3-.4 1.3-1.4v-6.6h2.5v6.7c0 2.2-1.3 3.3-3.6 3.3-1.9 0-3.1-1-3.8-2M15 18.2l2-1.2c.5.8 1.2 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.8-1.6l-.7-.3c-2-.8-3.3-1.8-3.3-3.9 0-1.9 1.5-3.4 3.7-3.4 1.6 0 2.8.6 3.6 2.1l-1.9 1.2c-.4-.7-.9-1-1.7-1-.8 0-1.3.5-1.3 1.1 0 .7.5 1 1.6 1.5l.7.3c2.3 1 3.5 2 3.5 4.1 0 2.3-1.8 3.7-4.1 3.7-2.3 0-3.8-1.2-4.5-2.7" fill="#000000" />
  </svg>
);

export const JavaBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9.3 18.5s-1.8.2-1.3.8c.8.9 3.5.7 5.5.3 1.9-.4 4.5-1.5 4.5-1.5s-1.2.6-2.5.8c-2.4.4-4.8.4-6.2-.4zm-.8-2.6s-2 .4-1.3 1.2c.9 1 4 .8 6.3.3 2.1-.5 5-1.7 5-1.7s-1.4.7-2.8.9c-2.7.5-5.3.4-7.2-.7zm4-5.3c1.2 1.4-.4 2.6-.4 2.6s3.1-1.6 1.7-3.6c-1.4-2-2.5-3-7.5-5.6 0 0 4 1.7 6.2 6.6zM8.8 8.1S7.4 9.5 8.9 11c1.2 1.2 1.9 1.8 1.9 1.8s-.5-.8-.9-1.4c-.8-1.2-.6-2.1-1.1-3.3zm8.3 6.9c2 .5 3.3.4 3.3.4s-1-.6-2.4-.9c-1.8-.4-4.3-.3-6.2.2-2.2.6-4.4 1.7-4.4 1.7s1.7-.5 3.5-.8c2.4-.4 4.2-.1 6.2.4z" fill="#EA2D2E" />
    <path d="M12.9 2.5s3.2 3.4-3.1 7.4c-5 3.2 0 4.6 0 4.6s-3.7-1.4-1.3-4.1c2.8-3.1 4.4-4.7 4.4-7.9z" fill="#5382A1" />
  </svg>
);

export const SqlBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4z" fill="#00758F" opacity="0.2" />
    <ellipse cx="12" cy="6" rx="10" ry="4" stroke="#00758F" strokeWidth="2" fill="#F29111" />
    <path d="M2 6v6c0 2.21 4.48 4 10 4s10-1.79 10-4V6" stroke="#00758F" strokeWidth="2" />
    <path d="M2 12v6c0 2.21 4.48 4 10 4s10-1.79 10-4v-6" stroke="#00758F" strokeWidth="2" />
  </svg>
);

export const MongoDbBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C12 2 6 7.5 6 13.5C6 17.5 8.8 20.8 12 22C15.2 20.8 18 17.5 18 13.5C18 7.5 12 2 12 2Z" fill="#47A248" />
    <path d="M12 22V2C12 2 12.3 2.3 12.6 2.7C15.5 6.5 17.5 10.5 17.5 13.5C17.5 17.5 15.2 20.8 12 22Z" fill="#499D4A" />
    <path d="M11.9 22C11.6 21.6 11.2 20 11.2 19C11.2 16.5 12 15 12 15C12 15 12.8 16.5 12.8 19C12.8 20 12.4 21.6 12.1 22H11.9Z" fill="#FFFFFF" />
  </svg>
);

export const FirebaseBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M4.6 17.8L7 2.8c.1-.4.6-.6.9-.3l3.6 6.8-6.9 8.5z" fill="#FFA000" />
    <path d="M12.9 8.5l2.2-4.2c.2-.4.8-.4 1 0l3.3 13.5-6.5-9.3z" fill="#F57C00" />
    <path d="M4.6 17.8l7.4 4.2c.4.2.8.2 1.2 0l6.2-4.2-3.3-13.5-11.5 13.5z" fill="#FFCA28" />
    <path d="M12 22l-7.4-4.2L11.5 9.3 12 22z" fill="#FFA000" opacity="0.3" />
  </svg>
);

export const PyTorchBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M13.5 2.5L12 4l3.5 3.5c1.4 1.4 1.4 3.6 0 5-1.4 1.4-3.6 1.4-5 0l-3.5-3.5L8.5 7.5 5 11c-2.8 2.8-2.8 7.2 0 10s7.2 2.8 10 0l5-5-6.5-13.5z" fill="#EE4C2C" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="#EE4C2C" />
  </svg>
);

export const TensorFlowBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2.5L3.5 7.4v9.8L8 14.6V9.8l4-2.3 4 2.3v4.8l4.5 2.6V7.4L12 2.5z" fill="#FF6F00" />
    <path d="M12 11.5l-3.5 2v8l3.5-2 3.5 2v-8l-3.5-2z" fill="#FFA800" />
  </svg>
);

export const ScikitLearnBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#F89939" />
    <path d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5-2.9-6.5-6.5-6.5z" fill="#3499CD" />
    <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
  </svg>
);

export const ReactBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
  </svg>
);

export const FlaskBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v5.5L4.5 18c-.8 1.4.2 3 1.8 3h11.4c1.6 0 2.6-1.6 1.8-3L14 7.5V2" />
    <path d="M8.5 2h7" />
    <path d="M7 15h10" />
    <circle cx="10" cy="17.5" r="0.7" fill="currentColor" />
    <circle cx="13" cy="16.5" r="0.7" fill="currentColor" />
  </svg>
);

export const TailwindBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1 .2 1.7.9 2.5 1.7C14.6 11.5 16 13 19 13c2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1-.2-1.7-.9-2.5-1.7C16.4 7.5 15 6 12 6zm-7 7c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1 .2 1.7.9 2.5 1.7C7.6 18.5 9 20 12 20c2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1-.2-1.7-.9-2.5-1.7C9.4 14.5 8 13 5 13z"
      fill="#38BDF8"
    />
  </svg>
);

export const GitBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l2.7 2.7c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l2.6 2.6c.6-.2 1.3 0 1.8.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.4.4.4.7 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.8.5-1.1V9.9c-.3-.3-.5-.7-.5-1.1 0-.4.2-.8.5-1.1L8.2 5.2 2.4 10.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z"
      fill="#F05032"
    />
  </svg>
);

export const VercelBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L24 22H0L12 2z" />
  </svg>
);

export const NetlifyBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M6.5 12h11M12 6.5v11M3.5 12l8.5-8.5L20.5 12l-8.5 8.5L3.5 12z" stroke="#00C7B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const JupyterBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="6" rx="7" ry="2.5" fill="#F37626" />
    <ellipse cx="12" cy="18" rx="7" ry="2.5" fill="#F37626" />
    <circle cx="17.5" cy="9.5" r="1.5" fill="#6E6E6E" />
    <circle cx="6.5" cy="14.5" r="1.5" fill="#6E6E6E" />
  </svg>
);

export const VSCodeBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M17.5 2.5L6.5 11l-4-3.5L1 9l4 3-4 3 1.5 1.5 4-3.5 11 8.5 5.5-2.5V5L17.5 2.5z" fill="#007ACC" />
    <path d="M17.5 2.5v19L23 19V5l-5.5-2.5zm-11 8.5l7.5-6v14l-7.5-6v-2z" fill="#0065A9" />
  </svg>
);

export const StreamlitBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3l9 16.5H3L12 3z" fill="#FF4B4B" />
    <path d="M12 9l4.5 8.5h-9L12 9z" fill="#FFFFFF" opacity="0.3" />
  </svg>
);

export const HuggingFaceBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FFD21E" />
    <circle cx="8.5" cy="9.5" r="1.5" fill="#000000" />
    <circle cx="15.5" cy="9.5" r="1.5" fill="#000000" />
    <path d="M8 14.5c1 1.5 2.5 2.2 4 2.2s3-.7 4-2.2" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5.5 10c0-1 1-1.5 2-1M18.5 10c0-1-1-1.5-2-1" stroke="#FF9D00" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const QuantizationIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9M15 21V9" />
    <circle cx="6" cy="6" r="1" fill="#A855F7" />
    <circle cx="12" cy="6" r="1" fill="#A855F7" />
    <circle cx="18" cy="6" r="1" fill="#A855F7" />
  </svg>
);

export const PruningIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

export const TransformerIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
    <circle cx="12" cy="12" r="2" fill="#38BDF8" />
  </svg>
);

// Unified Tech Map
export const techInfoMap: Record<string, TechItemInfo> = {
  "Python": {
    name: "Python",
    category: "Languages",
    color: "#387eb8",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: PythonBrandIcon,
  },
  "C/C++": {
    name: "C/C++",
    category: "Languages",
    color: "#00599C",
    bgColor: "bg-sky-600/10",
    borderColor: "border-sky-600/30",
    icon: CppBrandIcon,
  },
  "JavaScript": {
    name: "JavaScript",
    category: "Languages",
    color: "#F7DF1E",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    icon: JavaScriptBrandIcon,
  },
  "Java": {
    name: "Java",
    category: "Languages",
    color: "#EA2D2E",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: JavaBrandIcon,
  },
  "SQL (MySQL)": {
    name: "SQL (MySQL)",
    category: "Databases",
    color: "#00758F",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    icon: SqlBrandIcon,
  },
  "NoSQL (MongoDB, Firebase)": {
    name: "NoSQL (MongoDB, Firebase)",
    category: "Databases",
    color: "#47A248",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: MongoDbBrandIcon,
  },
  "MongoDB": {
    name: "MongoDB",
    category: "Databases",
    color: "#47A248",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: MongoDbBrandIcon,
  },
  "Firebase": {
    name: "Firebase",
    category: "Databases",
    color: "#FFA000",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: FirebaseBrandIcon,
  },
  "TensorFlow & Keras": {
    name: "TensorFlow & Keras",
    category: "AI & ML",
    color: "#FF6F00",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: TensorFlowBrandIcon,
  },
  "PyTorch": {
    name: "PyTorch",
    category: "AI & ML",
    color: "#EE4C2C",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: PyTorchBrandIcon,
  },
  "Scikit-learn": {
    name: "Scikit-learn",
    category: "AI & ML",
    color: "#F89939",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: ScikitLearnBrandIcon,
  },
  "React.js": {
    name: "React.js",
    category: "Frameworks",
    color: "#61DAFB",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    icon: ReactBrandIcon,
  },
  "Flask": {
    name: "Flask",
    category: "Frameworks",
    color: "#FFFFFF",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
    icon: FlaskBrandIcon,
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    category: "Frameworks",
    color: "#38BDF8",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    icon: TailwindBrandIcon,
  },
  "Git & GitHub": {
    name: "Git & GitHub",
    category: "Tools & Platforms",
    color: "#F05032",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: GitBrandIcon,
  },
  "Vercel & Netlify": {
    name: "Vercel & Netlify",
    category: "Tools & Platforms",
    color: "#00C7B7",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    icon: NetlifyBrandIcon,
  },
  "Jupyter Notebooks": {
    name: "Jupyter Notebooks",
    category: "Tools & Platforms",
    color: "#F37626",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: JupyterBrandIcon,
  },
  "VSCode": {
    name: "VSCode",
    category: "Tools & Platforms",
    color: "#007ACC",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: VSCodeBrandIcon,
  },
  "Streamlit": {
    name: "Streamlit",
    category: "Tools & Platforms",
    color: "#FF4B4B",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    icon: StreamlitBrandIcon,
  },
  "Transformers": {
    name: "Transformers",
    category: "AI & ML",
    color: "#FFD21E",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    icon: HuggingFaceBrandIcon,
  },
  "Quantization": {
    name: "Quantization",
    category: "Research & Optimization",
    color: "#A855F7",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: QuantizationIcon,
  },
  "Model Pruning": {
    name: "Model Pruning",
    category: "Research & Optimization",
    color: "#EC4899",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    icon: PruningIcon,
  },
};

export const getTechItem = (name: string): TechItemInfo => {
  if (techInfoMap[name]) return techInfoMap[name];
  // fuzzy match
  for (const key of Object.keys(techInfoMap)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return techInfoMap[key];
    }
  }
  return {
    name,
    category: 'Tools & Platforms',
    color: '#F59E0B',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    icon: TransformerIcon,
  };
};
