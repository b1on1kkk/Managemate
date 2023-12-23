"use client";

import styles from "./TodoCard.module.scss";

// components
import { ChevronDown, ListChecks, Trash } from "lucide-react";
import Todos from "../TodoSortingHeader/AddingNewTodoCard/Todos/Todos";
//

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  showMoreTaskCard,
  getTasks
} from "@/app/redux/features/get_tasks.slice";
//

// utils
import { TODO_CARD_FOOTER_ICONS } from "@/constants/TodoCardFooterIcons";
import { CheckForDoneTasks } from "./utils/CheckForDoneTasks";
import type { TTodoCard } from "@/app/redux/interfaces/tasks_interfaces";
import { RemoveTask } from "./utils/RemoveTask";
import { CheckDoneTask } from "./utils/CheckDoneTask";
//

export default function TodoCard({
  todoCard,
  board_id
}: {
  todoCard: TTodoCard;
  board_id: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const current_project_id = useSelector(
    (state: RootState) => state.service.project?.chosen_project
  );
  const fakeArray = new Array(4).fill(0);
  const [totalLength, doneCounter] = CheckForDoneTasks(todoCard);

  return (
    <div
      className={`${styles.todoCard} ${
        todoCard.show_more ? styles.todoCardExpanded : ""
      } ${totalLength === doneCounter && "border-green-500"}`}
    >
      <div className="p-4 border-b-1 flex-1">
        {/* card header */}
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <div
              className={`px-4 py-2 ${
                todoCard.htag_color !== "bg-gray-200"
                  ? `${todoCard.htag_color} text-white`
                  : `${todoCard.htag_color} text-black`
              } text-sm font-semibold rounded-full inline-block`}
            >
              {todoCard.sub_title}
            </div>
          </div>
          <button
            className="opacity-50 hover:opacity-100 transition-all duration-200 ease-in border-2 border-white hover:border-red-500 rounded-lg p-1"
            onClick={() => {
              if (current_project_id) {
                RemoveTask(todoCard.id, tasks, board_id, current_project_id);

                setTimeout(() => {
                  dispatch(getTasks(current_project_id!));
                }, 400);
              }
            }}
          >
            <Trash width={20} height={20} color="red" />
          </button>
        </div>
        {/*  */}

        {/* main */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-lg">{todoCard.title}</div>
          <div className="text-xs h-12 overflow-hidden text-gray-400">
            {todoCard.about}
          </div>
          <div className="flex items-center">
            <div className="flex-1">
              <div
                className={`inline-flex p-2 text-sm border-1 rounded-lg gap-3 font-semibold ${
                  doneCounter === totalLength
                    ? "border-green-500 text-green-500"
                    : doneCounter > 0
                    ? "bg-gray-200 text-gray-400"
                    : "text-gray-400"
                }  `}
              >
                <ListChecks
                  width={20}
                  height={20}
                  color={
                    doneCounter === totalLength
                      ? "rgb(34 197 94)"
                      : "rgb(156 163 175)"
                  }
                />
                <span>{`${doneCounter}/${totalLength}`}</span>
              </div>
            </div>

            <div>
              <button
                onClick={() =>
                  dispatch(
                    showMoreTaskCard({
                      task_id: todoCard.id,
                      board_id: board_id,
                      status: !todoCard.show_more
                    })
                  )
                }
                className={`${
                  todoCard.show_more ? "rotate-180" : ""
                } transition-all duration-200`}
              >
                <ChevronDown width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        {/*  */}

        {/* more inner todos */}
        {todoCard.show_more && (
          <div className="overflow-auto h-24 flex flex-col gap-2 mt-2">
            {todoCard.todos.map((todo, idx) => {
              return (
                <Todos
                  todo={todo}
                  checkedCB={(id, status) => {
                    if (current_project_id) {
                      CheckDoneTask(
                        id,
                        status,
                        todoCard.id,
                        board_id,
                        tasks,
                        current_project_id
                      );

                      setTimeout(() => {
                        dispatch(getTasks(current_project_id!));
                      }, 400);
                    }
                  }}
                  key={idx}
                  in_task={true}
                />
              );
            })}
          </div>
        )}
        {/*  */}
      </div>
      {/* footer */}
      <div className="p-4 flex items-center">
        <div className="flex-1 -space-x-3 flex">
          {fakeArray.map((_, idx) => {
            return (
              <div
                className="w-8 h-8 bg-gray-400 rounded-full border-1 border-white"
                key={idx}
              />
            );
          })}
        </div>

        <div className="flex text-base text-gray-400 gap-3">
          {TODO_CARD_FOOTER_ICONS.map((items, idx) => {
            return (
              <div className="flex gap-1 items-center" key={idx}>
                {items.icon}
                <span>{items.amount}</span>
              </div>
            );
          })}
        </div>
        {/*  */}
      </div>
    </div>
  );
}
