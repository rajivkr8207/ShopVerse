import React from "react";
import { ShoppingCart, Bell, User, Search } from "lucide-react";
import { useSelector } from "react-redux";
import type { IUser } from "../../../auth/types/auth.type";
import type { RootState } from "../../../../app/app.store";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth.user) as IUser | null;
    const { totalQuantity } = useCart();

    return (
        <nav
            className="w-full flex items-center justify-between px-6 py-3 sticky top-0 z-50"
            style={{ backgroundColor: "var(--neutral)", backdropFilter: "blur(10px)" }}
        >
            {/* LEFT - SEARCH */}
            <div className="flex items-center gap-6 w-[40%]">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <h1 className="text-2xl font-bold">Stinch</h1>
                </div>
                <div className="relative w-full">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        size={18}
                        style={{ color: "var(--primary)" }}
                    />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl outline-none text-sm transition-all focus:ring-1 focus:ring-blue-500"
                        style={{
                            backgroundColor: "var(--secondary)",
                            color: "white",
                        }}
                    />
                </div>
            </div>

            {/* RIGHT - ICONS */}
            <div className="flex items-center gap-6">
                {/* Cart */}
                <button
                    onClick={() => navigate('/cart')}
                    className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                    <ShoppingCart
                        size={22}
                        style={{ color: "var(--primary)" }}
                    />
                    {totalQuantity > 0 && (
                        <span
                            className="absolute top-0 right-0 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full"
                            style={{ backgroundColor: "var(--tertiary)", color: "white" }}
                        >
                            {totalQuantity}
                        </span>
                    )}
                </button>

                {/* Notification */}
                <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                    <Bell size={22} style={{ color: "var(--primary)" }} />
                    <span
                        className="absolute top-0 right-0 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full"
                        style={{ backgroundColor: "var(--tertiary)", color: "white" }}
                    >
                        5
                    </span>
                </button>

                {/* Profile */}
                <button onClick={() => navigate('/profile')} className="flex items-center gap-2 p-1 hover:bg-white/5 rounded-full transition-colors">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600/20"
                    >
                        <User size={18} className="text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-white hidden md:block">
                        {user?.fullname.split(' ')[0]}
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;