import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";

function Home() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReport = () => {

    if (!user) {
      navigate("/login");
    } else {
      navigate("/create");
    }

  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <header className="navbar">
        <h2 className="logo">Awaz360</h2>

        <nav>
          <Link to="/">Home</Link>

          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/profile">Profile</Link>}

          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}
        </nav>
      </header>


      {/* HERO SECTION */}
      <section className="hero">

        <h1>Report Civic Issues Easily</h1>

        <p>
          Help improve your city by reporting problems like potholes,
          garbage, water leakage, and street light issues.
        </p>

        <button className="report-btn" onClick={handleReport}>
          Report Now
        </button>

      </section>


      {/* FEATURES */}
      <section className="features">

        <h2>How It Works</h2>

        <div className="feature-container">

          <div className="feature-card">
            <h3>1️⃣ Report Issue</h3>
            <p>Submit complaints about civic problems in your area.</p>
          </div>

          <div className="feature-card">
            <h3>2️⃣ Track Status</h3>
            <p>Track your complaint status in real-time.</p>
          </div>

          <div className="feature-card">
            <h3>3️⃣ Improve City</h3>
            <p>Help authorities resolve issues faster.</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Awaz360 | Smart Civic Complaint System</p>
      </footer>

    </div>
  );
}

export default Home;