
import {blogApi} from "../../app/api/blogApi"

const authApiSlice = blogApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: {...credentials}
      }),
      invalidateTags: () => [{type: "User", id: "LIST"}]
    }),
    signup: builder.mutation({
      query: (requestBody) => ({
        url: "/auth/signup",
        method: "POST",
        body: {...requestBody}
      }),
      invalidateTags: () => [{type: "User", id: "LIST"}]
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST"
      })
    })
  })
})

export const {useLoginMutation, useSignupMutation, useRefreshMutation} = authApiSlice