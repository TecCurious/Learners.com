import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Avatar from '@mui/material/Avatar';
import Dashboard from "./Dashboard";
import AdminDash from "./AdminDash";
export default function NavBar({manageHome}){

    let [sighUp, setSignUp] = useState(false);
    let [login, setLogin] = useState(false);
    let [dash, setDash] = useState(false);
    let [userLogo, setUserLogo]  = useState(false); 
    let [userInfo, setUserInfo] = useState({username: "", password: ""});
    let [adminDash, setAdminDshboard] = useState(false);

     let showUserLogo = ()=>{
        setUserLogo(true);
     }
  let showSighUp = ()=>{
            setLogin(false);
            setDash(false);
      setSignUp(!sighUp);
  }

  let showLogin = ()=>{
        setDash(false);
        setSignUp(false);
      setLogin(!login);
  }

  let showDashBoard = ()=>{
        setLogin(false);
        setSignUp(false);
        setDash(!dash);
        manageHome();
  }

  

  let handleSignUp = ()=>{
    showSighUp();
    showLogin()
  }

    let studentLogin = ()=>{
        showLogin();
        showDashBoard();
    }

    let adminLogin = ()=>{
      showLogin();
      showAdminDash();
    }
    
    let getInfo  = (info, count)=>{
      console.log(count);
        if(count == 0){
          console.log(info);
          showUserLogo();
          setUserInfo(info);
          if((info.role) === "student"){
            studentLogin();
          } else {
            adminLogin();
          }

        }

        if(count == 1){
          setUserInfo(info);
          showUserLogo(true);
        }
         
          
          
    }

    let showAdminDash = ()=>{ 
      setAdminDshboard(!adminDash);
      manageHome();
    }
   
    // useEffect(()=>{
    //   console.log(localStorage.getItem("login"));
    //   console.log(localStorage.getItem("role"));
    //   if(localStorage.getItem("login") == "true"  && localStorage.getItem("role") == "student"){
    //     console.log("hello");
    //       showDashBoard();
    //   } 

    //   if(localStorage.getItem("login") == true  && localStorage.getItem("role") == "admin"){
    //     showAdminDash();
    //   }
    // },[])
    
    const avaterLink = `http://localhost:3000/${userInfo.profile}`;
    return (
        <> 
        
        <nav className="bg-indigo-600 flex flex-row justify-between items-center text-white px-20 h-14 sticky top-0 w-full">
        <div >  <span className="text-green-300 text-2xl">&lt;</span><span className="text-2xl">Learners</span><span className="text-green-300 font-bold text-2xl">.Com</span> <span className="text-green-300 text-2xl">&gt;</span></div>
        <ul className="flex gap-5 text-sm">
         {!userLogo &&  <li onClick={showSighUp }  className="cursor-pointer bg-blue-500 px-4 py-2 rounded-xl font-bold">Sign up</li>}
           {!userLogo && <li onClick={showLogin} className="cursor-pointer bg-blue-500 px-4 py-2 rounded-xl font-bold">login</li>}
            {userLogo &&  <li onClick={()=>{ let ch = confirm("Really want to logout"); if(ch){setUserLogo(false); setDash(false); setAdminDshboard(false);  manageHome(); localStorage.removeItem("login"); localStorage.removeItem("role");}}} className="cursor-pointer bg-blue-500  px-4 py-2 rounded-xl font-bold">logout</li>}
           {userLogo && <li onClick={userInfo.role == "student" ?  showDashBoard : showAdminDash} className="cursor-pointer"><Avatar alt={userInfo.basicInfo.name} src={avaterLink} /></li>}
        </ul>
       </nav>
       {sighUp && <Register hd={setSignUp} toggle={showSighUp} hide={handleSignUp} />}
       {login && <Login  toggle={showLogin} info={getInfo} />}
       {dash && <Dashboard userInfo={getInfo} info={userInfo}/>}
       {adminDash && <AdminDash userInfo={getInfo} info={userInfo} />}
         </>
      
    );
}

<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
