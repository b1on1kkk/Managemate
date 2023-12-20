"use client";
import { useState } from "react";

import TodoCard from "@/app/components/TodoCard/TodoCard";
import TodoSortingHeader from "@/app/components/TodoSortingHeader/TodoSortingHeader";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
import { newTasks } from "@/app/redux/features/get_tasks.slice";
import { TBoard, TTodoCard } from "@/app/redux/features/get_tasks.slice";
import { dropCardHandler } from "@/app/redux/features/get_tasks.slice";
//

export default function Tasks() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [currentBoard, setCurrentBoard] = useState<TBoard>();
  const [currentItem, setCurrentItem] = useState<TTodoCard>();

  function DragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function DragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {}

  function DragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    board: TBoard,
    item: TTodoCard
  ) {
    // console.log(item);

    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function DragEndHandler(e: React.DragEvent<HTMLDivElement>) {}

  function DropCardHandler(e: React.DragEvent<HTMLDivElement>, board: TBoard) {
    e.preventDefault();
    if (currentItem && currentBoard) {
      dispatch(
        dropCardHandler({
          toAddBoard: board,
          currentItem: currentItem,
          currentBoard: currentBoard
        })
      );

      // console.log(board);
      // console.log(currentItem);

      // board.items.push(currentItem);
      // const currentIndex = currentBoard.items.indexOf(currentItem);
      // currentBoard.items.splice(currentIndex, 1);

      // dispatch(
      //   newTasks(
      //     tasks.map((b) => {
      //       if (b.id === board.id) {
      //         return board;
      //       }
      //       if (b.id === currentBoard.id) {
      //         return currentBoard;
      //       }
      //       return b;
      //     })
      //   )
      // );
    }
  }

  // console.log(tasks);

  return (
    <div className="flex p-8 gap-6 overflow-auto h-full">
      {tasks.map((board, idx) => {
        // console.log(tasks);

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
                    onDragLeave={(e) => DragLeaveHandler(e)}
                    onDragStart={(e) => DragStartHandler(e, board, todo)}
                    onDragEnd={(e) => DragEndHandler(e)}
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
