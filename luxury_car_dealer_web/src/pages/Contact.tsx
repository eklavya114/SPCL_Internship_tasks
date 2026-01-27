import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: `${formData.subject ? `[${formData.subject}] ` : ''}${formData.message}`,
        }
      ]);

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will get back to you shortly.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Contact <span className="gold-gradient-text">Us</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Our team of specialists is ready to assist you with any inquiries about our collection or services.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                  Visit Our <span className="gold-gradient-text">Showroom</span>
                </h2>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        123 Luxury Lane<br />
                        Beverly Hills, CA 90210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href="mailto:info@prestigemotors.com" className="text-muted-foreground hover:text-primary transition-colors">
                        info@prestigemotors.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 7:00 PM<br />
                        Sunday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-video rounded-lg overflow-hidden bg-charcoal">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.1234567890123!2d-118.40123456789012!3d34.07234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzIwLjQiTiAxMTjCsDI0JzA0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(100%) invert(92%)" }}
                    loading="lazy"
                    title="Showroom Location"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="luxury-card rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <h2 className="font-serif text-2xl font-semibold text-foreground">Send a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                        <Input
                          name="firstName"
                          placeholder="John"
                          className="bg-secondary border-border"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                        <Input
                          name="lastName"
                          placeholder="Doe"
                          className="bg-secondary border-border"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-secondary border-border"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+1 (234) 567-890"
                        className="bg-secondary border-border"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                      <Input
                        name="subject"
                        placeholder="Inquiry about a specific vehicle..."
                        className="bg-secondary border-border"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                      <Textarea
                        name="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="bg-secondary border-border resize-none"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button variant="hero" size="lg" className="w-full" disabled={loading}>
                      <Send className="w-5 h-5 mr-2" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
