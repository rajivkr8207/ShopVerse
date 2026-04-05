"use client";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { 
  fetchProducts, 
  setFilters, 
  clearFilters, 
  selectProduct 
} from "../marketplaceSlice";

/**
 * useMarketplace Hook
 * Provides refined access to product state, filtering logic, and asynchronous fetching.
 */
export const useMarketplace = () => {
  const dispatch = useDispatch();
  const { products, selectedProduct, loading, error, filters } = useSelector((state) => state.marketplace);

  const getProducts = useCallback((params) => {
    return dispatch(fetchProducts(params));
  }, [dispatch]);

  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const setActiveProduct = useCallback((product) => {
    dispatch(selectProduct(product));
  }, [dispatch]);

  // Client-side filtering logic for immediate feedback
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === "All" || p.category === filters.category;
      const matchPrice = p.price <= filters.maxPrice;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, filters]);

  return {
    products,
    filteredProducts,
    selectedProduct,
    loading,
    error,
    filters,
    getProducts,
    updateFilters,
    resetFilters,
    setActiveProduct
  };
};
