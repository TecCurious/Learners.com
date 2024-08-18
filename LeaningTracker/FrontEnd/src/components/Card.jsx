export default function Card({title, count}){

    return(
        <div className="bg-white w-[24%] text-center mt-4 rounded-md h-16 text-xl shadow-md">
        <h1 className="font-bold">{title}</h1>
        <p className="text-indigo-600 font-bold text-xl">{count}</p>
    
        </div>

    );
   
}