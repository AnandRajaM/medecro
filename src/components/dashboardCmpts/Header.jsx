import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search"
        className="border rounded-lg p-2 w-full max-w-sm"
      />
      <div className="flex items-center">
        <h2 className="text-xl mr-4">Welcome Back, John</h2>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;