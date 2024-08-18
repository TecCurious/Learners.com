export default function({image,title, description}) {

    const imgLink = `http://localhost:3000/uploads/${image}`;

    return (

        <div className="flex  items-start justify-start flex-col w-[25% border-2 border-slate-100] p-2 shadow-sm">
            <img src={imgLink} alt="imgage" />
            <h2 className="font-bold text-xl">{title}</h2>
            <p>{description}</p>
        </div>
    );
}   