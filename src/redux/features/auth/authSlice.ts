import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: string;
  name: string;
  username: string;
  role: string;
  token: string;
}

interface AuthState {
  userInfo: UserInfo | null;
}

const userInfoString = localStorage.getItem("userInfo");
const initialState: AuthState = {
  userInfo: userInfoString ? JSON.parse(userInfoString) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action:  PayloadAction<{data: UserInfo}>) => {
      state.userInfo = action.payload.data;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
