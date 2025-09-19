import { useState } from "react";
import { Confetti } from "./Confetti";

interface PuzzlePieceProps {
  id: number;
  message: string;
  isRevealed: boolean;
  onReveal: (id: number) => void;
  className?: string;
}

export const PuzzlePiece = ({ id, message, isRevealed, onReveal, className = "" }: PuzzlePieceProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    if (isRevealed || isFlipping) return;
    
    setIsFlipping(true);
    setShowConfetti(true);
    
    // Delay the reveal to sync with flip animation
    setTimeout(() => {
      onReveal(id);
      setIsFlipping(false);
    }, 400);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          puzzle-piece relative w-40 h-32 md:w-48 md:h-40 cursor-pointer
          flex items-center justify-center text-center p-4
          ${className}
          ${isRevealed ? 'flip-animation' : 'float-gentle'}
          ${isFlipping ? 'pointer-events-none' : ''}
        `}
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {!isRevealed ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧩</span>
            </div>
          </div>
        ) : (
          <div className="relative z-10 text-sm md:text-base font-bold text-foreground leading-relaxed drop-shadow-sm">
            {message}
          </div>
        )}
        
        {/* Sparkle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>
      
      <Confetti 
        active={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </>
  );
};