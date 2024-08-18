import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';

export default function StudentCertificates({userInfo}){
    console.log(userInfo.certificate);
    const [certificate, setCertificate] = useState(userInfo.isCertified);
    
        function downloadCertficate() {
            fetch(`http://localhost:3000/download${userInfo.certificate}`)
              .then((response) => {
                if (response.ok) {
                  return response.blob();
                }
                throw new Error('Network response was not ok.');
              })
              .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Certificate.pdf'; // Replace 'filename.pdf' with your desired file name
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
              })
              .catch((error) => console.error('Error while downloading the PDF:', error));
          }
    


    return(
        <div>
            <h1 className="font-bold text-2xl text-center">Your Certificates</h1>

         { certificate &&   <div className="flex items-center flex-col mt-10">
                <h2 className="bg-slate-100 border border-slate-200  shadow-md p-2 rounded-sm">Internshp Complition Certificate</h2>
                <button onClick={downloadCertficate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm mt-4 mr-4 ">Clik here to Download <ArrowDownwardIcon/></button>
            </div>}
        </div>
    );
}