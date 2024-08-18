const express = require('express')
const path = require("path");
const mongoose = require('mongoose');
const Student = require("./models/student.js")
const app = express()
var cors = require('cors');
const port = 3000
let pup = require("puppeteer");
const { profile } = require('console');
const multer  = require('multer');
const { title } = require('process');
// const upload = multer({ dest: 'uploads/' })



// const uri = "mongodb+srv://tecnocrates006:701196@student-data.wrr0t.mongodb.net/?retryWrites=true&w=majority&appName=student-data"; // atalash link

app.use(express.json()); 
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));
main().then(console.log("db connected success")).catch(err => console.log(err));
app.set("views", path.join(__dirname, "views"));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
     return cb(null, file.originalname)
  }
})

const upload = multer({storage})



async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mangos');
}


app.get("/", (req, res)=>{
  res.render("res.ejs");
})


app.get("/alluser", async(req, res)=>{
    let allUser = await Student.find({});
    console.log(allUser.length);
    res.json({count: allUser.length});
})


// Upload profile Image
app.post("/profile/:id", upload.single('profile'), async(req, res)=>{
  const { id } = req.params;
  console.log(req.file.path);
  try {
    const result = await Student.findByIdAndUpdate(
      id,
      {
        'profile': `uploads/${req.file.originalname}`,
        
      },
      // { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedStudent = await Student.findById(id);

    res.status(200).json(updatedStudent);
  } catch  (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})


// Adding new learings of Students section Imgaes and Title
app.post("/learning/:id", upload.single('image'), async(req, res)=>{

    let {id} = req.params;
    console.log(id);
    console.log(req.body.title);
    console.log(req.file);
  const result = await Student.findByIdAndUpdate(
    id,
    {
      $push: {
        learnings: {
          image:req.file.originalname,
          title:req.body.title,
          description:req.body.description,
          // uploadDate: new Date()  // This will use the current date by default
        }
      }
    })

    res.send("done");
})


//Sengisn learings data route
app.get("/learning/:id", async(req, res)=>{
    let {id} = req.params;
    let student = await Student.findById(id);
    console.log(student);

    res.json(student.learnings);
})



//  Signup Route
app.post("/signUp", async(req, res)=>{
    console.log(req.body);
    let {name, email, password} = req.body.basicInfo
    const newStudent = new Student({'basicInfo.name':name, 'basicInfo.email':email, 'basicInfo.password':password});
    let result =  await newStudent.save();
    res.send("done"); 
})

// Login Route
app.post("/login", async(req, res)=>{
    let {email, password} = req.body;
    let isValid = await Student.findOne({'basicInfo.email': email});

     console.log(isValid);
    if(isValid &&  isValid.basicInfo.password == password){

      if(isValid.role == "student"){
        res.status(200).json(isValid);
      } else {
        res.status(200).json(isValid);
      }
       

    } else {
      res.status(404).json({message:"user not found"});
    }
    
})

// All verified Students
app.get("/verified", async(req, res)=>{
  const students = await Student.find({
    role: 'student',
    isVerified: true
  });

    res.status(200).json({students});
})

// verified snd UnCertificate generated
app.get("/unCertified", async(req, res)=>{
  const students = await Student.find({
    role: 'student',
    isVerified: true,
    isCertified: false,
  });

  console.log(students);

    res.status(200).json({students});
})

// Verified and Certified
app.get("/Certified", async(req, res)=>{
  const students = await Student.find({
    role: 'student',
    isVerified: true,
    isCertified: true,
  });

  console.log(students);

    res.status(200).json({students});
})


//All Unverided Students
app.get("/Unverified", async(req, res)=>{
  const students = await Student.find({
    role: 'student',
    isVerified: false,
  });

    res.status(200).json({students});
})


// get Student data
app.get("/user/:id", async(req, res)=>{
    let {id} = req.params;
    let user = await Student.findById(id);
    res.status(200).json(user);
})

// Update user info
app.get("/edit/:id", async(req, res)=>{
  let {id} = req.params;
  let user = await Student.findById(id);
  res.status(200).json(user);
})




//update user info from User DashBoard
app.post('/details/:id', async (req, res) => {
  const { id } = req.params;
   console.log(req.body);

  try {
    const result = await Student.findByIdAndUpdate(
      id,
      {
        'basicInfo.address': req.body.address,
        'basicInfo.phone': req.body.phone,
        'degree.courseName': req.body.course,
        'degree.college': req.body.college,
      },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Student not found' });
    }
     
    let updatedStudent = await Student.findById(id);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Verified : True from Admin dashBoard

app.post('/verify/:id', async (req, res) => {
  const { id } = req.params;
  const { basicInfo } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        'isVerified': true
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Info updated in DB', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//verify all student by admin
app.use('/verifyAll', (req, res, next) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({ message: 'Invalid IDs format' });
  }
  next();
});

// Route to update multiple students based on their IDs
app.post('/verifyAll', async (req, res) => {
  const { ids} = req.body;

  try {
    const result = await Student.updateMany(
      { _id: { $in: ids } },  
      { 'isVerified':true },
      { new: true, runValidators: true }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'No students found or updated' });
    }

    res.status(200).json({ message: 'Students updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});





// delete route
// app.delete("/", async(req,res)=>{
//       let {id} = req.body;
//       console.log(id);
//       let del = await Password.deleteOne({id: `${id}`});
//       console.log(del);
//       res.send(del);
// })

// app.put("/", async(req, res)=>{
//       let {id} = req.body;
//       console.log(req.body);
//       let result = await Password.findOneAndReplace({id: `${id}`}, req.body);
//       res.send(result);
// })


app.post("/certificate", async(req, res)=>{
      console.log(req.body);

      let {ids} = req.body;

      const responses = await Promise.all(
        ids.map(async (id) => {
            const response = await fetch(`http://localhost:3000/certificate/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            //return response.json(); // Parse and return the response

        })
      )


      res.json({message: "done"});
})


app.get('/cert', async(req, res) => {
    let {info} = req.query;
    let data = JSON.parse(info);
    console.log(data);
  res.render("certificate.ejs", {data});
})



//Pfd converter
app.post("/certificate/:id", async (req, res) => {
  let {id} = req.params;
  let info = await Student.findById(id);
  // let {info} = req.body;
  console.log(info.basicInfo.name);
try {
const browser = await pup.launch({ timeout: 0 });
const page = await browser.newPage();


await page.goto(`${req.protocol}://${req.get('host')}/cert?info=${encodeURIComponent(JSON.stringify(info))}`, {
  waitUntil: "networkidle2"
});

await page.setViewport({ width: 1600, height: 1050 });

const todaDate = new Date();
const pdfFileName = `${todaDate.getTime()}.pdf`;
const pdfPath = path.join(__dirname, "./public/files", todaDate.getTime() + ".pdf");


await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true
});
await browser.close();

await Student.findByIdAndUpdate(id, {
  'certificate': `/${pdfFileName}`,
  'isCertified': true
});

res.set({
  "Content-Type": "application/pdf",
  // "Content-Disposition": `attachment; filename="${todaDate.getTime()}.pdf"`
});

res.send("pdf generated");

    


} catch (err) {
console.error('Error generating PDF:', err);
res.status(500).send('An error occurred while generating the PDF.');
}
});

// after pdf generated
app.get("/pdf-generated", (req, res)=>{
  let {pdfName} = req.query;
  console.log(pdfName);
res.render("option.ejs", {pdfName});
})

// for preview Certificate
app.get("/preview/:pdfName", (req, res) => {
console.log( req.params.pdfName)
const filePath = path.join(__dirname, "./public/files", req.params.pdfName);  
res.sendFile(filePath);
})

// for download Certificate
app.get("/download/:pdfName", (req, res) => {
console.log( req.params.pdfName)
const filePath = path.join(__dirname, "./public/files", req.params.pdfName);  
res.download(filePath);
})




app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})