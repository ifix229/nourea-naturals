import { useState, useEffect, FormEvent } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, X, Plus, Minus, Phone, 
  Leaf, Circle, CheckCircle, Zap, Search, Check,
  Star, ChevronDown, ChevronUp, Instagram
} from "lucide-react";
import heroProductImg from "./assets/hero-product.png";

const queryClient = new QueryClient();

// Shared Section Wrapper for Animation
function FadeIn({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 1. NAVBAR
function Navbar({ onOrderNow }: { onOrderNow: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="text-xl font-serif tracking-widest text-foreground">
            NOUREA NATURALS
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground font-medium">
          <a href="#ingredients" className="hover:text-foreground transition-colors">Ingredients</a>
          <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <button 
          onClick={onOrderNow}
          className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-colors text-sm uppercase tracking-wider"
          data-testid="nav-order-btn"
        >
          Order Now
        </button>
      </div>
    </header>
  );
}

// 2. HERO SECTION
function Hero({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <FadeIn className="flex flex-col items-start space-y-6">
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-semibold">
            NATURE'S FINEST FOR A MODERN MAN
          </span>
          <h1 className="text-7xl lg:text-9xl leading-[0.85] font-serif flex flex-col">
            <span className="text-white">BEARD</span>
            <span className="text-white">NOURISHING</span>
            <span className="text-primary">SERUM</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-md leading-relaxed">
            Crafted with nourishing botanical oils to support a healthier, softer, and better-looking beard routine for modern men.
          </p>
          <div className="pt-4 flex flex-col items-start gap-4">
            <button
              onClick={onOrderNow}
              data-testid="hero-order-btn"
              className="bg-white text-black text-xl px-10 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 active:scale-95"
            >
              Order Now — Rs. 1,499
            </button>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Cruelty Free
              </span>
              <span>•</span>
              <span>Made For Daily Beard Care</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="relative flex items-center justify-center lg:justify-end h-[600px]">
          <div className="animate-float">
            <img
              src={heroProductImg}
              alt="NOUREA NATURALS Beard Nourishing Serum"
              className="max-h-[600px] w-auto drop-shadow-2xl"
              data-testid="hero-product-img"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// 3. TRUST BADGES
function TrustBadges() {
  const badges = ["Cruelty Free", "Cash On Delivery", "Premium Oils", "Made In Pakistan"];
  return (
    <section className="py-12 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, idx) => (
            <FadeIn key={idx}>
              <div className="bg-background/50 border border-border/50 rounded-xl p-6 flex items-center justify-center text-center">
                <span className="text-white font-medium">{badge}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. BENEFITS SECTION
function Benefits() {
  const benefits = [
    { icon: <CheckCircle className="w-6 h-6" />, text: "Helps support fuller-looking beard appearance" },
    { icon: <Circle className="w-6 h-6" />, text: "Softens rough beard texture" },
    { icon: <Zap className="w-6 h-6" />, text: "Reduces dryness & itchiness" },
    { icon: <Star className="w-6 h-6" />, text: "Adds natural shine" },
    { icon: <Plus className="w-6 h-6" />, text: "Supports healthy beard care routine" },
    { icon: <Check className="w-6 h-6" />, text: "Lightweight non-sticky formula" },
  ];

  return (
    <section id="benefits" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            WHY MEN LOVE IT
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
            Beard Care<br />Reimagined
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <FadeIn key={idx}>
              <div className="bg-card rounded-xl p-8 border border-border/50 h-full flex flex-col items-start gap-6">
                <div className="text-primary">{b.icon}</div>
                <p className="text-white text-lg font-medium">{b.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. INGREDIENTS SECTION
function Ingredients() {
  const ingredients = ["Jojoba Oil", "Olive Oil", "Rosemary Oil", "Castor Oil", "Vitamin E", "Sandalwood Essential Oil"];
  
  return (
    <section id="ingredients" className="py-24 px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            INFUSED WITH SANDALWOOD
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-none mb-6">
            Premium Oils<br />Selected<br />For Modern<br />Beard Care
          </h2>
          <p className="text-lg text-muted-foreground">
            Every ingredient is carefully chosen to support hydration, softness, and a healthier beard care routine.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-2 gap-4">
          {ingredients.map((ing, idx) => (
            <FadeIn key={idx}>
              <div className="bg-background/80 border border-border/50 rounded-lg p-6 flex items-center justify-center text-center">
                <span className="text-white text-lg font-medium">{ing}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. BEFORE & AFTER
function BeforeAfter() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            RESULTS SECTION
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white">Before & After</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn className="bg-card rounded-2xl aspect-[4/3] border border-border/50 relative overflow-hidden flex items-center justify-center">
            <span className="absolute top-6 left-6 text-white/50 text-sm uppercase tracking-wider font-semibold">Before</span>
            <span className="text-muted-foreground/30 font-serif text-3xl">Placeholder</span>
          </FadeIn>
          <FadeIn className="bg-card rounded-2xl aspect-[4/3] border border-border/50 relative overflow-hidden flex items-center justify-center">
            <span className="absolute top-6 left-6 text-white/50 text-sm uppercase tracking-wider font-semibold">After</span>
            <span className="text-muted-foreground/30 font-serif text-3xl">Placeholder</span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// 7. COMMUNITY REELS
function CommunityReels() {
  return (
    <section className="py-24 px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 text-center lg:text-left">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            COMMUNITY REELS
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
            Real Customers.<br />Real Results.
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <FadeIn key={i}>
              <div className="bg-background/50 rounded-xl aspect-[9/16] border border-border/50 flex items-center justify-center">
                <span className="text-muted-foreground/30 font-serif text-xl">Reel {i}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. REVIEWS
function Reviews() {
  return (
    <section id="reviews" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            HONEST REVIEWS
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
            Trusted By<br />Modern Men
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <FadeIn key={i}>
              <div className="bg-card rounded-xl p-8 border border-border/50 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-primary" /> Customer Review
                </div>
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-muted-foreground italic">"Placeholder review text. The serum makes the beard softer and more manageable."</p>
                <div className="mt-4 pt-4 border-t border-border/50 text-white font-medium">John D.</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 9. HOW TO USE
function HowToUse() {
  const steps = [
    { num: "01", text: "Apply 3-5 drops to your beard." },
    { num: "02", text: "Massage gently into roots and skin." },
    { num: "03", text: "Use daily for best beard care results." },
  ];

  return (
    <section className="py-24 px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto text-center">
        <FadeIn className="mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            DAILY ROUTINE
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white">How To Use</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <FadeIn key={idx}>
              <div className="bg-background/50 rounded-xl p-10 border border-border/50 flex flex-col items-center gap-6 text-center h-full">
                <span className="text-6xl font-serif text-primary opacity-50">{step.num}</span>
                <p className="text-white text-xl font-medium">{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 10. FAQ
function FAQ() {
  const faqs = [
    { q: "Is it suitable for all beard types?", a: "Yes, the serum is designed for daily beard care for different beard textures." },
    { q: "Does it feel oily?", a: "No, the formula is lightweight and absorbs smoothly into the beard." },
    { q: "How often should I use it?", a: "Use 3-5 drops daily for best beard care results." },
    { q: "When will I see results?", a: "Most users notice softer, healthier-looking beard within 2-4 weeks." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white">Frequently Asked Questions</h2>
        </FadeIn>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx}>
              <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-medium hover:bg-white/5 transition-colors"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  {faq.q}
                  {openIdx === idx ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 text-muted-foreground border-t border-border/50 mt-2 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 11. INSTAGRAM FEED
function InstagramFeed() {
  return (
    <section className="py-24 px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-sm font-semibold block mb-4">
            INSTAGRAM FEED
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
            Follow The<br />Brotherhood
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <FadeIn key={i}>
              <div className="bg-background/50 rounded-xl aspect-square border border-border/50 flex flex-col items-center justify-center gap-2 group hover:border-primary/50 transition-colors cursor-pointer">
                <Instagram className="w-8 h-8 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// 12. COD CTA
function CashOnDeliveryCTA({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <section className="py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-none mb-6">
            Cash On Delivery<br />Available Across Pakistan
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-10">
            Place your order online and receive your Beard Nourishing Serum directly at your doorstep.
          </p>
          <button
            onClick={onOrderNow}
            className="bg-white text-black text-xl px-10 py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 active:scale-95"
          >
            Order Now — Rs. 1,499
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

// 13. FOOTER
function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="text-center md:text-left">
          <div className="text-3xl font-serif tracking-widest mb-2 flex flex-col md:flex-row md:gap-2">
            <span className="text-white font-bold">NOUREA</span>
            <span className="text-primary">NATURALS</span>
          </div>
          <p className="text-muted-foreground text-sm">Nature's Finest For A Modern Man</p>
        </div>
        
        <div className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">TikTok</a>
          <a href="#" className="text-muted-foreground hover:text-white transition-colors">WhatsApp</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-border/50 pt-8 text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        © {new Date().getFullYear()} Nourea Naturals. All rights reserved.
      </div>
    </footer>
  );
}

// CART SIDEBAR
function CartSidebar({ 
  isOpen, 
  onClose, 
  quantity, 
  setQuantity 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  quantity: number; 
  setQuantity: (q: number) => void; 
}) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const price = 1499;
  const total = price * quantity;

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep("cart"), 300);
    }
  }, [isOpen]);

  const handleConfirmOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Webhook/Sheet integration (fire and forget)
    try {
      await fetch("YOUR_GOOGLE_SCRIPT_URL", {
        method: "POST",
        body: JSON.stringify({ ...formData, quantity, total }),
      });
    } catch (e) {
      // ignore
    }

    // WhatsApp logic
    const text = `New Order from NOUREA NATURALS\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nProduct: Beard Nourishing Serum\nQuantity: ${quantity}\nTotal: PKR ${total}`;
    
    const url = `https://wa.me/923198615519?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    setIsSubmitting(false);
    toast.success("Order request started via WhatsApp!");
    onClose();
    setQuantity(0);
    setFormData({ name: "", phone: "", address: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-primary/20 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-3xl text-primary font-serif">
                {step === "cart" ? "Your Cart" : "Checkout"}
              </h2>
              <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {quantity === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag className="w-16 h-16 mb-4" />
                  <p className="text-xl font-serif">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {step === "cart" ? (
                    <div className="space-y-6">
                      <div className="flex gap-4 items-center bg-background p-4 rounded-xl border border-border/50">
                        <div className="w-20 h-20 bg-card rounded-lg flex items-center justify-center overflow-hidden">
                          <img src={heroProductImg} alt="Serum" className="h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-xl text-white">Beard Nourishing Serum</h3>
                          <p className="text-primary font-medium text-sm">Rs. 1,499</p>
                        </div>
                        <div className="flex items-center gap-3 border border-border/50 rounded-full px-2 py-1 bg-card">
                          <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="p-1 text-muted-foreground hover:text-white"><Minus className="w-4 h-4" /></button>
                          <span className="w-4 text-center text-white font-medium">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="p-1 text-muted-foreground hover:text-white"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-border/50 space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>Rs. {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-serif text-white pt-4 border-t border-border/50">
                          <span>Total</span>
                          <span className="text-primary">Rs. {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-background border border-border/50 p-3 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-background border border-border/50 p-3 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Delivery Address</label>
                        <textarea 
                          required
                          rows={3}
                          value={formData.address}
                          onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                          className="w-full bg-background border border-border/50 p-3 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        />
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {quantity > 0 && (
              <div className="p-6 border-t border-border/50 bg-background/50">
                {step === "cart" ? (
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full bg-white text-black font-semibold rounded-full text-lg py-4 hover:bg-white/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("cart")}
                      type="button"
                      className="w-1/3 border border-border/50 text-white rounded-full font-medium py-4 hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting}
                      className="w-2/3 bg-primary text-black rounded-full font-semibold py-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// MAIN LAYOUT
function Main() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleOrderNow = () => {
    if (cartQuantity === 0) setCartQuantity(1);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <Navbar onOrderNow={handleOrderNow} />
      
      <main>
        <Hero onOrderNow={handleOrderNow} />
        <TrustBadges />
        <Benefits />
        <Ingredients />
        <BeforeAfter />
        <CommunityReels />
        <Reviews />
        <HowToUse />
        <FAQ />
        <InstagramFeed />
        <CashOnDeliveryCTA onOrderNow={handleOrderNow} />
      </main>

      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <button 
        onClick={handleOrderNow}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white px-5 py-3 rounded-full flex items-center gap-2 font-medium shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-105 active:scale-95"
      >
        <Phone className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Order</span>
      </button>

      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        quantity={cartQuantity}
        setQuantity={setCartQuantity}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </WouterRouter>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;
