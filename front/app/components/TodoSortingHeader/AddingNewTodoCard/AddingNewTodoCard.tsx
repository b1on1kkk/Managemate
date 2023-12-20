import { useReducer, useState } from "react";

// components
import Input from "../Input/Input";
import Todos from "./Todos/Todos";
import ValidityError from "./ValidityError/ValidityError";
import InputWrapper from "./InputWrapper/InputWrapper";
//

// redux
import { addingNewTask } from "@/app/redux/features/get_tasks.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
//

// utils
import {
  NewTodoCardKind,
  NewTodoCardReducer
} from "./InputsReducer/InputsReducer";
import { ProfileValidityReducer } from "./InputsReducer/ValitityReducer";
import { HTAG_TODOCARD_COLORS } from "@/constants/HtagTodoCardColors";
import type { TTodo } from "@/app/redux/features/get_tasks.slice";
import { addingNewTaskStatus } from "@/app/redux/features/get_tasks.slice";
import { TodoCardsCounter } from "./utils/TodoCardsCounter";
//

export default function AddingNewTodoCard({ board_id }: { board_id: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const idx = TodoCardsCounter(tasks);

  const [newTodoCard, setNewTodoCard] = useReducer(NewTodoCardReducer, {
    htag_color: "bg-gray-200",
    htag_task: "",
    max_htag_length: 10,
    title: "",
    short_bio: "",
    todo_title: ""
  });
  const [newTodoCardValidity, setNewTodoCardValidity] = useReducer(
    ProfileValidityReducer,
    {
      htag_task: false,
      title: false,
      short_bio: false
    }
  );

  // todo handlers
  const [todos, setTodos] = useState<TTodo[]>([]);
  function CheckedTodo(id: number, status: boolean) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, checked: status };
        return todo;
      })
    );
  }
  function AddingTodo() {
    setTodos([
      ...todos,
      {
        id: todos.length,
        checked: false,
        text: newTodoCard.todo_title
      }
    ]);
  }
  function DeleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  //

  function AddNewTodoCard() {
    if (
      !Object.values(newTodoCardValidity).includes(true) &&
      todos.length > 0
    ) {
      dispatch(
        addingNewTask({
          id: board_id,
          todo: {
            id: idx,
            sub_title: newTodoCard.htag_task,
            title: newTodoCard.title,
            about: newTodoCard.short_bio,
            htag_color: newTodoCard.htag_color,
            todos: todos
          }
        })
      );
    }
  }

  return (
    <div className="p-4 bg-white rounded-md my-5 flex flex-col gap-3 border-1">
      <div className="flex items-center justify-between">
        <div>
          <div
            className={`px-4 py-2 ${newTodoCard.htag_color} rounded-full flex items-center transition-colors duration-200`}
          >
            <Input
              maxInputLength={10}
              styles={`focus:outline-none ${
                newTodoCard.htag_color !== "bg-gray-200"
                  ? `${newTodoCard.htag_color} text-white placeholder:text-white`
                  : "bg-gray-200"
              } max-w-25 placeholder:text-sm transition-colors duration-200`}
              value={newTodoCard.htag_task}
              placeholder="Enter #-task"
              cb={(e) =>
                setNewTodoCard({
                  type: NewTodoCardKind.HTAG_TASK,
                  payload: e.target.value
                })
              }
              onBlur={(e) =>
                setNewTodoCardValidity({
                  payload: {
                    text: e.target.value,
                    key: "htag_task"
                  }
                })
              }
            />
            <div className="text-xs px-2 py-1 bg-white rounded-full text-center">
              {newTodoCard.max_htag_length}
            </div>
          </div>
          {newTodoCardValidity.htag_task && (
            <div className="pl-2">
              <ValidityError text="Htag can't be empty!" />
            </div>
          )}
        </div>
        {/* htag color buttons */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1 items-center">
          {HTAG_TODOCARD_COLORS.map((colors, idx) => {
            return (
              <button
                className={`w-3 h-3 ${colors} rounded-full`}
                onClick={() =>
                  setNewTodoCard({
                    type: NewTodoCardKind.HTAG_COLOR,
                    payload: colors
                  })
                }
                key={idx}
              />
            );
          })}
          {/*  */}
        </div>
      </div>

      {/* task title */}
      <InputWrapper
        status={newTodoCardValidity.title}
        text_error="Title can't be empty!"
      >
        <Input
          maxInputLength={35}
          styles="focus:outline-none bg-gray-200 w-full"
          value={newTodoCard.title}
          placeholder="Title of the task"
          cb={(e) =>
            setNewTodoCard({
              type: NewTodoCardKind.TITLE,
              payload: e.target.value
            })
          }
          onBlur={(e) =>
            setNewTodoCardValidity({
              payload: {
                text: e.target.value,
                key: "title"
              }
            })
          }
        />
      </InputWrapper>
      {/*  */}

      {/* short bio */}
      <InputWrapper
        status={newTodoCardValidity.short_bio}
        text_error="Bio can't be empty!"
      >
        <textarea
          name="about_task"
          id="about_task"
          rows={3}
          className="resize-none focus:outline-none w-full bg-gray-200"
          placeholder="Write a short bio about the task"
          onChange={(e) =>
            setNewTodoCard({
              type: NewTodoCardKind.SHORT_BIO,
              payload: e.target.value
            })
          }
          value={newTodoCard.short_bio}
          onBlur={(e) =>
            setNewTodoCardValidity({
              payload: {
                text: e.target.value,
                key: "short_bio"
              }
            })
          }
        />
      </InputWrapper>
      {/*  */}

      {/* todos */}
      <div className="mt-5 flex flex-col gap-2 h-24 overflow-auto">
        {todos.map((todo, idx) => {
          return (
            <Todos
              todo={todo}
              checkedCB={(id, status) => CheckedTodo(id, status)}
              deleteCB={(id) => DeleteTodo(id)}
              key={idx}
            />
          );
        })}
      </div>
      <>
        <div className="px-3 py-2 bg-gray-200 rounded-lg">
          <Input
            maxInputLength={35}
            styles="focus:outline-none bg-gray-200 w-full"
            value={newTodoCard.todo_title}
            placeholder="Enter ToDo title"
            cb={(e) =>
              setNewTodoCard({
                type: NewTodoCardKind.TODO_TITLE,
                payload: e.target.value
              })
            }
          />
        </div>
        <button
          className="text-sm w-full py-2 mt-3 border-1 rounded-lg border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-200 ease-in font-semibold"
          onClick={() => {
            AddingTodo();
            setNewTodoCard({
              type: NewTodoCardKind.TODO_TITLE,
              payload: ""
            });
          }}
        >
          Add ToDo
        </button>
      </>
      {/*  */}

      {/* save or cancel changes  */}
      <div className="mt-5 flex gap-3">
        <button
          className="w-full py-2 border-1 rounded-lg border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 ease-in font-semibold flex-1"
          onClick={AddNewTodoCard}
        >
          Save
        </button>
        <button
          className="text-center border-red-500 text-red-500 border-1 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 ease-in font-semibold flex-1"
          onClick={() =>
            dispatch(addingNewTaskStatus({ id: board_id, status: false }))
          }
        >
          Cancel
        </button>
      </div>
      {/*  */}
    </div>
  );
}
