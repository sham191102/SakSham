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
        <h2 className="logo">Smart Civic</h2>

        <nav>
          <Link to="/">Home</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/profile">Profile</Link>}

          {user?.role === "admin" && (<Link to="/admin" className="admin-link"> Admin </Link> )}

          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Signup</Link>}
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Make Your City Better 🚀</h1>
          <p>
            Report issues like potholes, garbage, water leakage & more —
            powered by AI for faster resolution.
          </p>

          <button className="report-btn" onClick={handleReport}>
            🚨 Report Now
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>How It Works</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>📸 Report</h3>
            <p>Upload image & describe issue</p>
          </div>

          <div className="feature-card">
            <h3>🤖 AI Detect</h3>
            <p>Auto category & priority detection</p>
          </div>

          <div className="feature-card">
            <h3>📊 Track</h3>
            <p>Monitor complaint status anytime</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Common Issues</h2>

        <div className="category-grid">
          <div className="category-card">🛣 Road</div>
          <div className="category-card">🗑 Garbage</div>
          <div className="category-card">💡 Electricity</div>
          <div className="category-card">🚰 Water</div>
          <div className="category-card">🔊 Noise</div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <h2>Impact</h2>

        <div className="stats-container">
          <div className="stat-card">
            <h3>120+</h3>
            <p>Complaints</p>
          </div>

          <div className="stat-card">
            <h3>85+</h3>
            <p>Resolved</p>
          </div>

          <div className="stat-card">
            <h3>35+</h3>
            <p>Users</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Be the Change 🌱</h2>
        <button onClick={handleReport}>Report Issue</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Smart Civic Complaint System</p>
      </footer>

    </div>
  );
}

export default Home;