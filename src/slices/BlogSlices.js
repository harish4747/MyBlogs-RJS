import { createSlice } from "@reduxjs/toolkit";

const defaultImgUrl =
  "https://img.freepik.com/premium-photo/four-wooden-cubes-with-letters-blog-business-marketing-concept-reflection-caption-mirrored-gray-surface-table_384017-3181.jpg";
const initialState = {
  blogs: [],
};

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

    deleteBlog: (state, actions) => {
      state.blogs = [...actions.payload];
    },

    updateBlog: (state, actions) => {
      state.blogs[actions.payload.index] = actions.payload.data;
    },
  },
});

export const { setBlogs, deleteBlog, updateBlog } = BlogSlices.actions;
export default BlogSlices.reducer;
