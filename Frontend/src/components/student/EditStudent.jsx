import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/AddStudent.module.css";
import { validateForm } from "../../services/Validation";
import Message from "../common/Message";

const EditStudent = ({ setIsSubmitting, onClosed, studentData, onRefresh }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);

  const studentId = studentData?.studentId || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    batch: "",
    college: "",
    communication: 0,
    discipline: 0,
    regularity: 0,
    testPerformance: 0,
  });

  // Initialize form data when studentData is available
  useEffect(() => {
    if (studentData) {
      setFormData({
        name: studentData.name || "",
        email: studentData.email || "",
        mobile: studentData.mobile || "",
        batch: studentData.batch || "",
        college: studentData.college || "",
        communication: studentData.communication || 0,
        discipline: studentData.discipline || 0,
        regularity: studentData.regularity || 0,
        testPerformance: studentData.testPerformance || 0,
      });
    }
  }, [studentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const ValidationErrors = validateForm(formData); // Validate formData
    setErrors(ValidationErrors);

    if (Object.keys(ValidationErrors).length > 0) {
      setMessage("Please correct the errors in the form.");
      setIsError(true);
      setVisible(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const token =
        localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
      if (!token) {
        setMessage("Authorization token is missing.");
        setIsError(true);
        setVisible(true);
        return;
      }

      const response = await axios.put(
        `http://localhost:1218/api/private/admin/editstudent/${studentId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsError(false);
        setMessage(response.data.message || "Student updated successfully!");
        await onRefresh();
        onClosed();
      } else {
        throw new Error("Unexpected server response.");
      }
    } catch (error) {
      console.error(
        "Error during form submission:",
        error.response?.data || error.message
      );
      setIsError(true);
      setMessage(
        error.response?.data?.error || "Edit Student failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setVisible(true);
    }
  };

  const handleCloseMessage = () => {
    setVisible(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      onClosed();
    }, 300); // Match the animation duration
    window.location.reload();
  };

  return (
    <>
      <div
        className={`h-auto w-[450px] md:w-[600px] lg:w-[700px] bg-white shadow-lg p-7 rounded-md flex flex-col gap-4 font-metropolis popup ${
          isClosing ? styles.popupClosing : styles.popupAnimation
        } z-50 relative ${styles.scrollcontainer}`}
        style={{
          maxHeight: errors && Object.keys(errors).length > 0 ? "90vh" : "auto", // Sets max height only when errors are present
          overflowY:
            errors && Object.keys(errors).length > 0 ? "auto" : "hidden", // Enables scrolling when errors exist
        }}
      >
        <Message
          message={message}
          isError={isError}
          isVisible={visible}
          onClose={handleCloseMessage}
        />
        <div className="flex justify-between items-center pt-2 pb-2 text-[#0082fe]">
          <h1 className="text-2xl font-extrabold">Edit Student</h1>
          <span onClick={handleClose} className="text-xl cursor-pointer">
            &#10006;
          </span>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Student name"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Student email"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="clg">College</label>
            <input
              type="text"
              id="clg"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="College name"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
            {errors.college && (
              <div style={{ color: "red" }}>{errors.college}</div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="batch">Batch</label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              placeholder="Batch name"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
            {errors.batch && <div style={{ color: "red" }}>{errors.batch}</div>}
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Student mobile"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
            {errors.mobile && (
              <div style={{ color: "red" }}>{errors.mobile}</div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="dis">Discipline</label>
            <select
              id="dis"
              name="discipline"
              value={formData.discipline}
              onChange={handleInputChange}
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.discipline && (
              <div style={{ color: "red" }}>{errors.discipline}</div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="cs">Communication Skills</label>
            <select
              id="cs"
              name="communication"
              value={formData.communication}
              onChange={handleInputChange}
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.communication && (
              <div style={{ color: "red" }}>{errors.communication}</div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="reg">Regularity</label>
            <select
              id="reg"
              name="regularity"
              value={formData.regularity}
              onChange={handleInputChange}
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.regularity && (
              <div style={{ color: "red" }}>{errors.regularity}</div>
            )}
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="tp">Test Performance</label>
            <select
              id="tp"
              name="testPerformance"
              value={formData.testPerformance}
              onChange={handleInputChange}
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.testPerformance && (
              <div style={{ color: "red" }}>{errors.testPerformance}</div>
            )}
          </div>
        </div>

        <button
          onClick={handleFormSubmit}
          className="mt-4 bg-blue-500 text-white p-3 rounded-md"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditStudent;
