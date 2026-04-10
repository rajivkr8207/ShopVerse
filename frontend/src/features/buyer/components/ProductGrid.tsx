import React from "react";
import ProductCard from "./ProductCard";

const dummyProducts = [
    {
        id: 1,
        title: "T-Shirt",
        price: 499,
        image: "https://via.placeholder.com/200",
    },
    {
        id: 2,
        title: "Shoes",
        price: 1999,
        image: "https://via.placeholder.com/200",
    },
];

const ProductGrid = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dummyProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    onAddToCart={() => console.log("Added", product.id)}
                />
            ))}
        </div>
    );
};

export default ProductGrid;