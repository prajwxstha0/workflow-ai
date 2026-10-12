import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTask } from "../../../context/TaskContext";

const TodaysTasks = ({ id, title, priority, done }) => {
  const { deleteTask, updateTask } = useTask();
  const priorityleveltext = {
    high: "text-red-600",
    medium: "text-amber-600",
    low: "text-green-600",
  };

  const prioritylevelbg = {
    high: "bg-red-100",
    medium: "bg-amber-100",
    low: "bg-green-100",
  };
  return (
    <div
      className={`${done ? "bg-gray-200" : ""} flex border border-gray-200 w-full rounded py-2 pl-4 gap-3 `}
    >
      <span
        className={`cursor-pointer ${done ? "text-green-400" : "text-gray-300"}`}
        onClick={(e) => {
          updateTask(id, { done: !done });
        }}
      >
        {done ? (
          <FontAwesomeIcon icon={faCircleCheck} />
        ) : (
          <FontAwesomeIcon icon={faCircle} />
        )}
      </span>

      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col text-start">
          <h2
            className={`${done ? "line-through text-gray-400" : ""} font-normal`}
          >
            {title}
          </h2>
          <span
            className={`text-[10px] font-bold rounded-2xl w-fit px-2 ${priorityleveltext[priority]} ${prioritylevelbg[priority]}`}
          >
            {priority}
          </span>
        </div>

        <button
          className="pr-2"
          onClick={(e) => {
            deleteTask(id);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default TodaysTasks;
