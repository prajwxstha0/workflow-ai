import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GreatingHeader = ({ userName, onCreateTask }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex justify-between px-6 mt-6">
      <div>
        <h1 className="font-bold text-2xl">Good Morning, {userName} 👋</h1>
        <span className="text-gray-500">
          {today}-You have {} tasks due today
        </span>
      </div>

      <button
        onClick={() => {
          onCreateTask(true);
        }}
        className=" flex gap-3 bg-indigo-600 rounded-md px-2 text-white cursor-pointer items-center hover:bg-indigo-700 hover:scale-102"
        type="button"
      >
        <span>
          <FontAwesomeIcon icon={faAdd} />
        </span>
        <h2>NewTask</h2>
      </button>
    </div>
  );
};

export default GreatingHeader;
