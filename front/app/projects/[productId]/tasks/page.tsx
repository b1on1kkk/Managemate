import TodoCard from "@/app/components/TodoCard/TodoCard";
import TodoSortingHeader from "@/app/components/TodoSortingHeader/TodoSortingHeader";

export default function Tasks() {
  return (
    <div className="flex p-8 gap-6">
      <div className="flex-1">
        <TodoSortingHeader title="To Do" amount={3} />

        <main className="flex flex-col">
          <TodoCard />
        </main>
      </div>
      <div className="flex-1">
        <TodoSortingHeader title="In Progress" amount={2} />
        <main className="flex flex-col">
          <TodoCard />
        </main>
      </div>
      <div className="flex-1">
        <TodoSortingHeader title="Need Review" amount={1} />
        <main className="flex flex-col">
          <TodoCard />
        </main>
      </div>
      <div className="flex-1">
        <TodoSortingHeader title="Done" amount={3} />
        <main className="flex flex-col">
          <TodoCard />
        </main>
      </div>
    </div>
  );
}
