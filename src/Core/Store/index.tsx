import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // Use sessionStorage instead of localStorage
import authReducer from "@Store/Slices/authSlice";
import userReducer from "@Store/Slices/userSlice";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage: sessionStorage, // Use sessionStorage for persistence
  whitelist: ["auth"], // Only persist the auth slice
};

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  auth: authReducer, // Add other reducers here if necessary
  user: userReducer,
});

// Apply persistReducer to wrap the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Persistor for managing persisting and rehydration
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
