import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const categoryAdapter = createEntityAdapter()
const initialState = categoryAdapter.getInitialState({})

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => "/categories",
      transformResponse: responseData => {
        return categoryAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => {
        if(result?.ids){
          return [
            {type: 'Category', id: "LIST"},
            ...result.ids.map(id => ({type: 'Category', id}))
          ]
        }else return [{type: "Category", id: "LIST"}]
      }
    }),
    createCategory: builder.mutation({
      query: initialCategory => ({
        url: "/categories",
        method: "POST",
        body: {...initialCategory}
      }),
      invalidatesTags: (result) => [
        {type: "Category", id: "LIST"}
      ]
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (id) => [
        {type: "Category", id}
      ]
    })
  })
})

export const {
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useDeleteCategoryMutation
} = categoryApiSlice

const selectCategoryResult = categoryApiSlice.endpoints.getCategories.select()

const categorySelector = createSelector(
  selectCategoryResult,
  categoryResult => categoryResult.data
)

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById
} = categoryAdapter.getSelectors(state => categorySelector(state) ?? initialState)