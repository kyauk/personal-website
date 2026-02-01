import { useRef, useEffect, useState } from 'react';

export default function F1Cursor() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef([]);
  const angleRef = useRef(-Math.PI / 4);
  const skipFramesRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Only update prev if we're not skipping frames
      if (skipFramesRef.current === 0) {
        prevMouseRef.current = { ...mouseRef.current };
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      mouseRef.current = { x: -100, y: -100 };
      prevMouseRef.current = { x: -100, y: -100 };
      particlesRef.current = [];
    };

    const handleVisibilityChange = () => {
      // Clear everything and skip frames on any visibility change
      particlesRef.current = [];
      skipFramesRef.current = 5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleWindowBlur = () => {
      particlesRef.current = [];
      skipFramesRef.current = 5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleWindowFocus = () => {
      particlesRef.current = [];
      skipFramesRef.current = 5;
      // Sync positions
      prevMouseRef.current = { ...mouseRef.current };
    };

    const createParticle = (x, y, vx, vy) => {
      return {
        x,
        y,
        vx: vx + (Math.random() - 0.5) * 0.3,
        vy: vy + (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: 0.02 + Math.random() * 0.015,
        size: 1.5 + Math.random() * 2,
      };
    };

    const lerpAngle = (current, target, factor) => {
      let diff = target - current;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      return current + diff * factor;
    };

    const drawF1Car = (x, y, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);

      const scale = 0.6;
      ctx.scale(scale, scale);

      ctx.fillStyle = 'rgba(200, 40, 40, 0.95)';
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(3, -10);
      ctx.lineTo(4, -4);
      ctx.lineTo(6, -2);
      ctx.lineTo(6, 4);
      ctx.lineTo(4, 6);
      ctx.lineTo(5, 12);
      ctx.lineTo(7, 14);
      ctx.lineTo(7, 16);
      ctx.lineTo(-7, 16);
      ctx.lineTo(-7, 14);
      ctx.lineTo(-5, 12);
      ctx.lineTo(-4, 6);
      ctx.lineTo(-6, 4);
      ctx.lineTo(-6, -2);
      ctx.lineTo(-4, -4);
      ctx.lineTo(-3, -10);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(80, 80, 85, 0.9)';
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(2.5, -6);
      ctx.lineTo(2.5, 3);
      ctx.lineTo(-2.5, 3);
      ctx.lineTo(-2.5, -6);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(50, 50, 55, 0.95)';
      ctx.fillRect(-8, -6, 16, 1.5);
      ctx.fillRect(-8, 13, 16, 2);

      ctx.fillStyle = 'rgba(25, 25, 25, 1)';
      ctx.fillRect(-8, -5, 2, 4);
      ctx.fillRect(6, -5, 2, 4);
      ctx.fillRect(-9, 8, 2.5, 5);
      ctx.fillRect(6.5, 8, 2.5, 5);

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Skip frames after focus change to let things settle
      if (skipFramesRef.current > 0) {
        skipFramesRef.current--;
        prevMouseRef.current = { ...mouseRef.current };
        // Just draw the car, no particles
        const mouse = mouseRef.current;
        if (isVisible && mouse.x > 0 && mouse.y > 0) {
          drawF1Car(mouse.x, mouse.y, angleRef.current);
        }
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const mouse = mouseRef.current;
      const prevMouse = prevMouseRef.current;

      // Calculate velocity with a max cap to prevent huge spikes
      let vx = (mouse.x - prevMouse.x) * 0.1;
      let vy = (mouse.y - prevMouse.y) * 0.1;

      // Cap velocity to prevent glitchy streaks
      const maxVel = 3;
      const vel = Math.sqrt(vx * vx + vy * vy);
      if (vel > maxVel) {
        vx = (vx / vel) * maxVel;
        vy = (vy / vel) * maxVel;
      }

      const speed = Math.sqrt(vx * vx + vy * vy);

      let targetAngle = angleRef.current;
      if (speed > 0.05) {
        targetAngle = Math.atan2(mouse.y - prevMouse.y, mouse.x - prevMouse.x);
      }

      angleRef.current = lerpAngle(angleRef.current, targetAngle, 0.08);

      // Only add particles if speed is reasonable (not a teleport)
      if (speed > 0.08 && speed < 2 && isVisible) {
        const rearOffset = 12;
        const emitX = mouse.x - Math.cos(angleRef.current) * rearOffset;
        const emitY = mouse.y - Math.sin(angleRef.current) * rearOffset;

        const particleCount = Math.min(2, Math.floor(speed * 1.5) + 1);
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(
            createParticle(
              emitX + (Math.random() - 0.5) * 4,
              emitY + (Math.random() - 0.5) * 4,
              -vx * 0.2,
              -vy * 0.2
            )
          );
        }
      }

      if (particlesRef.current.length > 60) {
        particlesRef.current = particlesRef.current.slice(-60);
      }

      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= p.decay;
        p.size += 0.08;

        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 155, 150, ${p.life * 0.2})`;
          ctx.fill();
          return true;
        }
        return false;
      });

      if (isVisible && mouse.x > 0 && mouse.y > 0) {
        drawF1Car(mouse.x, mouse.y, angleRef.current);
      }

      // Sync prev for next frame
      prevMouseRef.current = { ...mouseRef.current };

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
}
