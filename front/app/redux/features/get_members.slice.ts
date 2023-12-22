import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { MemberDetailedInf } from "../interfaces/member_interfaces";

export const getMembers = createAsyncThunk(
  "member/getMembers",
  async (user_id: number, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:2000/members?user_id=${user_id}`
      );
      return res;
    } catch (error) {
      const axios_error = error as AxiosError;
      return thunkAPI.rejectWithValue(axios_error.response?.data);
    }
  }
);

const initialState: MemberDetailedInf = {
  members: null,
  error: null,
  pending: "pending"
};

export const Members = createSlice({
  name: "Members",
  initialState,
  reducers: {
    deletePrevMembers: (state, _) => {
      return { ...state, members: null };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.fulfilled, (state, action) => {
        state.error = null;
        state.members = action.payload.data;
        state.pending = action.meta.requestStatus;
      })
      .addCase(getMembers.pending, (state, action) => {
        state.pending = action.meta.requestStatus;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export const { deletePrevMembers } = Members.actions;
export default Members.reducer;
