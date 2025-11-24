import axiosClient from "@/shared/lib/axiosClient";
import type { LoginPayload, LoginResponse } from "../model/types";

export function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  return axiosClient.post("/auth/login", payload);
}
