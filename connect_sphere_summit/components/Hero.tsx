
import React from 'react';
import Button from './Button';

interface HeroProps {
  onBookingClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  // 3 Tech (Tech Fest/Hackathon), 3 Cultural (Concert/Fest), 2 General Conference
  const images = [
    // Tech 1: Cyberpunk/Tech Aesthetic
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    // Cultural 1: Concert Crowd
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    // Tech 2: Coding/Hackathon (Updated)
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop", 
    // General 1: Speaker on Stage (Updated)
    "https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=800&auto=format&fit=crop",
    // Cultural 2: Live Music/Performance (Updated)
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    // Tech 3: Tech Team/Collaboration
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop", 
    // General 2: Microphone/Stage Detail
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    // Cultural 3: Singer/Artistic (Fixed broken link)
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
  ];

  // Duplicate images for infinite loop
  const seamlessImages = [...images, ...images];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col pt-20 md:pt-24">
      
      {/* Top Section: Tilted Image Strip */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center mb-4 md:mb-8">
        {/* Rotated Container for the strip effect */}
        <div className="absolute inset-0 w-[120%] -ml-[10%] flex items-center transform -rotate-2 origin-center scale-105 hover:scale-100 transition-transform duration-700 overflow-hidden">
          {/* Marquee Track */}
          <div className="flex gap-3 md:gap-6 animate-marquee w-max pl-4">
            {seamlessImages.map((src, index) => (
              <div 
                key={index} 
                className="relative w-32 h-52 md:w-56 md:h-80 lg:w-64 lg:h-96 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 group bg-zinc-900"
              >
                <img 
                  src={src} 
                  alt={`Event Highlight ${index + 1}`} 
                  className="w-full h-full object-cover filter brightness-[0.6] group-hover:brightness-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Text and CTA */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 -mt-10 md:-mt-16 pb-12">
        
        {/* Massive Headline Text */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 text-white uppercase tracking-tighter mb-10 max-w-[90vw] mx-auto drop-shadow-2xl">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-black flex items-center gap-2 md:gap-4">
            <span className="text-orange-500 opacity-80 text-xl md:text-4xl">•</span> Conferences
          </h1>
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-black flex items-center gap-2 md:gap-4">
            <span className="text-pink-500 opacity-80 text-xl md:text-4xl">•</span> Lectures
          </h1>
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-black flex items-center gap-2 md:gap-4">
            <span className="text-orange-500 opacity-80 text-xl md:text-4xl">•</span> Workshops
          </h1>
        </div>

        {/* CTA Button */}
        <div>
            <Button 
                onClick={onBookingClick}
                className="px-10 py-4 md:px-12 md:py-5 text-base md:text-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] border-none"
            >
                Save My Spot
            </Button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
