import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <ul className="space-y-4">
        <li className="hover:bg-blue-500 p-2 rounded">Dashboard</li>
        <li className="hover:bg-blue-500 p-2 rounded">My Courses</li>
        <li className="hover:bg-blue-500 p-2 rounded">Messages</li>
        <li className="hover:bg-blue-500 p-2 rounded">Reports</li>
        <li className="hover:bg-blue-500 p-2 rounded">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;