import { MoreVertical, ListChecks } from "lucide-react";

import type { TTodoCard } from "@/app/redux/features/get_tasks.slice";

// utils
import { TODO_CARD_FOOTER_ICONS } from "@/constants/TodoCardFooterIcons";
//

export default function TodoCard({ todoCard }: { todoCard: TTodoCard }) {
  const fakeArray = new Array(4).fill(0);

  return (
    <div className="bg-white border-1 rounded-md">
      <div className="p-4 border-b-1">
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

          <div>
            <MoreVertical width={22} height={22} />
          </div>
        </div>
        {/*  */}

        {/* main */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-lg">{todoCard.title}</div>
          <div className="text-xs h-12 overflow-hidden text-gray-400">
            {todoCard.about}
          </div>
          <div>
            <div className="inline-flex p-2 text-sm border-1 rounded-lg gap-3">
              <ListChecks width={20} height={20} color="rgb(156 163 175)" />
              <span className="text-gray-400">0/8</span>
            </div>
          </div>
        </div>
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

        <div className="flex text-base text-gray-400 gap-2">
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
