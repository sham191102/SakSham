import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import "./Login.css"

function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate()

  const handleLogin = async()=>{

    const res = await fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    })

    const data = await res.json()
    localStorage.setItem("token",data.token)

    if(data.role==="admin")
      navigate("/admin")
    else
      navigate("/dashboard")
  }

  return(
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input 
          placeholder="email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login