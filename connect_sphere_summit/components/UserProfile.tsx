
import React, { useState, useEffect } from 'react';
import { X, Calendar, Ticket, Box, User, Mail, Shield, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import Button from './Button';
import { api } from '../api';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onManageClick: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, user, onManageClick }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'events' | 'bookings'>('info');
  const [data, setData] = useState<{ hosted: any[], booked: any[] }>({ hosted: [], booked: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserData();
    }
  }, [isOpen, user]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [bookings, allEvents] = await Promise.all([
        api.getMyBookings(),
        api.getEvents()
      ]);
      const hosted = allEvents.filter((e: any) => e.created_by === user.id);
      setData({ hosted, booked: bookings });
    } catch (err) {
      console.error("Error fetching user data", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-zinc-950 w-full max-w-2xl h-full shadow-2xl border-l border-white/10 flex flex-col transform transition-transform duration-500 translate-x-0">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Your Profile</h2>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">{user?.role || 'Member'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 bg-zinc-900/30">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'info' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-white'}`}
          >
            My Tickets ({data.booked.length})
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'events' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500 hover:text-white'}`}
          >
            My Events ({data.hosted.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-500">
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <p className="text-sm font-medium animate-pulse">Fetching your data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'info' && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3 text-gray-400 mb-4">
                        <User size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Full Name</span>
                      </div>
                      <p className="text-xl font-bold text-white">{user?.name}</p>
                    </div>
                    <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3 text-gray-400 mb-4">
                        <Mail size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Email</span>
                      </div>
                      <p className="text-xl font-bold text-white truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-white mb-2">Activity Summary</h3>
                    <p className="text-gray-400 text-sm mb-6">You are actively participating in the ConnectSphere community.</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                        <p className="text-3xl font-black text-white">{data.booked.length}</p>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Events Booked</p>
                      </div>
                      <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                        <p className="text-3xl font-black text-white">{data.hosted.length}</p>
                        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Events Hosted</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full py-4 border-white/10" onClick={onManageClick}>
                    Go To Management Center
                  </Button>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-4 animate-fade-in">
                  {data.booked.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-2xl">
                      <Ticket size={48} className="mx-auto text-gray-700 mb-4" />
                      <p className="text-gray-500">You haven't booked any events yet.</p>
                      <button onClick={onClose} className="text-orange-500 font-bold hover:underline mt-2">Explore Events</button>
                    </div>
                  ) : (
                    data.booked.map((b: any) => (
                      <div key={b.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-orange-500/30 transition-all group">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 shrink-0">
                          <CheckCircle size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-lg group-hover:text-orange-500 transition-colors">{b.event_name}</h4>
                          <div className="flex items-center gap-3 text-gray-500 text-xs mt-1 font-medium uppercase tracking-wider">
                            <Calendar size={12} /> {b.event_date}
                          </div>
                          <p className="mt-3 text-xs text-zinc-500 bg-zinc-800 inline-block px-3 py-1 rounded-full">{b.ticket_type}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'events' && (
                <div className="space-y-4 animate-fade-in">
                  {data.hosted.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-2xl">
                      <Box size={48} className="mx-auto text-gray-700 mb-4" />
                      <p className="text-gray-500">You haven't hosted any events yet.</p>
                      <button onClick={onManageClick} className="text-orange-500 font-bold hover:underline mt-2">Create Your First Event</button>
                    </div>
                  ) : (
                    data.hosted.map((e: any) => (
                      <div key={e.id} className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden flex items-stretch group hover:border-orange-500/30 transition-all">
                        {e.image_url && (
                            <div className="w-24 shrink-0 overflow-hidden">
                                <img src={e.image_url} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt={e.title} />
                            </div>
                        )}
                        <div className="p-6 flex-1">
                          <h4 className="font-bold text-white text-lg group-hover:text-orange-500 transition-colors">{e.title}</h4>
                          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{e.date} • {e.venue}</p>
                          <div className="mt-4 flex justify-end">
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">Active</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 bg-zinc-900/50 border-t border-white/5 mt-auto">
            <button 
                onClick={onManageClick}
                className="w-full flex items-center justify-between p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl group hover:bg-orange-500/10 transition-all"
            >
                <div className="text-left">
                    <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Management Center</p>
                    <p className="text-sm text-gray-400">Edit and manage your events.</p>
                </div>
                <ArrowRight className="text-orange-500 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
