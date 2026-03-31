import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { blogApi } from "./api/blogApi"
import authSliceReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    auth: authSliceReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(blogApi.middleware),
  devTools: process.env.NODE_ENV !== "production"
})

setupListeners(store.dispatch)