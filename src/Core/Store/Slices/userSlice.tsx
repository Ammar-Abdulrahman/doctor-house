import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  role: string | null;
}

const initialState: UserState = {
  username: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ username: string; role: string }>
    ) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.username = null;
      state.role = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
