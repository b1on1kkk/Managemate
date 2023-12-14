import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1 className="text-indigo-500 font-bold text-7xl mb-5">
        We Hit a Brick Wall...
      </h1>

      <div className="text-lg">
        We could not find the page you are looking for.
      </div>
      <div className="text-lg">
        Go back to{" "}
        <Link
          href={"/"}
          className="underline underline-offset-4 decoration-indigo-500 decoration-2"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
