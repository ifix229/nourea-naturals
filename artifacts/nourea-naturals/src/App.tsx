import React, { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react";
import heroProductImg from "./assets/hero-product.png";

const queryClient = new QueryClient();

function Hero({ onAddToCart }: { onAddToCart: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 pb-12">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs uppercase tracking-widest font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Made in Pakistan
          </div>
          <h1 className="text-7xl lg:text-9xl leading-[0.85] text-foreground">
            NOUREA<br />NATURALS
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-md">
            Nature's Finest for a Modern Man. A premium ritual designed to nourish, soften, and elevate your beard.
          </p>
          <div className="pt-4 flex items-center gap-6">
            <button
              onClick={onAddToCart}
              data-testid="button-add-hero"
              className="bg-primary text-primary-foreground font-serif text-2xl px-10 py-4 hover:bg-primary/90 transition-all duration-300 active:scale-95 flex items-center gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">ADD TO CART</span>
              <ArrowRight className="w-6 h-6 relative z-10" />
            </button>
            <div className="text-2xl font-serif tracking-wide text-foreground">
              PKR 1,499
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] flex items-center justify-center"
        >
          <div className="animate-float">
            <img
              src={heroProductImg}
              alt="NOUREA NATURALS Beard Nourishing Serum"
              className="max-h-[550px] w-auto drop-shadow-2xl"
              data-testid="img-hero-product"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    "Softens beard",
    "Deep moisturization",
    "Reduces itchiness",
    "Supports healthy beard growth",
    "Adds natural shine",
  ];

  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-primary">The Ritual</h2>
          <p className="mt-4 text-muted-foreground">Formulated for profound transformation.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border border-border bg-background/50 hover:border-primary/50 transition-colors duration-300 flex items-center justify-center text-center group"
            >
              <h3 className="text-xl font-serif tracking-widest text-foreground group-hover:text-primary transition-colors">
                {benefit}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const ingredients = [
    "Jojoba Oil",
    "Olive Oil",
    "Castor Oil",
    "Rosemary Oil",
    "Vitamin E",
    "Sandalwood Essential Oil",
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl text-foreground text-center">Earth's <span className="text-primary">Elixir</span></h2>
          <div className="w-px h-16 bg-primary/30 mt-8" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 text-center">
          {ingredients.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 cursor-default"
            >
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center bg-card">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span className="text-lg text-muted-foreground uppercase tracking-widest font-light text-sm">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Directions() {
  return (
    <section className="py-32 px-6 bg-card border-y border-border">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl mb-8 text-primary">Directions</h2>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground">
            "Apply 3–5 drops daily and massage into beard roots and skin."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

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

  const handleConfirmOrder = async (e: React.FormEvent) => {
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
    const text = `New Order from NOUREA NATURALS
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Product: Beard Nourishing Serum
Quantity: ${quantity}
Total: PKR ${total}`;
    
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
                      <div className="flex gap-4 items-center bg-background p-4 rounded-sm border border-border">
                        <div className="w-20 h-20 bg-card rounded flex items-center justify-center overflow-hidden">
                          <img src={heroProductImg} alt="Serum" className="h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-xl text-foreground">Beard Nourishing Serum</h3>
                          <p className="text-muted-foreground text-sm">PKR 1,499</p>
                        </div>
                        <div className="flex items-center gap-3 border border-border rounded-sm px-2 py-1">
                          <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="p-1 hover:text-primary"><Minus className="w-4 h-4" /></button>
                          <span className="w-4 text-center">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-primary"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-border space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>PKR {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xl font-serif text-primary pt-4 border-t border-border/50">
                          <span>Total</span>
                          <span>PKR {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-background border border-border p-3 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-background border border-border p-3 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Delivery Address</label>
                        <textarea 
                          required
                          rows={3}
                          value={formData.address}
                          onChange={e => setFormData(p => ({ ...p, address: e.target.value }))}
                          className="w-full bg-background border border-border p-3 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        />
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            {quantity > 0 && (
              <div className="p-6 border-t border-border bg-card">
                {step === "cart" ? (
                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full bg-primary text-primary-foreground font-serif text-xl py-4 hover:bg-primary/90 transition-colors"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("cart")}
                      type="button"
                      className="w-1/3 border border-border text-foreground font-serif text-xl py-4 hover:bg-background transition-colors"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting}
                      className="w-2/3 bg-primary text-primary-foreground font-serif text-xl py-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "PROCESSING..." : "CONFIRM ORDER"}
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

function Main() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    setCartQuantity(q => q + 1);
    toast.success("Added to cart ✓", {
      style: { background: "hsl(var(--card))", color: "hsl(var(--primary))", border: "1px solid hsl(var(--border))" }
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-4" : "bg-transparent py-6"
        } px-6`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-serif tracking-widest text-primary">
            NOUREA NATURALS
          </div>
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-foreground hover:text-primary transition-colors"
            data-testid="button-cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartQuantity > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {cartQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      <main>
        <Hero onAddToCart={handleAddToCart} />
        <Benefits />
        <Ingredients />
        <Directions />
      </main>

      <footer className="py-12 px-6 border-t border-border text-center">
        <h2 className="text-3xl font-serif text-primary mb-2">NOUREA NATURALS</h2>
        <p className="text-muted-foreground mb-8">Nature's Finest for a Modern Man</p>
        <p className="text-xs text-muted-foreground/50 uppercase tracking-widest">
          © {new Date().getFullYear()} Nourea Naturals. All rights reserved.
        </p>
      </footer>

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
