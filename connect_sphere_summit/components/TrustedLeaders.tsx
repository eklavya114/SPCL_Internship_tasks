import React from 'react';
import { CloudLightning, Command, Feather, Figma, Framer, Github, Slack, Twitch } from 'lucide-react';

const LOGOS = [Figma, Framer, Github, Slack, Twitch, Command, Feather, CloudLightning];

const TrustedLeaders: React.FC = () => {
  return (
    <section className="py-32 bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-20 uppercase tracking-widest">Trusted By Leaders</h2>
        
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto flex items-center justify-center">
            
            {/* Central CTA */}
            <div className="absolute z-20 text-center">
                <p className="text-4xl md:text-6xl font-black text-white leading-none">
                    10K+
                </p>
                <p className="text-sm md:text-base text-gray-400 uppercase tracking-widest mt-2">
                    Attendees
                </p>
            </div>

            {/* Rotating Circle */}
            <div className="absolute inset-0 animate-rotate-slow">
                {LOGOS.map((Icon, index) => {
                    // Position items in a circle
                    const angle = (index / LOGOS.length) * 360;
                    const radius = 50; // percentage
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                    
                    return (
                        <div 
                            key={index}
                            className="absolute w-16 h-16 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:border-orange-500 transition-all duration-300"
                            style={{ 
                                left: `${x}%`, 
                                top: `${y}%`,
                            }}
                        >
                            <div className="animate-spin-reverse" style={{ animation: 'rotate-slow 20s linear infinite reverse' }}>
                                <Icon className="text-white w-6 h-6 opacity-70" />
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Decorative Rings */}
            <div className="absolute inset-0 border border-white/5 rounded-full scale-75"></div>
            <div className="absolute inset-0 border border-dashed border-white/10 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default TrustedLeaders;