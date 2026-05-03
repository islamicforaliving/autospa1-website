"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu, X, Phone, MapPin, Clock, Star, Shield, Sparkles, Car, Sun,
  Droplets, CheckCircle, ArrowRight, ChevronRight, Quote, Award, Users, ThumbsUp,
} from "lucide-react";

const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } as const } };
const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      const duration = 2000, steps = 60, increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) { setCount(value); clearInterval(timer); }
        else setCount(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const realReviews = [
  { quote: "Guss and Employees Did a Great Job on My 1 Half Old Truck with Detailing the inside of the truck and Ceramic coating wax. My Truck is Better Than When It was Brand New. I Give His Team more than 5 Star!", name: "Scott", rating: 5, service: "Ceramic Coating & Detailing" },
  { quote: "Great pricing for amazing work, had my car looking brand new again! Best car detailing place in Westland!", name: "Happy Customer", rating: 5, service: "Full Detail" },
  { quote: "Gus is the best thank you. Amazing service! The owner is friendly and kind, and the shop is reliable for window tints and detailing.", name: "Verified Customer", rating: 5, service: "Window Tinting" },
  { quote: "Outstanding quality of work! The detailing service leaves cars looking brand new, even if they are older models. Same-day appointments available!", name: "Regular Customer", rating: 5, service: "Interior Detailing" },
];

const services = [
  { icon: Sun, title: "Window Tinting", description: "Premium ceramic and carbon tint films that block UV rays, reduce heat, and enhance privacy while looking sleek.", price: "$199", features: ["UV Protection", "Heat Reduction", "Privacy Enhancement", "Lifetime Warranty"] },
  { icon: Sparkles, title: "Ceramic Coating", description: "Long-lasting paint protection with hydrophobic technology. Your paint stays showroom-new with minimal maintenance.", price: "$799", features: ["5-Year Protection", "Hydrophobic Finish", "Chemical Resistance", "Deep Gloss"] },
  { icon: Shield, title: "Paint Protection Film", description: "Self-healing clear bra that protects against rock chips, scratches, and road debris. Invisible protection.", price: "$1,199", features: ["Self-Healing", "Rock Chip Protection", "Stain Resistant", "Invisible Finish"] },
  { icon: Car, title: "Full Detail Package", description: "Complete interior and exterior restoration. Paint correction, leather treatment, and engine bay detailing.", price: "$349", features: ["Paint Correction", "Interior Deep Clean", "Engine Bay Detail", "Leather Treatment"] },
  { icon: Droplets, title: "Interior Detailing", description: "Deep cleaning of carpets, seats, and surfaces. Leather conditioning and odor elimination included.", price: "$149", features: ["Steam Cleaning", "Odor Removal", "Stain Treatment", "UV Protection"] },
  { icon: CheckCircle, title: "Windshield Repair", description: "Professional chip and crack repair to restore visibility and prevent further damage. Quick same-day service.", price: "$89", features: ["Same-Day Service", "Chip Repair", "Crack Repair", "Insurance Approved"] },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: "smooth" }); setIsMenuOpen(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.a href="#" className="flex items-center gap-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">AUTO SPA <span className="text-blue-400">1</span></span>
            </motion.a>
            <div className="hidden md:flex items-center gap-8">
              {["Services", "Reviews", "Process", "Contact"].map((item) => (
                <motion.button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm text-zinc-400 hover:text-white transition-colors relative group" whileHover={{ y: -2 }}>
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-medium px-6">Get Quote</Button>
              </motion.div>
            </div>
            <motion.button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              {["Services", "Reviews", "Process", "Contact"].map((item) => (
                <motion.button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left text-zinc-400 hover:text-white py-3 border-b border-white/5" whileHover={{ x: 10 }}>{item}</motion.button>
              ))}
              <Button onClick={() => scrollToSection("contact")} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-4">Get Quote</Button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-8 bg-white/5 text-white border-white/10 hover:bg-white/10 backdrop-blur-sm px-4 py-2">
                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />#1 Rated Auto Detailing in Westland
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight mb-8">
              <span className="block">Transform Your</span>
              <motion.span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" animate={{ backgroundPosition: ["0%", "100%", "0%"] }} transition={{ duration: 5, repeat: Infinity }}>Vehicle Today</motion.span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">Premium window tinting, ceramic coating, and auto detailing in Westland, MI. Experience the Auto Spa 1 difference.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-semibold px-10 py-7 text-lg rounded-full">Get Free Quote<ArrowRight className="ml-2 w-5 h-5" /></Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" onClick={() => scrollToSection("services")} className="border-white/20 text-white hover:bg-white/10 font-semibold px-10 py-7 text-lg rounded-full">View Services</Button>
              </motion.div>
            </motion.div>
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[{ value: 157, suffix: "+", label: "5-Star Reviews" }, { value: 500, suffix: "+", label: "Vehicles Detailed" }, { value: 5, suffix: ".0", label: "Star Rating" }, { value: 6, suffix: "+", label: "Years Experience" }].map((stat, index) => (
                <motion.div key={index} variants={scaleIn} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10" whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div animate={{ opacity: [1, 0], y: [0, 12] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <section id="services" className="py-32 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">Premium Services</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 max-w-2xl mx-auto">From window tinting to full detailing packages, we provide premium automotive services tailored to your needs.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-500 h-full group overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500" />
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <service.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-zinc-400 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-500"><CheckCircle className="w-4 h-4 text-emerald-400" />{feature}</li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div><span className="text-zinc-500 text-sm">Starting at</span><div className="text-3xl font-bold text-white">{service.price}</div></div>
                      <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" onClick={() => scrollToSection("contact")} className="bg-white/10 hover:bg-white/20 text-white rounded-full">Book Now<ChevronRight className="w-4 h-4 ml-1" /></Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="reviews" className="py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2"><ThumbsUp className="w-4 h-4 mr-2" />157+ Happy Customers</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">What Our Customers Say</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 max-w-2xl mx-auto">Real reviews from real customers in Westland and beyond.</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 max-w-4xl mx-auto">
              <CardContent className="p-10">
                <Quote className="w-12 h-12 text-blue-400 mb-6" />
                <p className="text-2xl text-white leading-relaxed mb-6">&ldquo;Guss and Employees Did a Great Job on My 1 Half Old Truck with Detailing the inside of the truck and Ceramic coating wax. My Truck is Better Than When It was Brand New. I Give His Team more than 5 Star!&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">S</div>
                  <div><div className="text-white font-semibold text-lg">Scott</div><div className="text-zinc-400">Ceramic Coating & Detailing</div></div>
                  <div className="ml-auto flex gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {realReviews.slice(1).map((review, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />))}</div>
                    <p className="text-zinc-300 mb-6 leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><span className="text-sm font-medium text-white">{review.name.charAt(0)}</span></div>
                      <div><p className="text-white font-medium">{review.name}</p><p className="text-zinc-500 text-sm">{review.service}</p></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="process" className="py-32 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2">Simple & Easy</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">How It Works</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ step: "01", title: "Book Appointment", description: "Call or text us to schedule. Same-day appointments often available!", icon: Phone }, { step: "02", title: "Drop Off Vehicle", description: "Bring your car to our shop at 38505 Ford Rd, Westland.", icon: MapPin }, { step: "03", title: "We Work Our Magic", description: "Our expert team transforms your vehicle with precision care.", icon: Sparkles }, { step: "04", title: "Pick Up & Enjoy", description: "Drive away in a vehicle that looks better than new!", icon: Car }].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.6 }} className="relative">
                {index < 3 && (<div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent" />)}
                <div className="text-7xl font-bold text-white/5 mb-4">{item.step}</div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6"><item.icon className="w-8 h-8 text-blue-400" /></div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.div variants={fadeInUp}><Badge className="mb-6 bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-2"><Award className="w-4 h-4 mr-2" />Voted #1 in Westland</Badge></motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold text-white mb-6">Why Choose Auto Spa 1?</motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-zinc-400 mb-10">We don&apos;t just clean vehicles — we restore, protect, and maintain them. Our expert service guarantees results that exceed expectations.</motion.p>
              <motion.div variants={staggerContainer} className="space-y-6">
                {[{ icon: Users, title: "Expert Technicians", desc: "Trained professionals with years of experience" }, { icon: Clock, title: "Same-Day Service", desc: "Quick turnaround without compromising quality" }, { icon: Shield, title: "Satisfaction Guaranteed", desc: "100% satisfaction or we&apos;ll make it right" }, { icon: Award, title: "Premium Products", desc: "Only the best ceramic coatings and films" }].map((feature, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all" whileHover={{ x: 10 }}>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0"><feature.icon className="w-6 h-6 text-blue-400" /></div>
                    <div><h4 className="text-white font-semibold mb-1">{feature.title}</h4><p className="text-zinc-400">{feature.desc}</p></div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center">
                  <div className="text-center p-12">
                    <Car className="w-32 h-32 text-blue-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform?</h3>
                    <p className="text-zinc-400 mb-8 max-w-md">Book your appointment today and see why we&apos;re Westland&apos;s #1 choice for auto detailing.</p>
                    <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-semibold px-8 py-6 rounded-full">Get Started Now<ArrowRight className="ml-2 w-5 h-5" /></Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.div variants={fadeInUp}><Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">Get In Touch</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Ready to Transform Your Vehicle?</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 max-w-2xl mx-auto">Book your appointment today. Walk-ins welcome, appointments recommended.</motion.p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
              <Card className="bg-white/5 border-white/10"><CardContent className="p-8"><div className="flex items-start gap-4"><div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-7 h-7 text-blue-400" /></div><div><h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3><p className="text-zinc-400">38505 Ford Rd<br />Westland, MI 48185</p></div></div></CardContent></Card>
              <Card className="bg-white/5 border-white/10"><CardContent className="p-8"><div className="flex items-start gap-4"><div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0"><Phone className="w-7 h-7 text-purple-400" /></div><div><h3 className="text-xl font-semibold text-white mb-2">Call or Text</h3><a href="tel:734-352-9000" className="text-zinc-400 hover:text-white transition-colors text-lg">(734) 352-9000</a></div></div></CardContent></Card>
              <Card className="bg-white/5 border-white/10"><CardContent className="p-8"><div className="flex items-start gap-4"><div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0"><Clock className="w-7 h-7 text-emerald-400" /></div><div><h3 className="text-xl font-semibold text-white mb-2">Hours</h3><p className="text-zinc-400">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 8:00 AM - 3:00 PM<br />Sun: Closed</p></div></div></CardContent></Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">Request a Quote</h3>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm text-zinc-400 mb-2">Name</label><input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="Your name" /></div>
                      <div><label className="block text-sm text-zinc-400 mb-2">Phone</label><input type="tel" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="Your phone" /></div>
                    </div>
                    <div><label className="block text-sm text-zinc-400 mb-2">Service</label><select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 transition-colors"><option value="" className="bg-[#141414]">Select a service</option><option value="tinting" className="bg-[#141414]">Window Tinting</option><option value="ceramic" className="bg-[#141414]">Ceramic Coating</option><option value="ppf" className="bg-[#141414]">Paint Protection Film</option><option value="detail" className="bg-[#141414]">Full Detail Package</option><option value="interior" className="bg-[#141414]">Interior Detailing</option><option value="windshield" className="bg-[#141414]">Windshield Repair</option></select></div>
                    <div><label className="block text-sm text-zinc-400 mb-2">Message</label><textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" placeholder="Tell us about your vehicle..." /></div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-semibold py-6 rounded-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"><Car className="w-7 h-7 text-white" /></div>
                <span className="text-2xl font-bold text-white">AUTO SPA <span className="text-blue-400">1</span></span>
              </div>
              <p className="text-zinc-400 max-w-sm mb-6">Premium window tinting and auto detailing services in Westland, MI. Transforming vehicles with expert care since 2019.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                {["Window Tinting", "Ceramic Coating", "Paint Protection", "Auto Detailing", "Windshield Repair"].map((service) => (
                  <li key={service}><button onClick={() => scrollToSection("services")} className="text-zinc-400 hover:text-white transition-colors">{service}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-zinc-400">
                <li>38505 Ford Rd</li>
                <li>Westland, MI 48185</li>
                <li><a href="tel:734-352-9000" className="hover:text-white transition-colors">(734) 352-9000</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-500 text-sm">&copy; 2025 Auto Spa 1. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}