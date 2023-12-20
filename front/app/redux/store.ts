import { configureStore } from "@reduxjs/toolkit";

import { Projects } from "./features/projects.slice";
import { User } from "./features/user.slice";
import { Users } from "./features/get_all_users.slice";
import { Service } from "./features/service.slice";

import { Members } from "./features/get_members.slice";

import { Tasks } from "./features/get_tasks.slice";

export const store = configureStore({
  reducer: {
    project_reducer: Projects.reducer,
    user: User.reducer,
    get_all_users: Users.reducer,
    members: Members.reducer,
    service: Service.reducer,
    tasks: Tasks.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
