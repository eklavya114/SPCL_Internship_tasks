import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  FileText,
  Check,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const VehicleDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [downPayment, setDownPayment] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate] = useState(6.5);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching vehicle:', error);
        } else if (data) {
          // Flatten/normalize data if necessary or use as is
          setVehicle({
            ...data,
            // Ensure images is an array if it's stored as JSON or singular string
            // For now, assuming image field is a single string and we create an array for the gallery
            // In a real app, you'd likely have a separate images table or array column
            images: data.image ? [data.image] : [],
            // Also need to handle nested jsonb fields (specs, features) correctly
            specs: data.specs || { engine: [], dimensions: [], performance: [] },
            features: data.features || [],
          });

          if (data.price) {
            setDownPayment(Math.round(data.price * 0.2)); // Set default down payment to 20%
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading vehicle details...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
          <Link to="/inventory">
            <Button variant="hero">Return to Inventory</Button>
          </Link>
        </div>
      </div>
    );
  }

  const monthlyPayment =
    ((vehicle.price - downPayment) * (interestRate / 100 / 12)) /
    (1 - Math.pow(1 + interestRate / 100 / 12, -loanTerm));

  // Determine images to show (fallback to placeholder if empty)
  const displayImages = vehicle.images && vehicle.images.length > 0
    ? vehicle.images
    : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/inventory" className="hover:text-primary transition-colors">
              Inventory
            </Link>
            <span>/</span>
            <span className="text-foreground">{vehicle.name}</span>
          </nav>
        </div>

        {/* Main Content */}
        <section className="pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Gallery */}
              <div>
                {/* Main Image */}
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <img
                    src={displayImages[selectedImage]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {vehicle.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      {vehicle.badge}
                    </span>
                  )}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Navigation Arrows (only if multiple images) */}
                  {displayImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0))}
                        className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {displayImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {displayImages.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-primary" : "border-transparent hover:border-primary/50"
                          }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{vehicle.year}</span>
                  <span>•</span>
                  <span>{vehicle.body_type || vehicle.bodyType}</span>
                  <span>•</span>
                  <span>VIN: {vehicle.vin || 'N/A'}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {vehicle.name}
                </h1>

                <div className="flex items-center gap-6 mb-6">
                  <span className="font-serif text-3xl font-bold gold-gradient-text">
                    ${vehicle.price?.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${(vehicle.price * 1.1).toLocaleString()}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">{vehicle.description}</p>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <Gauge className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Mileage</div>
                    <div className="font-semibold text-foreground">{vehicle.mileage} mi</div>
                  </div>
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <Fuel className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Fuel</div>
                    <div className="font-semibold text-foreground">{vehicle.fuel}</div>
                  </div>
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <Settings className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Transmission</div>
                    <div className="font-semibold text-foreground">{vehicle.transmission}</div>
                  </div>
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <Palette className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground">Color</div>
                    <div className="font-semibold text-foreground">{vehicle.color}</div>
                  </div>
                  {vehicle.engine && (
                    <div className="luxury-card rounded-lg p-4 text-center">
                      <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Engine</div>
                      <div className="font-semibold text-foreground">{vehicle.engine}</div>
                    </div>
                  )}
                  {vehicle.drivetrain && (
                    <div className="luxury-card rounded-lg p-4 text-center">
                      <Settings className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Drivetrain</div>
                      <div className="font-semibold text-foreground">{vehicle.drivetrain}</div>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="hero" size="lg" className="flex-1">
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Test Drive
                  </Button>
                  <Button variant="heroOutline" size="lg" className="flex-1">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Certified Pre-Owned
                  </span>
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Full History Report
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-16">
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary mb-8">
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="financing">Financing</TabsTrigger>
                </TabsList>

                <TabsContent value="specs">
                  <div className="grid md:grid-cols-3 gap-8">
                    {vehicle.specs?.engine && (
                      <div className="luxury-card rounded-lg p-6">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Engine</h3>
                        <ul className="space-y-3">
                          {vehicle.specs.engine.map((spec: any) => (
                            <li key={spec.name} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{spec.name}</span>
                              <span className="text-foreground font-medium">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {vehicle.specs?.dimensions && (
                      <div className="luxury-card rounded-lg p-6">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Dimensions</h3>
                        <ul className="space-y-3">
                          {vehicle.specs.dimensions.map((spec: any) => (
                            <li key={spec.name} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{spec.name}</span>
                              <span className="text-foreground font-medium">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {vehicle.specs?.performance && (
                      <div className="luxury-card rounded-lg p-6">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Performance</h3>
                        <ul className="space-y-3">
                          {vehicle.specs.performance.map((spec: any) => (
                            <li key={spec.name} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{spec.name}</span>
                              <span className="text-foreground font-medium">{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  <div className="luxury-card rounded-lg p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {vehicle.features?.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-primary" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financing">
                  <div className="luxury-card rounded-lg p-8">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Payment Calculator</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">
                            Down Payment: ${downPayment.toLocaleString()}
                          </label>
                          <Slider
                            defaultValue={[downPayment]}
                            max={vehicle.price * 0.5}
                            step={1000}
                            onValueChange={(val) => setDownPayment(val[0])}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">
                            Loan Term: {loanTerm} months
                          </label>
                          <Slider
                            defaultValue={[loanTerm]}
                            min={12}
                            max={84}
                            step={12}
                            onValueChange={(val) => setLoanTerm(val[0])}
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Interest Rate</label>
                          <Input value={`${interestRate}%`} disabled className="bg-secondary border-border" />
                        </div>
                      </div>
                      <div className="luxury-card rounded-lg p-6 bg-charcoal-light">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</div>
                          <div className="font-serif text-4xl font-bold gold-gradient-text mb-4">
                            ${Math.round(monthlyPayment).toLocaleString()}/mo
                          </div>
                          <div className="text-sm text-muted-foreground mb-6">
                            Loan Amount: ${(vehicle.price - downPayment).toLocaleString()}
                          </div>
                          <Button variant="hero" className="w-full">
                            Apply for Financing
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetail;
