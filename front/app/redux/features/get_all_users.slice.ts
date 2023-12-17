import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Users {
  id: number;
  name: string;
  mail: string;
}

interface UserDetailedInf {
  users: Users[] | null;
  error: AxiosError | null | unknown;
}

export const getAllUser = createAsyncThunk(
  "users/getAllUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:2000/users`);

      return res;
    } catch (error) {
      const axios_error = error as AxiosError;
      return thunkAPI.rejectWithValue(axios_error.response?.data);
    }
  }
);

const initialState: UserDetailedInf = {
  users: null,
  error: null
};

export const Users = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.error = null;
        state.users = action.payload.data;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export default Users.reducer;
