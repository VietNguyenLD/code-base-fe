import type { AuthState } from "@/features/auth/model/types";

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};
