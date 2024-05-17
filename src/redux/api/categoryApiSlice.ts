import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}`,
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
} = categoryApiSlice;
