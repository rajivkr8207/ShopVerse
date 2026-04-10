import React from "react";
import { ShoppingCart, Bell, User, Search } from "lucide-react";
import { useSelector } from "react-redux";
import type { AuthState, IUser } from "../../auth/types/auth.type";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const user = useSelector((state: AuthState) => state.auth.user) as IUser | null;
    return (
        <nav
            className="w-full flex items-center justify-between px-6 py-3"
            style={{ backgroundColor: "var(--neutral)" }}
        >
            {/* LEFT - SEARCH */}
            <div className="flex items-center gap-6 w-[40%]">
                <div>
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
                        className="w-full pl-10 pr-4 py-2 rounded-xl outline-none text-sm"
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
                <button className="relative">
                    <ShoppingCart
                        size={22}
                        style={{ color: "var(--primary)" }}
                    />
                    <span
                        className="absolute -top-2 -right-2 text-xs px-1 rounded-full"
                        style={{ backgroundColor: "var(--tertiary)", color: "white" }}
                    >
                        2
                    </span>
                </button>

                {/* Notification */}
                <button className="relative">
                    <Bell size={22} style={{ color: "var(--primary)" }} />
                    <span
                        className="absolute -top-2 -right-2 text-xs px-1 rounded-full"
                        style={{ backgroundColor: "var(--tertiary)", color: "white" }}
                    >
                        5
                    </span>
                </button>

                {/* Profile */}
                <button onClick={() => navigate('/profile')} className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--secondary)" }}
                    >
                        <User size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <span className="text-sm text-white hidden md:block">
                        {user?.fullname.split(' ')[0]}
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;