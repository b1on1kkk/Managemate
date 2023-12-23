"use client";
import { useState } from "react";
import axios from "axios";

// components
import TodoCard from "@/app/components/TodoCard/TodoCard";
import TodoSortingHeader from "@/app/components/TodoSortingHeader/TodoSortingHeader";
//

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import type { TBoard } from "@/app/redux/interfaces/tasks_interfaces";
import type { TTodoCard } from "@/app/redux/interfaces/tasks_interfaces";
import {
  dropCardHandler,
  getTasks
} from "@/app/redux/features/get_tasks.slice";
//

// utils
import { UpdateTasksState } from "@/app/utils/utils";
//

export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const current_project_id = useSelector(
    (state: RootState) => state.service.project?.chosen_project
  );

  const [currentBoard, setCurrentBoard] = useState<TBoard>();
  const [currentItem, setCurrentItem] = useState<TTodoCard>();

  function DragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function DragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    board: TBoard,
    item: TTodoCard
  ) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  async function DropCardHandler(
    e: React.DragEvent<HTMLDivElement>,
    board: TBoard
  ) {
    e.preventDefault();
    if (currentItem && currentBoard) {
      dispatch(
        dropCardHandler({
          toAddBoard: board,
          currentItem: currentItem,
          currentBoard: currentBoard
        })
      );

      console.log(
        JSON.parse(UpdateTasksState(board.id, tasks, currentItem.id))
      );

      await axios.post("http://localhost:2000/update_tasks", {
        todo: UpdateTasksState(board.id, tasks, currentItem.id),
        project_id: current_project_id
      });

      dispatch(getTasks(current_project_id!));
    }
  }

  return (
    <div className="flex p-8 gap-6 overflow-auto h-full">
      {tasks.map((board, idx) => {
        return (
          <div
            className="flex-1"
            key={idx}
            onDragOver={(e) => DragOverHandler(e)}
            onDrop={(e) => DropCardHandler(e, board)}
          >
            <TodoSortingHeader board={board} />
            <main className="flex flex-col gap-5">
              {board.items.map((todo, todo_idx) => {
                return (
                  <div
                    key={todo_idx}
                    draggable={true}
                    onDragOver={(e) => DragOverHandler(e)}
                    onDragStart={(e) => DragStartHandler(e, board, todo)}
                  >
                    <TodoCard todoCard={todo} board_id={board.id} />
                  </div>
                );
              })}
            </main>
          </div>
        );
      })}
    </div>
  );
}
