import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { loginApi } from "@/features/auth/api/login";
import type { LoginPayload, LoginResponse } from "@/features/auth/model/types";

export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const res = await loginApi(payload);
      return res;
    } catch (e: unknown) {
      const err = e as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
