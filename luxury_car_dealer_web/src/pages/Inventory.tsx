import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Calendar, Gauge, Fuel, Grid3X3, List, Heart } from "lucide-react";
import { supabase, Vehicle } from "@/lib/supabase";

const Inventory = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase.from('vehicles').select('*');
        if (error) {
          console.error('Error fetching vehicles:', error);
        } else if (data) {
          // Map DB response to UI format if needed, or just use as is if names match
          const mappedVehicles = data.map((v: any) => ({
            id: v.id,
            name: v.name,
            year: v.year,
            price: v.price,
            mileage: v.mileage,
            fuel: v.fuel,
            bodyType: v.body_type, // Mapped from snake_case
            transmission: v.transmission,
            color: v.color,
            image: v.image,
            badge: v.badge,
            // Add other fields if useful for filtering locally
          }));
          setVehicles(mappedVehicles);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Filter vehicles locally for now (can be moved to DB query for performance later)
  const filteredVehicles = vehicles.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    // Add other filters as needed logic
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero Banner */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Browse <span className="gold-gradient-text">Inventory</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore our curated selection of the world's most exceptional vintage and luxury automobiles.
            </p>
          </div>
        </section>

        {/* Filters & Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="luxury-card rounded-lg p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground">Filters</h3>
                    <Filter className="w-5 h-5 text-primary" />
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search vehicles..."
                        className="pl-10 bg-secondary border-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Make */}
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Make</label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="All Makes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        <SelectItem value="rolls-royce">Rolls-Royce</SelectItem>
                        <SelectItem value="jaguar">Jaguar</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="aston-martin">Aston Martin</SelectItem>
                        <SelectItem value="ferrari">Ferrari</SelectItem>
                        <SelectItem value="porsche">Porsche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Body Type */}
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Body Type</label>
                    <Select>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="coupe">Coupe</SelectItem>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="convertible">Convertible</SelectItem>
                        <SelectItem value="roadster">Roadster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year Range */}
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Year Range</label>
                    <div className="flex items-center gap-2">
                      <Input placeholder="From" className="bg-secondary border-border" defaultValue="1950" />
                      <span className="text-muted-foreground">–</span>
                      <Input placeholder="To" className="bg-secondary border-border" defaultValue="1980" />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                    </label>
                    <Slider
                      defaultValue={priceRange}
                      max={3000000}
                      step={50000}
                      onValueChange={setPriceRange}
                      className="mt-4"
                    />
                  </div>

                  <Button variant="hero" className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </aside>

              {/* Vehicle Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Showing <span className="text-foreground font-medium">{filteredVehicles.length}</span> vehicles
                  </p>
                  <div className="flex items-center gap-4">
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-40 bg-secondary border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="year-new">Year: Newest</SelectItem>
                        <SelectItem value="year-old">Year: Oldest</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center border border-border rounded-md overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Grid3X3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                {loading ? (
                  <div className="text-center py-20 text-muted-foreground">Loading inventory...</div>
                ) : filteredVehicles.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">No vehicles found matching your criteria.</div>
                ) : (
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                    {filteredVehicles.map((car) => (
                      <Link
                        key={car.id}
                        to={`/inventory/${car.id}`}
                        className={`group luxury-card rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 ${viewMode === "list" ? "flex" : ""
                          }`}
                      >
                        {/* Image */}
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 flex-shrink-0" : "aspect-[4/3]"}`}>
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback for broken images if supabase storage isn't set up yet
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          {car.badge && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                              {car.badge}
                            </span>
                          )}
                          <button
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{car.year}</span>
                            <span>•</span>
                            <span>{car.bodyType}</span>
                          </div>
                          <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                            {car.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Gauge className="w-4 h-4" />
                              {car.mileage} mi
                            </span>
                            <span className="flex items-center gap-1">
                              <Fuel className="w-4 h-4" />
                              {car.fuel}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <span className="font-serif text-xl font-bold gold-gradient-text">
                              ${car.price.toLocaleString()}
                            </span>
                            <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                              View Details →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Inventory;
