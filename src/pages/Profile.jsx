import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./Profile.css"

function Profile() {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [complaintCount, setComplaintCount] = useState(0)

  // Count user complaints
  useEffect(() => {

    const all = JSON.parse(localStorage.getItem("complaints")) || []

    const userComplaints = all.filter(
      c => c.userEmail === user?.email
    )

    setComplaintCount(userComplaints.length)

  }, [user])


  const handleSave = () => {

    const updatedUser = {
      ...user,
      name,
      email
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))

    alert("Profile Updated Successfully")

    setIsEditing(false)

  }


  const handleLogout = () => {
    logout()
    navigate("/")
  }


  return (
    <div className="profile-container">

      <div className="profile-card">

        <h2>My Profile</h2>

        {/* Avatar */}

        <div className="profile-avatar">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>


        {/* Name */}

        <div className="profile-field">
          <label>Name</label>

          {isEditing ? (

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          ) : (

            <p>{name}</p>

          )}

        </div>


        {/* Email */}

        <div className="profile-field">

          <label>Email</label>

          {isEditing ? (

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          ) : (

            <p>{email}</p>

          )}

        </div>


        {/* Role */}

        <div className="profile-field">

          <label>Role</label>

          <p className="role">{user?.role || "User"}</p>

        </div>


        {/* Complaint Stats */}

        <div className="profile-field">

          <label>Total Complaints</label>

          <p>{complaintCount}</p>

        </div>


        {/* Buttons */}

        <div className="profile-buttons">

          {isEditing ? (

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>

          ) : (

            <button onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>

          )}

          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Profile



