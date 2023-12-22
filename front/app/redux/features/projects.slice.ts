import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import type { TProjects } from "../interfaces/projects_interfaces";

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (user_id: number | string, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:2000/projects?user_id=${user_id}`
      );

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: TProjects = {
  projects: [],
  error: null,
  pending: "pending"
};

export const Projects = createSlice({
  name: "Projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload.data;
        state.pending = action.meta.requestStatus;
      })
      .addCase(getProjects.pending, (state, action) => {
        state.pending = action.meta.requestStatus;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.error = action.error as AxiosError;
      });
  }
});

export default Projects.reducer;
