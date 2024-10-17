import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  privileges: string[];
}

const initialState: AuthState = {
  token: null,
  privileges: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; privileges: string[] }>
    ) => {
      state.token = action.payload.token;
      state.privileges = action.payload.privileges;
    },
    logout: (state) => {
      state.token = null;
      state.privileges = [];
    },
  },
});

// Export actions
export const { loginSuccess, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
