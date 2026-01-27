
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { CalendarPlus, Ticket, Settings, X, CheckCircle, Trash2, Download, Loader2, MapPin, Clock, Calendar } from 'lucide-react';
import { api } from '../api';

interface ManagePageProps {
  user: any;
  onAuthRequired: () => void;
}

const ManagePage: React.FC<ManagePageProps> = ({ user, onAuthRequired }) => {
  const [activeModal, setActiveModal] = useState<'create' | 'bookings' | 'hosted' | 'settings' | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [hostedEvents, setHostedEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    date: '', 
    time: '', 
    venue: '', 
    description: '', 
    category: 'corporate',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop'
  });

  useEffect(() => {
    if (!user) {
        onAuthRequired();
        return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
        setLoading(true);
        const [bookingsData, allEventsData] = await Promise.all([
            api.getMyBookings(),
            api.getEvents()
        ]);
        setBookings(bookingsData);
        // Filter events created by this user
        setHostedEvents(allEventsData.filter((e: any) => e.created_by === user.id));
    } catch (err) {
        console.error("Failed to load management data", err);
    } finally {
        setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
      setNotification(msg);
      setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
          await api.createEvent(newEvent);
          setActiveModal(null);
          showNotification('Event published successfully!');
          setNewEvent({ title: '', date: '', time: '', venue: '', description: '', category: 'corporate', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop' });
          await loadData(); // Refresh list immediately
      } catch (err) {
          showNotification('Error creating event.');
      } finally {
          setLoading(false);
      }
  };

  const handleDeleteHostedEvent = async (id: number) => {
      if (!confirm('Delete this event?')) return;
      setLoading(true);
      try {
          await api.deleteEvent(id);
          showNotification('Event deleted successfully');
          await loadData();
      } catch (err) {
          showNotification('Failed to delete event');
      } finally {
          setLoading(false);
      }
  };

  const closeModal = () => setActiveModal(null);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 animate-fade-in relative">
      {notification && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] bg-orange-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
              <CheckCircle size={20} />
              <span className="font-bold">{notification}</span>
          </div>
      )}

      <div className="container mx-auto px-6 mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            Management <span className="gradient-text">Center</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto">Track your summits and control your participation in one place.</p>
        {loading && !activeModal && <div className="mt-4 flex justify-center"><Loader2 className="animate-spin text-orange-500" /></div>}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black mb-6 flex items-center justify-center border border-white/10 group-hover:from-orange-500 group-hover:to-pink-600 transition-colors"><CalendarPlus className="text-white" size={28} /></div>
              <h2 className="text-2xl font-bold text-white mb-2">Host Event</h2>
              <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">Publish your new summit, workshop, or seminar to our global audience.</p>
              <Button className="w-full text-xs" onClick={() => setActiveModal('create')}>Create Event</Button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black mb-6 flex items-center justify-center border border-white/10 group-hover:from-orange-500 group-hover:to-pink-600 transition-colors"><Calendar className="text-white" size={28} /></div>
              <h2 className="text-2xl font-bold text-white mb-2">Hosted Events</h2>
              <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">Manage the {hostedEvents.length} events you have published.</p>
              <Button variant="outline" className="w-full text-xs" onClick={() => setActiveModal('hosted')}>Manage Hosted</Button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black mb-6 flex items-center justify-center border border-white/10 group-hover:from-orange-500 group-hover:to-pink-600 transition-colors"><Ticket className="text-white" size={28} /></div>
              <h2 className="text-2xl font-bold text-white mb-2">My Bookings</h2>
              <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">Review and download tickets for your {bookings.length} registrations.</p>
              <Button variant="outline" className="w-full text-xs" onClick={() => setActiveModal('bookings')}>View Tickets</Button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black mb-6 flex items-center justify-center border border-white/10 group-hover:from-orange-500 group-hover:to-pink-600 transition-colors"><Settings className="text-white" size={28} /></div>
              <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
              <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">Update your personal information and profile preferences.</p>
              <Button variant="outline" className="w-full text-xs" onClick={() => setActiveModal('settings')}>Account Info</Button>
          </div>
      </div>

       {/* Stats Grid */}
       <div className="container mx-auto px-6 mt-16">
           <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-10 flex flex-wrap justify-around gap-8 text-center">
                <div>
                    <p className="text-5xl font-black text-orange-500 mb-1">{hostedEvents.length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Events Hosted</p>
                </div>
                <div className="w-px h-16 bg-white/5 hidden md:block"></div>
                <div>
                    <p className="text-5xl font-black text-white mb-1">{bookings.length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Tickets Claimed</p>
                </div>
                <div className="w-px h-16 bg-white/5 hidden md:block"></div>
                <div>
                    <p className="text-5xl font-black text-white mb-1">0</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Messages</p>
                </div>
           </div>
       </div>

       {/* Modals */}
       {activeModal && (
           <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
               <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={closeModal}></div>
               <div className="relative bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-2xl p-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                   <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>

                   {activeModal === 'create' && (
                       <form onSubmit={handleCreateEvent}>
                           <div className="mb-8">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Host New Event</h2>
                                <p className="text-gray-500 text-sm">Fill in the details to go live on ConnectSphere.</p>
                           </div>
                           <div className="space-y-5">
                               <div>
                                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Event Title</label>
                                   <input required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-orange-500" placeholder="e.g. UX Design Masterclass" />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                   <div>
                                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                                       <input required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} type="date" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" />
                                   </div>
                                   <div>
                                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Time</label>
                                       <input required value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} type="time" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" />
                                   </div>
                               </div>
                               <div>
                                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Venue</label>
                                   <input required value={newEvent.venue} onChange={e => setNewEvent({...newEvent, venue: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" placeholder="Venue Name or 'Online'" />
                               </div>
                               <div>
                                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Cover Image URL</label>
                                   <input value={newEvent.image_url} onChange={e => setNewEvent({...newEvent, image_url: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" placeholder="https://unsplash.com/..." />
                               </div>
                               <div>
                                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                                   <textarea required value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white h-32 resize-none" placeholder="What is this event about?"></textarea>
                               </div>
                               <Button disabled={loading} className="w-full py-5 text-base flex items-center justify-center gap-2">
                                   {loading ? <Loader2 className="animate-spin" /> : 'Publish Event'}
                               </Button>
                           </div>
                       </form>
                   )}

                   {activeModal === 'hosted' && (
                       <div>
                           <div className="mb-8">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Hosted Events</h2>
                                <p className="text-gray-500 text-sm">You have published {hostedEvents.length} events.</p>
                           </div>
                           <div className="space-y-4">
                               {hostedEvents.length === 0 ? (
                                   <div className="py-20 text-center bg-black/30 border border-dashed border-white/10 rounded-2xl">
                                       <p className="text-gray-500">No events published yet.</p>
                                   </div>
                               ) : (
                                   hostedEvents.map((e: any) => (
                                       <div key={e.id} className="bg-black/50 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-orange-500/30 transition-all">
                                           {e.image_url && <img src={e.image_url} className="w-16 h-16 rounded-xl object-cover shrink-0" alt="" />}
                                           <div className="flex-1">
                                               <h3 className="font-bold text-white leading-tight">{e.title}</h3>
                                               <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1"><Calendar size={12} /> {e.date}</span>
                                                    <span className="flex items-center gap-1"><MapPin size={12} /> {e.venue}</span>
                                               </div>
                                           </div>
                                           <div className="flex gap-2">
                                               {(user?.id === e.created_by || user?.role === 'admin') && (
                                                 <button onClick={() => handleDeleteHostedEvent(e.id)} className="p-3 bg-zinc-800 rounded-xl text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                               )}
                                           </div>
                                       </div>
                                   ))
                               )}
                           </div>
                       </div>
                   )}

                   {activeModal === 'bookings' && (
                       <div>
                           <div className="mb-8">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Your Tickets</h2>
                                <p className="text-gray-500 text-sm">Valid registrations for upcoming summits.</p>
                           </div>
                           <div className="space-y-4">
                               {bookings.length === 0 ? (
                                   <div className="py-20 text-center bg-black/30 border border-dashed border-white/10 rounded-2xl">
                                       <p className="text-gray-500">No bookings found.</p>
                                   </div>
                               ) : (
                                   bookings.map((b: any) => (
                                       <div key={b.id} className="bg-zinc-800/50 border border-white/10 rounded-2xl p-6 flex justify-between items-center group">
                                           <div>
                                               <h3 className="font-bold text-white text-lg">{b.event_name}</h3>
                                               <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 uppercase tracking-widest">
                                                   <span className="flex items-center gap-1 text-orange-500"><Calendar size={12} /> {b.event_date}</span>
                                                   <span className="flex items-center gap-1"><Ticket size={12} /> {b.ticket_type}</span>
                                               </div>
                                           </div>
                                           <button className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all">
                                               <Download size={20} />
                                           </button>
                                       </div>
                                   ))
                               )}
                           </div>
                       </div>
                   )}

                   {activeModal === 'settings' && (
                        <div>
                             <div className="mb-8">
                                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Account Info</h2>
                                <p className="text-gray-500 text-sm">Review your registration details.</p>
                           </div>
                           <div className="space-y-6">
                                <div className="p-6 bg-black border border-white/10 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Display Name</p>
                                    <p className="text-xl font-bold text-white">{user.name}</p>
                                </div>
                                <div className="p-6 bg-black border border-white/10 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-xl font-bold text-white">{user.email}</p>
                                </div>
                                <div className="p-6 bg-black border border-white/10 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Account Role</p>
                                    <p className="text-xl font-bold text-orange-500 uppercase">{user.role || 'Member'}</p>
                                </div>
                                <Button variant="outline" className="w-full">Update Password</Button>
                           </div>
                        </div>
                   )}
               </div>
           </div>
       )}
    </div>
  );
};

export default ManagePage;
