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
  const [affiche,setAffiche]=useState("");
  useEffect(()=>{
    fetch("http://localhost:3001/all")
      .then(res=>res.json())
      .then(data=>setAffiche(data));
  },
   fetch("http://locahost:3011/all",{
    method:"POST",
    headers:{"Texte":"all.json"},
    body:JSON.stringify({})})
  ,[])

  const handleSubmit=async e=>{
    e.preventDefault();
    const result=getText(cesar);
    console.log("texte",result);
    await fetch("http://localhost:3001/all",{
      method:"POST",
      headers:{"Content-Type":"app/json"},
    body:JSON.stringify({text:result}),
    }
    );
  }

  return (
    <>
    <div className='flex justify-center min-h-screen'>
      <div className="flex flex-col my-2 w-[500px] h-[70px] items-center border-[1px] border-black/80 bg-white">
        <h2 className='text-black text-center border-b w-full'>Entrez votre valeur</h2>
        <form className='my-3 border border-black/90' method='post' onSubmit={(e)=>{e.preventDefault(); getText(cesar);}}>
            <input value={cesar} name="cesar" className="text-black/90" type="text" placeholder="Gros cul" onChange={(e)=>setCesar(e.target.value)}></input>
        </form>
      </div>
    </div>  
    </>
  )
}

export default App
