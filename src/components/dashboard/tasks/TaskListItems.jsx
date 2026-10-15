import { useEffect } from "react";
import { useTask } from "../../../context/TaskContext";
import TodaysTasks from "./TodaysTasks";

const TaskListItems = ({ setShowTaskForm }) => {
  const { task, loading, error, clearError, popup } = useTask();

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      clearError();
    }, 2000);

    return () => clearTimeout(timer);
  }, [error, clearError]);

  return (
    <div className="relative h-100 overflow-y-auto flex flex-col gap-3 bg-white rounded-2xl items-start px-4 py-6">
      <div className="flex w-full justify-between items-center pb-2">
        <h1 className="font-bold">{"Today's Task"}</h1>
        <button
          className="rounded-xl border p-2 bg-indigo-500 text-white hover:bg-indigo-600 hover:transition-colors duration-200"
          onClick={() => setShowTaskForm(true)}
        >
          Add Task
        </button>
      </div>
      <div className="w-full flex flex-col gap-5 h-full">
        {loading && <span>Loading...</span>}
        {error && (
          <p className="w-full rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {!loading && task.length === 0 && (
          <span className="text-red-400">No task yet</span>
        )}

        {task.map((item) => (
          <TodaysTasks
            key={item.id}
            id={item.id}
            title={item.title}
            priority={item.priority}
            done={item.done}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskListItems;
