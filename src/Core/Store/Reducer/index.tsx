import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authSlice";
import userSlice from "../Slices/userSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});

export default rootReducer;
