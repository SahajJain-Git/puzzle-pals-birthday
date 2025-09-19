import { useState } from "react";
import { PuzzlePiece } from "./PuzzlePiece";
import birthdayCake from "@/assets/birthday-cake.jpg";

const puzzleMessages = [
  "To the most amazing sister 💖",
  "You make life brighter 🌟", 
  "Forever my best friend 👭",
  "Thank you for always being there 💕",
  "You're one in a million 🌸",
  "Happy Birthday Pucchu! 🎉"
];

const puzzlePieceClasses = [
  "puzzle-piece-1 float-delay-1",
  "puzzle-piece-2 float-delay-2", 
  "puzzle-piece-3 float-delay-3",
  "puzzle-piece-4 float-delay-1",
  "puzzle-piece-5 float-delay-2",
  "puzzle-piece-6 float-delay-3"
];

interface PuzzleBoardProps {
  onComplete: () => void;
}

export const PuzzleBoard = ({ onComplete }: PuzzleBoardProps) => {
  const [revealedPieces, setRevealedPieces] = useState<Set<number>>(new Set());
  const [showFinalReveal, setShowFinalReveal] = useState(false);

  const handlePieceReveal = (pieceId: number) => {
    const newRevealed = new Set(revealedPieces);
    newRevealed.add(pieceId);
    setRevealedPieces(newRevealed);

    // Check if all pieces are revealed
    if (newRevealed.size === puzzleMessages.length) {
      setTimeout(() => {
        setShowFinalReveal(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {!showFinalReveal ? (
        <>
          <h1 className="text-4xl md:text-6xl font-bold glow-text mb-8 text-center">
            🎂 Birthday Surprise! 🎂
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center max-w-md">
            Click each puzzle piece to reveal a special message! ✨
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl">
            {puzzleMessages.map((message, index) => (
              <PuzzlePiece
                key={index}
                id={index}
                message={message}
                isRevealed={revealedPieces.has(index)}
                onReveal={handlePieceReveal}
                className={puzzlePieceClasses[index]}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {revealedPieces.size} of {puzzleMessages.length} pieces revealed
            </p>
          </div>
        </>
      ) : (
        <div className="text-center fade-in-up">
          <div className="mb-8">
            <img 
              src={birthdayCake} 
              alt="Birthday cake with balloons" 
              className="w-80 h-60 md:w-96 md:h-72 object-cover rounded-3xl shadow-2xl mx-auto float-gentle"
            />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold glow-text mb-6">
            🥳 Happy Birthday Pucchu! 🥳
          </h2>
          
          <div className="text-xl md:text-2xl text-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
            <span className="glow-text">With lots of love 💕</span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            You deserve all the love in this world. ✨
          </p>
        </div>
      )}
    </div>
  );
};