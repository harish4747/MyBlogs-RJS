import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios/Instance";

export const fetchUserData = createAsyncThunk(
  "userData/fetchUserData",
  async () => {
    const { data } = await axios.get("/userData");
    return data;
  },
);

export const postUserData = createAsyncThunk(
  "userData/postUserData",
  async (payload) => {
    const { data } = await axios.post("/userData", payload);
    return data;
  },
);

const initialState = {
  userData: [
    { username: "Harish", email: "harich4747@gmail.com", password: "1" },
  ],
  loggedInUser: [],
  isLoggedIn: false,
  isAdminLoggedIn: false,
  adminList: ["harich4747@gmail.com"],
};

const UserSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = [...state.userData, action.payload];
      state.loggedInUser = [action.payload];
      state.isLoggedIn = true;
    },

    setLoggedInUser: (state, action) => {
      state.loggedInUser = [action.payload];
      if (state.loggedInUser.length === 1) {
        state.isLoggedIn = true;
      }
    },

    logoutUser: (state) => {
      state.loggedInUser = [];
      state.isLoggedIn = false;
      state.isAdminLoggedIn = false;
    },

    setIsAdminLoggedIn: (state) => {
      state.isAdminLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = [...action.payload];
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.userData = [...state.userData, action.payload];
        state.loggedInUser = [action.payload];
        state.isLoggedIn = true;
      });
  },
});

export const { setUserData, setLoggedInUser, logoutUser, setIsAdminLoggedIn } =
  UserSlice.actions;
export default UserSlice.reducer;
