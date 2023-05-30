import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  pending: false,
  users: [],
  currentPage: 1,
  formSent: false,
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
      state.users = payload;
    },
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setFormSent(state, { payload }) {
      state.formSent = payload;
    },
  },
});

export const { setError, setPending, setUsers, setCurrentPage, setFormSent } =
  globalSlice.actions;
export const globalReducer = globalSlice.reducer;
