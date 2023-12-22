import type { parsedTodos } from "../interfaces/tasks_interfaces";
import type { TTodoCard } from "../interfaces/tasks_interfaces";

export function TaskExist(board_id: number, parsedTasks: parsedTodos[]) {
  for (let i = 0; i < parsedTasks.length; i++) {
    if (parsedTasks[i].board_id === board_id) return true;
  }
  return false;
}

export function GetTodoItemsByBoardId(
  board_id: number,
  parsedTasks: parsedTodos[]
) {
  const buff: TTodoCard[] = [];
  for (let i = 0; i < parsedTasks.length; i++) {
    if (parsedTasks[i].board_id === board_id)
      buff.push(parsedTasks[i].todo_inf);
  }
  return buff;
}
