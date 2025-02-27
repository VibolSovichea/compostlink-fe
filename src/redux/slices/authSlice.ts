import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../middleware/apiClient";
import { env } from "process";
import { AuthState } from "./auth.types";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  userRole: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<string, { email: string, password: string }>(
  "auth/signin", async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<{data: {access_token: string}}>("/auth/signin", credentials);
      const accessToken = response.data.data.access_token;
      Cookies.set("access_token", accessToken, {
        secure: env.NEXT_PUBLIC_ENVIRONMENT === "production",
        path: "/",
        expires: 7
      });
      return accessToken;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const handleThunk = <T>(
  builder: any,
  thunk: any,
  stateKey: keyof typeof initialState,
) => {
  builder
    .addCase(thunk.pending, (state: AuthState) => {
      state.status = "loading";
    })
    .addCase(thunk.fulfilled, (state: AuthState, action: PayloadAction<T>) => {
      state.status = "succeeded";
      state[stateKey] = action.payload as any;
      state.error = null;
    })
    .addCase(thunk.rejected, (state: AuthState, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    })
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload as any;
    },
    logout: (state) => {
      state.token = null;
      Cookies.remove("access_token");
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    },
  },
  extraReducers: (builder) => {
    handleThunk<string>(builder, loginUser, "token");
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
