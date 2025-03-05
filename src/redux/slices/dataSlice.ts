import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/redux/middleware/baseQuery";
import { User } from "@/redux/slices/data.types";

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
    // example only
    updateProfileName: builder.mutation<User, { id: string, name: string }>({ // the User is the response type and next to it is the argument type or body type
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "POST",
        body: {
          name: body.name,
        }
      }),
      invalidatesTags: ["Profile"],
    })
  }),
});

export default dataSlice;

export const {
  useProfileQuery,
  useLazyProfileQuery,
  
  useUpdateProfileNameMutation,
} = dataSlice;
