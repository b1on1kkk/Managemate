import { configureStore } from "@reduxjs/toolkit";

import { Projects } from "./features/projects.slice";
import { User } from "./features/user.slice";

export const store = configureStore({
  reducer: {
    project_reducer: Projects.reducer,
    user: User.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
