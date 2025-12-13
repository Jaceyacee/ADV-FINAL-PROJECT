import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { FaWineGlassAlt, FaUtensils, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");

        setMsg("Welcome back! Preparing your table...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setMsg(data.message || "Access denied. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("Service unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-gold-200/20 text-6xl"
        >
          <FaWineGlassAlt />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 right-1/4 text-gold-200/20 text-5xl"
        >
          <FaUtensils />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-lg border border-gold-300/30 relative z-10 overflow-hidden"
      >
        {/* Decorative border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-600 to-gold-400"></div>
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block p-4 rounded-full bg-gold-500/10 mb-4"
          >
            <FaUtensils className="text-gold-400 text-4xl" />
          </motion.div>
          <h1 className="text-4xl font-serif font-bold text-white mb-2">
            Épicure
          </h1>
          <p className="text-gold-300/80 font-light tracking-widest text-sm">
            FINE DINING EXPERIENCE
          </p>
          <p className="text-white/60 mt-4 text-sm">
            Member Access Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email */}
          <div className="relative">
            <label className="block text-gold-200 text-sm font-medium mb-3 tracking-wide">
              <FaEnvelope className="inline mr-2" />
              EMAIL
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder=" name@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                required
              />
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400/60" />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gold-200 text-sm font-medium mb-3 tracking-wide">
              <FaLock className="inline mr-2" />
              PRIVATE KEY
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-12 pr-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                required
              />
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400/60" />
            </div>
          </div>

          {/* Submit */}
          <motion.button
          
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.03, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-black py-5 px-4 rounded-xl font-serif font-bold text-lg shadow-2xl hover:shadow-gold-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:from-gold-500 hover:to-gold-600 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            {loading ? (
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-black border-t-transparent rounded-full mr-3"
                />
                <span className="font-medium">Seating in progress...</span>
              </div>
           
           
            ) : (
              
              

              <span className="text-white"> "ENTER THE DINING ROOM" </span>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gold-400/20"></div>
          <span className="px-4 text-gold-300/50 text-sm">OR</span>
          <div className="flex-grow border-t border-gold-400/20"></div>
        </div>

        {/* Registration Button - Prominent */}
        <motion.button
          onClick={handleRegister}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-black/50 to-black/30 border-2 border-gold-400/40 text-white py-5 px-4 rounded-xl font-serif font-bold text-lg shadow-2xl hover:shadow-gold-400/20 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-center justify-center">
            <FaUserPlus className="mr-3 text-gold-400 text-xl" />
            <span className="text-gold-200">BECOME A MEMBER</span>
          </div>
          <p className="text-gold-300/60 text-xs mt-2 font-light">
            Exclusive reservations, tasting events, and chef's table access
          </p>
        </motion.button>

        {/* Message */}
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg text-center text-sm font-medium backdrop-blur-sm ${
              msg.includes("Welcome") 
                ? "bg-green-900/30 text-gold-200 border border-green-500/30" 
                : "bg-red-900/30 text-red-200 border border-red-500/30"
            }`}
          >
            {msg}
          </motion.div>
        )}

        {/* Additional Links */}
        <div className="text-center mt-8 pt-6 border-t border-gold-400/20">
          <div className="flex justify-center space-x-6 mb-4">
            <motion.a
              href="/forgot-password"
              className="text-gold-300/70 text-sm hover:text-gold-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Forgot Private Key?
            </motion.a>
            <motion.a
              href="/guest-reservation"
              className="text-gold-300/70 text-sm hover:text-gold-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guest Reservation
            </motion.a>
          </div>
          <p className="text-white/40 text-xs mt-4">
            By accessing, you agree to our terms of service and privacy policy
          </p>
        </div>
      </motion.div>
    </div>
  );
}