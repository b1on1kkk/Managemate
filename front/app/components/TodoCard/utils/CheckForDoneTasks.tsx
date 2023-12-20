import { TTodoCard } from "@/app/redux/features/get_tasks.slice";

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
