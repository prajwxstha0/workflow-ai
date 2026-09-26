import { useState } from "react";
import GreatingHeaderGird from "../components/dashboard/GreatingHeaderGird";
import StateCardGrid from "../components/dashboard/StateCardGrid";
import TestNewTask from "../components/dashboard/TestNewTask";
import ActivityItem from "../components/dashboard/activity/ActivityItem";
import TaskCompletion from "../components/dashboard/charts/TaskCompletion";
import WeeklyProduction from "../components/dashboard/charts/WeeklyProduction";
import DeadlineItem from "../components/dashboard/deadlines/DeadlineItem";
import ProjectProgressItems from "../components/dashboard/projects/ProjectProgressItems";
import TaskListItems from "../components/dashboard/tasks/TaskListItems";

const DashBoard = () => {
  const [showTaskForm, setshowTaskForm] = useState(false);

  const handleSaveTask = () => {
    setshowTaskForm(false);
  };

  return (
    <div className="">
      {/**Greating Header */}
      <GreatingHeaderGird onCreateTask={setshowTaskForm} />
      {showTaskForm && (
        <div className="inset-0 backdrop-blur-xs absolute z-50 items-center flex flex-col w-full top-15  text-white">
          <TestNewTask onSaveTask={handleSaveTask} />
          <button
            className="border border-black text-black cursor-pointer  rounded-2xl mt-3 p-2 hover:bg-red-500 hover:text-white hover:border-none"
            onClick={() => setshowTaskForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/**State Card */}
      <StateCardGrid />

      <div className="gap-5 px-8 mb-6  overflow-y-visible grid text-center w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <TaskCompletion />
        <WeeklyProduction />
        <TaskListItems />
      </div>

      <div className="px-8 mb-6 overflow-y-visible grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <ProjectProgressItems />
        <ActivityItem />
        <DeadlineItem />
      </div>
    </div>
  );
};

export default DashBoard;
