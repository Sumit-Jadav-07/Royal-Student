import React from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import PieChart from "./PieChart";
import CustomProgress from "./CustomerProgress";
import SimpleBarChart from "./SimpleBarChart";
import RoyalLogo from "../../assets/images/logo_white-1.png";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";


const StudentDetails = ({ student }) => {
  // Default data to show when the student data is missing or not loaded
  const defaultStudent = {
    name: "",
    college: "",
    batch: "",
    mobile: "",
    email: "",
    finalScore: "",
    discipline: 5,
    testPerformance: 4,
    communication: 4,
    regularity: 3,
  };

  // Use default data if no student data is provided
  const currentStudent = student || defaultStudent;

  // Calculate the total score and final score percentage
  const totalScore =
    parseInt(currentStudent.discipline) +
    parseInt(currentStudent.testPerformance) +
    parseInt(currentStudent.communication) +
    parseInt(currentStudent.regularity);

  const finalScorePercentage = (totalScore / 20) * 100;

  currentStudent.finalScore = finalScorePercentage;

  console.log(currentStudent.finalScore);

  const progressData = [
    {
      id: 1,
      value: currentStudent.testPerformance,
      size: "md",
      label: "Test Performance",
    },
    {
      id: 2,
      value: currentStudent.discipline,
      size: "md",
      label: "Discipline",
    },
    {
      id: 3,
      value: currentStudent.regularity,
      size: "md",
      label: "Regular Sessions",
    },
  ];

  const uData = [
    currentStudent.discipline,
    currentStudent.testPerformance,
    currentStudent.regularity,
    currentStudent.communication,
  ];

  // Criteria array for performance table
  const criteria = [
    { label: "Test Performance", key: "testPerformance", id: 1 },
    { label: "Communication", key: "communication", id: 2 },
    { label: "Regularity", key: "regularity", id: 3 },
    { label: "Discipline", key: "discipline", id: 4 },
  ];

  // const downloadPdf = () => {
  //   const element = document.getElementById("student-details");
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  //     pdf.save("student_details.pdf");
  //   });
  // };

  return (
    <div id="student-details" className="h-[100%] w-full p-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 scrollbar-hidden">
      {/* Left Column */}
      <div className="h-full w-full bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Student Details
        </h2>

        {/* <button
          onClick={downloadPdf}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Download PDF
        </button> */}

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-500 text-white text-3xl rounded-full flex items-center justify-center">
              {currentStudent.name ? currentStudent.name.charAt(0) : "P"}
            </div>
            <CameraIcon className="absolute bottom-0 right-0 w-6 h-6 text-gray-700" />
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {currentStudent.name || ""}
          </div>
          <div>
            <span className="font-semibold">College:</span>{" "}
            {currentStudent.college || ""}
          </div>
          <div>
            <span className="font-semibold">Batch:</span>{" "}
            {currentStudent.batch || ""}
          </div>
          <div>
            <span className="font-semibold">Mobile:</span>{" "}
            {currentStudent.mobile || ""}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {currentStudent.email || ""}
          </div>
        </div>

        {/* Marks Table */}
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Marks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Subject</th>
                <th className="py-2 px-4 border-b">Marks</th>
                <th className="py-2 px-4 border-b">Out of</th>
                <th className="py-2 px-4 border-b">Rating</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion.key}>
                  <td className="py-2 px-4 border-b">{criterion.label}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {currentStudent[criterion.key] || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">5</td>
                  <td className="py-2 px-4 border-b text-center">
                    {"★★★★★".slice(0, currentStudent[criterion.key])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column */}
      <div className="h-full w-full rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-2 sm:grid-cols-2">
        {/* First Component */}
        <div className="w-full bg-white rounded-md flex flex-col justify-between items-center p-4 lg:col-span-2 md:col-span-1 max-sm:col-span-3 sm:col-span-3">
          <h3>Final Score</h3>
          <div className="h-[180px] w-[180px]">
            <PieChart finalScore={currentStudent.finalScore} />
          </div>
          <p className="text-xl font-bold mt-2">
            {currentStudent.finalScore || "N/A"}&#x25;
          </p>
        </div>

        {/* Second Component */}
        <div className="w-ful bg-white rounded-md lg:col-span-2 md:col-span-3 max-sm:col-span-3 sm:col-span-3">
          <div className="flex w-full flex-col justify-between gap-7 p-4">
            <h3 className="text-center">Activities & Conduct</h3>
            <div className="h-auto flex flex-col">
              {progressData.map((data) => (
                <div key={data.id} className="mb-5">
                  <h4>{data.label}</h4>
                  <CustomProgress value={data.value * 20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Component (Increased Width) */}
        <div className="w-full bg-white rounded-md lg:col-span-4 md:col-span-4 max-sm:col-span-3 sm:col-span-3">
          {/* Added col-span-2 to increase width */}
          <h3 className="text-center mt-4">Marks Distribution</h3>
          <div className="flex justify-center">
            <SimpleBarChart uData={uData} />
          </div>
        </div>

        {/* Fourth Component */}
        <div className="w-full bg-white rounded-md flex justify-center items-center lg:hidden max-sm:col-span-3 md:col-span-4 sm:col-span-3">
          <img src={RoyalLogo} alt="Logo" className="h-12 lg:w-[70%] lg:h-15" />
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
