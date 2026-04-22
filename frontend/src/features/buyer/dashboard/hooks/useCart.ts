import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/app.store";
import { setCart, setLoading, setError, setTotalQuantity, setTotalAmount } from "../cart.slice";
import { toast } from "react-toastify";
import { cartService } from "../services/cart.service";

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, totalQuantity, totalAmount, error } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        handleSyncCart();
    }, [dispatch]);

    const handleAddToCart = async (productId: string, variantId?: string, quantity: number = 1) => {
        try {
            dispatch(setLoading(true));
            const response = await cartService.addToCart({ productId, variantId, quantity });
            dispatch(setCart(response.data.data));
            dispatch(setTotalQuantity(response.data.data.reduce((acc: number, item: any) => acc + item.quantity, 0)));
            dispatch(setTotalAmount(response.data.data.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)));
            dispatch(setLoading(false));
            toast.success("Added to cart");
        } catch (error: any) {
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || "Failed to add to cart"));
            toast.error(error || "Failed to add to cart");
        }
    };

    const handleRemoveFromCart = async (cartId: string) => {
        try {
            dispatch(setLoading(true));
            const response = await cartService.removeFromCart(cartId);
            dispatch(setCart(response.data.data));
            dispatch(setTotalQuantity(response.data.data.reduce((acc: number, item: any) => acc + item.quantity, 0)));
            dispatch(setTotalAmount(response.data.data.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)));
            dispatch(setLoading(false));
            toast.success("Removed from cart");
        } catch (error: any) {
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || "Failed to remove item"));
            toast.error(error || "Failed to remove item");
        }
    };

    const handleUpdateQuantity = async (cartId: string, quantity: number) => {
        try {
            dispatch(setLoading(true));
            const response = await cartService.updateQuantity(cartId, quantity);
            dispatch(setCart(response.data.data));
            dispatch(setTotalQuantity(response.data.data.reduce((acc: number, item: any) => acc + item.quantity, 0)));
            dispatch(setTotalAmount(response.data.data.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)));
            dispatch(setLoading(false));
            toast.success("Quantity updated");
        } catch (error: any) {
            dispatch(setLoading(false));
            dispatch(setError(error.response?.data?.message || "Failed to update quantity"));
            toast.error(error || "Failed to update quantity");
        }
    };

    const handleSyncCart = async () => {
        dispatch(setLoading(true));
        const response = await cartService.getCart();
        dispatch(setCart(response.data.data));
        dispatch(setTotalQuantity(response.data.data.reduce((acc: number, item: any) => acc + item.quantity, 0)));
        dispatch(setTotalAmount(response.data.data.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)));
        dispatch(setLoading(false));
    };

    return {
        items,
        loading,
        totalQuantity,
        totalAmount,
        error,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleSyncCart,
    };
};

