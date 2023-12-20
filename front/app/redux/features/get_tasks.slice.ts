import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { TASKS_TEMPLATE } from "@/constants/TasksTemplate";

export interface TTodo {
  id: number;
  checked: boolean;
  text: string;
}

export interface TTodoCard {
  id: number;
  sub_title: string;
  title: string;
  about: string;
  htag_color: string;
  todos: TTodo[];
}

export interface TBoard {
  id: number;
  title: string;
  open_add_modal: boolean;
  items: TTodoCard[];
}

interface MemberDetailedInf {
  tasks: TBoard[];
  error: AxiosError | null | unknown;
  pending: string;
}

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(``);

      return res;
    } catch (error) {
      const axios_error = error as AxiosError;
      return thunkAPI.rejectWithValue(axios_error.response?.data);
    }
  }
);

const initialState: MemberDetailedInf = {
  tasks: TASKS_TEMPLATE,
  error: null,
  pending: "pending"
};

export const Tasks = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    addingNewTaskStatus: (state, action) => {
      const { id, status } = action.payload;

      return {
        error: state.error,
        pending: state.pending,
        tasks: state.tasks.map((board) => {
          if (board.id === id) return { ...board, open_add_modal: status };

          return board;
        })
      };
    },
    addingNewTask: (state, action) => {
      const { id, todo }: { id: number; todo: TTodoCard } = action.payload;

      return {
        error: state.error,
        pending: state.pending,
        tasks: state.tasks.map((board) => {
          if (board.id === id)
            return {
              ...board,
              items: [...board.items, todo],
              open_add_modal: !board.open_add_modal
            };

          return board;
        })
      };
    },

    newTasks: (state, action) => {
      return {
        error: state.error,
        pending: state.pending,
        tasks: action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        // think how to get only tasks of each column

        state.error = null;
        // state.tasks = action.payload.data;
        state.pending = action.meta.requestStatus;
      })
      .addCase(getTasks.pending, (state, action) => {
        state.pending = action.meta.requestStatus;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export const { addingNewTaskStatus, addingNewTask, newTasks } = Tasks.actions;
export default Tasks.reducer;
