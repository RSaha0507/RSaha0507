import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Awards', href: '#awards' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4">
      <nav
        className={`max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-card shadow-2xl border border-slate-700/80 bg-slate-900/80'
            : 'glass-card bg-slate-900/50'
        }`}
      >
        <a href="#" className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>Rounak Saha</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/static/Rounak_Resume_N5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md hover:shadow-amber-500/20"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 glass-card p-4 flex flex-col space-y-3 bg-slate-900/95 border border-slate-700 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 py-1.5 px-3 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/static/Rounak_Resume_N5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </a>
        </div>
      )}
    </header>
  );
};
