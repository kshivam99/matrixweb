import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utilsClient/baseUrl";
import cookie from "js-cookie";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/posts`,
  headers: { Authorization: cookie.get("token") },
});


export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (number) => {
    const res = await axios.get(`${baseUrl}/api/posts/`, 
    {
      params: { pageNumber: number },
      headers: {
        Authorization: cookie.get("token")
      }
    });
    return {posts: res.data, number};
  }
);

export const submitNewPost = createAsyncThunk(
  "posts/submitNewPost",
  async (req) => {
    const res = await Axios.post("/", req);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const res = await Axios.delete(`/${postId}`);
    return postId;
  }
);

export const likePost = createAsyncThunk("posts/likePost", async (req) => {
  const { postId, userId, like } = req;
  
  if (like) {
    await Axios.post(`/like/${postId}`);
  } else {
    await Axios.put(`/unlike/${postId}`);
  }
  return { postId, like, userId };
});

export const postComment = createAsyncThunk(
  "posts/postComment",
  async ({postId, text}) => {
    const res = await Axios.post(`/comment/${postId}`, { text });
    return {comment: res.data, postId};
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({postId, commentId}) => {
    const res = await Axios.delete(`/${postId}/${commentId}`);
    return {postId, commentId};
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if(action.payload.number===1)
      {
        state.posts = action.payload.posts;
      }
      else
      {
        state.posts = [...action.payload.posts, ...state.posts];
      }
    },
    [submitNewPost.pending]: (state, action) => {
      state.status = "loading";
    },
    [submitNewPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts.unshift(action.payload);
    },
    [submitNewPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deletePost.pending]: (state, action) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [likePost.pending]: (state, action) => {
      state.status = "loading";
    },

    [likePost.fulfilled]: (state, action) => {
      const { postId, like, userId } = action.payload;
      state.status = "succeeded";
      if (like) {
        state.posts = state.posts.map((item) =>
          item._id === postId
            ? { ...item, likes: item.likes.concat({ user: userId }) }
            : item
        );
      } else {
        state.posts = state.posts.map((item) =>
          item._id === postId
            ? {
                ...item,
                likes: item.likes.filter((curr) => curr.user !== userId),
              }
            : item
        );
      }
    },

    [likePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [postComment.fulfilled]: (state, action) => {
      const { postId, comment } = action.payload;
      state.status = "succeeded";
      state.posts = state.posts.map((item) =>
          item._id === postId
            ? { ...item, comments: item.comments.concat(comment) }
            : item
        );
      
    },
    [deleteComment.fulfilled]: (state, action) => {
      const { postId, commentId } = action.payload;
      state.status = "succeeded";
      state.posts = state.posts.map((item) =>
          item._id === postId
            ? {
                ...item,
                comments: item.comments.filter((curr) => curr._id !== commentId),
              }
            : item
        );
    },
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
