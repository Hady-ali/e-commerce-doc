// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentUser: null,
//   status: 'idle',
//   error: null
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.currentUser = action.payload;
//       state.status = 'succeeded';
//     },
//     clearUser: (state) => {
//       state.currentUser = null;
//       state.status = 'idle';
//     },
//     setLoading: (state) => {
//       state.status = 'loading';
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//       state.status = 'failed';
//     }
//   }
// });

// export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
// export default userSlice.reducer;


// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, // تأكد من وجود هذه الخاصية
  status: 'idle',
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;