import Icon from "../Icon/Icon";

import Link from "next/link";

export default function Header() {
  return (
    <header className="h-24 border-b-1 px-9 py-6 flex">
      <div className="flex-1 flex items-center">
        <div className="flex bg-gray-100 px-2 py-3 gap-4 rounded-lg w-80">
          <Icon icon_name="Search" />
          <div>
            <input
              type="text"
              className="bg-gray-100 focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 items-center ml-5">
        <div>
          <Icon icon_name="Settings" />
        </div>
        <div>
          <Icon icon_name="Bell" />
        </div>
        <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
        <div>Username</div>
      </div>

      <div>
        <Link href={"/registration"}>
          <button>Sign up!</button>
        </Link>
      </div>
    </header>
  );
}
