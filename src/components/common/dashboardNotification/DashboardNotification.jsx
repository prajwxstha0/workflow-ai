import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const DashboardNotification = ({ item, onRemove }) => {
  const { id, label, time } = item;
  const [toggleMark, settoggleMark] = useState(true);

  return (
    <div
      onClick={(e) => {
        settoggleMark(false);
        onRemove(id);
      }}
      className="flex gap-3 py-2 border-b border-gray-300 pl-3 pr-2 hover:bg-white"
    >
      <span className={`text-blue-300 ${toggleMark ? "block" : "invisible"}`}>
        <FontAwesomeIcon icon={faDotCircle} />
      </span>

      <div className="flex flex-col">
        <span className="font-semibold text-[14px]">{label}</span>
        <span className="text-gray-400 text-[10px]">{time}</span>
      </div>
    </div>
  );
};
export default DashboardNotification;
