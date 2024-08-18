import { useState } from "react";
import "tailwindcss/tailwind.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import HomeIcon from '@mui/icons-material/Home';
import AdminHome from './AdminHome';
import Verified from "./Verified";
import Unverified from "./Unverified";
import Uncertified from "./UnCertified";
import Certified from "./Certified";

const AdminDash = ({ info, userInfo }) => {
  const [activeComponent, setActiveComponent] = useState("Profile");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Profile":
        return <AdminHome userInfo={userInfo} user={info} />;
      case "Verified":
        return <Verified />;
      case "Unverified":
        return <Unverified />;
      case "UnCertified":
        return <Uncertified />;
      case "Certified":
        return <Certified />;
      default:
        return <AdminHome user={info} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-slate-950 text-white font-bold fixed h-full">
        <div className="p-4 text-2xl font-bold border-b-2">
          <DashboardIcon className="text-green-400" /> Admin Dashboard
        </div>
        <ul>
          <li
            className={`p-4 cursor-pointer ${activeComponent === "Profile" ? "bg-slate-400" : ""}`}
            onClick={() => setActiveComponent("Profile")}
          >
            <HomeIcon className="text-indigo-600" /> Home
          </li>

          <li
            className={`p-4 cursor-pointer ${activeComponent === "Verified" ? "bg-slate-400" : ""}`}
            onClick={() => setActiveComponent("Verified")}
          >
            <VerifiedUserIcon className="text-indigo-600" /> Verified Students
          </li>

          <li
            className={`p-4 cursor-pointer ${activeComponent === "Unverified" ? "bg-slate-400" : ""}`}
            onClick={() => setActiveComponent("Unverified")}
          >
            <UnpublishedIcon className="text-indigo-600" /> Unverified Students
          </li>

          <li
            className={`p-4 cursor-pointer ${activeComponent === "UnCertified" ? "bg-slate-400" : ""}`}
            onClick={() => setActiveComponent("UnCertified")}
          >
            <NewReleasesIcon className="text-indigo-600" /> Uncertified Students
          </li>

          <li
            className={`p-4 cursor-pointer ${activeComponent === "Certified" ? "bg-slate-400" : ""}`}
            onClick={() => setActiveComponent("Certified")}
          >
            <LocalPoliceIcon className="text-indigo-600" /> Certified Students
          </li>
        </ul>
      </div>
      <div className="flex-1 ml-64 overflow-y-auto p-4 bg-gray-100">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDash;
