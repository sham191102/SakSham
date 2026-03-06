import { useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar({ onCreateClick }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Smart Civic AI
      </div>

      <div className="navbar-links">
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={onCreateClick}>
          Create Complaint
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar