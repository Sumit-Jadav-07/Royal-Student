import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import RoyalLogo from "../../assets/images/logo_white-1.png";

const Navbar = ({ onSearch, searchResults, onStudentSelect, showDropdown }) => {
  return (
    <div className="h-[10%] flex items-center justify-between bg-[#00b4d8]">
      <div className="pl-10">
        <img src={RoyalLogo} alt="Logo" className="h-12" />
      </div>

      <div className="relative flex items-center w-[50%]">
        <div className="flex items-center w-full max-w-md mx-auto bg-white border border-gray-300 rounded-full shadow-sm">
          <div className="p-2">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-gray-700 rounded-r-full focus:outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Dropdown for search results */}
        {showDropdown && searchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 z-50">
            <ul>
              {searchResults.map((student) => (
                <li
                  key={student.studentId}
                  className="p-2 hover:bg-gray-100"
                  onClick={() => onStudentSelect(student.studentId)}
                >
                  {student.name} - {student.college}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pr-10">
        <button className="bg-[#caf0f8] p-2 rounded-full text-[15px] pl-7 pr-7 text-black">
          Add Student
        </button>
      </div>
    </div>
  );
};

export default Navbar;
