import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/app.store";
import { addItemToCart, removeItemFromCart, updateItemQuantity, syncCart } from "../cart.slice";
import { toast } from "react-toastify";

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart);

    const handleAddToCart = async (productId: string, variantId?: string, quantity: number = 1) => {
        try {
            await dispatch(addItemToCart({ productId, variantId, quantity })).unwrap();
            toast.success("Added to cart");
        } catch (error: any) {
            toast.error(error || "Failed to add to cart");
        }
    };

    const handleRemoveFromCart = async (cartId: string) => {
        try {
            await dispatch(removeItemFromCart(cartId)).unwrap();
            toast.success("Removed from cart");
        } catch (error: any) {
            toast.error(error || "Failed to remove item");
        }
    };

    const handleUpdateQuantity = async (cartId: string, quantity: number) => {
        try {
            await dispatch(updateItemQuantity({ cartId, quantity })).unwrap();
        } catch (error: any) {
            toast.error(error || "Failed to update quantity");
        }
    };

    const handleSyncCart = () => {
        dispatch(syncCart());
    };

    return {
        items,
        loading,
        totalQuantity,
        totalAmount,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleSyncCart,
    };
};
