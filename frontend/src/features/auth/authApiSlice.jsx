import { apiSlice } from "../../app/api/apiSlice";
import { logout } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: {...credentials}
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST"
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}){
          try {
            await queryFulfilled
            dispatch(logout())
            setTimeout(() => {
              apiSlice.util.resetApiState()
            }, 1000)
          } catch (error) {
            console.log("There was an error logging out",error)
          }
      }
    })
  })
})

export const {useLoginMutation, useLogoutMutation} = authApiSlice