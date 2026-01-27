import React from 'react';
import { Coffee, MessageCircle, Users, Zap } from 'lucide-react';
import Button from './Button';

const NetworkingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 animate-fade-in">
      
      {/* Hero */}
      <div className="container mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            Connect & <span className="gradient-text">Collaborate</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Our summit isn't just about listening—it's about meeting the people who will change your career. Experience next-level networking.
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
              {
                  title: "VIP Lounges",
                  desc: "Exclusive spaces for speakers and VIP pass holders to unwind and discuss industry trends in a relaxed atmosphere.",
                  icon: Coffee,
                  image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
              },
              {
                  title: "Speed Networking",
                  desc: "Fast-paced, structured 5-minute meetings designed to help you meet maximum people in minimum time. AI-matched.",
                  icon: Zap,
                  image: "https://images.unsplash.com/photo-1515169067750-d51a73b55163?q=80&w=800&auto=format&fit=crop"
              },
              {
                  title: "Topic Tables",
                  desc: "Join roundtable discussions led by industry experts on specific niches like AI Ethics, Web3, and Sustainable Tech.",
                  icon: Users,
                  image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop"
              },
              {
                  title: "After-Hours Gala",
                  desc: "The networking doesn't stop when the sun goes down. Join our legendary parties with live music and open bars.",
                  icon: MessageCircle,
                  image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
              }
          ].map((feature, idx) => (
              <div key={idx} className="relative h-80 rounded-2xl overflow-hidden border border-white/10 group">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-8 flex flex-col justify-end">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4 text-white">
                          <feature.icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.desc}</p>
                  </div>
              </div>
          ))}
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 text-center">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-12 md:p-20 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-6">Expand Your Network</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">Don't miss the opportunity to connect with over 10,000 industry professionals.</p>
                <Button>Get Networking Pass</Button>
              </div>
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          </div>
      </div>

    </div>
  );
};

export default NetworkingPage;