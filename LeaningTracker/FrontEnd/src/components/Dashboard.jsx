// src/App.js
import { useState } from "react";
import "tailwindcss/tailwind.css";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import GradingIcon from '@mui/icons-material/Grading';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashHome from "./DashHome";
import Learnings from "./Learnings";
import StudentCertificates from "./StudentCertificates";
const Dashboard = ({info, userInfo}) => {
  const [activeComponent, setActiveComponent] = useState("Home");


console.log(info);

 

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <DashHome userInfo={userInfo} user={info} />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      case "Learnings":
        return <Learnings info={info}/>
      case "Resume":
        return <p>resume Builder</p>
      case "Offerletter":
        return <p>Offer letter</p>
      case "NDA":
        return <p>NDA Page</p>
      case "Certificates":
        return <StudentCertificates userInfo={info}/>
      default:
        return <DashHome user={info} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <div className="w-64 bg-slate-950 text-white font-bold fixed h-full">
        <div className="p-4 text-2xl font-bold border-b-2"> <DashboardIcon className="text-green-400" /> Dashboard</div>
        <ul>
          <li
            className={`p-4 cursor-pointer ${
              activeComponent === "Home" ? "bg-slate-400 " : ""
            }`}
            onClick={() => setActiveComponent("Home")}
          >
           <AccountBoxIcon className="text-indigo-600"/> Pfrofile
          </li>


            

          <li
            className={`p-4 cursor-pointer ${
              activeComponent === "Learnings" ? "bg-slate-400" : ""
            }`}
            onClick={() => setActiveComponent("Learnings")}
          >
            <LocalLibraryIcon className="text-indigo-600" /> My learnings
          </li>

          {/* <li
            className={`p-4 cursor-pointer ${
              activeComponent === "Resume" ? "bg-slate-400" : ""
            }`}
            onClick={() => setActiveComponent("Resume")}
          >
           <PostAddIcon className="text-indigo-600" /> Resume Builder
          </li> */}

          {/* <li
            className={`p-4 cursor-pointer ${
              activeComponent === "Offerletter" ? "bg-slate-400" : ""
            }`}
            onClick={() => setActiveComponent("Offerletter")}
          >
           < EmailIcon className="text-indigo-600"  /> Offer Letter
          </li> */}

          {/* <li
            className={`p-4 cursor-pointer ${
              activeComponent === "NDA" ? "bg-slate-400" : ""
            }`}
            onClick={() => setActiveComponent("NDA")}
          >
           <GradingIcon className="text-indigo-600"  /> NDA
          </li> */}

          <li
            className={`p-4 cursor-pointer ${
              activeComponent === "Certificates" ? "bg-slate-400" : ""
            }`}
            onClick={() => setActiveComponent("Certificates")}
          >
           <LocalPoliceIcon className="text-indigo-600"/> Certificates
          </li>

        </ul>
      </div>
      <div className="flex-1 ml-64 overflow-y-auto p-4 bg-gray-100">
        {renderComponent()}
      </div>
    </div>
  );
};




export default Dashboard;
