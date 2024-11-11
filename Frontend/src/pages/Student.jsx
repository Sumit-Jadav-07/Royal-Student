import { useState } from "react";
import Navbar from "../components/student/Navbar";
import StudentDetails from "../components/student/StudentDetails";
import AddStudent from "../components/student/AddStudent";

function Student() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      setShowDropdown(false); // Hide dropdown if no query
      return;
    }

    try {
      setLoading(true);

      // Retrieve token from storage
      const token =
        localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

      const response = await fetch(
        `http://localhost:1218/api/private/admin/getStudentByName?characters=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
          credentials: "include",
        }
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
      const token =
        localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

      const response = await fetch(
        `http://localhost:1218/api/private/admin/getStudentById/${studentId}`,
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

  const toggleAddStudentModal = () => {
    setShowAddStudentModal(!showAddStudentModal); // Toggle modal visibility
  };

  return (
    <div className="font-metropolis flex flex-col lg:h-screen md:h-[100%] overflow-hidden w-full bg-[#90e0ef] relative scrollbar-hidden">
      <Navbar
        onSearch={handleSearch}
        searchResults={searchResults}
        onStudentSelect={handleStudentSelect}
        showDropdown={showDropdown} // Pass the state to Navbar
        onAddStudentClick={toggleAddStudentModal}
      />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}

      <StudentDetails student={selectedStudent} />

      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddStudent onClosed={() => setShowAddStudentModal(false)} />
        </div>
      )}
    </div>
  );
}

export default Student;
