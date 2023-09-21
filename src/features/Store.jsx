import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './formSlice';

const Store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default Store;
