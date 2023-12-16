import { configureStore } from "@reduxjs/toolkit";

import { Projects } from "./features/projects.slice";
import { Members } from "./features/project_members.slice";

export const store = configureStore({
  reducer: {
    project_reducer: Projects.reducer,
    members_reducer: Members.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
