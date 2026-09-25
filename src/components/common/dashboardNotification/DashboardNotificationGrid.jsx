import { useState } from "react";
import DashboardNotification from "./DashboardNotification";
const DashboardNotificationGrid = () => {
  const [notification, setnotification] = useState([
    { id: 1, label: "Sarah commented on Design Review", time: "2m ago" },
    { id: 2, label: "Alex assigned you a new task", time: "3h ago" },
    { id: 3, label: "Project deadline tomorrow: Mobile App", time: "1h ago" },
  ]);

  function onRemove(id) {
    setTimeout(() => {
      setnotification((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
  }

  return (
    <div>
      {notification.map((item) => (
        <DashboardNotification key={item.id} item={item} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default DashboardNotificationGrid;
