import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    message: null,
    blog: {},
  },

  reducers: {
    getAllBlogsRequest(state, action) {
      state.loading = true;
      state.blogs = [];
      state.error = null;
    },

    getAllBlogsSuccess(state, action) {
      state.loading = false;
      state.blogs = action.payload;
      state.error = null;
    },

    getAllBlogsFailed(state, action) {
      state.loading = false;
      state.blogs = state.blogs;
      state.error = action.payload;
    },

    addNewBlogRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewBlogSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewBlogFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },

    deleteBlogRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    deleteBlogSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },

    deleteBlogFaild(state, action) {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    },

    getBlogRequest(state, action) {
      state.loading = true;
      state.blog = {};
      state.error = null;
    },

    getBlogSuccess(state, action) {
      state.loading = false;
      state.blog = action.payload;
      state.error = null;
    },

    getBlogFailed(state, action) {
      state.loading = false;
      state.blog = state.blog;
      state.error = action.payload;
    },

    updateBlogRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    resetBlogSlice(state, action) {
      state.error = null;
      state.blogs = state.blogs;
      state.loading = false;
      state.message = null;
    },

    clearAllBlogError(state, action) {
      state.error = null;
      state.blogs = state.blogs;
    },
  },
});

export const getAllBlogs = () => async (dispatch) => {
  dispatch(blogSlice.actions.getAllBlogsRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/blog/getAll",
      { withCredentials: true }
    );
    dispatch(blogSlice.actions.getAllBlogsSuccess(data.blogs));
    dispatch(blogSlice.actions.clearAllBlogError());
  } catch (error) {
    dispatch(blogSlice.actions.getAllBlogsFailed(error.response.data.message));
  }
};

export const addNewBlog = (data) => async (dispatch) => {
  dispatch(blogSlice.actions.addNewBlogRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/blog/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(response);
    console.log(response.data.message);
    dispatch(blogSlice.actions.addNewBlogSuccess(response.data.message));
    dispatch(blogSlice.actions.clearAllBlogError());
  } catch (error) {
    dispatch(blogSlice.actions.addNewBlogFailed(error.response.data.message));
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  dispatch(blogSlice.actions.deleteBlogRequest());

  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/blog/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(blogSlice.actions.deleteBlogSuccess(data.message));
    dispatch(blogSlice.actions.clearAllBlogError());
  } catch (error) {
    dispatch(blogSlice.actions.deleteBlogFaild(error.response.data.message));
  }
};

export const clearAllBlogErros = () => (dispatch) => {
  dispatch(blogSlice.actions.clearAllBlogError());
};

export const resetBlogSlice = () => (dispatch) => {
  dispatch(blogSlice.actions.resetBlogSlice());
};

export default blogSlice.reducer;
