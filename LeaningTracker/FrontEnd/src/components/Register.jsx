import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';

export default function Register({hd, hide, toggle }) {

    let [form, setForm] = useState({ basicInfo: { name: "", email: "", password: "" } });
    let [btn, setBtn] = useState("Sign up");


    let handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            basicInfo: {
                ...prevForm.basicInfo,
                [e.target.name]: value,
            },
        }));
    };


    let handleSubmit = async () => {
        console.log(form)

        let response = await fetch('http://localhost:3000/signUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
        });

        setBtn("Loading...")

        setTimeout(() => {
            toast("SignUp Successfully")
            setForm({ basicInfo: { name: "", email: "", password: "" } })
            setBtn("Sign up")
            hide();
        }, 3000)


    }


    return (

        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-45   ">
            
            <div  className="absolute  top-0 z-[-2] h-screen w-screen rotate-180 transform "></div>

            <div   className="regiser  min-h-[80vh] flex  flex-col items-center justify-center">
                <h1 className='mt-20'> <span className="text-green-300 text-2xl">&lt;</span><span className="text-2xl text-white">Learners</span><span className="text-green-300 font-bold text-2xl">.Com</span> <span className="text-green-300 text-2xl">&gt;</span></h1>
                <div className='flex flex-col lg:w-1/4 m-auto  md:w-1/2 sm:w-1/1 gap-3 border-4 bg-white border-green-600 rounded-md p-8'>
                <div className='flex justify-end '><CloseIcon className='hover:cursor-pointer text-2xl' onClick={toggle} /></div>
                    <p className='text-center text-4xl font-bold '>Sign up</p>
                    <TextField  onChange={handleChange} value={form.basicInfo.name} name='name' id="standard-basic" label="Name" variant="standard" />
                    <TextField onChange={handleChange} value={form.basicInfo.email} name='email' id="standard-basic" label="Email" variant="standard" />
                    <TextField onChange={handleChange} value={form.basicInfo.password} name='password' type='password' id="standard-basic" label="Password" variant="standard" />
                    <div className='w-1/3 m-auto mt-4'>
                        <Button onClick={handleSubmit} variant="contained" color="success">
                            {btn}
                        </Button>
                    </div>

                </div>
            </div>

        </div>


    );
}