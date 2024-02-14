import { baseApi } from "../api/baseApi";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {useCreateUserMutation}=userApi