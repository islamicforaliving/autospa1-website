"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Star,
  Shield,
  Sparkles,
  Car,
  Sun,
  Droplets,
  CheckCircle,
  ArrowRight,
  Share2,
  MessageCircle,
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                AUTO SPA 1
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-black hover:bg-zinc-200 font-medium"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-zinc-400 hover:text-white py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("process")}
                className="block w-full text-left text-zinc-400 hover:text-white py-2"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full text-left text-zinc-400 hover:text-white py-2"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-zinc-400 hover:text-white py-2"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-white text-black hover:bg-zinc-200"
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            5.0 Rating on Google
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
            Premium Auto Care
            <br />
            <span className="text-zinc-400">in Westland, MI</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Experience the ultimate in automotive transformation. Window tinting,
            ceramic coating, and concierge-level detailing that makes your vehicle
            stand out.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-white text-black hover:bg-zinc-200 font-semibold px-8"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              View Services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-zinc-500">Vehicles Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">5.0</div>
              <div className="text-sm text-zinc-500">Star Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">5+</div>
              <div className="text-sm text-zinc-500">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-zinc-500">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              What We Offer
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              From window tinting to full detailing packages, we provide premium
              automotive services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Window Tinting */}
            <Card className="bg-[#141414] border-white/10 group hover:border-white/20 transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <Sun className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Window Tinting
                </h3>
                <p className="text-zinc-400 mb-6">
                  Premium ceramic and carbon tint films that block UV rays, reduce
                  heat, and enhance privacy while looking sleek.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Starting at</span>
                  <span className="text-2xl font-bold text-white">$199</span>
                </div>
              </CardContent>
            </Card>

            {/* Ceramic Coating */}
            <Card className="bg-[#141414] border-white/10 group hover:border-white/20 transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                  <Sparkles className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Ceramic Coating
                </h3>
                <p className="text-zinc-400 mb-6">
                  Long-lasting paint protection with hydrophobic technology. Your
                  paint stays showroom-new with minimal maintenance.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Starting at</span>
                  <span className="text-2xl font-bold text-white">$799</span>
                </div>
              </CardContent>
            </Card>

            {/* Paint Protection */}
            <Card className="bg-[#141414] border-white/10 group hover:border-white/20 transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <Shield className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Paint Protection Film
                </h3>
                <p className="text-zinc-400 mb-6">
                  Self-healing clear bra that protects against rock chips,
                  scratches, and road debris. Invisible protection.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Starting at</span>
                  <span className="text-2xl font-bold text-white">$1,199</span>
                </div>
              </CardContent>
            </Card>

            {/* Full Detail */}
            <Card className="bg-[#141414] border-white/10 group hover:border-white/20 transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                  <Car className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Full Detail Package
                </h3>
                <p className="text-zinc-400 mb-6">
                  Complete interior and exterior restoration. Paint correction,
                  leather treatment, and engine bay detailing.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Starting at</span>
                  <span className="text-2xl font-bold text-white">$349</span>
                </div>
              </CardContent>
            </Card>

            {/* Interior Detailing */}
            <Card className="bg-[#141414] border-white/10 group hover:border-white/20 transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
                  <Droplets className="w-7 h-7 text-rose-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Interior Detailing
                </h3>
                <p className="text-zinc-400 mb-6">
                  Deep cleaning of carpets, seats, and surfaces. Leather
                  conditioning and odor elimination included.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Starting at</span>
                  <span className="text-2xl font-bold text-white">$149</span>
                </div>
              </CardContent>
            </Card>

            {/* Windshield Repair */}
            <Card className="bg-[#141414] border-white/10 group hover:border-white/20 transition-all">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                  <CheckCircle className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Windshield Repair
                </h3>
                <p className="text-zinc-400 mb-6">
                  Professional chip and crack repair to restore visibility and
                  prevent further damage. Quick same-day service.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Starting at</span>
                  <span className="text-2xl font-bold text-white">$89</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              How It Works
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A streamlined experience from consultation to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description:
                  "We assess your vehicle's condition and discuss your goals to create a customized plan.",
              },
              {
                step: "02",
                title: "Preparation",
                description:
                  "Thorough wash and decontamination to ensure the perfect surface for treatment.",
              },
              {
                step: "03",
                title: "Transformation",
                description:
                  "Expert application of tint, coating, or detailing with precision and care.",
              },
              {
                step: "04",
                title: "Delivery",
                description:
                  "Final inspection and reveal. Your vehicle returned in pristine condition.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-white/5 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Testimonials
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What Customers Say
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Real reviews from real customers in Westland and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Absolutely incredible work on my window tinting. The ceramic film keeps my car so much cooler, and it looks amazing!",
                name: "Michael K.",
                initials: "MK",
              },
              {
                quote:
                  "I've been to many detailers, but Auto Spa 1 is on another level. The attention to detail is unmatched. Worth every penny.",
                name: "Sarah R.",
                initials: "SR",
              },
              {
                quote:
                  "They transformed my 5-year-old vehicle into a showroom beauty. The ceramic coating makes washing so easy now.",
                name: "James T.",
                initials: "JT",
              },
            ].map((review, index) => (
              <Card
                key={index}
                className="bg-[#141414] border-white/10"
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-6 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {review.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{review.name}</p>
                      <p className="text-zinc-500 text-sm">Verified Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-white/10 text-white border-white/20">
                Get In Touch
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Vehicle?
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Book your appointment today and experience the Auto Spa 1
                difference. Walk-ins welcome, but appointments recommended.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Location</h4>
                    <p className="text-zinc-400">
                      38505 Ford Rd
                      <br />
                      Westland, MI 48185
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <a
                      href="tel:734-352-9000"
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      (734) 352-9000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Hours</h4>
                    <p className="text-zinc-400">
                      Mon - Fri: 9:00 AM - 5:00 PM
                      <br />
                      Sat: 10:00 AM - 4:00 PM
                      <br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-[#141414] border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Request a Quote
                </h3>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-hidden focus:border-white/30"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-hidden focus:border-white/30"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-hidden focus:border-white/30"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Service Interested In
                    </label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-hidden focus:border-white/30">
                      <option value="" className="bg-[#141414]">
                        Select a service
                      </option>
                      <option value="tinting" className="bg-[#141414]">
                        Window Tinting
                      </option>
                      <option value="ceramic" className="bg-[#141414]">
                        Ceramic Coating
                      </option>
                      <option value="ppf" className="bg-[#141414]">
                        Paint Protection Film
                      </option>
                      <option value="detail" className="bg-[#141414]">
                        Full Detail Package
                      </option>
                      <option value="interior" className="bg-[#141414]">
                        Interior Detailing
                      </option>
                      <option value="windshield" className="bg-[#141414]">
                        Windshield Repair
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-hidden focus:border-white/30 resize-none"
                      placeholder="Tell us about your vehicle and what you need..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-zinc-200 font-semibold py-6"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AUTO SPA 1</span>
              </div>
              <p className="text-zinc-400 max-w-sm mb-6">
                Premium window tinting and auto detailing services in Westland,
                MI. Transforming vehicles with expert care since 2019.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Window Tinting
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Ceramic Coating
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Paint Protection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Auto Detailing
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-zinc-400">38505 Ford Rd</li>
                <li className="text-zinc-400">Westland, MI 48185</li>
                <li>
                  <a
                    href="tel:734-352-9000"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    (734) 352-9000
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">
              © 2025 Auto Spa 1. All rights reserved.
            </p>
            <p className="text-zinc-600 text-sm">
              Website by{" "}
              <a
                href="https://createwebsite4you.com"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                CreateWebsite4You
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
