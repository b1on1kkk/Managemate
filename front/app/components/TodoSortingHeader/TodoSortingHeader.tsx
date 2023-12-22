"use client";

// components
import AddingNewTodoCard from "./AddingNewTodoCard/AddingNewTodoCard";
import { MoreVertical, Plus } from "lucide-react";
//

// redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { addingNewTaskStatus } from "@/app/redux/features/get_tasks.slice";
//

import type { TBoard } from "@/app/redux/interfaces/tasks_interfaces";

export default function TodoSortingHeader({ board }: { board: TBoard }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header>
      <div className="flex items-center font-semibold gap-3 text-lg">
        <div className="h-2 w-2 bg-red-400 rounded-full" />
        <div>{board.title}</div>
        <div className="flex-1">
          <span className="bg-white px-4 py-1 text-xs rounded-full flex-1">
            {board.items.length}
          </span>
        </div>
        <MoreVertical width={22} height={22} />
      </div>

      {board.open_add_modal ? (
        <AddingNewTodoCard board_id={board.id} />
      ) : (
        <button
          className="p-3 bg-white text-sm font-semibold text-indigo-500 flex items-center justify-center my-5 rounded-md border-1 gap-1 hover:bg-gray-200 hover:shadow-md transition-all duration-200 ease-in w-full"
          onClick={() =>
            dispatch(
              addingNewTaskStatus({
                id: board.id,
                status: !board.open_add_modal
              })
            )
          }
        >
          <Plus width={18} height={18} />
          <span>Add New Task</span>
        </button>
      )}
    </header>
  );
}
