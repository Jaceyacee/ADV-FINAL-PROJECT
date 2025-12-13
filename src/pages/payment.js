import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function PaymentPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [paymentError, setPaymentError] = useState("");
    const [processingPayment, setProcessingPayment] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");

    const paymentMethods = [
        { id: "cash", name: "Cash", icon: "💰", color: "from-gray-700 to-gray-800" },
        { id: "credit_card", name: "Credit Card", icon: "💳", color: "from-gray-700 to-gray-800" },
        { id: "gcash", name: "GCash", icon: "📱", color: "from-gray-700 to-gray-800" },
        { id: "paypal", name: "PayPal", icon: "🌐", color: "from-gray-700 to-gray-800" },
        { id: "bank_transfer", name: "Bank Transfer", icon: "🏦", color: "from-gray-700 to-gray-800" }
    ];

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        const u = JSON.parse(userData);
        setUser(u);
        loadReservations(u.id);
    }, []);

    const loadReservations = async (user_id) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/kitchen/reservations?user_id=${user_id}`);
            if (!res.ok) {
                throw new Error(`Failed to load reservations: ${res.status}`);
            }
            const data = await res.json();
            setReservations(data);
        } catch (err) {
            console.error("Failed to load reservations:", err);
            setPaymentError("Failed to load reservations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (reservation) => {
        setProcessingPayment(reservation.reservation_id);
        setPaymentError("");
        setPaymentSuccess(null);

        try {
            const total = reservation.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            // Simple payment data without payment_details
            const paymentData = {
                username: user.name,
                user_id: user.id,
                amount: total,
                method: paymentMethod,
                reservation_id: reservation.reservation_id,
                payment_details: {} // Empty object to match API expectations
            };

            console.log("Sending payment data:", paymentData);

            const response = await fetch("/api/payment/process", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();
            console.log("Payment response:", result);

            if (response.ok && result.success) {
                setPaymentSuccess({
                    message: result.message,
                    payment_id: result.payment_id,
                    transaction_id: result.transaction_id,
                    amount: total,
                    method: paymentMethod
                });
                
                setReservations(prev =>
                    prev.filter(r => r.reservation_id !== reservation.reservation_id)
                );
            } else {
                setPaymentError(result.message || `Payment failed. Status: ${response.status}`);
            }
        } catch (err) {
            console.error("Payment error:", err);
            setPaymentError("Network error. Please check your connection and try again.");
        } finally {
            setProcessingPayment(null);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-400 border-t-transparent"></div>
                <p className="mt-4 text-gray-300 font-medium">Loading reservations...</p>
            </div>
        </div>
    );
    
    if (!user) return null;

    return (
        <div className="min-h-screen bg-black">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>
            
            <div className="min-h-screen px-4 py-8 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Complete Your Payment
                        </h1>
                        <p className="text-gray-400 text-lg">Settle your dining experience</p>
                        
                        <div className="inline-flex items-center gap-4 mt-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-800">
                            <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-400">Welcome back</p>
                                <p className="font-semibold text-white text-lg">{user.name}</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Reservations */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-gray-800"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Your Reservations</h2>
                                        <p className="text-gray-400 mt-1">All pending payments</p>
                                    </div>
                                    {reservations.length > 0 && (
                                        <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-700">
                                            {reservations.length} pending
                                        </div>
                                    )}
                                </div>

                                {reservations.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-full flex items-center justify-center">
                                            <span className="text-4xl text-gray-400">✨</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">All Paid Up!</h3>
                                        <p className="text-gray-400">No pending payments to process</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4">
                                        {reservations.map((reservation) => {
                                            const total = reservation.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
                                            
                                            return (
                                                <motion.div
                                                    key={reservation.reservation_id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                                                >
                                                    <div className="p-6">
                                                        {/* Reservation Header */}
                                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-2 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                                                                    <h3 className="text-xl font-bold text-white">
                                                                        Reservation #{reservation.reservation_id}
                                                                    </h3>
                                                                </div>
                                                                <div className="flex items-center gap-4 text-gray-400">
                                                                    <span className="flex items-center gap-2">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                        </svg>
                                                                        {reservation.reserve_date}
                                                                    </span>
                                                                    <span className="flex items-center gap-2">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        {reservation.reserve_time}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                Pending
                                                            </div>
                                                        </div>

                                                        {/* Order Items */}
                                                        <div className="space-y-3 mb-6">
                                                            {reservation.items.map((item, index) => (
                                                                <div
                                                                    key={`${item.item_name}-${index}`}
                                                                    className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors"
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                                                                            <span className="text-gray-300 font-medium">×{item.quantity}</span>
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-medium text-white">{item.item_name}</p>
                                                                            <p className="text-sm text-gray-400">{formatCurrency(item.price)} each</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="font-bold text-white">
                                                                        {formatCurrency(item.price * item.quantity)}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Payment Action */}
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-800">
                                                            <div>
                                                                <p className="text-sm text-gray-400">Total Amount</p>
                                                                <p className="text-2xl font-bold text-white">
                                                                    {formatCurrency(total)}
                                                                </p>
                                                            </div>

                                                            <button
                                                                onClick={() => handlePayment(reservation)}
                                                                disabled={processingPayment === reservation.reservation_id}
                                                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 min-w-[160px]
                                                                    ${processingPayment === reservation.reservation_id 
                                                                        ? 'bg-gray-700 cursor-not-allowed' 
                                                                        : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg active:scale-95 border border-gray-700'
                                                                    } text-white shadow-md`}
                                                            >
                                                                {processingPayment === reservation.reservation_id ? (
                                                                    <>
                                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                                        Processing...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                        </svg>
                                                                        Pay Now
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column - Payment Method & Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-8"
                        >
                            {/* Payment Method Selection */}
                            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-gray-800">
                                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                                
                                <div className="grid grid-cols-3 gap-3 mb-8">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center text-center border
                                                ${paymentMethod === method.id 
                                                ? `bg-gradient-to-r ${method.color} text-white shadow-lg transform scale-105 border-gray-600` 
                                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white border-gray-700'
                                                }`}
                                        >
                                            <span className="text-2xl mb-2">{method.icon}</span>
                                            <span className="font-medium text-sm">{method.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Selected Method Display */}
                                <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                                            <span className="text-xl">
                                                {paymentMethods.find(m => m.id === paymentMethod)?.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">
                                                {paymentMethods.find(m => m.id === paymentMethod)?.name}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {paymentMethod === "cash" ? "Pay when you dine" : 
                                                 paymentMethod === "credit_card" ? "Secure card payment" :
                                                 paymentMethod === "gcash" ? "Mobile wallet payment" :
                                                 paymentMethod === "paypal" ? "Online payment" : "Bank transfer"}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Simple Instructions based on method */}
                                    {paymentMethod === "cash" && (
                                        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                                            <p className="text-sm text-gray-300">
                                                Please prepare exact change for payment at the counter.
                                            </p>
                                        </div>
                                    )}
                                    
                                    {paymentMethod === "credit_card" && (
                                        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                                            <p className="text-sm text-gray-300">
                                                Credit card details will be collected at the counter.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-6 border border-gray-800">
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span className="font-medium text-white">
                                            {formatCurrency(reservations.reduce((sum, r) => 
                                                sum + r.items.reduce((s, i) => s + i.price * i.quantity, 0), 0
                                            ))}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Service Fee</span>
                                        <span className="font-medium text-white">{formatCurrency(0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Tax</span>
                                        <span className="font-medium text-white">{formatCurrency(0)}</span>
                                    </div>
                                    <div className="border-t border-gray-800 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-white">Total</span>
                                            <span className="text-3xl font-bold text-gray-100">
                                                {formatCurrency(reservations.reduce((sum, r) => 
                                                    sum + r.items.reduce((s, i) => s + i.price * i.quantity, 0), 0
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-300">
                                                Your payment secures the reservation. Please settle within 15 minutes of receiving your order.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Messages Area */}
                    <div className="mt-8">
                        {/* SUCCESS MESSAGE */}
                        {paymentSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4"
                            >
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white text-lg mb-2">{paymentSuccess.message}</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                                    <p className="text-sm text-gray-400">Transaction ID</p>
                                                    <p className="font-semibold text-white">{paymentSuccess.transaction_id}</p>
                                                </div>
                                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                                    <p className="text-sm text-gray-400">Amount Paid</p>
                                                    <p className="font-semibold text-white">{formatCurrency(paymentSuccess.amount)}</p>
                                                </div>
                                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                                    <p className="text-sm text-gray-400">Payment Method</p>
                                                    <p className="font-semibold text-white">
                                                        {paymentMethods.find(m => m.id === paymentSuccess.method)?.name}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                                    <p className="text-sm text-gray-400">Payment ID</p>
                                                    <p className="font-semibold text-white">{paymentSuccess.payment_id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ERROR MESSAGE */}
                        {paymentError && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4"
                            >
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-red-900/50 rounded-3xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-red-900/50">
                                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">Payment Failed</p>
                                            <p className="text-red-400 mt-1">{paymentError}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Back Button */}
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 border border-gray-700 hover:shadow-lg hover:border-gray-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}