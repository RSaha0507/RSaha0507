import React, { useEffect, useRef } from 'react';

interface SkillSphereProps {
  skills: string[];
}

export const SkillSphere: React.FC<SkillSphereProps> = ({ skills }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 360);

    const radius = Math.min(width, height) * 0.4;
    const count = skills.length;

    interface Tag {
      text: string;
      x: number;
      y: number;
      z: number;
      phi: number;
      theta: number;
    }

    const tags: Tag[] = skills.map((text, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        text,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        phi,
        theta,
      };
    });

    let angleX = 0.003;
    let angleY = 0.003;
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
      mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
      angleY = mouseX * 0.015;
      angleX = -mouseY * 0.015;
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      angleX = 0.003;
      angleY = 0.003;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 360;
      height = canvas.height = canvas.parentElement.clientHeight || 360;
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      // Sort tags by z so front tags render over back tags
      tags.sort((a, b) => b.z - a.z);

      tags.forEach((tag) => {
        // Rotate around Y
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.x * sinY;

        // Rotate around X
        const y1 = tag.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.y * sinX;

        tag.x = x1;
        tag.y = y1;
        tag.z = z2;

        const scale = (z2 + 2 * radius) / (2.5 * radius);
        const alpha = Math.max(0.2, (z2 + radius) / (2 * radius));
        const fontSize = Math.max(10, Math.floor(13 * scale));

        const screenX = width / 2 + x1;
        const screenY = height / 2 + y1;

        ctx.font = `600 ${fontSize}px 'Inter', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (alpha > 0.7) {
          ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(203, 213, 225, ${alpha * 0.8})`;
        }

        ctx.fillText(tag.text, screenX, screenY);
      });

      if (!isHovering) {
        angleX = 0.002;
        angleY = 0.003;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [skills]);

  return (
    <div className="w-full h-80 md:h-96 flex items-center justify-center">
      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing w-full h-full max-w-[420px] max-h-[420px]" />
    </div>
  );
};
