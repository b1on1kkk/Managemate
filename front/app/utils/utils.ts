import type { Member } from "../redux/features/get_members.slice";
import axios from "axios";

import type { parsedTodos, TBoard } from "../redux/features/get_tasks.slice";

export function DevideIntoGroups(members: Member[]): [Member[], number] {
  const newArray: Member[] = [];
  let residue: number = 0;
  let counter = 0;

  for (let i = 0; i < members.length; i++) {
    counter++;
    if (counter === 5) {
      residue = members.length - i;
      break;
    }
    newArray.push(members[i]);
  }

  return [newArray, residue];
}

export function UpdateTasksState(
  new_board_id: number,
  tasks: TBoard[],
  to_change_task_id: number
) {
  const newProjectTasks: parsedTodos[] = [];

  tasks.forEach((task) => {
    task.items.forEach((todo) => {
      if (todo.id === to_change_task_id)
        newProjectTasks.push({ todo_inf: { ...todo }, board_id: new_board_id });
      else newProjectTasks.push({ todo_inf: { ...todo }, board_id: task.id });
    });
  });

  return JSON.stringify(newProjectTasks);
}

export function DoneProjectsCounter(tasks: TBoard[]) {
  let final_done = 0;
  let all_items = 0;

  tasks.forEach((task) => {
    all_items += task.items.length;

    task.items.forEach((cards) => {
      let done_counter = 0;
      const todos_length = cards.todos.length;

      cards.todos.forEach((todo) => {
        if (todo.checked) done_counter++;
      });

      if (done_counter === todos_length) final_done++;
    });
  });

  return ((final_done * 100) / all_items).toFixed(0);
}
