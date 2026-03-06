// import { useContext, useState } from "react"
// import { AuthContext } from "../context/AuthContext"
// import { useNavigate } from "react-router-dom"
// import "./Profile.css"

// function Profile() {

//   const { user, logout } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const [isEditing, setIsEditing] = useState(false)
//   const [name, setName] = useState(user?.name || "")
//   const [email, setEmail] = useState(user?.email || "")

//   const handleSave = () => {
//     // In real project this will go to backend
//     alert("Profile Updated (Frontend Only)")
//     setIsEditing(false)
//   }

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   return (
//     <div className="profile-container">

//       <div className="profile-card">

//         <h2>My Profile</h2>

//         <div className="profile-avatar">
//           {name.charAt(0).toUpperCase()}
//         </div>

//         <div className="profile-field">
//           <label>Name</label>
//           {isEditing ? (
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           ) : (
//             <p>{name}</p>
//           )}
//         </div>

//         <div className="profile-field">
//           <label>Email</label>
//           {isEditing ? (
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           ) : (
//             <p>{email}</p>
//           )}
//         </div>

//         <div className="profile-field">
//           <label>Role</label>
//           <p className="role">{user?.role}</p>
//         </div>

//         <div className="profile-buttons">
//           {isEditing ? (
//             <button className="save-btn" onClick={handleSave}>
//               Save Changes
//             </button>
//           ) : (
//             <button onClick={() => setIsEditing(true)}>
//               Edit Profile
//             </button>
//           )}

//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Profile

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile">
      <h2>User Profile</h2>

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
}

export default Profile;