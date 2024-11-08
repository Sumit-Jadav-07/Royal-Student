import { useState } from "react";
import axios from "axios";
import styles from "../../styles/AddStudent.module.css";
import { validateForm } from "../../services/Validation";

const AddStudent = ({ onClosed }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    batch: "",
    mobile: "",
    discipline: "0",
    communication: "0",
    regularity: "0",
    testPerformance: "0",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }; 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const ValidationErrors = validateForm(formData);
    setErrors(ValidationErrors);

    try {
      if (Object.keys(ValidationErrors).length === 0) {
        const response = await axios.post(
          "http://localhost:1218/api/public/admin/addstudent", 
          {
            name: formData.name,
            email: formData.email,
            college: formData.college,
            batch: formData.batch,
            mobile: formData.mobile,
            discipline: formData.discipline,
            communication: formData.communication,
            regularity: formData.regularity,
            testPerformance: formData.testPerformance,
          }
        );
        alert(response.data);
        console.log("Form submitted successfully", response.data);

        // Start closing animation
        setIsClosing(true);
        // Close modal after animation completes
        setTimeout(() => {
          setIsOpen(false);
          onClosed();
        }, 300); 
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("Add Student failed. Please try again.");
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      onClosed();
    }, 300); // Match the animation duration
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
        <div className="flex justify-between items-center pt-2 pb-2 text-[#0082fe]">
          <h1 className="text-2xl font-extrabold">Add Student</h1>
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
          Submit
        </button>
      </div>
    </>
  );
};

export default AddStudent;