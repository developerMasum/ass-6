import { baseApi } from "../../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSell: builder.query({
      query: (category) => ({
        url: '/product/sell-products',
        method: "GET",
        params: { category },
      }),
      providesTags: ['Sell'], 
    }),
    createSell: builder.mutation({
      query: (sellInfo) => ({
        url: "/product/create-sell",
        method: "POST",
        body: sellInfo,
      }),
      invalidatesTags: ['Sell'], 
    }),
   
  }),
});

export const { useCreateSellMutation, useGetAllSellQuery } = sellApi;
