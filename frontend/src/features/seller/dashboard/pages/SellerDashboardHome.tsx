import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/app.store";
import { Package, Tag, Layers } from "lucide-react";
import useCategory from "../hooks/useCategory";
import useProduct from "../hooks/useProduct";
import useVariant from "../hooks/useVariant";

const SellerDashboardHome = () => {
    const { products } = useSelector((state: RootState) => state.product);
    const { categories } = useSelector((state: RootState) => state.category);
    const { variants } = useSelector((state: RootState) => state.productVariant);
    
    const { handleGetAllCategories } = useCategory();
    const { handleGetAllProducts } = useProduct();
    const { handleGetAllVariants } = useVariant();

    useEffect(() => {
        handleGetAllProducts();
        handleGetAllCategories();
        handleGetAllVariants();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-neutral-700 flex items-center gap-4 bg-neutral-800/50" style={{ backgroundColor: "var(--secondary)" }}>
                    <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
                        <Package size={32} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Total Products</p>
                        <h2 className="text-2xl font-bold">{products.length}</h2>
                    </div>
                </div>

                <div className="p-6 rounded-xl border border-neutral-700 flex items-center gap-4 bg-neutral-800/50" style={{ backgroundColor: "var(--secondary)" }}>
                    <div className="p-4 rounded-full bg-green-500/10 text-green-400">
                        <Tag size={32} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Categories</p>
                        <h2 className="text-2xl font-bold">{categories.length}</h2>
                    </div>
                </div>

                <div className="p-6 rounded-xl border border-neutral-700 flex items-center gap-4 bg-neutral-800/50" style={{ backgroundColor: "var(--secondary)" }}>
                    <div className="p-4 rounded-full bg-purple-500/10 text-purple-400">
                        <Layers size={32} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Product Variants</p>
                        <h2 className="text-2xl font-bold">{variants.length}</h2>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                <div className="p-6 rounded-xl border border-neutral-700 bg-neutral-800/20 text-gray-400">
                    No recent activity yet. Start by adding some awesome products!
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardHome;
