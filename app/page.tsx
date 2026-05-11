"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Menu, X, Phone, MapPin, Clock, Star, Shield, Sparkles, Car, Sun,
  Droplets, CheckCircle, ArrowRight, ChevronRight, Quote, Award, Users, ThumbsUp,
  ChevronLeft, Play, Pause, ZoomIn, XCircle, Camera, Zap, Heart
} from "lucide-react";

// Simplified animations for mobile performance
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

// Detect mobile for conditional animations
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isInView && !isMobile) {
      const duration = 1500, steps = 30, increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) { setCount(value); clearInterval(timer); }
        else setCount(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(timer);
    } else if (isInView && isMobile) {
      setCount(value);
    }
  }, [isInView, value, isMobile]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const realReviews = [
  { quote: "Guss and Employees Did a Great Job on My 1 Half Old Truck with Detailing the inside of the truck and Ceramic coating wax. My Truck is Better Than When It was Brand New. I Give His Team more than 5 Star!", name: "Scott", rating: 5, service: "Ceramic Coating & Detailing" },
  { quote: "Great pricing for amazing work, had my car looking brand new again! Best car detailing place in Westland!", name: "Happy Customer", rating: 5, service: "Full Detail" },
  { quote: "Gus is the best thank you. Amazing service! The owner is friendly and kind, and the shop is reliable for window tints and detailing.", name: "Verified Customer", rating: 5, service: "Window Tinting" },
  { quote: "Outstanding quality of work! The detailing service leaves cars looking brand new, even if they are older models. Same-day appointments available!", name: "Regular Customer", rating: 5, service: "Interior Detailing" },
];

const services = [
  { icon: Sun, title: "Window Tinting", description: "Premium ceramic and carbon tint films that block UV rays, reduce heat, and enhance privacy while looking sleek.", price: "", features: ["UV Protection", "Heat Reduction", "Privacy Enhancement", "Lifetime Warranty"] },
  { icon: Sparkles, title: "Ceramic Coating", description: "Long-lasting paint protection with hydrophobic technology. Your paint stays showroom-new with minimal maintenance.", price: "$799", features: ["7 Years of Protection", "Hydrophobic Finish", "Chemical Resistance", "Deep Gloss"] },
  { icon: CheckCircle, title: "Windshield Repair", description: "Professional chip and crack repair to restore visibility and prevent further damage. Quick same-day service.", price: "", features: ["Same-Day Service", "Chip Repair", "Crack Repair", "Insurance Approved"] },
];

const pricingPackages = [
  {
    name: "Exterior Only",
    description: "Exterior detailing packages",
    options: [
      { name: "Basic Exterior", priceCar: 160, priceMinivan: 200, features: ["Wash", "Removes Tar & Bugs", "Tires & Rims", "Wheel Wells", "Windows", "All Chrome", "Gas Door"] },
      { name: "Wax Only", priceCar: 100, priceMinivan: 150, features: ["Exterior Wash", "Hand Wax", "Tire Shine", "Windows"] },
      { name: "Buff & Wax", priceCar: 300, priceMinivan: 340, features: ["Exterior Wash", "Paint Buffing", "Premium Wax", "Tire Shine", "Windows"] },
    ],
    note: "Black & White Vehicles +$20",
    popular: false,
    color: "from-blue-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
  },
  {
    name: "Interior Only",
    description: "Deep interior cleaning and restoration",
    options: [
      { name: "Interior Detail", priceCar: 150, priceMinivan: 170, features: ["Vacuum & Shampoo", "Leather Treatment", "Dashboard & Console", "Door Panels", "Door Jambs", "Odor Elimination", "Stain Removal", "Floor Mats", "Headliner"] },
    ],
    note: "Pet Hair Removal +$20",
    popular: false,
    color: "from-purple-500 to-pink-400",
    image: "/interior-detail.webp",
  },
  {
    name: "Complete Packages",
    description: "Interior + Exterior combined",
    options: [
      { name: "Complete Basic", priceCar: 200, priceMinivan: 240, features: ["Full Interior Detail", "Full Exterior Detail", "Door Jambs"] },
      { name: "Complete + Wax", priceCar: 250, priceMinivan: 290, features: ["Full Interior Detail", "Full Exterior Detail", "Premium Wax", "Door Jambs"] },
      { name: "Complete + Buff & Wax", priceCar: 350, priceMinivan: 390, features: ["Full Interior Detail", "Full Exterior Detail", "Paint Buffing", "Premium Wax", "Door Jambs"] },
    ],
    note: "Best Value",
    popular: true,
    color: "from-amber-500 to-orange-400",
    image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800&q=80",
  },
];

