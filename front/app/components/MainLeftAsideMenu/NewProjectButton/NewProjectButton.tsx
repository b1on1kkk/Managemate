import { Plus } from "lucide-react";

export default function NewProjectButton() {
  return (
    <div className="border-2 border-dashed flex items-center gap-2 justify-center py-3 rounded-lg border-indigo-500 hover:bg-indigo-300">
      <div>
        <Plus width={16} height={16} color="rgb(99 102 241)" />
      </div>
      <span className="text-indigo-500 font-semibold">Add Project</span>
    </div>
  );
}
