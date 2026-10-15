import { useActivity } from "../../../context/ActivityContext";
import TeamActivity from "./TeamActivity";

const ActivityItem = () => {
  const { activity, loading } = useActivity();

  return (
    <div className="h-100 border-none bg-white rounded-2xl overflow-auto">
      <div className="flex justify-between px-4">
        <h2>Team Activity</h2>
        <p>Today</p>
      </div>

      <div className="mt-3">
        {loading && <span>Loading...</span>}
        {activity.length === 0 && (
          <span className="text-red-500">No activity available</span>
        )}
      </div>

      <div className="overflow-auto flex flex-col gap-3">
        {activity.map((item) => (
          <TeamActivity
            key={item.id}
            ownername={item.activityOwner}
            time={item.createdAt}
            action={item.info}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityItem;
