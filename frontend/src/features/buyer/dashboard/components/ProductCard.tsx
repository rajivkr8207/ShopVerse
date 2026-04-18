import React from "react";
import { useNavigate } from "react-router-dom";

type ProductProps = {
    id: string;
    title: string;
    price: number;
    image: string;
    onAddToCart: (e: React.MouseEvent) => void;
};

const ProductCard: React.FC<ProductProps> = ({
    id,
    title,
    price,
    image,
    onAddToCart,
}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/products/${id}`)}
            className="rounded-3xl p-4 shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer group border border-neutral-900 hover:border-blue-500/50"
            style={{ backgroundColor: "#111" }}
        >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-neutral-900">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">View Details</span>
                </div>
            </div>

            <div className="space-y-1 px-1">
                <h3 className="text-neutral-400 text-xs font-medium uppercase tracking-wider">{title}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-white">₹{price}</p>
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(e);
                }}
                className="mt-4 w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 hover:brightness-110"
                style={{
                    backgroundColor: "var(--primary)",
                    color: "#000",
                }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;