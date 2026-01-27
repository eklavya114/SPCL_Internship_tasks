import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Gauge, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

const featuredCars = [
  {
    id: 1,
    name: "Rolls-Royce Silver Shadow",
    year: 1972,
    price: 185000,
    mileage: "42,000",
    fuel: "Petrol",
    image: car1,
    badge: "Rare Find",
  },
  {
    id: 2,
    name: "Jaguar E-Type Roadster",
    year: 1967,
    price: 225000,
    mileage: "38,500",
    fuel: "Petrol",
    image: car2,
    badge: "Concours Winner",
  },
  {
    id: 3,
    name: "Mercedes-Benz 300SL Gullwing",
    year: 1956,
    price: 1450000,
    mileage: "51,200",
    fuel: "Petrol",
    image: car3,
    badge: "Museum Quality",
  },
  {
    id: 4,
    name: "Aston Martin DB5",
    year: 1964,
    price: 895000,
    mileage: "45,800",
    fuel: "Petrol",
    image: car4,
    badge: "Iconic Classic",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function FeaturedVehicles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 bg-charcoal relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              Featured Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-4xl sm:text-5xl font-bold text-foreground"
            >
              Exceptional <span className="gold-gradient-text">Automobiles</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="outline" asChild>
              <Link to="/inventory">
                View All Inventory
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Vehicle Grid with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredCars.map((car) => (
            <motion.div
              key={car.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link
                to={`/inventory/${car.id}`}
                className="block luxury-card rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
                  />

                  {/* Animated Badge */}
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
                  >
                    {car.badge}
                  </motion.span>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="px-6 py-3 border-2 border-primary text-primary font-medium rounded-full"
                    >
                      View Details
                    </motion.span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year}</span>
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
                    <motion.span
                      className="text-primary text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      View Details →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
