import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {token: null, user: null},
  reducers:{
    setCredentials: (state,action) => {
      const {token, userId} = action.payload
      state.token = token,
      state.user = userId
    },
    logout: (state,action) => {
      state.token = null
      state.user = null
    }
  }
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.userId