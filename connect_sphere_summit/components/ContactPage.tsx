import React from 'react';
import Button from './Button';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 animate-fade-in">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row gap-16">
            
            {/* Contact Info */}
            <div className="w-full md:w-1/3">
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-8">
                    Get In <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-gray-400 text-lg mb-12">
                    Have questions about sponsorship, tickets, or press passes? Our team is here to help you.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-900 rounded-lg text-orange-500 border border-white/10">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-1">Venue Location</h3>
                            <p className="text-gray-400">Moscone Center<br/>747 Howard St, San Francisco, CA 94103</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-900 rounded-lg text-orange-500 border border-white/10">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                            <p className="text-gray-400">hello@connectsphere.com<br/>sponsors@connectsphere.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-zinc-900 rounded-lg text-orange-500 border border-white/10">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-1">Call Support</h3>
                            <p className="text-gray-400">+1 (555) 123-4567<br/>Mon-Fri, 9am - 6pm PST</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-2/3">
                <form className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-2xl font-bold text-white mb-8">Send us a message</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                            <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-colors" placeholder="Jane" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                            <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-colors" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-colors" placeholder="jane@example.com" />
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                        <textarea className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-orange-500 transition-colors h-40 resize-none" placeholder="How can we help you?"></textarea>
                    </div>

                    <Button className="w-full md:w-auto flex items-center justify-center gap-2">
                        Send Message <Send size={18} />
                    </Button>
                </form>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;