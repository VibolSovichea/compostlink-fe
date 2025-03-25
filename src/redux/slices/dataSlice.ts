import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/redux/middleware/baseQuery";
import {
  Location,
  Redemption,
  Reward,
  PointHistory, User,
  WasteDonation,
} from "@/redux/slices/data.types";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: [
    "Profile",
    "wasteDonation",
    "dropOffLocation",
    "reward",
    "redemption",
    "pointHistory",
    "User",
  ],
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

    reward: builder.query<Reward[], void>({
      query: () => ({
        url: "/rewards",
        method: "GET",
      }),
      providesTags: ["reward"],
    }),

    rewardById: builder.query<Reward, number>({
      query: (id) => ({
        url: `/rewards/${id}`,
        method: "GET",
      }),
      providesTags: ["reward"],
    }),

    rewardRedemption: builder.query<Redemption[], void>({
      query: () => ({
        url: "/redemptions",
        method: "GET",
      }),
      providesTags: ["redemption"],
    }),

    rewardRedemptionById: builder.query<Redemption, number>({
      query: (id) => ({
        url: `/redemptions/${id}`,
        method: "GET",
      }),
      providesTags: ["redemption"],
    }),

    rewardRedeem: builder.mutation<any, Redemption>({
      query: (body) => ({
        url: "/redemptions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["redemption"],
    }),

    redemptionInactivate: builder.mutation<any, number>({
      query: (id) => ({
        url: `/redemptions/inactivate/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["redemption"],
    }),

    updateUser: builder.mutation<any, { id: string, body: { name: string, email: string } }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    getUserPointHistory: builder.query<PointHistory[], string>({
      query: (userId) => ({
        url: `/users/${userId}/point-history`,
        method: "GET",
      }),
      providesTags: ["pointHistory"],
    }),

    getWasteDonationByUserId: builder.query<WasteDonation, string>({
      query: (userId) => ({
        url: `/waste-donations/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["wasteDonation"],
    }),
  }),
});

export default dataSlice;

export const {
  useProfileQuery,
  useLazyProfileQuery,
  useWasteDonationMutation,
  useDropOffLocationQuery,
  useLazyDropOffLocationQuery,
  useRegisterLocationMutation,
  useRewardQuery,
  useRewardByIdQuery,
  useRewardRedemptionQuery,
  useRewardRedeemMutation,
  useRewardRedemptionByIdQuery,
  useRedemptionInactivateMutation,
  useUpdateUserMutation,
  useGetUserPointHistoryQuery,
  useLazyGetUserPointHistoryQuery,
  useGetWasteDonationByUserIdQuery,
} = dataSlice;