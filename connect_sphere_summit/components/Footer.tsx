
import React from 'react';
import Button from './Button';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black pt-20 pb-10 border-t border-white/10">
      
      {/* Final CTA */}
      <div className="container mx-auto px-6 mb-24 text-center">
        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
          Ready To <br /> <span className="gradient-text">Connect?</span>
        </h2>
        
        {/* Abstract SVG Shape */}
        <div className="flex justify-center mb-10">
             <svg width="100" height="100" viewBox="0 0 100 100" className="animate-bounce">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'rgb(249,115,22)', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'rgb(219,39,119)', stopOpacity:1}} />
                    </linearGradient>
                </defs>
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="url(#grad1)" />
             </svg>
        </div>

        <Button className="px-12 py-5 text-xl">Get Your Access Pass</Button>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 border-t border-white/10 pt-16">
        <div className="col-span-2">
            <h3 className="text-2xl font-black text-white tracking-tighter mb-4">CONNECT<span className="text-orange-500">SPHERE</span></h3>
            <p className="text-gray-400 text-sm max-w-xs mb-6">
                The premier event for designers, developers, and visionaries. Join the community shaping the future.
            </p>
            <div className="flex gap-4">
                <Facebook className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                <Twitter className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                <Instagram className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                <Linkedin className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            </div>
        </div>
        
        <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer">Schedule</li>
                <li className="hover:text-orange-500 cursor-pointer">Sponsors</li>
                <li className="hover:text-orange-500 cursor-pointer">Exhibitors</li>
            </ul>
        </div>
        
        <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Community</h4>
            <ul className="space-y-4 text-sm text-gray-400">
                <li className="hover:text-orange-500 cursor-pointer">Speakers</li>
                <li className="hover:text-orange-500 cursor-pointer">Blog</li>
                <li className="hover:text-orange-500 cursor-pointer">Code of Conduct</li>
            </ul>
        </div>

        <div>
             <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Newsletter</h4>
             <div className="flex items-center border-b border-white/20 pb-2">
                 <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-600" />
                 <button className="text-white hover:text-orange-500">
                     <ArrowRight size={16} />
                 </button>
             </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>Eklavya All Rights Reserved @2024</p>
          <div className="flex gap-6 mt-4 md:mt-0">
              <span className="cursor-pointer hover:text-gray-400">Privacy Policy</span>
              <span className="cursor-pointer hover:text-gray-400">Terms of Service</span>
          </div>
      </div>

    </footer>
  );
};

export default Footer;