const showcaseImages = [
  { 
    src: "/images/showcase-corvette-blue.webp",
    title: "Chevrolet Corvette",
    description: "Premium ceramic tint on blue convertible"
  },
  { 
    src: "/images/showcase-silverado.webp",
    title: "Chevrolet Silverado",
    description: "Window tinting on red pickup truck"
  },
  { 
    src: "/images/hero-skyline.webp",
    title: "Nissan Skyline R34",
    description: "Premium ceramic tint with color-shifting finish"
  },
  { 
    src: "/images/showcase-1.webp",
    title: "Premium Window Tinting",
    description: "Ceramic tint installation on Cadillac CT4-V"
  },
  { 
    src: "/images/showcase-2.webp",
    title: "Professional Detailing",
    description: "Complete exterior detail with showroom shine"
  },
  { 
    src: "/images/showcase-3.webp",
    title: "Interior Restoration",
    description: "Leather treatment and deep cleaning"
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{[key: string]: string}>({
    "Exterior Only": "Car",
    "Interior Only": "Car",
    "Complete Packages": "Car"
  });
  const [selectedOption, setSelectedOption] = useState<{[key: string]: number}>({
    "Exterior Only": 0,
    "Interior Only": 0,
    "Complete Packages": 0
  });
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{before: string, after: string, title: string} | null>(null);
  const isMobile = useIsMobile();
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: "smooth" }); setIsMenuOpen(false); }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % showcaseImages.length);
    }, isMobile ? 5000 : 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile]);

  const getPrice = (pkg: typeof pricingPackages[0], vehicleType: string, optionIndex: number) => {
    const option = pkg.options[optionIndex];
    if (!option) return 0;
    return vehicleType === "Minivan" ? option.priceMinivan : option.priceCar;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20 md:grid md:grid-cols-3 relative">
            <motion.a href="#" className="flex items-center justify-center md:col-start-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <picture><source srcSet="/logo.avif" type="image/avif" /><img src="/logo-old.svg" alt="Auto Spa 1 Logo" className="h-16 sm:h-20 w-auto object-contain" /></picture>
            </motion.a>
            <div className="hidden md:flex items-center gap-8 justify-end md:col-start-3">
              {["Services", "Gallery", "Pricing", "Reviews", "Contact"].map((item) => (
                <motion.button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm text-zinc-400 hover:text-white transition-colors relative group" whileHover={{ y: -2 }}>
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-medium px-6">Get Quote</Button>
              </motion.div>
            </div>
            <motion.button className="md:hidden text-white p-2 absolute right-4" onClick={() => setIsMenuOpen(!isMenuOpen)} whileTap={{ scale: 0.9 }}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
              <div className="px-4 py-6 space-y-4">
                {["Services", "Gallery", "Pricing", "Reviews", "Process", "Contact"].map((item) => (
                  <motion.button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left text-zinc-400 hover:text-white py-3 border-b border-white/5" whileHover={{ x: 10 }}>{item}</motion.button>
                ))}
                <a href="tel:734-352-9000" className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-4 py-3 rounded-lg font-semibold">
                  <Phone className="w-4 h-4 mr-2" /> Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: isMobile ? 0 : heroY, opacity: isMobile ? 1 : heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85" 
              alt="Premium Auto Detailing" 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]/90" />
          </div>
          {!isMobile && (
            <>
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
              <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </>
          )}
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div 
              variants={fadeInUp}
              className="inline-block bg-black/50 backdrop-blur-md rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-6 sm:py-10 border border-white/10 shadow-2xl shadow-black/50"
            >
              <motion.div className="mb-4 sm:mb-6">
                <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-yellow-400 text-yellow-400" />#1 Rated Auto Detailing in Westland
                </Badge>
              </motion.div>
              <motion.h1 className="text-3xl sm:text-5xl lg:text-8xl font-bold text-white tracking-tight mb-4 sm:mb-6 drop-shadow-2xl">
                <span className="block drop-shadow-lg">Transform Your</span>
                <motion.span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Vehicle Today</motion.span>
              </motion.h1>
              <motion.p className="text-base sm:text-xl text-zinc-200 max-w-2xl mx-auto drop-shadow-lg px-2 sm:px-0">Premium window tinting, ceramic coating, and auto detailing in Westland, MI.</motion.p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12 px-4 sm:px-0">
              <motion.a href="tel:734-352-9000" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-semibold px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-full w-full sm:w-auto">
                <Phone className="mr-2 w-5 h-5" /> Call Now
              </motion.a>
              <motion.a href="sms:734-352-9000" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center border border-white/20 text-white hover:bg-white/10 font-semibold px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-full w-full sm:w-auto">
                Text Us
              </motion.a>
            </motion.div>
            
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 max-w-4xl mx-auto mt-10 sm:mt-16 px-4 sm:px-0">
              {[{ value: 157, suffix: "+", label: "5-Star Reviews" }, { value: 500, suffix: "+", label: "Vehicles Detailed" }, { value: 5, suffix: ".0", label: "Star Rating" }, { value: 25, suffix: "+", label: "Years Experience" }].map((stat, index) => (
                <motion.div key={index} variants={scaleIn} className="text-center p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10" whileHover={!isMobile ? { y: -5, borderColor: "rgba(255,255,255,0.2)" } : {}}>
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
                  <div className="text-xs sm:text-sm text-zinc-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"><Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />Our Work</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Showcase</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto px-4 sm:px-0">Real vehicles, real results. See the Auto Spa 1 difference.</motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-8 sm:mb-12">
            <div className="relative aspect-[4/3] sm:aspect-video max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 shadow-xl sm:shadow-2xl shadow-purple-500/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGalleryIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full group">
                    <img 
                      src={showcaseImages[currentGalleryIndex].src} 
                      alt={showcaseImages[currentGalleryIndex].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-4 sm:p-8"
                    >
                      <h3 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{showcaseImages[currentGalleryIndex].title}</h3>
                      <p className="text-zinc-300 text-sm sm:text-lg">{showcaseImages[currentGalleryIndex].description}</p>
                    </motion.div>
                    {!isMobile && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="bg-white/20 backdrop-blur-md p-3 sm:p-4 rounded-full cursor-pointer"
                          onClick={() => setSelectedImage({
                            before: showcaseImages[currentGalleryIndex].src,
                            after: showcaseImages[currentGalleryIndex].src,
                            title: showcaseImages[currentGalleryIndex].title
                          })}
                        >
                          <ZoomIn className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <button 
                onClick={() => setCurrentGalleryIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={() => setCurrentGalleryIndex((prev) => (prev + 1) % showcaseImages.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all"
              >
                {isAutoPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>

            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-8 px-4">
              {showcaseImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`relative w-14 h-10 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentGalleryIndex ? 'ring-2 ring-purple-500 scale-105' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={image.src} alt={image.title} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 sm:mb-6 bg-amber-500/10 text-amber-400 border-amber-500/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />Transparent Pricing
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Detailing Packages</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto px-4 sm:px-0">Professional detailing tailored to your vehicle type. All packages include our satisfaction guarantee.</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {pricingPackages.map((pkg, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={`h-full relative overflow-hidden ${pkg.popular ? 'border-amber-500/50 shadow-xl shadow-amber-500/10' : 'border-white/10'} bg-zinc-900/50 backdrop-blur-sm`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-bl-lg z-10">
                      <Star className="w-3 h-3 inline mr-1 fill-white" /> BEST VALUE
                    </div>
                  )}
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-20`} />
                  </div>
                  <CardContent className="p-4 sm:p-6 relative">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{pkg.name}</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-3 sm:mb-4">{pkg.description}</p>
                    
                    {/* Vehicle Selector */}
                    <div className="mb-4 sm:mb-6">
                      <p className="text-zinc-400 text-xs mb-2 uppercase tracking-wider">Select your vehicle</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Car", "Minivan"].map((vehicle) => (
                          <button
                            key={vehicle}
                            onClick={() => setSelectedVehicle({...selectedVehicle, [pkg.name]: vehicle})}
                            className={`py-2 px-3 text-sm rounded-lg transition-all duration-300 ${
                              selectedVehicle[pkg.name] === vehicle 
                                ? `bg-gradient-to-r ${pkg.color} text-white font-semibold shadow-lg` 
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                          >
                            {vehicle}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Package Options */}
                    <div className="space-y-3 mb-4 sm:mb-6">
                      {pkg.options.map((option, optIndex) => (
                        <div 
                          key={optIndex}
                          onClick={() => setSelectedOption({...selectedOption, [pkg.name]: optIndex})}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedOption[pkg.name] === optIndex 
                              ? 'bg-white/10 border border-white/20' 
                              : 'bg-white/5 border border-transparent hover:bg-white/8'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-semibold text-sm">{option.name}</span>
                            <span className="text-xl font-bold text-white">
                              <span className="text-sm text-zinc-500">$</span>
                              {selectedVehicle[pkg.name] === "Minivan" ? option.priceMinivan : option.priceCar}
                            </span>
                          </div>
                          {selectedOption[pkg.name] === optIndex && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="space-y-1 pt-2 border-t border-white/10"
                            >
                              {option.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-2 text-zinc-400 text-xs">
                                  <CheckCircle className={`w-3 h-3 ${pkg.popular ? 'text-amber-400' : 'text-emerald-400'} flex-shrink-0`} />
                                  {feature}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>

                    {pkg.note && (
                      <p className="text-amber-400 text-xs mb-3 sm:mb-4 italic flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> {pkg.note}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:734-352-9000" className={`flex items-center justify-center py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base ${pkg.popular ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'} transition-all`}>
                        <Phone className="w-4 h-4 mr-2" /> Call Now
                      </a>
                      <a href="sms:734-352-9000" className={`flex items-center justify-center py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base border border-white/20 text-white hover:bg-white/10 transition-all`}>
                        Text Now
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-6 sm:mt-8">
            <p className="text-zinc-500 text-xs sm:text-sm">* Additional charges may apply for excessive dirt, pet hair, or biohazard cleanup.</p>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-32 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">Premium Services</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Our Services</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto px-4 sm:px-0">From window tinting to full detailing packages, we provide premium automotive services.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.4 }}>
                <Card className="group bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full overflow-hidden">
                  <CardContent className="p-5 sm:p-8 relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-zinc-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-4 sm:mb-6">
                      {service.features.slice(0, isMobile ? 3 : 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:734-352-9000" className="flex items-center justify-center py-3 px-4 rounded-lg font-semibold text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 transition-all">
                        <Phone className="w-4 h-4 mr-2" /> Call
                      </a>
                      <a href="sms:734-352-9000" className="flex items-center justify-center py-3 px-4 rounded-lg font-semibold text-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all">
                        Text
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 sm:py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"><Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-yellow-400" />Customer Reviews</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">What Our Customers Say</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto px-4 sm:px-0">Real reviews from real customers in Westland, MI.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {realReviews.map((review, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }}>
                <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <CardContent className="p-5 sm:p-8">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500/30 mb-3 sm:mb-4" />
                    <p className="text-zinc-300 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">"{review.quote}"</p>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">{review.name[0]}</div>
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base">{review.name}</p>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-zinc-500 text-xs sm:text-sm">• {review.service}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-16 sm:py-32 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">How It Works</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Our Process</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto px-4 sm:px-0">Simple, transparent, and professional service from start to finish.</motion.p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { step: "01", title: "Book Online", description: "Schedule your appointment through our easy online booking system or give us a call." },
              { step: "02", title: "Drop Off", description: "Bring your vehicle to our Westland location at 38505 Ford Rd." },
              { step: "03", title: "We Work", description: "Our expert team meticulously details your vehicle using premium products." },
              { step: "04", title: "Drive Happy", description: "Pick up your transformed vehicle and enjoy that new car feeling!" },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-400">{item.step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-xs sm:text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-32 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">Get In Touch</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Vehicle?</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-zinc-400 mb-8 sm:mb-12">Get a free quote or book your appointment today. Walk-ins welcome!</motion.p>
            <motion.div variants={staggerContainer} className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
              {[
                { icon: MapPin, title: "Visit Us", content: "38505 Ford Rd, Westland, MI 48185" },
                { icon: Phone, title: "Call Us", content: "(734) 352-9000" },
                { icon: Clock, title: "Hours", content: "Mon-Sat: 9AM-6PM, Sun: Closed" },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-zinc-400 text-xs sm:text-sm">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:734-352-9000" className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 font-semibold py-5 sm:py-6 px-8 sm:px-12 rounded-full text-base sm:text-lg transition-all">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" /> Call Now
              </a>
              <a href="sms:734-352-9000" className="flex items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 font-semibold py-5 sm:py-6 px-8 sm:px-12 rounded-full text-base sm:text-lg border border-white/20 transition-all">
                Text Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/10 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <picture><source srcSet="/logo.avif" type="image/avif" /><img src="/logo-old.svg" alt="Auto Spa 1 Logo" className="h-12 sm:h-14 w-auto object-contain" /></picture>
              </div>
              <p className="text-zinc-400 max-w-sm mb-4 sm:mb-6 text-sm sm:text-base">Premium window tinting and auto detailing services in Westland, MI. Transforming vehicles with expert care since 2019.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Window Tinting", "Ceramic Coating", "Auto Detailing", "Windshield Repair"].map((service) => (
                  <li key={service}><button onClick={() => scrollToSection("services")} className="text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm">{service}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2 sm:space-y-3 text-zinc-400 text-xs sm:text-sm">
                <li>38505 Ford Rd</li>
                <li>Westland, MI 48185</li>
                <li><a href="tel:734-352-9000" className="hover:text-white transition-colors">(734) 352-9000</a></li>
                <li><a href="mailto:autospawestland@gmail.com" className="hover:text-white transition-colors">autospawestland@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-zinc-500 text-xs sm:text-sm">&copy; 2025 Auto Spa 1. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/70 hover:text-white z-10"
              onClick={() => setSelectedImage(null)}
            >
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">{selectedImage.title}</h3>
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden">
                <img src={selectedImage.before} alt={selectedImage.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}