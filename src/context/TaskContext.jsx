import { createContext, useContext, useEffect, useState } from "react";
import {
  createTask,
  deleteTaskById,
  subscribetoTasks,
  updateTaskById,
} from "../services/taskService";
import { useActivity } from "./ActivityContext";
import { useAuth } from "./AuthContext";

const createTaskContext = createContext();

const TaskContext = ({ children }) => {
  const { user } = useAuth();
  const [task, settask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState("Task is deleted");
  const { addActivity } = useActivity();

  const clearError = () => {
    setError("");
  };

  useEffect(() => {
    if (!user) {
      settask([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribetoTasks(
      user.uid,
      (task) => {
        settask(task);
        setLoading(false);
      },
      (err) => {
        console.log("error in data fetching");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const addTask = async (taskData) => {
    await createTask(user.uid, taskData);
    addActivity("created a new Task");
    setLoading(false);
  };

  const deleteTask = async (taskId, errmessage) => {
    try {
      setError("");
      if (!user) {
        throw new Error("You must be logged in to delete a task");
      }

      await deleteTaskById(taskId, user.uid);
      setPopup();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateTask = (taskId, changes) => {
    updateTaskById(taskId, changes);
  };

  const taskCount = () => {
    const totalTask = task.length;
    const compeleteTask = task.filter((task) => task.done === true).length;
    return {
      totalTask,
      compeleteTask,
    };
  };

  // Get total and completed tasks for a project
  const getProjectTaskCount = (projectId) => {
    const projectTasks = task.filter((task) => task.projectId === projectId);

    const totalTasks = projectTasks.length;

    const completeTasks = projectTasks.filter(
      (task) => task.done === true,
    ).length;

    return {
      totalTasks,
      completeTasks,
    };
  };

  return (
    <createTaskContext.Provider
      value={{
        task,
        loading,
        error,
        clearError,
        popup,
        addTask,
        deleteTask,
        updateTask,
        getProjectTaskCount,
        taskCount,
      }}
    >
      {children}
    </createTaskContext.Provider>
  );
};

export function useTask() {
  return useContext(createTaskContext);
}
export default TaskContext;
