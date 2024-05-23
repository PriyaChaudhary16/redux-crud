import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: ["AJAY - TEST"],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addInitialUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    newUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    editUser: (state, action) => {
      state.users = [...state.users].map((user) => {
        if(user.id === action.payload.id) {
          return action.payload.user
        }
        else {
          return user
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addInitialUsers, deleteUser, newUser, editUser } = userSlice.actions;

export default userSlice.reducer;
