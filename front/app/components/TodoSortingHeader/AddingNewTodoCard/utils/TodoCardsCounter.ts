import { TBoard } from "@/app/redux/features/get_tasks.slice";

export function TodoCardsCounter(tasks: TBoard[]) {
  let idx = 0;
  tasks.forEach((cards) => {
    idx += cards.items.length;
  });
  return idx;
}
