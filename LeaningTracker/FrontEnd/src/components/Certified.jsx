import { useState, useEffect } from "react";

export default function Certified() {
  const [showStudent, setShowStudent] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track the index of the expanded card

  async function verifiedUser() {
    try {
      let response = await fetch('http://localhost:3000/Certified');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let data = await response.json();
      setShowStudent(data.students);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    verifiedUser();
  }, []);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx); // Toggle the expanded card
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Verified Students</h1>
      <ul className="space-y-4 max-w-lg mx-auto">
        {showStudent.map((student, idx) => (
          <li
            key={idx}
            className="bg-indigo-600 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => toggleExpand(idx)} // Toggle the card on click
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                {idx + 1}
              </div>
              <div className="text-lg font-medium text-gray-300">
                {student.basicInfo.name}
              </div>
            </div>
            
            {/* Conditionally render the expanded details */}
            {expandedIndex === idx && (
              <div className="mt-4 bg-indigo-800 p-4 rounded-lg text-gray-300">
                <p><strong>Email:</strong> {student.basicInfo.email}</p>
                {/* <p><strong>Age:</strong> {student.basicInfo.age}</p> */}
                <p><strong>Address:</strong> {student.basicInfo.address}</p>
                {/* Add any other details you want to show */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
