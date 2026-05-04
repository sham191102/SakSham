/*import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(name, email, password);
    alert("Signup Successful");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-box">
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Signup</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
*/

// 

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup(){

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    if(!name || !email || !password){
      alert("Please fill all fields");
      return;
    }

    try{

      const res = await fetch("http://localhost:5000/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if(res.ok){
        alert("Signup successful");
        navigate("/login");
      }else{
        alert(data.message);
      }

    }catch(error){
      console.log(error);
      alert("Server error");
    }

  };

  return(

    <div className="signup-container">
      <div className="signup-card">

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Signup
        </button>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>

  );

}

export default Signup;