// counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const swift = createSlice({
  name: 'swift',
  initialState: {
    idValue: '',
    user: {},
    depositData: [],
  },
  reducers: {
    setIdValue(state, action) {
      state.idValue = action.payload;
      },
      swiftUserData(state, {payload}) {
        state.user = payload;
        console.log("Redux User data", payload);
        },
        updateDepositData(state, action) {
          console.log("FIRST", action.payload);
          return {
            ...state,
            depositData: [...state.depositData, action.payload],
          };
        },
  },
});

export const { setIdValue, swiftUserData, updateDepositData } = swift.actions;
export default swift.reducer;
