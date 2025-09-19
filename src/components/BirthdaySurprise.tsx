import { useState } from "react";
import { PuzzleBoard } from "./PuzzleBoard";
import { PhotoCollage } from "./PhotoCollage";
import { Button } from "@/components/ui/button";

export const BirthdaySurprise = () => {
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [showCollage, setShowCollage] = useState(false);

  const handlePuzzleComplete = () => {
    setPuzzleComplete(true);
  };

  const handleSurpriseClick = () => {
    setShowCollage(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background animate-pulse" />
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-glow/20 rounded-full float-gentle" />
        <div className="absolute top-32 right-16 w-16 h-16 bg-secondary-glow/20 rounded-full float-gentle float-delay-1" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent-glow/20 rounded-full float-gentle float-delay-2" />
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-pastel-yellow/20 rounded-full float-gentle float-delay-3" />
      </div>

      {!showCollage ? (
        <div className="relative z-10">
          <PuzzleBoard onComplete={handlePuzzleComplete} />
          
          {puzzleComplete && (
            <div className="flex justify-center pb-16">
              <Button
                onClick={handleSurpriseClick}
                className="birthday-button text-lg px-12 py-6 text-white font-bold shadow-2xl"
              >
                Click for a Huge Surprise 🎁
              </Button>
            </div>
          )}
        </div>
      ) : (
        <PhotoCollage isVisible={showCollage} />
      )}

      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-2xl animate-pulse">✨</div>
        <div className="absolute top-1/3 right-1/3 text-xl animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-1/3 left-1/3 text-lg animate-pulse" style={{ animationDelay: '2s' }}>💫</div>
        <div className="absolute bottom-1/4 right-1/4 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌟</div>
      </div>
    </div>
  );
};