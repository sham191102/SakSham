import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
     // const storedUser = JSON.parse(localStorage.getItem("user"));
let storedUser = null;

try {
  storedUser = JSON.parse(localStorage.getItem("user"));
} catch (err) {
  console.log("Invalid user data");
  localStorage.removeItem("user");
}

      if (storedUser && storedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        {error && <div className="error">{error}</div>}

        <div className="input-group">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        <div className="input-group password-field">
          <input
            type={showPass ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>

          <span
            className="toggle"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const success = await login(email, password);

//     if (success) {
//       navigate("/dashboard");
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleLogin} className="auth-box">
//         <h2>Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>

//         <p>
//           Don't have account? <Link to="/signup">Signup</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login} = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const success = await login(email, password);

//     if (success) {
//       // 👇 user role check
//       const storedUser = JSON.parse(localStorage.getItem("user"));

//       if (storedUser.role === "admin") {
//         navigate("/admin");      // 👑 admin
//       } else {
//         navigate("/dashboard");  // 👤 user
//       }

//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleLogin} className="auth-box">
//         <h2>Login</h2>

//         <div className="input-group">
//     <input
//       type="email"
//       required
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//     <label>Email</label>
//   </div>

//   <div className="input-group">
//     <input
//       type="password"
//       required
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />
//     <label>Password</label>
//   </div>


//         <button type="submit">Login</button>

//         <p>
//           Don't have account? <Link to="/signup">Signup</Link>
//         </p>
//       </form>
//     </div>

    
//   );
// }

// export default Login;   