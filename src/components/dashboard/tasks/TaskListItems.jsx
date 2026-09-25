import { useTask } from "../../../context/TaskContext";
import TodaysTasks from "./TodaysTasks";

const TaskListItems = () => {
  const { task } = useTask();

  return (
    <div className="h-100 overflow-y-auto flex flex-col gap-3 bg-white rounded-2xl items-start px-4 py-6">
      <h1 className="font-bold">{"Today's Task"}</h1>
      <div className="w-full flex flex-col gap-5 h-full">
        {task.length === 0 && <span className="text-red-400">No task yet</span>}

        {task.map((item) => (
          <TodaysTasks
            key={item.title}
            title={item.title}
            priority={item.priority}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskListItems;
