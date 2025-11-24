import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "@/features/auth/api/login";
import type { AuthState, LoginPayload, LoginResponse } from "@/features/auth/model/types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const res = await loginApi(payload);
      return res;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e?.response?.data?.message ?? "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
