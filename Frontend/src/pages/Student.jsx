import { useState } from "react";
import Navbar from "../components/student/Navbar";
import StudentDetails from "../components/student/StudentDetails";

function Student() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      setShowDropdown(false); // Hide dropdown if no query
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:1218/api/public/admin/getStudentByName?characters=${query}`
      );

      const data = await response.json();
      console.log("Fetched data:", data);
      if (response.ok) {
        setSearchResults(data);
        setShowDropdown(true); // Show dropdown when search results are available
      } else {
        setError("No results found");
        setShowDropdown(false); // Hide dropdown if no results
      }
    } catch (err) {
      setError("Error fetching student");
      setShowDropdown(false); // Hide dropdown on error
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:1218/api/public/admin/getStudentById/${studentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Student Details:", data);
        setSelectedStudent(data); // Set student data
        setShowDropdown(false); // Hide dropdown after selecting a student
      } else {
        console.log("Error fetching student details:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const handleStudentSelect = (studentId) => {
    fetchStudentDetails(studentId);
  };

  return (
    <div className="font-metropolis flex flex-col h-screen w-full bg-[#90e0ef]">
      <Navbar
        onSearch={handleSearch}
        searchResults={searchResults}
        onStudentSelect={handleStudentSelect}
        showDropdown={showDropdown} // Pass the state to Navbar
      />
      <StudentDetails student={selectedStudent} />
    </div>
  );
}

export default Student;