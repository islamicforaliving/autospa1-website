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

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

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
    } else if (isInView && isMobile) setCount(value);
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
  { icon: Sparkles, title: "Ceramic Coating", description: "Long-lasting paint protection with hydrophobic technology. Your paint stays showroom-new with minimal maintenance.", price: "Starting at $799", features: ["7+ Years of Protection", "Hydrophobic Finish", "Chemical Resistance", "Deep Gloss"] },
  { icon: CheckCircle, title: "Windshield Repair", description: "Professional chip and crack repair to restore visibility and prevent further damage. Quick same-day service.", price: "", features: ["Same-Day Service", "Chip Repair", "Crack Repair", "Insurance Approved"] },
  { icon: Car, title: "Clay Paint Restoration", description: "Deep cleaning clay bar treatment that removes embedded contaminants and restores your paint's smooth finish.", price: "", features: ["Removes Contaminants", "Restores Smoothness", "Prepares for Wax", "Safe for Paint"] },
  { icon: Droplets, title: "Paint Correction", description: "Professional paint correction to remove swirl marks, scratches, and oxidation for a mirror-like finish.", price: "", features: ["Removes Swirls", "Removes Scratches", "Restores Clarity", "Mirror Finish"] },
  { icon: Zap, title: "Paint Correction Remover", description: "Specialized treatment to safely remove old paint correction residue and prepare surface for new protection.", price: "", features: ["Safe Removal", "Surface Prep", "Restores Original Finish", "Ready for New Coating"] },
];

const pricingPackages = [
  {
    name: "Complete Packages", description: "Interior + Exterior combined",
    options: [
      { name: "Complete Basic", priceCar: 200, priceMinivan: 240, features: ["Full Interior Detail", "Full Exterior Detail", "Clay Bar Treatment", "Door Jambs"] },
      { name: "Complete + Wax", priceCar: 250, priceMinivan: 290, features: ["Full Interior Detail", "Full Exterior Detail", "Clay Bar Treatment", "Premium Wax", "Door Jambs"] },
      { name: "Complete + Buff & Wax", priceCar: 450, priceMinivan: 490, features: ["Full Interior Detail", "Full Exterior Detail", "Clay Bar Treatment", "Paint Buffing", "Premium Wax", "Door Jambs"] },
    ],
    note: "Best Value", popular: true, color: "from-red-500 to-red-600",
    image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800&q=80",
  },
  {
    name: "Exterior", description: "Exterior detailing packages",
    options: [
      { name: "Basic Exterior", priceCar: 0, priceMinivan: 0, features: ["Wash", "Removes Tar & Bugs", "Tires & Rims", "Wheel Wells", "Windows", "All Chrome", "Gas Door"] },
      { name: "Wax", priceCar: 150, priceMinivan: 190, features: ["Wash", "Removes Tar & Bugs", "Clay Bar Treatment", "Tires & Rims", "Wheel Wells", "Windows", "All Chrome", "Gas Door", "Wax", "Tire Shine"] },
      { name: "Buff & Wax", priceCar: 300, priceMinivan: 340, features: ["Exterior Wash", "Clay Bar Treatment", "Paint Buffing", "Premium Wax", "Tire Shine", "Windows"] },
    ],
    note: "", popular: false, color: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
  },
  {
    name: "Interior", description: "Deep interior cleaning and restoration",
    options: [
      { name: "Interior Detail", priceCar: 150, priceMinivan: 170, features: ["Vacuum & Shampoo", "Leather Treatment", "Dashboard & Console", "Door Panels", "Door Jambs", "Odor Elimination", "Stain Removal", "Floor Mats"] },
    ],
    note: "Pet Hair Removal +$20 • Third Row Seat +$20", popular: false, color: "from-blue-400 to-blue-500",
    image: "/interior-detail.webp",
  },
];

