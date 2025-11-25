import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/auth";
import postReducer from "@/store/slices/post";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
