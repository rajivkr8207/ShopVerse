import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import cartReducer from '../features/buyer/cart.slice'
import sidebarReducer from '../features/seller/sidebar.slice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch