import { createSlice } from "@reduxjs/toolkit";

interface OpenStatus {
  status: boolean;
  chosen_project: number | null;
}

const initialState: OpenStatus = {
  status: false,
  chosen_project: null
};

export const Service = createSlice({
  name: "Service",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setProject: (state, action) => {
      state.chosen_project = action.payload;
    }
  }
});

export const { setStatus, setProject } = Service.actions;
export default Service.reducer;
