import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const userInfoObj = JSON.parse(userInfo);
        if (userInfoObj && userInfoObj.token) {
          headers.set('Authorization', `Bearer ${userInfoObj.token}`);
        }
      } catch (error) {
        console.error("Failed to parse userInfo from localStorage", error);
      }
    }
    return headers;
  }
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
