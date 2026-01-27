
import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import { api } from '../api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails?: {
    id?: string;
    title: string;
    date: string;
    image?: string;
    location?: string;
  } | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, eventDetails }) => {
  const [loading, setLoading] = useState(false);
  const [ticketType, setTicketType] = useState('General Access - $299');

  if (!isOpen) return null;

  const displayEvent = {
    title: eventDetails?.title || "Connect Sphere Summit",
    date: eventDetails?.date || "Aug 24-27, 2024",
    image: eventDetails?.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    location: eventDetails?.location || "Moscone Center, SF"
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        // Fallback to a default ID if none provided (General Summit)
        const eventId = eventDetails?.id || "1"; 
        await api.createBooking({
            event_id: eventId,
            ticket_type: ticketType
        });
        alert(`Booking Confirmed for ${displayEvent.title}!`);
        onClose();
    } catch (err) {
        alert("Booking failed. Are you logged in?");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white"><X size={20} /></button>

        <div className="w-full md:w-2/5 relative">
            <img src={displayEvent.image} alt="Event" className="w-full h-40 md:h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white uppercase leading-none mb-2">{displayEvent.title}</h3>
                <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-orange-500" /><span>{displayEvent.date}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-orange-500" /><span>{displayEvent.location}</span></div>
                </div>
            </div>
        </div>

        <div className="w-full md:w-3/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Secure Your Spot</h2>
            <form className="space-y-4" onSubmit={handleBooking}>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Ticket Type</label>
                    <select 
                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-orange-500"
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                    >
                        <option>General Access - $299</option>
                        <option>VIP Pass - $599</option>
                        <option>Virtual Only - $99</option>
                    </select>
                </div>
                <div className="pt-4">
                    <Button disabled={loading} className="w-full py-4 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="animate-spin" /> : <>Confirm Booking <CheckCircle size={18} /></>}
                    </Button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
