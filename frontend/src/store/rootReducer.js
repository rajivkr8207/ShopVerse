import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import themeReducer from "./themeSlice";
import marketplaceReducer from "../features/marketplace/marketplaceSlice";
import cartReducer from "../features/marketplace/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  marketplace: marketplaceReducer,
  cart: cartReducer,
});

export default rootReducer;