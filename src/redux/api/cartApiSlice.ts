import { apiSlice } from "./apiSlice";
import { CART_URL} from "../constants";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: (order) => ({
        url: CART_URL,
        method: "POST",
        body: order,
      }),
    }),

    getMyCharts: builder.query({
      query: () => ({
        url: `${CART_URL}`,
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useCreateCartMutation,
  useGetMyChartsQuery
} = cartApiSlice;
