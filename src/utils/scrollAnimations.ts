import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(): () => void {
  // Accessibility check: Prefers reduced motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show all elements immediately
    document.querySelectorAll('.section').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    // 1. General Pattern: Every .section reveals on enter
    const sections = gsap.utils.toArray<HTMLElement>('.section');
    sections.forEach((section) => {
      // Exclude #home from standard rise since #home has custom scroll scrub parallax
      if (section.id === 'home') return;

      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 2. #home (Hero): Parallax fade & scale-out as user scrolls past it
    const heroContent = document.querySelector('#home .hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: 80,
        opacity: 0.25,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // 3. #experience: Alternating timeline cards sliding in from left/right
    const leftCards = gsap.utils.toArray<HTMLElement>('#experience .timeline-card-left');
    const rightCards = gsap.utils.toArray<HTMLElement>('#experience .timeline-card-right');

    leftCards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power2.out',
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
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 4. #skills: Trigger .skill-bar-fill width animation on enter
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

    // 5. #awards: Grid cards stagger in
    const awardCards = gsap.utils.toArray<HTMLElement>('#awards .award-card');
    if (awardCards.length > 0) {
      gsap.fromTo(
        awardCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#awards',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 6. #contact: Soft landing with subtle emphasis pulse on CTA button
    const contactCta = document.querySelector('#contact .contact-cta-btn');
    if (contactCta) {
      gsap.fromTo(
        contactCta,
        { scale: 0.92, filter: 'drop-shadow(0 0 0px rgba(245, 158, 11, 0))' },
        {
          scale: 1,
          filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.45))',
          duration: 0.9,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
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
