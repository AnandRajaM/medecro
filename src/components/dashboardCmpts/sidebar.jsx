import React from "react";

const TestSchedule = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full md:w-1/3 mt-6 md:mt-0">
      <h3 className="text-lg font-semibold mb-4">Test Schedule</h3>
      <ul>
        <li className="mb-2">
          <p className="font-bold">React Test</p>
          <p>Jan 2nd 2023, 2pm to 4pm</p>
        </li>
        <li className="mb-2">
          <p className="font-bold">Web Design Test</p>
          <p>Jan 5th 2023, 10am to 12pm</p>
        </li>
        <li className="mb-2">
          <p className="font-bold">CSS Test</p>
          <p>Jan 8th 2023, 2pm to 4pm</p>
        </li>
        <li className="mb-2">
          <p className="font-bold">MongoDB Test</p>
          <p>Jan 12th 2023, 10am to 12pm</p>
        </li>
      </ul>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
        See All
      </button>
    </div>
  );
};

export default TestSchedule;
