import express  from "express";
import mysql from "mysql2";
import cors from "cors";


const app=express()
app.use(express.json({limit :"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port: 3306,
    database:"employee"

})
app.get('/',(req,res)=>{

    res.send("From Backend Server");
})

app.post('/Employee', (req, res) => {
    const {
        Name,
        birthDate,
        age,
        Experience,
        Department,
        
        EmployeeID,
        Salary,
        Destination
        
    } = req.body.data;

    const values = [
        Name,
        birthDate,
        Department,
        
        EmployeeID,
        Salary,
        Destination,
        age,
        Experience,
    ];

    const sanitizedValues = values.map(val => (val !== undefined ? val : null));

    db.execute(
        'INSERT INTO employees (Name, DOB,  Department,  EmployeeID, Salary, Destination,age,Experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        sanitizedValues,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).send('Employee Details Added');
        }
    );
});



app.get('/users',(req,res)=>{
    const sql="SELECT * FROM users";
    db.query(sql,(err,data)=>{
        if(err) return res.send(err);
        return res.send(data);
    })
})
app.get('/Employee',(req,res)=>{
    const sql="SELECT * FROM employees";
    db.query(sql,(err,data)=>{
        if(err) return res.send(err);
        return res.send(data);
    })
})

app.listen(5000,()=>{
    console.log("Server Listening to port 5000");
})