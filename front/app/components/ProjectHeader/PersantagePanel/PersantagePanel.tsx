import MenuTitle from "../../MainLeftAsideMenu/MenuTitle/MenuTitle";

export default function PersantagePanel({ title }: { title: string }) {
  return (
    <div className="flex-1 flex gap-3">
      <div className="w-14 h-14 bg-gray-400 rounded-2xl" />
      <div className="flex flex-col justify-between">
        <MenuTitle>{title}</MenuTitle>
        <div className="flex items-center gap-6">
          <div className="w-96 h-2 bg-gray-200 rounded-full">
            <div className="w-20 h-2 bg-indigo-500 rounded-l-full" />
          </div>
          <span className="text-sm text-gray-400 font-semibold">
            13% complete
          </span>
        </div>
      </div>
    </div>
  );
}
