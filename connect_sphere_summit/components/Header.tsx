
import React, { useState, useEffect } from 'react';
import { Menu, X, UserCircle, LogOut, Settings, Calendar } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import Button from './Button';

interface HeaderProps {
    onLogoClick?: () => void;
    onNavClick?: (id: string) => void;
    onBookingClick?: () => void;
    onProfileClick?: () => void;
    user: any;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavClick, onBookingClick, onProfileClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (onNavClick) {
        onNavClick(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
            className="flex flex-col leading-none z-50 cursor-pointer group"
            onClick={onLogoClick}
        >
          <span className="text-2xl font-black text-white tracking-tighter group-hover:text-orange-500 transition-colors">CONNECT</span>
          <span className="text-xl font-bold gradient-text tracking-widest">SPHERE</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
                <button 
                    key={item.id} 
                    onClick={() => handleNavClick(item.id)}
                    className="text-sm font-semibold text-gray-300 hover:text-white transition-colors tracking-wide uppercase bg-transparent border-none cursor-pointer"
                >
                    {item.label}
                </button>
            ))}
        </div>

        {/* CTA & Profile */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            variant="outline" 
            className="px-8 py-2 text-xs border-opacity-50"
            onClick={onBookingClick}
          >
            Save My Spot
          </Button>

          {user ? (
            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-1.5 rounded-full border border-white/20 hover:border-orange-500 transition-all text-gray-300 hover:text-orange-500"
                >
                    {user.imageUrl ? (
                        <img src={user.imageUrl} className="w-8 h-8 rounded-full object-cover" alt="profile" />
                    ) : (
                        <UserCircle size={28} />
                    )}
                </button>

                {isDropdownOpen && (
                    <>
                        <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)}></div>
                        <div className="absolute right-0 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4 z-10 animate-fade-in">
                            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/5">
                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-white font-bold truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                            <ul className="space-y-1">
                                <li>
                                    <button 
                                        onClick={() => { onProfileClick?.(); setIsDropdownOpen(false); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <UserCircle size={18} /> My Full Profile
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => { handleNavClick('manage'); setIsDropdownOpen(false); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <Settings size={18} /> Management Center
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors mt-2"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
          ) : (
            <button 
                onClick={onProfileClick}
                className="p-1.5 rounded-full border border-white/10 hover:border-white transition-all text-gray-500 hover:text-white"
            >
                <UserCircle size={28} />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden z-50 flex items-center gap-4">
            {user && (
                <button onClick={onProfileClick} className="text-gray-400">
                    <UserCircle size={24} />
                </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)}
              className="text-2xl font-bold text-white uppercase hover:text-orange-500 transition-colors bg-transparent border-none"
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-col items-center gap-4">
            <Button onClick={() => {
                setMobileMenuOpen(false);
                if (onBookingClick) onBookingClick();
            }}>
                Save My Spot
            </Button>
            {user && (
                <button onClick={onLogout} className="text-red-500 font-bold uppercase tracking-widest text-sm">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
