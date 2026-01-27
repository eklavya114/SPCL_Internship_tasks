import React from 'react';
import { CATEGORY_DETAILS } from '../constants';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

interface EventsPageProps {
  onCategoryClick: (id: string) => void;
  onBack: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onCategoryClick, onBack }) => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 animate-fade-in">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">
                Explore <span className="gradient-text">Events</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                Discover our diverse range of summits, workshops, and exclusive gatherings tailored for every industry professional.
            </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-16">
            {Object.values(CATEGORY_DETAILS).map((category, index) => (
                <div key={category.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}>
                    
                    {/* Image Preview */}
                    <div className="w-full md:w-1/2 relative group cursor-pointer" onClick={() => onCategoryClick(category.id)}>
                        <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10">
                            <img 
                                src={category.events[0].imageUrl} 
                                alt={category.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                        {/* Floating Label */}
                        <div className="absolute -bottom-6 -right-6 md:-right-10 bg-zinc-900 border border-white/10 p-6 rounded-xl shadow-2xl group-hover:-translate-y-2 transition-transform duration-300">
                             <h3 className="text-2xl font-black text-white uppercase">{category.title}</h3>
                             <p className="text-orange-500 text-sm font-bold uppercase tracking-widest mt-1">{category.events.length} Upcoming Events</p>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full md:w-1/2 md:px-10">
                        <h2 className="text-3xl font-bold text-white mb-4">{category.subtitle}</h2>
                        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                            {category.description}
                        </p>
                        <ul className="space-y-4 mb-8">
                            {category.events.slice(0, 2).map(evt => (
                                <li key={evt.id} className="flex items-center gap-3 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                    {evt.title}
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" onClick={() => onCategoryClick(category.id)} className="group flex items-center gap-2">
                            View Category <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default EventsPage;