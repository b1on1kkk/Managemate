import { MoreVertical, Plus } from "lucide-react";

export default function TodoSortingHeader({
  title,
  amount
}: {
  title: string;
  amount: number;
}) {
  return (
    <header>
      <div className="flex items-center font-semibold gap-3 text-lg">
        <div className="h-2 w-2 bg-red-400 rounded-full" />
        <div>{title}</div>
        <div className="flex-1">
          <span className="bg-white px-4 py-1 text-xs rounded-full flex-1">
            {amount}
          </span>
        </div>
        <MoreVertical width={22} height={22} />
      </div>

      <button className="p-3 bg-white text-sm font-semibold text-indigo-500 flex items-center justify-center my-5 rounded-md border-1 gap-1 hover:bg-gray-200 hover:shadow-md transition-all duration-200 ease-in w-full">
        <Plus width={18} height={18} />
        <span>Add New Task</span>
      </button>
    </header>
  );
}
