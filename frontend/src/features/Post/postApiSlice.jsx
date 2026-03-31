import { blogApi } from "../../app/api/blogApi";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { setCredentials } from "../auth/authSlice";

const postAdapter = createEntityAdapter({})

const initialState = postAdapter.getInitialState()

const postApiSlice = blogApi.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: responseData => {
        return postAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => {
        if(result?.ids){
          return [
            {type: 'Post', id:'LIST'},
            ...result.ids.map(id => ({type: 'Post', id}))
          ]
        }
        return [{type: 'Post', id: "LIST"}]
      }
    }),
    createPost: builder.mutation({
      query: ({userId, initialPost}) => ({
        url: `/posts/${userId}`,
        method: "POST",
        body: {...initialPost}
      }),
      invalidatesTags: [
        {type: 'Post', id: 'LIST'}
      ]
    }),
    editPost: builder.mutation({
      query: ({initialPostData, id}) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: {...initialPostData}
      }),
      invalidatesTags: (result) => result?.id ? 
      [{type: 'Post', id: result.id}] : [{type: 'Post', id: 'LIST'}]
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [
        {type: 'Post', id}
      ]
    })
  })
})

export const {useGetPostsQuery, useCreatePostMutation, useEditPostMutation, useDeletePostMutation} = postApiSlice

const selectPostsResult = postApiSlice.endpoints.getPosts.select()

const selectPostData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data
)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostsById
} = postAdapter.getSelectors(state => selectPostData(state) ?? initialState)