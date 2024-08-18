import LearningCard from "./LearningCard";
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
export default function Learnings({ info }) {
    let count = 0;
    console.log(info._id);

    const [newLearing, setNewLearing] = useState(true);
    const [addForm, setAddForm] = useState(false);
    const [learnings, setLearnings] = useState([]);
    const [update, setUpdate] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        // console.log(e.target.files[0].name);
        setFormData({
            ...formData,
            image: e.target.files[count],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        count++;
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('image', formData.image);

        try {
            const response = await fetch(`http://localhost:3000/learning/${info._id}`, {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                // alert('Form submitted successfully!');
                fetchLearinngs();
                setAddForm(false);
                setNewLearing(true);
                setUpdate(true);
                setFormData({
                    title: '',
                    description: '',
                    image: null,
                });
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error while submitting the form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const fetchLearinngs = async () => {
        let learnings = await fetch(`http://localhost:3000/learning/${info._id}`);
        learnings = await learnings.json();
        setLearnings(learnings);
        console.log(learnings);

    }

    const handleAddLearing = () => {
        setNewLearing(false);
        setAddForm(true);
    }

    useEffect(() => {
        fetchLearinngs();
    }, []);

    return (
        <div>
            <h1 className="font-bold text-2xl text-center mb-4">My Learnings</h1>

            {update && <div className="grid grid-cols-4 gap-6">

                {learnings.map((item) => (
                    <LearningCard image={item.image} title={item.title} description={item.description} />
                ))}

            </div>}

            {addForm && <form onSubmit={handleSubmit} className="flex  flex-col w-[30%] m-auto mt-12 gap-4 border-2 border-slate-300 p-4 shadow-sm">
                <label className="font-bold border-2 bg-green-500 text-slate-100 w-[50%] rounded-md m-auto cursor-pointer " htmlFor="image">Upload Image <CloudUploadIcon /></label>
                <input className="" onChange={handleImageChange} type="file" name="image" id="image" />
                <TextField id="outlined-basic" onChange={handleInputChange} value={formData.title} name="title" label="Title" variant="outlined" />
                <TextField name="description" onChange={handleInputChange} value={formData.description}
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                />

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm mt-4 mr-4 ">ADD</button>
            </form>}


            {newLearing && <div className="flex items-center justify-center"> <button onClick={handleAddLearing} className="bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm mt-4 mr-4">Add new Learings</button></div>}

        </div>
    );

}