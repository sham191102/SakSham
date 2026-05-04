// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { AuthContext } from "../context/AuthContext";
// import "./Login.css"

// function Login() {

//   const [email,setEmail]=useState("")
//   const [password,setPassword]=useState("")
//   const navigate = useNavigate()

//   const handleLogin = async()=>{

//     const res = await fetch("http://localhost:5000/login",{
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body:JSON.stringify({email,password})
//     })

//     const data = await res.json()
//     localStorage.setItem("token",data.token)

//     if(data.role==="admin")
//       navigate("/admin")
//     else
//       navigate("/dashboard")
//   }

//   return(
//     <div className="login-container">
//       <div className="login-card">
//         <h2>Login</h2>

//         <input 
//           placeholder="email"
//           onChange={e=>setEmail(e.target.value)}
//         />

//         <input 
//           type="password"
//           placeholder="password"
//           onChange={e=>setPassword(e.target.value)}
//         />

//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   )
// }

// export default Login

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          Don't have account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;