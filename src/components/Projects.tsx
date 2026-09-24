import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  X,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GithubIcon, PythonIcon, ReactIcon, PyTorchIcon, DatabaseIcon, SparklesTechIcon, CpuIcon, ShieldLockIcon, LayersIcon } from './Icons';
import { projectList, ProjectItem, TechStackItem } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when opening a new modal
  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setActiveImageIndex(0);
  };

  // Keyboard shortcut (Escape) and background scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const renderTechIcon = (iconType: string, className = "w-4 h-4") => {
    switch (iconType) {
      case 'python':
        return <PythonIcon className={className} />;
      case 'react':
        return <ReactIcon className={className} />;
      case 'pytorch':
        return <PyTorchIcon className={className} />;
      case 'database':
        return <DatabaseIcon className={className} />;
      case 'sparkles':
        return <SparklesTechIcon className={className} />;
      case 'cpu':
        return <CpuIcon className={className} />;
      case 'shield':
        return <ShieldLockIcon className={className} />;
      case 'layers':
      default:
        return <LayersIcon className={className} />;
    }
  };

  return (
    <section id="projects" className="section py-20 border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-amber-400 font-semibold text-sm tracking-wider uppercase mb-2 flex items-center justify-center gap-1.5 text-glow-amber">
          <Sparkles className="w-4 h-4" />
          <span>Portfolio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Featured Projects
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          A selection of machine learning models, cybersecurity tools, and full-stack web applications. Click any card for in-depth architecture and tech specs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projectList.map((project) => (
          <div
            key={project.id}
            onClick={() => openModal(project)}
            className="glass-card project-card overflow-hidden flex flex-col border-slate-800 group rounded-2xl cursor-pointer"
          >
            {/* Ambient backlight glow on hover */}
            <div className="project-glow-ambient" />

            {/* Image Preview with Hover Zoom & Action Pill */}
            <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900 z-10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Top View Indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-amber-500/30 shadow-lg">
                <Maximize2 className="w-3 h-3" />
                <span>Quick View</span>
              </div>

              {/* Tech Tags */}
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold bg-slate-900/90 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between z-10 relative bg-slate-900/40 backdrop-blur-sm">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                  <span>Explore Details</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="View GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  {project.live_link && project.live_link !== '#' && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="glass-card w-full max-w-4xl bg-slate-900/95 border border-slate-700 shadow-2xl rounded-2xl max-h-[92vh] flex flex-col overflow-hidden relative my-auto animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-900/70 shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedProject.tagline}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
              {/* Expanded Image Gallery / Carousel */}
              <div className="space-y-3">
                <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                  <img
                    src={selectedProject.gallery[activeImageIndex]?.url || selectedProject.image}
                    alt={selectedProject.gallery[activeImageIndex]?.title || selectedProject.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Image Navigation Arrows */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-lg border border-slate-700 cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) =>
                            prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-lg border border-slate-700 cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Caption */}
                  <div className="absolute bottom-3 left-4 right-4 text-left">
                    <p className="text-white font-bold text-sm sm:text-base">
                      {selectedProject.gallery[activeImageIndex]?.title}
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      {selectedProject.gallery[activeImageIndex]?.caption}
                    </p>
                  </div>
                </div>

                {/* Thumbnails */}
                {selectedProject.gallery.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {selectedProject.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative rounded-lg overflow-hidden h-16 w-24 sm:h-20 sm:w-32 shrink-0 border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics Highlights Bar */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedProject.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="glass-card p-4 rounded-xl border-slate-800/90 text-center bg-slate-900/60"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-amber-400">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* In-depth Overview */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Project Overview & Architecture</span>
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {selectedProject.solutionArchitecture && (
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                      Technical Solution
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.solutionArchitecture}
                    </p>
                  </div>
                )}
              </div>

              {/* Key Features */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Key Features & Capabilities</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/30 border border-slate-800/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-xs sm:text-sm leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Stack with Icons */}
              <div className="space-y-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Technical Stack & Tools</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedProject.techStackDetails.map((tech: TechStackItem, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        {renderTechIcon(tech.iconType)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{tech.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{tech.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Action CTA */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm border border-slate-700 shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
                {selectedProject.live_link && selectedProject.live_link !== '#' && (
                  <a
                    href={selectedProject.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm shadow-md shadow-amber-500/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
