const express=require("express");
const path=require("path");
const bodyparser=require("body-parser");
const Student=require("./student")
require('./mongoose')

const app=express();

app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(bodyparser.json());

const PORT = process.env.PORT || 3000

app.use(express.static(path.join("")));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
  
    next();
  })

app.post("/create",async(req,res)=>{

    const student=new Student({
        name:req.body.name,
        rollNum:req.body.rollNum
    })
    await student.save()
    res.status(201).json(student)
})

app.get("/students",async(req,res)=>{
    const students=await Student.find();
    res.status(201).json(students)
})
app.get("/student/:roll",async(req,res)=>{
    const student=await Student.findOne({rollNum:req.params.roll});
    res.status(201).json(student)
})
app.put("/update/:roll",async(req,res)=>{
    console.log(req.body,req.params.roll)
    await Student.updateOne({rollNum:req.params.roll},req.body);
    res.status(201).json({message:"Updated!"})
})
app.delete("/delete/:roll",async(req,res)=>{
    console.log(req.params.roll)
    await Student.deleteOne({rollNum:req.params.roll});
    res.status(201).json({ message:"Deleted" });
  
})
app.post("/autocomplete",async(req,res)=>{
    let students=await Student.find();
    if(isNaN(req.body.data)){
        
        students=students.filter(student=>{
            return student.name.includes(req.body.data);
        })
        res.status(201).json(students)
    }else{
        students=students.filter(student=>{
            return student.rollNum.includes(req.body.data);
        })
        res.status(201).json(students)
    }
})
  app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });
  