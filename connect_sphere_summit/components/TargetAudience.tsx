import React from 'react';
import { AUDIENCE_TYPES } from '../constants';
import { ArrowRight } from 'lucide-react';

interface TargetAudienceProps {
  onCategoryClick?: (id: string) => void;
}

const TargetAudience: React.FC<TargetAudienceProps> = ({ onCategoryClick }) => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white uppercase tracking-tighter mb-16">
          This Summit Is Ideal For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUDIENCE_TYPES.map((item, index) => (
            <button 
                key={index} 
                onClick={() => onCategoryClick && onCategoryClick(item.id)}
                className="group relative p-8 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 text-left w-full h-full flex flex-col"
            >
              
              {/* Faded Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.label} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black mb-6 flex items-center justify-center group-hover:from-orange-500 group-hover:to-pink-600 transition-all duration-500 shadow-lg border border-white/10">
                  <item.icon className="text-white w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide drop-shadow-md group-hover:text-orange-500 transition-colors">
                    {item.label}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed drop-shadow-md mb-6 flex-grow">
                    {item.description}
                </p>

                {/* Hover CTA Indicator */}
                <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    View Events <ArrowRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;