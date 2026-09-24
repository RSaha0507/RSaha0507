import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(): () => void {
  // Accessibility check: Prefers reduced motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.section').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. General Section Reveal: Crystal-clear opacity & upward drift with NO CSS filter/blur
    const sections = gsap.utils.toArray<HTMLElement>('.section');
    sections.forEach((section) => {
      if (section.id === 'home') return;

      // Section Header (Titles, Subtitles, Badges)
      const sectionHeader = section.querySelector(':scope > div:first-child');
      if (sectionHeader) {
        gsap.fromTo(
          sectionHeader,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Section Body / Content Blocks
      const sectionBody = section.querySelectorAll(':scope > div:not(:first-child)');
      if (sectionBody.length > 0) {
        gsap.fromTo(
          sectionBody,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // 2. #home (Hero): Parallax fade & scale-out on deep scroll
    const heroContent = document.querySelector('#home .hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: 60,
        opacity: 0.25,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // 3. #about: Staggered reveal for summary metrics & realm pills
    const aboutPills = gsap.utils.toArray<HTMLElement>('#about .glass-card');
    if (aboutPills.length > 0) {
      gsap.fromTo(
        aboutPills,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 4. #education: Cards entrance with smooth scale
    const eduCards = gsap.utils.toArray<HTMLElement>('#education .glass-card');
    if (eduCards.length > 0) {
      gsap.fromTo(
        eduCards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#education',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 5. #experience: Alternating timeline cards sliding in from left/right
    const leftCards = gsap.utils.toArray<HTMLElement>('#experience .timeline-card-left');
    const rightCards = gsap.utils.toArray<HTMLElement>('#experience .timeline-card-right');

    leftCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: -45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    rightCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: 45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 6. #skills: Cascading skill item cards reveal & bar triggers
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 75%',
      onEnter: () => {
        const skillBars = document.querySelectorAll<HTMLElement>('.skill-bar-fill');
        skillBars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-proficiency');
          if (targetWidth) {
            bar.style.width = `${targetWidth}%`;
          }
        });
      },
    });

    const skillCards = gsap.utils.toArray<HTMLElement>('#skills .grid > div');
    if (skillCards.length > 0) {
      gsap.fromTo(
        skillCards,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 7. #projects: Project cards cascading entrance
    const projectCards = gsap.utils.toArray<HTMLElement>('#projects .grid > div');
    if (projectCards.length > 0) {
      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 8. #awards: Grid cards stagger in
    const awardCards = gsap.utils.toArray<HTMLElement>('#awards .award-card');
    if (awardCards.length > 0) {
      gsap.fromTo(
        awardCards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#awards',
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 9. #contact: Smooth entrance with clearProps
    const contactContainer = document.querySelector('#contact .max-w-2xl');
    if (contactContainer) {
      gsap.fromTo(
        contactContainer,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });

  return () => {
    ctx.revert();
  };
}
