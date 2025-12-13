import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  FaArrowLeft, 
  FaChair,
  FaUtensils,
  FaGlassCheers,
  FaPlus,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function AddTablePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: "", seats: 2, location: "" });

    // Load user
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    // Handle form input
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Submit new table
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/tables/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error creating table");

            alert("Table added successfully!");
            setForm({ name: "", seats: 2, location: "" });

            // Redirect to home/dashboard page
            router.push("/dashboard");
        } catch (err) {
            alert("Failed to add table: " + err.message);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                }}
            />
            
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 right-1/4 text-gold-400/10 text-6xl"
                >
                    <FaGlassCheers />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/3 left-1/4 text-gold-400/10 text-5xl"
                >
                    <FaUtensils />
                </motion.div>
            </div>

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/dashboard")}
                className="absolute top-6 left-6 z-30 flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-black/40 to-black/20 border border-gold-400/30 text-gold-300 rounded-xl hover:bg-gold-500/10 hover:text-gold-200 transition-all duration-300 backdrop-blur-sm"
            >
                <FaArrowLeft />
                <span className="hidden md:inline">Back to Dashboard</span>
            </motion.button>

            {/* Main Content */}
            <div className="relative z-10 max-w-md mx-auto pt-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 mb-4">
                        <FaChair className="text-blue-200 text-3xl" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-white mb-3">
                        Add New Table
                    </h1>
                    <p className="text-gold-300/70 font-light tracking-widest">
                        CONFIGURE DINING TABLE
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gold-500/30 shadow-2xl overflow-hidden"
                >
                    {/* Decorative Top Border */}
                    <div className="h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"></div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        {/* Table Name */}
                        <div className="space-y-2">
                            <label className="block text-gold-300 text-sm font-medium tracking-wide">
                                Table Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Window Table 1, Chef's Counter"
                                className="w-full px-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        {/* Seats */}
                        <div className="space-y-2">
                            <label className="block text-gold-300 text-sm font-medium tracking-wide">
                                Number of Seats
                            </label>
                            <input
                                type="number"
                                name="seats"
                                value={form.seats}
                                min="1"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="block text-gold-300 text-sm font-medium tracking-wide">
                                <FaMapMarkerAlt className="inline mr-2" />
                                Location (Optional)
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g., Window area, Private room, Terrace"
                                className="w-full px-4 py-4 bg-black/30 border border-gold-400/30 rounded-xl text-white placeholder-gold-300/50 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="pt-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-5 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white rounded-xl font-serif font-bold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 group relative overflow-hidden border border-blue-400/50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <div className="flex items-center justify-center space-x-3">
                                    
                                    <span className="text-shadow-lg shadow-black/50 drop-shadow-lg tracking-wide">ADD TABLE</span>
                                    <FaPlus className="text-white/90 text-lg" />
                                </div>
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Bottom Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-center text-gold-300/70 text-sm"
                >
                    <p>New tables will appear immediately in your floor plan</p>
                </motion.div>
            </div>
        </div>
    );
}