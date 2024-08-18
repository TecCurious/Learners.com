import { Tune } from "@mui/icons-material";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Card from "./Card";
const AdminHome = ({ user, userInfo }) => {
    const [userId, setUserId] = useState(user._id);
    const [imageLink, setImageLink] = useState(user.profile);
    const [updateImage, setUpdateImage] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [showInfo, setShowInof] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ phone: "", address: "", course: "", college: "" });
    const [userData, setUserData] = useState(user);
    const [count, setCount] = useState({alluser:"", unverified:"", verified:"", uncertified:"", certified:""});
    const imgLink = `http://localhost:3000/${imageLink}`;
    const formAction = `http://localhost:3000/profile/${userId}`;

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const res = await fetch(formAction, {
            method: "POST",
            body: formData, // Use the FormData object as the request body
        });

        const data = await res.json();
        setImageLink(data.profile);

        setShowProfile(true);
        handleImageUpload();
        userInfo(data, 1);
    };

    const handleImageUpload = () => {
        setUpdateImage(!updateImage);
    };

    const handleCompleteProfile = () => {
        setShowInof(false);
        setShowForm(true);
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async () => {
        console.log(form);
        let response = await fetch(`http://localhost:3000/details/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
        });


        const data = await response.json();
        setUserData(data);
        setShowInof(true);
        setShowForm(false);

    }

   

    const UsersCount = async()=>{
        let allStudents = await fetch("http://localhost:3000/alluser");
        allStudents = await allStudents.json();
        console.log(allStudents.count);

        let unverified = await fetch("http://localhost:3000/Unverified");
        unverified = await unverified.json();
        console.log(unverified.students.length);

        let verified = await fetch("http://localhost:3000/verified");
        verified = await verified.json();
        console.log(verified.students.length);

        let uncertified = await fetch("http://localhost:3000/unCertified");
        uncertified = await uncertified.json();
        console.log(uncertified.students.length);

        let certified = await fetch("http://localhost:3000/Certified");
        certified = await certified.json();
        console.log(certified.students.length);


        setCount({alluser:allStudents.count, unverified:unverified.students.length, verified:verified.students.length, uncertified:uncertified.students.length, certified:certified.students.length});
    }


    useEffect(()=>{
        UsersCount();
    }, [])



    return (
        <div>
            <div className="bg-slate-950 text-white p-6 rounded-lg shadow-md flex justify-between">
                <div className="flex justify-between w-full items-center">

                    {showInfo && <div className="" >
                        <div className="mb-2">
                            <strong>Name:</strong> {userData.basicInfo.name}
                        </div>
                        <div className="mb-2">
                            <strong>Email:</strong> {userData.basicInfo.email}
                        </div>
                        {/* <div className="mb-2">
            <strong>Phone:</strong> {userData.basicInfo.phone}
          </div> */}
                        {/* <div className="mb-2">
            <strong>Address:</strong> {userData.basicInfo.address}
          </div> */}

                        {/* <div className="mb-2">
            <strong>Course:</strong> {userData.degree.courseName}
          </div> */}

                        {/* <div className="mb-2">
            <strong>College:</strong> {userData.degree.college}
          </div> */}

                        {/* <button onClick={handleCompleteProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm mt-4">Complete Profile</button> */}
                    </div>}

                    {/* 
        {showForm &&  <div className="flex flex-col gap-4 bg-white  p-4 rounded-sm">
          <TextField id="outlined-basic" name="phone" onChange={handleChange} label="Phone" variant="outlined" className="" value={form.phone} />
          <TextField id="outlined-basic" name="address" onChange={handleChange} label="Address" variant="outlined" className=" " value={form.address} />
          <TextField id="outlined-basic" name="course" onChange={handleChange} label="Course" variant="outlined" className=" " value={form.course} />
          <TextField id="outlined-basic" name="college" onChange={handleChange} label="College" variant="outlined" className="" value={form.college} />
            <button onClick={handleFormSubmit}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Save</button>
          </div>} */}


                    {showProfile && (
                        <div className="profile-image flex flex-col items-end mt-2 ">
                            <img
                                src={imgLink}
                                alt="profile"
                                className="border border-gray-300 rounded-md h-28 w-28 mr-6 mb-4"
                            />
                            <button
                                onClick={handleImageUpload}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm mt-4 mr-4 "
                            >
                                Update Image
                            </button>
                            {updateImage && (
                                <form
                                    onSubmit={handleImageSubmit}
                                    method="post"
                                    action={formAction}
                                    encType="multipart/form-data"
                                    className="flex flex-col mt-4"
                                >
                                    <input type="file" name="profile" />
                                    <button className="bg-green-300">Save</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>





            </div>
            <div className="flex gap-6 flex-wrap w-[80%] m-auto">
            <Card title={"All registered Students"}  count={count.alluser}/>
            <Card title={"All Unverified Students"}  count={count.unverified}/>
            <Card title={"All Verified Students"}  count={count.verified}/>
            <Card title={"All Uncertified Students"}  count={count.uncertified}/>
            <Card title={"All Certified Students"}  count={count.certified}/>
            </div>
            
            

        </div>
    );
};

export default AdminHome;
