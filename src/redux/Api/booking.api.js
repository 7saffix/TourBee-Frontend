import { baseApi } from "../axiosBaseQuery";

export const bookingAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getDivision: builder.query({
    //   query: () => ({
    //     url: "/division",
    //     method: "GET",
    //   }),
    // }),

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
export const { useCreateBookingMutation } = bookingAPi;
