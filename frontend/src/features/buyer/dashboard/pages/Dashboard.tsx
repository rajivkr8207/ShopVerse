import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar"
import type { IUser } from "../../../auth/types/auth.type";
import type { RootState, AppDispatch } from "../../../../app/app.store";
import useAuth from "../../../auth/hooks/useAuth";
import { useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import { fetchProducts } from "../../../seller/dashboard/product.slice";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { handleGetProfile } = useAuth()
    const user = useSelector((state: RootState) => state.auth.user) as IUser | null;
    useEffect(() => {
        if (!user) {
            handleGetProfile()
        }
        dispatch(fetchProducts())
    }, [dispatch, user, handleGetProfile])
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