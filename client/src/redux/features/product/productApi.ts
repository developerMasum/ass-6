import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (filters) => ({
        url: "/products",
        method: "GET",
        params: filters, 
      }),
      providesTags: ['Product'], // Provide tags here
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),
      providesTags: ['Product'], // Provide tags here
    }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/add-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ['Product'], // Invalidates tags here
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Product'], // Invalidates tags here
    }),

    updateProductNew: builder.mutation({
      query: (options) => ({
        url: `/product/${options.productId}`,
        method: "PUT",
        body: options.data,
      }),
      invalidatesTags: ['Product'], // Invalidates tags here
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductNewMutation,
  useGetSingleProductQuery
} = productApi;
