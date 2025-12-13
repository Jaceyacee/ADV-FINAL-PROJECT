import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUtensils, 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClock, 
  FaPlus, 
  FaMinus,
  FaShoppingCart,
  FaCheck,
  FaFilter,
  FaFire,
  FaLeaf,
  FaIceCream,
  FaGlassCheers,
  FaSearch,
  FaChevronRight,
  FaTag,
  FaStar,
  FaUser,
  FaInfoCircle
} from "react-icons/fa";

export default function DishesMenuPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Reservation state
    const [reserveDate, setReserveDate] = useState("");
    const [reserveTime, setReserveTime] = useState("");
    const [reserveNote, setReserveNote] = useState("");
    const [reserveSuccess, setReserveSuccess] = useState(false);
    const [reserveError, setReserveError] = useState("");
    const [lastReservation, setLastReservation] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const menuCategories = {
        all: { label: "All Dishes", icon: "🍽️", color: "from-amber-500 to-orange-500" },
        mains: { label: "Main Courses", icon: "🍖", color: "from-red-500 to-orange-500" },
        appetizers: { label: "Appetizers", icon: "🥗", color: "from-green-500 to-emerald-500" },
        desserts: { label: "Desserts", icon: "🍰", color: "from-pink-500 to-rose-500" },
        drinks: { label: "Drinks", icon: "🥤", color: "from-blue-500 to-cyan-500" },
        vegetarian: { label: "Vegetarian", icon: "🥦", color: "from-lime-500 to-green-500" }
    };

    const menu = [
        // Main Courses
        { id: 1, name: "Burger & Fries", price: 250, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Juicy beef patty with fresh veggies and crispy fries", popular: true, spicy: false },
        { id: 2, name: "Chicken Alfredo Pasta", price: 320, image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Creamy Alfredo sauce with grilled chicken", popular: true, spicy: false },
        { id: 3, name: "Beef Steak", price: 550, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Premium angus beef, cooked to perfection", popular: true, spicy: false },
        { id: 4, name: "Grilled Salmon", price: 480, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Atlantic salmon with lemon butter sauce", popular: false, spicy: false },
        { id: 5, name: "BBQ Ribs", price: 520, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Slow-cooked ribs with signature BBQ sauce", popular: true, spicy: true },
        { id: 6, name: "Fish & Chips", price: 280, image: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Crispy battered fish with golden fries", popular: false, spicy: false },
        { id: 7, name: "Chicken Curry", price: 320, image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Aromatic curry with tender chicken pieces", popular: false, spicy: true },
        { id: 8, name: "Margherita Pizza", price: 380, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "mains", description: "Classic pizza with fresh mozzarella and basil", popular: true, spicy: false },
        
        // Appetizers
        { id: 9, name: "Club Sandwich", price: 210, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "appetizers", description: "Triple-decker sandwich with crispy bacon", popular: false, spicy: false },
        { id: 10, name: "Caesar Salad", price: 220, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "appetizers", description: "Fresh romaine lettuce with Caesar dressing", popular: true, spicy: false },
        { id: 11, name: "Garlic Bread", price: 120, image: "https://th.bing.com/th/id/OIP.ad4BUY3Z2O0ix6Ka0CbhvAHaLG?w=188&h=282&c=7&r=0&o=7&cb=ucfimg2&dpr=1.4&pid=1.7&rm=3&ucfimg=1", category: "appetizers", description: "Warm bread with garlic butter and herbs", popular: false, spicy: false },
        { id: 12, name: "Tomato Bruschetta", price: 180, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "appetizers", description: "Toasted bread with fresh tomatoes and basil", popular: false, spicy: false },
        
        // Desserts
        { id: 13, name: "Chocolate Brownie", price: 150, image: "https://bing.com/th?id=OSK.db97e2b340fdabc3cb2286f2b25117d3", category: "desserts", description: "Rich chocolate brownie with walnuts", popular: true, spicy: false },
        { id: 14, name: "Cheesecake", price: 220, image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "desserts", description: "New York style cheesecake with berry compote", popular: true, spicy: false },
        { id: 15, name: "Tiramisu", price: 200, image: "https://tse2.mm.bing.net/th/id/OIP.kOI06aYHMz31JVIgC63rDAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", category: "desserts", description: "Classic Italian dessert with coffee and mascarpone", popular: false, spicy: false },
        
        // Drinks
        { id: 16, name: "Coffee (Hot)", price: 90, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "drinks", description: "Freshly brewed Arabica coffee", popular: true, spicy: false },
        { id: 17, name: "Mango Smoothie", price: 120, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "drinks", description: "Fresh mango blended with yogurt", popular: false, spicy: false },
        
        // Vegetarian
        { id: 18, name: "Fresh Fruit Bowl", price: 180, image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "vegetarian", description: "Seasonal fresh fruits with honey drizzle", popular: false, spicy: false },
        { id: 19, name: "Vegetable Stir Fry", price: 200, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "vegetarian", description: "Assorted vegetables in teriyaki sauce", popular: true, spicy: false },
    ];

    const filteredMenu = activeCategory === "all" 
        ? menu.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : menu.filter(item => 
            item.category === activeCategory && (
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) router.push("/login");
        else setUser(JSON.parse(userData));
        
        // Set default date and time
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        setReserveDate(tomorrow.toISOString().split('T')[0]);
        setReserveTime("19:00");
    }, [router]);

    const toggleItem = (item) => {
        setSelectedItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) return prev.filter((i) => i.id !== item.id);
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (itemId, delta) => {
        setSelectedItems((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Reserve Dishes
    const handleReserve = async () => {
        if (selectedItems.length === 0) {
            setReserveError("Please select at least one dish to reserve.");
            setReserveSuccess(false);
            return;
        }
        if (!reserveDate || !reserveTime) {
            setReserveError("Please select a date and time for your reservation.");
            setReserveSuccess(false);
            return;
        }
        if (!user || !user.id || !user.name) {
            setReserveError("User information missing.");
            return;
        }

        setIsSubmitting(true);
        setReserveError("");

        try {
            const res = await fetch("/api/kitchen/dishes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user.id,
                    username: user.name,
                    reserve_date: reserveDate,
                    reserve_time: reserveTime,
                    note: reserveNote,
                    items: selectedItems.map((item) => ({
                        item_name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                }),
            });

            if (res.ok) {
                const reservationData = {
                    id: Date.now(),
                    date: new Date(reserveDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                    time: reserveTime,
                    items: [...selectedItems],
                    total: totalPrice,
                    note: reserveNote,
                    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                };
                
                setLastReservation(reservationData);
                setReserveSuccess(true);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    setReserveSuccess(false);
                    setSelectedItems([]);
                    setReserveNote("");
                }, 8000);
            } else {
                const data = await res.json();
                setReserveError(`Failed: ${data.message || "Please try again"}`);
                setReserveSuccess(false);
            }
        } catch (err) {
            console.error(err);
            setReserveError("An error occurred while reserving dishes. Please check your connection.");
            setReserveSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90" />
                
                {/* Animated particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400/20 rounded-full"
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.sin(i) * 50, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Navigation Header */}
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl border-b border-amber-500/20 px-6 py-4 sticky top-0 z-50"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05, x: -3 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push("/dashboard")}
                                className="flex items-center space-x-3 text-amber-300 hover:text-amber-200 transition-colors group"
                            >
                                <div className="p-2 bg-gradient-to-br from-amber-900/50 to-amber-800/30 rounded-lg group-hover:from-amber-800/60 group-hover:to-amber-700/40 transition-all duration-300">
                                    <FaArrowLeft className="text-lg" />
                                </div>
                                <span className="font-medium font-serif hidden md:inline">Back to Dashboard</span>
                            </motion.button>
                            
                            <div className="h-8 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
                            
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-amber-800 to-amber-900 rounded-xl shadow-lg">
                                    <FaUtensils className="text-amber-200 text-xl" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-serif font-bold text-white tracking-wider">MENU SELECTION</h1>
                                    <p className="text-amber-300/70 text-xs font-light tracking-wider">RESERVE YOUR DINING EXPERIENCE</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-3 bg-black/30 rounded-xl px-4 py-2 border border-amber-500/20">
                                <FaUser className="text-amber-400" />
                                <div className="text-right">
                                    <p className="text-sm font-medium text-white font-serif">{user.name?.split(' ')[0] || "Guest"}</p>
                                    <p className="text-xs text-amber-300/60 font-light tracking-wider">DINING RESERVATION</p>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="flex items-center space-x-2 bg-black/30 rounded-xl px-4 py-3 border border-amber-500/20">
                                    <FaShoppingCart className="text-amber-400" />
                                    <span className="text-white font-medium font-serif">{selectedItems.length}</span>
                                </div>
                                {selectedItems.length > 0 && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg">
                                        <span className="text-xs font-bold text-white">{selectedItems.length}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.nav>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <AnimatePresence mode="wait">
                        {reserveSuccess && lastReservation ? (
                            // Success Screen
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="min-h-[80vh] flex items-center justify-center"
                            >
                                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-8 w-full max-w-2xl shadow-2xl">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-24 h-24 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-emerald-500/30"
                                    >
                                        <FaCheck className="text-3xl text-emerald-200" />
                                    </motion.div>
                                    
                                    <div className="text-center mb-8">
                                        <h1 className="text-4xl font-serif font-bold text-white mb-2">Reservation Confirmed!</h1>
                                        <p className="text-amber-300/80 font-light tracking-wider">Your culinary journey begins soon</p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-lg rounded-xl border border-amber-500/20 p-6 mb-6">
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-500/10">
                                            <div className="text-left">
                                                <p className="text-amber-300/70 text-sm font-light tracking-wider mb-1">RESERVATION #</p>
                                                <p className="text-2xl font-bold text-white font-mono">#{lastReservation.id.toString().slice(-6)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-amber-300/70 text-sm font-light tracking-wider mb-1">FOR</p>
                                                <p className="text-xl font-bold text-white font-serif">{lastReservation.date}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4 mb-6">
                                            {lastReservation.items.map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className="relative">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                className="w-16 h-16 object-cover rounded-lg shadow-lg"
                                                            />
                                                            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full p-1.5 shadow-lg">
                                                                <span className="text-xs text-white font-bold">{item.quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white group-hover:text-amber-300 transition-colors duration-300 font-serif">{item.name}</p>
                                                            <p className="text-sm text-amber-300/60 font-light">{formatCurrency(item.price)} each</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-lg font-bold text-emerald-400">{formatCurrency(item.price * item.quantity)}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                        
                                        {lastReservation.note && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mb-6 p-4 bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg border border-amber-500/20"
                                            >
                                                <p className="text-amber-400 font-medium mb-1 flex items-center">
                                                    <FaInfoCircle className="mr-2" /> Special Instructions
                                                </p>
                                                <p className="text-amber-300/80 text-sm">{lastReservation.note}</p>
                                            </motion.div>
                                        )}
                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                                            <div>
                                                <p className="text-amber-300/70 text-sm font-light tracking-wider">TOTAL AMOUNT</p>
                                                <p className="text-3xl font-bold text-emerald-400 font-serif">{formatCurrency(lastReservation.total)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-amber-300/70 text-sm font-light tracking-wider">READY AT</p>
                                                <p className="text-xl font-bold text-white font-mono">{lastReservation.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                                        <p className="text-emerald-300 font-semibold mb-2 flex items-center">
                                            <span className="mr-2">✨</span> What to Expect Next
                                        </p>
                                        <ul className="text-sm text-emerald-300/80 space-y-1">
                                            <li className="flex items-center">
                                                <span className="mr-2">⏰</span> Your dishes will be prepared for {lastReservation.time}
                                            </li>
                                            <li className="flex items-center">
                                                <span className="mr-2">🍽️</span> Ready for pickup at our counter
                                            </li>
                                            <li className="flex items-center">
                                                <span className="mr-2">📱</span> You'll receive a confirmation SMS
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setReserveSuccess(false);
                                                setSelectedItems([]);
                                            }}
                                            className="py-4 rounded-xl font-semibold bg-gradient-to-r from-amber-700 to-amber-900 text-white hover:from-amber-600 hover:to-amber-800 shadow-lg transition-all duration-300 border border-amber-500/30 backdrop-blur-sm"
                                        >
                                            Order More Dishes
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => router.push("/dashboard")}
                                            className="py-4 rounded-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:text-white hover:from-gray-700 hover:to-gray-800 border border-amber-500/20 transition-all duration-300 backdrop-blur-sm"
                                        >
                                            Return to Dashboard
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            // Main Order Screen
                            <motion.div
                                key="main"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {/* Header Section */}
                                <div className="mb-8">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                                        <div>
                                            <h2 className="text-4xl font-serif font-bold text-white mb-2">
                                                Select Your <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Dishes</span>
                                            </h2>
                                            <p className="text-amber-300/80 font-light tracking-wider">Craft your perfect dining experience</p>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <div className="flex items-center space-x-2 text-amber-400">
                                                <FaCalendarAlt />
                                                <span className="text-sm tracking-wider">RESERVE FOR LATER</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="relative mb-6">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                            <FaSearch className="text-amber-400/70" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search dishes, ingredients, or categories..."
                                            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-amber-500/30 rounded-xl text-white placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 backdrop-blur-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    {/* Category Filters */}
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium text-white flex items-center">
                                                <FaFilter className="mr-2 text-amber-400" />
                                                Categories
                                            </h3>
                                            <span className="text-sm text-amber-300/60">{filteredMenu.length} items</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {Object.entries(menuCategories).map(([key, { label, icon, color }]) => (
                                                <motion.button
                                                    key={key}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setActiveCategory(key)}
                                                    className={`flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                                                        activeCategory === key
                                                            ? `bg-gradient-to-br ${color} text-white border-transparent shadow-lg`
                                                            : "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600"
                                                    }`}
                                                >
                                                    <span className="text-xl">{icon}</span>
                                                    <span className="font-medium">{label}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Menu Items */}
                                    <div className="lg:col-span-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {filteredMenu.map((item) => {
                                                const isSelected = selectedItems.find(i => i.id === item.id);
                                                return (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        whileHover={{ y: -5, scale: 1.02 }}
                                                        className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 group ${
                                                            isSelected 
                                                                ? "border-amber-500 shadow-lg shadow-amber-500/20" 
                                                                : "border-gray-700 hover:border-amber-500/50"
                                                        }`}
                                                        onClick={() => toggleItem(item)}
                                                    >
                                                        <div className="relative h-48 overflow-hidden">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                                                            
                                                            {item.popular && (
                                                                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-amber-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                                    <FaStar className="mr-1" /> POPULAR
                                                                </div>
                                                            )}
                                                            
                                                            {item.spicy && (
                                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                                                                    <FaFire className="mr-1" /> SPICY
                                                                </div>
                                                            )}
                                                            
                                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                                                <span className="text-xl font-bold text-white font-serif">{item.name}</span>
                                                                <span className="text-lg font-bold text-amber-400">{formatCurrency(item.price)}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="p-4">
                                                            <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                                                            
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                                        item.category === 'mains' ? 'bg-red-500/20 text-red-300' :
                                                                        item.category === 'appetizers' ? 'bg-green-500/20 text-green-300' :
                                                                        item.category === 'desserts' ? 'bg-pink-500/20 text-pink-300' :
                                                                        item.category === 'drinks' ? 'bg-blue-500/20 text-blue-300' :
                                                                        'bg-lime-500/20 text-lime-300'
                                                                    }`}>
                                                                        {menuCategories[item.category]?.label}
                                                                    </span>
                                                                </div>
                                                                
                                                                {isSelected ? (
                                                                    <div className="flex items-center space-x-2 text-emerald-400">
                                                                        <FaCheck />
                                                                        <span className="text-sm font-medium">Selected</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center space-x-2 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                        <span>Add to order</span>
                                                                        <FaChevronRight className="text-sm" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Order Summary & Reservation */}
                                    <div className="space-y-6">
                                        {/* Order Summary */}
                                        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-serif font-bold text-white flex items-center">
                                                    <FaShoppingCart className="mr-2 text-amber-400" />
                                                    Your Order
                                                </h3>
                                                <span className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                    {selectedItems.length} items
                                                </span>
                                            </div>

                                            {selectedItems.length > 0 ? (
                                                <div className="space-y-4">
                                                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                                        {selectedItems.map((item) => (
                                                            <motion.div
                                                                key={item.id}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-lg border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300"
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="relative">
                                                                        <img 
                                                                            src={item.image} 
                                                                            alt={item.name} 
                                                                            className="w-12 h-12 object-cover rounded-lg"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-white text-sm">{item.name}</p>
                                                                        <p className="text-amber-400 font-bold text-xs">{formatCurrency(item.price)}</p>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg px-2 py-1 border border-amber-500/20">
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                                                                            className="w-6 h-6 bg-gradient-to-br from-amber-700 to-amber-900 text-white rounded-full flex items-center justify-center hover:from-amber-600 hover:to-amber-800 transition-all duration-300"
                                                                        >
                                                                            <FaMinus className="text-xs" />
                                                                        </motion.button>
                                                                        <span className="font-bold text-white min-w-6 text-center">{item.quantity}</span>
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                                                                            className="w-6 h-6 bg-gradient-to-br from-amber-700 to-amber-900 text-white rounded-full flex items-center justify-center hover:from-amber-600 hover:to-amber-800 transition-all duration-300"
                                                                        >
                                                                            <FaPlus className="text-xs" />
                                                                        </motion.button>
                                                                    </div>
                                                                    <div className="text-right min-w-20">
                                                                        <p className="font-bold text-emerald-400">{formatCurrency(item.price * item.quantity)}</p>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="pt-4 border-t border-amber-500/20">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-gray-300 font-medium">Subtotal</span>
                                                            <span className="text-lg font-bold text-white">{formatCurrency(totalPrice)}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-gray-300 font-medium">Tax & Service</span>
                                                            <span className="text-sm text-amber-400">Included</span>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-500/20">
                                                            <span className="text-xl font-bold text-white font-serif">Total</span>
                                                            <span className="text-2xl font-bold text-emerald-400 font-serif">{formatCurrency(totalPrice)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                                                        <span className="text-2xl text-amber-400">🛒</span>
                                                    </div>
                                                    <p className="text-gray-400 font-medium">Your selection is empty</p>
                                                    <p className="text-gray-500 text-sm mt-1">Choose dishes from the menu</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Reservation Form */}
                                        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6">
                                            <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center">
                                                <FaCalendarAlt className="mr-2 text-amber-400" />
                                                Pickup Details
                                            </h3>
                                            
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-amber-300/80 text-sm font-medium mb-2">Pickup Date</label>
                                                        <input 
                                                            type="date" 
                                                            value={reserveDate} 
                                                            onChange={(e) => setReserveDate(e.target.value)} 
                                                            className="w-full bg-gray-900/50 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                                            min={new Date().toISOString().split('T')[0]}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-amber-300/80 text-sm font-medium mb-2">Pickup Time</label>
                                                        <input 
                                                            type="time" 
                                                            value={reserveTime} 
                                                            onChange={(e) => setReserveTime(e.target.value)} 
                                                            className="w-full bg-gray-900/50 border border-amber-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-amber-300/80 text-sm font-medium mb-2">Special Instructions (Optional)</label>
                                                    <textarea 
                                                        value={reserveNote} 
                                                        onChange={(e) => setReserveNote(e.target.value)} 
                                                        placeholder="Allergies, dietary restrictions, or special requests..."
                                                        className="w-full bg-gray-900/50 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 resize-none h-24"
                                                    />
                                                </div>

                                                {reserveError && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="p-3 bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-center"
                                                    >
                                                        <span className="mr-2">⚠️</span> {reserveError}
                                                    </motion.div>
                                                )}

                                                <motion.button 
                                                    whileHover={{ scale: selectedItems.length > 0 ? 1.02 : 1 }}
                                                    whileTap={{ scale: selectedItems.length > 0 ? 0.98 : 1 }}
                                                    onClick={handleReserve}
                                                    disabled={isSubmitting || selectedItems.length === 0}
                                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm ${
                                                        selectedItems.length > 0 && !isSubmitting
                                                            ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-white hover:from-amber-600 hover:to-amber-800 shadow-lg hover:shadow-amber-500/30 border border-amber-500/30'
                                                            : 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 border border-gray-700 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center justify-center">
                                                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                                                            Processing Order...
                                                        </span>
                                                    ) : (
                                                        `Reserve Order - ${formatCurrency(totalPrice)}`
                                                    )}
                                                </motion.button>
                                                
                                                <p className="text-center text-amber-300/50 text-xs mt-2">
                                                    Your order will be prepared for the selected pickup time
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}