const showcaseImages = [
  { src: "/images/showcase-corvette-blue.webp", title: "Chevrolet Corvette", showText: true },
  { src: "/images/showcase-silverado.webp", title: "Chevrolet Silverado", showText: true },
  { src: "/images/hero-skyline.webp", title: "Nissan Skyline R34", showText: true },
  { src: "/images/showcase-1.webp", title: "", showText: false },
  { src: "/images/showcase-3.webp", title: "", showText: false },
  { src: "/images/IMG_1087.jpg", title: "", showText: false },
  { src: "/images/IMG_1170.jpg", title: "", showText: false },
  { src: "/images/IMG_1544.jpg", title: "", showText: false },
  { src: "/images/IMG_1584.jpg", title: "", showText: false },
  { src: "/images/IMG_2357.jpg", title: "", showText: false },
  { src: "/images/showcase-2.webp", title: "", showText: false },
  { src: "/images/IMG_2418.jpg", title: "", showText: false },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{[key: string]: string}>({"Exterior Only": "Car", "Interior Only": "Car", "Complete Packages": "Car"});
  const [selectedOption, setSelectedOption] = useState<{[key: string]: number}>({"Exterior Only": 0, "Interior Only": 0, "Complete Packages": 0});
  const galleryScrollRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <motion.a href="#" className="flex items-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <img src="/logo.png" alt="Auto Spa 1 Logo" className="h-12 sm:h-14 w-auto max-w-[220px] object-contain" />
            </motion.a>
            <div className="hidden md:flex items-center gap-6">
              {["Services", "Gallery", "Pricing", "Reviews", "Contact"].map((item) => (
                <motion.button key={item} onClick={() => scrollToSection(item === "Services" ? "pricing" : item.toLowerCase())} className="text-sm text-gray-600 hover:text-gray-900 transition-colors relative group font-medium" whileHover={{ y: -2 }}>
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => scrollToSection("contact")} className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90 font-medium px-6">Get Quote</Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: isMobile ? 0 : heroY, opacity: isMobile ? 1 : heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0">
            <img src="/images/hero-corvette.png" alt="Auto Spa 1 - Premium Auto Detailing in Westland, MI" className="w-full h-full object-cover scale-105" style={{ objectPosition: 'center center' }} />
            {/* Red overlay matching the logo color */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 via-red-800/30 to-red-900/50" />
            {/* Soft blur at bottom to blend with white background */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
          {!isMobile && (
            <>
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
              <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
            </>
          )}
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp} className="inline-block bg-white/40 backdrop-blur-lg rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-6 sm:py-10 border border-white/20 shadow-md">
              <motion.div className="mb-4 sm:mb-6">
                <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-yellow-500 text-yellow-500" />#1 Rated Auto Detailing in Westland
                </Badge>
              </motion.div>
              <motion.h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-6">
                <span className="block">Transform Your</span>
                <motion.span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">Vehicle Today</motion.span>
              </motion.h1>
              <motion.p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">Premium window tinting, ceramic coating, and auto detailing in Westland, MI.</motion.p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-12 px-4 sm:px-0">
              <motion.a href="tel:734-352-9000" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90 font-semibold px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-full w-full sm:w-auto shadow-lg">
                <Phone className="mr-2 w-5 h-5" /> Call Now
              </motion.a>
              <motion.a href="sms:734-352-9000" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center justify-center border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-full w-full sm:w-auto">
                Text Us
              </motion.a>
            </motion.div>
            
            <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 max-w-4xl mx-auto mt-10 sm:mt-16 px-4 sm:px-0">
              {[{ value: 157, suffix: "+", label: "5-Star Reviews" }, { value: 500, suffix: "+", label: "Vehicles Detailed" }, { value: 5, suffix: ".0", label: "Star Rating" }, { value: 25, suffix: "+", label: "Years Experience" }].map((stat, index) => (
                <motion.div key={index} variants={scaleIn} className="text-center p-3 sm:p-6 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-lg border border-white/20 shadow-md" whileHover={!isMobile ? { y: -5, borderColor: "rgba(255, 255, 255, 0.4)" } : {}}>
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-100/30 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-red-100 text-red-700 border-red-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"><Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />Our Work</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">Showcase</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">Real vehicles, real results. Scroll to see more of our work.</motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative">
            <div className="relative flex items-center">
              <button onClick={() => { if (galleryScrollRef.current) { galleryScrollRef.current.scrollBy({ left: -400, behavior: "smooth" }); } }} className="hidden lg:flex items-center justify-center w-12 h-12 mr-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-all duration-300 flex-shrink-0 shadow-md">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <div ref={galleryScrollRef} className="overflow-x-auto pb-4 scroll-smooth flex-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}>
                <div className="flex gap-4 sm:gap-6 w-max px-4 sm:px-0">
                  {[0, 1, 2, 3].map((rowIndex) => (
                    <div key={rowIndex} className="flex flex-col gap-4 sm:gap-6">
                      {showcaseImages.slice(rowIndex * 3, rowIndex * 3 + 3).map((image, imgIndex) => (
                        <motion.div key={imgIndex} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: imgIndex * 0.05, duration: 0.3 }} whileHover={{ scale: 1.03 }} className="group relative w-64 sm:w-80 h-48 sm:h-60 rounded-xl overflow-hidden cursor-pointer bg-gray-100 shadow-lg" onClick={() => setSelectedImage({ before: image.src, after: image.src, title: image.title || "Our Work" })}>
                          <img src={image.src} alt={image.title || "Auto Spa 1 Work"} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" />
                          {image.showText && (
                            <>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                <h3 className="text-white font-semibold text-sm sm:text-base">{image.title}</h3>
                              </div>
                            </>
                          )}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg">
                              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              <button onClick={() => { if (galleryScrollRef.current) { galleryScrollRef.current.scrollBy({ left: 400, behavior: "smooth" }); } }} className="hidden lg:flex items-center justify-center w-12 h-12 ml-4 bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-all duration-300 flex-shrink-0 shadow-md">
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            
            <div className="flex lg:hidden items-center justify-center gap-2 mt-6 text-gray-500">
              <ChevronLeft className="w-4 h-4 animate-pulse" />
              <span className="text-xs sm:text-sm">Scroll to see more</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="py-16 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 sm:mb-6 bg-red-100 text-red-700 border-red-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />Transparent Pricing
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">Detailing Packages</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">Professional detailing tailored to your vehicle type. All packages include our satisfaction guarantee.</motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {pricingPackages.map((pkg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}>
                <Card className={`h-full relative overflow-hidden ${pkg.popular ? "border-amber-400 shadow-xl shadow-amber-500/10" : "border-gray-200"} bg-white shadow-lg`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-bl-lg z-10">
                      <Star className="w-3 h-3 inline mr-1 fill-white" /> BEST VALUE
                    </div>
                  )}
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-20`} />
                  </div>
                  <CardContent className="p-4 sm:p-6 relative">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{pkg.description}</p>
                    
                    <div className="mb-4 sm:mb-6">
                      <p className="text-gray-600 text-sm mb-2 uppercase tracking-wider font-medium">Select your vehicle</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Car", "Minivan"].map((vehicle) => (
                          <button key={vehicle} onClick={() => setSelectedVehicle({...selectedVehicle, [pkg.name]: vehicle})} className={`py-2 px-3 text-sm rounded-lg transition-all duration-300 ${selectedVehicle[pkg.name] === vehicle ? `bg-gradient-to-r ${pkg.color} text-white font-semibold shadow-lg` : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                            {vehicle}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4 sm:mb-6">
                      {pkg.options.map((option, optIndex) => (
                        <div key={optIndex} onClick={() => setSelectedOption({...selectedOption, [pkg.name]: optIndex})} className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${selectedOption[pkg.name] === optIndex ? "bg-gray-100 border border-gray-300" : "bg-gray-50 border border-transparent hover:bg-gray-100"}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-900 font-semibold text-sm">{option.name}</span>
                            {(selectedVehicle[pkg.name] === "Minivan" ? option.priceMinivan : option.priceCar) > 0 && (
                              <span className="text-xl font-bold text-gray-900"><span className="text-sm text-gray-500">$</span>{selectedVehicle[pkg.name] === "Minivan" ? option.priceMinivan : option.priceCar}</span>
                            )}
                          </div>
                          {selectedOption[pkg.name] === optIndex && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1 pt-2 border-t border-gray-200">
                              {option.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-2 text-gray-700 text-base">
                                  <CheckCircle className={`w-3 h-3 ${pkg.popular ? "text-red-500" : "text-blue-500"} flex-shrink-0`} />
                                  {feature}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>

                    {pkg.note && (
                      <p className="text-red-600 text-xs mb-3 sm:mb-4 italic flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> {pkg.note}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:734-352-9000" className={`flex items-center justify-center py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base ${pkg.popular ? "bg-gradient-to-r from-red-500 to-red-600 text-white" : "bg-gray-900 text-white hover:bg-gray-800"} transition-all`}>
                        <Phone className="w-4 h-4 mr-2" /> Call Now
                      </a>
                      <a href="sms:734-352-9000" className="flex items-center justify-center py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all">
                        Text Now
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-6 sm:mt-8">
            <p className="text-gray-500 text-xs sm:text-sm">* Additional charges may apply for excessive dirt, pet hair, or biohazard cleanup.</p>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-32 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-red-100 text-red-700 border-red-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">Premium Services</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">Our Services</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">From window tinting to full detailing packages, we provide premium automotive services.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.4 }}>
                <Card className="group bg-white border-gray-200 hover:border-blue-300 transition-all duration-300 h-full overflow-hidden shadow-md hover:shadow-xl">
                  <CardContent className="p-5 sm:p-8 relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-4 sm:mb-6">
                      {service.features.slice(0, isMobile ? 3 : 4).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm sm:text-base text-gray-700">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:734-352-9000" className="flex items-center justify-center py-3 px-4 rounded-lg font-semibold text-sm bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 transition-all">
                        <Phone className="w-4 h-4 mr-2" /> Call
                      </a>
                      <a href="sms:734-352-9000" className="flex items-center justify-center py-3 px-4 rounded-lg font-semibold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 transition-all">
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

      <section id="reviews" className="py-16 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-100/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-16">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-red-100 text-red-700 border-red-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"><Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-yellow-500" />Customer Reviews</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">What Our Customers Say</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">Real reviews from real customers in Westland, MI.</motion.p>
            
            <motion.div variants={fadeInUp} className="mt-6 sm:mt-8 inline-flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-full px-5 sm:px-6 py-3">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold text-lg sm:text-xl">5.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />))}
                </div>
              </div>
              <span className="text-gray-600 text-sm">157+ Google Reviews</span>
            </motion.div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {realReviews.map((review, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }}>
                <Card className="bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 h-full shadow-md">
                  <CardContent className="p-5 sm:p-8">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-red-300 mb-3 sm:mb-4" />
                    <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-6">&quot;{review.quote}&quot;</p>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">{review.name[0]}</div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm sm:text-base">{review.name}</p>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />))}
                          </div>
                          <span className="text-gray-500 text-xs sm:text-sm">• {review.service}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10 sm:mt-12">
            <a href="https://www.google.com/search?q=Auto+Spa+1+Reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 font-semibold px-6 sm:px-8 py-4 sm:py-5 rounded-full transition-all duration-300 group">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm sm:text-base">See All Google Reviews</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="process" className="py-16 sm:py-32 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-100/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center mb-10 sm:mb-20">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">How It Works</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">Our Process</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">Simple, transparent, and professional service from start to finish.</motion.p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { step: "01", title: "Call or Text", description: "Contact us at (734) 352-9000 to schedule your appointment or ask questions." },
              { step: "02", title: "Drop Off", description: "Bring your vehicle to our Westland location at 38505 Ford Rd." },
              { step: "03", title: "We Work", description: "Our expert team meticulously details your vehicle using premium products." },
              { step: "04", title: "Drive Happy", description: "Pick up your transformed vehicle and enjoy that new car feeling!" },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-100 to-red-200 border border-gray-200 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
                  <span className="text-2xl sm:text-3xl font-bold text-red-600">{item.step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-100/20 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="text-center">
            <motion.div variants={fadeInUp}><Badge className="mb-4 sm:mb-6 bg-red-100 text-red-700 border-red-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">Get In Touch</Badge></motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">Ready to Transform Your Vehicle?</motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12">Get a free quote or book your appointment today. Walk-ins welcome!</motion.p>
            <motion.div variants={staggerContainer} className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
              {[
                { icon: MapPin, title: "Visit Us", content: "38505 Ford Rd, Westland, MI 48185" },
                { icon: Phone, title: "Call Us", content: "(734) 352-9000" },
                { icon: Clock, title: "Hours", content: "Mon-Sat: 9AM-6PM, Sun: Closed" },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-gray-900 font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:734-352-9000" className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white hover:opacity-90 font-semibold py-5 sm:py-6 px-8 sm:px-12 rounded-full text-base sm:text-lg transition-all shadow-lg">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" /> Call Now
              </a>
              <a href="sms:734-352-9000" className="flex items-center justify-center gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold py-5 sm:py-6 px-8 sm:px-12 rounded-full text-base sm:text-lg border border-gray-300 transition-all">
                Text Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <img src="/logo.png" alt="Auto Spa 1 Logo" className="h-14 sm:h-16 w-auto max-w-[240px] object-contain" />
              </div>
              <p className="text-gray-600 max-w-sm mb-4 sm:mb-6 text-sm sm:text-base">Premium window tinting and auto detailing services in Westland, MI. Transforming vehicles with expert care since 2019.</p>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Window Tinting", "Ceramic Coating", "Auto Detailing", "Windshield Repair"].map((service) => (
                  <li key={service}><button onClick={() => scrollToSection("services")} className="text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm">{service}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-600 text-xs sm:text-sm">
                <li>38505 Ford Rd</li>
                <li>Westland, MI 48185</li>
                <li><a href="tel:734-352-9000" className="hover:text-gray-900 transition-colors">(734) 352-9000</a></li>
                <li><a href="mailto:autospawestland@gmail.com" className="hover:text-gray-900 transition-colors">autospawestland@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm">&copy; 2025 Auto Spa 1. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/70 hover:text-white z-10" onClick={() => setSelectedImage(null)}>
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </motion.button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
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
