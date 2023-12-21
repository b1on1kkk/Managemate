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
  show_more: boolean;
  todos: TTodo[];
}

export interface TBoard {
  id: number;
  title: string;
  open_add_modal: boolean;
  items: TTodoCard[];
}

interface TaskDetailedInf {
  tasks: TBoard[];
  error: AxiosError | null | unknown;
  pending: string;
}

//
export interface parsedTodos {
  todo_inf: {
    id: number;
    sub_title: string;
    title: string;
    about: string;
    htag_color: string;
    show_more: boolean;
    todos: TTodo[];
  };
  board_id: number;
}
//

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
    newTasks: (state, action) => {
      return {
        ...state,
        tasks: action.payload
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
    setTodoDone: (state, action) => {
      const { task_id, board_id, todo_id, status } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((board) => {
          if (board.id === board_id) {
            return {
              ...board,
              items: board.items.map((task) => {
                if (task.id === task_id)
                  return {
                    ...task,
                    todos: task.todos.map((todo) => {
                      if (todo.id === todo_id)
                        return { ...todo, checked: status };
                      return todo;
                    })
                  };
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
        state.tasks = TASKS_TEMPLATE;

        // костыли
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
        //
      })
      .addCase(getTasks.pending, (state, action) => {
        state.pending = action.meta.requestStatus;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

/////////////////////////////////////////THINK ABOUT OPT////////////////////////////////////

function TaskExist(board_id: number, parsedTasks: parsedTodos[]) {
  for (let i = 0; i < parsedTasks.length; i++) {
    if (parsedTasks[i].board_id === board_id) return true;
  }
  return false;
}

function GetTodoItemsByBoardId(board_id: number, parsedTasks: parsedTodos[]) {
  const buff: TTodoCard[] = [];
  for (let i = 0; i < parsedTasks.length; i++) {
    if (parsedTasks[i].board_id === board_id)
      buff.push(parsedTasks[i].todo_inf);
  }
  return buff;
}

/////////////////////////////////////////THINK ABOUT OPT////////////////////////////////////

export const {
  addingNewTaskStatus,
  // addingNewTask,
  newTasks,
  showMoreTaskCard,
  setTodoDone,
  dropCardHandler
} = Tasks.actions;
export default Tasks.reducer;
