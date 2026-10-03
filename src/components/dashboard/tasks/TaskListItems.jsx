import { useTask } from "../../../context/TaskContext";
import TodaysTasks from "./TodaysTasks";

const TaskListItems = ({ setShowTaskForm }) => {
  const { task } = useTask();

  return (
    <div className="h-100 overflow-y-auto flex flex-col gap-3 bg-white rounded-2xl items-start px-4 py-6">
      <div className="flex w-full justify-between items-center pb-2">
        <h1 className="font-bold">{"Today's Task"}</h1>
        <button
          className="rounded-2xl border p-2"
          onClick={() => setShowTaskForm(true)}
        >
          Add Task
        </button>
      </div>
      <div className="w-full flex flex-col gap-5 h-full">
        {task.length === 0 && <span className="text-red-400">No task yet</span>}

        {task.map((item) => (
          <TodaysTasks
            key={item.title}
            title={item.title}
            priority={item.priority}
            project={item.project}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskListItems;
