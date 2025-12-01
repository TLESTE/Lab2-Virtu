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
  useEffect(()=>{
    fetch("http://localhost:3001/test")
      .then(res=>res.json())
      .then(data=>console.log("PTG:",data));
  },[])
  return (
    <>
      <h1 className="text-left font-bold">Test</h1>
      <div className="center border border-white/20 rounded-xl">
        <h2>Entrez votre valeur</h2>
        <form method='post' onSubmit={(e)=>{e.preventDefault(); getText(cesar);}}>
            <input value={cesar} name="cesar" className="text-white/90" type="text" onChange={(e)=>setCesar(e.target.value)}></input>
        </form>
      </div>
    </>
  )
}

export default App
