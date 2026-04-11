import { useSelector } from "react-redux";
import Navbar from "../components/Navbar"
import type { IUser } from "../../../auth/types/auth.type";
import type { RootState } from "../../../../app/app.store";
import useAuth from "../../../auth/hooks/useAuth";
import { useEffect } from "react";
import ProductGrid from "../components/ProductGrid";

const Dashboard = () => {
    const { handleGetProfile } = useAuth()
    const user = useSelector((state: RootState) => state.auth.user) as IUser | null;
    useEffect(() => {
        if (!user) {
            handleGetProfile()
        }
    }, [])
    return (
        <>
            <div style={{ backgroundColor: "var(--neutral)" }} className="min-h-screen">
                <Navbar />
                <div className="p-6">
                    <h1 className="text-white text-xl mb-4">Explore Products</h1>
                    <ProductGrid />
                </div>
            </div>
        </>
    )
}

export default Dashboard