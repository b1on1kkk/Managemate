import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { TASKS_TEMPLATE } from "@/constants/TasksTemplate";

import { TaskExist, GetTodoItemsByBoardId } from "../utils/redux_utils";

import type {
  TTodoCard,
  TBoard,
  TaskDetailedInf,
  parsedTodos
} from "../interfaces/tasks_interfaces";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (project_id: number, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:2000/tasks?project_id=${project_id}`
      );

      return res;
    } catch (error) {
      const axios_error = error as AxiosError;
      return thunkAPI.rejectWithValue(axios_error.response?.data);
    }
  }
);

const initialState: TaskDetailedInf = {
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
        ...state,
        tasks: state.tasks.map((board) => {
          if (board.id === id) return { ...board, open_add_modal: status };

          return board;
        })
      };
    },
    showMoreTaskCard: (state, action) => {
      const { task_id, board_id, status } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((board) => {
          if (board.id === board_id) {
            return {
              ...board,
              items: board.items.map((task) => {
                if (task.id === task_id) return { ...task, show_more: status };

                return task;
              })
            };
          }
          return board;
        })
      };
    },
    dropCardHandler: (state, action) => {
      const {
        toAddBoard,
        currentItem,
        currentBoard
      }: {
        toAddBoard: TBoard;
        currentItem: TTodoCard;
        currentBoard: TBoard;
      } = action.payload;

      // get index of board where we wanna push card
      const toAddBoardIdx = state.tasks.findIndex(
        (board) => board.id === toAddBoard.id
      );

      // push it
      state.tasks[toAddBoardIdx].items.push(currentItem);

      // get index of previous (current board from we got our task)
      const currentBoardIdx = state.tasks.findIndex(
        (board) => board.id === currentBoard.id
      );

      // then, by index remove task what we added into new column
      state.tasks[currentBoardIdx].items.splice(
        state.tasks[currentBoardIdx].items.findIndex(
          (card) => card.id === currentItem.id
        ),
        1
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        // console.log(TASKS_TEMPLATE);

        state.tasks = [...TASKS_TEMPLATE];

        if (action.payload.data[0]?.tasks) {
          const tasks: parsedTodos[] = JSON.parse(
            action.payload.data[0]?.tasks
          );

          if (tasks.length > 0) {
            state.tasks = state.tasks.map((task) => {
              if (TaskExist(task.id, tasks)) {
                return {
                  ...task,
                  items: GetTodoItemsByBoardId(task.id, tasks)
                };
              }
              return task;
            });
          }

          state.error = null;
          state.pending = action.meta.requestStatus;
        }
      })
      .addCase(getTasks.pending, (state, action) => {
        state.pending = action.meta.requestStatus;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export const { addingNewTaskStatus, showMoreTaskCard, dropCardHandler } =
  Tasks.actions;
export default Tasks.reducer;
