import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../sidebar.slice";

const SellerLayout = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "var(--neutral)" }}>
            <Sidebar />

            <div className="flex-1 lg:ml-64">
                <div className="lg:hidden p-4 flex items-center">
                    <button onClick={() => dispatch(toggleSidebar())}>
                        <Menu size={24} color="white" />
                    </button>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;