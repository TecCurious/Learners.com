import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';

export default function Login({ hide, info, toggle }) {


    const loginRef = useRef();

    const CloseLogin = (e)=>{
        if(loginRef.current == e.target){
            console.log(e.target);
            toggle();
        }
    }

    let [form, setForm] = useState({ email: "", password: "" });
    let [btn, setBtn] = useState("login");
    let handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    let userInfo = {};
    let handleLogin = async () => {

        let response = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
        });



        setBtn("Loading...")
        if (response.status == 200) {

            userInfo = await response.json();
            console.log(userInfo.role);
            setTimeout(() => {

                console.log(userInfo)
                info(userInfo,0);
                setForm({ email: "", password: "" })
                // hide();
                toast("Login successfull");
                localStorage.setItem("login", true);
                localStorage.setItem("role", `${userInfo.role}`);
                setBtn("login");
            }, 2000)
        } else {
            setTimeout(() => {
                setBtn("login");
                toast("Invalid Details");
            }, 2000)

        }
        console.log(info);



    }


    return (
        <div ref={loginRef} onClick={CloseLogin} className='fixed inset-0 backdrop-blur-sm bg-opacity-30'>

            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform"></div>

            <div className=" min-h-[80vh] flex  flex-col items-center justify-center">
                <h1 className='mt-20'> <span className="text-green-300 text-2xl">&lt;</span><span className="text-2xl text-white">Learners</span><span className="text-green-300 font-bold text-2xl">.Com</span> <span className="text-green-300 text-2xl">&gt;</span></h1>
                <div className='flex flex-col lg:w-1/4 m-auto  md:w-1/2 sm:w-1/1 gap-3 border-4 border-green-600 bg-white rounded-md p-8'>
                <div className='flex justify-end '><CloseIcon className='hover:cursor-pointer text-2xl' onClick={toggle} /></div>
                    <p className='text-center text-4xl font-bold '>login</p>
                    <TextField onChange={handleChange} name='email' value={form.email} id="standard-basic" label="Email" variant="standard" />
                    <TextField onChange={handleChange} name='password' value={form.password} id="standard-basic" label="Password" variant="standard" type='password' />
                    <div className='w-1/3 m-auto mt-4'>
                        <Button onClick={handleLogin} variant="contained" color="success">
                            {btn}
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
}