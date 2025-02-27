import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../middleware/baseQuery";

interface User {
  id: string;
  name: string;
  email: string;
  totalPoint: number;
  // add other user fields as needed
}

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
