import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
  },
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload
    },
    createPost: (state, action) => {
      console.log(action)
    },
    deletePost: (state, action) => {
      console.log(action)
    },
  }
})

export const { getPosts, createPost, deletePost } = postSlice.actions
