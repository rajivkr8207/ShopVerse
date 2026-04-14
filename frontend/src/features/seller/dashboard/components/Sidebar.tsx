import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, X, Layers } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { isOpen, close } = useSelector((state: any) => state.sidebar);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={close}
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
                style={{ backgroundColor: "var(--secondary)" }}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-white font-semibold">Seller Panel</h2>
                    <button onClick={close} className="lg:hidden">
                        <X size={20} color="white" />
                    </button>
                </div>

                <nav className="p-4 flex flex-col gap-3">
                    <NavLink to="/seller/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>

                    <NavLink to="/seller/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={18} /> Categories
                    </NavLink>

                    <NavLink to="/seller/products" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Package size={18} /> Products
                    </NavLink>

                    <NavLink to="/seller/variants" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Layers size={18} /> Variants
                    </NavLink>

                    <NavLink to="/seller/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <ShoppingCart size={18} /> Orders
                    </NavLink>
                </nav>
            </aside>

        </>
    );
};

export default Sidebar;