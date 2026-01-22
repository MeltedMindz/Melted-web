"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  baseOpacity: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number, dpr: number;
    let particles: Particle[] = [];
    let animationId: number;
    let mouse = { x: null as number | null, y: null as number | null };

    // Detect mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const settings = {
      particleCount: isMobile ? 25 : 45,
      connectionDistance: isMobile ? 70 : 90,
      mouseRadius: 100,
      speed: isMobile ? 0.15 : 0.25,
    };

    function resize() {
      const rect = canvas!.parentElement?.getBoundingClientRect();
      if (!rect) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";

      ctx!.scale(dpr, dpr);
      initParticles();
    }

    function createParticle(): Particle {
      const radius = Math.random() * 1.5 + 0.5;
      const opacity = Math.random() * 0.35 + 0.1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * settings.speed,
        vy: (Math.random() - 0.5) * settings.speed,
        radius,
        baseRadius: radius,
        opacity,
        baseOpacity: opacity,
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < settings.particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function updateParticle(p: Particle) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      if (!isMobile && mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < settings.mouseRadius && dist > 0) {
          const force = (settings.mouseRadius - dist) / settings.mouseRadius;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }
      }
    }

    function drawParticle(p: Particle) {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(245, 245, 244, ${p.opacity})`;
      ctx!.fill();
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < settings.connectionDistance) {
            const opacity = (1 - dist / settings.connectionDistance) * 0.08;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(245, 245, 244, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        updateParticle(p);
        drawParticle(p);
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    function handlePointer(e: MouseEvent | TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const clientX =
        "clientX" in e ? e.clientX : e.touches?.[0]?.clientX;
      const clientY =
        "clientY" in e ? e.clientY : e.touches?.[0]?.clientY;
      if (clientX && clientY) {
        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;
      }
    }

    function clearPointer() {
      mouse.x = null;
      mouse.y = null;
    }

    // Event listeners
    canvas.addEventListener("mousemove", handlePointer, { passive: true });
    canvas.addEventListener("touchmove", handlePointer as EventListener, { passive: true });
    canvas.addEventListener("mouseleave", clearPointer);
    canvas.addEventListener("touchend", clearPointer);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Visibility API
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Initialize
    if (prefersReducedMotion) {
      resize();
      particles.forEach(drawParticle);
      drawConnections();
    } else {
      resize();
      animate();
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handlePointer);
      canvas.removeEventListener("touchmove", handlePointer as EventListener);
      canvas.removeEventListener("mouseleave", clearPointer);
      canvas.removeEventListener("touchend", clearPointer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}
