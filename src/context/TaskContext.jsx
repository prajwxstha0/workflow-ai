import { createContext, useContext, useState } from "react";
import { useNotifications } from "./NotificationContext";

const createTaskContext = createContext();

const DAY_MS = 24 * 60 * 60 * 1000;

// Returns a human message if the due date is overdue / today / tomorrow, otherwise null
function getDeadlineMessage(duedate) {
  if (!duedate) return null;
  const [y, m, d] = duedate.split("-").map(Number);
  const due = new Date(y, m - 1, d).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due - today.getTime()) / DAY_MS);
  if (diffDays < 0) return "is overdue";
  if (diffDays === 0) return "is due today";
  if (diffDays === 1) return "is due tomorrow";
  return null;
}

const TaskContext = ({ children }) => {
  const [task, settask] = useState([]);
  const { addNotification } = useNotifications();

  const addTask = (newTask) => {
    settask((prevTasks) => [...prevTasks, newTask]);

    addNotification({
      type: "task",
      title: `New task created: ${newTask.title}`,
      message: [
        newTask.project && `Project: ${newTask.project}`,
        newTask.assignee && `Assigned to ${newTask.assignee}`,
        newTask.priority && `${newTask.priority} priority`,
      ]
        .filter(Boolean)
        .join(" · "),
      link: "/dashboard",
    });

    const deadline = getDeadlineMessage(newTask.duedate);
    if (deadline) {
      addNotification({
        type: "deadline",
        title: `"${newTask.title}" ${deadline}`,
        message: `Due date: ${newTask.duedate}`,
        link: "/dashboard",
        browser: true,
      });
    }
  };

  const notifyTaskCompleted = (title) => {
    addNotification({
      type: "success",
      title: `Task completed: ${title}`,
      message: "Nice work! Keep it up.",
      link: "/dashboard",
    });
  };

  return (
    <div>
      <createTaskContext.Provider value={{ task, addTask, notifyTaskCompleted }}>
        {children}
      </createTaskContext.Provider>
    </div>
  );
};

export function useTask() {
  return useContext(createTaskContext);
}
export default TaskContext;
