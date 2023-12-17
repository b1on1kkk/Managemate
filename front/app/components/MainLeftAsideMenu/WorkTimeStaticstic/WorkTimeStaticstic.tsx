import MenuTitle from "../MenuTitle/MenuTitle";
import { TrendingUp } from "lucide-react";

export default function WorkTimeStaticstic() {
  return (
    <div>
      <MenuTitle>Time</MenuTitle>

      <div className="flex gap-5 p-4 flex-col border-1 rounded-lg mt-3">
        <div className="text-sm text-gray-400">TOTAL HOURS</div>
        <div className="text-2xl font-semibold">23.7 hours</div>
        <div className="text-sm flex items-center gap-2 text-gray-400">
          <TrendingUp color="rgb(34 197 94)" />
          <span className="text-green-500">2.5%</span> from last week
        </div>
      </div>
    </div>
  );
}
