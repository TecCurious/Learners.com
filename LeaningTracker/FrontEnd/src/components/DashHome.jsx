import { Tune } from "@mui/icons-material";
import { useState } from "react";
import TextField from '@mui/material/TextField';

const DashHome = ({ user, userInfo }) => {
  const [userId, setUserId] = useState(user._id);
  const [imageLink, setImageLink] = useState(user.profile);
  const [updateImage, setUpdateImage] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [showInfo, setShowInof] = useState(true);
  const [showForm, setShowForm] = useState(false); 
  const [form, setForm] = useState({phone:"", address:"", course:"", college:""}); 
  const [userData, setUserData] = useState(user);

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

  const handleCompleteProfile = ()=>{
    setShowInof(false);
    setShowForm(true);
  }

  const handleChange = (e)=>{
        // console.log(e.target.value);
      setForm({...form, [e.target.name]: e.target.value});
  }

  const handleFormSubmit = async()=>{
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

  

  return (
    <div className="bg-slate-950 text-white p-6 rounded-lg shadow-md flex justify-between">
      <div className="flex justify-between w-full items-center">

        {showInfo && <div className="" >
          <div className="mb-2">
            <strong>Name:</strong> {userData.basicInfo.name}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {userData.basicInfo.email}
          </div>
          <div className="mb-2">
            <strong>Phone:</strong> {userData.basicInfo.phone}
          </div>
          <div className="mb-2">
            <strong>Address:</strong> {userData.basicInfo.address}
          </div>

          <div className="mb-2">
            <strong>Course:</strong> {userData.degree.courseName}
          </div>

          <div className="mb-2">
            <strong>College:</strong> {userData.degree.college}
          </div>

          <button onClick={handleCompleteProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm mt-4">Complete Profile</button>
        </div>}


        {showForm &&  <div className="flex flex-col gap-4 bg-white  p-4 rounded-sm">
          <TextField id="outlined-basic" name="phone" onChange={handleChange} label="Phone" variant="outlined" className="" value={form.phone} />
          <TextField id="outlined-basic" name="address" onChange={handleChange} label="Address" variant="outlined" className=" " value={form.address} />
          <TextField id="outlined-basic" name="course" onChange={handleChange} label="Course" variant="outlined" className=" " value={form.course} />
          <TextField id="outlined-basic" name="college" onChange={handleChange} label="College" variant="outlined" className="" value={form.college} />
            <button onClick={handleFormSubmit}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Save</button>
          </div>}


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
  );
};

export default DashHome;
