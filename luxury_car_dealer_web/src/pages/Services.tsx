import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  CreditCard, 
  RefreshCw, 
  Wrench, 
  Shield, 
  Truck,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Premium Sales",
    description: "Access an exclusive collection of vintage and luxury vehicles, each meticulously inspected and authenticated.",
    features: [
      "Curated inventory of rare vehicles",
      "Comprehensive vehicle history",
      "Expert authentication process",
      "Competitive pricing",
    ],
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Tailored financing solutions designed for discerning collectors with competitive rates and flexible terms.",
    features: [
      "Pre-approval in 24 hours",
      "Rates from 5.9% APR",
      "Terms up to 84 months",
      "No prepayment penalties",
    ],
  },
  {
    icon: RefreshCw,
    title: "Trade-In Program",
    description: "Receive premium valuations for your current vehicle and apply the value toward your next acquisition.",
    features: [
      "Instant online estimates",
      "Fair market valuations",
      "Same-day appraisals",
      "Seamless transaction process",
    ],
  },
  {
    icon: Wrench,
    title: "Restoration Services",
    description: "Expert restoration services to preserve and enhance the beauty and value of your automotive heritage.",
    features: [
      "Full frame-off restorations",
      "Mechanical rebuilds",
      "Interior refurbishment",
      "Paint and bodywork",
    ],
  },
  {
    icon: Shield,
    title: "Extended Warranty",
    description: "Comprehensive protection plans for peace of mind ownership of your classic or luxury vehicle.",
    features: [
      "Mechanical coverage",
      "Electrical systems",
      "Roadside assistance",
      "Nationwide service network",
    ],
  },
  {
    icon: Truck,
    title: "Global Delivery",
    description: "White-glove transportation service to deliver your vehicle safely to any location worldwide.",
    features: [
      "Enclosed transport",
      "Full insurance coverage",
      "Door-to-door service",
      "Real-time tracking",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              What We Offer
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our <span className="gold-gradient-text">Services</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              From acquisition to ownership, we provide an unparalleled level of service 
              that matches the exceptional quality of our vehicles.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="luxury-card rounded-lg p-8 hover:border-primary/50 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Contact our team to discuss how we can assist you with your automotive needs.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
