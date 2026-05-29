import { useState, useEffect, FormEvent } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, X, Plus, Minus, Phone, Menu,
  Leaf, Circle, CheckCircle, Zap, Check,
  Star, ChevronDown, ChevronUp, Instagram
} from "lucide-react";
import heroProductImg from "./assets/hero-product.png";

const queryClient = new QueryClient();

// ANNOUNCEMENT BAR
function AnnouncementBar() {
  const messages = [
    { icon: "🚚", text: "FREE DELIVERY ALL OVER PAKISTAN 🇵🇰" },
    { icon: "⭐", text: "Premium Beard Care for Modern Men" },
    { icon: "🇵🇰", text: "Proudly Made in Pakistan" },
    { icon: "✨", text: "Nature's Finest for a Modern Man" },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % messages.length), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 h-9 sm:h-10 bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 border-b border-primary/40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <AnimatePresence mode="wait">
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.22em] uppercase flex items-center gap-2"
        >
          <span>{messages[current].icon}</span>
          <span className="text-primary">{messages[current].text.split(' ')[0]}</span>
          <span className="text-white/80">{messages[current].text.split(' ').slice(1).join(' ')}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Ingredients", href: "#ingredients" },
    { label: "Benefits", href: "#benefits" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      <header className={`fixed top-9 sm:top-10 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border/50 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-base sm:text-xl font-serif tracking-widest text-foreground">
              NOUREA NATURALS
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground font-medium">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOrderNow}
              className="hidden sm:block bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-white/90 transition-colors text-sm uppercase tracking-wider"
              data-testid="nav-order-btn"
            >
              Order Now
            </button>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              data-testid="nav-hamburger"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 h-full w-72 bg-card border-l border-border/50 z-40 md:hidden flex flex-col pt-28 px-6 gap-2"
            >
              {navLinks.map(l => (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className="text-left py-4 text-lg font-medium text-foreground border-b border-border/30 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onOrderNow(); }}
                className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors text-base uppercase tracking-wider"
              >
                Order Now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// 2. HERO SECTION
function Hero({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-8 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center z-10">
        <FadeIn className="flex flex-col items-start space-y-4 sm:space-y-6">
          <span className="text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-semibold">
            NATURE'S FINEST FOR A MODERN MAN
          </span>
          <h1 className="text-[13vw] sm:text-7xl lg:text-9xl leading-[0.85] font-serif flex flex-col">
            <span className="text-white">BEARD</span>
            <span className="text-white">NOURISHING</span>
            <span className="text-primary">SERUM</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light max-w-md leading-relaxed">
            Crafted with nourishing botanical oils to support a healthier, softer, and better-looking beard routine for modern men.
          </p>
          <div className="pt-2 sm:pt-4 flex flex-col items-start gap-3 sm:gap-4 w-full">
            <button
              onClick={onOrderNow}
              data-testid="hero-order-btn"
              className="bg-white text-black text-base sm:text-xl px-7 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 active:scale-95 w-full sm:w-auto"
            >
              Order Now — Rs. 1,499
            </button>
            <div className="flex items-center gap-3 sm:gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Cruelty Free
              </span>
              <span>•</span>
              <span>Made For Daily Beard Care</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="relative flex items-center justify-center lg:justify-end h-[280px] sm:h-[420px] lg:h-[600px]">
          <div className="animate-float h-full flex items-center">
            <img
              src={heroProductImg}
              alt="NOUREA NATURALS Beard Nourishing Serum"
              className="max-h-full w-auto drop-shadow-2xl"
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
    <section className="py-8 sm:py-12 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {badges.map((badge, idx) => (
            <FadeIn key={idx}>
              <div className="bg-background/50 border border-border/50 rounded-xl p-4 sm:p-6 flex items-center justify-center text-center">
                <span className="text-white font-medium text-sm sm:text-base">{badge}</span>
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
    { icon: <Check className="w-6 h-6" />, text: "Supports healthy beard care routine" },
    { icon: <CheckCircle className="w-6 h-6" />, text: "Lightweight non-sticky formula" },
  ];

  return (
    <section id="benefits" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-10 sm:mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            WHY MEN LOVE IT
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none">
            Beard Care<br />Reimagined
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((b, idx) => (
            <FadeIn key={idx}>
              <div className="bg-card rounded-xl p-6 sm:p-8 border border-border/50 h-full flex flex-col items-start gap-4 sm:gap-6">
                <div className="text-primary">{b.icon}</div>
                <p className="text-white text-base sm:text-lg font-medium">{b.text}</p>
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
    <section id="ingredients" className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
        <FadeIn>
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            INFUSED WITH SANDALWOOD
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none mb-4 sm:mb-6">
            Premium Oils<br />Selected<br />For Modern<br />Beard Care
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Every ingredient is carefully chosen to support hydration, softness, and a healthier beard care routine.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {ingredients.map((ing, idx) => (
            <FadeIn key={idx}>
              <div className="bg-background/80 border border-border/50 rounded-lg p-4 sm:p-6 flex items-center justify-center text-center">
                <span className="text-white text-sm sm:text-lg font-medium">{ing}</span>
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
  const beforeItems = [
    "Patchy & Uneven Growth",
    "Dry, Brittle Hair",
    "Itchy, Flaky Skin",
    "Dull & Lifeless Look",
    "Hard to Style",
  ];
  const afterItems = [
    "Full, Dense Coverage",
    "Soft & Nourished Hair",
    "Moisturised, Calm Skin",
    "Natural Healthy Shine",
    "Easy to Shape & Style",
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            THE TRANSFORMATION
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white">Before & After</h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base max-w-xl mx-auto">Results seen within 4 weeks of consistent daily use</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* BEFORE */}
          <FadeIn>
            <div className="relative rounded-2xl border border-border/50 overflow-hidden bg-zinc-900/80">
              {/* Visual header */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
                <div className="text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-zinc-700/60 border-2 border-zinc-600 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-4xl">😔</span>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest">Week 0</p>
                </div>
                {/* Grayscale tint overlay */}
                <div className="absolute inset-0 bg-zinc-900/30" />
              </div>
              {/* Label pill */}
              <div className="absolute top-4 left-4 bg-zinc-700/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-zinc-600">
                Before
              </div>
              {/* Items */}
              <div className="p-5 sm:p-6 space-y-3">
                {beforeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-5 h-5 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-zinc-500" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* AFTER */}
          <FadeIn>
            <div className="relative rounded-2xl border border-primary/30 overflow-hidden bg-zinc-900/80">
              {/* Visual header */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-amber-950/60 via-stone-900 to-zinc-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-4xl">😎</span>
                  </div>
                  <p className="text-primary text-sm font-medium uppercase tracking-widest">Week 4</p>
                </div>
              </div>
              {/* Label pill */}
              <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                After
              </div>
              {/* Items */}
              <div className="p-5 sm:p-6 space-y-3">
                {afterItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white">
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Week timeline */}
        <FadeIn className="mt-8 sm:mt-12 grid grid-cols-4 gap-3">
          {[
            { week: "Week 1", result: "Skin feels moisturised" },
            { week: "Week 2", result: "Reduced itchiness" },
            { week: "Week 3", result: "Noticeably softer beard" },
            { week: "Week 4", result: "Fuller, healthier growth" },
          ].map((w, i) => (
            <div key={i} className="text-center p-3 sm:p-4 rounded-xl bg-card border border-border/40">
              <div className="w-2 h-2 rounded-full bg-primary mx-auto mb-2" />
              <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{w.week}</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs leading-tight">{w.result}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

// 7. COMMUNITY REELS
function CommunityReels() {
  const reels = [
    {
      user: "@abdullahbeard_pk",
      handle: "Abdullah Malik",
      caption: "Week 4 with Nourea Naturals 🔥 Can't believe the difference bro",
      views: "67.4K",
      likes: "4.2K",
      gradient: "from-amber-950 via-stone-900 to-zinc-950",
      accent: "from-amber-800/40 to-transparent",
      tag: "TRENDING",
    },
    {
      user: "@muhammadali_grooming",
      handle: "Muhammad Ali",
      caption: "This serum is actually goated 🧔‍♂️ Pakistani men are finally levelling up",
      views: "45.1K",
      likes: "3.1K",
      gradient: "from-yellow-950 via-zinc-900 to-stone-950",
      accent: "from-yellow-800/30 to-transparent",
      tag: "TOP PICK",
    },
    {
      user: "@grooming.pk",
      handle: "Grooming PK",
      caption: "My honest 30-day review of Nourea Naturals Beard Serum 💯",
      views: "23.8K",
      likes: "1.8K",
      gradient: "from-orange-950 via-neutral-900 to-zinc-950",
      accent: "from-orange-800/25 to-transparent",
      tag: "REVIEW",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-y border-border/50">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10 sm:mb-16 text-center">
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            COMMUNITY REELS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none">
            Real Customers.<br />Real Results.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {reels.map((reel, i) => (
            <FadeIn key={i}>
              <div className={`relative rounded-2xl aspect-[9/16] bg-gradient-to-b ${reel.gradient} border border-border/40 overflow-hidden group cursor-pointer`}>
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

                {/* Glow from bottom */}
                <div className={`absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t ${reel.accent}`} />

                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10">
                  <span className="bg-primary/90 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">{reel.tag}</span>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white text-[10px] font-semibold">{reel.views} views</span>
                  </div>
                </div>

                {/* Centre play button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 shadow-2xl">
                    {/* Play triangle */}
                    <div className="w-0 h-0 ml-1" style={{ borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "16px solid white" }} />
                  </div>
                </div>

                {/* Simulated video progress bar */}
                <div className="absolute bottom-20 left-3 right-3 z-10">
                  <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${30 + i * 20}%` }} />
                  </div>
                </div>

                {/* Bottom user info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-7 h-7 rounded-full bg-primary/30 border border-primary/60 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{reel.handle[0]}</span>
                        </div>
                        <span className="text-white text-xs font-semibold truncate">{reel.user}</span>
                      </div>
                      <p className="text-white/80 text-[11px] leading-tight line-clamp-2">{reel.caption}</p>
                    </div>
                    {/* Like count */}
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                      </div>
                      <span className="text-white text-[10px] font-semibold">{reel.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">Share your journey <span className="text-primary font-semibold">#NoureaBeardJourney</span></p>
        </FadeIn>
      </div>
    </section>
  );
}

