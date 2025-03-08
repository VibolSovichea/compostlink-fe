"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { setToken } from "@/redux/slices/authSlice";

export default function ReduxProvider({
  children,
  token
}: {
  children: React.ReactNode;
  token: string;
}) {

  useEffect(() => {
    store.dispatch(setToken(token));
  }, [token])

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
