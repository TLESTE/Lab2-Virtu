import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getText(argument){
  const arg=argument;
  console.log(arg)
  return arg;
}

function App() {
  const [count, setCount] = useState(0)
  const [cesar,setCesar]=useState("");
  const [affiche,setAffiche]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:3001/all")
      .then(res=>res.json())
      .then(data=>setAffiche(data));
  },[]);

  const handleSubmit=async e=>{
    e.preventDefault();
    const result=getText(cesar);
    await fetch("http://localhost:3001/all",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
    body:JSON.stringify({text:result}),
    });
  }
  
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await fetch("http://localhost:3001/all");
      const json=await res.json();
      setAffiche(json);
      localStorage.setItem("textouilles",JSON.stringify(json));
    };
    fetchData();
    const int=setInterval(fetchData,500);
    return ()=> clearInterval(int);
  },[]);

  useEffect(()=>{
    const save=localStorage.getItem("textouilles");
    if (save){
      setAffiche(JSON.parse(save));
    };
  },[]);


  return (
    <>
    <div className='flex justify-center'>
      <div className="flex flex-col my-2 w-[500px] items-center border-[1px] border-black/80 bg-white">
        <h2 className='text-black text-center border-b w-full'>Entrez votre valeur</h2>
        <form className='my-3 border border-black/90' method='post' onSubmit={(e)=>{handleSubmit(e)}}>
            <input value={cesar} name="cesar" className="text-black/90" type="text" placeholder="Texte" onChange={(e)=>setCesar(e.target.value)}></input>
        </form>
        <div className='w-full h-full border border-black/90'>
            {affiche.map((item,i)=>(
              <p className="text-black text-center"key={i}>{item.content}</p>
            ))}
        </div>
      </div>
    </div>  
    </>
  )
}

export default App
