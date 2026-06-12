import { baseApi } from "../axiosBaseQuery";

export const bookingAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookings: builder.query({
      query: () => ({
        url: "/booking/my-bookings",
        method: "GET",
      }),
    }),

    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/booking/create",
        method: "POST",
        data: bookingInfo,
      }),
      invalidatesTags: ["BOOKING"],
    }),
  }),
});
export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingAPi;
