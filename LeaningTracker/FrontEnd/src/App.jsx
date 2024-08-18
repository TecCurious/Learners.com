import NavBar from "./components/Navbar"
import Register from "./components/Register"
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import HomeBody from "./components/HomeBody";
import AdminDashboard from  "./components/AdminDash";
function App() {

  const [showhomeBody, setHomeBody] = useState(true);

  let hideHome = ()=>{
    setHomeBody(!showhomeBody);
  }

  return (
    <div className="relative">
    < NavBar manageHome={hideHome}/>
   {showhomeBody &&  < HomeBody  className="absolute inset-0 z-0 bg-gray-200" />}
    </div>
  )
}

export default App
