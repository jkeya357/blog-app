import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token
    if(token){
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if(result?.error?.originalStatus === 403){

    console.log('Sending refresh token')

    const token = await baseQuery('/auth/login/refresh', api, extraOptions)

    console.log("Refresh token",token)
    if(token?.data){
      const user = api.getState().auth.user
      api.dispatch(setCredentials({...token.data, user}))
      result = await baseQuery(args, api, extraOptions)
    }else{
      api.dispatch(logout())
    }
  }

  return result
}

export const blogApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Category", "Tag", "Post", "Drafts"],
  endpoints: builder => ({})
})