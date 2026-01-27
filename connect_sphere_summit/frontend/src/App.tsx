import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UpcomingEvents from './components/UpcomingEvents';
import Speakers from './components/Speakers';
import AllSpeakersPage from './components/AllSpeakersPage';
import TargetAudience from './components/TargetAudience';
import TrustedLeaders from './components/TrustedLeaders';
import CategoryEventsPage from './components/CategoryEventsPage';
import EventsPage from './components/EventsPage';
import NetworkingPage from './components/NetworkingPage';
import ContactPage from './components/ContactPage';
import ManagePage from './components/ManagePage';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';

type ViewState = 'home' | 'events' | 'speakers' | 'networking' | 'manage' | 'contact' | 'all-speakers' | 'category-events';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedBookingEvent, setSelectedBookingEvent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Persistence for user session
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser) setUser(JSON.parse(savedUser));

    // If token exists, refresh profile from backend to ensure role/name are current
    if (token) {
      (async () => {
        try {
          const profile = await (await import('../api')).api.getProfile();
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        } catch (err) {
          // ignore
        }
      })();
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentView('home');
    setIsProfileOpen(false);
  };

  const handleNavClick = (id: string) => {
      if (id === 'speakers') {
          setCurrentView('all-speakers');
      } else {
          setCurrentView(id as ViewState);
      }
      setSelectedCategory(null);
      window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('category-events');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const handleJoinEvent = (eventDetails: any) => {
      if (!user) {
          setIsAuthModalOpen(true);
          return;
      }
      setSelectedBookingEvent(eventDetails);
      setIsBookingModalOpen(true);
  };

  const handleGeneralBooking = () => {
      if (!user) {
          setIsAuthModalOpen(true);
          return;
      }
      setSelectedBookingEvent(null);
      setIsBookingModalOpen(true);
  };

  const handleProfileRequest = () => {
      if (!user) {
          setIsAuthModalOpen(true);
      } else {
          setIsProfileOpen(true);
      }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Header 
        user={user}
        onLogoClick={handleBackToHome} 
        onNavClick={handleNavClick}
        onBookingClick={handleGeneralBooking}
        onProfileClick={handleProfileRequest}
        onLogout={handleLogout}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero onBookingClick={handleGeneralBooking} />
            <TargetAudience onCategoryClick={handleCategoryClick} />
            <UpcomingEvents onJoinEvent={handleJoinEvent} />
            <Speakers onSeeAllClick={() => setCurrentView('all-speakers')} />
            <TrustedLeaders />
          </>
        )}

        {currentView === 'events' && (
            <EventsPage onCategoryClick={handleCategoryClick} onBack={handleBackToHome} />
        )}

        {currentView === 'all-speakers' && (
          <AllSpeakersPage onBack={handleBackToHome} />
        )}

        {currentView === 'networking' && <NetworkingPage />}
        {currentView === 'manage' && <ManagePage user={user} onAuthRequired={() => setIsAuthModalOpen(true)} />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'category-events' && selectedCategory && <CategoryEventsPage categoryId={selectedCategory} onBack={handleBackToHome} />}
      </main>
      
      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        eventDetails={selectedBookingEvent} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      <UserProfile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user}
        onManageClick={() => { setIsProfileOpen(false); setCurrentView('manage'); }}
      />
    </div>
  );
};

export default App;