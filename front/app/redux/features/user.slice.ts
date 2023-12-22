import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { TUser } from "../interfaces/user_interfaces";

interface Projects {
  user: TUser[] | null;
  error: AxiosError | null | unknown;
}

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`http://localhost:2000/user`);

    return res;
  } catch (error) {
    const axios_error = error as AxiosError;
    return thunkAPI.rejectWithValue(axios_error.response?.data);
  }
});

const initialState: Projects = {
  user: null,
  error: null
};

export const User = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export default User.reducer;
