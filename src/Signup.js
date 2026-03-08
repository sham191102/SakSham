// import {useState} from "react"

// function Signup(){

//  const [email,setEmail]=useState("")
//  const [password,setPassword]=useState("")

//  const handleSignup = async()=>{

//   await fetch("http://localhost:5000/signup",{
//    method:"POST",
//    headers:{"Content-Type":"application/json"},
//    body:JSON.stringify({email,password})
//   })

//   alert("Signup done")
//  }

//  return(
//   <>
//    <h2>Signup</h2>
//    <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
//    <input placeholder="password" onChange={e=>setPassword(e.target.value)}/>
//    <button onClick={handleSignup}>Signup</button>
//   </>
//  )
// }

// export default Signup