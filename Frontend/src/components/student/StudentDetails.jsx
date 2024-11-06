import React from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import PieChart from "./PieChart";
import CustomProgress from "./CustomerProgress";
import SimpleBarChart from "./SimpleBarChart";
import RoyalLogo from "../../assets/images/logo_white-1.png";

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
    communication: 4, // Added for the new criteria
    regularity: 3,    // Added for the new criteria
  };

  // Use default data if no student data is provided
  const currentStudent = student || defaultStudent;

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

  const uData = [currentStudent.discipline, 
      currentStudent.testPerformance,
      currentStudent.regularity,
      currentStudent.communication
  ]

  // Criteria array for performance table
  const criteria = [
    { label: 'Test Performance', key: 'testPerformance', id:1 },
    { label: 'Communication', key: 'communication', id:2 },
    { label: 'Regularity', key: 'regularity', id:3 },
    { label: 'Discipline', key: 'discipline', id:4 },
  ];

  return (
    <div className="h-[90%] w-full p-5 flex gap-4">
      {/* Left Column */}
      <div className="h-full w-[50%] col-span-2 bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Student Details
        </h2>

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
      <div className="h-full w-[50%] rounded-lg flex flex-col gap-2">
        <div className="h-[50%] w-full flex gap-2">
          <div className="w-[50%] flex flex-col justify-between items-center rounded-md p-4 bg-white">
            <h3>Final Score</h3>
            <div className="h-[180px] w-[180px]">
              <PieChart />
            </div>
            <p className="text-xl font-bold mt-2">
              {currentStudent.finalScore || "N/A"}
            </p>
          </div>

          <div className="w-[50%] bg-white rounded-md">
            <div className="flex w-full flex-col justify-between gap-7 p-4">
              <h3 className="text-center">Activities & Conduct</h3>
              <div className="h-auto flex flex-col">
              {progressData.map((data) => (
                  <div key={data.id} className="mb-5">
                    <h4>{data.label}</h4>
                    <CustomProgress value={data.value * 20}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full flex gap-2">
          <div className="w-[70%] rounded-md bg-white">
            <h3 className="text-center mt-4">Marks Distribution</h3>
            <div className="flex justify-center">
              <SimpleBarChart uData={uData}/>
            </div>
          </div>
          <div className="w-[50%] bg-white rounded-md flex justify-center items-center">
            <img src={RoyalLogo} alt="Logo" className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;



// import React from "react";
// import { CameraIcon } from "@heroicons/react/24/outline";
// import PieChart from "./PieChart";
// import CustomProgress from "./CustomerProgress";
// import SimpleBarChart from "./SimpleBarChart";
// import RoyalLogo from "../../assets/images/logo_white-1.png";

// const StudentDetails = ({ student }) => {
//   // Default data to show when the student data is missing or not loaded
//   const defaultStudent = {
//     name: "",
//     college: "",
//     batch: "",
//     mobile: "",
//     email: "",
//     finalScore: "",
//     testPerformance: 70,
//     discipline: 80,
//     regularSessions: 60,
//   };

//   // Use default data if no student data is provided
//   const currentStudent = student || defaultStudent;

//   const progressData = [
//     {
//       id: 1,
//       value: currentStudent.testPerformance,
//       size: "md",
//       label: "Test Performance",
//     },
//     {
//       id: 2,
//       value: currentStudent.discipline,
//       size: "md",
//       label: "Discipline",
//     },
//     {
//       id: 3,
//       value: currentStudent.regularSessions,
//       size: "md",
//       label: "Regular Sessions",
//     },
//   ];

//   return (
//     <div className="h-[90%] w-full p-5 flex gap-4">
//       {/* Left Column */}
//       <div className="h-full w-[50%] col-span-2 bg-white rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
//           Student Details
//         </h2>

//         {/* Profile Picture */}
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <div className="w-24 h-24 bg-blue-500 text-white text-3xl rounded-full flex items-center justify-center">
//               {currentStudent.name ? currentStudent.name.charAt(0) : "P"}
//             </div>
//             <CameraIcon className="absolute bottom-0 right-0 w-6 h-6 text-gray-700" />
//           </div>
//         </div>

//         {/* Personal Information */}
//         <div className="grid grid-cols-2 gap-4 text-sm mb-6">
//           <div>
//             <span className="font-semibold">Name:</span>{" "}
//             {currentStudent.name || ""}
//           </div>
//           <div>
//             <span className="font-semibold">College:</span>{" "}
//             {currentStudent.college || ""}
//           </div>
//           <div>
//             <span className="font-semibold">Batch:</span>{" "}
//             {currentStudent.batch || ""}
//           </div>
//           <div>
//             <span className="font-semibold">Mobile:</span>{" "}
//             {currentStudent.mobile || ""}
//           </div>
//           <div>
//             <span className="font-semibold">Email:</span>{" "}
//             {currentStudent.email || ""}
//           </div>
//         </div>

//         {/* Marks Table */}
//         <h3 className="text-lg font-semibold text-blue-900 mb-2">Marks</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-md">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Subject</th>
//                 <th className="py-2 px-4 border-b">Marks</th>
//                 <th className="py-2 px-4 border-b">Out of</th>
//                 <th className="py-2 px-4 border-b">Rating</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentStudent.performance.length > 0 ? (
//                 currentStudent.performance.map((performance, index) => (
//                   <tr key={index}>
//                     <td className="py-2 px-4 border-b">
//                       {performance.category || "N/A"}
//                     </td>
//                     <td className="py-2 px-4 border-b text-center">
//                       {performance.score ? performance.score : "N/A"}
//                     </td>
//                     <td className="py-2 px-4 border-b text-center">
//                       {performance.outOf || 5}{" "}
//                       {/* Assuming default out of is 5 */}
//                     </td>
//                     <td className="py-2 px-4 border-b text-center">
//                       {performance.rating || "N/A"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-2">
//                     No performance data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Right Column */}
//       <div className="h-full w-[50%] rounded-lg flex flex-col gap-2">
//         <div className="h-[50%] w-full flex gap-2">
//           <div className="w-[50%] flex flex-col justify-between items-center rounded-md p-4 bg-white">
//             <h3>Final Score</h3>
//             <div className="h-[180px] w-[180px]">
//               <PieChart />
//             </div>
//             <p className="text-xl font-bold mt-2">
//               {currentStudent.finalScore || "N/A"}
//             </p>
//           </div>

//           <div className="w-[50%] bg-white rounded-md">
//             <div className="flex w-full flex-col justify-between gap-7 p-4">
//               <h3 className="text-center">Activities & Conduct</h3>
//               <div className="h-auto flex flex-col">
//                 {progressData.map((data) => (
//                   <div key={data.id} className="mb-5">
//                     <h4>{data.label}</h4>
//                     <CustomProgress value={data.value} size={data.size} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="h-full w-full flex gap-2">
//           <div className="w-[70%] rounded-md bg-white">
//             <h3 className="text-center mt-4">Marks Distribution</h3>
//             <div className="flex justify-center">
//               <SimpleBarChart />
//             </div>
//           </div>
//           <div className="w-[50%] bg-white rounded-md flex justify-center items-center">
//             <img src={RoyalLogo} alt="Logo" className="h-12" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;
