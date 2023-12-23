import axios from "axios";
import { UpdateTasksState } from "@/app/utils/utils";
import { TBoard } from "@/app/redux/interfaces/tasks_interfaces";

export async function RemoveTask(
  todo_card_id: number,
  tasks: TBoard[],
  board_id: number,
  current_project_id: number
) {
  const filteredArray = tasks.map((task) => {
    return {
      ...task,
      items: task.items.filter((todo) => todo.id !== todo_card_id)
    };
  });

  await axios.post("http://localhost:2000/update_tasks", {
    todo: UpdateTasksState(board_id, filteredArray, todo_card_id),
    project_id: current_project_id
  });
}
