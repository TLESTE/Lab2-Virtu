const express=require ("express");
const cors=require("cors");
const {Pool}= require("pg");

const app=express();
app.use(cors());
app.use(express.json());

const pool=new Pool({
    user:"all",
    host:"localhost",
    database:"vlab3",
    password:"",
    port:5432
});

app.get("/test",async(req, res)=>{
    const result=await pool.query("SELECT NOW()");
    res.json(result.rows);
});

app.listen(3001,()=>{console.log("API OK")});
