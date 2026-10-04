import { createContext, useContext, useState } from "react";

const createTaskContext = createContext();

const TaskContext = ({ children }) => {
  const [task, settask] = useState([
    { title: "Design new UI", priority: "high", project: "Mobile App v3" },
  ]);

  const addTask = (newTask) => {
    settask((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskTitle) => {
    // Implement delete task logic here
    settask((prevTasks) =>
      prevTasks.filter((task) => task.title !== taskTitle),
    );
  };

  return (
    <createTaskContext.Provider value={{ task, addTask, deleteTask }}>
      {children}
    </createTaskContext.Provider>
  );
};

export function useTask() {
  return useContext(createTaskContext);
}
export default TaskContext;
