import React from "react";

const DashboardStats = () => {
  return (
    <div className="flex space-x-4 mb-6">
      <div className="bg-white shadow rounded-lg p-4 w-1/3">
        <h3 className="text-2xl text-orange-500">2</h3>
        <p className="text-gray-600">Current Courses</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 w-1/3">
        <h3 className="text-2xl text-green-500">5</h3>
        <p className="text-gray-600">Completed Courses</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 w-1/3">
        <h3 className="text-2xl text-blue-500">10</h3>
        <p className="text-gray-600">Interested Courses</p>
      </div>
    </div>
  );
};

export default DashboardStats;