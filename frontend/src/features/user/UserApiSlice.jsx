import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const entityAdapter = createEntityAdapter()

const initialState = entityAdapter.getInitialState({})

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation({
      query: userData => ({
        url: "/user",
        method: "POST",
        body: {...userData}
      }),
      transformResponse: responseData => {
        return entityAdapter.setAll(initialState, responseData)
      },
      invalidatesTags: [
        {type: "User", id: "LIST"}
      ]
    })
  })
})

export const {useCreateUserMutation} = userApiSlice