import axios from "axios";
import { UpdateTasksState } from "@/app/utils/utils";
import { TBoard } from "@/app/redux/interfaces/tasks_interfaces";

export async function CheckDoneTask(
  id: number,
  status: boolean,
  task_id: number,
  board_id: number,
  tasks: TBoard[],
  current_project_id: number
) {
  const updatedCheckDoneTask = tasks.map((board) => {
    if (board.id === board_id) {
      return {
        ...board,
        items: board.items.map((task) => {
          if (task.id === task_id) {
            return {
              ...task,
              show_more: false,
              todos: task.todos.map((todo) => {
                if (todo.id === id) return { ...todo, checked: status };
                return todo;
              })
            };
          }
          return task;
        })
      };
    }
    return board;
  });

  await axios.post("http://localhost:2000/update_tasks", {
    todo: UpdateTasksState(board_id, updatedCheckDoneTask, task_id),
    project_id: current_project_id
  });
}
