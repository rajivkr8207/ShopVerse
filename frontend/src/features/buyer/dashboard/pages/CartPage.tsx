import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { ShoppingBag, ArrowLeft, CreditCard, ChevronRight } from "lucide-react";

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, loading, totalAmount, totalQuantity, handleUpdateQuantity, handleRemoveFromCart } = useCart();

    const shipping = totalAmount > 2000 ? 0 : 150;
    const tax = totalAmount * 0.18; // 18% GST estimate
    const grandTotal = totalAmount + shipping + tax;

    if (loading && items.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-950 text-white">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-400 animate-pulse">Loading your cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 mt-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-neutral-400 hover:text-white transition group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Continue Shopping</span>
                    </button>
                    <h1 className="text-3xl font-bold">Your Bag <span className="text-neutral-500 font-normal">({totalQuantity})</span></h1>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/30 rounded-[40px] border border-neutral-800 border-dashed">
                        <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag size={40} className="text-neutral-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Your Bag is Empty</h2>
                        <p className="text-neutral-400 mb-8 text-center max-w-xs">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-blue-900/20"
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemove={handleRemoveFromCart}
                                />
                            ))}
                        </div>

                        {/* Summary Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900/80 backdrop-blur-xl rounded-[40px] border border-neutral-800 p-8 sticky top-24 shadow-2xl">
                                <h3 className="text-xl font-bold mb-8">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-medium">₹{totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-green-500 font-medium" : "text-white font-medium"}>
                                            {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>Estimated Tax (18%)</span>
                                        <span className="text-white font-medium">₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-neutral-800 my-2"></div>
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-500">₹{grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => alert("Checkout integration coming soon!")}
                                    className="w-full bg-white text-black font-bold py-5 rounded-[20px] flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all transform active:scale-[0.98] mb-4"
                                >
                                    <CreditCard size={20} />
                                    Checkout Now
                                </button>

                                <div className="flex items-center justify-center gap-2 text-neutral-500 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Secure Checkout
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mt-6 p-6 bg-neutral-900/30 rounded-[30px] border border-neutral-800/50 flex items-center justify-between group cursor-pointer hover:border-neutral-700 transition-all">
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <span className="text-sm font-medium">Apply Promo Code</span>
                                </div>
                                <ChevronRight size={18} className="text-neutral-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CartPage;
