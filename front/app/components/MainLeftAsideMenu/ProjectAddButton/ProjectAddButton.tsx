"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { AppDispatch, RootState } from "@/app/redux/store";

// import { addProject } from "@/app/redux/features/projects.slice";

export default function ProjectAddButton() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [newProject, setNewProject] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>("");

  // const todoList = useSelector((state: RootState) => state.project_reducer);
  // const dispatch = useDispatch<AppDispatch>();

  // function CreateNewProject() {
  //   dispatch(
  //     addProject({
  //       id: todoList.length + 1,
  //       title: projectTitle,
  //       icon_name: "Apple",
  //       list: []
  //     })
  //   );

  //   setIsHover(!isHover);
  //   setNewProject(!newProject);
  //   setProjectTitle("");
  // }

  // console.log(todoList);

  return (
    <>
      {newProject ? (
        <div className="p-3 flex flex-col gap-3 border-2 border-dashed border-indigo-500 rounded-lg">
          <input
            type="text"
            placeholder="Enter name of the project"
            className="focus:outline-none"
            onChange={(e) => setProjectTitle(e.target.value)}
            value={projectTitle}
          />

          <div className="flex justify-end gap-2 text-sm">
            <button
              className={`px-2 py-1 border-1 border-green-500 rounded-lg hover:bg-green-500 transition-all duration-200 ease-in`}
              // onClick={CreateNewProject}
            >
              Accept
            </button>
            <button
              className={`px-2 py-1 border-1 border-red-500 rounded-lg hover:bg-red-500 transition-all duration-200 ease-in`}
              onClick={() => {
                setIsHover(!isHover);
                setNewProject(!newProject);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className="border-2 border-dashed flex items-center gap-2 justify-center py-3 rounded-lg border-indigo-500 hover:bg-indigo-300 transition-all duration-200 ease-in cursor-pointer"
          onMouseEnter={() => setIsHover(!isHover)}
          onMouseLeave={() => setIsHover(!isHover)}
          onClick={() => setNewProject(!newProject)}
        >
          <div>
            <Plus
              width={16}
              height={16}
              color={isHover ? "white" : "rgb(99 102 241)"}
            />
          </div>
          <span
            className={` font-semibold ${
              isHover ? "text-white" : "text-indigo-500"
            }`}
          >
            Add Project
          </span>
        </button>
      )}
    </>
  );
}
