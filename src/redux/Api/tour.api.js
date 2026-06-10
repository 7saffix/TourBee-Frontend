import { baseApi } from "../axiosBaseQuery";

export const tourAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
    }),

    getTourType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
    }),

    getTours: builder.query({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: {
          search: params.search || undefined,
          sortBy: params.sortBy || undefined,
          page: params.page || 1,
          limit: params.limit || 5,
          tourType: params.tourType || undefined,
          maxCost: params.maxCost || undefined,
          location: params.location || undefined,
        },
      }),
    }),
  }),
});
export const { useGetDivisionQuery, useGetTourTypeQuery, useGetToursQuery } =
  tourAPi;
