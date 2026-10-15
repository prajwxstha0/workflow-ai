import { createContext, useContext, useEffect, useState } from "react";
import {
  createActivites,
  subscribetoActivity,
} from "../services/activityService";
import { useAuth } from "./AuthContext";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    if (!user) {
      setActivity([]);
      return;
    }
    setLoading(true);

    const unsubscribe = subscribetoActivity(
      (activity) => {
        setActivity(activity);
        console.log(activity);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [user]);

  const addActivity = async (info) => {
    if (!user) return;
    setLoading(true);

    try {
      await createActivites(user.displayName, info);
    } catch (error) {
      console.error("Failed to create activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActivityContext.Provider value={{ activity, loading, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export function useActivity() {
  return useContext(ActivityContext);
}

export default ActivityContext;
