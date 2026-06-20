import { baseApi } from "../axiosBaseQuery";

export const statsAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: () => ({
        url: "/stats/users",
        method: "GET",
      }),
    }),
    getTourStats: builder.query({
      query: () => ({
        url: "/stats/tours",
        method: "GET",
      }),
    }),
    getBookingStats: builder.query({
      query: () => ({
        url: "/stats/bookings",
        method: "GET",
      }),
    }),
    getPaymentStats: builder.query({
      query: () => ({
        url: "/stats/payments",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetUserStatsQuery,
  useGetTourStatsQuery,
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
} = statsAPi;
