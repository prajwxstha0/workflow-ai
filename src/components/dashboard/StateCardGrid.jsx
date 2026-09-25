import {
  faClock,
  faLineChart,
  faTasks,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StateCard from "./StateCard";

const stats = [
  {
    icon: <FontAwesomeIcon icon={faTasks} />,
    iconBg: "#EEF2FF",
    label: "Tasks Today",
    value: "4/9",
    sublabel: "+2 from yesterday",
  },
  {
    icon: <FontAwesomeIcon icon={faClock} />,
    iconBg: "#ECFEFF",
    label: "Hours Logged",
    value: "6.4h",
    sublabel: "On track for 8h",
  },
  {
    icon: <FontAwesomeIcon icon={faLineChart} />,
    iconBg: "#ECFDF5",
    label: "Sprint Progress",
    value: "72%",
    sublabel: "3 days remaining",
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} />,
    iconBg: "#FFF7ED",
    label: "Team Active",
    value: "8/10",
    sublabel: "2 members offline",
  },
];

const StateCardGrid = () => {
  return (
    <div className="grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6">
      {stats.map((stat) => (
        <StateCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default StateCardGrid;
