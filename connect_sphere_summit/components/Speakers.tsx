import React, { useState } from 'react';
import { Twitter, Linkedin, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { SPEAKERS } from '../constants';

interface SpeakersProps {
  onSeeAllClick?: () => void;
}

const Speakers: React.FC<SpeakersProps> = ({ onSeeAllClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // We move by 1 slide at a time
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === SPEAKERS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SPEAKERS.length - 1 : prev - 1));
  };

  return (
    <section id="speakers" className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                Speakers
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg mx-auto">
               World-class visionaries leading the global conversation.
            </p>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 md:absolute md:right-0 md:bottom-0 md:mt-0">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 bg-black/50 backdrop-blur-md">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 bg-black/50 backdrop-blur-md">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden -mx-4 px-4 py-8">
            <div 
                className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
                style={{ 
                    // Move based on percentage width of items + gap approximation
                    // Desktop: 4 items (25%), Mobile: 2 items (50%)
                    transform: `translateX(calc(-${currentIndex} * (100% / 2 + 1.5rem)))`, // Mobile default
                }}
            >
                {/* Responsive Transform logic injection via style tag for media query support in inline styles */}
                <style>{`
                    @media (min-width: 768px) {
                        .will-change-transform {
                            transform: translateX(calc(-${currentIndex} * (100% / 4 + 1.5rem))) !important;
                        }
                    }
                `}</style>

                {SPEAKERS.map((speaker) => (
                    <div 
                        key={speaker.id} 
                        className="
                            min-w-[calc(50%-0.75rem)] md:min-w-[calc(25%-1.125rem)] 
                            relative group rounded-xl overflow-hidden border border-white/10 bg-zinc-900 shadow-lg 
                            aspect-[3/4]
                        "
                    >
                        <img 
                            src={speaker.imageUrl} 
                            alt={speaker.name} 
                            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                        />
                        
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">{speaker.name}</h3>
                            <p className="text-xs md:text-sm text-gray-300 font-medium">{speaker.title}</p>
                            <p className="text-[10px] md:text-xs text-orange-500 font-bold uppercase tracking-wider mt-2">{speaker.company}</p>
                            
                            {/* Social Icons on Hover */}
                            <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                                <Twitter size={16} className="text-white hover:text-orange-500 cursor-pointer" />
                                <Linkedin size={16} className="text-white hover:text-orange-500 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="text-center mt-12 md:mt-16">
            <button 
                onClick={onSeeAllClick}
                className="group inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest border-b border-orange-500 pb-1 hover:text-orange-500 transition-colors"
            >
                See All Speakers
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default Speakers;