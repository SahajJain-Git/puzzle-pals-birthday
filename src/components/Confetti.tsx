import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export const Confetti = ({ active, onComplete }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['hsl(270, 55%, 80%)', 'hsl(330, 50%, 82%)', 'hsl(200, 55%, 78%)', 'hsl(50, 60%, 82%)'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 0.5,
      }));
      
      setParticles(newParticles);
      
      // Clear particles after animation completes
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 confetti-burst"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            borderRadius: '50%',
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};