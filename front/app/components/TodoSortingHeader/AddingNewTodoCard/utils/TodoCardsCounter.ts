import type { TBoard } from "@/app/redux/interfaces/tasks_interfaces";

export function TodoCardsCounter(tasks: TBoard[]) {
  let idx = 0;
  tasks.forEach((cards) => {
    idx += cards.items.length;
  });
  return idx;
}
