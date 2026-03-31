import { blogApi } from "../../app/api/blogApi";
import { createEntityAdapter } from "@reduxjs/toolkit";

const draftPostsAdapter = createEntityAdapter()

const initialDrafts = draftPostsAdapter.getInitialState({})

const draftsApiSlice = blogApi.injectEndpoints({
  endpoints: builder => ({
    getDrafts: builder.query({
      query: (userId) => `/posts/drafts/${userId}`,
      transformResponse: responseData => {
        return draftPostsAdapter.setAll(initialDrafts, responseData)
      },
      providesTags: (result) => {
        if(result?.ids){
          return[
            {type: "Drafts", id: "LIST"},
            ...result.ids.map(id => ({type: "Drafts", id}))
          ]
        }
        return [{type: "Drafts", id: "LIST"}]
      }
    }),
  })
})

export const {useGetDraftsQuery} = draftsApiSlice
