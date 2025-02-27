import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../middleware/baseQuery";
import { User } from "./data.types";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    profile: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export default dataSlice;

export const {
  useProfileQuery,
  useLazyProfileQuery,
} = dataSlice;
