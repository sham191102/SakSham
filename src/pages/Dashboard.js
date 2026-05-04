// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Dashboard.css";

// function Dashboard() {

//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [complaints, setComplaints] = useState([]);

//   // Load only current user's complaints
//   useEffect(() => {

//   fetch("http://localhost:5000/complaints")
// .then(res => res.json())
// .then(data => setComplaints(data))
// .catch(err => console.log(err));

//     const savedComplaints =
//       JSON.parse(localStorage.getItem("complaints")) || [];

//     const userComplaints = savedComplaints.filter(
//       (c) => c.userEmail === user?.email
//     );

//     setComplaints(userComplaints);

//   }, [user]);
 
//  const deleteComplaint = (id)=>{

//   const all =
//    JSON.parse(localStorage.getItem("complaints")) || [];

//   const updated = all.filter(c => c.id !== id);

//   localStorage.setItem("complaints",JSON.stringify(updated));

//   setComplaints(updated);

//  };

//   return (
//     <>
    
//       {/* HEADER */}
//       <header className="header">
//         <h1>Complaint Management System</h1>
//       </header>

//       <div className="dashboard">

//         <h2>Welcome, {user?.email}</h2>

//         <button onClick={() => navigate("/create")}>
//           Create Complaint
//         </button>

// <p>Category: {complaints.category}</p>

// <p>Severity: {complaints.severity}</p>

// <p>AI Score: {(complaints.probability*100).toFixed(1)}%</p>

// <p>Status: {complaints.status}</p>
//         <button onClick={() => navigate("/profile")}>
//           Profile
//         </button>

//         {/* Complaints List */}

//         {complaints.length === 0 ? (
//           <p>No complaints yet</p>
//         ) : (
//           complaints.map((complaint) => (
//             <div key={complaint.id} className="complaint-card">

//               <h3>{complaint.title}</h3>
//               <p>{complaint.location}</p>

//               {complaint.mapImage ? (
//                 <img
//                   src={complaint.mapImage}
//                   alt="location map"
//                   width="250"
//                 />
//               ) : (
//                 <p>No Map Image</p>
//               )}

//               <h4>{complaint.title}</h4>

//               {/* <p>{complaint.location}</p> */}

//               {/* <p>Status: <b>{complaint.status}</b></p> */}

//               <button onClick={()=>deleteComplaint(complaint.id)}>
//                Delete
//               </button>
                        
//             </div>
//           ))
//         )}

//         <button
//           onClick={() => {
//             logout();
//             navigate("/");
//           }}
//         >
//           Logout
//         </button>

//       </div>

//       {/* FOOTER */}
//       <footer className="footer">
//         <p>© 2026 Complaint Portal | All Rights Reserved</p>
//       </footer>

//     </>
//   );
// }

// export default Dashboard;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);

  // Load user complaints
  useEffect(() => {

    const savedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const userComplaints = savedComplaints.filter(
      (c) => c.userEmail === user?.email
    );

    setComplaints(userComplaints);

  }, [user]);


  // //Voice Text
  // useEffect(() => {
  //     setDescription(transcript);
  //     }, [transcript]);

  // Delete complaint
  const deleteComplaint = (id) => {

    const all =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updated = all.filter(c => c.id !== id);

    localStorage.setItem("complaints", JSON.stringify(updated));

    setComplaints(updated);

  };


  // Dashboard stats
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const progress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;


  return (
    <>

      {/* NAVBAR */}

      <div className="dash-navbar">

        <h2>Automated complaint model Dashboard</h2>

        <nav>
          <button onClick={() => navigate("/create")}>
            + New Complaint
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </nav>

      </div>


      {/* WELCOME */}

      <div className="welcome">
        <h1>Welcome {user?.email}</h1>
        <p>Manage and track your complaints</p>
      </div>


      {/* STATS */}

      <div className="stats">

        <div className="card total">
          <h3>Total Complaints</h3>
          <p>{total}</p>
        </div>

        <div className="card pending">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>

        <div className="card progress">
          <h3>In Progress</h3>
          <p>{progress}</p>
        </div>

        <div className="card resolved">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>

      </div>


      {/* COMPLAINT TABLE */}

      <div className="complaints">

        <h2>Your Complaints</h2>

        {complaints.length === 0 ? (

          <p>No complaints yet</p>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Category</th>
                <th>Severity</th>
                <th>Status</th>
                <th>AI Score</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {complaints.map((c) => (

                <tr key={c.id}>

                  <td>{c.title}</td>
                  <td>{c.location}</td>
                  <td>{c.category}</td>
                  <td>{c.severity}</td>

                  <td className={c.status?.toLowerCase()}>
                    {c.status}
                  </td>

                  <td>
                    {c.probability
                      ? (c.probability * 100).toFixed(1) + "%"
                      : "N/A"}
                  </td>

                  <td>
                    <button
                      onClick={() => deleteComplaint(c.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </>
  );
}

export default Dashboard;