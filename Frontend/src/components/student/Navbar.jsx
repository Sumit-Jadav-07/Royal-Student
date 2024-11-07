import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import RoyalLogo from "../../assets/images/logo_white-1.png";

const Navbar = ({
  onSearch,
  searchResults,
  onStudentSelect,
  showDropdown,
  onAddStudentClick,
}) => {
  return (
    <>
      <div className="h-auto flex items-center justify-between bg-[#00b4d8] p-3 transition-all duration-150 ease-linear">
        <div className="pl-10 w-44">
          <img src={RoyalLogo} alt="Logo" className="h-12 cursor-pointer" />
        </div>

        <div className="relative md:flex md:w-[30%] items-center lg:w-[50%] hidden">
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

        <div className="md:pr-10 ">
          <button
            onClick={onAddStudentClick}
            className="bg-[#caf0f8] p-2 rounded-full text-[15px] pl-7 pr-7 text-black"
          >
            Add Student
          </button>
        </div>
      </div>

      <div className="relative flex items-center w-full mt-3 md:hidden">
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
    </>
  );
};

export default Navbar;
