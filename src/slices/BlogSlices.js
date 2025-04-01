import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/Instance";

export const defaultImgUrl =
  "https://img.freepik.com/premium-photo/four-wooden-cubes-with-letters-blog-business-marketing-concept-reflection-caption-mirrored-gray-surface-table_384017-3181.jpg";

const initialState = {
  blogs: [],
};

export const fetchBlogData = createAsyncThunk(
  "blogs/fetchBlogData",
  async () => {
    const { data } = await axios.get("/blogs");
    return data;
  },
);

export const postBlogData = createAsyncThunk(
  "blogs/postBlogData",
  async (payload) => {
    payload.imgURL = !payload.imgURL ? defaultImgUrl : payload.imgURL;
    const { data } = await axios.post("/blogs", payload);
    return data;
  },
);

export const updateBlogData = createAsyncThunk(
  "blogs/updateBlogData",
  async (payload) => {
    console.log("payload blog sice")
    console.log(payload);
    await axios.put(`/blogs/${payload.id}`,payload);
  },
);

export const deleteBlogData = createAsyncThunk(
  "blogs/deleteBlogData",
  async (id) => {
    await axios.delete(`/blogs/${id}`);
  },
);

const BlogSlices = createSlice({
  name: "BlogSlices",
  initialState,
  reducers: {
    setBlogs: (state, actions) => {
      actions.payload.imgURL = !actions.payload.imgURL
        ? defaultImgUrl
        : actions.payload.imgURL;

      state.blogs = [...state.blogs, actions.payload];
    },

    updateBlog: (state, actions) => {
      actions.payload.data.imgURL = !actions.payload.data.imgURL
        ? defaultImgUrl
        : actions.payload.data.imgURL;
      state.blogs[actions.payload.index] = actions.payload.data;
    },

    deleteBlog: (state, actions) => {
      state.blogs = [...actions.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogData.fulfilled, (state, action) => {
        state.blogs = [...action.payload];
      })
      .addCase(postBlogData.fulfilled, (state, actions) => {
        state.blogs = [...state.blogs, actions.payload];
      });
  },
});

export const { setBlogs, deleteBlog, updateBlog } = BlogSlices.actions;
export default BlogSlices.reducer;
