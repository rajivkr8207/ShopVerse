import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem as ICartItem } from "../types/cart.type";

interface CartItemProps {
    item: ICartItem;
    onUpdateQuantity: (cartId: string, quantity: number) => void;
    onRemove: (cartId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    const product = item.productId;
    const variant = item.variantId;
    const price = variant?.price || product.basePrice || 0;
    const image = variant?.images?.[0]?.thumbnailUrl || product.images?.[0]?.thumbnailUrl || "https://placehold.co/200x200/262626/white?text=No+Image";

    return (
        <div className="flex gap-6 p-6 bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-all group">
            {/* Image */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-neutral-800 flex-shrink-0">
                <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                            <p className="text-sm text-neutral-400 mt-1">
                                {variant ? `${variant.color} / ${variant.size}` : "Default Variant"}
                            </p>
                        </div>
                        <p className="text-xl font-bold text-white">₹{price * item.quantity}</p>
                    </div>
                </div>

                <div className="flex justify-between items-end mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl px-2 py-1 gap-4">
                        <button
                            onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-neutral-400 hover:text-white transition-colors"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                            className="p-1 text-neutral-400 hover:text-white transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    {/* Actions */}
                    <button
                        onClick={() => onRemove(item._id)}
                        className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
