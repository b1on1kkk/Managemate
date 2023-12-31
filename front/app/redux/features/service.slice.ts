import { createSlice } from "@reduxjs/toolkit";

import type { OpenStatus } from "../interfaces/service_interfaces";

const initialState: OpenStatus = {
  status: false,
  project: {
    chosen_project: null,
    role: 0
  }
};

export const Service = createSlice({
  name: "Service",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setProject: (state, action) => {
      state.project = action.payload;
    }
  }
});

export const { setStatus, setProject } = Service.actions;
export default Service.reducer;
