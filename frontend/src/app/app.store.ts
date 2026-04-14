import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import cartReducer from '../features/buyer/dashboard/cart.slice'
import sidebarReducer from '../features/seller/dashboard/sidebar.slice'
import categoryReducer from '../features/seller/dashboard/category.slice'
import productReducer from '../features/seller/dashboard/product.slice'
import productVariantReducer from '../features/seller/dashboard/productVariant.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
    category: categoryReducer,
    product: productReducer,
    productVariant: productVariantReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch