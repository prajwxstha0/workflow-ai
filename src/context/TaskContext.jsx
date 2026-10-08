import { createContext, useContext, useState } from "react";

const createTaskContext = createContext();

const TaskContext = ({ children }) => {
  const [task, settask] = useState([
    {
      title: "Design new UI",
      project: "Mobile App v3",
      priority: "high",
      assignee: "John Doe",
      duedate: "2023-07-15",
      tag: "UI/UX",
      description: "Design a new user interface for the mobile app.",
      done: false,
    },
    {
      title: "Implement API Gateway",
      project: "API Gateway",
      priority: "medium",
      assignee: "Jane Smith",
      duedate: "2023-07-20",
      tag: "Backend",
      description: "Implement the API Gateway for the application.",
      done: false,
    },
    {
      title: "Create Design System",
      project: "Design System",
      priority: "low",
      assignee: "Alice Johnson",
      duedate: "2023-07-25",
      tag: "UI/UX",
      description: "Create a design system for consistent UI components.",
      done: false,
    },
    {
      title: "Build Analytics Dashboard",
      project: "Analytics Dashboard",
      priority: "high",
      assignee: "Bob Brown",
      duedate: "2023-07-30",
      tag: "Frontend",
      description: "Build an analytics dashboard to visualize data.",
      done: false,
    },
  ]);

  const addTask = (newTask) => {
    settask((prevTasks) => [newTask, ...prevTasks]);
  };

  const deleteTask = (taskTitle) => {
    // Implement delete task logic here
    settask((prevTasks) =>
      prevTasks.filter((task) => task.title !== taskTitle),
    );
  };

  const updateTask = (projectTitle, done) => {
    settask((prevTasks) =>
      prevTasks.map((task) =>
        task.title === projectTitle ? { ...task, done: done.done } : task,
      ),
    );
  };

  // Get total and completed tasks for a project
  const getProjectTaskCount = (projectName) => {
    const projectTasks = task.filter((task) => task.project === projectName);

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
      value={{ task, addTask, deleteTask, updateTask, getProjectTaskCount }}
    >
      {children}
    </createTaskContext.Provider>
  );
};

export function useTask() {
  return useContext(createTaskContext);
}
export default TaskContext;
