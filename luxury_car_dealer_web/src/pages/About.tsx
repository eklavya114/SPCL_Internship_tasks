import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Target, CheckCircle, ArrowRight } from "lucide-react";

const highlights = [
  "Certified Pre-Owned Program",
  "Concierge Buying Service",
  "Worldwide Sourcing Network",
  "Expert Authentication",
  "Complete Documentation",
  "White-Glove Delivery",
];

const team = [
  {
    name: "Richard Sterling",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Victoria Hammond",
    role: "Head of Acquisitions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "James Wellington",
    role: "Senior Consultant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Elizabeth Monroe",
    role: "Finance Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              About <span className="gold-gradient-text">Prestige Motors</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A legacy of excellence in vintage and luxury automobiles since 1985.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                  A Legacy of{" "}
                  <span className="gold-gradient-text">Automotive Excellence</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Founded in 1985 by Richard Sterling, Prestige Motors began as a small boutique 
                  dealership in Beverly Hills with a singular vision: to curate the world's most 
                  exceptional automobiles for discerning collectors.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Nearly four decades later, we have grown into one of the most respected names 
                  in the vintage and luxury automotive industry. Our reputation is built on 
                  authenticity, expertise, and an unwavering commitment to our clients.
                </p>

                <ul className="grid grid-cols-2 gap-4 mb-8">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"
                      alt="Showroom"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                      alt="Classic car"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="pt-8 space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"
                      alt="Vintage car"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/5] rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80"
                      alt="Car detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Award className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold gold-gradient-text mb-2">38</div>
                <div className="text-muted-foreground">Years in Business</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold gold-gradient-text mb-2">5K+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold gold-gradient-text mb-2">$500M+</div>
                <div className="text-muted-foreground">In Sales</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="font-serif text-4xl font-bold gold-gradient-text mb-2">40+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
                Our Team
              </span>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Meet the <span className="gold-gradient-text">Experts</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Our team brings decades of combined experience in the luxury automotive industry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="group text-center">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
