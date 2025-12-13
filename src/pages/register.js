import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCrown, FaWineBottle, FaCheese, FaCalendarAlt, FaStar, FaUtensils } from "react-icons/fa";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            
            if (res.ok) {
                setMsg("Membership approved! Welcome to Épicure.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                setMsg(data.message || "Membership application declined.");
            }
        } catch (error) {
            setMsg("Service unavailable. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Animated Food Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/4 text-gold-300/20 text-5xl"
                >
                    <FaWineBottle />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-1/3 text-gold-300/15 text-4xl"
                >
                    <FaCheese />
                </motion.div>
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-2/3 right-1/3 text-gold-300/10 text-6xl"
                >
                    <FaCrown />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-gold-300/30 relative z-10 overflow-hidden"
            >
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400"></div>
                
                {/* Restaurant Branding */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 bg-gradient-to-br from-gold-500/20 to-gold-600/30 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border border-gold-400/30"
                    >
                        <FaCrown className="text-gold-400 text-4xl" />
                    </motion.div>
                    <motion.h1 
                        className="text-5xl font-serif font-bold text-white mb-2 tracking-wide"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Épicure Membership
                    </motion.h1>
                    <p className="text-gold-300/80 font-light tracking-widest text-sm mb-1">
                        EXCLUSIVE DINING SOCIETY
                    </p>
                    <p className="text-white/60 text-lg mt-2">Reserve Your Place at Our Table</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Input */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <label className="block text-gold-200 text-sm font-medium mb-3 tracking-wide">
                            <FaUser className="inline mr-2" />
                            FULL NAME
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                                required
                            />
                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400/60" />
                        </div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <label className="block text-gold-200 text-sm font-medium mb-3 tracking-wide">
                            <FaEnvelope className="inline mr-2" />
                            EMAIL
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="reservation@email.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                                required
                            />
                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400/60" />
                        </div>
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative"
                    >
                        <label className="block text-gold-200 text-sm font-medium mb-3 tracking-wide">
                            <FaLock className="inline mr-2" />
                            CREATE PASSWORD
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Minimum 8 characters"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                                required
                                minLength="8"
                            />
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400/60" />
                        </div>
                    </motion.div>

                    {/* Membership Terms */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-gold-400/10"
                    >
                        <input 
                            type="checkbox" 
                            id="terms" 
                            required 
                            className="mt-1 text-gold-500 focus:ring-gold-500 focus:ring-offset-black"
                        />
                        <label htmlFor="terms" className="text-white/80 text-sm">
                            I agree to the Épicure membership terms, including exclusive event access, 
                            reservation policies, and the wine club subscription.
                        </label>
                    </motion.div>

                    {/* Brighter Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 text-black py-5 px-4 rounded-xl font-serif font-bold text-xl shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-300 hover:to-gold-400 group relative overflow-hidden mt-6 border-2 border-amber-300/50 hover:border-amber-200/70"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        
                        {/* Sparkle effect using FaStar */}
                        <div className="absolute -top-2 -right-2">
                            <FaStar className="text-yellow-200/70 text-sm" />
                        </div>
                        <div className="absolute -bottom-2 -left-2">
                            <FaStar className="text-yellow-200/70 text-sm" />
                        </div>
                        
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-black border-t-transparent rounded-full mr-3"
                                />
                                <span className="font-medium">Processing Membership...</span>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="flex items-center justify-center gap-3">
                                    
                                    <span className="text-amber-900 drop-shadow-sm">REGISTER ACCOUNT</span>
                                    
                                </div>
                                <p className="text-amber-800/80 text-xs mt-1 font-light tracking-wide">
                                    
                                </p>
                            </div>
                        )}
                    </motion.button>
                </form>

                {/* Message Display */}
                {msg && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-lg text-center text-sm font-medium backdrop-blur-sm ${
                            msg.includes("approved") 
                                ? "bg-green-900/30 text-gold-200 border border-green-500/30" 
                                : "bg-red-900/30 text-red-200 border border-red-500/30"
                        }`}
                    >
                        {msg}
                    </motion.div>
                )}

                {/* Updated Login Link - Brighter and more prominent */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mt-8 pt-8 border-t border-gold-400/20"
                >
                    
                    
                    <motion.a
                        href="/login"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500/20 to-amber-400/20 text-amber-200 font-semibold hover:text-white transition-all duration-300 group px-6 py-4 rounded-xl border-2 border-amber-300/40 hover:border-amber-200/60 hover:bg-gradient-to-r hover:from-gold-500/30 hover:to-amber-400/30 shadow-lg hover:shadow-amber-500/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FaUtensils className="text-amber-300 group-hover:text-yellow-200 text-lg" />
                        <span className="text-lg tracking-wide">Enter the Dining Room</span>
                        <FaUtensils className="text-amber-300 group-hover:text-yellow-200 text-lg" />
                    </motion.a>
                    
                    <p className="text-gold-300/60 text-sm mt-3 italic">
                        Return to your exclusive dining experience
                    </p>
                </motion.div>

                {/* Membership Benefits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-10 grid grid-cols-2 gap-4 text-center"
                >
                    <div className="p-3 bg-black/20 rounded-lg border border-gold-400/10">
                        <FaCalendarAlt className="text-gold-400 text-xl mx-auto mb-2" />
                        <p className="text-gold-200 text-sm">Priority Reservations</p>
                        <p className="text-white/50 text-xs">90-day advance booking</p>
                    </div>
                    <div className="p-3 bg-black/20 rounded-lg border border-gold-400/10">
                        <FaCrown className="text-gold-400 text-xl mx-auto mb-2" />
                        <p className="text-gold-200 text-sm">Chef's Table Access</p>
                        <p className="text-white/50 text-xs">Exclusive culinary events</p>
                    </div>
                    <div className="p-3 bg-black/20 rounded-lg border border-gold-400/10">
                        <FaWineBottle className="text-gold-400 text-xl mx-auto mb-2" />
                        <p className="text-gold-200 text-sm">Wine Tasting Events</p>
                        <p className="text-white/50 text-xs">Monthly curated selections</p>
                    </div>
                    <div className="p-3 bg-black/20 rounded-lg border border-gold-400/10">
                        <FaUser className="text-gold-400 text-xl mx-auto mb-2" />
                        <p className="text-gold-200 text-sm">Dedicated Sommelier</p>
                        <p className="text-white/50 text-xs">Personalized pairings</p>
                    </div>
                </motion.div>

                {/* Membership Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-8 p-4 bg-black/20 rounded-lg border border-gold-400/10"
                >
                    <p className="text-white/60 text-sm text-center italic">
                        "Membership applications are reviewed within 24 hours. 
                        Upon approval, you'll receive access to our exclusive dining experiences."
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}