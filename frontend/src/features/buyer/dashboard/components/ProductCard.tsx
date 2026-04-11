import React from "react";

type ProductProps = {
    title: string;
    price: number;
    image: string;
    onAddToCart: () => void;
};

const ProductCard: React.FC<ProductProps> = ({
    title,
    price,
    image,
    onAddToCart,
}) => {
    return (
        <div
            className="rounded-2xl p-4 shadow-md hover:scale-105 transition"
            style={{ backgroundColor: "var(--secondary)" }}
        >
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-cover rounded-xl mb-3"
            />

            <h3 className="text-white text-sm font-medium">{title}</h3>
            <p className="text-lg font-semibold text-white">₹{price}</p>

            <button
                onClick={onAddToCart}
                className="mt-3 w-full py-2 rounded-xl text-sm font-medium"
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