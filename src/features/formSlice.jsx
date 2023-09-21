import { createSlice } from '@reduxjs/toolkit';

const localStorageKey = 'user_data';

const initialUserData = JSON.parse(localStorage.getItem(localStorageKey)) || [];

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUserData,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        state[userIndex] = updatedUser;
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
    deleteUser: (state, action) => {
      state = state.filter((user) => user.id !== action.payload);
      localStorage.setItem(localStorageKey, JSON.stringify(state));
      return state;
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
