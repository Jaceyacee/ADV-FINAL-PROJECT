import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = () => {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            const isLoggedIn = localStorage.getItem("isLoggedIn");

            if (!user || !token || isLoggedIn !== "true") {
                // Not logged in, redirect to login page
                router.push("/login");
            } else {
                // User is logged in, show the homepage
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [router]);

    // Show loading while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-amber-100 text-lg font-medium">Preparing your experience...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 p-6"
            >
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xl">🍷</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white font-serif">Bella Vista</h1>
                            <p className="text-amber-200 text-sm">Fine Italian Restaurant</p>
                        </div>
                    </motion.div>
                    
                    <div className="hidden md:flex items-center space-x-6">
                        <span className="text-amber-100 text-sm">
                            {new Date().toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </span>
                        <span className="text-amber-200">•</span>
                        <span className="text-amber-100 text-sm">Open Tonight 5:00 PM</span>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="relative z-10 px-4 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-center mb-16"
                    >
                        <motion.h1
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-5xl md:text-7xl font-bold text-white font-serif mb-6 leading-tight"
                        >
                            Welcome to
                            <motion.span
                                className="block bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 bg-clip-text text-transparent mt-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                Bella Vista
                            </motion.span>
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl text-amber-100/80 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Experience authentic Italian cuisine in an elegant setting with breathtaking views. 
                            Where every meal is a celebration of flavor and tradition.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/dashboard')}
                                className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-bold rounded-xl shadow-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:shadow-2xl border border-amber-400 flex items-center space-x-3"
                            >
                                <span>🍽️</span>
                                <span>Go to Dashboard</span>
                            </motion.button>
                            
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/reservations/new')}
                                className="px-10 py-4 bg-transparent text-amber-300 text-lg font-bold rounded-xl border-2 border-amber-400 hover:bg-amber-900/30 transition-all duration-300 flex items-center space-x-3"
                            >
                                <span>📅</span>
                                <span>New Reservation</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                    >
                        {[
                            {
                                icon: "👨‍🍳",
                                title: "Expert Chefs",
                                description: "Our Michelin-trained chefs create authentic Italian dishes using traditional techniques."
                            },
                            {
                                icon: "🍷",
                                title: "Fine Wine Selection",
                                description: "Over 200 wines curated by our sommelier from Italy's finest vineyards."
                            },
                            {
                                icon: "🌅",
                                title: "Stunning Views",
                                description: "Panoramic views of the city skyline from our rooftop dining area."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8 + (index * 0.2) }}
                                whileHover={{ y: -10 }}
                                className="bg-amber-900/30 backdrop-blur-sm rounded-xl p-8 border border-amber-800/50 hover:border-amber-600/50 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold text-amber-100 mb-3">{feature.title}</h3>
                                <p className="text-amber-200/70 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Today's Specials */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2 }}
                        className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/30"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-amber-100">Today's Specials</h2>
                                <p className="text-amber-200/70 mt-2">Chef's recommendations for today</p>
                            </div>
                            <span className="text-amber-300 text-sm bg-amber-900/50 px-4 py-2 rounded-full">
                                🍝 Fresh Daily
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    name: "Truffle Risotto",
                                    description: "Arborio rice with black truffle, parmesan, and white wine",
                                    price: "$28"
                                },
                                {
                                    name: "Osso Buco",
                                    description: "Braised veal shanks with saffron risotto and gremolata",
                                    price: "$42"
                                }
                            ].map((dish, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 2.4 + (index * 0.2) }}
                                    whileHover={{ x: 10 }}
                                    className="bg-amber-950/30 rounded-xl p-6 border border-amber-800/30 hover:border-amber-600/50 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-amber-100">{dish.name}</h3>
                                        <span className="text-amber-300 font-bold">{dish.price}</span>
                                    </div>
                                    <p className="text-amber-200/70">{dish.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Restaurant Hours */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.8 }}
                        className="mt-12 text-center"
                    >
                        <h3 className="text-2xl font-bold text-amber-100 mb-6">Restaurant Hours</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {[
                                { days: "Monday - Thursday", hours: "5:00 PM - 10:00 PM" },
                                { days: "Friday - Saturday", hours: "5:00 PM - 11:00 PM" },
                                { days: "Sunday", hours: "4:00 PM - 9:00 PM" }
                            ].map((schedule, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 3 + (index * 0.2) }}
                                    className="bg-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-800/30"
                                >
                                    <div className="text-amber-100 font-medium mb-2">{schedule.days}</div>
                                    <div className="text-amber-300 font-bold text-lg">{schedule.hours}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, Math.random() * 15 - 7.5, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3
                        }}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 25 + 15}px`,
                            height: `${Math.random() * 25 + 15}px`,
                            backgroundColor: `rgba(245, 158, 11, ${Math.random() * 0.2 + 0.1})`,
                            borderRadius: '50%',
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
                
                {/* Decorative herbs/leaves */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`leaf-${i}`}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                        className="absolute text-amber-600/20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 40 + 30}px`,
                        }}
                    >
                        {['🌿', '🍃', '🍂'][i % 3]}
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="relative z-10 py-8 px-6 border-t border-amber-800/30 mt-12"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-amber-200/60 text-sm">
                        © {new Date().getFullYear()} Bella Vista Restaurant. All rights reserved.
                    </p>
                    <p className="text-amber-300/50 text-xs mt-2">
                        123 Gourmet Street • Food District • (555) 123-4567
                    </p>
                </div>
            </motion.footer>
        </div>
    );
}