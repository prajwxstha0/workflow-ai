import { faArrowLeft, faArrowRight, faBell, faCalendar, faDashboard, faMessage, faProjectDiagram, faTasks, faUserAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [collapseSideBar, setcollapseSideBar] = useState(false)
  const [toggle, settoggle] = useState(false)

  const navItem = [
    { icon: < FontAwesomeIcon icon={faDashboard}/>, label: "Dashboard", to: "/dashboard" },
    { icon: < FontAwesomeIcon icon={faProjectDiagram}/> , label: "Projects", to: "/project" },
    { label: "Tasks", to: "/tasks", icon: < FontAwesomeIcon icon={faTasks} />  },
    { label: "Calendar", to: "/calendar", icon: < FontAwesomeIcon icon={faCalendar}/> },
    { label: "Messages", to: "/messages", icon: < FontAwesomeIcon icon={faMessage}/> },
    { label: "Analytics", to: "/analytics", icon: < FontAwesomeIcon icon={faProjectDiagram}/> },
    { label: "Team", to: "/team", icon: "👥" },
    { label: "Notifications", to: "/notification", icon: <FontAwesomeIcon icon={faBell}/> },
  ];

const bottomItems = [
  { label: "Settings", to: "/settings", icon: <FontAwesomeIcon icon={faUserGear} />}, 
  { label: "Profile", to: "/profile", icon: <FontAwesomeIcon icon={faUserAlt} /> },
  { label: "Collapse", icon1:<FontAwesomeIcon icon={faArrowLeft} />, icon2:<FontAwesomeIcon icon={faArrowRight} />}
];

  return (
    <div className=" top-0 sticky py-6 flex flex-col bg-gray-150 border-r border-gray-300">
      <div className="border-b border-gray-200 pb-6 pr-6 pl-3">
        <Link to="/dashboard" className="flex gap-2 items-center text-[13px]">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white text-sm">
            ⚡
          </div>

          {!toggle && (
            <span className="font-bold text-gray-900">
            WorkFlow <span className="text-indigo-600">AI</span>
          </span>
          )}
          
        </Link>
      </div>

      <div className="flex flex-col gap-3 text-[12px] font-medium pt-5  pr-6 pl-3">
        {navItem.map((item) => (
          <Link key={item.label}
            className="p-1.5 hover:bg-gray-300 hover:text-indigo-600 hover:border-none rounded-2xl"
            to={item.to}
          >
            <div className="flex gap-3">
              <span>{item.icon}</span>

              {!toggle && (
                <span className="text-gray-500">{item.label}</span>
              )}
              
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-[12px]">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            className="flex flex-col pl-5 p-2.5 hover:bg-gray-300 hover:text-indigo-600 hover:border-none rounded-2xl"
          >
            <div
              className="flex gap-2"
              onClick={(e) => {
                if (item.label === "Collapse") {
                  settoggle(!toggle)
                }
              }}
            >
              <span>{(item.label === "Collapse") ? (toggle ? item.icon2 : item.icon1) : (item.icon)}</span>

              {!toggle && (
                <span>{item.label}</span>
              )}
              
               </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
