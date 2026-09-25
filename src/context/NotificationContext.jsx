import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

const MAX_NOTIFICATIONS = 100;
const TOAST_DURATION = 4000;

// Supported notification types: "task" | "comment" | "deadline" | "success" | "system"
const storageKey = (uid) => `workflow-ai:notifications:${uid}`;

function loadNotifications(uid) {
  if (!uid) return [];
  try {
    const raw = localStorage.getItem(storageKey(uid));
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted storage - start fresh
  }
  // First visit for this user: seed with a welcome notification
  return [
    {
      id: `welcome-${Date.now()}`,
      type: "system",
      title: "Welcome to WorkFlow AI 🎉",
      message: "You'll see updates about your tasks and deadlines here.",
      link: "/dashboard",
      read: false,
      createdAt: Date.now(),
    },
  ];
}

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [notifications, setNotifications] = useState(() => loadNotifications(uid));
  const [toasts, setToasts] = useState([]);
  const [now, setNow] = useState(() => Date.now());
  const [loadedFor, setLoadedFor] = useState(uid);
  const toastTimers = useRef({});

  // Reload when the signed-in user changes (adjusting state during render)
  if (loadedFor !== uid) {
    setLoadedFor(uid);
    setNotifications(loadNotifications(uid));
    setToasts([]);
  }

  // Persist per user
  useEffect(() => {
    if (!uid || loadedFor !== uid) return;
    localStorage.setItem(storageKey(uid), JSON.stringify(notifications));
  }, [notifications, uid, loadedFor]);

  // Sync across browser tabs
  useEffect(() => {
    if (!uid) return;
    const onStorage = (e) => {
      if (e.key === storageKey(uid)) setNotifications(loadNotifications(uid));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [uid]);

  // Tick every 30s so relative times ("2m ago") stay fresh
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // Clean up toast timers on unmount
  useEffect(() => {
    const timers = toastTimers.current;
    return () => Object.values(timers).forEach(clearTimeout);
  }, []);

  const dismissToast = useCallback((id) => {
    clearTimeout(toastTimers.current[id]);
    delete toastTimers.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addNotification = useCallback(
    ({ type = "system", title, message = "", link = null, toast = true, browser = false }) => {
      const notification = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        title,
        message,
        link,
        read: false,
        createdAt: Date.now(),
      };

      setNotifications((prev) => [notification, ...prev].slice(0, MAX_NOTIFICATIONS));

      if (toast) {
        setToasts((prev) => [...prev, notification].slice(-4));
        toastTimers.current[notification.id] = setTimeout(
          () => dismissToast(notification.id),
          TOAST_DURATION,
        );
      }

      // Native browser notification when the tab is in the background
      if (
        browser &&
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.hidden
      ) {
        new Notification(title, { body: message });
      }

      return notification.id;
    },
    [dismissToast],
  );

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAsUnread = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: false } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => (n.read ? n : { ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const requestBrowserPermission = useCallback(async () => {
    if (!("Notification" in window)) return "unsupported";
    if (Notification.permission !== "default") return Notification.permission;
    return Notification.requestPermission();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const value = {
    notifications,
    unreadCount,
    toasts,
    now,
    addNotification,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    removeNotification,
    clearAll,
    dismissToast,
    requestBrowserPermission,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside <NotificationProvider>");
  return ctx;
}
