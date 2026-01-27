import React, { useState } from 'react';
import { SPEAKERS } from '../constants';
import Button from './Button';
import { ArrowLeft, Search, Calendar, Clock, MapPin, Twitter, Linkedin } from 'lucide-react';

interface AllSpeakersPageProps {
  onBack: () => void;
}

const AllSpeakersPage: React.FC<AllSpeakersPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpeakers = SPEAKERS.filter(speaker => 
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    speaker.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 animate-fade-in">
      
      {/* Page Header */}
      <div className="container mx-auto px-6 mb-12">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <div className="p-2 rounded-full border border-white/10 group-hover:border-white/50 group-hover:bg-white/10 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="uppercase tracking-widest text-sm font-bold">Back to Home</span>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2">
                    Agenda & <br/><span className="gradient-text">Speakers</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-xl">
                    Explore the complete lineup of visionaries shaping the future. Plan your summit experience.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                    type="text" 
                    placeholder="Search speakers or companies..." 
                    className="w-full bg-zinc-900 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white outline-none focus:border-orange-500 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8">
            {filteredSpeakers.map((speaker, index) => (
                <div 
                    key={speaker.id} 
                    className="flex flex-col md:flex-row bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 group shadow-2xl"
                >
                    {/* Image Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 relative overflow-hidden h-64 md:h-auto">
                        <img 
                            src={speaker.imageUrl} 
                            alt={speaker.name} 
                            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r"></div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative">
                        {/* Session Badge */}
                        <div className="flex flex-wrap gap-4 mb-6">
                             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider">
                                <Clock size={14} />
                                {speaker.sessionTime}
                             </div>
                             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider">
                                <MapPin size={14} />
                                Main Stage
                             </div>
                        </div>

                        {/* Info */}
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{speaker.name}</h2>
                        <div className="text-lg text-gray-400 mb-6 font-medium">
                            {speaker.title} <span className="text-pink-500 px-2">•</span> <span className="text-white">{speaker.company}</span>
                        </div>

                        {/* Session Details */}
                        <div className="bg-black/40 rounded-xl p-6 border border-white/5 mb-8">
                            <div className="flex items-start gap-3 mb-2">
                                <div className="mt-1 p-1 bg-orange-500 rounded-full"></div>
                                <h3 className="text-xl font-bold text-white leading-tight">{speaker.sessionTitle}</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm pl-6 border-l-2 border-white/10 ml-1.5 mt-3">
                                {speaker.bio}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-4 mt-auto">
                            <Button variant="outline" className="text-xs py-3 px-6 border-white/20 hover:border-white hover:bg-white hover:text-black">
                                <Calendar size={16} className="mr-2 inline" />
                                Add to Calendar
                            </Button>
                            
                            <div className="flex gap-4 ml-auto">
                                <a href={speaker.socials?.twitter} className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                                <a href={speaker.socials?.linkedin} className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredSpeakers.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No speakers found matching your search.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AllSpeakersPage;