
import React, { useState } from 'react';
import Button from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Data for multiple events
const EVENTS = [
  {
    id: 1,
    date: "Aug 24 • 4:00 PM UTC",
    title: "Design Forward Summit",
    tag: "[Live + Replay]",
    description: "Join us for an immersive session with <span class='text-white font-bold'>Amanda Price</span>, Lead Product Designer at Slack, as she breaks down the future of collaborative interfaces before a live audience.",
    mainImage: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1600&auto=format&fit=crop",
    sessions: [
      { id: 1, title: "Session 1: Community Growth", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Session 2: Tech Implementation", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Session 3: Live Q&A", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: 2,
    date: "Sep 12 • 10:00 AM UTC",
    title: "Tech Innovators Expo",
    tag: "[In-Person + Virtual]",
    description: "Experience the bleeding edge of AI and Quantum Computing. Featuring keynotes from industry pioneers exploring the next decade of technological breakthroughs.",
    mainImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    sessions: [
      { id: 1, title: "Session 1: AI Ethics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Session 2: Cyber Systems", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Session 3: Coding Future", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: 3,
    date: "Oct 05 • 2:00 PM UTC",
    title: "Global Leadership Forum",
    tag: "[Exclusive Access]",
    description: "Strategies for the modern executive. A deep dive into organizational culture, remote leadership, and sustainable business practices with Fortune 500 CEOs.",
    mainImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop",
    sessions: [
      { id: 1, title: "Session 1: Networking", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop" },
      { id: 2, title: "Session 2: Negotiation", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop" },
      { id: 3, title: "Session 3: Strategy", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" }
    ]
  }
];

interface UpcomingEventsProps {
    onJoinEvent?: (event: any) => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ onJoinEvent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? EVENTS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === EVENTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="events" className="relative py-20 bg-black border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="text-left">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2">
                    Upcoming <span className="gradient-text">Events</span>
                </h2>
                <p className="text-gray-400">Swipe to explore our calendar.</p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4">
                <button 
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

        {/* Carousel Window */}
        <div className="overflow-hidden">
            <div 
                className="flex transition-transform duration-700 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {EVENTS.map((event) => (
                    <div key={event.id} className="min-w-full px-1">
                        <div className="flex flex-col gap-6">
                            
                            {/* Main Event Card */}
                            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                                {/* Full Background Image */}
                                <img 
                                    src={event.mainImage} 
                                    alt={event.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Gradient Overlay: Faded from Right (Black) to Left (Transparent) */}
                                <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent md:via-black/70"></div>

                                {/* Live Indicator */}
                                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full animate-pulse shadow-lg">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-xs font-bold text-white uppercase">Live</span>
                                </div>

                                {/* Content Container - Positioned on the Right */}
                                <div className="relative z-10 h-full w-full md:w-1/2 ml-auto p-8 md:p-16 flex flex-col justify-center">
                                    <div className="mb-2">
                                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{event.date}</span>
                                    </div>
                                    
                                    <h3 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                                        {event.title}
                                    </h3>
                                    <p className="text-xl text-gray-400 mb-8 font-light italic">
                                        {event.tag}
                                    </p>

                                    <p 
                                        className="text-gray-300 mb-10 leading-relaxed text-lg max-w-lg"
                                        dangerouslySetInnerHTML={{ __html: event.description }}
                                    />

                                    <div className="mt-auto mb-16">
                                        <Button 
                                            variant="outline" 
                                            className="w-full md:w-auto bg-black/50 hover:bg-black backdrop-blur-sm border-white/30"
                                            onClick={() => onJoinEvent && onJoinEvent({
                                                title: event.title,
                                                date: event.date,
                                                image: event.mainImage
                                            })}
                                        >
                                            Join Event
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Small grid for secondary sessions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {event.sessions.map((session) => (
                                    <div key={session.id} className="relative h-48 rounded-xl overflow-hidden group cursor-pointer border border-white/10">
                                        <img src={session.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt={session.title} />
                                        <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
                                            <span className="text-sm font-bold text-white uppercase tracking-wider">{session.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;