// 8. REVIEWS
function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            HONEST REVIEWS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none">
            Trusted By<br />Modern Men
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[1,2,3].map(i => (
            <FadeIn key={i}>
              <div className="bg-card rounded-xl p-6 sm:p-8 border border-border/50 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-primary" /> Customer Review
                </div>
                <div className="flex gap-1 text-primary">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="text-muted-foreground italic text-sm sm:text-base">"Placeholder review text. The serum makes the beard softer and more manageable."</p>
                <div className="mt-2 pt-4 border-t border-border/50 text-white font-medium">John D.</div>
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
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto text-center">
        <FadeIn className="mb-10 sm:mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            DAILY ROUTINE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white">How To Use</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <FadeIn key={idx}>
              <div className="bg-background/50 rounded-xl p-7 sm:p-10 border border-border/50 flex flex-col items-start sm:items-center gap-4 sm:gap-6 text-left sm:text-center h-full">
                <span className="text-5xl sm:text-6xl font-serif text-primary opacity-60">{step.num}</span>
                <p className="text-white text-base sm:text-xl font-medium">{step.text}</p>
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
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">Frequently Asked Questions</h2>
        </FadeIn>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx}>
              <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <button
                  data-testid={`faq-toggle-${idx}`}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left text-white font-medium hover:bg-white/5 transition-colors text-sm sm:text-base"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span className="pr-4">{faq.q}</span>
                  {openIdx === idx ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-primary shrink-0" />}
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-muted-foreground border-t border-border/50 pt-4 text-sm sm:text-base">
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
  const posts = [
    {
      gradient: "from-amber-900/70 via-stone-800 to-zinc-900",
      glow: "from-amber-700/30",
      emoji: "🧔‍♂️",
      caption: "Morning ritual sorted. 3 drops is all you need.",
      likes: "1,284",
      time: "2d",
      tag: "BEARD CARE",
    },
    {
      gradient: "from-yellow-900/60 via-amber-950 to-zinc-900",
      glow: "from-yellow-700/25",
      emoji: "✨",
      caption: "That post-serum shine hits different fr.",
      likes: "987",
      time: "4d",
      tag: "GLOW UP",
    },
    {
      gradient: "from-orange-950/70 via-stone-900 to-neutral-950",
      glow: "from-orange-800/20",
      emoji: "💪",
      caption: "Week 3 update. The itchiness is completely gone.",
      likes: "2,103",
      time: "6d",
      tag: "RESULTS",
    },
    {
      gradient: "from-amber-950/80 via-zinc-800 to-stone-950",
      glow: "from-amber-900/30",
      emoji: "🌿",
      caption: "Pure botanical. No chemicals. That's Nourea.",
      likes: "756",
      time: "1w",
      tag: "NATURAL",
    },
    {
      gradient: "from-yellow-950/60 via-neutral-900 to-zinc-950",
      glow: "from-yellow-800/20",
      emoji: "🔥",
      caption: "Pakistani men are sleeping on good grooming no cap.",
      likes: "3,441",
      time: "1w",
      tag: "TRENDING",
    },
    {
      gradient: "from-stone-900 via-amber-950/50 to-zinc-950",
      glow: "from-stone-700/20",
      emoji: "🧴",
      caption: "Sandalwood scent is unreal. Smells luxurious.",
      likes: "1,567",
      time: "2w",
      tag: "SCENT",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card border-y border-border/50">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-10 sm:mb-16">
          <span className="text-primary uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold block mb-3 sm:mb-4">
            INSTAGRAM FEED
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none">
            Follow The<br />Brotherhood
          </h2>
          <a
            href="https://instagram.com/noureanaturals"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-primary text-sm font-semibold hover:underline"
          >
            <Instagram className="w-4 h-4" />
            @noureanaturals
          </a>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post, i) => (
            <FadeIn key={i}>
              <div className={`relative rounded-2xl aspect-square bg-gradient-to-br ${post.gradient} border border-border/40 overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-300`}>
                {/* Glow accent */}
                <div className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b ${post.glow} to-transparent opacity-60`} />

                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-black/50 backdrop-blur-sm text-primary text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-primary/30">
                    {post.tag}
                  </span>
                </div>

                {/* Instagram icon top-right */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <Instagram className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </div>

                {/* Centre emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{post.emoji}</span>
                </div>

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-white text-[10px] sm:text-xs leading-tight line-clamp-2 mb-2">{post.caption}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-primary text-[10px] font-bold">{post.likes}</span>
                    </div>
                    <span className="text-white/40 text-[10px]">{post.time}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Tag us with <span className="text-primary font-semibold">#NoureaBeardJourney</span> to be featured
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// 12. COD CTA
function CashOnDeliveryCTA({ onOrderNow }: { onOrderNow: () => void }) {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-none mb-4 sm:mb-6">
            Cash On Delivery<br />Available Across Pakistan
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground font-light mb-8 sm:mb-10">
            Place your order online and receive your Beard Nourishing Serum directly at your doorstep.
          </p>
          <button
            onClick={onOrderNow}
            data-testid="cod-order-btn"
            className="bg-white text-black text-base sm:text-xl px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 active:scale-95 w-full sm:w-auto"
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
    <footer className="bg-card border-t border-border/50 pt-12 sm:pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
        <div className="text-center md:text-left">
          <div className="text-2xl sm:text-3xl font-serif tracking-widest mb-2 flex gap-2 justify-center md:justify-start">
            <span className="text-white font-bold">NOUREA</span>
            <span className="text-primary">NATURALS</span>
          </div>
          <p className="text-muted-foreground text-sm">Nature's Finest For A Modern Man</p>
        </div>
        <div className="flex items-center gap-6 sm:gap-8 text-sm uppercase tracking-widest font-medium">
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

// ORDER SUMMARY CARD (reused in cart + checkout)
function OrderSummaryCard({ quantity, compact = false }: { quantity: number; compact?: boolean }) {
  const price = 1499;
  const subtotal = price * quantity;
  return (
    <div className={`bg-background/60 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden ${compact ? "p-4" : "p-5"}`}>
      <h3 className={`font-serif text-primary ${compact ? "text-base mb-3" : "text-lg mb-4"} uppercase tracking-widest`}>Order Summary</h3>
      
      {/* Product line */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/40">
        <div className="w-14 h-14 rounded-xl bg-card overflow-hidden shrink-0 border border-border/30">
          <img src={heroProductImg} alt="Serum" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium leading-tight">Beard Nourishing Serum</p>
          <p className="text-muted-foreground text-xs mt-0.5">× {quantity}</p>
        </div>
        <span className="text-white font-semibold text-sm shrink-0">PKR {subtotal.toLocaleString()}</span>
      </div>

      {/* Price breakdown */}
      <div className="space-y-2.5 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-white">PKR {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="text-green-400 font-semibold">FREE</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-3 border-t border-border/40">
        <span className="text-white font-semibold text-sm uppercase tracking-wider">Total</span>
        <span className="text-primary font-bold text-lg">PKR {subtotal.toLocaleString()}</span>
      </div>
    </div>
  );
}

// TRUST BADGES
function TrustList() {
  const items = [
    "Free Delivery Across Pakistan",
    "Secure Order Processing",
    "Premium Natural Ingredients",
    "Fast Customer Support",
  ];
  return (
    <div className="mt-4 space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{item}</span>
        </div>
      ))}
    </div>
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
    if (!isOpen) setTimeout(() => setStep("cart"), 300);
  }, [isOpen]);

  const handleConfirmOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("YOUR_GOOGLE_SCRIPT_URL", {
        method: "POST",
        body: JSON.stringify({ ...formData, quantity, total }),
      });
    } catch (_) { /* ignore */ }

    const text = `New Order from NOUREA NATURALS\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nProduct: Beard Nourishing Serum\nQuantity: ${quantity}\nTotal: PKR ${total}`;
    window.open(`https://wa.me/923198615519?text=${encodeURIComponent(text)}`, '_blank');

    setIsSubmitting(false);
    toast.success("Order request started via WhatsApp!");
    onClose();
    setQuantity(0);
    setFormData({ name: "", phone: "", address: "" });
  };

  const inputCls = "w-full bg-background/80 border border-border/50 p-3 rounded-xl text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/40";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full z-50 flex flex-col shadow-2xl bg-card border-l border-primary/20 ${step === "checkout" ? "max-w-xl" : "max-w-md"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 shrink-0">
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button onClick={() => setStep("cart")} className="p-1.5 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/5">
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                )}
                <h2 className="text-2xl font-serif text-primary">
                  {step === "cart" ? "Your Cart" : "Checkout"}
                </h2>
              </div>
              <button onClick={onClose} data-testid="cart-close" className="p-2 text-muted-foreground hover:text-white transition-colors rounded-full hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {quantity === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <ShoppingBag className="w-14 h-14 mb-4" />
                  <p className="text-xl font-serif">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-2">Add the Beard Nourishing Serum to continue</p>
                </div>
              ) : step === "cart" ? (
                /* ── CART STEP ── */
                <div className="p-6 space-y-5">
                  {/* Product row */}
                  <div className="flex gap-4 items-center bg-background/60 backdrop-blur-sm p-4 rounded-2xl border border-border/40">
                    <div className="w-20 h-20 bg-card rounded-xl overflow-hidden shrink-0 border border-border/30">
                      <img src={heroProductImg} alt="Serum" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-base leading-tight">Beard Nourishing Serum</h3>
                      <p className="text-primary text-sm font-medium mt-0.5">PKR 1,499 / unit</p>
                    </div>
                    <div className="flex items-center gap-2 border border-border/50 rounded-full px-2 py-1 bg-background/50 shrink-0">
                      <button data-testid="cart-minus" onClick={() => setQuantity(Math.max(0, quantity - 1))} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-white rounded-full hover:bg-white/10 transition-all">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-white font-semibold text-sm">{quantity}</span>
                      <button data-testid="cart-plus" onClick={() => setQuantity(quantity + 1)} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-white rounded-full hover:bg-white/10 transition-all">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="bg-background/60 backdrop-blur-sm border border-primary/15 rounded-2xl p-5">
                    <h3 className="font-serif text-primary text-base uppercase tracking-widest mb-4">Order Summary</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Beard Nourishing Serum × {quantity}</span>
                        <span className="text-white font-medium">PKR {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-white">PKR {total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span className="text-green-400 font-semibold">FREE</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border/40">
                      <span className="text-white font-semibold uppercase tracking-wider text-sm">Total</span>
                      <span className="text-primary font-bold text-xl">PKR {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <TrustList />
                </div>
              ) : (
                /* ── CHECKOUT STEP ── */
                <div className="p-5 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Left: Form */}
                    <div>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-4">Delivery Details</p>
                      <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                          <input
                            required type="text"
                            value={formData.name}
                            onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                            placeholder="Enter your full name"
                            data-testid="input-name"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                          <input
                            required type="tel"
                            value={formData.phone}
                            onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                            placeholder="03XX-XXXXXXX"
                            data-testid="input-phone"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Delivery Address</label>
                          <textarea
                            required rows={3}
                            value={formData.address}
                            onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                            placeholder="House #, Street, City"
                            data-testid="input-address"
                            className={`${inputCls} resize-none`}
                          />
                        </div>
                      </form>
                    </div>

                    {/* Right: Order summary + trust */}
                    <div className="flex flex-col gap-4">
                      <OrderSummaryCard quantity={quantity} compact />
                      <TrustList />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            {quantity > 0 && (
              <div className="p-5 sm:p-6 border-t border-border/50 bg-background/30 shrink-0">
                {step === "cart" ? (
                  <button
                    data-testid="btn-proceed-checkout"
                    onClick={() => setStep("checkout")}
                    className="w-full bg-white text-black font-semibold rounded-full text-base py-4 hover:bg-white/90 transition-all active:scale-[0.98]"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button
                    type="submit" form="checkout-form"
                    data-testid="btn-confirm-order"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black rounded-full font-bold py-4 text-base hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-wide"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Order via WhatsApp"}
                  </button>
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
      <AnnouncementBar />
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
        data-testid="whatsapp-float-btn"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] text-white px-4 sm:px-5 py-3 rounded-full flex items-center gap-2 font-medium shadow-lg hover:bg-[#20bd5a] transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
        <span>WhatsApp Order</span>
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
