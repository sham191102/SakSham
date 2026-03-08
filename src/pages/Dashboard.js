import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  // Load only current user's complaints
  useEffect(() => {

    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const userComplaints = savedComplaints.filter(
      (c) => c.userEmail === user?.email
    );

    setComplaints(userComplaints);

  }, [user]);
 
 const deleteComplaint = (id)=>{

  const all =
   JSON.parse(localStorage.getItem("complaints")) || [];

  const updated = all.filter(c => c.id !== id);

  localStorage.setItem("complaints",JSON.stringify(updated));

  setComplaints(updated);

 };

  return (
    <>
    
      {/* HEADER */}
      <header className="header">
        <h1>Complaint Management System</h1>
      </header>

      <div className="dashboard">

        <h2>Welcome, {user?.email}</h2>

        <button onClick={() => navigate("/create")}>
          Create Complaint
        </button>

<p>Category: {complaints.category}</p>

<p>Severity: {complaints.severity}</p>

<p>AI Score: {(complaints.probability*100).toFixed(1)}%</p>

<p>Status: {complaints.status}</p>
        <button onClick={() => navigate("/profile")}>
          Profile
        </button>

        {/* Complaints List */}

        {complaints.length === 0 ? (
          <p>No complaints yet</p>
        ) : (
          complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">

              <h3>{complaint.title}</h3>
              <p>{complaint.location}</p>

              {complaint.mapImage ? (
                <img
                  src={complaint.mapImage}
                  alt="location map"
                  width="250"
                />
              ) : (
                <p>No Map Image</p>
              )}

              <h4>{complaint.title}</h4>

              {/* <p>{complaint.location}</p> */}

              {/* <p>Status: <b>{complaint.status}</b></p> */}

              <button onClick={()=>deleteComplaint(complaint.id)}>
               Delete
              </button>
                        
            </div>
          ))
        )}

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Complaint Portal | All Rights Reserved</p>
      </footer>

    </>
  );
}

export default Dashboard;