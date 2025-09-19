import { useState } from "react";
import { Confetti } from "./Confetti";

// Import all the photos
import d1 from "@/assets/photos/d1.jpg";
import d2 from "@/assets/photos/d2.jpg";
import d3 from "@/assets/photos/d3.jpg";
import d4 from "@/assets/photos/d4.jpg";
import d5 from "@/assets/photos/d5.jpg";
import d6 from "@/assets/photos/d6.jpg";
import d7 from "@/assets/photos/d7.jpg";

const photos = [
  { src: d1, alt: "Happy memories 1" },
  { src: d2, alt: "Happy memories 2" },
  { src: d3, alt: "Happy memories 3" },
  { src: d4, alt: "Happy memories 4" },
  { src: d5, alt: "Happy memories 5" },
  { src: d6, alt: "Happy memories 6" },
  { src: d7, alt: "Happy memories 7" },
];

interface PhotoCollageProps {
  isVisible: boolean;
}

export const PhotoCollage = ({ isVisible }: PhotoCollageProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  if (!isVisible) return null;

  // Trigger confetti when component becomes visible
  if (isVisible && !showConfetti) {
    setTimeout(() => setShowConfetti(true), 500);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primary-glow/20 via-secondary-glow/20 to-accent-glow/20 p-8 fade-in-up">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold glow-text text-center mb-12">
          🎉 Happy Birthday Pucchu! 🎉
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
                ${index % 3 === 0 ? 'md:row-span-2' : ''}
                ${index % 4 === 1 ? 'lg:col-span-2' : ''}
                hover:scale-105 float-gentle
              `}
              style={{ 
                animationDelay: `${index * 0.2}s`
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                style={{ 
                  minHeight: index % 3 === 0 ? '300px' : '200px',
                  maxHeight: '400px'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-2xl md:text-3xl glow-text font-semibold mb-4">
            💕 So many beautiful memories! 💕
          </p>
          <p className="text-lg md:text-xl text-muted-foreground">
            Here's to making many more amazing memories together! ✨
          </p>
        </div>
      </div>
      
      <Confetti 
        active={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
};