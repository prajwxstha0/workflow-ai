import { createContext, useContext, useState } from "react";

const createTaskContext = createContext();

const TaskContext = ({ children }) => {
  const [task, settask] = useState([]);

  const addTask = (newTask) => {
    settask((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <createTaskContext.Provider value={{ task, addTask }}>
      {children}
    </createTaskContext.Provider>
  );
};

export function useTask() {
  return useContext(createTaskContext);
}
export default TaskContext;
