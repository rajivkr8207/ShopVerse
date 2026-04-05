import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { marketplaceService } from "./services/marketplace.services";

// Initial mock products for the "Digital Obsidian" premium experience
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Obsidian Pro Monitor",
    category: "Electronics",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3fff?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    description: "Ultra-wide 5K Nano-IPS display with specialized obsidian coating for pure blacks."
  },
  {
    id: "2",
    name: "Nebula Mechanical Keyboard",
    category: "Accessories",
    price: 189.50,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    description: "Hot-swappable tactile switches with customizable RGB nebula underglow."
  },
  {
    id: "3",
    name: "Aether Wireless Mouse",
    category: "Accessories",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    description: "Lightweight aerospace-grade magnesium alloy chassis for ultimate precision."
  },
  {
    id: "4",
    name: "Zenith Studio Headphones",
    category: "Audio",
    price: 349.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    description: "High-fidelity spatial audio with active obsidian noise cancellation."
  }
];

export const fetchProducts = createAsyncThunk(
  "marketplace/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await marketplaceService.getProducts(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

const initialState = {
  products: MOCK_PRODUCTS,
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: "All",
    search: "",
    minPrice: 0,
    maxPrice: 1000
  }
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters, selectProduct } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
