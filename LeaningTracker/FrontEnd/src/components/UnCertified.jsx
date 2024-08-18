import { useState, useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Uncertified() {
  const [showStudent, setShowStudent] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); 
  const [checkAll, setCheckAll] = useState(false);
  const [expandedStudent, setExpandedStudent] = useState(null); // State to track which student's details are expanded
  const [reUncertified,setReUncertified] = useState(true);
  const [genrate, setGenerate] = useState("Generate");
  async function fetchUnverifiedUsers() {
    try {
      let response = await fetch('http://localhost:3000/Uncertified');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      let data = await response.json();
      setShowStudent(data.students);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleVerify = (event, id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    }
  };

  const submitSelectedIds = async () => {
    setGenerate("Generating...");
    try {
      let response = await fetch('http://localhost:3000/certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }
  
      let data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error submitting selected IDs:', error);
    }
    fetchUnverifiedUsers();
    setReUncertified(true);
    setGenerate("Generate");
  };

  const handleCheckAll = () => {
    if (checkAll) {
      setSelectedIds([]);
    } else {
      const allIds = showStudent.map((student) => student._id);
      setSelectedIds(allIds);
    }
    setCheckAll(!checkAll);
  };

  const toggleStudentDetails = (id) => {
    setExpandedStudent(expandedStudent === id ? null : id);
  };

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Generate Certificate</h1>
      {/* <p>Total Students: {showStudent.length}</p> */}

      <div className="flex justify-between items-center max-w-lg mx-auto">
        <button 
          onClick={handleCheckAll} 
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
        >
          {checkAll ? 'Unselect All' : 'Select All'}
        </button>

        <div className="flex items-center justify-center mt-6 mb-6">
        <button onClick={submitSelectedIds} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click to {genrate}
        </button>
      </div>

      </div>

     {reUncertified && <ul className="space-y-4 max-w-xl mx-auto">
        {showStudent.map((student, idx) => (
          <li
            key={idx}
            className="bg-indigo-600 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 justify-around ">

            <FormControlLabel className="text-gray-300 "
                control={
                  <Checkbox 
                    checked={selectedIds.includes(student._id)}
                    onChange={(event) => handleVerify(event, student._id)} 
                  />
                } 
                // label="Verify" 
              />

              <div className="flex gap-4 items-center" onClick={() => toggleStudentDetails(student._id)}>
                <div className="bg-green-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                  {idx + 1}
                </div>
                <div className="text-lg font-medium text-gray-300 w-32">
                  {student.basicInfo.name}
                </div>
              </div>
             
             <button onClick={submitSelectedIds}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >{genrate}</button>
            </div>
        

            {expandedStudent === student._id && (
              <div className="mt-4 p-4 bg-indigo-700 rounded-lg">
                <p className="text-white">Email: {student.basicInfo.email}</p>
                <p className="text-white">Phone: {student.basicInfo.phone}</p>
                <p className="text-white">Address: {student.basicInfo.phone}</p>
                {/* Add more details as needed */}
              </div>
            )}
          </li>
        ))}
      </ul>}

     
    </div>
  );
}
