import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  CreditCard, 
  Calculator, 
  FileCheck, 
  Clock,
  CheckCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useState } from "react";

const Financing = () => {
  const [loanAmount, setLoanAmount] = useState(150000);
  const [downPayment, setDownPayment] = useState(30000);
  const [loanTerm, setLoanTerm] = useState(60);
  const interestRate = 5.9;

  const monthlyPayment =
    ((loanAmount - downPayment) * (interestRate / 100 / 12)) /
    (1 - Math.pow(1 + interestRate / 100 / 12, -loanTerm));

  const benefits = [
    "Competitive rates starting at 5.9% APR",
    "Flexible terms from 12 to 84 months",
    "Quick pre-approval process",
    "No prepayment penalties",
    "Personalized payment plans",
    "Expert financing advisors",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Financing Options
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Flexible <span className="gold-gradient-text">Financing</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Tailored financing solutions designed for discerning collectors with competitive rates and flexible terms.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Calculator */}
              <div className="luxury-card rounded-lg p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Payment Calculator</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Vehicle Price: ${loanAmount.toLocaleString()}
                    </label>
                    <Slider
                      defaultValue={[loanAmount]}
                      min={50000}
                      max={3000000}
                      step={10000}
                      onValueChange={(val) => setLoanAmount(val[0])}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Down Payment: ${downPayment.toLocaleString()}
                    </label>
                    <Slider
                      defaultValue={[downPayment]}
                      min={0}
                      max={loanAmount * 0.5}
                      step={5000}
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
                    <Input value={`${interestRate}% APR`} disabled className="bg-secondary border-border" />
                  </div>
                </div>

                {/* Result */}
                <div className="mt-8 p-6 bg-charcoal rounded-lg text-center">
                  <div className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</div>
                  <div className="font-serif text-5xl font-bold gold-gradient-text mb-4">
                    ${Math.round(monthlyPayment).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">
                    Loan Amount: ${(loanAmount - downPayment).toLocaleString()} over {loanTerm} months
                  </div>
                  <Button variant="hero" className="w-full">
                    Apply for Pre-Approval
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  Why Finance With <span className="gold-gradient-text">Prestige Motors</span>?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  We understand that acquiring a luxury or vintage automobile is a significant investment. 
                  Our financing specialists work with top-tier lenders to secure the best terms for your purchase.
                </p>

                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Process */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <FileCheck className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="font-semibold text-foreground text-sm">Apply Online</div>
                  </div>
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="font-semibold text-foreground text-sm">24hr Approval</div>
                  </div>
                  <div className="luxury-card rounded-lg p-4 text-center">
                    <CreditCard className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="font-semibold text-foreground text-sm">Drive Away</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Secure Your Dream Vehicle?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Our financing team is ready to help you find the perfect payment plan.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                Get Started
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

export default Financing;
