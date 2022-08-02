import { api } from "../../api/api";
import { getPosts, createPost, deletePost  } from "./postSlice";

export const getPostsApiCall = () => {
  return async(dispatch, getState) => {
    const res = await api.get('/post/')
    dispatch(getPosts({ posts: res.data }))
  }
}

export const createPostApiCall = () => {
  return async(dispatch, getState) => {
    const res = await api.post('/post/')
    dispatch(createPost(res.data))
  }
}

export const deletePostApiCall = () => {
  return async(dispatch, getState) => {
    const res = await api.delete('/post/1')
    dispatch(deletePost(res.data))
  }
}
