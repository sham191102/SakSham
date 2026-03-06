import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  // Load complaints from localStorage
  useEffect(() => {
    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(savedComplaints);
  }, []);

  return (
    <>
    
      {/* HEADER */}
      <header className="header">
        <h1>Complaint Management System</h1>
      </header>

      <div className="dashboard">
        <h2>Welcome, {user?.name}</h2>

        <button onClick={() => navigate("/create")}>
          Create Complaint
        </button>

        <button onClick={() => navigate("/profile")}>
          Profile
        </button>

        {/* Complaints List */}
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">

            <h3>{complaint.title}</h3>
            <p>{complaint.location}</p>

            {complaint.mapImage ? (
              <img src={complaint.mapImage} alt="location map" width="250" />
            ) : (
              <p>No Map Image</p>
            )}

          </div>
        ))}

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

//  import { useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Dashboard.css";

// function Dashboard() {

//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const complaints = [
//     { id: 1, title: "Pothole on Main Road", location: "Sector 5", status: "Pending" },
//     { id: 2, title: "Street Light Not Working", location: "Block A", status: "In Progress" },
//     { id: 3, title: "Garbage Overflow", location: "Market Area", status: "Resolved" }
//   ];

//   return (
//     <div className="dashboard">

//       {/* NAVBAR */}
//       <header className="dash-navbar">
//         <h2>Awaz360</h2>

//         <nav>
//           <Link to="/create">Create Complaint</Link>
//           <Link to="/profile">Profile</Link>
//           <button onClick={handleLogout}>Logout</button>
//         </nav>
//       </header>


//       {/* WELCOME */}
//       <section className="welcome">
//         <h1>Welcome, {user?.name || "User"} 👋</h1>
//         <p>Track and manage your civic complaints easily.</p>
//       </section>


//       {/* STATS CARDS */}
//       <section className="stats">

//         <div className="card total">
//           <h3>Total Complaints</h3>
//           <p>12</p>
//         </div>

//         <div className="card pending">
//           <h3>Pending</h3>
//           <p>5</p>
//         </div>

//         <div className="card progress">
//           <h3>In Progress</h3>
//           <p>4</p>
//         </div>

//         <div className="card resolved">
//           <h3>Resolved</h3>
//           <p>3</p>
//         </div>

//       </section>


//       {/* COMPLAINT LIST */}
//       <section className="complaints">

//         <h2>Your Complaints</h2>

//         <table>

//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Location</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {complaints.map((c) => (
//               <tr key={c.id}>
//                 <td>{c.title}</td>
//                 <td>{c.location}</td>
//                 <td className={c.status.toLowerCase()}>{c.status}</td>
//               </tr>
//             ))}
//           </tbody>

//         </table>

//       </section>


//       {/* QUICK ACTION */}
//       <section className="actions">

//         <button onClick={() => navigate("/create")}>
//           + Create New Complaint
//         </button>

//       </section>

//     </div>
//   );
// }

// export default Dashboard;