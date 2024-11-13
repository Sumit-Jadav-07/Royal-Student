import { useState } from "react";
import Navbar from "../components/student/Navbar";
import StudentDetails from "../components/student/StudentDetails";
import AddStudent from "../components/student/AddStudent";
import EditStudent from "../components/student/EditStudent";

function Student() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchApi = async (url, options = {}) => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error occurred");
    }
    return response.json();
  };

  const fetchSearchResults = async (query) => {
    if (!query) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchApi(
        `http://localhost:1218/api/private/admin/getStudentByName?characters=${query}`
      );
      setSearchResults(data);
      setShowDropdown(true);
    } catch (err) {
      setError(err.message);
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      setLoading(true);
      const data = await fetchApi(
        `http://localhost:1218/api/private/admin/getStudentById/${studentId}`
      );
      setSelectedStudent(data);
      setShowDropdown(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchSearchResults(query);
  };

  const handleStudentSelect = (studentId) => {
    fetchStudentDetails(studentId);
  };

  const handleEditStudent = () => {
    setShowEditStudentModal(false);
  };
  
  const toggleAddStudentModal = () => {
    setShowAddStudentModal(!showAddStudentModal); // Toggle modal visibility
  };

  const toggleEditStudentModal = () => {
    setShowEditStudentModal(!showEditStudentModal); // Toggle modal visibility
  };

  const handleRefreshAfterEdit = async () => {
    await fetchStudentDetails(selectedStudent.studentId); // Ensure `student.id` is up-to-date
    setShowEditStudentModal(false);
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

      <StudentDetails
        student={selectedStudent}
        onEditStudent={toggleEditStudentModal}
      />

      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddStudent onClosed={() => setShowAddStudentModal(false)} />
        </div>
      )}

      {showEditStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <EditStudent
            onClosed={handleEditStudent}
            onRefresh={handleRefreshAfterEdit}
            studentData={selectedStudent}
            setIsSubmitting={setIsSubmitting}
            setLoading={setLoading}
          />
        </div>
      )}
    </div>
  );
}

export default Student;
