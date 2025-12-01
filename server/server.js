const express=require ("express");
const cors=require("cors");
const {Pool}= require("pg");

const app=express();
app.use(cors());
app.use(express.json());

const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"vlab3",
    password:"ton_mdp",
    port:5432
});

app.get("/all",async(req, res)=>{
    const result=await pool.query("SELECT *");
    res.json(result.rows);
});
app.post("/all",async(req,res)=>{
    const {text}=req.body;
    const result=await pool.query("INSERT (text) VALUE ($1)",[text]);
    res.json({ok:true});
})
app.listen(3001,()=>{console.log("API OK")});
