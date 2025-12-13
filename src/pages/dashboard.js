import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  FaUtensils, 
  FaWineGlassAlt, 
  FaUserTie, 
  FaChartLine, 
  FaCalendarAlt, 
  FaClock,
  FaUsers,
  FaBell,
  FaSearch,
  FaSignOutAlt,
  FaPlus,
  FaChair,
  FaFire,
  FaCreditCard,
  FaCheckCircle,
  FaReceipt,
  FaConciergeBell,
  FaCrown,
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaExclamationTriangle,
  FaLightbulb,
  FaStar,
  FaHeart,
  FaMusic,
  FaLeaf,
  FaGlassCheers,
  FaMountain,
  FaFish,
  FaPepperHot
} from "react-icons/fa";

export default function RestaurantDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [time, setTime] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [feedbackType, setFeedbackType] = useState("suggestion");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [ambiance, setAmbiance] = useState({
      lighting: "low",
      music: "jazz",
      temperature: 22
    });

    const stats = [
        { 
            label: "Tonight's Reservations", 
            value: "24", 
            icon: <FaCalendarAlt />, 
            color: "from-amber-700 to-amber-900",
            gradient: "bg-gradient-to-br from-amber-700 to-amber-900",
            change: "+3",
            detail: "Seats booked",
            trend: "up"
        },
        { 
            label: "Pending Confirmations", 
            value: "8", 
            icon: <FaClock />, 
            color: "from-orange-600 to-orange-800",
            gradient: "bg-gradient-to-br from-orange-600 to-orange-800",
            change: "-2",
            detail: "Awaiting response",
            trend: "down"
        },
        { 
            label: "Total Covers", 
            value: "86", 
            icon: <FaUsers />, 
            color: "from-emerald-700 to-emerald-900",
            gradient: "bg-gradient-to-br from-emerald-700 to-emerald-900",
            change: "+12",
            detail: "Guests tonight",
            trend: "up"
        },
        { 
            label: "Occupancy Rate", 
            value: "78%", 
            icon: <FaChartLine />, 
            color: "from-purple-700 to-purple-900",
            gradient: "bg-gradient-to-br from-purple-700 to-purple-900",
            change: "+5%",
            detail: "Peak capacity",
            trend: "up"
        },
    ];

    const quickActions = [
        { 
            title: "New Reservation", 
            icon: <FaPlus />, 
            color: "bg-gradient-to-br from-emerald-800 to-emerald-950",
            glow: "hover:shadow-emerald-500/30",
            path: "/reservations",
            subtitle: "Book a table",
            accent: "border-emerald-400/40"
        },
        { 
            title: "View Tables", 
            icon: <FaChair />, 
            color: "bg-gradient-to-br from-blue-800 to-blue-950",
            glow: "hover:shadow-blue-500/30",
            path: "/tables",
            subtitle: "Floor plan",
            accent: "border-blue-400/40"
        },
        { 
            title: "Kitchen Orders", 
            icon: <FaFire />, 
            color: "bg-gradient-to-br from-amber-800 to-amber-950",
            glow: "hover:shadow-amber-500/30",
            path: "/kitchen",
            subtitle: "Active orders",
            accent: "border-amber-400/40"
        },
        { 
            title: "Payment Terminal", 
            icon: <FaCreditCard />, 
            color: "bg-gradient-to-br from-purple-800 to-purple-950",
            glow: "hover:shadow-purple-500/30",
            path: "/payment",
            subtitle: "Process bills",
            accent: "border-purple-400/40"
        },
    ];

    const upcomingReservations = [
        { 
            time: "18:30", 
            name: "Mr. Giovanni Rossi", 
            guests: 4, 
            table: "Window Table 3", 
            status: "confirmed",
            notes: "Anniversary - Champagne on arrival",
            specialIcon: <FaGlassCheers />,
            priority: "vip"
        },
        { 
            time: "19:00", 
            name: "Ms. Sarah Johnson", 
            guests: 2, 
            table: "Chef's Counter", 
            status: "pending",
            notes: "Wine pairing requested",
            specialIcon: <FaWineGlassAlt />,
            priority: "regular"
        },
        { 
            time: "19:45", 
            name: "The Chen Family", 
            guests: 6, 
            table: "Private Dining Room", 
            status: "confirmed",
            notes: "VIP - Special menu arranged",
            specialIcon: <FaCrown />,
            priority: "vip"
        },
        { 
            time: "20:15", 
            name: "Mr. Michael Davis", 
            guests: 3, 
            table: "Bar Lounge", 
            status: "confirmed",
            notes: "Business dinner",
            specialIcon: <FaUserTie />,
            priority: "regular"
        },
    ];

    const feedbackTypes = [
        { 
            id: "suggestion", 
            label: "Suggestion", 
            desc: "Improvement idea", 
            icon: <FaLightbulb />,
            color: "from-blue-600 to-blue-800",
            bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-800/10"
        },
        { 
            id: "bug", 
            label: "Bug Report", 
            desc: "Found an issue", 
            icon: <FaExclamationTriangle />,
            color: "from-red-600 to-red-800",
            bgColor: "bg-gradient-to-br from-red-600/20 to-red-800/10"
        },
        { 
            id: "feature", 
            label: "Feature Request", 
            desc: "New feature request", 
            icon: <FaStar />,
            color: "from-purple-600 to-purple-800",
            bgColor: "bg-gradient-to-br from-purple-600/20 to-purple-800/10"
        },
        { 
            id: "praise", 
            label: "Praise", 
            desc: "Something great", 
            icon: <FaHeart />,
            color: "from-emerald-600 to-emerald-800",
            bgColor: "bg-gradient-to-br from-emerald-600/20 to-emerald-800/10"
        },
    ];

    const ambianceControls = [
        { 
            label: "Lighting", 
            value: ambiance.lighting, 
            icon: <FaLightbulb />, 
            options: ["low", "medium", "bright"],
            color: "from-amber-600 to-amber-800"
        },
        { 
            label: "Music", 
            value: ambiance.music, 
            icon: <FaMusic />, 
            options: ["jazz", "classical", "ambient"],
            color: "from-purple-600 to-purple-800"
        },
        { 
            label: "Temperature", 
            value: ambiance.temperature, 
            icon: <FaLeaf />, 
            unit: "°C",
            color: "from-blue-600 to-blue-800"
        }
    ];

    useEffect(() => {  
        const userData = localStorage.getItem("user");  
        if (!userData) {  
            router.push("/login");  
            return;  
        }  
        setUser(JSON.parse(userData));  
        
        // Update time every minute
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [router]);  

    const handleLogout = () => {  
        localStorage.removeItem("user");  
        localStorage.removeItem("token");  
        localStorage.removeItem("isLoggedIn");  
        router.push("/");  
    };  

    const handleFeedbackSubmit = async () => {
        if (!feedback.trim()) {
            setError("Please enter your feedback before submitting.");
            return;
        }
        
        if (feedback.trim().length < 5) {
            setError("Feedback must be at least 5 characters long.");
            return;
        }
        
        setIsSubmitting(true);
        setError("");
        
        try {
            const response = await fetch('/api/feedback/submit', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    userName: user.name,
                    type: feedbackType,
                    message: feedback
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit feedback');
            }

            console.log('Feedback submitted successfully:', result);
            setSubmitted(true);
            setFeedback("");
            setError("");
            
            // Reset submission status after 3 seconds
            setTimeout(() => {
                setSubmitted(false);
                setShowFeedback(false);
            }, 3000);
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setError(error.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFeedbackClose = () => {
        setShowFeedback(false);
        setFeedback("");
        setError("");
        setSubmitted(false);
    };

    if (!user) return null;  

    return (  
        
        <div className="min-h-screen relative overflow-hidden bg-gray-950">
            
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                {/* Main Background with Parallax Effect */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
                        backgroundAttachment: 'fixed'
                    }}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
                
                {/* Animated Particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[1px] h-[1px] bg-amber-400/20"
                            initial={{
                                x: Math.random() * 100 + 'vw',
                                y: Math.random() * 100 + 'vh',
                            }}
                            animate={{
                                x: [null, Math.random() * 100 + 'vw'],
                                y: [null, Math.random() * 100 + 'vh'],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 20,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    ))}
                </div>
                
                {/* Subtle Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
            </div>

            {/* Animated Candle Light Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/3 blur-3xl rounded-full"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Enhanced Navigation */}
                <nav className="bg-gradient-to-b from-black/60 via-black/50 to-transparent backdrop-blur-2xl border-b border-amber-500/20 px-8 py-4 sticky top-0 z-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            {/* Logo Section */}
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-4 group cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="p-3 bg-gradient-to-br from-amber-800 to-amber-950 rounded-xl shadow-2xl group-hover:shadow-amber-500/30 transition-all duration-500">
                                        <FaUtensils className="text-amber-200 text-2xl" />
                                    </div>
                                    <motion.div
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute -inset-1 border border-amber-400/20 rounded-xl blur-sm"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-serif font-bold text-white tracking-wider bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                                        LA BELLE VUE
                                    </h1>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-16 h-[1px] bg-gradient-to-r from-amber-500 to-transparent" />
                                        <p className="text-amber-300/60 text-xs font-light tracking-[0.3em]">FINE DINING • EST. 1985</p>
                                        <div className="w-16 h-[1px] bg-gradient-to-l from-amber-500 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Search */}
                            <div className="hidden lg:block relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                    <FaSearch className="text-amber-400/70" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search reservations, guests, tables..."
                                    className="pl-12 pr-4 py-3 bg-black/30 border border-amber-400/20 rounded-xl text-white placeholder-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500 w-80 transition-all duration-300 backdrop-blur-sm font-sans text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400/50 hover:text-amber-300 cursor-pointer"
                                >
                                    ⏎
                                </motion.div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            {/* Ambient Controls */}
                            <div className="hidden lg:flex items-center space-x-2 bg-black/30 rounded-xl px-3 py-2 border border-amber-400/20">
                                {ambianceControls.map((control, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${control.color}`}>
                                            {control.icon}
                                        </div>
                                        <span className="text-xs text-amber-300/70">{control.label}</span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Time Display */}
                            <div className="hidden md:block text-right">
                                <div className="text-amber-300/60 text-xs font-light tracking-wider">SERVICE TIME</div>
                                <div className="text-white text-xl font-serif tracking-wider flex items-center">
                                    <span className="text-amber-400 mr-2">🕯️</span>
                                    {time || "18:45"}
                                    <span className="ml-2 text-amber-300/50 text-sm">PM</span>
                                </div>
                            </div>
                            
                            {/* Notifications */}
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative p-3 text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 rounded-xl transition-all duration-300 backdrop-blur-sm group"
                            >
                                <FaBell className="text-xl" />
                                <span className="absolute top-2 right-2 h-3 w-3 bg-gradient-to-br from-red-500 to-red-700 rounded-full border-2 border-black shadow-lg animate-pulse" />
                                <div className="absolute -bottom-1 right-1/2 translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                            
                            {/* User Profile - Updated to show uploaded image */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-4 group cursor-pointer"
                                onClick={() => router.push('/profile')}
                            >
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-medium text-white font-serif">{user.name || "Maître D'"}</p>
                                    <p className="text-xs text-amber-300/60 font-light tracking-wider flex items-center">
                                        <span className="w-8 h-[1px] bg-amber-500/30 mr-2" />
                                        RESTAURANT DIRECTOR
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="h-12 w-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center border-2 border-amber-400/40 shadow-xl relative overflow-hidden">
                                        {/* Check if user has a profile image */}
                                        {user.profileImage ? (
                                            <>
                                                <img 
                                                    src={user.profileImage} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover rounded-full absolute inset-0 z-10"
                                                    onError={(e) => {
                                                        // If image fails to load, show fallback icon
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent z-20" />
                                            </>
                                        ) : (
                                            <>
                                                <FaUserTie className="text-amber-200 text-xl z-30 relative" />
                                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full border-2 border-black z-30" />
                                </div>
                            </motion.div>
                            
                            {/* Logout */}
                            <motion.button
                                whileHover={{ scale: 1.05, x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="flex items-center space-x-3 px-5 py-2.5 bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 text-red-200 hover:text-white hover:bg-red-900/40 hover:border-red-400/40 rounded-xl transition-all duration-300 backdrop-blur-sm font-sans group"
                            >
                                <FaSignOutAlt className="group-hover:rotate-180 transition-transform duration-500" />
                                <span className="hidden md:inline font-medium">Log Out</span>
                            </motion.button>
                        </div>
                    </div>
                </nav>

                <div className="p-6 lg:p-8">
                    {/* Welcome Header with Enhanced Design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 relative"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between">
                            <div>
                                <h2 className="text-5xl font-serif font-bold mb-2">
                                    <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                                        Good evening, 
                                    </span>
                                    <br />
                                    <span className="text-white">
                                        {user.name?.split(' ')[0] || "Director"}
                                    </span>
                                </h2>
                                <div className="flex items-center space-x-4 mt-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full animate-pulse" />
                                        <p className="text-amber-300/80 font-light tracking-wider">The dining room awaits your direction</p>
                                    </div>
                                    <div className="hidden md:flex items-center space-x-2 text-amber-400/50">
                                        <FaLeaf />
                                        <FaFish />
                                        <FaPepperHot />
                                        <FaMountain />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <div className="text-amber-400 text-sm font-light tracking-[0.3em] bg-black/30 px-4 py-2 rounded-xl border border-amber-400/20 backdrop-blur-sm">
                                    {new Date().toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        month: 'long', 
                                        day: 'numeric',
                                        year: 'numeric'
                                    }).toUpperCase()}
                                </div>
                                <div className="text-white/50 text-xs tracking-wider font-sans mt-2 text-right">
                                    ✨ SERVICE HOURS: 18:00 - 23:00
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                    </motion.div>

                    {/* Stats Grid - Enhanced Luxurious Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.03 }}
                                className="group relative cursor-pointer"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6 shadow-2xl overflow-hidden">
                                    {/* Animated Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-amber-300/70 text-sm font-light tracking-wider mb-3">{stat.label}</p>
                                                <p className="text-5xl font-serif font-bold text-white mb-2">{stat.value}</p>
                                                <div className="text-sm text-amber-300/50 font-light tracking-wider">{stat.detail}</div>
                                            </div>
                                            <div className={`${stat.gradient} p-4 rounded-xl shadow-lg relative`}>
                                                <div className="text-amber-200 text-2xl">
                                                    {stat.icon}
                                                </div>
                                                {stat.trend === 'up' ? (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-white">↑</span>
                                                    </div>
                                                ) : (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                                        <span className="text-xs text-white">↓</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`mt-6 text-sm font-medium font-sans ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            <span className="bg-gradient-to-r from-black/40 to-transparent px-3 py-1.5 rounded-full flex items-center space-x-2">
                                                <span className={stat.change.startsWith('+') ? 'text-emerald-300' : 'text-amber-300'}>
                                                    {stat.change.startsWith('+') ? '📈' : '📉'}
                                                </span>
                                                <span>{stat.change} from yesterday</span>
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl" />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/30 rounded-bl-2xl" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Quick Actions & Reservations */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Quick Actions - Enhanced */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
                                            <h3 className="text-2xl font-serif font-bold text-white">Quick Actions</h3>
                                        </div>
                                        <p className="text-amber-300/70 text-sm font-light tracking-wider pl-5">Essential operations at your fingertips</p>
                                    </div>
                                    <motion.button 
                                        whileHover={{ scale: 1.05, x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-amber-400 hover:text-amber-300 text-sm font-medium font-sans group flex items-center space-x-2"
                                    >
                                        <span>View all tools</span>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">↗</span>
                                    </motion.button>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                    {quickActions.map((action, index) => (
                                        <motion.button
                                            key={action.title}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.08, y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => router.push(action.path)}
                                            className={`${action.color} ${action.glow} rounded-2xl p-6 flex flex-col items-center justify-center border ${action.accent} hover:border-amber-400/60 transition-all duration-300 shadow-2xl hover:shadow-xl relative overflow-hidden group`}
                                        >
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            
                                            {/* Icon Container */}
                                            <div className="relative mb-4">
                                                <div className="text-amber-200 text-3xl group-hover:scale-110 transition-transform duration-300 z-10 relative">
                                                    {action.icon}
                                                </div>
                                                <div className="absolute inset-0 bg-amber-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                                            </div>
                                            
                                            {/* Text Content */}
                                            <span className="text-white font-medium text-center mb-2 font-serif text-lg z-10">{action.title}</span>
                                            <span className="text-amber-300/70 text-xs font-light tracking-wider z-10">{action.subtitle}</span>
                                            
                                            {/* Hover Indicator */}
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Upcoming Reservations - Enhanced */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 overflow-hidden shadow-2xl">
                                    {/* Header */}
                                    <div className="px-8 py-6 border-b border-amber-500/20 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-3 bg-gradient-to-br from-amber-800 to-amber-950 rounded-xl shadow-lg">
                                                    <FaClock className="text-amber-200 text-xl" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-serif font-bold text-white">Tonight's Reservations</h3>
                                                    <p className="text-amber-300/70 text-sm font-light tracking-wider">Arrivals within the next 2 hours</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-amber-900/30 to-amber-800/20 rounded-xl border border-amber-500/20">
                                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                                <span className="text-amber-300 text-sm tracking-wider font-sans">LIVE UPDATES</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Reservations List */}
                                    <div className="divide-y divide-amber-500/10">
                                        {upcomingReservations.map((reservation, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="px-8 py-6 hover:bg-gradient-to-r from-amber-500/[0.08] to-transparent transition-all duration-300 group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start space-x-6">
                                                        {/* Time Circle */}
                                                        <div className="relative">
                                                            <div className="w-16 h-16 bg-gradient-to-br from-amber-900/50 to-amber-800/30 rounded-full flex flex-col items-center justify-center border border-amber-500/30">
                                                                <div className="text-xl font-serif font-bold text-amber-400 tracking-tighter">{reservation.time}</div>
                                                                <div className="text-[10px] text-amber-300/50 font-light tracking-wider mt-[-2px]">TONIGHT</div>
                                                            </div>
                                                            {reservation.priority === 'vip' && (
                                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center border border-amber-300/30">
                                                                    <FaCrown className="text-[10px] text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Reservation Details */}
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-4 mb-3">
                                                                <h4 className="font-medium text-white text-xl group-hover:text-amber-300 transition-colors duration-300 font-serif">
                                                                    {reservation.name}
                                                                </h4>
                                                                <div className="flex items-center space-x-2">
                                                                    {reservation.specialIcon && (
                                                                        <div className="text-amber-400/70">
                                                                            {reservation.specialIcon}
                                                                        </div>
                                                                    )}
                                                                    {reservation.status === 'confirmed' ? (
                                                                        <span className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 text-emerald-400 rounded-full text-sm border border-emerald-500/30 backdrop-blur-sm">
                                                                            <FaCheckCircle />
                                                                            <span className="tracking-wider text-xs">CONFIRMED</span>
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-amber-900/30 to-amber-800/20 text-amber-400 rounded-full text-sm border border-amber-500/30 backdrop-blur-sm">
                                                                            <FaClock className="animate-pulse" />
                                                                            <span className="tracking-wider text-xs">PENDING</span>
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <p className="text-amber-300/80 text-sm mb-3 font-sans flex items-center space-x-4">
                                                                <span className="flex items-center space-x-2">
                                                                    <FaUsers className="text-amber-400/60" />
                                                                    <span>{reservation.guests} guests</span>
                                                                </span>
                                                                <span className="text-amber-500/40">•</span>
                                                                <span className="flex items-center space-x-2">
                                                                    <FaChair className="text-amber-400/60" />
                                                                    <span>{reservation.table}</span>
                                                                </span>
                                                            </p>
                                                            {reservation.notes && (
                                                                <motion.p 
                                                                    initial={{ opacity: 0.8 }}
                                                                    animate={{ opacity: 1 }}
                                                                    className="text-amber-400/70 text-sm font-light italic font-sans bg-gradient-to-r from-amber-500/10 to-transparent px-4 py-2.5 rounded-lg border-l-4 border-amber-500/30"
                                                                >
                                                                    <FaConciergeBell className="inline mr-2 text-amber-500/70" />
                                                                    {reservation.notes}
                                                                </motion.p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Action Buttons */}
                                                    <div className="flex space-x-3">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="px-5 py-3 text-sm bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-900 transition-all duration-300 border border-emerald-500/40 backdrop-blur-sm font-sans flex items-center space-x-2 group"
                                                        >
                                                            <span>Check In</span>
                                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="px-5 py-3 text-sm bg-gradient-to-r from-black/40 to-black/20 border border-amber-400/30 text-amber-300 rounded-xl hover:bg-amber-500/20 hover:text-amber-200 hover:border-amber-400/40 transition-all duration-300 backdrop-blur-sm font-sans"
                                                        >
                                                            Details
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="px-8 py-6 border-t border-amber-500/20 bg-gradient-to-r from-transparent via-black/20 to-transparent">
                                        <motion.button 
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => router.push('/reservations')}
                                            className="w-full py-4 text-center bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 rounded-xl font-medium transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                            <span className="flex items-center justify-center space-x-3 font-sans relative z-10">
                                                <span>View All Reservations</span>
                                                <span className="group-hover:translate-x-2 transition-transform duration-300">↗</span>
                                            </span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-8">
                            {/* Restaurant Hours - Enhanced */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -translate-y-16 translate-x-16" />
                                
                                <div className="flex items-center space-x-4 mb-6 relative z-10">
                                    <div className="p-3 bg-gradient-to-br from-amber-800 to-amber-950 rounded-xl shadow-lg">
                                        <FaClock className="text-amber-200 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-white">Service Hours</h3>
                                        <p className="text-amber-300/70 text-sm font-light tracking-wider">Fine dining schedule</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 relative z-10">
                                    {[
                                        { day: "Monday - Thursday", hours: "18:00 - 22:00", type: "Standard Service", icon: "🍽️" },
                                        { day: "Friday - Saturday", hours: "18:00 - 23:00", type: "Extended Service", icon: "🎉" },
                                        { day: "Sunday", hours: "17:00 - 21:00", type: "Brunch & Dinner", icon: "🥂" },
                                    ].map((schedule, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            className="flex justify-between items-center p-4 rounded-xl hover:bg-gradient-to-r from-white/5 to-transparent transition-all duration-300 group border border-transparent hover:border-amber-500/10"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{schedule.icon}</span>
                                                <div>
                                                    <span className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors duration-300 font-serif">{schedule.day}</span>
                                                    <p className="text-xs text-amber-300/50 font-light tracking-wider">{schedule.type}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-amber-400 bg-amber-500/20 px-4 py-2 rounded-lg tracking-wider backdrop-blur-sm group-hover:bg-amber-500/30 transition-colors">
                                                {schedule.hours}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Decorative Elements */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                            </motion.div>

                            {/* Staff On Duty - Enhanced */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6 shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-gradient-to-br from-blue-800 to-blue-950 rounded-xl shadow-lg">
                                            <FaUtensils className="text-blue-200 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-serif font-bold text-white">Staff On Duty</h3>
                                            <p className="text-amber-300/70 text-sm font-light tracking-wider">Service team status</p>
                                        </div>
                                    </div>
                                    <span className="text-xs px-4 py-2 bg-gradient-to-r from-emerald-900/40 to-emerald-800/30 text-emerald-400 rounded-full border border-emerald-500/40 backdrop-blur-sm tracking-wider flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <span>6 ACTIVE</span>
                                    </span>
                                </div>
                                
                                <div className="space-y-4">
                                    {[
                                        { name: "Chef Giovanni", role: "Executive Chef", status: "online", icon: <FaCrown className="text-amber-400" />, specialty: "Italian Cuisine" },
                                        { name: "Sommelier Marie", role: "Wine Director", status: "online", icon: <FaWineGlassAlt className="text-purple-400" />, specialty: "French Wines" },
                                        { name: "Maître D' Louis", role: "Floor Director", status: "break", icon: <FaUserTie className="text-blue-400" />, specialty: "VIP Service" },
                                    ].map((staff, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r from-white/10 to-transparent transition-all duration-300 group border border-transparent hover:border-amber-500/20"
                                        >
                                            <div className="relative">
                                                <div className="h-14 w-14 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center border border-amber-500/30 shadow-xl">
                                                    <div className="text-2xl">
                                                        {staff.icon}
                                                    </div>
                                                </div>
                                                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-black shadow-lg flex items-center justify-center ${staff.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                                    {staff.status === 'online' ? '✓' : '☕'}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-medium text-white group-hover:text-amber-300 transition-colors duration-300 font-serif">{staff.name}</p>
                                                    <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm ${staff.status === 'online' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/40' : 'bg-amber-900/40 text-amber-400 border border-amber-500/40'}`}>
                                                        {staff.status === 'online' ? 'ACTIVE' : 'ON BREAK'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-amber-300/70 font-light tracking-wider mb-1">{staff.role}</p>
                                                <p className="text-xs text-amber-300/50 font-light italic">{staff.specialty}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Recent Activity - Enhanced */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6 shadow-2xl"
                            >
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-br from-purple-800 to-purple-950 rounded-xl shadow-lg">
                                        <FaReceipt className="text-purple-200 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif font-bold text-white">Recent Activity</h3>
                                        <p className="text-amber-300/70 text-sm font-light tracking-wider">Restaurant log</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-5">
                                    {[
                                        { time: "2 minutes ago", action: "Table 4 checked in for anniversary", user: "Maître D'", color: "bg-emerald-600", icon: "💐" },
                                        { time: "15 minutes ago", action: "New reservation for VIP party of 6", user: "System", color: "bg-blue-600", icon: "⭐" },
                                        { time: "1 hour ago", action: "Special dietary request added", user: "Guest", color: "bg-amber-600", icon: "🥗" },
                                        { time: "2 hours ago", action: "Wine pairing completed for table 2", user: "Sommelier", color: "bg-purple-600", icon: "🍷" },
                                    ].map((activity, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start space-x-4 group"
                                        >
                                            <div className="relative mt-1">
                                                <div className={`${activity.color} h-3 w-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-lg`}></div>
                                                <div className="absolute inset-0 bg-white blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-1">
                                                    <p className="text-sm text-white group-hover:text-amber-300 transition-colors duration-300 font-sans">{activity.action}</p>
                                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{activity.icon}</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-xs text-amber-300/60 font-light tracking-wider">{activity.time}</span>
                                                    <span className="text-xs text-amber-300/30">•</span>
                                                    <span className="text-xs text-amber-300/80 font-light tracking-wider">by {activity.user}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Feedback Modal */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    {showFeedback ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl shadow-2xl border border-amber-500/30 backdrop-blur-lg p-6 w-96 max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-serif">
                                    <div className="p-2 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg">
                                        <FaCommentDots className="text-amber-200" />
                                    </div>
                                    Share Your Feedback
                                </h3>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    onClick={handleFeedbackClose}
                                    className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-full transition-colors duration-300"
                                >
                                    <FaTimes />
                                </motion.button>
                            </div>
                            
                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <FaCheckCircle className="text-2xl text-emerald-200" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2 font-serif">Thank You!</h4>
                                    <p className="text-gray-300 mb-4">Your feedback has been submitted successfully.</p>
                                    <p className="text-sm text-gray-400">We appreciate your input and will review it soon.</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-300 mb-3 font-sans">
                                            What type of feedback do you have?
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {feedbackTypes.map((type) => (
                                                <motion.button
                                                    key={type.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setFeedbackType(type.id)}
                                                    className={`p-4 rounded-xl text-left transition-all duration-300 border backdrop-blur-sm ${
                                                        feedbackType === type.id
                                                            ? `${type.bgColor} border-amber-500/50 text-white scale-[1.02] shadow-lg`
                                                            : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800/80 hover:border-gray-600"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${type.color} shadow-md`}>
                                                            <div className="text-white text-lg">
                                                                {type.icon}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium font-sans">{type.label}</div>
                                                            <div className="text-xs text-gray-400 mt-1">{type.desc}</div>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                                            Your Feedback
                                            <span className="text-red-400 ml-1">*</span>
                                        </label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => {
                                                setFeedback(e.target.value);
                                                if (error) setError("");
                                            }}
                                            placeholder="Share your thoughts, ideas, or suggestions in detail..."
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 resize-none h-40 backdrop-blur-sm"
                                            rows={5}
                                        />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className={`text-xs font-sans ${feedback.trim().length < 5 ? 'text-red-400' : 'text-gray-400'}`}>
                                                {feedback.trim().length} characters (minimum 5)
                                            </span>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg backdrop-blur-sm"
                                        >
                                            <div className="flex items-center gap-2 text-red-300">
                                                <FaExclamationTriangle />
                                                <span className="text-sm font-sans">{error}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleFeedbackSubmit}
                                        disabled={!feedback.trim() || isSubmitting || feedback.trim().length < 5}
                                        className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm ${
                                            !feedback.trim() || isSubmitting || feedback.trim().length < 5
                                                ? "bg-gray-800/50 text-gray-400 cursor-not-allowed"
                                                : "bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white shadow-lg hover:shadow-amber-500/30 border border-amber-500/30"
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="group-hover:-translate-y-1 transition-transform" />
                                                <span className="font-sans">Submit Feedback</span>
                                            </>
                                        )}
                                    </motion.button>

                                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                                        <p className="text-xs text-gray-400 text-center font-sans">
                                            Your feedback helps us improve the restaurant management system.
                                            Thank you for taking the time to share your thoughts!
                                        </p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowFeedback(true)}
                            className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-br from-amber-700 to-amber-900 text-white rounded-2xl shadow-2xl hover:shadow-amber-500/40 border border-amber-400/30 backdrop-blur-lg group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <FaCommentDots className="text-xl z-10" />
                            <span className="font-medium z-10">Give Feedback</span>
                        </motion.button>
                    )}
                </motion.div>

                {/* Bottom Navigation for Mobile */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-gray-900/95 border-t border-amber-500/30 py-4 px-6 backdrop-blur-2xl z-40">
                    <div className="flex justify-between items-center">
                        {quickActions.slice(0, 3).map((action, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push(action.path)}
                                className="flex flex-col items-center group"
                            >
                                <div className={`${action.color} p-3 rounded-xl mb-2 shadow-lg relative overflow-hidden`}>
                                    <div className="text-amber-200 text-lg z-10 relative">
                                        {action.icon}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                </div>
                                <span className="text-xs text-amber-300 font-light tracking-wider">{action.title}</span>
                            </motion.button>
                        ))}
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/settings')}
                            className="flex flex-col items-center group"
                        >
                            <div className="bg-gradient-to-br from-gray-800 to-black p-3 rounded-xl mb-2 border border-amber-500/30 shadow-lg relative overflow-hidden">
                                <span className="text-amber-300 text-lg z-10 relative">⚙️</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            </div>
                            <span className="text-xs text-amber-300 font-light tracking-wider">More</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>  
    );  
}