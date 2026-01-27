import React, { useState } from 'react';
import { CATEGORY_DETAILS } from '../constants';
import Button from './Button';
import { ArrowLeft, Calendar, MapPin, Clock, Search } from 'lucide-react';

interface CategoryEventsPageProps {
  categoryId: string;
  onBack: () => void;
}

const CategoryEventsPage: React.FC<CategoryEventsPageProps> = ({ categoryId, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categoryData = CATEGORY_DETAILS[categoryId];

  if (!categoryData) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
                <Button onClick={onBack}>Back to Home</Button>
            </div>
        </div>
    );
  }

  const filteredEvents = categoryData.events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 animate-fade-in">
      
      {/* Header Section */}
      <div className="container mx-auto px-6 mb-16">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <div className="p-2 rounded-full border border-white/10 group-hover:border-white/50 group-hover:bg-white/10 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="uppercase tracking-widest text-sm font-bold">Back to Home</span>
        </button>

        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
            <div className="max-w-3xl">
                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider mb-4">
                    {categoryData.title}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                    {categoryData.subtitle}
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                    {categoryData.description}
                </p>
            </div>

             {/* Search Bar */}
             <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                    type="text" 
                    placeholder={`Search ${categoryData.title} events...`}
                    className="w-full bg-zinc-900 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white outline-none focus:border-orange-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12">
            {filteredEvents.map((event) => (
                <div 
                    key={event.id} 
                    className="flex flex-col md:flex-row bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 group shadow-2xl"
                >
                    {/* Event Image */}
                    <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-900/80"></div>
                        
                        {/* Organizer Tag */}
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-white border border-white/10">
                            by {event.organizer}
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-4 mb-4 text-sm font-medium">
                            <div className="flex items-center gap-2 text-orange-500">
                                <Calendar size={16} />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock size={16} />
                                <span>{event.time}</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-orange-500 transition-colors">
                            {event.title}
                        </h2>

                        <div className="flex items-center gap-2 text-gray-300 mb-6 text-sm">
                            <MapPin size={16} />
                            <span>{event.venue}</span>
                        </div>

                        <p className="text-gray-400 mb-8 leading-relaxed">
                            {event.description}
                        </p>

                        <div className="mt-auto">
                            <Button className="w-full md:w-auto">Register for Event</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredEvents.length === 0 && (
            <div className="text-center py-24 bg-zinc-900/30 rounded-2xl border border-white/5 border-dashed">
                <p className="text-gray-500 text-xl">No upcoming events found matching your criteria.</p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-orange-500 hover:text-white underline"
                >
                    Clear Search
                </button>
            </div>
        )}
      </div>

    </div>
  );
};

export default CategoryEventsPage;