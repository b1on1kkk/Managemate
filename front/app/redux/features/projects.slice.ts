import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Todo {
  key1: string;
  key2: string;
}

export interface Project {
  id: number;
  user_id: number;
  title: string;
  icon_name: string;
  overview: string;
  tasks: string;
  notes: string;
  questions: string;
}

interface Projects {
  projects: Project[];
  error: AxiosError | null;
}

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

const initialState: Projects = {
  projects: [],
  error: null
};

export const Projects = createSlice({
  name: "Projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload.data;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.error = action.error as AxiosError;
      });
  }
});

export default Projects.reducer;
