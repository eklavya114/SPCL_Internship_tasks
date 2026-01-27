import { Link } from "react-router-dom";
import { Award, Users, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const highlights = [
  "Certified Pre-Owned Program",
  "Concierge Buying Service",
  "Worldwide Sourcing Network",
  "Expert Authentication",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="py-24 bg-charcoal overflow-hidden relative">
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "200%" } : {}}
            transition={{ 
              duration: 8, 
              delay: i * 0.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${20 + i * 15}%`, width: "100%" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid with Animations */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-6 -left-6 w-full h-full border-2 border-primary/30 rounded-lg pointer-events-none"
            />
            
            <motion.div style={{ y: imageY }} className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  className="aspect-[4/5] rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury showroom"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                    alt="Classic car detail"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
              </div>
              <div className="pt-8 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"
                    alt="Vintage car"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="aspect-[4/5] rounded-lg overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80"
                    alt="Car interior"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Floating Stats Card with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-8 -right-4 lg:right-8 glass-effect rounded-lg p-6 shadow-elegant"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <Award className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <div className="font-serif text-2xl font-bold text-foreground">38 Years</div>
                  <div className="text-sm text-muted-foreground">of Excellence</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content with Staggered Animations */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              About Prestige Motors
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              A Legacy of{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="gold-gradient-text inline-block"
              >
                Automotive Excellence
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              Since 1985, Prestige Motors has been the destination for collectors 
              seeking the world's most exceptional automobiles. Our passion for 
              automotive heritage drives us to curate only the finest vehicles, 
              each with verified provenance and impeccable condition.
            </motion.p>

            {/* Highlights with Staggered Animation */}
            <ul className="space-y-4 mb-10">
              {highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  </motion.div>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Mini Stats with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 p-6 bg-secondary/50 rounded-lg mb-8"
            >
              {[
                { icon: Users, value: "5K+", label: "Happy Clients" },
                { icon: Award, value: "150+", label: "Awards Won" },
                { icon: Clock, value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`text-center ${index === 1 ? "border-x border-border/30" : ""}`}
                >
                  <motion.div whileHover={{ rotate: 10 }}>
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  </motion.div>
                  <div className="font-serif text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/about">Discover Our Story</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
