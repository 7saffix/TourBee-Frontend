import { baseApi } from "../axiosBaseQuery";

export const tourAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
    }),

    editDivision: builder.mutation({
      query: ({ divisionId, divisionInfo }) => ({
        url: `/division/${divisionId}`,
        method: "PATCH",
        data: divisionInfo,
      }),
      invalidatesTags: ["DIVISION"],
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
          division: params.division || undefined,
        },
      }),
      providesTags: ["TOUR"],
    }),

    createTour: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["TOUR"],
    }),

    updateTour: builder.mutation({
      query: ({ tourId, tourInfo }) => ({
        url: `/tour/${tourId}`,
        method: "PATCH",
        data: tourInfo,
      }),
      invalidatesTags: ["TOUR"],
    }),

    deleteTour: builder.mutation({
      query: (tourId) => ({
        url: `/tour/${tourId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});
export const {
  useGetDivisionQuery,
  useEditDivisionMutation,
  useGetTourTypeQuery,
  useGetToursQuery,
  useCreateTourMutation,
  useUpdateTourMutation,
  useDeleteTourMutation,
} = tourAPi;
