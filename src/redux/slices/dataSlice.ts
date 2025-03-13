import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/redux/middleware/baseQuery";
import { Location, User, WasteDonation } from "@/redux/slices/data.types";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Profile", "wasteDonation", "dropOffLocation"],
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
    }),
    dropOffLocation: builder.query<Location[], void>({
      query: () => ({
        url: `/drop-off-locations`,
        method: "GET",
      }),
      providesTags: ["dropOffLocation"],
    }),

    registerLocation: builder.mutation<any, Location>({
      query: (body) => ({
        url: "/drop-off-locations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dropOffLocation"],
    }),
  }),
});

export default dataSlice;

export const {
  useProfileQuery,
  useLazyProfileQuery,
  useWasteDonationMutation,
  useDropOffLocationQuery,
  useRegisterLocationMutation,
} = dataSlice;
