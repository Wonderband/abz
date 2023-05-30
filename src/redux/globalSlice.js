import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  pending: false,
  users: [],
  page: 1,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setError(state, { payload }) {
      state.error = payload;
    },
    setPending(state, { payload }) {
      state.pending = payload;
    },
    setUsers(state, { payload }) {
      state.users = [...state.users, ...payload];
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
  },
});

export const { setError, setPending, setUsers, setPage } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
