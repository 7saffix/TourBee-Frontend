import { baseApi } from "../axiosBaseQuery";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useProfileQuery, useGetAllUsersQuery } = userApi;
