import { useState } from "react";
import styles from "../../styles/AddStudent.module.css";

const AddStudent = ({ onClosed }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit logic here...

    // Start closing animation
    setIsClosing(true);

    // Close modal after animation completes
    setTimeout(() => {
      setIsOpen(false);
      onClosed();
    }, 300); // Match the animation duration
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
      {/* <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isOpen ? "bg-blur-active" : "bg-blur"
        } backdrop-blur-sm`}
      ></div> */}

      <div
        className={`h-auto w-[450px] md:w-[600px] lg:w-[700px] bg-white shadow-lg p-7 rounded-md flex flex-col gap-4 font-metropolis popup ${
          isClosing ? styles.popupClosing : styles.popupAnimation
        } z-50 relative`}
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
              placeholder="Student name"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Student email"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="clg">College</label>
            <input
              type="text"
              id="clg"
              placeholder="College name"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="batch">Batch</label>
            <input
              type="text"
              id="batch"
              placeholder="Batch name"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              placeholder="Student mobile"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            />
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="dis">Discipline</label>
            <select
              name="discipline"
              id="dis"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="cs">Communication Skills</label>
            <select
              name="commskills"
              id="cs"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-6 w-full">
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="reg">Regularity</label>
            <select
              name="regularity"
              id="reg"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <label htmlFor="tp">Test Performance</label>
            <select
              name="testPerformance"
              id="tp"
              className="p-3 bg-[#daf2f6] rounded-md w-full outline-none placeholder:text-[#7d7d7d]"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white p-3 rounded-md"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddStudent;
