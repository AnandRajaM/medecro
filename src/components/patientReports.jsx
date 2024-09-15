import React from "react";

function PatientReports() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (optional: reuse the sidebar if needed) */}
      <div className="w-64 bg-[#5100ff] text-white p-6">
        <h2 className="text-2xl font-bold mb-8 font-aleo">Medical Dashboard</h2>
        <ul className="font-varelaround">
          <li className="mb-4">
            <a href="/talk" className="hover:underline">
              Unoistant
            </a>
          </li>
          <li className="mb-4">
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
          </li>
          {/* Add other navigation links */}
        </ul>
      </div>

      {/* Main Section */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6 font-aleo">
          Your Medical Reports
        </h1>

        {/* Reports Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 font-aleo">
            Atharv Rastogi's Report
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 font-aleo">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Test Type</th>
                <th className="px-4 py-2">Download Link</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-varelaround">
                <td className="border px-4 py-2 text-center">Atharv Rastogi</td>
                <td className="border px-4 py-2 text-center">26</td>
                <td className="border px-4 py-2 text-center">B12345</td>
                <td className="border px-4 py-2 text-center">
                  Full Body Checkup
                </td>
                <td className="border px-4 py-2 text-center">
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/unoo-45cb7.appspot.com/o/medical_report%20(1).pdf?alt=media&token=78165d10-1655-4d9c-ae44-543b17646069"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5100ff] hover:underline"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientReports;
