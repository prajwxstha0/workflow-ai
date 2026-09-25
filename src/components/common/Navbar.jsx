import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../assets/onepiece.jpg";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/authService";

import { faArrowDown, faBell, faGear, faMoon, faSearch, faSignOut, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNotifications } from "../../context/NotificationContext";
import DashboardNotificationGrid from "./dashboardNotification/DashboardNotificationGrid";

const Navbar = () => {
  const [selected, setselected] = useState(false)
  const [profilepopup, setprofilepopup] = useState(false)
  const [togglelight, settogglelight] = useState(true)
  const [notificationpopup, setnotificationpopup] = useState(false)
  const navigate = useNavigate();

  const { user } = useAuth();
  const { unreadCount, markAllAsRead } = useNotifications();

  async function logoutuser() {
    await logout();
    navigate("/login");
  }

  const notificationRef = useRef(null);
  const handleprofileRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      (notificationRef.current &&
        !notificationRef.current.contains(event.target))
    ) {
      setnotificationpopup(false);
    }

    if(handleprofileRef.current &&
      !handleprofileRef.current.contains(event.target)) {
      setprofilepopup(false)
        }
  };

    document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="w-full top-0 sticky flex justify-between items-center gap-4 p-2 ">
      {/*search */}
      <div
        onMouseEnter={() => setselected(true)}
        onMouseLeave={() => setselected(false)}
        className={`border px-2 py-1  rounded-2xl w-40 h-10 flex items-center  md:w-70
          ${
          selected ?
          "border-indigo-500 shadow-md shadow-indigo-200" :
          " border-gray-300"
          }`}>
        <span><FontAwesomeIcon icon={faSearch} /></span>
        <input
          type="text"
          className="focus:outline-none border-none  px-2 w-30 md:w-60"
        placeholder="Search projects, tasks, people..."/>
      </div>

      {/*notification tab */}
      <div
        className="flex items-center justify-center gap-3">
        <div
          ref={notificationRef}
          className="relative border rounded px-2 py-1 hover:cursor-pointer"
          onClick={() => {
            setprofilepopup(false)
            setnotificationpopup(!notificationpopup)
          }}>
          <FontAwesomeIcon icon={faBell} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}

          {notificationpopup && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute z-99 w-90 top-10 right-0 bg-gray-100 border-none rounded-md shadow-md cursor-auto">
              <div
                className="flex justify-between p-3 border-b border-gray-300">
                <h2 className="font-medium">
                  Notifications {unreadCount > 0 && <span className="text-[12px] text-gray-500">({unreadCount} new)</span>}
                </h2>
                <button
                  type="button"
                  disabled={unreadCount === 0}
                  onClick={markAllAsRead}
                  className="cursor-pointer text-indigo-600 text-[12px] disabled:text-gray-400 disabled:cursor-default">
                  Mark all read</button>
              </div>

              <DashboardNotificationGrid onNavigate={() => setnotificationpopup(false)} />

              <button
                type="button"
                onClick={() => {
                  setnotificationpopup(false)
                  navigate("/notification")
                }}
                className="py-2 text-center w-full text-indigo-600 text-[14px] cursor-pointer hover:bg-white"
              >
                View all notifications</button>
            </div>
          )}
        </div>

        {/*toggle light mode */}
        <button
          onClick={() => settogglelight(!togglelight)}
        className="border rounded px-2 py-1">
          <FontAwesomeIcon icon={togglelight ? faMoon: faSun}/>
        </button>

        {/*profile tab */}
        <div
          ref={handleprofileRef}
          className="relative border rounded p-1 cursor-pointer flex items-center"
          onClick={() => {
            setprofilepopup(!profilepopup)
            setnotificationpopup(false)
          }}>
          <div className="flex items-center justify-center">
          <img src={profileImg} alt=""
          className="border-none rounded-full w-6 h-6"/>
            <span>{user.displayName}</span>
            </div>
          <span><FontAwesomeIcon icon={faArrowDown}/></span>
          
          {/*profile popup tab */}
          {profilepopup && (
            <div
              onClick={(e) => e.stopPropagation()}
            className="absolute z-98 items-start bg-gray-100 flex flex-col  w-50 text-[12px] right-0 top-10 border border-none rounded ">
              
              <div className="border-b border-gray-400 px-2 w-full py-2">
                <h2
                  className="text-[16px] font-medium"
                >{user.displayName}
                </h2>
                <h2>{user.email}</h2>
              </div>
              
              <Link
                className="pl-2 pr-7 py-2 w-full hover:bg-white"
                to="/profile"
              >
                <FontAwesomeIcon icon={faUser}/>
                Profile</Link>
                            
              <Link
                className="pl-2 pr-7 pb-2 w-full border-b hover:bg-white"
                to="/setting"
              >
                <FontAwesomeIcon icon={faGear}/>
                Settings</Link>

              <button
                type="button"
                className="text-red-500 pl-2 pr-7 pb-2 pt-1 w-full text-start hover:bg-red-50"
                onClick={() => {
                  logoutuser();
                }}
              >
                <FontAwesomeIcon icon={faSignOut}/>
                LogOut
              </button>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
