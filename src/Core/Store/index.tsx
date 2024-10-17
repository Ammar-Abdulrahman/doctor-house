import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import userSlice from "./Slices/userSlice";

// Configure the store with reducers
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
  //devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});

// Infer types for usage in the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
