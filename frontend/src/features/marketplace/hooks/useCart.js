"use client";

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { addItem, removeItem, updateQuantity, clearCart } from "../cartSlice";
import { toast } from "react-toastify";
import { ShoppingBag } from "lucide-react";

/**
 * useCart Hook
 * Centralized interface for managing the shopping cart state and user feedback.
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);

  const addToCart = useCallback((product) => {
    dispatch(addItem(product));
    toast.success(`${product.name} added to cart!`, {
      icon: <ShoppingBag size={18} className="text-white" />,
      className: "bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20",
    });
  }, [dispatch]);

  const removeFromCart = useCallback((id) => {
    dispatch(removeItem(id));
  }, [dispatch]);

  const setQuantity = useCallback((id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const resetCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    items,
    totalAmount,
    totalQuantity,
    addToCart,
    removeFromCart,
    setQuantity,
    resetCart
  };
};
