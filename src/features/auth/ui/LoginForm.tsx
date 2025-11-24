"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-center text-2xl font-bold">Đăng nhập</h1>

      <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
      <input
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />

      <label className="mb-2 block text-sm font-medium text-gray-700">Mật khẩu</label>
      <input
        className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
