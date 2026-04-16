import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/app.store";
import { useCart } from "../hooks/useCart";

const ProductGrid = () => {
    const { products, loading } = useSelector((state: RootState) => state.product);
    const { handleAddToCart } = useCart();

    if (loading && products.length === 0) {
        return <div className="text-white text-center py-20 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Searching for best deals...
        </div>;
    }

    if (products.length === 0) {
        return <div className="text-white text-center py-20 opacity-50">No products found in our collection.</div>;
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    id={product._id}
                    title={product.name}
                    price={product.basePrice ?? 0}
                    image={product.images?.[0]?.thumbnailUrl || "https://placehold.co/400x400/262626/white?text=No+Image"}
                    onAddToCart={() => handleAddToCart(product._id)}
                />
            ))}
        </div>
    );
};

export default ProductGrid;