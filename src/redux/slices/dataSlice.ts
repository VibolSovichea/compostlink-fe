import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/redux/middleware/baseQuery";
import { User, WasteDonation } from "@/redux/slices/data.types";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Profile", "wasteDonation"],
  endpoints: (builder) => ({
    profile: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    wasteDonation: builder.mutation<any, WasteDonation>({
      query: (body) => ({
        url: "/waste-donations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["wasteDonation"],
    })
  }),
});

export default dataSlice;

export const {
  useProfileQuery,
  useLazyProfileQuery,
  useWasteDonationMutation,
} = dataSlice;
