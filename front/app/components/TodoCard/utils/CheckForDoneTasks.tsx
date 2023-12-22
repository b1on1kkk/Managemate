import type { TTodoCard } from "@/app/redux/interfaces/tasks_interfaces";

export function CheckForDoneTasks(
  todoCard: TTodoCard
): [totalLength: number, doneCounter: number] {
  const totalLength = todoCard.todos.length;
  let doneCounter = 0;
  todoCard.todos.forEach((todo) => {
    if (todo.checked) doneCounter += 1;
  });
  return [totalLength, doneCounter];
}
