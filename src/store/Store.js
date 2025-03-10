import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/UserSlice";
import blogReducer from "../slices/BlogSlices";

const myStore = configureStore({
  reducer: {
    userInfo: userReducer,
    blogInfo: blogReducer,
  },
});

export default myStore;
