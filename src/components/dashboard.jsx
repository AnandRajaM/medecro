import React from 'react';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Medical Dashboard</h2>
        <ul>
          <li className="mb-4"><a href="#" className="hover:underline">Dashboard</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">My Appointments</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Messages</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Reports</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Patient Records</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Schedule</a></li>
          <li><a href="#" className="hover:underline">Settings</a></li>
        </ul>
      </div>

      {/* Main Dashboard */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome Back, Dr. John Doe</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Appointments Today</h2>
            <p className="text-4xl font-bold text-blue-500">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <p className="text-4xl font-bold text-green-500">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Patients Under Care</h2>
            <p className="text-4xl font-bold text-red-500">12</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">My Appointments</h2>
            <a href="#" className="text-blue-500 hover:underline">See All</a>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Patient Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Jane Smith</td>
                <td className="border px-4 py-2">2nd Jan 2023</td>
                <td className="border px-4 py-2">10:00 AM</td>
                <td className="border px-4 py-2 text-green-500">Completed</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Mark Wilson</td>
                <td className="border px-4 py-2">3rd Jan 2023</td>
                <td className="border px-4 py-2">1:00 PM</td>
                <td className="border px-4 py-2 text-yellow-500">Pending</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Emily Johnson</td>
                <td className="border px-4 py-2">4th Jan 2023</td>
                <td className="border px-4 py-2">9:00 AM</td>
                <td className="border px-4 py-2 text-red-500">Canceled</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Test Schedule */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Tests/Exams</h2>
          <ul>
            <li className="mb-4">
              <p className="text-xl">COVID-19 Test</p>
              <p>5th Jan 2023, 10:00 AM - 12:00 PM</p>
            </li>
            <li className="mb-4">
              <p className="text-xl">Blood Pressure Check</p>
              <p>6th Jan 2023, 2:00 PM - 4:00 PM</p>
            </li>
            <li>
              <p className="text-xl">MRI Scan</p>
              <p>8th Jan 2023, 10:00 AM - 12:00 PM</p>
            </li>
          </ul>
          <a href="#" className="text-blue-500 hover:underline mt-4 block">See All</a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
