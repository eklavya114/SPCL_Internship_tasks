import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="font-serif text-8xl sm:text-9xl font-bold gold-gradient-text mb-4">
            404
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let us help you find your way back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/inventory">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Browse Inventory
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
