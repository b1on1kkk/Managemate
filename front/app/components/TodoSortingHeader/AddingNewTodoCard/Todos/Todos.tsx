import { BadgeCheck, Trash } from "lucide-react";

import { TTodo } from "@/app/redux/features/get_tasks.slice";

export default function Todos({
  todo,
  checkedCB,
  deleteCB,
  in_task
}: {
  todo: TTodo;
  checkedCB: (id: number, status: boolean) => void;
  deleteCB?: (id: number) => void;
  in_task?: boolean;
}) {
  return (
    <div
      className={`py-2 px-3 ${
        todo.checked ? "bg-green-400" : "bg-gray-200"
      } rounded-lg flex items-center gap-2`}
    >
      <span
        className={`flex-1 font-semibold ${todo.checked ? "line-through" : ""}`}
      >
        {todo.text}
      </span>
      <button onClick={() => checkedCB(todo.id, !todo.checked)}>
        <BadgeCheck
          width={20}
          height={20}
          className="opacity-50 hover:opacity-100"
        />
      </button>

      {!in_task && deleteCB && (
        <button onClick={() => deleteCB(todo.id)}>
          <Trash
            width={20}
            height={20}
            className="opacity-50 hover:opacity-100"
          />
        </button>
      )}
    </div>
  );
}
