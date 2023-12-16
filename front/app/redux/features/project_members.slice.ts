import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Members {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  last_online: string;
}

interface Projects {
  members: Members[];
  error: AxiosError | null;
}

export const getProjectMembers = createAsyncThunk(
  "members/getProjectMembers",
  async (queryId: string, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:2005/members?id=${queryId}`
      );

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: Projects = {
  members: [],
  error: null
};

export const Members = createSlice({
  name: "Members",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectMembers.fulfilled, (state, action) => {
        state.members = action.payload.data;
      })
      .addCase(getProjectMembers.rejected, (state, action) => {
        state.error = action.error as AxiosError;
      });
  }
});

export default Members.reducer;
