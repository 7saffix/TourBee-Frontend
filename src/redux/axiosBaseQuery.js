import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./instance";

// Reusable Axios bridge utility
const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // Global cache tags used to automatically refetch data when things change
  tagTypes: ["USER"],
  endpoints: () => ({}), // Keep this empty! We inject everything into this later.
});
