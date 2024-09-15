import React from "react";

const CoursesTable = () => {
  const courses = [
    {
      name: "Web Design",
      level: "Advance",
      date: "2nd Jan 2023",
      status: "Completed",
    },
    {
      name: "React",
      level: "Advance",
      date: "9th April 2023",
      status: "On Going",
    },
    {
      name: "MongoDB",
      level: "Advance",
      date: "5th June 2023",
      status: "Interested",
    },
    {
      name: "Angular",
      level: "Beginner",
      date: "7th July 2023",
      status: "Interested",
    },
    {
      name: "CSS",
      level: "Intermediate",
      date: "2nd Feb 2023",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">My Courses</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Course Name</th>
            <th className="border-b-2 p-2">Level</th>
            <th className="border-b-2 p-2">Date</th>
            <th className="border-b-2 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, idx) => (
            <tr key={idx}>
              <td className="border-b p-2">{course.name}</td>
              <td className="border-b p-2">{course.level}</td>
              <td className="border-b p-2">{course.date}</td>
              <td
                className={`border-b p-2 ${
                  course.status === "Completed"
                    ? "text-green-500"
                    : course.status === "On Going"
                    ? "text-orange-500"
                    : "text-blue-500"
                }`}
              >
                {course.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;