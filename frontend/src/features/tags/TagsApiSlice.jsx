import { blogApi } from "../../app/api/blogApi";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const tagAdapter = createEntityAdapter()

const initialState = tagAdapter.getInitialState({})

const tagApiSlice = blogApi.injectEndpoints({
  endpoints: builder => ({
    getTags: builder.query({
      query: () => "/tags",
      transformResponse: resultData => {
        return tagAdapter.setAll(initialState, resultData)
      },
      providesTags: (result) => {
        if(result?.ids){
          return [
            {type: "Tag", id: "LIST"},
            ...result.ids.map(id => ({type: "Tag", id}))
          ]
        }
        return [{type: "Tag", id: "LIST"}]
      }
    }),
    createTags: builder.mutation({
      query: initialTag => ({
        url: "/tags",
        method: "POST",
        body: {...initialTag}
      }),
      invalidatesTags:  [{type: "Tag", id:"LIST"}]
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (id) => [{type: "Tag", id}]
    })
  })
})

export const {useGetTagsQuery, useCreateTagsMutation, useDeleteTagMutation} = tagApiSlice

const tagSelectorResult = tagApiSlice.endpoints.getTags.select()

const selectTageResultData = createSelector(
  tagSelectorResult,
  tagResult => tagResult.data
)

export const {
  selectAll: selectAllTags,
  selectById: selectTagById
} = tagAdapter.getSelectors(state => selectTageResultData(state) ?? initialState)