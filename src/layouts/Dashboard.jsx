import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { VscListSelection, VscHome, VscTable, VscVerified } from "react-icons/vsc";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        <Outlet />
        <p className="text-5xl">outlet content here</p>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base space-y-3">
          <p className="text-center text-3xl font-medium">{user?.displayName}</p>
          <p className="text-center pb-8">{user?.email}</p>
          <li>
            <NavLink
              to="/dashboard/"
              className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
            >
            <VscListSelection size={24} className="mr-3" />  My Selected Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/asdf"
              className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
            >
            <VscVerified size={24} className="mr-3" />  My Enrolled Classes
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
            >
            <VscHome size={24} className="mr-3" />  Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allClasses"
              className={({ isActive }) => (isActive ? "bg-gray-300" : "")}
            >
            <VscTable size={24} className="mr-3" />  Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
