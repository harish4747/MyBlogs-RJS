import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [{ username: "Harish", email: "harich4747@gmail.com", password: "1" }],
  isLoggedIn: false,
  loggedInUser: [],
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
    },
  },
});

export const { setUserData, setLoggedInUser, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
